import { useState, type ReactNode } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export interface NavLink {
  href: string;
  label: string;
  /** Open in a new tab. Off-site (http) hrefs always open in a new tab. */
  external?: boolean;
}

/** Off-site URLs render as plain <a>; internal paths use the locale-aware Link. */
const isExternalHref = (href: string) => /^https?:\/\//.test(href);

export function SiteHeader({
  navLinks,
  logoAlt,
  cta,
  account,
  labels,
}: {
  navLinks?: NavLink[];
  logoAlt: string;
  cta?: { href: string; label: string };
  account?: ReactNode;
  labels: { navigation: string; openMenu: string; closeMenu: string };
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-background/95 border-border sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-18 max-w-[1536px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <img
            src={envConfigs.app_logo}
            alt={logoAlt}
            width={512}
            height={512}
            className="size-8 shrink-0 rounded-md"
          />
          <span className="font-display truncate text-[15px] font-bold">
            {envConfigs.app_name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden shrink-0 items-center gap-4 min-[1440px]:flex"
          aria-label={labels.navigation}
        >
          {navLinks?.map((link) =>
            isExternalHref(link.href) ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Account access stays visible on phones as well as desktop. */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {account}
          {cta && (
            <Link
              href={cta.href}
              className={cn(
                buttonVariants(),
                'hidden min-h-10 gap-1.5 sm:inline-flex'
              )}
            >
              {cta.label}
              <ArrowRight className="size-4" />
            </Link>
          )}
          {/* Mobile toggle */}
          <button
            className="flex size-10 items-center justify-center min-[1440px]:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? labels.closeMenu : labels.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="site-mobile-menu"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="site-mobile-menu"
          className="border-border border-t px-4 pt-2 pb-4 min-[1440px]:hidden"
        >
          <nav className="flex flex-col gap-2" aria-label={labels.navigation}>
            {navLinks?.map((link) =>
              isExternalHref(link.href) ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          {cta && (
            <div className="border-border mt-3 border-t pt-3 sm:hidden">
              <Link
                href={cta.href}
                className={cn(buttonVariants(), 'min-h-10 w-full gap-1.5')}
                onClick={() => setMobileOpen(false)}
              >
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
