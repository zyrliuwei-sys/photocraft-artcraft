import { ArrowRight, Download } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  PHOTOCRAFT_LINKS,
  PLATFORM_DOWNLOADS,
  shotSrc,
} from '@/config/photocraft';
import { m } from '@/paraglide/messages.js';
import { useDetectedPlatform } from '@/hooks/use-detected-platform';
import { GitHubIcon } from '@/components/brand-icons';
import { ShotFrame } from '@/components/editorial-section';

import { btnPrimary, btnSecondary } from './shared';

export function PhotoCraftHero() {
  const platform = useDetectedPlatform();
  const target = platform
    ? PLATFORM_DOWNLOADS.find((p) => p.id === platform)
    : undefined;

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-14 pb-16 sm:px-6 lg:min-h-[min(calc(100dvh-4.5rem),52rem)] lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pt-10 lg:pb-20">
        <div className="lg:col-span-5">
          <h1 className="font-display text-[2.5rem] leading-[1.02] font-extrabold text-balance sm:text-6xl lg:text-[4.1rem]">
            {m['pc.hero.title_a']()}
            <span className="text-muted-foreground mt-2 block text-[0.56em] leading-[1.12] font-semibold">
              {m['pc.hero.title_b']()}
            </span>
          </h1>
          <p className="text-muted-foreground mt-7 max-w-[34rem] text-lg leading-relaxed text-pretty">
            {m['pc.hero.sub']()}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {/* Static WebAssembly build in public/editor — a plain anchor, not a router route. */}
            <a href="/editor/" className={btnPrimary}>
              {m['pc.hero.cta_editor']()}
              <ArrowRight className="size-[18px]" />
            </a>
            {target ? (
              <a href={target.primary.href} className={btnSecondary}>
                <Download className="size-[18px]" />
                {m['pc.hero.cta_download']()}
              </a>
            ) : (
              <Link href="/download" className={btnSecondary}>
                <Download className="size-[18px]" />
                {m['pc.hero.cta_download']()}
              </Link>
            )}
            <a
              href={PHOTOCRAFT_LINKS.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSecondary}
            >
              <GitHubIcon className="size-[18px]" />
              {m['pc.hero.cta_source']()}
            </a>
          </div>
        </div>

        <div className="animate-hero-print lg:col-span-7 lg:-mr-24 xl:-mr-40">
          <ShotFrame>
            <picture>
              <source
                media="(max-width: 700px)"
                srcSet={shotSrc('demo', 800)}
                type="image/webp"
              />
              <img
                src={shotSrc('demo', 1600)}
                alt={m['pc.hero.shot_alt']()}
                width={1600}
                height={1000}
                fetchPriority="high"
                className="block h-auto w-full"
              />
            </picture>
            <div className="calibration-strip" aria-hidden />
          </ShotFrame>
        </div>
      </div>
    </section>
  );
}

export function PhotoCraftFacts() {
  const facts = [
    { value: '44.1k', label: m['pc.stats.stars']() },
    { value: '58', label: m['pc.stats.tools']() },
    { value: '27', label: m['pc.stats.blend']() },
    { value: '500+', label: m['pc.stats.commands']() },
    { value: '$0', label: m['pc.stats.price']() },
  ];
  return (
    <section className="border-border border-y">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
        {facts.map((f, i) => (
          <div
            key={f.label}
            className="border-border flex flex-col-reverse gap-1 py-8 pr-4 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <dt className="text-muted-foreground text-sm">{f.label}</dt>
            <dd
              className={
                'font-display text-4xl font-bold tabular-nums sm:text-5xl' +
                (i === facts.length - 1 ? ' text-brand' : '')
              }
            >
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function PhotoCraftIntro() {
  return (
    <section id="what-is" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <article className="lg:col-span-7">
          <h2 className="font-display text-3xl leading-[1.08] font-bold sm:text-[2.6rem]">
            {m['pc.intro.title']()}
          </h2>
          <div className="text-foreground/85 mt-8 max-w-[66ch] space-y-6 text-[1.075rem] leading-[1.75]">
            <p>
              <span className="font-display float-left mt-1.5 mr-3 text-6xl leading-[0.8] font-extrabold">
                {m['pc.intro.p1']().charAt(0)}
              </span>
              {m['pc.intro.p1']().slice(1)}
            </p>
            <p>{m['pc.intro.p2']()}</p>
            <p>{m['pc.intro.p3']()}</p>
            <p>{m['pc.intro.p4']()}</p>
          </div>
        </article>
        <aside className="lg:col-span-4 lg:col-start-9">
          <figure className="lg:sticky lg:top-28">
            <blockquote className="font-display border-brand border-l-2 pl-6 text-3xl leading-[1.15] font-semibold text-balance sm:text-4xl">
              &ldquo;{m['pc.intro.quote']()}&rdquo;
            </blockquote>
            <figcaption className="text-muted-foreground mt-5 pl-6 text-sm">
              {m['pc.intro.quote_by']()}
            </figcaption>
          </figure>
        </aside>
      </div>
    </section>
  );
}
