import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";



// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    icon(), 
    sitemap(), 
    mdx(), 
    preact({
      compat: true,
    })
  ],
  vite: {
    ssr: {
      noExternal: ['swiper']
    },
  },

});