import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Page section with the site's standard width and vertical rhythm. */
export function Section({
  id,
  children,
  className,
  inner,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Classes for the inner max-width container. */
  inner?: string;
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-20 sm:py-28', className)}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', inner)}>
        {children}
      </div>
    </section>
  );
}

/** Section headline with optional eyebrow and lede, stacked vertically. */
export function SectionHeading({
  title,
  sub,
  eyebrow,
  as: Tag = 'h2',
  className,
}: {
  title: ReactNode;
  sub?: ReactNode;
  eyebrow?: string;
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow && (
        <p className="text-brand mb-4 text-sm font-semibold">{eyebrow}</p>
      )}
      <Tag className="font-display text-3xl leading-[1.08] font-bold text-balance sm:text-[2.6rem]">
        {title}
      </Tag>
      {sub && (
        <p className="text-muted-foreground mt-5 max-w-[62ch] text-lg leading-relaxed text-pretty">
          {sub}
        </p>
      )}
    </div>
  );
}

/** A framed product screenshot on the dark "light-table" surface. */
export function ShotFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-surface-img ring-foreground/10 overflow-hidden rounded-[var(--radius)] shadow-[0_30px_80px_-30px_oklch(0.1_0.01_260/0.55)] ring-1',
        className
      )}
    >
      {children}
    </div>
  );
}
