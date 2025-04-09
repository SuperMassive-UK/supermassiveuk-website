import { z, defineCollection, reference } from "astro:content";

const data = defineCollection({
  type: "data",
  schema: z.any(),
});

const pages = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      meta_title: z.string(),
      meta_description: z.string(),
    }),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = {
  data,
  pages,
};
