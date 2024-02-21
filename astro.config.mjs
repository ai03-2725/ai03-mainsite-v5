import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    alpinejs({entrypoint: '/src/misc/alpine-entrypoint'}), 
    icon(), 
    sitemap()
  ]
});