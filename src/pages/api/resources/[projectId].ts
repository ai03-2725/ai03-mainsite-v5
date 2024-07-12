// Returns files/downloads for a given project

import { sortResources } from '@scripts/sortResources';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(project => ({
    params: { projectId: project.slug },
  }));
}

const allResources = await getCollection('resources');

export const GET: APIRoute = async ({ params }) => {
  const projectId = params.projectId

  return new Response(
    JSON.stringify(
      sortResources(
        allResources
        .filter(resource => resource.id.startsWith(projectId + '/'))
        .filter(resource => resource.data.draft !== true)
      )
      .map(resource => ({label: resource.data.label, fileUrl: resource.data.fileUrl || null, body: resource.body}))
    )
  )
}

export type APIResourceEntry = {
  label: string,
  fileUrl: string | null,
  body: string
}