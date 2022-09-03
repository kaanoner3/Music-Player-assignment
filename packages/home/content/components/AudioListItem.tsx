import { Image } from '@skoove/design-system.image'
import { Text } from '@skoove/design-system.text'
import { spacing } from '@skoove/design-system.theme'
import * as React from 'react'
import { View, ListRenderItem, StyleSheet } from 'react-native'

import { AudioItem } from '../types'

export const AudioListItem: ListRenderItem<AudioItem> = ({ item, index }) => {
  return (
    <View style={styles.container}>
      <Image resizeMode="cover" style={styles.image} uri={item.cover}>
        <Text textAlign="center" style={styles.text}>
          {item.title}
        </Text>
      </Image>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#8f8881',
    borderRadius: 20,
    marginVertical: spacing.s12,
    overflow: 'hidden',
  },
  image: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    height: 200,
  },
  text: {
    paddingTop: spacing.s4,
    height: 40,
    width: '100%',
    fontSize: 24,
    backgroundColor: '#fff',
    fontWeight: 'bold',
  },
})
