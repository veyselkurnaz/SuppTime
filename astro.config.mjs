import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  site: 'https://supptime.app', // Assuming this is the custom domain, or it can be updated
  integrations: [sitemap({
    serialize(item) {
      // Root or Language Homepages (e.g., https://supptime.app/, https://supptime.app/tr/)
      // Anasayfa değişmeyeceği için monthly ve priority 0.5'e çekildi.
      if (item.url === 'https://supptime.app/' || item.url.match(/^https:\/\/supptime\.app\/[a-z-]+\/$/)) {
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
  i18n: {
    defaultLocale: 'en',
    locales: ['en','tr','ko','ja','zh-cn','zh-tw','de','es','pt-br','it','nl','pl','ru','id','vi','th','ar'],
    routing: {
      prefixDefaultLocale: true,
      strategy: 'pathname'
    }
  }
});
