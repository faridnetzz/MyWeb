import type { MaybeRefOrGetter } from 'vue'

/** Page title and description, mirrored into the Open Graph and Twitter tags. */
export const usePageSeo = (title: MaybeRefOrGetter<string>, description: MaybeRefOrGetter<string>) =>
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
  })
