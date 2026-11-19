import { m } from '@/paraglide/messages.js';
import { SiteHeader } from '@/components/site-header';

export function Header() {
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
    />
  );
}
