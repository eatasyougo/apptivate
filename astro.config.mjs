import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// GitHub Pages preview lives at https://eatasyougo.github.io/apptivate/
// When apptivate.uk DNS is pointed at Pages, change site/base accordingly.
export default defineConfig({
  site: "https://eatasyougo.github.io",
  base: "/apptivate",
  integrations: [sitemap()],
});
