import { render } from '@testing-library/react-native'

import { SongDurationInfo } from '../SongDurationInfo'

describe('SongDurationInfo', () => {
  it('Should display correct duration & position times', async () => {
    const { getByText } = render(<SongDurationInfo />)
    expect(getByText('01:23:20')).toBeTruthy()
    expect(getByText('00:01:40')).toBeTruthy()
  })
})
