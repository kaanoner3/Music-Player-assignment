import { Text } from '@skoove/design-system.text'
import { spacing } from '@skoove/design-system.theme'
import { ReducerStateType } from '@skoove/platform.redux'
import * as React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'

const SCREEN_WIDTH = Dimensions.get('window').width

export const SongDurationInfo = () => {
  const progression = useSelector<ReducerStateType, number>(state => state.progression)
  const duration = useSelector<ReducerStateType, number>(state => state.duration)

  const formattedDuration = new Date(duration).toISOString().slice(11, 19)
  const formattedProgression = new Date(progression).toISOString().slice(11, 19)

  return (
    <View style={styles.container}>
      <Text textAlign="center" style={styles.text}>
        {formattedProgression}
      </Text>
      <Text textAlign="center" style={styles.text}>
        {formattedDuration}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 40,
    marginTop: spacing.s18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: { fontSize: 18, color: '#000', fontWeight: '500' },
})
