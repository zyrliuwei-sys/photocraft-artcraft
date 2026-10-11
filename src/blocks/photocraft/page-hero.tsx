import { ChevronRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { shotSrc } from '@/config/photocraft';
import { m } from '@/paraglide/messages.js';
import { ShotFrame } from '@/components/editorial-section';

/** Inner-page opener: breadcrumb, H1, keyword-rich lede, one product frame. */
export function PageHero({
  crumb,
  title,
  lede,
  shot,
  shotAlt,
}: {
  crumb: string;
  title: string;
  lede: string;
  shot: string;
  shotAlt: string;
}) {
  return (
    <section className="border-border border-b">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pt-16 lg:pb-20">
        <div className="lg:col-span-7">
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
              <li className="text-foreground" aria-current="page">
                {crumb}
              </li>
            </ol>
          </nav>
          <h1 className="font-display mt-6 text-4xl leading-[1.05] font-extrabold text-balance sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          <p className="text-foreground/80 mt-7 max-w-[64ch] text-[1.075rem] leading-[1.75]">
            {lede}
          </p>
        </div>
        <div className="animate-hero-print hidden lg:col-span-5 lg:block">
          <ShotFrame>
            <img
              src={shotSrc(shot, 800)}
              alt={shotAlt}
              width={800}
              height={500}
              fetchPriority="high"
              className="block h-auto w-full"
            />
            <div className="calibration-strip" aria-hidden />
          </ShotFrame>
        </div>
      </div>
    </section>
  );
}
