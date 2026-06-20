import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('blog');
  const enPosts = posts.filter((post: any) => post.id.startsWith('en/'));

  return rss({
    title: 'SuppTime Blog - Science-Backed Supplement Guides',
    description: 'Optimize your health routine with SuppTime, the ultimate vitamin tracker and supplement planner. Expert timing recommendations and interaction warnings.',
    site: context.site || 'https://supptime.app',
    items: enPosts.map((post: any) => {
      const slugParts = post.id.split('/');
      slugParts.shift(); // remove 'en'
      const slug = slugParts.join('/').replace(/\.md$/, '');
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/en/blog/${slug}/`,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
