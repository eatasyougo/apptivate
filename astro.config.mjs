import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://apptivate.uk",
  base: "/",
  integrations: [sitemap()],
});
