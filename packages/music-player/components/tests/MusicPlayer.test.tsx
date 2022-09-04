import { setCurrentSong, setStore, store } from '@skoove/platform.redux'
import { fireEvent, render } from '@testing-library/react-native'
import { mockSkip, mockSeekTo } from '../../../../jest-setup'
import { MusicPlayer } from '../MusicPlayer'
import { Provider } from 'react-redux'
import { MOCK_RESPONSE } from '../../../home/mocks/MOCK_RESPONSE'
import { act } from 'react-test-renderer'

describe('MusicPlayer', () => {
  beforeEach(() => {
    store.dispatch(setStore(MOCK_RESPONSE.data))
    store.dispatch(setCurrentSong(1))
  })
  it('should call TrakPlayer.seekTo when sliding is completed', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MusicPlayer />
      </Provider>,
    )
    const slider = getByTestId('slider')
    fireEvent(slider, 'onSlidingComplete', 50)
    expect(mockSeekTo).toHaveBeenCalledWith(50)
  })
  it('should display correct title & song durations', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MusicPlayer />
      </Provider>,
    )
    await act(async () => {
      await store.dispatch(setCurrentSong(1))
      expect(getByText('01:23:20')).toBeTruthy()
      expect(getByText('00:01:40')).toBeTruthy()
      expect(getByText('Nightlife')).toBeTruthy()
    })
  })
  it('Should skip track if calculated index is differen from the currentSongIndex', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MusicPlayer />
      </Provider>,
    )
    const flatList = getByTestId('song-list')
    fireEvent(flatList, 'onScrollEndDrag', {
      nativeEvent: {
        contentSize: { height: 300, width: 300 },
        contentOffset: { y: 0, x: 350 },
        layoutMeasurement: { height: 300, width: 300 },
      },
    })
    await act(async () => {
      expect(mockSkip).toHaveBeenCalled()
    })
  })
})
