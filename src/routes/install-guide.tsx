import { createFileRoute } from '@tanstack/react-router';

import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { PhotoCraftInstallPage } from '@/blocks/photocraft/pages';

import { breadcrumbJsonLd, photocraftHead } from './-photocraft-head';

export const Route = createFileRoute('/install-guide')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en';
    return photocraftHead({
      path: '/install-guide',
      locale,
      title: m['pc.page.install.title']({}, { locale }),
      description: m['pc.page.install.desc']({}, { locale }),
      jsonLd: [
        breadcrumbJsonLd(locale, [
          [m['pc.breadcrumb.home']({}, { locale }), '/'],
          [m['pc.nav.install']({}, { locale }), '/install-guide'],
        ]),
      ],
    });
  },
  component: PhotoCraftInstallPage,
});
