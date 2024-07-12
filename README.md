# ai03-mainsite-v5

The fifth iteration of [ai03.com](https://ai03.com/), designed for lightweightness, simplicity, sustainability, and versatility.  
Primarily uses [Astro](https://astro.build/) and [Tailwind](https://tailwindcss.com/).  

### Dependencies

`pnpm run collect-licenses`  
Exports license data of all used packages to `src/assets/data/PackageLicenses.astro`.  
Used to populate the `/licenses` page.  

`public/images/*`  
Project assets - compressed and optimized images, as well as videos and downloads.  
Generated from a set of source files using [this compression tool](https://github.com/ai03-2725/batch-avif-resizer-local/tree/main).  