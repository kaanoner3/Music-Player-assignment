import { render } from '@testing-library/react-native'

import { Image } from './Image'

const MOCK_SOURCE =
  'https://raw.githubusercontent.com/Learnfield-GmbH/CodingChallange/master/react%20native/simple%20audio%20player/data/Oceansound.png'
describe('Image', () => {
  it('renders an image', () => {
    const component = <Image accessibilityRole="image" uri={MOCK_SOURCE} style={{ width: 200 }} />
    const { getByRole } = render(component)
    expect(getByRole('image')).toBeTruthy()
  })
})
