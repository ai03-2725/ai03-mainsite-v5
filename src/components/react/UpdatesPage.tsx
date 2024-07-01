import React from 'preact/compat';
import { UpdatesPageEntry } from './UpdatesPageEntry';
import { SearchableInfiniteScroll, type MinimumProjectsIndex } from './SearchableProjectInfiniteScrollWrapper';

export const UpdatesPage: React.FC<{
  projects: MinimumProjectsIndex[]
}> = ({
  projects
}) => {

  return (
    <SearchableInfiniteScroll projects={projects} displayStyle='FULL_WIDTH' ChildElement={UpdatesPageEntry} />
  )
}