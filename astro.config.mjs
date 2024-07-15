import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";

import { redirects } from './src/scripts/redirects';



export const DOMAIN = 'https://ai03.com';

// https://astro.build/config
export default defineConfig({
  site: DOMAIN,
  trailingSlash: "always",
  integrations: [
    tailwind(), 
    icon(), 
    sitemap({
      filter: (page) => {
        // Exclude redirects
        for (const redir of redirects) {
          if (page === `${DOMAIN}/${redir[0]}` || page === `${DOMAIN}/${redir[0]}/`) {
            return false
          }
        }
        // Exclude redirected all projects page
        if (page === `${DOMAIN}/collections/all-projects/`) {
          return false
        }
        // Include everything else
        return true
      }
    }), 
    mdx(), 
    preact({
      compat: true,
    })
  ],
  vite: {
    ssr: {
      noExternal: [
        'swiper', 
        'iconify-icon', 
        '@iconify-icon/react', 
        'react-infinite-scroll-hook',
        '@tanstack/react-query',
      ]
    },
  },

});