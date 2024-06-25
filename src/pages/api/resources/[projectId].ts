// Returns files/downloads for a given project

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(project => ({
    params: { projectId: project.slug },
  }));
}

const allResources = await getCollection('resources');

export const GET: APIRoute = async ({ params, request }) => {
  const projectId = params.projectId

  return new Response(
    JSON.stringify(allResources.filter(resource => resource.id.includes(projectId)))
  )
}