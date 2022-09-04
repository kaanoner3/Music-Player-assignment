import { Provider } from 'react-redux'
import { store, resetStore } from '@skoove/platform.redux'
import { NavigationContainer } from '@react-navigation/native'
import { mockedNavigate, mockedSkip, testQueryClient } from '../../../jest-setup'
import { QueryClientProvider } from 'react-query'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { BASE_URL } from '@skoove/platform.fetch'
import { HomeScreen } from './HomeScreen'
import { act, fireEvent, render } from '@testing-library/react-native'
import { MOCK_RESPONSE } from '../mocks/MOCK_RESPONSE'
import { renderHook } from '@testing-library/react-hooks'
import { useHomePageQuery } from '../hooks/useHomePageQuery'

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={testQueryClient}>
        <NavigationContainer>{children}</NavigationContainer>
      </QueryClientProvider>
    </Provider>
  )
}
describe('HomeScreen', () => {
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
  it('should render HomeScreen', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>,
    )
    expect(getByTestId('HomeScreen')).toBeTruthy()
  })
  it('should render HomeScreen with server response', async () => {
    const { result, waitFor } = renderHook(() => useHomePageQuery(data => data), {
      wrapper: TestWrapper,
    })
    const { getByTestId, getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>,
    )
    expect(getByTestId('no-result')).toBeTruthy()
    await act(async () => {
      await waitFor(() => result.current.isSuccess)
      expect(getByText('Oceansound')).toBeTruthy()
    })
  })
  it('On Flatlist item press navigation.navigate should called with MusicContent', async () => {
    const { result, waitFor } = renderHook(() => useHomePageQuery(data => data), {
      wrapper: TestWrapper,
    })
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>,
    )
    await act(async () => {
      await waitFor(() => result.current.isSuccess)
      const firstItem = getByText('Nightlife')
      expect(firstItem).toBeTruthy()
      fireEvent.press(firstItem)
      expect(mockedNavigate).toHaveBeenCalledWith('MusicContent')
    })
  })
  it('On Flatlist item press Trackplayer.skip should called with index', async () => {
    const { result, waitFor } = renderHook(() => useHomePageQuery(data => data), {
      wrapper: TestWrapper,
    })
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>,
    )

    await act(async () => {
      await waitFor(() => result.current.isSuccess)
      const firstItem = getByText('Nightlife')
      expect(firstItem).toBeTruthy()
      fireEvent.press(firstItem)
      expect(mockedSkip).toHaveBeenCalledWith(1)
    })
  })
  it('On Flatlist item press currentSongIndex should set to index', async () => {
    const { result, waitFor } = renderHook(() => useHomePageQuery(data => data), {
      wrapper: TestWrapper,
    })
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>,
    )
    expect(store.getState().currentSongIndex).toBe(0)

    await act(async () => {
      await waitFor(() => result.current.isSuccess)
      const firstItem = getByText('Nightlife')
      expect(firstItem).toBeTruthy()
      fireEvent.press(firstItem)
      expect(store.getState().currentSongIndex).toBe(1)
    })
  })
})
