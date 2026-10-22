/**
 * VectorCraft release data — the single place to bump when a new version ships.
 * Asset names follow the upstream GitHub release naming
 * (https://github.com/storytold/vectorcraft/releases). The online version is
 * the official web build, published to R2 by `pnpm vectorcraft:sync`.
 */
import type { DownloadFile, PlatformDownloads } from '@/config/photocraft';

export const VECTORCRAFT_VERSION = '0.14.0';

export const VECTORCRAFT_ONLINE_URL =
  'https://app.photocraftartcraft.com/vectorcraft/index.html';

export const VECTORCRAFT_LINKS = {
  repo: 'https://github.com/storytold/vectorcraft',
  releases: 'https://github.com/storytold/vectorcraft/releases',
  releaseNotes: `https://github.com/storytold/vectorcraft/releases/tag/v${VECTORCRAFT_VERSION}`,
  roadmap: 'https://github.com/storytold/vectorcraft/blob/master/ROADMAP.md',
  officialPage: 'https://getartcraft.com/apps/vectorcraft',
  illustrator: 'https://www.adobe.com/products/illustrator.html',
  checksums: `https://github.com/storytold/vectorcraft/releases/download/v${VECTORCRAFT_VERSION}/SHA256SUMS.txt`,
} as const;

const v = VECTORCRAFT_VERSION;
/** `key` maps to the shared `pc.dl.file.<key>` download labels. */
const f = (key: string, file: string): DownloadFile => ({
  key,
  file,
  href: `https://github.com/storytold/vectorcraft/releases/download/v${v}/${file}`,
});

export const VC_PLATFORM_DOWNLOADS: Omit<PlatformDownloads, 'launcher'>[] = [
  {
    id: 'macos',
    primary: f('mac_dmg', `vectorcraft-${v}-macos-universal.dmg`),
    others: [f('mac_cli', `vectorcraft-cli-${v}-macos-universal.zip`)],
  },
  {
    id: 'windows',
    primary: f('win_x64_msi', `vectorcraft-${v}-windows-x64.msi`),
    others: [
      f('win_x64_zip', `vectorcraft-${v}-windows-x64-portable.zip`),
      f('win_arm_msi', `vectorcraft-${v}-windows-arm64.msi`),
      f('win_arm_zip', `vectorcraft-${v}-windows-arm64-portable.zip`),
      f('win_x86_msi', `vectorcraft-${v}-windows-x86.msi`),
      f('win_x86_zip', `vectorcraft-${v}-windows-x86-portable.zip`),
    ],
  },
  {
    id: 'linux',
    primary: f('linux_appimage', `vectorcraft-${v}-linux-x86_64.AppImage`),
    others: [
      f('linux_flatpak', `vectorcraft-${v}-linux-x86_64.flatpak`),
      f('linux_deb', `vectorcraft-${v}-linux-x86_64.deb`),
      f('linux_rpm', `vectorcraft-${v}-linux-x86_64.rpm`),
      f('linux_tar', `vectorcraft-${v}-linux-x86_64.tar.gz`),
      f('linux_arm_appimage', `vectorcraft-${v}-linux-aarch64.AppImage`),
      f('linux_arm_deb', `vectorcraft-${v}-linux-aarch64.deb`),
      f('linux_arm_rpm', `vectorcraft-${v}-linux-aarch64.rpm`),
    ],
  },
];

export const VC_EXTRA_DOWNLOADS: DownloadFile[] = [
  f('freebsd', `vectorcraft-${v}-freebsd-x86_64.tar.gz`),
  f('web', `vectorcraft-web-${v}.zip`),
];

/** Screenshots in public/imgs/vectorcraft (from the upstream docs/images,
 *  MIT OR Apache-2.0). `key` maps to `vc.shots.<key>`. */
export const vcShotSrc = (name: string, w: 800 | 1600) =>
  `/imgs/vectorcraft/${name}-${w}.webp`;
