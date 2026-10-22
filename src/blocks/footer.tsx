import { PHOTOCRAFT_LINKS } from '@/config/photocraft';
import { m } from '@/paraglide/messages.js';
import { FooterBadgeList } from '@/components/footer-badge-list';
import { SiteFooter, type FooterColumn } from '@/components/site-footer';

export function Footer() {
  const columns: FooterColumn[] = [
    {
      title: m['pc.footer.product'](),
      links: [
        { label: m['pc.nav.download'](), href: '/download' },
        { label: m['pc.nav.install'](), href: '/install-guide' },
        { label: m['pc.nav.compare'](), href: '/photocraft-vs-photoshop' },
        { label: m['pc.nav.faq'](), href: '/#faq' },
      ],
    },
    {
      title: 'VectorCraft',
      links: [
        { label: m['vc.footer.overview'](), href: '/vectorcraft' },
        { label: m['vc.footer.online'](), href: '/vectorcraft/online' },
        {
          label: m['vc.crumb.compare'](),
          href: '/vectorcraft-vs-illustrator',
        },
      ],
    },
    {
      title: m['pc.footer.official'](),
      links: [
        {
          label: m['pc.footer.official_site'](),
          href: PHOTOCRAFT_LINKS.officialPage,
        },
        { label: m['pc.footer.github'](), href: PHOTOCRAFT_LINKS.repo },
        { label: m['pc.footer.discord'](), href: PHOTOCRAFT_LINKS.discord },
      ],
    },
    {
      title: m['landing.footer.legal'](),
      links: [
        { label: m['landing.footer.privacy'](), href: '/privacy-policy' },
        { label: m['landing.footer.terms'](), href: '/terms-of-service' },
      ],
    },
  ];

  return (
    <>
      <div className="calibration-strip" aria-hidden />
      <SiteFooter
        tagline={m['pc.footer.tagline']()}
        columns={columns}
        badges={
          <>
            <p className="text-muted-foreground mt-12 max-w-3xl text-xs leading-relaxed">
              {m['pc.footer.disclaimer']()}
            </p>
            <FooterBadgeList className="mt-8" />
          </>
        }
      />
    </>
  );
}
