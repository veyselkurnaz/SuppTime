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
  site: 'https://supptime.app', // Assuming this is the custom domain, or it can be updated
  trailingSlash: 'always',
  integrations: [sitemap({
    // The bare apex (/) is a redirect-only route (see src/pages/index.astro) and
    // must not be submitted as an indexable URL.
    filter: (url) => url !== 'https://supptime.app/',
    serialize(item) {
      // Root or Language Homepages (e.g., https://supptime.app/, https://supptime.app/tr/)
      // Anasayfa değişmeyeceği için monthly ve priority 0.5'e çekildi.
      if (item.url.match(/^https:\/\/supptime\.app\/[a-z-]+\/$/)) {
        item.changefreq = 'monthly';
        item.priority = 0.5;
      }
      // Blog Homepages (e.g., https://supptime.app/en/blog/)
      else if (item.url.match(/^https:\/\/supptime\.app\/[a-z-]+\/blog\/$/)) {
        item.changefreq = 'daily';
        item.priority = 1.0;
      }
      // Blog Posts (e.g., https://supptime.app/en/blog/vitamin-d)
      // Makaleler her gün güncelleneceği için daily ve priority 0.9 yapıldı.
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
      // Others (privacy, terms, etc.)
      else {
        item.changefreq = 'yearly';
        item.priority = 0.3;
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
