/** New editorial content is published in English only. */
export const ENGLISH_ONLY_PAGE_SLUGS = ['about', 'contact'] as const;
export const ENGLISH_ONLY_POST_SLUGS = [
  'photocraft-psd-round-trip-checklist',
  'photocraft-large-image-workflow',
  'photocraft-installation-troubleshooting',
] as const;

export function isEnglishOnlyPath(path: string): boolean {
  const pathname = path.split(/[?#]/)[0].replace(/\/$/, '');
  return [
    ...ENGLISH_ONLY_PAGE_SLUGS.map((slug) => `/${slug}`),
    ...ENGLISH_ONLY_POST_SLUGS.map((slug) => `/blog/${slug}`),
  ].includes(pathname);
}
