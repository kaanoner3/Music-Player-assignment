import * as React from 'react'
import { StyleProp } from 'react-native'
import FastImage, { FastImageProps, ImageStyle, ResizeMode } from 'react-native-fast-image'

export interface ImageProps extends FastImageProps {
  uri?: string
  resizeMode?: ResizeMode
  children?: React.ReactNode
  style?: StyleProp<ImageStyle>
}

export function Image({
  uri,
  style,
  children,
  resizeMode = 'contain',
  testID = 'image',
  ...props
}: ImageProps) {
  return (
    <FastImage testID={testID} style={style} source={{ uri }} resizeMode={resizeMode} {...props}>
      {children}
    </FastImage>
  )
}
