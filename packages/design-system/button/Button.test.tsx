import { render, fireEvent } from '@testing-library/react-native'

import { Button } from './Button'

describe('Button', () => {
  it('renders a button', () => {
    const component = <Button accessibilityRole="button" />
    const { getByRole } = render(component)
    expect(getByRole('button')).toBeTruthy()
  })
  it('should call onPress 1 time when clicked', () => {
    const onPress = jest.fn()
    const component = <Button testID="Button" accessibilityRole="button" onPress={onPress} />
    const { getByTestId } = render(component)
    const button = getByTestId('Button')
    fireEvent.press(button)
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
