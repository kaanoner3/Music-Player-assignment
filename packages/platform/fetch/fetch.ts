export const BASE_URL =
  'https://raw.githubusercontent.com/Learnfield-GmbH/CodingChallenge/master/react%20native/simple%20audio%20player'

/***
 * Sends a `GET` request to the provided `route`.
 */
export function get<T>(route: string): Promise<T> {
  if (!route.startsWith('/')) throw new Error('Routes should start with `/`')
  return fetch(`${BASE_URL}${route}`).then(r => r.json())
}
