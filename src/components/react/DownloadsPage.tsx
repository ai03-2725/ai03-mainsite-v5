import React from 'preact/compat';
import { SearchableInfiniteScroll, type MinimumProjectsIndex } from './SearchableProjectInfiniteScrollWrapper';
import { DownloadsPageEntry } from './DownloadsPageEntry';

export const DownloadsPage: React.FC<{
  projects: MinimumProjectsIndex[]
}> = ({
  projects
}) => {

  return (
    <SearchableInfiniteScroll projects={projects} displayStyle='COLUMNS' ChildElement={DownloadsPageEntry} />
  )
}