import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://louisjmorgan.github.io",
  base: "/supermassiveuk",
  integrations: [tailwind({ applyBaseStyles: false })],
});
