/**
 * Public GitHub metadata is refreshed before Node and Cloudflare builds.
 * Downloads resolve only to assets returned by the official Releases API.
 */
import github from './photocraft-github.json';

export const PHOTOCRAFT_VERSION = github.release.version;
export const LAUNCHER_VERSION = github.launcher.version;
export const PHOTOCRAFT_RELEASE_DATE = github.release.publishedAt;
export const PHOTOCRAFT_STATS = github.stats;

export const PHOTOCRAFT_LINKS = {
  repo: 'https://github.com/storytold/photocraft',
  releases: 'https://github.com/storytold/photocraft/releases',
  releaseNotes: github.release.url,
  officialPage: 'https://getartcraft.com/apps/photocraft',
  artcraft: 'https://getartcraft.com',
  launcherRepo: 'https://github.com/storytold/craft-launcher',
  discord: 'https://discord.gg/artcraft',
  rustup: 'https://rustup.rs/',
  photoshop: 'https://www.adobe.com/products/photoshop.html',
  checksums:
    (github.release.assets as Record<string, string>)['SHA256SUMS.txt'] ??
    github.release.url,
} as const;

const assets: Record<string, string> = github.release.assets;
const launcherAssets: Record<string, string> = github.launcher.assets;
const launcherAsset = (file: string) =>
  launcherAssets[file] ?? github.launcher.url;

export type PlatformId = 'macos' | 'windows' | 'linux';

/** `key` maps to i18n messages `pc.dl.file.<key>.title` / `.desc`. */
export interface DownloadFile {
  key: string;
  file: string;
  href: string;
}

export interface PlatformDownloads {
  id: PlatformId;
  primary: DownloadFile;
  launcher: string;
  others: DownloadFile[];
}

const v = PHOTOCRAFT_VERSION;
const f = (key: string, file: string): DownloadFile[] =>
  assets[file] ? [{ key, file, href: assets[file] }] : [];
const primary = (key: string, file: string): DownloadFile => {
  const [download] = f(key, file);
  if (!download) throw new Error(`Missing verified PhotoCraft asset: ${file}`);
  return download;
};

export const PLATFORM_DOWNLOADS: PlatformDownloads[] = [
  {
    id: 'macos',
    primary: primary('mac_dmg', `photocraft-${v}-macos-universal.dmg`),
    launcher: launcherAsset(
      `artcraft-launcher-${LAUNCHER_VERSION}-macos-universal.dmg`
    ),
    others: f('mac_cli', `photocraft-cli-${v}-macos-universal.zip`),
  },
  {
    id: 'windows',
    primary: primary('win_x64_msi', `photocraft-${v}-windows-x64.msi`),
    launcher: launcherAsset(
      `artcraft-launcher-${LAUNCHER_VERSION}-windows-x64.msi`
    ),
    others: [
      ...f('win_x64_zip', `photocraft-${v}-windows-x64-portable.zip`),
      ...f('win_arm_msi', `photocraft-${v}-windows-arm64.msi`),
      ...f('win_arm_zip', `photocraft-${v}-windows-arm64-portable.zip`),
    ],
  },
  {
    id: 'linux',
    primary: primary('linux_appimage', `photocraft-${v}-linux-x86_64.AppImage`),
    launcher: launcherAsset(
      `artcraft-launcher-${LAUNCHER_VERSION}-linux-x86_64.AppImage`
    ),
    others: [
      ...f('linux_flatpak', `photocraft-${v}-linux-x86_64.flatpak`),
      ...f('linux_deb', `photocraft-${v}-linux-x86_64.deb`),
      ...f('linux_rpm', `photocraft-${v}-linux-x86_64.rpm`),
      ...f('linux_tar', `photocraft-${v}-linux-x86_64.tar.gz`),
      ...f('linux_arm_appimage', `photocraft-${v}-linux-aarch64.AppImage`),
      ...f('linux_arm_deb', `photocraft-${v}-linux-aarch64.deb`),
      ...f('linux_arm_rpm', `photocraft-${v}-linux-aarch64.rpm`),
      ...f('linux_riscv_tar', `photocraft-${v}-linux-riscv64.tar.gz`),
    ],
  },
];

/** Downloads outside the three desktop tabs. */
export const EXTRA_DOWNLOADS: DownloadFile[] = [
  ...f('freebsd', `photocraft-${v}-freebsd-x86_64.tar.gz`),
  ...f('web', `photocraft-web-${v}.zip`),
];

/** Screenshots shipped in public/imgs/photocraft (from the upstream docs,
 *  public-domain artwork). `key` maps to `pc.shots.<key>`. */
export const SCREENSHOTS = [
  'adjustments',
  'layer-styles',
  'masks',
  'filters',
  'type',
  'vector',
  'transform',
  'export-light',
] as const;

export const shotSrc = (name: string, w: 800 | 1600) =>
  `/imgs/photocraft/${name}-${w}.webp`;
