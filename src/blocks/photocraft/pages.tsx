import type { ReactNode } from 'react';

import { m } from '@/paraglide/messages.js';
import { useReveal } from '@/hooks/use-reveal';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';

import { PhotoCraftCompare } from './compare';
import { PhotoCraftDownload } from './download';
import { PhotoCraftFacts, PhotoCraftHero, PhotoCraftIntro } from './hero';
import {
  PhotoCraftArtCraft,
  PhotoCraftFeatures,
  PhotoCraftScreenshots,
} from './highlights';
import { PhotoCraftInstall } from './install';
import { PageHero } from './page-hero';
import { PhotoCraftCta, PhotoCraftFaq, PhotoCraftReview } from './review';

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

export function PhotoCraftHomePage() {
  return (
    <Shell>
      <PhotoCraftHero />
      <PhotoCraftFacts />
      <PhotoCraftIntro />
      <PhotoCraftFeatures />
      <PhotoCraftScreenshots />
      <PhotoCraftArtCraft />
      <PhotoCraftDownload />
      <PhotoCraftInstall />
      <PhotoCraftCompare />
      <PhotoCraftReview />
      <PhotoCraftFaq />
      <PhotoCraftCta />
    </Shell>
  );
}

export function PhotoCraftDownloadPage() {
  return (
    <Shell>
      <PageHero
        crumb={m['pc.nav.download']()}
        title={m['pc.page.download.h1']()}
        lede={m['pc.page.download.lede']()}
        shot="export-light"
        shotAlt={m['pc.shots.export-light']()}
      />
      <PhotoCraftDownload heading={false} />
      <PhotoCraftInstall />
      <PhotoCraftFaq />
    </Shell>
  );
}

export function PhotoCraftInstallPage() {
  return (
    <Shell>
      <PageHero
        crumb={m['pc.nav.install']()}
        title={m['pc.page.install.h1']()}
        lede={m['pc.page.install.lede']()}
        shot="transform"
        shotAlt={m['pc.shots.transform']()}
      />
      <PhotoCraftInstall heading={false} />
      <PhotoCraftDownload />
      <PhotoCraftCta />
    </Shell>
  );
}

export function PhotoCraftComparePage() {
  return (
    <Shell>
      <PageHero
        crumb={m['pc.nav.compare']()}
        title={m['pc.page.compare.h1']()}
        lede={m['pc.page.compare.lede']()}
        shot="filters"
        shotAlt={m['pc.shots.filters']()}
      />
      <PhotoCraftCompare heading={false} />
      <PhotoCraftReview />
      <PhotoCraftScreenshots />
      <PhotoCraftCta />
    </Shell>
  );
}
