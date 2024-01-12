import { z, defineCollection, reference } from "astro:content";

const data = defineCollection({
  type: "data",
  schema: z.any(),
});

const pages = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        bentos: z.array(
          z.object({
            src: image(),
            alt: z.string(),
            class: z.string(),
          })
        ),
        what_we_dos: z.array(
          z.object({
            title: z.string(),
            text: z.string(),
            image: z.object({
              src: image(),
              alt: z.string(),
              class: z.string(),
            }),
          })
        ),
      })
      .catchall(z.any()),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = {
  data,
  pages,
};
