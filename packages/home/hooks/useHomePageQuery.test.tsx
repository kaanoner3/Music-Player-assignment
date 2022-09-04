import { BASE_URL } from '@skoove/platform.fetch'
import { setStore, store } from '@skoove/platform.redux'
import { renderHook } from '@testing-library/react-hooks'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { MOCK_RESPONSE } from '../mocks/MOCK_RESPONSE'

import { useHomePageQuery } from './useHomePageQuery'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      retry: false,
      cacheTime: Infinity,
    },
  },
})

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  )
}

describe('useHomePageQuery', () => {
  const server = setupServer()

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
  })

  afterAll(() => {
    server.close()
  })

  it('should retreive data from the server', async () => {
    server.use(
      rest.get(BASE_URL + '/data/manifest.json', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(MOCK_RESPONSE))
      }),
    )

    const { result, waitFor } = renderHook(() => useHomePageQuery(data => data), {
      wrapper,
    })
    await waitFor(() => result.current.isSuccess)
  })

  it('should update redux store onSuccess', async () => {
    server.use(
      rest.get(BASE_URL + '/data/manifest.json', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(MOCK_RESPONSE))
      }),
    )

    const { result, waitFor } = renderHook(
      () =>
        useHomePageQuery(data => {
          store.dispatch(setStore(data))
          return data
        }),
      {
        wrapper,
      },
    )
    await waitFor(() => result.current.isSuccess)
    const songs = store.getState().songs
    expect(songs.length).toBe(3)
  })
})
