import { QueryClient } from 'react-query'
import '@testing-library/jest-native/extend-expect'
import 'whatwg-fetch'
import { View } from 'react-native'

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

export const mockedNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  }
})
export const mockedSkip = jest.fn()
export const mockedSetupPlayer = jest.fn()
export const mockedAdd = jest.fn()
export const mockGetCurrentTrack = jest.fn().mockRejectedValueOnce(new Error('error'))
export const mockSkipToPrevious = jest.fn()
export const mockSkipToNext = jest.fn()
export const mockSeekTo = jest.fn()
jest.mock('react-native-track-player', () => {
  return {
    addEventListener: jest.fn(),
    registerEventHandler: jest.fn(),
    registerPlaybackService: jest.fn(),
    setupPlayer: mockedSetupPlayer,
    destroy: jest.fn(),
    updateOptions: jest.fn(),
    add: mockedAdd,
    remove: jest.fn(),
    skip: mockedSkip,
    skipToNext: mockSkipToNext,
    skipToPrevious: mockSkipToPrevious,
    removeUpcomingTracks: jest.fn(),
    // playback commands
    reset: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
    seekTo: mockSeekTo,
    setVolume: jest.fn(),
    setRate: jest.fn(),
    // player getters
    getQueue: jest.fn(),
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
    usePlaybackState: () => 'playing',
    State: { Playing: 'playing', Pause: 'paused' },
  }
})
