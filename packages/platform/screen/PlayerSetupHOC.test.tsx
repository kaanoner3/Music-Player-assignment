import { Provider } from 'react-redux'
import { store, resetStore, setStore } from '@skoove/platform.redux'
import { NavigationContainer } from '@react-navigation/native'
import { testQueryClient, mockedSetupPlayer } from '../../../jest-setup'
import { QueryClientProvider } from 'react-query'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { BASE_URL } from '@skoove/platform.fetch'
import { act, render } from '@testing-library/react-native'
import { renderHook } from '@testing-library/react-hooks'
import { PlayerSetupHOC } from './PlayerSetupHOC'
import { AudioItem } from '@skoove/home.content'
import { MOCK_RESPONSE } from '../../home/mocks/MOCK_RESPONSE'
import { useHomePageQuery } from '../../home/hooks/useHomePageQuery'

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={testQueryClient}>
        <NavigationContainer>{children}</NavigationContainer>
      </QueryClientProvider>
    </Provider>
  )
}

describe('PlayerSetupHOC', () => {
  const server = setupServer()
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
    server.use(
      rest.get(BASE_URL + '/data/manifest.json', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(MOCK_RESPONSE))
      }),
    )
  })
  afterAll(() => {
    server.close()
  })
  beforeEach(async () => {
    await act(async () => {
      store.dispatch(resetStore())
    })
  })
  it('setupServer should have been called 1 time ', async () => {
    const { result, waitFor } = renderHook(
      () =>
        useHomePageQuery((data: AudioItem[]) => {
          store.dispatch(setStore(data))
          return data
        }),
      {
        wrapper: TestWrapper,
      },
    )
    const {} = render(
      <TestWrapper>
        <PlayerSetupHOC />
      </TestWrapper>,
    )

    await waitFor(() => result.current.isSuccess)

    await act(async () => {
      await expect(mockedSetupPlayer).toHaveBeenCalledTimes(1)
    })
  })
})
