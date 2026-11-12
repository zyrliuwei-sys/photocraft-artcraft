import { ENGLISH_ONLY_POST_SLUGS } from '@/config/english-content';

export type EnglishGuideSlug = (typeof ENGLISH_ONLY_POST_SLUGS)[number];

export function isEnglishGuideSlug(slug: string): slug is EnglishGuideSlug {
  return ENGLISH_ONLY_POST_SLUGS.some((item) => item === slug);
}

export const ENGLISH_GUIDES = {
  'photocraft-psd-round-trip-checklist': {
    title: 'PhotoCraft vs Photoshop: A Practical PSD Round-Trip Checklist',
    description:
      'Check editable layers, text, masks, and layer styles before and after a PSD handoff, with documented limitations and a repeatable workflow.',
    image: '/imgs/photocraft/layer-styles-1600.webp',
    image_alt: 'Upstream PhotoCraft screenshot showing the Layer Style dialog',
  },
  'photocraft-large-image-workflow': {
    title: 'Working with Large Images in PhotoCraft: A 50-Megapixel Test Plan',
    description:
      'A reproducible way to evaluate opening, zooming, exporting, memory pressure, and scratch storage with your own large image files.',
    image: '/imgs/photocraft/export-light-1600.webp',
    image_alt: 'Upstream PhotoCraft screenshot showing an image export preview',
  },
  'photocraft-installation-troubleshooting': {
    title: 'PhotoCraft Installation Troubleshooting on Mac, Windows, and Linux',
    description:
      'Diagnose wrong packages, incomplete extraction, launch failures, rendering problems, and permissions without unsafe workarounds.',
    image: '/imgs/photocraft/demo-1600.webp',
    image_alt: 'Upstream PhotoCraft screenshot showing the editing workspace',
  },
} satisfies Record<
  EnglishGuideSlug,
  {
    title: string;
    description: string;
    image: string;
    image_alt: string;
  }
>;

export function getEnglishGuideMeta(slug: EnglishGuideSlug) {
  return {
    ...ENGLISH_GUIDES[slug],
    image_caption:
      'Official project screenshot, used to illustrate the workflow. This is not a screenshot of an independently measured test.',
    created_at: '2026-11-12T08:00:00+08:00',
  };
}
