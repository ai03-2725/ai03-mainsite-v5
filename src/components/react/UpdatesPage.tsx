import type { CollectionEntry } from 'astro:content';
import type React from 'preact/compat';
import { useEffect, useMemo, useRef, useState } from 'preact/compat';
import { UpdatesPageEntry } from './UpdatesPageEntry';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Spinner } from './Spinner';
import {
  useQuery,
  useMutation,
  useQueryClient,
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


// Inf scrolling
const INITIAL_DISPLAYED_ITEMS = 1
const ITEMS_FETCHED_PER_PAGE = 1


export const UpdatesPage: React.FC<{
  projects: MinimumProjectsIndex[]
}> = ({
  projects
}) => {

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm)
  const timer = useRef<NodeJS.Timeout>();

  // Debounce the input to prevent excessive redraws
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
  const [displayedItemsList, setDisplayedItemsList] = useState<MinimumProjectsIndex[]>(filteredProjects.slice(0, INITIAL_DISPLAYED_ITEMS))
  const [loadingMoreItems, setLoadingMoreItems] = useState<boolean>(false)
  const displayMoreItems = () => {
    setLoadingMoreItems(true)
    setDisplayedItemsList([...displayedItemsList, ...filteredProjects.slice(displayedItemsList.length, displayedItemsList.length + ITEMS_FETCHED_PER_PAGE)])
    setLoadingMoreItems(false)
  }
  const hasNextPage = displayedItemsList.length < filteredProjects.length

  // Reset the displayed items when the filtered projects list changes
  useEffect(() => {
    setDisplayedItemsList(filteredProjects.slice(0, INITIAL_DISPLAYED_ITEMS))
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

      <div class="">
        
        <div class="w-full flex flex-col items-center pb-12 pt-12">

          <h1 class="text-[38px] font-[575] mb-3">Project Updates</h1>

          <input 
            autoFocus
            onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)} 
            class="outline outline-[1px] rounded-[3.75px] outline-gray-300 text-lg p-2 w-1/2 text-center" 
            placeholder="Search for a project" 
          />

        </div>


        <div class="flex flex-col gap-8">  
          {displayedItemsList.map(project => (
            <UpdatesPageEntry project={project} />
          ))}

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