import { ArrowRight, ArrowUpRight, Minus, Plus } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  vcShotSrc,
  VECTORCRAFT_LINKS,
  VECTORCRAFT_VERSION,
} from '@/config/vectorcraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import type { Locale } from '@/paraglide/runtime.js';
import { btnPrimary, btnSecondary } from '@/blocks/photocraft/shared';
import {
  Section,
  SectionHeading,
  ShotFrame,
} from '@/components/editorial-section';

type Msg = (
  inputs?: Record<string, never>,
  options?: { locale?: Locale }
) => string;

/** Primary calls to action shared by the VectorCraft pages. */
export function VectorCraftActions({ compare = true }: { compare?: boolean }) {
  return (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link href="/vectorcraft/online" className={btnPrimary}>
        {m['vc.cta.online']()}
        <ArrowRight className="size-[18px]" />
      </Link>
      <Link href="/vectorcraft#download" className={btnSecondary}>
        {m['vc.cta.download']()}
      </Link>
      {compare && (
        <Link href="/vectorcraft-vs-illustrator" className={btnSecondary}>
          {m['vc.cta.compare']()}
        </Link>
      )}
    </div>
  );
}

export function VectorCraftFacts() {
  const facts = [
    [m['vc.facts.license'](), 'MIT / Apache-2.0'],
    [m['vc.facts.platforms'](), m['vc.facts.platforms.value']()],
    [m['vc.facts.version'](), `v${VECTORCRAFT_VERSION}`],
    [m['vc.facts.languages'](), m['vc.facts.languages.value']()],
  ];
  return (
    <section className="border-border border-b">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {facts.map(([k, val]) => (
          <div key={k}>
            <dt className="text-muted-foreground text-sm">{k}</dt>
            <dd className="font-display mt-1.5 text-lg font-bold">{val}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function VectorCraftAbout() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading title={m['vc.about.title']()} />
          <div className="text-foreground/85 mt-8 max-w-[60ch] space-y-5 text-[1.05rem] leading-[1.75]">
            <p>{m['vc.about.p1']()}</p>
            <p>{m['vc.about.p2']()}</p>
            <p>{m['vc.about.p3']()}</p>
          </div>
          <a
            href={VECTORCRAFT_LINKS.officialPage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand mt-8 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
          >
            getartcraft.com/apps/vectorcraft <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="lg:col-span-6">
          <ShotFrame>
            <img
              src={vcShotSrc('neon', 1600)}
              alt={m['vc.shots.neon']()}
              width={1600}
              height={1000}
              loading="lazy"
              className="block h-auto w-full"
            />
          </ShotFrame>
        </div>
      </div>
    </Section>
  );
}

const FEATURES: [string, Msg, Msg, Msg][] = [
  ['bezier', m['vc.ft.1.title'], m['vc.ft.1.desc'], m['vc.shots.bezier']],
  ['sheet', m['vc.ft.2.title'], m['vc.ft.2.desc'], m['vc.shots.sheet']],
  ['ribbons', m['vc.ft.3.title'], m['vc.ft.3.desc'], m['vc.shots.ribbons']],
  [
    'perspective',
    m['vc.ft.4.title'],
    m['vc.ft.4.desc'],
    m['vc.shots.perspective'],
  ],
  ['revolve', m['vc.ft.5.title'], m['vc.ft.5.desc'], m['vc.shots.revolve']],
  [
    'dimensions',
    m['vc.ft.6.title'],
    m['vc.ft.6.desc'],
    m['vc.shots.dimensions'],
  ],
];

export function VectorCraftFeatures() {
  return (
    <Section id="features" className="bg-secondary/60">
      <SectionHeading title={m['vc.ft.title']()} sub={m['vc.ft.sub']()} />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(([shot, title, desc, alt]) => (
          <article
            key={shot}
            data-reveal
            className="bg-card ring-foreground/[0.08] flex flex-col overflow-hidden rounded-[var(--radius)] ring-1"
          >
            <div className="bg-surface-img">
              <img
                src={vcShotSrc(shot, 800)}
                alt={alt()}
                width={800}
                height={500}
                loading="lazy"
                className="block h-auto w-full"
              />
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-display text-xl font-bold">{title()}</h3>
              <p className="text-muted-foreground mt-2.5 leading-relaxed">
                {desc()}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

const OPENS = [
  'SVG / SVGZ',
  'PDF',
  'AI (PDF-compatible, v7)',
  'EPS',
  'DXF',
  'EMF / WMF',
  'Affinity (.af, .afdesign, .afpub)',
  'PSD / PSB',
  'PNG / JPEG / GIF / TIFF / BMP',
];
const SAVES = [
  '.vectorcraft (JSON)',
  'SVG',
  'PDF / PDF/X',
  'AI (PDF-compatible)',
  'PSD',
  'PNG / JPEG / WebP',
];

export function VectorCraftFormats() {
  const lists = [
    { title: m['vc.fmt.open'](), items: OPENS },
    { title: m['vc.fmt.save'](), items: SAVES },
  ];
  return (
    <Section id="formats">
      <SectionHeading title={m['vc.fmt.title']()} sub={m['vc.fmt.sub']()} />
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {lists.map(({ title, items }) => (
          <div
            key={title}
            className="bg-card ring-foreground/[0.08] rounded-[var(--radius)] p-6 ring-1 sm:p-8"
          >
            <h3 className="font-display text-xl font-bold">{title}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {items.map((t) => (
                <li
                  key={t}
                  className="bg-secondary rounded-full px-3 py-1.5 font-mono text-[13px]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground mt-6 max-w-3xl text-sm leading-relaxed">
        {m['vc.fmt.note']()}
      </p>
    </Section>
  );
}

export function VectorCraftAgents() {
  const points = [
    [m['vc.mcp.1.title'](), m['vc.mcp.1.desc']()],
    [m['vc.mcp.2.title'](), m['vc.mcp.2.desc']()],
    [m['vc.mcp.3.title'](), m['vc.mcp.3.desc']()],
  ];
  return (
    <section className="bg-surface-img text-[oklch(0.94_0.004_250)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <p className="label-mono text-[12px] text-[oklch(0.72_0.008_255)]">
          MCP · JSON control channel
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-3xl leading-[1.08] font-bold text-balance sm:text-[2.6rem]">
          {m['vc.mcp.title']()}
        </h2>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-[oklch(0.8_0.008_255)]">
          {m['vc.mcp.sub']()}
        </p>
        <dl className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {points.map(([t, d]) => (
            <div key={t} className="border-t border-white/15 pt-6">
              <dt className="font-display text-lg font-bold">{t}</dt>
              <dd className="mt-2 leading-relaxed text-[oklch(0.78_0.008_255)]">
                {d}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function VectorCraftOnlineTeaser() {
  return (
    <Section id="online">
      <div className="bg-primary/[0.07] ring-primary/25 grid grid-cols-1 items-center gap-10 rounded-[var(--radius)] p-7 ring-1 sm:p-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-brand text-sm font-semibold">
            {m['vc.onl.teaser.eyebrow']()}
          </p>
          <h2 className="font-display mt-3 text-3xl leading-[1.08] font-bold text-balance sm:text-4xl">
            {m['vc.onl.teaser.title']()}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-[56ch] text-lg leading-relaxed">
            {m['vc.onl.teaser.desc']()}
          </p>
          <Link href="/vectorcraft/online" className={cn(btnPrimary, 'mt-8')}>
            {m['vc.cta.online']()}
            <ArrowRight className="size-[18px]" />
          </Link>
        </div>
        <div className="lg:col-span-5">
          <ShotFrame>
            <img
              src={vcShotSrc('ribbons', 800)}
              alt={m['vc.shots.ribbons']()}
              width={800}
              height={500}
              loading="lazy"
              className="block h-auto w-full"
            />
          </ShotFrame>
        </div>
      </div>
    </Section>
  );
}

export function VectorCraftStatus() {
  const stats = [
    ['~88%', m['vc.status.s1']()],
    ['~75%', m['vc.status.s2']()],
    ['~65%', m['vc.status.s3']()],
  ];
  const lists = [
    {
      title: m['vc.status.works'](),
      Icon: Plus,
      good: true,
      items: [
        m['vc.status.works.1'](),
        m['vc.status.works.2'](),
        m['vc.status.works.3'](),
        m['vc.status.works.4'](),
      ],
    },
    {
      title: m['vc.status.missing'](),
      Icon: Minus,
      good: false,
      items: [
        m['vc.status.missing.1'](),
        m['vc.status.missing.2'](),
        m['vc.status.missing.3'](),
        m['vc.status.missing.4'](),
      ],
    },
  ];
  return (
    <Section id="status" className="bg-secondary/60">
      <SectionHeading
        title={m['vc.status.title']()}
        sub={m['vc.status.sub']()}
      />
      <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(([n, label]) => (
          <div
            key={n}
            className="bg-card ring-foreground/[0.08] rounded-[var(--radius)] p-6 ring-1"
          >
            <dt className="font-display text-brand text-4xl font-extrabold tabular-nums">
              {n}
            </dt>
            <dd className="text-muted-foreground mt-2 leading-relaxed">
              {label}
            </dd>
          </div>
        ))}
      </dl>
      <div className="border-border mt-14 grid grid-cols-1 gap-10 border-t pt-12 md:grid-cols-2 md:gap-16">
        {lists.map(({ title, Icon, good, items }) => (
          <div key={title}>
            <h3 className="font-semibold">{title}</h3>
            <ul className="mt-4 space-y-3">
              {items.map((t) => (
                <li key={t} className="flex gap-3 leading-relaxed">
                  <Icon
                    className={cn(
                      'mt-1 size-4 shrink-0',
                      good ? 'text-brand' : 'text-muted-foreground'
                    )}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground mt-12 text-xs">
        {m['vc.status.source']()}{' '}
        <a
          href={VECTORCRAFT_LINKS.roadmap}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          ROADMAP.md
        </a>
      </p>
    </Section>
  );
}

export type FaqItem = readonly [Msg, Msg];

export const VC_FAQ: FaqItem[] = [
  [m['vc.faq.1.q'], m['vc.faq.1.a']],
  [m['vc.faq.2.q'], m['vc.faq.2.a']],
  [m['vc.faq.3.q'], m['vc.faq.3.a']],
  [m['vc.faq.4.q'], m['vc.faq.4.a']],
  [m['vc.faq.5.q'], m['vc.faq.5.a']],
  [m['vc.faq.6.q'], m['vc.faq.6.a']],
  [m['vc.faq.7.q'], m['vc.faq.7.a']],
  [m['vc.faq.8.q'], m['vc.faq.8.a']],
  [m['vc.faq.9.q'], m['vc.faq.9.a']],
];

export function VectorCraftFaq({ items = VC_FAQ }: { items?: FaqItem[] }) {
  return (
    <Section id="faq" inner="max-w-3xl">
      <SectionHeading title={m['vc.faq.title']()} />
      {/* Native <details>: answers stay in the HTML for crawlers and no-JS. */}
      <div className="border-border mt-10 border-t">
        {items.map(([q, a], i) => (
          <details
            key={i}
            className="group border-border border-b"
            open={i === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {q()}
              <Plus className="text-muted-foreground size-5 shrink-0 transition-transform group-open:rotate-45" />
            </summary>
            <p className="text-muted-foreground pb-6 text-base leading-relaxed">
              {a()}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

/** FAQPage structured data for the same questions (rendered in route heads). */
export function vcFaqJsonLd(locale: Locale, items: FaqItem[] = VC_FAQ) {
  const o = { locale };
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({
      '@type': 'Question',
      name: q({}, o),
      acceptedAnswer: { '@type': 'Answer', text: a({}, o) },
    })),
  };
}

export function VectorCraftCta() {
  return (
    <section className="bg-surface-img relative isolate overflow-hidden">
      <img
        src={vcShotSrc('perspective', 1600)}
        alt=""
        width={1600}
        height={1000}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.15_0.005_260)_0%,oklch(0.15_0.005_260/0.85)_45%,oklch(0.15_0.005_260/0.2)_100%)]" />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <h2 className="font-display max-w-xl text-4xl leading-[1.05] font-extrabold text-balance text-[oklch(0.96_0.004_250)] sm:text-5xl">
          {m['vc.ctaband.title']()}
        </h2>
        <p className="mt-5 max-w-md text-lg text-[oklch(0.8_0.008_255)]">
          {m['vc.ctaband.sub']()}
        </p>
        <Link href="/vectorcraft/online" className={cn(btnPrimary, 'mt-9')}>
          {m['vc.cta.online']()}
          <ArrowRight className="size-[18px]" />
        </Link>
      </div>
      <div className="calibration-strip" aria-hidden />
    </section>
  );
}
