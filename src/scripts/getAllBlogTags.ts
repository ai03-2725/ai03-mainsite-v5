import { getCollection } from "astro:content";

// Fetches all blog posts and returns a list of all found tags

export const getAllBlogTags = async () => {
  const allBlogPosts = await getCollection('blog-posts')
  let allTags = []
  for (const blogPost of allBlogPosts) {
    allTags.concat(blogPost.data.tags)
  }
  return [...new Set(allTags)]
}