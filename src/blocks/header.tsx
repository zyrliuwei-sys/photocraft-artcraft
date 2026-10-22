import { localeNames } from '@/config/locale';
import { m } from '@/paraglide/messages.js';
import { getLocale, setLocale } from '@/paraglide/runtime.js';
import { SiteHeader } from '@/components/site-header';

export function Header() {
  const navLinks = [
    { href: '/#features', label: m['pc.nav.features']() },
    { href: '/install-guide', label: m['pc.nav.install']() },
    { href: '/photocraft-vs-photoshop', label: m['pc.nav.compare']() },
    { href: '/vectorcraft', label: 'VectorCraft' },
    { href: '/#artcraft', label: m['pc.nav.artcraft']() },
    { href: '/#faq', label: m['pc.nav.faq']() },
  ];
  const other = getLocale() === 'zh' ? 'en' : 'zh';

  return (
    <SiteHeader
      navLinks={navLinks}
      logoAlt={m['pc.logo_alt']()}
      cta={{ href: '/download', label: m['pc.nav.download']() }}
      localeToggle={{
        label: localeNames[other],
        hrefLang: other,
        onSelect: () => setLocale(other),
      }}
    />
  );
}
