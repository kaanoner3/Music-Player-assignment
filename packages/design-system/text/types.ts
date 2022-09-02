import type { FlexStyle } from 'react-native'

export type Alignment = 'left' | 'right' | 'center' | 'justify'

export type Decoration = 'bold' | 'strikeThrough' | 'textLink'

export type MarginProps = Pick<
  Partial<FlexStyle>,
  | 'margin'
  | 'marginBottom'
  | 'marginEnd'
  | 'marginHorizontal'
  | 'marginLeft'
  | 'marginRight'
  | 'marginStart'
  | 'marginTop'
  | 'marginVertical'
>
