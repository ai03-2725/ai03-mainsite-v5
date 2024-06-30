import type { CollectionEntry } from 'astro:content';
import type React from 'preact/compat';
import { useEffect, useMemo, useRef, useState } from 'preact/compat';
import { UpdatesPageEntry } from './UpdatesPageEntry';


export const UpdatesPage: React.FC<{
  projects: CollectionEntry<'projects'>[]
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
      return projects.filter(project => project.data.title.includes(debouncedSearchTerm) || project.slug.includes(debouncedSearchTerm))
    }
  }, [debouncedSearchTerm])

  return (

    <div class="">
      
      <div class="w-full flex flex-col items-center pb-12 pt-12">

        <h1 class="text-[38px] font-[575] mb-3">Project Updates</h1>

        <input 
          onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)} 
          class="outline outline-[1px] rounded-[3.75px] outline-gray-300 text-lg p-2 w-1/2 text-center" 
          placeholder="Search for a project" 
        />

      </div>


      <div class="grid grid-cols-2 gap-8">  
        {filteredProjects.map(project => (
          <UpdatesPageEntry project={project} />
        ))}
      </div>
    </div>

  )
}