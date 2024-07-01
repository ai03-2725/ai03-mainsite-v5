import type { CollectionEntry } from "astro:content";

export const sortResources: (resources: CollectionEntry<'resources'>[]) => CollectionEntry<'resources'>[] = (resources) => {
  return resources.sort((a, b) => (a.data.fileUrl && !b.data.fileUrl) ? -1 : (a.data.label > b.data.label ? 1 : -1))
}