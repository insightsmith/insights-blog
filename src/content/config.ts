import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('insightsmith'),
    draft: z.boolean().default(false),
  }),
});

const links = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('insightsmith'),
    draft: z.boolean().default(false),
    links: z.array(z.object({
      title: z.string(),
      url: z.string(),
      description: z.string().optional(),
    })),
  }),
});

export const collections = { blog, links };
