import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
const isProd = import.meta.env.PROD;
const isDev = import.meta.env.DEV;
// https://astro.build/config
export default defineConfig({
  site: "https://louisjmorgan.github.io",
  base: isProd ? "/supermassiveuk" : "/",
  integrations: [tailwind({ applyBaseStyles: false })],
});
