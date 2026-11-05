import { ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Section, SectionHeading } from '@/components/editorial-section';
import { getGuideMeta, GUIDE_SLUGS } from '@/content/posts/guides';

export function PhotoCraftGuides() {
  const locale = getLocale();
  return (
    <Section id="guides" className="border-border border-t">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow={m['guides.eyebrow']()}
          title={m['landing.blog.title']()}
          sub={m['landing.blog.description']()}
        />
        <Link
          href="/blog"
          className="text-primary inline-flex items-center gap-2 text-sm font-semibold hover:underline"
        >
          {m['landing.blog.view_all']()} <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {GUIDE_SLUGS.map((slug, index) => {
          const guide = getGuideMeta(slug, locale);
          return (
            <Link key={slug} href={`/blog/${slug}`} className="group min-w-0">
              <div className="bg-surface-img overflow-hidden rounded-[var(--radius)]">
                <img
                  src={guide.image.replace('-1600.webp', '-800.webp')}
                  alt={guide.image_alt}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[8/5] w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
                />
              </div>
              <div className="border-border mt-5 flex items-start gap-3 border-t pt-4">
                <span className="text-primary font-mono text-xs tabular-nums">
                  0{index + 1}
                </span>
                <h3 className="font-display text-lg leading-snug font-semibold group-hover:underline group-hover:underline-offset-4">
                  {guide.title}
                </h3>
              </div>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {guide.description}
              </p>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
