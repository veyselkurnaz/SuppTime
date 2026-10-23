import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Reads the `pubDate: YYYY-MM-DD` line straight out of a post's frontmatter so the
// sitemap can carry a real <lastmod> without needing the astro:content runtime here.
function getBlogPubDate(lang, slug) {
  const path = join(__dirname, 'src/content/blog', lang, `${slug}.md`);
  if (!existsSync(path)) return null;
  const match = readFileSync(path, 'utf-8').match(/^pubDate:\s*(\S+)/m);
  return match ? new Date(match[1]).toISOString() : null;
}

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  site: 'https://supptime.app',
  trailingSlash: 'always',
  integrations: [sitemap({
    // Exclude apex redirect and thin legal pages (privacy, terms) from sitemap
    // to preserve crawl budget for blog content and interaction checker.
    filter: (url) => url !== 'https://supptime.app/' && !url.includes('/privacy/') && !url.includes('/terms/'),
    serialize(item) {
      // Interaction Checker Pages (e.g., https://supptime.app/en/interaction-checker/)
      if (item.url.includes('/interaction-checker/')) {
        item.changefreq = 'weekly';
        item.priority = 1.0;
      }
      // Blog Homepages (e.g., https://supptime.app/en/blog/)
      else if (item.url.match(/^https:\/\/supptime\.app\/[a-z-]+\/blog\/$/)) {
        item.changefreq = 'daily';
        item.priority = 0.9;
      }
      // Blog Posts (e.g., https://supptime.app/en/blog/vitamin-d/)
      else if (item.url.includes('/blog/')) {
        item.changefreq = 'daily';
        item.priority = 0.9;

        const match = item.url.match(/^https:\/\/supptime\.app\/([a-z-]+)\/blog\/([^/]+)\/$/);
        if (match) {
          const [, lang, slug] = match;
          const lastmod = getBlogPubDate(lang, slug);
          if (lastmod) item.lastmod = lastmod;
        }
      }
      // Root or Language Homepages (e.g., https://supptime.app/en/, https://supptime.app/tr/)
      else if (item.url.match(/^https:\/\/supptime\.app\/[a-z-]+\/$/)) {
        item.changefreq = 'weekly';
        item.priority = 0.8;
      }
      // Others
      else {
        item.changefreq = 'monthly';
        item.priority = 0.5;
      }
      return item;
    }
  })],
  prefetch: true,
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr', 'ko', 'ja', 'zh-cn', 'zh-tw', 'de', 'es', 'pt-br', 'it', 'nl', 'pl', 'ru', 'id', 'vi', 'th', 'ar'],
    routing: {
      prefixDefaultLocale: true,
      strategy: 'pathname'
    }
  }
});
