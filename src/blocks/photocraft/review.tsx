import { ArrowRight, Minus, Plus } from 'lucide-react';

import { shotSrc } from '@/config/photocraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import type { Locale } from '@/paraglide/runtime.js';
import { Section, SectionHeading } from '@/components/editorial-section';

import { btnPrimary } from './shared';

export function PhotoCraftReview() {
  const notes = [
    [m['pc.rv.1.title'](), m['pc.rv.1.desc']()],
    [m['pc.rv.2.title'](), m['pc.rv.2.desc']()],
    [m['pc.rv.3.title'](), m['pc.rv.3.desc']()],
    [m['pc.rv.4.title'](), m['pc.rv.4.desc']()],
  ];
  const lists = [
    {
      title: m['pc.rv.pros'](),
      Icon: Plus,
      good: true,
      items: [
        m['pc.rv.pros.1'](),
        m['pc.rv.pros.2'](),
        m['pc.rv.pros.3'](),
        m['pc.rv.pros.4'](),
      ],
    },
    {
      title: m['pc.rv.cons'](),
      Icon: Minus,
      good: false,
      items: [
        m['pc.rv.cons.1'](),
        m['pc.rv.cons.2'](),
        m['pc.rv.cons.3'](),
        m['pc.rv.cons.4'](),
      ],
    },
  ];

  return (
    <Section id="review" className="bg-secondary/60">
      <SectionHeading title={m['pc.rv.title']()} sub={m['pc.rv.sub']()} />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <figure className="lg:col-span-6">
          <blockquote className="font-display max-w-[30ch] text-xl leading-[1.4] font-semibold text-pretty sm:text-2xl">
            {m['pc.rv.verdict']()}
          </blockquote>
          <figcaption className="text-brand mt-6 text-sm font-semibold">
            {m['pc.rv.verdict_by']()}
          </figcaption>
        </figure>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-6">
          {notes.map(([t, d]) => (
            <div key={t} data-reveal>
              <dt className="font-display text-lg font-bold">{t}</dt>
              <dd className="text-muted-foreground mt-2 leading-relaxed">
                {d}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-border mt-16 grid grid-cols-1 gap-10 border-t pt-12 md:grid-cols-2 md:gap-16">
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
        {m['pc.rv.sources']()}
      </p>
    </Section>
  );
}

const FAQ_KEYS = [
  [m['pc.faq.1.q'], m['pc.faq.1.a']],
  [m['pc.faq.2.q'], m['pc.faq.2.a']],
  [m['pc.faq.3.q'], m['pc.faq.3.a']],
  [m['pc.faq.4.q'], m['pc.faq.4.a']],
  [m['pc.faq.5.q'], m['pc.faq.5.a']],
  [m['pc.faq.6.q'], m['pc.faq.6.a']],
  [m['pc.faq.7.q'], m['pc.faq.7.a']],
  [m['pc.faq.8.q'], m['pc.faq.8.a']],
  [m['pc.faq.9.q'], m['pc.faq.9.a']],
] as const;

export function PhotoCraftFaq() {
  return (
    <Section id="faq" inner="max-w-3xl">
      <SectionHeading title={m['pc.faq.title']()} />
      {/* Native <details>: answers stay in the HTML for crawlers and no-JS. */}
      <div className="border-border mt-10 border-t">
        {FAQ_KEYS.map(([q, a], i) => (
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
export function faqJsonLd(locale: Locale) {
  const o = { locale };
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_KEYS.map(([q, a]) => ({
      '@type': 'Question',
      name: q({}, o),
      acceptedAnswer: { '@type': 'Answer', text: a({}, o) },
    })),
  };
}

export function PhotoCraftCta() {
  return (
    <section className="bg-surface-img relative isolate overflow-hidden">
      <img
        src={shotSrc('transform', 1600)}
        alt=""
        width={1600}
        height={1000}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.15_0.005_260)_0%,oklch(0.15_0.005_260/0.85)_45%,oklch(0.15_0.005_260/0.2)_100%)]" />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <h2 className="font-display max-w-xl text-4xl leading-[1.05] font-extrabold text-balance text-[oklch(0.96_0.004_250)] sm:text-5xl">
          {m['pc.cta.title']()}
        </h2>
        <p className="mt-5 max-w-md text-lg text-[oklch(0.8_0.008_255)]">
          {m['pc.cta.sub']()}
        </p>
        {/* Static WebAssembly build in public/editor — a plain anchor, not a router route. */}
        <a href="/editor/" className={cn(btnPrimary, 'mt-9')}>
          {m['pc.hero.cta_editor']()}
          <ArrowRight className="size-[18px]" />
        </a>
      </div>
      <div className="calibration-strip" aria-hidden />
    </section>
  );
}
