import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import {
  VECTORCRAFT_LINKS,
  VECTORCRAFT_ONLINE_URL,
  VECTORCRAFT_VERSION,
} from '@/config/vectorcraft';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { VectorCraftPage } from '@/blocks/vectorcraft/pages';
import { vcFaqJsonLd } from '@/blocks/vectorcraft/sections';

import { breadcrumbJsonLd, photocraftHead } from '../-photocraft-head';

export const Route = createFileRoute('/vectorcraft/')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en';
    return photocraftHead({
      path: '/vectorcraft',
      locale,
      title: m['vc.page.main.title']({}, { locale }),
      description: m['vc.page.main.desc']({}, { locale }),
      image: '/imgs/vectorcraft/neon-1600.webp',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'VectorCraft',
          applicationCategory: 'DesignApplication',
          operatingSystem: 'macOS, Windows, Linux, FreeBSD, Web browser',
          softwareVersion: VECTORCRAFT_VERSION,
          license: 'https://opensource.org/licenses/MIT',
          downloadUrl: `${envConfigs.app_url}/vectorcraft#download`,
          installUrl: VECTORCRAFT_ONLINE_URL,
          sameAs: [VECTORCRAFT_LINKS.repo, VECTORCRAFT_LINKS.officialPage],
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
        breadcrumbJsonLd(locale, [
          [m['pc.breadcrumb.home']({}, { locale }), '/'],
          ['VectorCraft', '/vectorcraft'],
        ]),
        vcFaqJsonLd(locale),
      ],
    });
  },
  component: VectorCraftPage,
});
