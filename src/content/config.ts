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
      img: image().refine((img) => img.width >= 540, {
        message: "Cover image must be at least 540 pixels wide",
      }),
      alt: z.string(),
    }),
    projects: z.array(reference('projects')),
    fullWidth: z.boolean(),
    centerText: z.boolean(),
    projectsListStyle: z.enum(PROJECT_GRID_STYLES)
  })
})

export const collections = {
  'projects': projects,
  'project_collections': projectCollections,
};