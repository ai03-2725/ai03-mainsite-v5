// Returns updates for a given project

import { dateToDisplayString } from '@scripts/util';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { ProjectStatuses } from 'src/content/enum';

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
      .map(update => ({slug: update.slug, date: dateToDisplayString(update.data.date), status: update.data.status, body: update.body}))
    )
  )
}

export type APIUpdateEntry = {
  slug: string,
  date: string,
  status: ProjectStatuses,
  body: string
}