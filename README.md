# ai03-mainsite-v5

The fifth iteration of [ai03.com](https://ai03.com/), designed for lightweightness, simplicity, and versatility.  
Uses [Astro](https://astro.build/), [Tailwind](https://tailwindcss.com/), and [Alpine](https://alpinejs.dev/) primarily.  

### Dependencies

`pnpm run collect-licenses`  
Exports license data of all used packages to `public/license-data/PACKAGE_LICENSES.txt`.  
Used to populate the `/licenses` page and fulfill license display for used software.  


`src/assets/projects/*`
Project assets - mainly compressed and optimized images.  
Generated from a set of source files using [this compression tool](https://github.com/ai03-2725/batch-avif-resizer-local/tree/main).  