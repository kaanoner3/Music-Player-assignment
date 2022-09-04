import { store, setStore, setCurrentSong } from '@skoove/platform.redux'
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { act } from 'react-test-renderer'
import { MOCK_RESPONSE } from '../../../home/mocks/MOCK_RESPONSE'
import { SongTitle } from '../SongTitle'

describe('SongTitle', () => {
  beforeEach(() => {
    store.dispatch(setStore(MOCK_RESPONSE.data))
  })
  it('Should display correct title when active song is not undefined', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <SongTitle />
      </Provider>,
    )

    await act(async () => {
      await store.dispatch(setCurrentSong(1))
      expect(getByText('Nightlife')).toBeTruthy()
    })
  })
})
