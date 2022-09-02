import { render } from '@testing-library/react-native'
import * as React from 'react'

import { Text } from './Text'
import { pickDefinedValues } from './utils/pickDefinedValues'

const TEXT = 'Test text'
describe('Text', () => {
  it('Should properly eliminate undefined margin records', () => {
    expect(pickDefinedValues({ marginTop: undefined, marginRight: 30 })).toMatchObject({
      marginRight: 30,
    })
  })
  it('Renders', async () => {
    const component = <Text testID="Text">{TEXT}</Text>
    const { getByTestId, getByText } = render(component)
    expect(getByTestId('Text')).toBeTruthy()
    expect(getByText(TEXT)).toBeTruthy()
  })
  it('Should render with requested styles', async () => {
    const component = (
      <Text
        numberOfLines={2}
        color="#f6f6f6"
        marginRight={10}
        marginTop={15}
        marginVertical={99}
        textAlign="center"
        testID="Text">
        {TEXT}
      </Text>
    )
    const { getByTestId } = render(component)
    const el = getByTestId('Text')
    expect(el.props.numberOfLines).toEqual(2)
    expect(el).toHaveStyle({
      color: '#f6f6f6',
      marginRight: 10,
      marginTop: 15,
      marginVertical: 99,
      textAlign: 'center',
    })
  })
})
