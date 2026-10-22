import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { baseLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { getLocalPosts } from '@/content/posts';

const STATIC_PATHS = [
  '',
  '/download',
  '/install-guide',
  '/photocraft-vs-photoshop',
  '/vectorcraft',
  '/vectorcraft/online',
  '/vectorcraft-vs-illustrator',
  '/privacy-policy',
  '/terms-of-service',
];

type Entry = {
  path: string;
  lastModified?: string;
  changeFrequency: string;
  priority: number;
};

function urlFor(path: string, locale: string): string {
  return localizeUrl(`${envConfigs.app_url}${path || '/'}`, {
    locale: locale as (typeof locales)[number],
  }).href;
}

// One <url> per language version, each listing every alternate (Google's
// recommended hreflang form) — so /zh pages are real <loc>s that crawlers and
// the IndexNow sitemap submit pick up, not just alternates of the en page.
function entryXml(e: Entry): string {
  const alternates = [
    ...locales.map(
      (loc) =>
        `    <xhtml:link rel="alternate" hreflang="${loc}" href="${urlFor(e.path, loc)}"/>`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(e.path, baseLocale)}"/>`,
  ].join('\n');
  return locales
    .map((loc) =>
      [
        '  <url>',
        `    <loc>${urlFor(e.path, loc)}</loc>`,
        alternates,
        e.lastModified ? `    <lastmod>${e.lastModified}</lastmod>` : null,
        `    <changefreq>${e.changeFrequency}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n');
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const entries: Entry[] = STATIC_PATHS.map((path) => ({
          path,
          changeFrequency: path === '/blog' ? 'daily' : 'weekly',
          priority: path === '' ? 1 : 0.8,
        }));

        // Blog: published database articles merged with local MDX posts
        // (database wins on slug). /blog is listed once it has any post —
        // an empty blog index is noindex.
        let dbPosts: { slug: string; createdAt: Date | string }[] = [];
        try {
          const { listPublishedArticles } =
            await import('@/modules/posts/service');
          dbPosts = await listPublishedArticles().catch(() => []);
        } catch {
          // Database unreachable — local posts still go in.
        }
        const posts = new Map<string, string>();
        for (const post of getLocalPosts(baseLocale)) {
          posts.set(post.slug, post.createdAt);
        }
        for (const post of dbPosts) {
          posts.set(post.slug, new Date(post.createdAt).toISOString());
        }
        if (posts.size > 0) {
          entries.push({
            path: '/blog',
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
        for (const [slug, createdAt] of posts) {
          entries.push({
            path: `/blog/${slug}`,
            lastModified: createdAt,
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...entries.map(entryXml),
          '</urlset>',
          '',
        ].join('\n');

        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});
