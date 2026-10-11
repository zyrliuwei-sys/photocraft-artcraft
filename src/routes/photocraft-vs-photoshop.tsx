import { createFileRoute } from '@tanstack/react-router';

import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { PhotoCraftComparePage } from '@/blocks/photocraft/pages';

import { breadcrumbJsonLd, photocraftHead } from './-photocraft-head';

export const Route = createFileRoute('/photocraft-vs-photoshop')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en';
    return photocraftHead({
      path: '/photocraft-vs-photoshop',
      locale,
      title: m['pc.page.compare.title']({}, { locale }),
      description: m['pc.page.compare.desc']({}, { locale }),
      jsonLd: [
        breadcrumbJsonLd(locale, [
          [m['pc.breadcrumb.home']({}, { locale }), '/'],
          [m['pc.nav.compare']({}, { locale }), '/photocraft-vs-photoshop'],
        ]),
      ],
    });
  },
  component: PhotoCraftComparePage,
});
