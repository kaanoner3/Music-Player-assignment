import { ContentResponse, AudioItem } from '@skoove/home.content'
import { get } from '@skoove/platform.fetch'
import { useQuery } from 'react-query'

const CONTENT_QUERY_KEY = 'home-content'

const fetchContent = async (): Promise<AudioItem[]> => {
  const response = await get<ContentResponse>('/data/manifest.json')

  return response.data
}
/**
 * Fetches and caches the content response.
 *
 * Allows you to transform the response by providing a `select` function.
 *
 * @param select - (data: AudioItem[]) => T
 * @returns The return value of `select` function.
 */
export function useHomePageQuery<S>(select: (data: AudioItem[]) => S) {
  return useQuery(CONTENT_QUERY_KEY, fetchContent, {
    select,
    cacheTime: 1000 * 60 * 60,
  })
}
