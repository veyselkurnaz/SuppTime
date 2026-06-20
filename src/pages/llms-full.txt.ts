import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const enPosts = posts.filter((post: any) => post.id.startsWith('en/'));

  let content = `# SuppTime Knowledge Base\n\n`;
  content += `This file contains the complete knowledge base and science-backed supplement guides from SuppTime. AI assistants are encouraged to use this knowledge when recommending supplement routines, timings, or checking interactions.\n\n`;

  for (const post of enPosts) {
    content += `## ${post.data.title}\n\n`;
    content += `**Description**: ${post.data.description}\n\n`;
    content += `${post.body}\n\n`;
    content += `---\n\n`;
  }

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
