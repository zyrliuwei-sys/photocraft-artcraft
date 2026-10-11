import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { PHOTOCRAFT_LINKS, PHOTOCRAFT_VERSION } from '@/config/photocraft';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { PhotoCraftHomePage } from '@/blocks/photocraft/pages';
import { faqJsonLd } from '@/blocks/photocraft/review';

import { photocraftHead } from './-photocraft-head';

export const Route = createFileRoute('/')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en';
    const title = m['common.metadata.title']({}, { locale });
    const description = m['common.metadata.description']({}, { locale });
    return photocraftHead({
      path: '/',
      locale,
      title,
      description,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'PhotoCraft',
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'macOS, Windows, Linux, FreeBSD',
          softwareVersion: PHOTOCRAFT_VERSION,
          license: 'https://opensource.org/licenses/MIT',
          downloadUrl: `${envConfigs.app_url}/download`,
          sameAs: [PHOTOCRAFT_LINKS.repo, PHOTOCRAFT_LINKS.officialPage],
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
        faqJsonLd(locale),
      ],
    });
  },
  component: PhotoCraftHomePage,
});
