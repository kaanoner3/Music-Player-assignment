import { fireEvent, render } from '@testing-library/react-native'
import { act } from 'react-test-renderer'
import {
  mockGetCurrentTrack,
  mockPause,
  mockPlay,
  mockSkipToNext,
  mockSkipToPrevious,
  mockUsePlaybackState,
} from '../../../../jest-setup'
import { ControlButtons } from '../ControlButtons'

describe('ControlButtons', () => {
  it('Should render pause icon when State is "playing"', async () => {
    const { getByTestId } = render(<ControlButtons />)
    const toggleButton = getByTestId('toggle-button')
    const toggleButtonIcon = getByTestId('toggle-button-icon')
    expect(toggleButton).toBeTruthy()
    expect(toggleButtonIcon).toBeTruthy()
    expect(toggleButtonIcon.props.name).toBe('pause-circle-outline')
  })
  it('Should call TrackPlayer.skipToPrevious when prev button pressed"', async () => {
    const { getByTestId } = render(<ControlButtons />)
    const prevButton = getByTestId('prev-button')
    expect(prevButton).toBeTruthy()
    fireEvent.press(prevButton)
    await act(() => {
      expect(mockSkipToPrevious).toHaveBeenCalledTimes(1)
    })
  })
  it('Should call TrackPlayer.skipToNext when next button pressed"', async () => {
    const { getByTestId } = render(<ControlButtons />)
    const prevButton = getByTestId('next-button')
    expect(prevButton).toBeTruthy()
    fireEvent.press(prevButton)
    await act(() => {
      expect(mockSkipToNext).toHaveBeenCalledTimes(1)
    })
  })

  it('Should call TrackPlayer.pause when state is playing"', async () => {
    const { getByTestId } = render(<ControlButtons />)
    const toggleButton = getByTestId('toggle-button')
    expect(toggleButton).toBeTruthy()
    fireEvent.press(toggleButton)
    await act(() => {
      expect(mockPause).toHaveBeenCalledTimes(1)
    })
  })
  it('Should call TrackPlayer.play when state is pause"', async () => {
    mockUsePlaybackState.mockImplementation(() => 'paused')
    const { getByTestId } = render(<ControlButtons />)
    const toggleButton = getByTestId('toggle-button')
    expect(toggleButton).toBeTruthy()
    fireEvent.press(toggleButton)
    await act(() => {
      expect(mockPlay).toHaveBeenCalledTimes(1)
    })
  })
  it('Should not call play or pause when current track is null"', async () => {
    mockUsePlaybackState.mockImplementation(() => 'paused')
    mockGetCurrentTrack.mockImplementation(() => null)
    const { getByTestId } = render(<ControlButtons />)
    const toggleButton = getByTestId('toggle-button')
    expect(toggleButton).toBeTruthy()
    fireEvent.press(toggleButton)
    await act(() => {
      expect(mockPlay).not.toHaveBeenCalled()
      expect(mockPause).not.toHaveBeenCalled()
    })
  })
})
