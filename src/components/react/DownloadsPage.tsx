import React from 'preact/compat';
import { UpdatesPageEntry } from './UpdatesPageEntry';
import { SearchableInfiniteScroll, type MinimumProjectsIndex } from './SearchableProjectInfiniteScrollWrapper';

export const DownloadsPage: React.FC<{
  projects: MinimumProjectsIndex[]
}> = ({
  projects
}) => {

  return (
    <SearchableInfiniteScroll projects={projects} ChildElement={UpdatesPageEntry} />
  )
}