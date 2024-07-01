import { 
  defineCollection,
  reference,
  z,
} from 'astro:content';
import { PROJECT_STATUSES } from './enum';

const projects = defineCollection({ 
  type: 'content',
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    slogan: z.string(),
    coverImage: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    releaseDate: z.date()
  })
});

const projectCollections = defineCollection({
  type: 'content',
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    slogan: z.string(),
    coverImage: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    projects: z.array(reference('projects')),
  })
})

const updates = defineCollection({ 
  type: 'content',
  schema: z.object({
    draft: z.optional(z.boolean()),
    status: PROJECT_STATUSES,
  })
});

const resources = defineCollection({ 
  type: 'content',
  schema: z.object({
    draft: z.optional(z.boolean()),
    label: z.string(),
    fileUrl: z.optional(z.string()),
  })
});

const blogPosts = defineCollection({ 
  type: 'content',
  schema: z.object({
    draft: z.optional(z.boolean()),
    date: z.date(),
    tags: z.array(z.string()),
    coverImage: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    relatedProjects: z.array(reference('projects')),
    relatedPosts: z.array(reference('blog-posts')),
  })
});


export const collections = {
  'projects': projects,
  'project-collections': projectCollections,
  'updates': updates,
  'resources': resources,
  'blog-posts': blogPosts,
};