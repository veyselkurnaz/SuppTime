import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://supptime.app', // Assuming this is the custom domain, or it can be updated
  integrations: [sitemap()],
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
