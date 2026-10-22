import { createFileRoute } from '@tanstack/react-router';

import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { VC_ONLINE_FAQ } from '@/blocks/vectorcraft/online';
import { VectorCraftOnlinePage } from '@/blocks/vectorcraft/pages';
import { vcFaqJsonLd } from '@/blocks/vectorcraft/sections';

import { breadcrumbJsonLd, photocraftHead } from '../-photocraft-head';

export const Route = createFileRoute('/vectorcraft/online')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en';
    return photocraftHead({
      path: '/vectorcraft/online',
      locale,
      title: m['vc.page.online.title']({}, { locale }),
      description: m['vc.page.online.desc']({}, { locale }),
      image: '/imgs/vectorcraft/neon-1600.webp',
      jsonLd: [
        breadcrumbJsonLd(locale, [
          [m['pc.breadcrumb.home']({}, { locale }), '/'],
          ['VectorCraft', '/vectorcraft'],
          [m['vc.crumb.online']({}, { locale }), '/vectorcraft/online'],
        ]),
        vcFaqJsonLd(locale, VC_ONLINE_FAQ),
      ],
    });
  },
  component: VectorCraftOnlinePage,
});
