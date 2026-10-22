import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { PHOTOCRAFT_LINKS, SCREENSHOTS, shotSrc } from '@/config/photocraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import {
  Section,
  SectionHeading,
  ShotFrame,
} from '@/components/editorial-section';

export function PhotoCraftFeatures() {
  const cell =
    'bg-card ring-foreground/[0.08] flex flex-col overflow-hidden rounded-[var(--radius)] ring-1';
  const title = 'font-display text-xl font-bold sm:text-2xl';
  const desc = 'text-muted-foreground mt-3 leading-relaxed';

  return (
    <Section id="features">
      <SectionHeading title={m['pc.ft.title']()} />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* 1: large, image */}
        <div data-reveal className={cn(cell, 'md:col-span-7 md:row-span-2')}>
          <div className="p-7 sm:p-9">
            <h3 className={title}>{m['pc.ft.1.title']()}</h3>
            <p className={cn(desc, 'max-w-[48ch]')}>{m['pc.ft.1.desc']()}</p>
          </div>
          <div className="mt-auto pl-7 sm:pl-9">
            <img
              src={shotSrc('layer-styles', 1600)}
              alt={m['pc.shots.layer-styles']()}
              width={1600}
              height={1000}
              loading="lazy"
              className="ring-foreground/10 block h-auto w-full rounded-tl-[var(--radius)] ring-1"
            />
          </div>
        </div>

        {/* 2: image crop */}
        <div data-reveal className={cn(cell, 'md:col-span-5')}>
          <div className="bg-surface-img relative aspect-[16/8] overflow-hidden">
            <img
              src={shotSrc('adjustments', 800)}
              alt={m['pc.shots.adjustments']()}
              width={800}
              height={500}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-right-top"
            />
          </div>
          <div className="p-7">
            <h3 className={title}>{m['pc.ft.2.title']()}</h3>
            <p className={desc}>{m['pc.ft.2.desc']()}</p>
          </div>
        </div>

        {/* 3: accent tint, big number */}
        <div
          data-reveal
          className={cn(
            cell,
            'bg-primary/[0.09] ring-primary/25 p-7 md:col-span-5'
          )}
        >
          <p className="font-display text-brand text-5xl font-extrabold tabular-nums">
            307/309
          </p>
          <h3 className={cn(title, 'mt-5')}>{m['pc.ft.3.title']()}</h3>
          <p className={desc}>{m['pc.ft.3.desc']()}</p>
        </div>

        {/* 4-6 */}
        <div data-reveal className={cn(cell, 'p-7 md:col-span-4')}>
          <h3 className={title}>{m['pc.ft.4.title']()}</h3>
          <p className={desc}>{m['pc.ft.4.desc']()}</p>
          <p className="label-mono text-muted-foreground mt-auto pt-8 text-[11px]">
            Metal / Vulkan / DX12 / WebGPU
          </p>
        </div>
        <div data-reveal className={cn(cell, 'md:col-span-4')}>
          <div className="calibration-strip h-2" aria-hidden />
          <div className="p-7">
            <h3 className={title}>{m['pc.ft.5.title']()}</h3>
            <p className={desc}>{m['pc.ft.5.desc']()}</p>
          </div>
        </div>
        <div
          data-reveal
          className={cn(
            cell,
            'bg-surface-img p-7 text-[oklch(0.94_0.004_250)] md:col-span-4'
          )}
        >
          <h3 className={title}>{m['pc.ft.6.title']()}</h3>
          <p className="mt-3 leading-relaxed text-[oklch(0.78_0.008_255)]">
            {m['pc.ft.6.desc']()}
          </p>
          <pre className="mt-auto overflow-x-auto pt-6 font-mono text-[12px] text-[oklch(0.78_0.008_255)]">
            <code>$ photocraft-cli mcp</code>
          </pre>
        </div>
      </div>
    </Section>
  );
}

const SHOT_CAPTION: Record<(typeof SCREENSHOTS)[number], () => string> = {
  adjustments: m['pc.shots.adjustments'],
  'layer-styles': m['pc.shots.layer-styles'],
  masks: m['pc.shots.masks'],
  filters: m['pc.shots.filters'],
  type: m['pc.shots.type'],
  vector: m['pc.shots.vector'],
  transform: m['pc.shots.transform'],
  'export-light': m['pc.shots.export-light'],
};

export function PhotoCraftScreenshots() {
  const [active, setActive] = useState<(typeof SCREENSHOTS)[number]>(
    SCREENSHOTS[2]
  );

  return (
    <Section id="screenshots" className="bg-secondary/60">
      <SectionHeading title={m['pc.shots.title']()} sub={m['pc.shots.sub']()} />
      <figure className="mt-12">
        <ShotFrame>
          <img
            key={active}
            src={shotSrc(active, 1600)}
            srcSet={`${shotSrc(active, 800)} 800w, ${shotSrc(active, 1600)} 1600w`}
            sizes="(max-width: 1280px) 100vw, 1216px"
            alt={SHOT_CAPTION[active]()}
            width={1600}
            height={1000}
            loading="lazy"
            className="animate-in fade-in block h-auto w-full duration-500"
          />
        </ShotFrame>
        <figcaption className="text-muted-foreground mt-4 text-sm">
          {SHOT_CAPTION[active]()}
        </figcaption>
      </figure>
      <div className="-mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-8 sm:overflow-visible sm:px-0">
        {SCREENSHOTS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(s)}
            aria-label={SHOT_CAPTION[s]()}
            aria-pressed={s === active}
            className={cn(
              'bg-surface-img w-32 shrink-0 cursor-pointer snap-start overflow-hidden rounded-[calc(var(--radius)-2px)] ring-2 transition sm:w-auto',
              s === active
                ? 'ring-primary'
                : 'opacity-60 ring-transparent hover:opacity-100'
            )}
          >
            <img
              src={shotSrc(s, 800)}
              alt=""
              width={800}
              height={500}
              loading="lazy"
              className="block h-auto w-full"
            />
          </button>
        ))}
      </div>
    </Section>
  );
}

const APPS = [
  ['PhotoCraft', m['pc.ac.app.photocraft']],
  ['VectorCraft', m['pc.ac.app.vectorcraft']],
  ['FilmCraft', m['pc.ac.app.filmcraft']],
  ['LightCraft', m['pc.ac.app.lightcraft']],
  ['PdfCraft', m['pc.ac.app.pdfcraft']],
  ['EffectCraft', m['pc.ac.app.effectcraft']],
  ['DesignCraft', m['pc.ac.app.designcraft']],
] as const;

export function PhotoCraftArtCraft() {
  return (
    <Section id="artcraft">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow={m['pc.ac.eyebrow']()}
            title={m['pc.ac.title']()}
          />
          <div className="text-foreground/85 mt-8 max-w-[60ch] space-y-5 text-[1.05rem] leading-[1.75]">
            <p>{m['pc.ac.p1']()}</p>
            <p>{m['pc.ac.p2']()}</p>
            <p>{m['pc.ac.p3']()}</p>
          </div>
          <a
            href={PHOTOCRAFT_LINKS.artcraft}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand mt-8 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
          >
            getartcraft.com <ArrowUpRight className="size-4" />
          </a>
        </div>
        <ol className="lg:col-span-5 lg:col-start-8">
          {APPS.map(([name, role], i) => (
            <li
              key={name}
              data-reveal
              className={cn(
                'border-border flex items-baseline justify-between gap-6 border-b py-5',
                i === 0 && 'border-t'
              )}
            >
              {name === 'VectorCraft' ? (
                <Link
                  href="/vectorcraft"
                  className="font-display text-foreground/70 hover:text-brand text-2xl font-bold underline-offset-4 hover:underline sm:text-3xl"
                >
                  {name}
                </Link>
              ) : (
                <span
                  className={cn(
                    'font-display text-2xl font-bold sm:text-3xl',
                    i === 0 ? 'text-foreground' : 'text-foreground/70'
                  )}
                >
                  {name}
                </span>
              )}
              <span className="text-muted-foreground text-right text-sm">
                {i === 0 ? (
                  <span className="text-brand font-semibold">
                    {m['pc.ac.you_are_here']()}
                  </span>
                ) : name === 'VectorCraft' ? (
                  <Link
                    href="/vectorcraft"
                    className="text-brand inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline"
                  >
                    {m['pc.ac.vc_guide']()}
                    <ArrowRight className="size-3.5" />
                  </Link>
                ) : (
                  role()
                )}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
