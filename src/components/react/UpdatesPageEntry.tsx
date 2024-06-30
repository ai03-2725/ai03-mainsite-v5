import { Icon } from '@iconify-icon/react';
import type { CollectionEntry } from "astro:content";
import type React from "preact/compat";
import { useState } from 'preact/compat';


const UpdatesRenderer: React.FC<{
  project: string
}> = ({
  project
}) => {



  return null
}


export const UpdatesPageEntry: React.FC<{
  project: CollectionEntry<'projects'>
}> = ({
  project
}) => {

  const [updatesPaneOpen, setUpdatesPaneOpen] = useState<boolean>(false)


  return (

    <div class="flex flex-col bg-zinc-100 rounded-[3.75px] overflow-hidden cursor-pointer" onClick={() => setUpdatesPaneOpen(!updatesPaneOpen)} >

      <div class="aspect-[1.618] w-full overflow-hidden relative">
        <img src={project.data.coverImage.url} alt={project.data.coverImage.alt} loading="lazy" class="object-cover w-full absolute" />
        <div class="absolute bottom-0 left-0 w-full text-white bg-gradient-to-t from-[#000000a0] h-1/3 p-5 flex flex-col-reverse">
          <div class="flex flex-row items-center">
            <h2 class="text-2xl font-[400] grow">{project.data.title}</h2> 
            <div class="outline-white outline outline-[2.5px] rounded-full w-10 aspect-square flex items-center justify-center">
              <Icon icon="ph:arrow-down" className={`text-white text-[28px] transition-all ease-[var(--spring-easing)] duration-[var(--spring-duration)] ${updatesPaneOpen && "rotate-[-180deg]"}`} />
            </div>
          </div>
        </div>
      </div>

      <div class={`grid overflow-hidden ${updatesPaneOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-[grid-template-rows] ease-[var(--spring-easing)] duration-[var(--spring-duration)]`}>
        <div class="overflow-hidden">
          <UpdatesRenderer project={project.slug} />
        </div>
      </div>

    </div>

  )

}