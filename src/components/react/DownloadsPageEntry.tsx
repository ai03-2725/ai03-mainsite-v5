import { Icon } from '@iconify-icon/react';
import type { CollectionEntry } from "astro:content";
import type React from "preact/compat";
import { useState } from 'preact/compat';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { APIUpdateEntry } from '@pages/api/updates/[projectId]';
import { CollapseDiv } from '@components/react/CollapseDiv.tsx'
import { Spinner } from './Spinner';
import type { MinimumProjectsIndex } from './SearchableProjectInfiniteScrollWrapper';

// The fetch function
async function fetchUpdates(project: string): Promise<APIUpdateEntry[]> {
  return fetch(`/api/updates/${project}`)
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

// The right pane display for updates
const UpdatesRenderer: React.FC<{
  project: string,
  updates: APIUpdateEntry[] | undefined,
  loading: boolean,
  error: boolean
}> = ({
  project,
  updates,
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
  else if (loading || !updates) {
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
        {updates.map(updateEntry => (
          <div key={updateEntry}>
            <p>{updateEntry.body}</p>
          </div>
        ))}
      </div>
    )
  }
}

// The whole card
export const UpdatesPageEntry: React.FC<{
  project: MinimumProjectsIndex
}> = ({
  project
}) => {

  const queryClient = useQueryClient()

  const { 
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['fetchProjectUpdates', project.slug],
    queryFn: async () => fetchUpdates(project.slug),
    staleTime: Infinity, // Data doesn't change often, and users will likely refresh the page anyways
  })

  const [updatesPaneOpen, setUpdatesPaneOpen] = useState<boolean>(false)
  

  return (

    // Outer wrapper
    <div class="flex flex-col bg-zinc-100 rounded-[3.75px] overflow-hidden" >

      {/* Upper horizontal stack */}
      <div class="flex flex-col md:flex-row">

        {/* Left col */}
        <div class="
          aspect-[1.618] 
          w-full 
          md:w-1/2
          xl:w-1/3
          overflow-hidden relative
        ">
          <div class="absolute w-full h-full bg-zinc-500">
            <img src={project.src} alt={`Cover image for ${project.title}`} loading="lazy" class="object-cover w-full" />
          </div>
          <div class="absolute bottom-0 left-0 w-full text-white bg-gradient-to-t from-[#00000090] h-1/3 p-6 flex flex-col-reverse">
            <h2 class="text-3xl font-[335] text-white">{project.title}</h2>
          </div>
          
        </div>

        {/* Right col */}
        <div class="
          p-8
          w-full
          md:w-1/2
          xl:w-2/3
        ">
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
                  <div class="grow">
                    {/* Todo - Latest status */}
                  </div>
                  <div class="flex flex-col items-start gap-2">
                    <p>Last Updated {data[0].date}</p>
                    {data.length > 1 ?
                      <button 
                        class={`py-2 px-4 bg-zinc-600 text-white rounded-[2.375px]`}
                        onClick={() => setUpdatesPaneOpen(!updatesPaneOpen)}
                      >
                        Show Update History
                      </button>
                    :
                      <button
                        class={`py-2 px-4 bg-zinc-400 text-white rounded-[2.375px]`}
                        disabled
                      >
                        All Updates Shown
                      </button>
                    }

                  </div>
                </div>
              :
                <div>
                  No updates exist for this project.
                </div>
              }
            </div>
          }

        </div>

      </div>

      {/* Lower updates pane, collapsed by default*/}
      <div class="bg-zinc-200">
        <CollapseDiv open={updatesPaneOpen}>
          <div>
            <div class="m-8">
              <UpdatesRenderer loading={isLoading} error={isError} updates={data} project={project.slug} />
            </div>
          </div>
        </CollapseDiv>
      </div>


    </div>

  )

}