import fs from 'node:fs/promises'
import { globby } from 'globby'
import { minify } from 'html-minifier'

// HTML Minifier to get rid of all the HTML comments post-build
// Implementation from https://straffesites.com/en/blog/optimize-astro-html-post-build

// Get all HTML files from the output directory

console.log("Starting HTML optimize")

const path = './dist'
const files = await globby(`${path}/**/*.html`)

await Promise.all(
  files.map(async (file) => {
    console.log('Processing file:', file)
    let html = await fs.readFile(file, 'utf-8')

    // Minify the HTML
    html = minify(html, {
      removeComments: true,
      preserveLineBreaks: true,
      collapseWhitespace: true
    })
    await fs.writeFile(file, html)
  })
)

console.log("Optimizations complete")