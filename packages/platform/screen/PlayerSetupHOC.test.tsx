import { Provider } from 'react-redux'
import { store, resetStore, setStore } from '@skoove/platform.redux'
import { NavigationContainer } from '@react-navigation/native'
import { testQueryClient, mockSetupPlayer, mockAdd, mockGetCurrentTrack } from '../../../jest-setup'
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
const MOCK_FORMATTED_SONGS = [
  {
    id: '0',
    url: 'https://raw.githubusercontent.com/Learnfield-GmbH/CodingChallange/master/react%20native/simple%20audio%20player/data/Oceansound.mp3',
    title: 'Oceansound',
    duration: 14.448,
    artwork:
      'https://raw.githubusercontent.com/Learnfield-GmbH/CodingChallange/master/react%20native/simple%20audio%20player/data/Oceansound.png',
  },
  {
    id: '1',
    url: 'https://raw.githubusercontent.com/Learnfield-GmbH/CodingChallange/master/react%20native/simple%20audio%20player/data/Nightlife.mp3',
    title: 'Nightlife',
    duration: 15.696,
    artwork:
      'https://raw.githubusercontent.com/Learnfield-GmbH/CodingChallange/master/react%20native/simple%20audio%20player/data/Nightlife.png',
  },
  {
    id: '2',
    url: 'https://raw.githubusercontent.com/Learnfield-GmbH/CodingChallange/master/react%20native/simple%20audio%20player/data/Waking_Me.mp3',
    title: 'Waking Me',
    duration: 13.776,
    artwork:
      'https://raw.githubusercontent.com/Learnfield-GmbH/CodingChallange/master/react%20native/simple%20audio%20player/data/Waking_Me.png',
  },
]
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

  it('TrackPlayer.add should have been called', async () => {
    mockGetCurrentTrack.mockImplementation().mockResolvedValueOnce(1)
    mockSetupPlayer.mockImplementation().mockReturnValueOnce(true)
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
      await expect(mockAdd).toHaveBeenCalled()
      await expect(mockAdd).toHaveBeenCalledWith(MOCK_FORMATTED_SONGS)
    })
  })
  it('setupServer should have been called 1 time ', async () => {
    mockGetCurrentTrack.mockImplementation().mockRejectedValueOnce(new Error('error'))

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
      await expect(mockSetupPlayer).toHaveBeenCalledTimes(1)
    })
  })
})
