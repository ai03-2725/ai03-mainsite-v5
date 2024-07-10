import { 
  defineCollection,
  reference,
  z,
} from 'astro:content';
import { PROJECT_STATUSES } from './enum';

const projects = defineCollection({ 
  type: 'content',
  schema: ({ image }) => z.object({
    draft: z.boolean(),
    title: z.string(),
    slogan: z.string(),
    cover: z.object({
      image: z.string(),
      alt: z.string(),
    }),
    releaseDate: z.date()
  })
});

const projectCollections = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    draft: z.boolean(),
    title: z.string(),
    slogan: z.string(),
    cover: z.object({
      image: z.string(),
      alt: z.string(),
    }),
    projects: z.array(reference('projects')),
    priority: z.number(),
    tileSize: z.enum(["2x2", "2x1", "1x1"]),
    tileTitle: z.optional(z.string()),
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
  schema: ({ image }) => z.object({
    draft: z.optional(z.boolean()),
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    cover: z.object({
      image: z.string(),
      alt: z.string(),
      anchor: z.optional(z.array(z.enum(['top', 'bottom', 'left', 'right'])))
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