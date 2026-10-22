// Publishes the official VectorCraft web build (WebAssembly) to R2 so the
// /vectorcraft/online page can embed it from https://app.photocraftartcraft.com.
//
// Usage: pnpm vectorcraft:sync [version]   (default: latest GitHub release)
//
// Downloads vectorcraft-web-<version>.zip from github.com/storytold/vectorcraft,
// uploads every file to r2://photocraft-apps/vectorcraft/ with the MIME types
// and cache headers from the upstream HOSTING.md, and uploads index.html last.
// Asset names carry a content hash, so overwriting index.html switches the
// live app to the new version atomically; older hashed files are left behind
// (~100 MB per release) and can be pruned from the R2 dashboard.
import { execFileSync } from 'node:child_process';
import {
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';

const REPO = 'storytold/vectorcraft';
const BUCKET = 'photocraft-apps';
const PREFIX = 'vectorcraft';
const SKIP = new Set(['_headers', '.htaccess']);

const CONTENT_TYPES = {
  '.wasm': 'application/wasm',
  '.js': 'text/javascript',
  '.html': 'text/html; charset=utf-8',
  '.ttf': 'font/ttf',
  '.md': 'text/plain; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};
const IMMUTABLE = 'public, max-age=31536000, immutable';

function contentType(file) {
  const ext = file.slice(file.lastIndexOf('.'));
  return CONTENT_TYPES[ext] ?? 'text/plain; charset=utf-8';
}

function cacheControl(key) {
  if (key.endsWith('index.html') || key.endsWith('/')) return 'no-cache';
  // Hashed bundle files and the hash-named font folders never change.
  if (/\.(wasm|js)$/.test(key) || key.includes('/fonts/')) return IMMUTABLE;
  return 'public, max-age=86400';
}

// Upstream bug storytold/vectorcraft#2689: the web UI's only CJK fonts are
// Japanese, so Chinese and Korean menus render with missing glyphs (boxes).
// Until that's fixed, browsers whose first language is Chinese or Korean
// start in English (the "auto" interface language follows
// navigator.language); an explicit choice in Preferences still wins.
const CJK_LOCALE_PATCH = `<script>
  // Workaround for storytold/vectorcraft#2689 (CJK UI fonts), added by photocraftartcraft.com.
  (() => {
    const lang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    if (!/^(zh|ko)\\b/i.test(lang)) return;
    Object.defineProperty(navigator, 'language', { get: () => 'en-US' });
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
  })();
</script>`;

function patchIndexHtml(file) {
  const html = readFileSync(file, 'utf8');
  if (!html.includes('<script type="module">')) {
    throw new Error('index.html layout changed; review CJK_LOCALE_PATCH');
  }
  writeFileSync(
    file,
    html.replace(
      '<script type="module">',
      `${CJK_LOCALE_PATCH}\n<script type="module">`
    )
  );
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

/** Upload one object, retrying transient network failures. */
function put(key, file, attempts = 3) {
  for (let i = 1; ; i++) {
    try {
      return upload(key, file);
    } catch (err) {
      if (i >= attempts) throw err;
      console.log(`  retrying ${key} (${i}/${attempts - 1})…`);
    }
  }
}

function upload(key, file) {
  execFileSync(
    'npx',
    [
      'wrangler',
      'r2',
      'object',
      'put',
      `${BUCKET}/${key}`,
      '--file',
      file,
      '--content-type',
      contentType(file),
      '--cache-control',
      cacheControl(key),
      '--remote',
    ],
    { stdio: ['ignore', 'ignore', 'inherit'] }
  );
}

async function main() {
  const requested = process.argv[2]?.replace(/^v/, '');
  const releaseUrl = requested
    ? `https://api.github.com/repos/${REPO}/releases/tags/v${requested}`
    : `https://api.github.com/repos/${REPO}/releases/latest`;
  const release = await (await fetch(releaseUrl)).json();
  const asset = release.assets?.find((a) =>
    /^vectorcraft-web-.+\.zip$/.test(a.name)
  );
  if (!asset) throw new Error(`No web build in release ${release.tag_name}`);

  const work = mkdtempSync(join(tmpdir(), 'vectorcraft-web-'));
  try {
    const zip = join(work, asset.name);
    console.log(
      `Downloading ${asset.name} (${(asset.size / 1e6).toFixed(1)} MB)…`
    );
    execFileSync('curl', ['-sSL', '-o', zip, asset.browser_download_url]);
    execFileSync('unzip', ['-q', zip, '-d', join(work, 'out')]);
    const root = join(work, 'out', asset.name.replace(/\.zip$/, ''));
    patchIndexHtml(join(root, 'index.html'));

    const files = walk(root)
      .filter((f) => !SKIP.has(f.slice(f.lastIndexOf('/') + 1)))
      .map((file) => ({ file, key: `${PREFIX}/${relative(root, file)}` }))
      // index.html goes last so it never points at files not uploaded yet.
      .sort(
        (a, b) =>
          Number(a.key.endsWith('index.html')) -
          Number(b.key.endsWith('index.html'))
      );

    for (const [i, { file, key }] of files.entries()) {
      console.log(`[${i + 1}/${files.length}] ${key}`);
      put(key, file);
    }
    // R2 has no directory index, so also store the page at the
    // `vectorcraft/` key to make https://app…/vectorcraft/ work.
    put(`${PREFIX}/`, join(root, 'index.html'));
    console.log(
      `\nVectorCraft ${release.tag_name} is live at https://app.photocraftartcraft.com/${PREFIX}/index.html`
    );
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
