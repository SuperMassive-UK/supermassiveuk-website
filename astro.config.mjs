import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import favicons from "astro-favicons";
const isDev = import.meta.env.DEV;

// https://astro.build/config
export default defineConfig({
  site: "https://www.supermassive.uk",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
    sitemap(),
    favicons()
  ],
  experimental: {
    svg: true,
  },
});
