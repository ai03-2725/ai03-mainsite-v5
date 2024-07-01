import { Icon } from '@iconify-icon/react';
import type { CollectionEntry } from "astro:content";
import type React from "preact/compat";
import { useState } from 'preact/compat';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { APIUpdateEntry } from '@pages/api/updates/[projectId]';
import { CollapseDiv } from '@components/react/CollapseDiv.tsx'
import { Spinner } from './Spinner';
import type { MinimumProjectsIndex } from './SearchableProjectInfiniteScrollWrapper';
import type { APIResourceEntry } from '@pages/api/resources/[projectId]';

// The fetch function
async function fetchResources(project: string): Promise<APIResourceEntry[]> {
  return fetch(`/api/resources/${project}`)
  .then((response) => {
    if (response.status === 429) {
      throw new Error("429")
    } else if (!response.ok) {
      throw new Error("Response was not OK")
    } 
    return response.json()
  })
  .catch((error) => {
    console.error(error)
    throw error
  })
}

// The right pane display for resources/downloads
const DownloadsRenderer: React.FC<{
  project: string,
  resources: APIResourceEntry[] | undefined,
  loading: boolean,
  error: boolean
}> = ({
  project,
  resources,
  loading,
  error
}) => {

  if (error) {
    // TODO
    return (
      <div>
        Error 
      </div>
    )
  }
  else if (loading || !resources) {
    return (
      <div class="flex flex-row justify-center items-center">
        <div>
          <Spinner size={36} width={3} />
        </div>
      </div>
    )
  } else {
    return (
      <div class="flex flex-col gap-8">
        {resources.map(resource => {
          if (resource.fileUrl) {
            return (
              <div>
              </div>
            )
          } 
          else {
            return (
              <div key={resource}>
                <p>{resource.body}</p>
              </div>
            )
          }
        })}
      </div>
    )
  }
}

// The whole card
export const DownloadsPageEntry: React.FC<{
  project: MinimumProjectsIndex
}> = ({
  project
}) => {

  const { 
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['fetchProjectResources', project.slug],
    queryFn: async () => fetchResources(project.slug),
    staleTime: Infinity, // Data doesn't change often, and users will likely refresh the page anyways
  })

  const [updatesPaneOpen, setUpdatesPaneOpen] = useState<boolean>(false)
  

  return (

    // Outer wrapper
    <div class="flex flex-col bg-zinc-100 rounded-[3.75px] overflow-hidden" >



        {/* Header */}
        <div class="
          aspect-[1.618] w-full overflow-hidden relative
        ">
          <div class="absolute w-full h-full bg-zinc-500">
            <img src={project.src} alt={`Cover image for ${project.title}`} loading="lazy" class="object-cover w-full" />
          </div>
          <div class="absolute bottom-0 left-0 w-full text-white bg-gradient-to-t from-[#00000090] h-1/3 p-6 flex flex-col-reverse">
            <h2 class="text-3xl font-[335] text-white">{project.title}</h2>
          </div>
          
        </div>

        {/* Lower section */}
        <div class="p-8 w-full">
          {isError &&
            // TODO
            <p>Error.</p> 
          }
          {isLoading || !data && 
            // TODO
            <div class="w-full h-full flex flex-row justify-center items-center">
              <div>
                <Spinner size={36} width={3} />
              </div>
            </div>
          }
          {!isLoading && data && 
            <div class="h-full">
              {data.length > 0 ?
                <div class="flex flex-col h-full">
                  <DownloadsRenderer loading={isLoading} error={isError} resources={data} project={project.slug} />
                </div>
              :
                <div>
                  No resources exist for this project.
                </div>
              }
            </div>
          }

        </div>

    </div>

  )

}