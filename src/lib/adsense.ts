// AdSense publisher ID bundled with the site. The admin panel value
// (`adsense_code`) takes precedence so the account can be swapped without a
// deploy; this default keeps the loader and /ads.txt live out of the box.
export const DEFAULT_ADSENSE_CODE = 'ca-pub-2841223102464177';

export function resolveAdsenseCode(configured?: string | null): string {
  return configured?.trim() || DEFAULT_ADSENSE_CODE;
}
