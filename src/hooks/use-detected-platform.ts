import { useEffect, useState } from 'react';

import type { PlatformId } from '@/config/photocraft';

/** Best-guess desktop OS from the user agent; null on the server and on mobile. */
export function useDetectedPlatform(): PlatformId | null {
  const [platform, setPlatform] = useState<PlatformId | null>(null);
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Android|iPhone|iPad|iPod/i.test(ua)) return;
    if (/Mac/i.test(ua)) setPlatform('macos');
    else if (/Win/i.test(ua)) setPlatform('windows');
    else if (/Linux|X11|CrOS/i.test(ua)) setPlatform('linux');
  }, []);
  return platform;
}
