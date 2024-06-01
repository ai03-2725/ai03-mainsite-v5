import { 
  defineCollection,
  reference,
  z,
} from 'astro:content';
import { PROJECT_GRID_STYLES } from '../types';

const projects = defineCollection({ 
  type: 'content',
  schema: ({image}) => z.object({
    draft: z.boolean(),
    title: z.string(),
    slogan: z.string(),
    coverImage: z.object({
      url: z.string(),
      alt: z.string(),
    }),
  })
});

const projectCollections = defineCollection({
  type: 'content',
  schema: ({image}) => z.object({
    draft: z.boolean(),
    title: z.string(),
    slogan: z.string(),
    coverImage: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    projects: z.array(reference('projects')),
    fullWidth: z.boolean(),
    centerText: z.boolean(),
    projectsListStyle: z.enum(PROJECT_GRID_STYLES)
  })
})

const updates = defineCollection({ 
  type: 'content',
  schema: ({image}) => z.object({
    draft: z.boolean(),
    date: z.date(),
    status: z.enum([
      // Early statuses
      'pre-announcement',
      'announced', 

      // Early GB flow
      'pending-gb',
      'group-buy',
      'gb-closed',

      // Early preorder flow
      'pending-preorder',
      'preorder',
      'preorder-closed',

      // Post-early-sale flow
      'ordered', 
      'manufacturing', 
      'en-route', 
      'shipping', 
      'extras-sale',

      // In-stock flow
      'preparing-sale',
      'in-stock',
      'sold-out',
      'restocking',
      'final-sale',

      // Completion states
      'complete',
      'cancelled',
      'eol',
      'on-hold',
      'archived',
    ]),
    project: reference('projects'),
  })
});

const resources = defineCollection({ 
  type: 'content',
  schema: ({image}) => z.object({
    draft: z.boolean(),
    project: reference('projects'),
    fileUrl: z.optional(z.string()),
  })
});

const newsPosts = defineCollection({ 
  type: 'content',
  schema: ({image}) => z.object({
    draft: z.boolean(),
    date: z.date(),
    type: z.enum(['announcement', 'blog']),
    coverImage: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    relatedProjects: z.array(reference('projects')),
    relatedPosts: z.array(reference('news-posts')),
  })
});


export const collections = {
  'projects': projects,
  'project-collections': projectCollections,
  'updates': updates,
  'resources': resources,
  'news-posts': newsPosts,
};