import { Text } from '@skoove/design-system.text'
import { spacing } from '@skoove/design-system.theme'
import { AudioItem } from '@skoove/home.content'
import { ReducerStateType } from '@skoove/platform.redux'
import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector, shallowEqual } from 'react-redux'

export const SongTitle = () => {
  const activeSong = useSelector<ReducerStateType, AudioItem | undefined>(
    state => state.activeSong,
    shallowEqual,
  )
  return (
    <View style={styles.titleContainer}>
      <Text textAlign="center" style={styles.text}>
        {activeSong?.title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: spacing.s18,
  },
  text: { fontSize: 24, color: '#000', fontWeight: 'bold' },
})
