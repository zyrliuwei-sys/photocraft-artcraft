import { usePathname } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { isEnglishOnlyPath } from '@/config/english-content';
import { localeNames } from '@/config/locale';
import { m } from '@/paraglide/messages.js';
import { getLocale, localizeUrl } from '@/paraglide/runtime.js';
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
  const other = getLocale() === 'zh' ? 'en' : 'zh';
  const pathname = usePathname();
  const localePath = isEnglishOnlyPath(pathname) ? '/' : pathname;
  const localizedPath = localizeUrl(new URL(localePath, envConfigs.app_url), {
    locale: other,
  }).pathname;

  return (
    <SiteHeader
      navLinks={navLinks}
      logoAlt={m['pc.logo_alt']()}
      cta={{ href: '/download', label: m['pc.nav.download']() }}
      localeToggle={{
        label: localeNames[other],
        hrefLang: other,
        href:
          localePath === '/'
            ? `${localizedPath.replace(/\/$/, '')}/`
            : localizedPath,
      }}
    />
  );
}
