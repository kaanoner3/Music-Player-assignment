import { fireEvent, render } from '@testing-library/react-native'
import { mockSeekTo } from '../../../../jest-setup'
import { Slider } from '../Slider'

describe('Slider', () => {
  it('onSlidingComplete should have been called 1 time when sliding is complete', async () => {
    const mockOnSlidingComplete = jest.fn()
    const { getByTestId } = render(<Slider onSlidingComplete={mockOnSlidingComplete} />)
    const slider = getByTestId('slider')
    fireEvent(slider, 'onSlidingComplete', { scrollTo: 50 })
    expect(mockOnSlidingComplete).toHaveBeenCalledTimes(1)
  })
  it('onSlidingComplete should have been called with provided value', async () => {
    const mockOnSlidingComplete = jest.fn()
    const { getByTestId } = render(<Slider onSlidingComplete={mockOnSlidingComplete} />)
    const slider = getByTestId('slider')
    fireEvent(slider, 'onSlidingComplete', { scrollTo: 50 })
    expect(mockSeekTo).toHaveBeenCalledWith(50)
  })
})
