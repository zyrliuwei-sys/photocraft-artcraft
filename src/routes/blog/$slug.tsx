import { createFileRoute, notFound, redirect } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { isEnglishOnlyPath } from '@/config/english-content';
import { m } from '@/paraglide/messages.js';
import {
  baseLocale,
  getLocale,
  locales,
  localizeUrl,
  type Locale,
} from '@/paraglide/runtime.js';
import { BlogPost } from '@/blocks/blog-post';
import { getBlogPostFn } from '@/content/posts/server';

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const locale = getLocale();
    if (locale !== baseLocale && isEnglishOnlyPath(`/blog/${params.slug}`)) {
      throw redirect({
        href: `${envConfigs.app_url}/blog/${params.slug}`,
        statusCode: 301,
      });
    }
    const post = await getBlogPostFn({ data: { slug: params.slug, locale } });
    if (!post) throw notFound();
    return { locale, post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { locale, post } = loaderData;
    const urlFor = (path: string, lang: Locale = locale) =>
      localizeUrl(new URL(path, envConfigs.app_url), { locale: lang }).href;
    const path = `/blog/${post.slug}`;
    const availableLocales: readonly Locale[] = isEnglishOnlyPath(path)
      ? [baseLocale]
      : locales;
    const canonical = urlFor(path);
    const title = `${post.title} | ${envConfigs.app_name}`;
    const image = post.image
      ? new URL(post.image, envConfigs.app_url).href
      : undefined;
    return {
      meta: [
        { title },
        { name: 'description', content: post.description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: post.description },
        { property: 'og:url', content: canonical },
        { property: 'article:published_time', content: post.createdAt },
        {
          name: 'twitter:card',
          content: image ? 'summary_large_image' : 'summary',
        },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: post.description },
        ...(image
          ? [
              { property: 'og:image', content: image },
              {
                property: 'og:image:alt',
                content: post.imageAlt || post.title,
              },
              { name: 'twitter:image', content: image },
            ]
          : []),
      ],
      links: [
        { rel: 'canonical', href: canonical },
        ...availableLocales.map((lang) => ({
          rel: 'alternate',
          hrefLang: lang,
          href: urlFor(path, lang),
        })),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: urlFor(path, baseLocale),
        },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BlogPosting',
                headline: post.title,
                description: post.description,
                datePublished: post.createdAt,
                inLanguage: locale,
                mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
                url: canonical,
                ...(image ? { image: [image] } : {}),
                ...(post.authorName
                  ? { author: { '@type': 'Person', name: post.authorName } }
                  : {}),
                publisher: {
                  '@type': 'Organization',
                  name: envConfigs.app_name,
                  url: urlFor('/'),
                },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: m['pc.breadcrumb.home']({}, { locale }),
                    item: urlFor('/'),
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: m['blog.title']({}, { locale }),
                    item: urlFor('/blog'),
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: post.title,
                    item: canonical,
                  },
                ],
              },
            ],
          }).replace(/</g, '\\u003c'),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  return <BlogPost {...Route.useLoaderData()} />;
}
