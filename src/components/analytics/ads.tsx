// Google AdSense — the adsbygoogle loader, rendered as a native head element
// (not next/script). React 19 hoists the async <script> into <head> so it lands
// in the SSR HTML directly and is visible to the AdSense crawler in View
// Source. `code` is the publisher ID (e.g. "ca-pub-XXXXXXXXXXXXXXXX"). The
// matching `google-adsense-account` <meta> lives in the root route's head.
export function Ads({ code }: { code: string }) {
  if (!code) return null;
  // async={true} flags this to React 19 as a hoistable resource — see
  // google-analytics.tsx for the full rationale.
  return (
    <script
      id="adsbygoogle-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${code}`}
      crossOrigin="anonymous"
    />
  );
}
