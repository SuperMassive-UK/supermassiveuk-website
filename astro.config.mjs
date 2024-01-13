import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

const isDev = import.meta.env.DEV;

// https://astro.build/config
export default defineConfig({
  site: "https://louisjmorgan.github.io",
  base: isDev ? "/" : "/supermassiveuk",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
  ],
});
