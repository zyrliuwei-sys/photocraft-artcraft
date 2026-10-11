import { useEffect, useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';

import {
  EXTRA_DOWNLOADS,
  LAUNCHER_VERSION,
  PHOTOCRAFT_LINKS,
  PHOTOCRAFT_VERSION,
  PLATFORM_DOWNLOADS,
  type DownloadFile,
  type PlatformId,
} from '@/config/photocraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { useDetectedPlatform } from '@/hooks/use-detected-platform';
import { Section, SectionHeading } from '@/components/editorial-section';

import { btnPrimary, btnSecondary, FILE_TEXT, PLATFORM_META } from './shared';

function FileRow({ file }: { file: DownloadFile }) {
  const text = FILE_TEXT[file.key];
  return (
    <a
      href={file.href}
      className="group hover:bg-foreground/[0.04] -mx-3 flex items-start justify-between gap-4 rounded-[calc(var(--radius)-2px)] px-3 py-3.5 transition-colors"
    >
      <span className="min-w-0">
        <span className="block font-medium">{text.title()}</span>
        <span className="text-muted-foreground block text-sm">
          {text.desc()}
        </span>
        <span className="text-muted-foreground/75 mt-1 block truncate font-mono text-[11px]">
          {file.file}
        </span>
      </span>
      <Download className="text-muted-foreground group-hover:text-brand mt-1 size-4 shrink-0 transition-colors" />
    </a>
  );
}

export function PhotoCraftDownload({ heading = true }: { heading?: boolean }) {
  const detected = useDetectedPlatform();
  const [tab, setTab] = useState<PlatformId>('macos');
  useEffect(() => {
    if (detected) setTab(detected);
  }, [detected]);

  const current = PLATFORM_DOWNLOADS.find((p) => p.id === tab)!;
  const osLabel = PLATFORM_META[tab].label();
  const primaryText = FILE_TEXT[current.primary.key];
  const PrimaryIcon = PLATFORM_META[tab].icon;

  return (
    <Section id="download" className={cn(!heading && 'pt-12 sm:pt-16')}>
      {heading && (
        <SectionHeading title={m['pc.dl.title']()} sub={m['pc.dl.sub']()} />
      )}

      <div
        className={cn(
          'bg-card ring-foreground/[0.08] overflow-hidden rounded-[var(--radius)] ring-1',
          heading && 'mt-12'
        )}
      >
        <div
          role="tablist"
          className="border-border flex items-center gap-1 overflow-x-auto border-b px-3 sm:px-5"
        >
          {PLATFORM_DOWNLOADS.map((p) => {
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
            {m['pc.dl.version']({ version: PHOTOCRAFT_VERSION })}
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

            <div className="bg-secondary/70 mt-10 rounded-[calc(var(--radius)-2px)] p-5 sm:p-6">
              <h4 className="font-semibold">{m['pc.dl.launcher_title']()}</h4>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {m['pc.dl.launcher_desc']({ version: LAUNCHER_VERSION })}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href={current.launcher}
                  className={cn(btnSecondary, 'h-10 px-4 text-sm')}
                >
                  {m['pc.dl.launcher_btn']()}
                </a>
                <a
                  href={PHOTOCRAFT_LINKS.launcherRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
                >
                  GitHub <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
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
          {EXTRA_DOWNLOADS.map((f) => (
            <FileRow key={f.key} file={f} />
          ))}
          <a
            href={PHOTOCRAFT_LINKS.checksums}
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
              href={PHOTOCRAFT_LINKS.releaseNotes}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand inline-flex items-center gap-1"
            >
              {m['pc.dl.release_notes']()} <ArrowUpRight className="size-3.5" />
            </a>
            <a
              href={PHOTOCRAFT_LINKS.releases}
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
            {m['pc.dl.source_title']()}
          </h3>
          <p className="mt-2 text-[oklch(0.78_0.008_255)]">
            {m['pc.dl.source_desc']()}{' '}
            <a
              href={PHOTOCRAFT_LINKS.rustup}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              rustup.rs
            </a>
          </p>
          <pre className="mt-6 overflow-x-auto rounded-[calc(var(--radius)-2px)] bg-black/30 p-5 font-mono text-[13px] leading-relaxed">
            <code>{`git clone ${PHOTOCRAFT_LINKS.repo}
cd photocraft
cargo run --release -p photocraft`}</code>
          </pre>
        </div>
      </div>
    </Section>
  );
}
