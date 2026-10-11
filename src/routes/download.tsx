import { createFileRoute } from '@tanstack/react-router';

import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { PhotoCraftDownloadPage } from '@/blocks/photocraft/pages';

import { breadcrumbJsonLd, photocraftHead } from './-photocraft-head';

export const Route = createFileRoute('/download')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en';
    return photocraftHead({
      path: '/download',
      locale,
      title: m['pc.page.download.title']({}, { locale }),
      description: m['pc.page.download.desc']({}, { locale }),
      jsonLd: [
        breadcrumbJsonLd(locale, [
          [m['pc.breadcrumb.home']({}, { locale }), '/'],
          [m['pc.nav.download']({}, { locale }), '/download'],
        ]),
      ],
    });
  },
  component: PhotoCraftDownloadPage,
});
