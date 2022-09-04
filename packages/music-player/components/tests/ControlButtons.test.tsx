import { fireEvent, render } from '@testing-library/react-native'
import { act } from 'react-test-renderer'
import { mockSkipToNext, mockSkipToPrevious } from '../../../../jest-setup'
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
})
