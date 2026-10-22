import type { ReactNode } from 'react';

import { vcShotSrc } from '@/config/vectorcraft';
import { m } from '@/paraglide/messages.js';
import { useReveal } from '@/hooks/use-reveal';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { PageHero } from '@/blocks/photocraft/page-hero';

import { VectorCraftAdvantages, VectorCraftCompare } from './compare';
import { VectorCraftDownload } from './download';
import {
  VC_ONLINE_FAQ,
  VectorCraftOnlineApp,
  VectorCraftOnlineHowTo,
  VectorCraftOnlineIntro,
} from './online';
import {
  VectorCraftAbout,
  VectorCraftActions,
  VectorCraftAgents,
  VectorCraftCta,
  VectorCraftFacts,
  VectorCraftFaq,
  VectorCraftFeatures,
  VectorCraftFormats,
  VectorCraftOnlineTeaser,
  VectorCraftStatus,
} from './sections';

function Shell({ children }: { children: ReactNode }) {
  useReveal();
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export function VectorCraftPage() {
  return (
    <Shell>
      <PageHero
        crumb="VectorCraft"
        title={m['vc.page.main.h1']()}
        lede={m['vc.page.main.lede']()}
        shot="bezier"
        shotSrc={vcShotSrc}
        shotAlt={m['vc.shots.bezier']()}
      >
        <VectorCraftActions />
      </PageHero>
      <VectorCraftFacts />
      <VectorCraftAbout />
      <VectorCraftFeatures />
      <VectorCraftOnlineTeaser />
      <VectorCraftFormats />
      <VectorCraftAgents />
      <VectorCraftDownload />
      <VectorCraftStatus />
      <VectorCraftFaq />
      <VectorCraftCta />
    </Shell>
  );
}

export function VectorCraftComparePage() {
  return (
    <Shell>
      <PageHero
        crumb={m['vc.crumb.compare']()}
        parent={{ href: '/vectorcraft', label: 'VectorCraft' }}
        title={m['vc.page.cmp.h1']()}
        lede={m['vc.page.cmp.lede']()}
        shot="sheet"
        shotSrc={vcShotSrc}
        shotAlt={m['vc.shots.sheet']()}
      >
        <VectorCraftActions compare={false} />
      </PageHero>
      <VectorCraftAdvantages />
      <VectorCraftCompare />
      <VectorCraftStatus />
      <VectorCraftCta />
    </Shell>
  );
}

export function VectorCraftOnlinePage() {
  return (
    <Shell>
      <VectorCraftOnlineIntro />
      <VectorCraftOnlineApp />
      <VectorCraftOnlineHowTo />
      <VectorCraftFaq items={VC_ONLINE_FAQ} />
      <VectorCraftFeatures />
    </Shell>
  );
}
