import { createFileRoute } from '@tanstack/react-router';

import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { VectorCraftComparePage } from '@/blocks/vectorcraft/pages';

import { breadcrumbJsonLd, photocraftHead } from './-photocraft-head';

export const Route = createFileRoute('/vectorcraft-vs-illustrator')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en';
    return photocraftHead({
      path: '/vectorcraft-vs-illustrator',
      locale,
      title: m['vc.page.cmp.title']({}, { locale }),
      description: m['vc.page.cmp.desc']({}, { locale }),
      image: '/imgs/vectorcraft/sheet-1600.webp',
      jsonLd: [
        breadcrumbJsonLd(locale, [
          [m['pc.breadcrumb.home']({}, { locale }), '/'],
          ['VectorCraft', '/vectorcraft'],
          [
            m['vc.crumb.compare']({}, { locale }),
            '/vectorcraft-vs-illustrator',
          ],
        ]),
      ],
    });
  },
  component: VectorCraftComparePage,
});
