import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import favicons from "astro-favicons";
import aws from "astro-sst";
import minify from 'astro-minify-html-swc'

// https://astro.build/config
export default defineConfig({
  site: "https://www.supermassive.uk",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
    sitemap(),
    favicons(),
    minify()
  ],
  experimental: {
    svg: true,
  },
  output: "server",
  adapter: aws(),
  trailingSlash: "ignore",
});

