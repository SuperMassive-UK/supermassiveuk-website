import { z, defineCollection, reference } from "astro:content";

const data = defineCollection({
  type: "data",
  schema: z.any(),
});

const bentos = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.array(
      z.object({
        src: image(),
        alt: z.string(),
        class: z.string(),
      })
    ),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = {
  data,
  bentos,
};
