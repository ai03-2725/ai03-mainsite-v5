// Returns updates for a given project

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(project => ({
    params: { projectId: project.slug },
  }));
}

const allUpdates = await getCollection('updates');

export const GET: APIRoute = async ({ params, request }) => {
  const projectId = params.projectId

  return new Response(
    JSON.stringify(
      allUpdates
      .filter(update => update.id.includes(projectId))
      .sort((a, b) => a.data.date > b.data.date ? -1 : 1)
    )
  )
}