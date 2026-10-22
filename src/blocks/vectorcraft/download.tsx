import { useEffect, useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';

import type { PlatformId } from '@/config/photocraft';
import {
  VC_EXTRA_DOWNLOADS,
  VC_PLATFORM_DOWNLOADS,
  VECTORCRAFT_LINKS,
  VECTORCRAFT_VERSION,
} from '@/config/vectorcraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { useDetectedPlatform } from '@/hooks/use-detected-platform';
import { FileRow } from '@/blocks/photocraft/download';
import {
  btnPrimary,
  FILE_TEXT,
  PLATFORM_META,
} from '@/blocks/photocraft/shared';
import { Section, SectionHeading } from '@/components/editorial-section';

export function VectorCraftDownload() {
  const detected = useDetectedPlatform();
  const [tab, setTab] = useState<PlatformId>('macos');
  useEffect(() => {
    if (detected) setTab(detected);
  }, [detected]);

  const current = VC_PLATFORM_DOWNLOADS.find((p) => p.id === tab)!;
  const osLabel = PLATFORM_META[tab].label();
  const primaryText = FILE_TEXT[current.primary.key];
  const PrimaryIcon = PLATFORM_META[tab].icon;

  return (
    <Section id="download">
      <SectionHeading title={m['vc.dl.title']()} sub={m['vc.dl.sub']()} />

      <div className="bg-card ring-foreground/[0.08] mt-12 overflow-hidden rounded-[var(--radius)] ring-1">
        <div
          role="tablist"
          className="border-border flex items-center gap-1 overflow-x-auto border-b px-3 sm:px-5"
        >
          {VC_PLATFORM_DOWNLOADS.map((p) => {
            const Icon = PLATFORM_META[p.id].icon;
            const selected = p.id === tab;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(p.id)}
                className={cn(
                  '-mb-px inline-flex cursor-pointer items-center gap-2 border-b-2 px-4 py-4 text-[15px] font-semibold whitespace-nowrap transition-colors',
                  selected
                    ? 'border-primary text-foreground'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                )}
              >
                <Icon className="size-4" />
                {PLATFORM_META[p.id].label()}
              </button>
            );
          })}
          <span className="text-muted-foreground ml-auto hidden pr-2 font-mono text-xs whitespace-nowrap sm:block">
            {m['pc.dl.version']({ version: VECTORCRAFT_VERSION })}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-border p-6 sm:p-9 md:border-r">
            <PrimaryIcon className="text-muted-foreground size-9" />
            <h3 className="font-display mt-5 text-2xl font-bold">
              {primaryText.title()}
            </h3>
            <p className="text-muted-foreground mt-1">{primaryText.desc()}</p>
            <a
              href={current.primary.href}
              className={cn(btnPrimary, 'mt-7 w-full sm:w-auto')}
            >
              <Download className="size-[18px]" />
              {m['pc.dl.standalone']({ os: osLabel })}
            </a>
            <p className="text-muted-foreground mt-3 truncate font-mono text-[11px]">
              {current.primary.file}
            </p>
            <p className="text-muted-foreground mt-8 text-sm leading-relaxed">
              {m['vc.dl.signed']()}
            </p>
          </div>

          <div className="border-border border-t p-6 sm:p-9 md:border-t-0">
            <p className="text-muted-foreground mb-2 text-sm font-semibold">
              {m['pc.dl.others']({ os: osLabel })}
            </p>
            {current.others.map((f) => (
              <FileRow key={f.key} file={f} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-card ring-foreground/[0.08] rounded-[var(--radius)] p-6 ring-1 sm:p-9">
          <p className="text-muted-foreground mb-2 text-sm font-semibold">
            {m['pc.dl.extra_title']()}
          </p>
          {VC_EXTRA_DOWNLOADS.map((f) => (
            <FileRow key={f.key} file={f} />
          ))}
          <a
            href={VECTORCRAFT_LINKS.checksums}
            className="group hover:bg-foreground/[0.04] -mx-3 flex items-start justify-between gap-4 rounded-[calc(var(--radius)-2px)] px-3 py-3.5"
          >
            <span>
              <span className="block font-medium">
                {m['pc.dl.checksums']()}
              </span>
              <span className="text-muted-foreground block text-sm">
                {m['pc.dl.checksums_desc']()}
              </span>
            </span>
            <Download className="text-muted-foreground group-hover:text-brand mt-1 size-4 shrink-0" />
          </a>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <a
              href={VECTORCRAFT_LINKS.releaseNotes}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand inline-flex items-center gap-1"
            >
              {m['pc.dl.release_notes']()} <ArrowUpRight className="size-3.5" />
            </a>
            <a
              href={VECTORCRAFT_LINKS.releases}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand inline-flex items-center gap-1"
            >
              {m['pc.dl.all_releases']()} <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
        <div className="bg-surface-img flex flex-col rounded-[var(--radius)] p-6 text-[oklch(0.94_0.004_250)] sm:p-9">
          <h3 className="font-display text-2xl font-bold">
            {m['vc.install.title']()}
          </h3>
          <ul className="mt-4 space-y-3 text-[oklch(0.8_0.008_255)]">
            <li>{m['vc.install.mac']()}</li>
            <li>{m['vc.install.win']()}</li>
            <li>{m['vc.install.linux']()}</li>
          </ul>
          <pre className="mt-6 overflow-x-auto rounded-[calc(var(--radius)-2px)] bg-black/30 p-5 font-mono text-[13px] leading-relaxed">
            <code>{`git clone ${VECTORCRAFT_LINKS.repo}
cd vectorcraft
cargo run --release -p vectorcraft`}</code>
          </pre>
        </div>
      </div>
    </Section>
  );
}
