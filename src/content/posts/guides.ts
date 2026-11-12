import { ENGLISH_ONLY_POST_SLUGS } from '@/config/english-content';
import { m } from '@/paraglide/messages.js';
import { baseLocale, type Locale } from '@/paraglide/runtime.js';

import { getEnglishGuideMeta, isEnglishGuideSlug } from './english-guides';

// Metadata only: the homepage can list guides without downloading their MDX.
const LOCALIZED_GUIDE_SLUGS = [
  'artcraft-photoshop-guide',
  'how-to-install-photocraft',
  'artcraft-for-mac',
  'photocraft-windows-guide',
] as const;

export const GUIDE_SLUGS = [
  ...LOCALIZED_GUIDE_SLUGS,
  ...ENGLISH_ONLY_POST_SLUGS,
] as const;

export function getGuideSlugs(locale: Locale) {
  return locale === baseLocale ? GUIDE_SLUGS : LOCALIZED_GUIDE_SLUGS;
}

export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export function getGuideMeta(slug: GuideSlug, locale: Locale) {
  if (isEnglishGuideSlug(slug)) return getEnglishGuideMeta(slug);
  const text = {
    'artcraft-photoshop-guide': {
      title: m['guides.photoshop.title'],
      description: m['guides.photoshop.description'],
      alt: m['guides.photoshop.image_alt'],
      image: '/imgs/photocraft/demo-1600.webp',
    },
    'how-to-install-photocraft': {
      title: m['guides.install.title'],
      description: m['guides.install.description'],
      alt: m['guides.install.image_alt'],
      image: '/imgs/photocraft/transform-1600.webp',
    },
    'artcraft-for-mac': {
      title: m['guides.mac.title'],
      description: m['guides.mac.description'],
      alt: m['guides.mac.image_alt'],
      image: '/imgs/photocraft/type-1600.webp',
    },
    'photocraft-windows-guide': {
      title: m['guides.windows.title'],
      description: m['guides.windows.description'],
      alt: m['guides.windows.image_alt'],
      image: '/imgs/photocraft/layer-styles-1600.webp',
    },
  }[slug];
  return {
    title: text.title({}, { locale }),
    description: text.description({}, { locale }),
    image: text.image,
    image_alt: text.alt({}, { locale }),
    image_caption: m['guides.screenshot_caption']({}, { locale }),
    created_at: '2026-11-05T08:00:00+08:00',
  };
}
