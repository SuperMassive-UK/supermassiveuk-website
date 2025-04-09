import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import favicons from "astro-favicons";
import aws from "astro-sst";
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
    favicons(),
  ],
  experimental: {
    svg: true,
  },
  output: "server",
  adapter: aws(),
  trailingSlash: "always",
  // trailingSlash: "ignore", // important!
  // build: {
  //   format: "file", // 👈 this makes it `/sign-up.html`
  // },
});
