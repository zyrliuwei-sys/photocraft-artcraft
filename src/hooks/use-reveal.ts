import { useEffect } from 'react';

/**
 * Fade-in-on-scroll for every `[data-reveal]` element. Classes are only added
 * client-side, so SSR/no-JS output stays fully visible.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    );
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    for (const el of els) {
      const rect = el.getBoundingClientRect();
      // Already on screen: leave it alone so there's no flash.
      if (rect.top < window.innerHeight) continue;
      el.classList.add('reveal');
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
}
