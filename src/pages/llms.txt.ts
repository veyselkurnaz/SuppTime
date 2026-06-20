import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const enPosts = posts.filter((post: any) => post.id.startsWith('en/'));

  let content = `# SuppTime

> Transform your health with SuppTime, the private, ad-free supplement tracker designed for optimal biohacking and routine management. Take the right nutrients at the perfect time, avoid harmful interactions, and visualize your progress—100% offline and secure.

SuppTime is the ultimate vitamin tracker and supplement planner designed to optimize your health routine. Whether you're managing a basic vitamin D and omega-3 stack or a complex biohacking regimen, SuppTime keeps you organized with science-backed guidance.

## Core Features
- **Smart Stack Builder**: Explore a curated database of 80+ supplements with expert timing recommendations and interaction warnings. Use preset stacks for immunity, focus, sleep, and longevity—or build your custom routine from scratch.
- **Daily Pill Tracker**: Check off your doses slot by slot: Early Morning, Breakfast, Lunch, Afternoon, Dinner, and Before Sleep.
- **Interaction Alerts**: Maximize absorption and safety. SuppTime warns you if supplements compete (like iron and calcium) or interfere with effectiveness.
- **Medication & RX Support**: Track prescription medications alongside your vitamins. A dedicated Rx badge ensures you never confuse your medical treatment with your nutrition stack.
- **Apple Watch & Widgets**: Log your doses directly from your wrist or view your schedule on your Home Screen.
- **Privacy First & Offline**: No accounts, no servers, no tracking. Your health data stays on your device and syncs privately via iCloud. SuppTime works 100% offline.

## App Details
- **Platform**: iOS (App Store)
- **App Store URL**: https://apps.apple.com/us/app/supptime-vitamin-tracker/id6762088156
- **Website**: https://supptime.app
- **Supported Languages**: English, Turkish, Korean, Japanese, Chinese, German, Spanish, Portuguese, Italian, Dutch, Polish, Russian, Indonesian, Vietnamese, Thai, Arabic.

## Contact & Support
For support or inquiries, users can reach out via the website (https://supptime.app).

## Optional Resources (Blog)
`;

  for (const post of enPosts) {
    const slugParts = post.id.split('/');
    slugParts.shift();
    const slug = slugParts.join('/').replace(/\.md$/, '');
    content += `- [${post.data.title}](https://supptime.app/en/blog/${slug}/): ${post.data.description}\n`;
  }

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
