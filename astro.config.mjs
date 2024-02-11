import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
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
  ],
});
