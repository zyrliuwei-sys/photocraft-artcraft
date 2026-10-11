import { m } from '@/paraglide/messages.js';
import { SiteHeader } from '@/components/site-header';

export function Header() {
  const navLinks = [
    { href: '/#features', label: m['pc.nav.features']() },
    { href: '/download', label: m['pc.nav.download']() },
    { href: '/install-guide', label: m['pc.nav.install']() },
    { href: '/photocraft-vs-photoshop', label: m['pc.nav.compare']() },
    { href: '/#artcraft', label: m['pc.nav.artcraft']() },
    { href: '/#faq', label: m['pc.nav.faq']() },
  ];

  return (
    <SiteHeader
      navLinks={navLinks}
      logoAlt={m['pc.logo_alt']()}
      cta={{ href: '/sign-in', label: m['common.nav.sign_in']() }}
    />
  );
}
