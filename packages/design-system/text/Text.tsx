import * as React from 'react'
import { StyleSheet, Text as RNText } from 'react-native'

import { MarginProps, Decoration, Alignment } from './types'
import { pickDefinedValues } from './utils/pickDefinedValues'

export interface TextProps extends MarginProps {
  children?: React.ReactNode
  color?: string
  decoration?: Decoration
  numberOfLines?: number
  testID?: string
  textAlign?: Alignment
}

export const Text: React.FC<TextProps> = ({
  testID,
  children,
  numberOfLines,
  decoration,
  textAlign,
  margin,
  marginBottom,
  marginEnd,
  marginHorizontal,
  marginLeft,
  marginRight,
  marginStart,
  marginTop,
  marginVertical,
  color = '#000',
}) => {
  const supportedMarginStyles = {
    margin,
    marginBottom,
    marginEnd,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginStart,
    marginTop,
    marginVertical,
  }
  const marginStyles = pickDefinedValues(supportedMarginStyles)

  return (
    <RNText
      testID={testID}
      numberOfLines={numberOfLines}
      style={[
        styles.text,
        marginStyles,
        textAlign !== undefined && { textAlign },
        { color },
        decoration && styles[decoration],
      ]}>
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'normal',
    color: '#000',
    margin: 0,
    marginVertical: 0,
    padding: 0,
  },

  bold: {
    fontWeight: 'bold',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
  textLink: {
    textDecorationLine: 'underline',
  },
})
