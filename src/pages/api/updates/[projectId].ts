// Returns updates for a given project

import { getUpdateDateString, sortUpdates } from '@scripts/sortUpdates';
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
      sortUpdates(
        allUpdates
        .filter(update => update.id.startsWith(projectId + '/'))
        .filter(update => update.data.draft !== true)
      )
      .map(update => ({date: getUpdateDateString(update), status: update.data.status, body: update.body}))
    )
  )
}

export type APIUpdateEntry = {
  date: string,
  status: ProjectStatuses,
  body: string
}