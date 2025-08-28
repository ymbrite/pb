import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        categories: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        cover: z.string().optional(),
        published: z.string().datetime(),
      }),
    }),
    posts: defineCollection({
      type: 'page',
      source: 'blog/posts/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        categories: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        cover: z.string().optional(),
        published: z.string().datetime(),
      }),
    }),
    devlogs: defineCollection({
      type: 'page',
      source: 'blog/devlogs/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        categories: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        cover: z.string().optional(),
        published: z.string().datetime(),
      }),
    }),
  },
})
