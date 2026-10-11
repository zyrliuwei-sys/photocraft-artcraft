import type { ComponentType, SVGProps } from 'react';

import type { PlatformId } from '@/config/photocraft';
import { m } from '@/paraglide/messages.js';
import { AppleIcon, LinuxIcon, WindowsIcon } from '@/components/brand-icons';

/** Brand buttons: one radius, registration-red primary, quiet outline. */
export const btnPrimary =
  'inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-[var(--radius)] bg-primary px-6 text-[15px] font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_var(--primary)] transition-[transform,filter] hover:brightness-110 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';
export const btnSecondary =
  'inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-[var(--radius)] border border-foreground/20 px-6 text-[15px] font-semibold text-foreground transition-colors hover:border-foreground/45 hover:bg-foreground/5 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

export const PLATFORM_META: Record<
  PlatformId,
  { label: () => string; icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  macos: { label: () => m['pc.dl.tab.macos'](), icon: AppleIcon },
  windows: { label: () => m['pc.dl.tab.windows'](), icon: WindowsIcon },
  linux: { label: () => m['pc.dl.tab.linux'](), icon: LinuxIcon },
};

/** Static lookup so every message stays tree-shakeable. */
export const FILE_TEXT: Record<
  string,
  { title: () => string; desc: () => string }
> = {
  mac_dmg: {
    title: m['pc.dl.file.mac_dmg.title'],
    desc: m['pc.dl.file.mac_dmg.desc'],
  },
  mac_cli: {
    title: m['pc.dl.file.mac_cli.title'],
    desc: m['pc.dl.file.mac_cli.desc'],
  },
  win_x64_msi: {
    title: m['pc.dl.file.win_x64_msi.title'],
    desc: m['pc.dl.file.win_x64_msi.desc'],
  },
  win_x64_zip: {
    title: m['pc.dl.file.win_x64_zip.title'],
    desc: m['pc.dl.file.win_x64_zip.desc'],
  },
  win_arm_msi: {
    title: m['pc.dl.file.win_arm_msi.title'],
    desc: m['pc.dl.file.win_arm_msi.desc'],
  },
  win_arm_zip: {
    title: m['pc.dl.file.win_arm_zip.title'],
    desc: m['pc.dl.file.win_arm_zip.desc'],
  },
  win_x86_msi: {
    title: m['pc.dl.file.win_x86_msi.title'],
    desc: m['pc.dl.file.win_x86_msi.desc'],
  },
  win_x86_zip: {
    title: m['pc.dl.file.win_x86_zip.title'],
    desc: m['pc.dl.file.win_x86_zip.desc'],
  },
  linux_appimage: {
    title: m['pc.dl.file.linux_appimage.title'],
    desc: m['pc.dl.file.linux_appimage.desc'],
  },
  linux_flatpak: {
    title: m['pc.dl.file.linux_flatpak.title'],
    desc: m['pc.dl.file.linux_flatpak.desc'],
  },
  linux_deb: {
    title: m['pc.dl.file.linux_deb.title'],
    desc: m['pc.dl.file.linux_deb.desc'],
  },
  linux_rpm: {
    title: m['pc.dl.file.linux_rpm.title'],
    desc: m['pc.dl.file.linux_rpm.desc'],
  },
  linux_tar: {
    title: m['pc.dl.file.linux_tar.title'],
    desc: m['pc.dl.file.linux_tar.desc'],
  },
  linux_arm_appimage: {
    title: m['pc.dl.file.linux_arm_appimage.title'],
    desc: m['pc.dl.file.linux_arm_appimage.desc'],
  },
  linux_arm_deb: {
    title: m['pc.dl.file.linux_arm_deb.title'],
    desc: m['pc.dl.file.linux_arm_deb.desc'],
  },
  linux_arm_rpm: {
    title: m['pc.dl.file.linux_arm_rpm.title'],
    desc: m['pc.dl.file.linux_arm_rpm.desc'],
  },
  linux_riscv_tar: {
    title: m['pc.dl.file.linux_riscv_tar.title'],
    desc: m['pc.dl.file.linux_riscv_tar.desc'],
  },
  freebsd: {
    title: m['pc.dl.file.freebsd.title'],
    desc: m['pc.dl.file.freebsd.desc'],
  },
  web: { title: m['pc.dl.file.web.title'], desc: m['pc.dl.file.web.desc'] },
};
