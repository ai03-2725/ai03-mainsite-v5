import { 
  defineCollection,
  reference,
  z,
} from 'astro:content';
import { PROJECT_GRID_STYLES } from '../types';
import { PROJECT_STATUSES } from './enum';

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
    draft: z.optional(z.boolean()),
    date: z.date(),
    status: PROJECT_STATUSES,
  })
});

const resources = defineCollection({ 
  type: 'content',
  schema: ({image}) => z.object({
    draft: z.optional(z.boolean()),
    label: z.string(),
    fileUrl: z.optional(z.string()),
  })
});

const newsPosts = defineCollection({ 
  type: 'content',
  schema: ({image}) => z.object({
    draft: z.optional(z.boolean()),
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
  // 'project-updates': projectUpdates,
  'resources': resources,
  'news-posts': newsPosts,
};