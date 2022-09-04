import { spacing } from '@skoove/design-system.theme'
import * as React from 'react'
import { StyleProp, StyleSheet, Text as RNText, TextStyle } from 'react-native'

import { MarginProps, Decoration, Alignment } from './types'
import { pickDefinedValues } from './utils/pickDefinedValues'

export interface TextProps extends MarginProps {
  children?: React.ReactNode
  color?: string
  decoration?: Decoration
  numberOfLines?: number
  testID?: string
  textAlign?: Alignment
  style?: StyleProp<TextStyle>
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
  style = {},
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
        style,
      ]}>
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'normal',
    color: '#000',
    margin: spacing.s0,
    marginVertical: spacing.s0,
    padding: spacing.s0,
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
