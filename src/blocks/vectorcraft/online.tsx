import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronRight, Play } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { vcShotSrc, VECTORCRAFT_ONLINE_URL } from '@/config/vectorcraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { btnPrimary } from '@/blocks/photocraft/shared';
import { Section, SectionHeading } from '@/components/editorial-section';

import type { FaqItem } from './sections';

/** Compact opener so the app itself sits above the fold. */
export function VectorCraftOnlineIntro() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="hover:text-foreground">
                {m['pc.breadcrumb.home']()}
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link href="/vectorcraft" className="hover:text-foreground">
                VectorCraft
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" />
            </li>
            <li className="text-foreground" aria-current="page">
              {m['vc.crumb.online']()}
            </li>
          </ol>
        </nav>
        <h1 className="font-display mt-5 text-3xl leading-[1.08] font-extrabold text-balance sm:text-[2.6rem]">
          {m['vc.page.online.h1']()}
        </h1>
        <p className="text-foreground/80 mt-4 max-w-[80ch] text-[1.05rem] leading-[1.7]">
          {m['vc.page.online.lede']()}
        </p>
      </div>
    </section>
  );
}

/**
 * The embedded web app. The ~24 MB WebAssembly build only loads after the
 * visitor clicks Launch, so the page itself stays light for crawlers and
 * Core Web Vitals. The app is served from R2 (app.photocraftartcraft.com).
 */
export function VectorCraftOnlineApp() {
  const [launched, setLaunched] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  return (
    <section id="app" className="border-border scroll-mt-20 border-b">
      <div className="mx-auto max-w-[96rem] px-2 py-6 sm:px-4 lg:px-6">
        {launched ? (
          <iframe
            src={VECTORCRAFT_ONLINE_URL}
            title={m['vc.onl.iframe_title']()}
            allow="fullscreen; clipboard-read; clipboard-write"
            allowFullScreen
            className="ring-foreground/10 block h-[min(86dvh,960px)] min-h-[560px] w-full rounded-[var(--radius)] border-0 bg-[oklch(0.2_0.005_260)] ring-1"
          />
        ) : (
          <div className="bg-surface-img relative isolate flex h-[min(70dvh,720px)] min-h-[420px] items-center justify-center overflow-hidden rounded-[var(--radius)]">
            <img
              src={vcShotSrc('neon', 1600)}
              alt={m['vc.shots.neon']()}
              width={1600}
              height={1000}
              fetchPriority="high"
              className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
            />
            <div className="max-w-md px-6 text-center text-[oklch(0.96_0.004_250)]">
              <button
                type="button"
                onClick={() => setLaunched(true)}
                className={cn(btnPrimary, 'h-14 px-8 text-base')}
              >
                <Play className="size-5" />
                {m['vc.onl.launch']()}
              </button>
              <p className="mt-4 text-sm text-[oklch(0.82_0.008_255)]">
                {m['vc.onl.size']()}
              </p>
              {mobile && (
                <p className="mt-3 rounded-[calc(var(--radius)-2px)] bg-black/40 px-4 py-3 text-sm">
                  {m['vc.onl.mobile']()}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="text-muted-foreground mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-1 text-sm">
          <p>{m['vc.onl.hosted']()}</p>
          <div className="flex gap-5">
            <a
              href={VECTORCRAFT_ONLINE_URL}
              target="_blank"
              rel="noopener"
              className="hover:text-foreground inline-flex items-center gap-1 font-semibold"
            >
              {m['vc.onl.new_tab']()} <ArrowUpRight className="size-3.5" />
            </a>
            <a
              href={`${VECTORCRAFT_ONLINE_URL}?webgl`}
              target="_blank"
              rel="noopener"
              className="hover:text-foreground inline-flex items-center gap-1"
            >
              {m['vc.onl.webgl']()} <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VectorCraftOnlineHowTo() {
  const points = [
    [m['vc.onl.how.1.title'](), m['vc.onl.how.1.desc']()],
    [m['vc.onl.how.2.title'](), m['vc.onl.how.2.desc']()],
    [m['vc.onl.how.3.title'](), m['vc.onl.how.3.desc']()],
    [m['vc.onl.how.4.title'](), m['vc.onl.how.4.desc']()],
  ];
  return (
    <Section id="how">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            title={m['vc.onl.how.title']()}
            sub={m['vc.onl.how.sub']()}
          />
        </div>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7">
          {points.map(([t, d]) => (
            <div key={t} data-reveal className="border-border border-t pt-5">
              <dt className="font-display text-lg font-bold">{t}</dt>
              <dd className="text-muted-foreground mt-2 leading-relaxed">
                {d}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

export const VC_ONLINE_FAQ: FaqItem[] = [
  [m['vc.onl.faq.1.q'], m['vc.onl.faq.1.a']],
  [m['vc.onl.faq.2.q'], m['vc.onl.faq.2.a']],
  [m['vc.onl.faq.3.q'], m['vc.onl.faq.3.a']],
  [m['vc.onl.faq.4.q'], m['vc.onl.faq.4.a']],
  [m['vc.onl.faq.5.q'], m['vc.onl.faq.5.a']],
  [m['vc.onl.faq.6.q'], m['vc.onl.faq.6.a']],
];
