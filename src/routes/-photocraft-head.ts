import { envConfigs } from '@/config';
import { locales, localizeUrl, type Locale } from '@/paraglide/runtime.js';

const OG_IMAGE = '/imgs/photocraft/demo-1600.webp';

/** Shared <head> for the PhotoCraft marketing pages: meta, OG, hreflang, JSON-LD. */
export function photocraftHead({
  path,
  locale,
  title,
  description,
  image: imagePath = OG_IMAGE,
  jsonLd = [],
}: {
  path: string;
  locale: Locale;
  title: string;
  description: string;
  /** Social preview image path; defaults to the PhotoCraft demo shot. */
  image?: string;
  jsonLd?: object[];
}) {
  const urlFor = (loc: string) =>
    localizeUrl(`${envConfigs.app_url}${path}`, { locale: loc as Locale }).href;
  const image = `${envConfigs.app_url}${imagePath}`;
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: urlFor(locale) },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: image },
    ],
    links: [
      { rel: 'canonical', href: urlFor(locale) },
      ...locales.map((loc) => ({
        rel: 'alternate',
        hrefLang: loc,
        href: urlFor(loc),
      })),
      { rel: 'alternate', hrefLang: 'x-default', href: urlFor('en') },
    ],
    scripts: jsonLd.map((data) => ({
      type: 'application/ld+json',
      children: JSON.stringify(data),
    })),
  };
}

/** schema.org BreadcrumbList for an inner page: [[name, path], ...]. */
export function breadcrumbJsonLd(locale: Locale, items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: localizeUrl(`${envConfigs.app_url}${path}`, { locale }).href,
    })),
  };
}
