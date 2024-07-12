import fs from 'node:fs'

// For some reason, @astro/sitemap seems to generate a sitemap-index.xml without the closing </sitemapindex> tag at the very end
// This script tacks it on if missing

const SITEMAP_INDEX_DIR = './dist/sitemap-index.xml'


console.log("Running sitemap repair")

let index = fs.readFileSync(SITEMAP_INDEX_DIR, 'utf-8').toString()

// Don't do anything if the tag actually exists
if (index.includes("</sitemapindex>")) {
  console.log("Closing tag found, doing nothing.")
}

// Otherwise tack it on
else {
  console.log("Closing tag missing; adding to the end")
  index += "</sitemapindex>"
  fs.writeFileSync(SITEMAP_INDEX_DIR, index)
}
