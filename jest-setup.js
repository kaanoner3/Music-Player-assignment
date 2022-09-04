import { QueryClient } from 'react-query'
import '@testing-library/jest-native/extend-expect'
import 'whatwg-fetch'
import { View } from 'react-native'
import { act } from '@testing-library/react-native'
import { store, resetStore } from '@skoove/platform.redux'

export const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      retry: false,
      cacheTime: Infinity,
    },
  },
})
const MockIonIcon = props => (
  <View {...props} testID={props.testID ? props.testID : `PhosphorIcon-${props.name}`} />
)

jest.mock('@expo/vector-icons/Ionicons', () => ({
  __esModule: true,
  default: MockIonIcon,
}))
beforeAll(async () => {
  await act(async () => {
    store.dispatch(resetStore())
  })
})
export const mockNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  }
})
export const mockSkip = jest.fn()
export const mockSetupPlayer = jest.fn()
export const mockAdd = jest.fn()
export const mockGetCurrentTrack = jest.fn()
export const mockSkipToPrevious = jest.fn()
export const mockSkipToNext = jest.fn()
export const mockSeekTo = jest.fn()
export const mockPause = jest.fn()
export const mockGetQueue = jest.fn(() => [])
export const mockPlay = jest.fn()
export const mockUsePlaybackState = jest.fn(() => 'playing')
jest.mock('react-native-track-player', () => {
  return {
    addEventListener: jest.fn(),
    registerEventHandler: jest.fn(),
    registerPlaybackService: jest.fn(),
    setupPlayer: mockSetupPlayer,
    destroy: jest.fn(),
    updateOptions: jest.fn(),
    add: mockAdd,
    remove: jest.fn(),
    skip: mockSkip,
    skipToNext: mockSkipToNext,
    skipToPrevious: mockSkipToPrevious,
    removeUpcomingTracks: jest.fn(),
    // playback commands
    reset: jest.fn(),
    play: mockPlay,
    pause: mockPause,
    stop: jest.fn(),
    seekTo: mockSeekTo,
    setVolume: jest.fn(),
    setRate: jest.fn(),
    // player getters
    getQueue: mockGetQueue,
    getTrack: jest.fn(),
    getCurrentTrack: mockGetCurrentTrack,
    getVolume: jest.fn(),
    getDuration: jest.fn(),
    getPosition: jest.fn(),
    getBufferedPosition: jest.fn(),
    getState: jest.fn(),
    getRate: jest.fn(),
    useProgress: () => ({
      position: 100,
      duration: 5000,
      buffered: 200,
    }),
    useTrackPlayerEvents: () => {
      return 2
    },
    Event: { PlaybackTrackChanged: true },
    usePlaybackState: mockUsePlaybackState,
    State: { Playing: 'playing', Pause: 'paused' },
  }
})
