import type React from 'preact/compat';
import { useEffect, useMemo, useRef, useState } from 'preact/compat';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Spinner } from './Spinner';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


// Minimum data input type 
// This should get loaded as part of the initial page load, so keep minimal
export type MinimumProjectsIndex = {
  slug: string,
  title: string,
  src: string
}

// React-query preparations
const queryClient = new QueryClient()

// Main component
export const SearchableInfiniteScroll: React.FC<{
  projects: MinimumProjectsIndex[],
  displayStyle: 'FULL_WIDTH' | 'COLUMNS'
  ChildElement: React.ComponentType<{project: MinimumProjectsIndex}>
}> = ({
  projects,
  displayStyle,
  ChildElement
}) => {

  // Display configuration
  let childrenContainerClasses = ""
  let initialDisplayedItems = 1
  let itemsFetchedPerPage = 1

  switch(displayStyle) {

    case "COLUMNS":
      childrenContainerClasses = "columns-1 md:columns-2 xl:columns-3 gap-5"
      initialDisplayedItems = 6
      itemsFetchedPerPage = 6
      break

    case "FULL_WIDTH":
      childrenContainerClasses = "flex flex-col gap-6 md:gap-7 lg:gap-8"
      initialDisplayedItems = 3
      itemsFetchedPerPage = 6
      break

  }

  // Debounce the input to prevent excessive redraws
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm)
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timer.current = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => {
      clearTimeout(timer.current);
    };
  }, [searchTerm]);

  // Re-filter the displayed projects when the debounced input changes
  const filteredProjects = useMemo(() => {
    if (searchTerm === "") {
      return projects
    } else {
      return projects.filter(project => project.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || project.slug.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    }
  }, [debouncedSearchTerm])

  // Infinite scrolling data
  const [displayedItemsList, setDisplayedItemsList] = useState<MinimumProjectsIndex[]>(filteredProjects.slice(0, initialDisplayedItems))
  const [loadingMoreItems, setLoadingMoreItems] = useState<boolean>(false)
  const displayMoreItems = () => {
    setLoadingMoreItems(true)
    setDisplayedItemsList([...displayedItemsList, ...filteredProjects.slice(displayedItemsList.length, displayedItemsList.length + itemsFetchedPerPage)])
    setLoadingMoreItems(false)
  }
  const hasNextPage = displayedItemsList.length < filteredProjects.length

  // Reset the displayed items when the filtered projects list changes
  useEffect(() => {
    setDisplayedItemsList(filteredProjects.slice(0, initialDisplayedItems))
  }, [filteredProjects])

  // Infinite scrolling hook
  const [sentryRef] = useInfiniteScroll({
    loading: loadingMoreItems,
    hasNextPage: hasNextPage,
    onLoadMore: displayMoreItems,
    disabled: false,
    rootMargin: '0px 0px 300px 0px',
  });


  return (

    <QueryClientProvider client={queryClient}>

      <div class="px-5">
        
        <div class="w-full flex flex-col items-center pb-12">
          <input 
            autoFocus
            onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)} 
            class="outline outline-[1px] rounded-[2.375px] outline-gray-300 text-lg p-2 w-9/12 md:w-1/2 text-center" 
            placeholder="Search for a project" 
          />

        </div>

        {/* Child items list */}
        <div class={childrenContainerClasses}>  
          {displayedItemsList.map(project => {
            return (
              <ChildElement project={project} />
            )
          })}

          {hasNextPage && 
            <div ref={sentryRef} class="w-full flex flex-row justify-center">
              <Spinner size={36} width={3} />
            </div>
          }
        </div>
      </div>

    </QueryClientProvider>

  )
}