import type { CollectionEntry } from "astro:content";

export const sortUpdates: (updates: CollectionEntry<'updates'>[]) => CollectionEntry<'updates'>[] = (updates) => {
  return updates.sort((a, b) => {
    const aDate = a.slug.split('/').pop()
    const bDate = b.slug.split('/').pop()
    return (aDate > bDate ? -1 : 1)
  })
}

export const getUpdateDateString: (update: CollectionEntry<'updates'>) => string = (update) => {
  return update.slug.split('/').pop()
}

export const getUpdateDateObject: (update: CollectionEntry<'updates'>) => Date = (update) => {
  return new Date(update.slug.split('/').pop())
}