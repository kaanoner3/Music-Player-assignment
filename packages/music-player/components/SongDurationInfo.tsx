import { Text } from '@skoove/design-system.text'
import { spacing } from '@skoove/design-system.theme'
import * as React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { useProgress } from 'react-native-track-player'

const SCREEN_WIDTH = Dimensions.get('window').width

export const SongDurationInfo = () => {
  const { position, duration } = useProgress(1)

  const formattedDuration = new Date(duration * 1000).toISOString().slice(11, 19)
  const formattedPosition = new Date(position * 1000).toISOString().slice(11, 19)

  return (
    <View style={styles.container}>
      <Text textAlign="center" style={styles.text}>
        {formattedPosition}
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
