import { useEffect, useState } from 'react';
import { LogIn, Shield } from 'lucide-react';

import { useSession } from '@/core/auth/client';
import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { useUserPermissions } from '@/hooks/use-user-permissions';
import { SiteHeader } from '@/components/site-header';
import { SiteUserMenu } from '@/components/site-user-menu';
import { buttonVariants } from '@/components/ui/button';

export function Header() {
  // Public HTML is cached as signed out. Match it on the first client render
  // before replacing the login link with the restored account controls.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const { data: session } = useSession();
  const user = hydrated ? session?.user : undefined;
  const { data: permissions } = useUserPermissions(!!user);
  const navLinks = [
    { href: '/#features', label: m['pc.nav.features']() },
    { href: '/install-guide', label: m['pc.nav.install']() },
    { href: '/photocraft-vs-photoshop', label: m['pc.nav.compare']() },
    { href: '/vectorcraft', label: 'VectorCraft' },
    { href: '/#guides', label: m['guides.nav']() },
    { href: '/#artcraft', label: m['pc.nav.artcraft']() },
    { href: '/#faq', label: m['pc.nav.faq']() },
    { href: '/about', label: m['pc.nav.about']() },
    { href: '/contact', label: m['pc.nav.contact']() },
  ];
  return (
    <SiteHeader
      navLinks={navLinks}
      logoAlt={m['pc.logo_alt']()}
      cta={{ href: '/download', label: m['pc.nav.download']() }}
      account={
        user ? (
          <>
            {permissions?.isAdmin && (
              <Link
                href="/admin"
                className={buttonVariants({
                  variant: 'outline',
                  className: 'min-h-10',
                })}
              >
                <Shield className="size-4" />
                {m['common.systems.admin']()}
              </Link>
            )}
            <SiteUserMenu
              name={user.name || user.email}
              email={user.email}
              image={user.image}
            />
          </>
        ) : (
          <Link
            href="/sign-in?callbackUrl=%2Fadmin"
            className={buttonVariants({
              variant: 'outline',
              className: 'min-h-10',
            })}
          >
            <LogIn className="size-4" />
            {m['common.nav.sign_in']()}
          </Link>
        )
      }
      labels={{
        navigation: m['common.nav.navigation'](),
        openMenu: m['common.nav.open_menu'](),
        closeMenu: m['common.nav.close_menu'](),
      }}
    />
  );
}
