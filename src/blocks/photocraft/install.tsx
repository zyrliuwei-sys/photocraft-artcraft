import { useEffect, useState, type ReactNode } from 'react';

import { PHOTOCRAFT_VERSION, type PlatformId } from '@/config/photocraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { useDetectedPlatform } from '@/hooks/use-detected-platform';
import { Section, SectionHeading } from '@/components/editorial-section';

import { PLATFORM_META } from './shared';

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-surface-img mt-3 overflow-x-auto rounded-[calc(var(--radius)-2px)] px-4 py-3 font-mono text-[12.5px] leading-relaxed text-[oklch(0.9_0.004_250)]">
      <code>{children}</code>
    </pre>
  );
}

const v = PHOTOCRAFT_VERSION;

export function PhotoCraftInstall({ heading = true }: { heading?: boolean }) {
  const detected = useDetectedPlatform();
  const [tab, setTab] = useState<PlatformId>('macos');
  useEffect(() => {
    if (detected) setTab(detected);
  }, [detected]);

  const linux: [string, string][] = [
    [
      m['pc.install.linux.appimage'](),
      `chmod +x photocraft-${v}-linux-x86_64.AppImage\n./photocraft-${v}-linux-x86_64.AppImage`,
    ],
    [
      m['pc.install.linux.deb'](),
      `sudo apt install ./photocraft-${v}-linux-x86_64.deb`,
    ],
    [
      m['pc.install.linux.rpm'](),
      `sudo dnf install ./photocraft-${v}-linux-x86_64.rpm`,
    ],
    [
      m['pc.install.linux.flatpak'](),
      `flatpak install --user photocraft-${v}-linux-x86_64.flatpak\nflatpak run ai.storyteller.photocraft`,
    ],
  ];

  const steps: Record<PlatformId, ReactNode[]> = {
    macos: [
      m['pc.install.mac.1'](),
      m['pc.install.mac.2'](),
      m['pc.install.mac.3'](),
      m['pc.install.mac.4'](),
    ],
    windows: [
      m['pc.install.win.1'](),
      m['pc.install.win.2'](),
      m['pc.install.win.3'](),
      m['pc.install.win.4'](),
    ],
    linux: linux.map(([title, cmd]) => (
      <>
        <span className="font-semibold">{title}</span>
        <Code>{cmd}</Code>
      </>
    )),
  };

  const tips = [
    [m['pc.install.tip.wayland.title'](), m['pc.install.tip.wayland.desc']()],
    [m['pc.install.tip.gpu.title'](), m['pc.install.tip.gpu.desc']()],
    [m['pc.install.tip.verify.title'](), m['pc.install.tip.verify.desc']()],
    [m['pc.install.tip.update.title'](), m['pc.install.tip.update.desc']()],
  ];

  return (
    <Section
      id="install"
      className={cn('bg-secondary/60', !heading && 'pt-12 sm:pt-16')}
    >
      {heading && (
        <SectionHeading
          title={m['pc.install.title']()}
          sub={m['pc.install.sub']()}
        />
      )}

      <div
        className={cn(
          'grid grid-cols-1 gap-10 lg:grid-cols-12',
          heading && 'mt-12'
        )}
      >
        <div className="min-w-0 lg:col-span-7">
          <div
            role="tablist"
            className="bg-background ring-foreground/[0.08] inline-flex rounded-[var(--radius)] p-1 ring-1"
          >
            {(Object.keys(PLATFORM_META) as PlatformId[]).map((id) => {
              const Icon = PLATFORM_META[id].icon;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={cn(
                    'inline-flex cursor-pointer items-center gap-2 rounded-[calc(var(--radius)-2px)] px-4 py-2 text-sm font-semibold transition-colors',
                    tab === id
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="size-4" />
                  {PLATFORM_META[id].label()}
                </button>
              );
            })}
          </div>

          <ol className="mt-8 space-y-7">
            {steps[tab].map((s, i) => (
              <li
                key={`${tab}-${i}`}
                className="grid grid-cols-[2.5rem_1fr] gap-4"
              >
                <span className="font-display bg-primary text-primary-foreground grid size-9 place-items-center rounded-full text-sm font-bold tabular-nums">
                  {i + 1}
                </span>
                <div className="min-w-0 pt-1.5 text-[1.05rem] leading-relaxed">
                  {s}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <h3 className="font-display text-xl font-bold">
            {m['pc.install.tips_title']()}
          </h3>
          <dl className="mt-4 space-y-5">
            {tips.map(([t, d]) => (
              <div key={t}>
                <dt className="font-semibold">{t}</dt>
                <dd className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {d}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
