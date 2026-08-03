import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** Optional shorter <title>, for posts whose real title exceeds the ~60 character SERP limit. */
    seoTitle: z.string().max(60).optional(),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    slug: z.string(),
    image: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog };
