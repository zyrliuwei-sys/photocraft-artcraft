import { readFile, writeFile } from 'node:fs/promises';

const snapshotPath = new URL(
  '../src/config/photocraft-github.json',
  import.meta.url
);
const snapshot = JSON.parse(await readFile(snapshotPath, 'utf8'));
const repo = 'storytold/photocraft';
const launcherRepo = 'storytold/craft-launcher';

async function github(path) {
  const response = await fetch(`https://api.github.com/repos/${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'photocraftartcraft-release-sync',
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
  return { data: await response.json(), link: response.headers.get('link') };
}

async function release(repository, name) {
  const { data } = await github(`${repository}/releases/latest`);
  if (
    !/^v\d+\.\d+\.\d+$/.test(data.tag_name) ||
    data.draft ||
    data.prerelease ||
    data.html_url !==
      `https://github.com/${repository}/releases/tag/${data.tag_name}` ||
    !Number.isFinite(Date.parse(data.published_at))
  )
    throw new Error('Invalid stable release metadata');
  const version = data.tag_name.slice(1);
  const prefix = `https://github.com/${repository}/releases/download/${data.tag_name}/`;
  const assets = Object.fromEntries(
    data.assets
      .filter(
        (asset) =>
          asset.state === 'uploaded' &&
          asset.browser_download_url.startsWith(prefix)
      )
      .map((asset) => [asset.name, asset.browser_download_url])
  );
  // Keep the last verified snapshot if an upstream release is still uploading.
  for (const suffix of [
    'macos-universal.dmg',
    'windows-x64.msi',
    'linux-x86_64.AppImage',
  ]) {
    if (!assets[`${name}-${version}-${suffix}`])
      throw new Error(`Release missing ${suffix}`);
  }
  return {
    version,
    tag: data.tag_name,
    url: data.html_url,
    publishedAt: data.published_at,
    assets,
  };
}

async function collectionCount(path) {
  const { data, link } = await github(`${repo}/${path}?per_page=1`);
  if (!Array.isArray(data)) throw new Error('Invalid GitHub collection');
  const last = link?.match(/<([^>]+)>; rel="last"/);
  if (!last && link?.includes('rel="next"'))
    throw new Error('Incomplete collection count');
  const count = last
    ? Number(new URL(last[1]).searchParams.get('page'))
    : data.length;
  if (!Number.isSafeInteger(count) || count < 0)
    throw new Error('Invalid GitHub count');
  return count;
}

async function stats() {
  const [{ data }, commits, releases] = await Promise.all([
    github(repo),
    collectionCount('commits'),
    collectionCount('releases'),
  ]);
  if (
    ![data.stargazers_count, data.forks_count].every(
      (n) => Number.isSafeInteger(n) && n >= 0
    )
  ) {
    throw new Error('Invalid repository statistics');
  }
  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    // The repository page's contributor total differs from REST's list count.
    // Preserve its manually verified value and date rather than relabeling it.
    contributors: snapshot.stats.contributors,
    contributorsCheckedAt: snapshot.stats.contributorsCheckedAt,
    commits,
    releases,
    observedAt: new Date().toISOString(),
    source: `https://github.com/${repo}`,
  };
}

const keys = ['release', 'launcher', 'stats'];
const results = await Promise.allSettled([
  release(repo, 'photocraft'),
  release(launcherRepo, 'artcraft-launcher'),
  stats(),
]);
for (const [index, result] of results.entries()) {
  const key = keys[index];
  if (result.status === 'fulfilled') {
    snapshot[key] = result.value;
    console.log(`[photocraft] refreshed ${key}`);
  } else {
    console.warn(
      `[photocraft] ${key}: ${result.reason.message}; retaining the verified snapshot and its original date`
    );
  }
}
await writeFile(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
