import type React from "preact/compat";
import { useState } from 'preact/compat';
import { useQuery } from '@tanstack/react-query';
import type { APIUpdateEntry } from '@pages/api/updates/[projectId]';
import { CollapseDiv } from '@components/react/CollapseDiv.tsx'
import { Spinner } from './Spinner';
import type { MinimumProjectsIndex } from './SearchableProjectInfiniteScrollWrapper';
import { UpdateLogEntryRenderer } from './UpdateLogEntryRenderer';
import { statusToDisplayText } from "@scripts/util";
import Markdown from 'react-markdown'
import { DefaultMarkdownRenderer } from './DefaultMarkdownRenderer';
import rehypeRewrite from 'rehype-rewrite'
import { StatusProgressIndicator } from "./StatusProgressIndicator";

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

// The bottom pane display for updates
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
          <div key={updateEntry} class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-3">

            {/* Left col - progress icon + status + date */}
            <div class="col-span-1 flex flex-row justify-start items-center gap-5">
              <StatusProgressIndicator status={updateEntry.status} divClasses="w-[48px] lg:w-[56px]" iconClasses="text-[20px] lg:text-[24px]" />
              <div class="flex flex-col justify-center items-start">
                <h4 class="m-0 text-xl font-[550]">{statusToDisplayText(updateEntry.status)}</h4>
                <p>{updateEntry.date}</p>
              </div>
            </div>

            {/* Right col - update contents */}
            <div class="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-center">
            <DefaultMarkdownRenderer>
              <Markdown rehypePlugins={[[rehypeRewrite, {
                selector: 'img',
                rewrite: (node) => {
                  if (node.type === 'element') {
                    node.properties.loading = 'lazy';
                  }
                }
              }]]}>
                {updateEntry.body}
              </Markdown>
            </DefaultMarkdownRenderer>
            </div>

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
          md:w-2/5
          xl:w-1/3
          overflow-hidden relative
        ">
          <div class="absolute w-full h-full bg-zinc-500">
            <img src={project.src} alt={`Cover image for ${project.title}`} loading="lazy" class="object-cover w-full h-full" />
          </div>
          <div class="absolute bottom-0 left-0 w-full text-white bg-gradient-to-t from-[#00000090] h-1/3 p-5 md:p-4 lg:p-5 flex flex-col-reverse">
            <h2 class="text-2xl md:text-xl lg:text-2xl font-[500] text-white">{project.title}</h2>
          </div>
          <a href={`/projects/${project.slug}`} class="w-full h-full absolute" />
          
        </div>

        {/* Right col */}
        <div class="
          p-6 md:p-7 lg:p-8
          w-full
          md:w-1/2
          xl:w-2/3
        ">
          {isError &&
            // TODO
            <p>Error.</p> 
          }
          {isLoading || !data && 
            <div class="w-full h-full flex flex-row justify-center items-center">
              <div>
                <Spinner size={36} width={3} />
              </div>
            </div>
          }
          {!isLoading && data && 
            <div class="h-full">
              {data.length > 0 ?
                // Outer col
                <div class="flex flex-col h-full gap-3">

                  {/* Row for icon and status header */}
                  <div class="flex flex-row items-center gap-3">

                    {/* Status icon */}
                    <StatusProgressIndicator status={data[0].status} divClasses="w-[48px] lg:w-[56px]" iconClasses="text-[20px] lg:text-[24px]" />

                    {/* Status header */}
                    <div class="flex flex-col justify-start">
                      <h3 class="text-xl font-[550]">Status: {statusToDisplayText(data[0].status)}</h3>
                    </div>
                  </div>

                  {/* Latest update contents */}
                  <DefaultMarkdownRenderer>
                    <Markdown rehypePlugins={[[rehypeRewrite, {
                      selector: 'img',
                      rewrite: (node) => {
                        if (node.type === 'element') {
                          node.properties.loading = 'lazy';
                        }
                      }
                    }]]}>
                      {data[0].body}
                    </Markdown>
                  </DefaultMarkdownRenderer>

                  <div class="grow" />

                  {/* Last update date + Show history button */}
                  <div class="flex flex-col items-center md:items-start gap-2">
                    <p class="text-zinc-500 text-sm">Last Updated {data[0].date}</p>
                    {data.length > 1 ?
                      <button 
                        class={`py-2 px-4 bg-zinc-600 text-white rounded-[2.375px]`}
                        onClick={() => setUpdatesPaneOpen(!updatesPaneOpen)}
                      >
                        {updatesPaneOpen ? "Hide" : "Show"} Update History
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