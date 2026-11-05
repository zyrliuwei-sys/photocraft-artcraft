import { MDXProvider } from '@mdx-js/react';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import type { Locale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { MarkdownContent } from '@/components/markdown-content';
import { mdxComponents } from '@/components/mdx-components';
import {
  formatPostDate,
  loadLocalPost,
  type BlogPostDetail,
} from '@/content/posts';
import { getGuideMeta, GUIDE_SLUGS } from '@/content/posts/guides';

export function BlogPost({
  locale,
  post,
}: {
  locale: Locale;
  post: BlogPostDetail;
}) {
  // Local posts render their bundled MDX component; database posts render
  // raw markdown through MarkdownContent.
  const LocalContent =
    post.source === 'local' ? loadLocalPost(post.slug, locale)?.default : null;

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-6 py-12 md:px-8 md:py-16">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="size-4" />
            {m['blog.back_to_blog']()}
          </Link>

          <header className="border-border mt-8 mb-6 border-b pb-6">
            <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-muted-foreground mt-3">{post.description}</p>
            )}
            <div className="text-muted-foreground mt-4 flex items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" />
                {formatPostDate(post.createdAt, locale)}
              </span>
              {(post.authorName || post.authorImage) && (
                <span className="inline-flex items-center gap-2">
                  {post.authorImage && (
                    <img
                      src={post.authorImage}
                      alt={post.authorName || ''}
                      width={20}
                      height={20}
                      className="size-5 rounded-full object-cover"
                    />
                  )}
                  {post.authorName}
                </span>
              )}
            </div>
          </header>

          {post.image && (
            <figure className="mb-8">
              <img
                src={post.image}
                alt={post.imageAlt || post.title}
                width={1600}
                height={1000}
                fetchPriority="high"
                className="border-border h-auto w-full rounded-[var(--radius)] border"
              />
              {post.imageCaption && (
                <figcaption className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {post.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {LocalContent ? (
            <div className="text-foreground/90 text-[15px] leading-7">
              <MDXProvider components={mdxComponents}>
                <LocalContent />
              </MDXProvider>
            </div>
          ) : (
            <MarkdownContent content={post.content || ''} />
          )}
          <aside
            className="border-border mt-12 border-t pt-8"
            aria-labelledby="related-guides"
          >
            <h2
              id="related-guides"
              className="font-display text-xl font-semibold"
            >
              {m['guides.related']()}
            </h2>
            <ul className="divide-border mt-4 divide-y">
              {GUIDE_SLUGS.filter((slug) => slug !== post.slug).map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/blog/${slug}`}
                    className="group flex items-center justify-between gap-4 py-4 text-sm font-medium"
                  >
                    <span className="group-hover:underline">
                      {getGuideMeta(slug, locale).title}
                    </span>
                    <ArrowRight className="size-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <section className="bg-secondary mt-8 rounded-[var(--radius)] p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">
              {m['guides.cta_title']()}
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              {m['guides.cta_description']()}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link href="/" className="text-primary hover:underline">
                {m['guides.home_cta']()}
              </Link>
              <Link href="/download" className="hover:underline">
                {m['guides.download_cta']()}
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
