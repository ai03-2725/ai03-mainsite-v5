import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";



// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    // alpinejs({
    //   entrypoint: '/src/misc/alpine-entrypoint'
    // }), 
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