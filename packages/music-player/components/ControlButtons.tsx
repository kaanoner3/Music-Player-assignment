import Ionicons from '@expo/vector-icons/Ionicons'
import { Button } from '@skoove/design-system.button'
import { SCREEN_WIDTH } from '@skoove/design-system.theme/spacing'
import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'

export const ControlButtons: React.FC = () => {
  const playbackState = usePlaybackState()
  const togglePlayer = React.useCallback(() => {
    const currentTrack = TrackPlayer.getCurrentTrack()

    if (currentTrack !== null) {
      if (playbackState === State.Playing) {
        TrackPlayer.pause()
      } else {
        TrackPlayer.play()
      }
    }
  }, [playbackState])
  const skipNext = React.useCallback(() => {
    TrackPlayer.skipToNext()
  }, [])
  const skipPrev = React.useCallback(() => {
    TrackPlayer.skipToPrevious()
  }, [])

  return (
    <View style={styles.controlButtonContainer}>
      <Button onPress={skipPrev}>
        <Ionicons name="play-skip-back-outline" size={50} color="#000" />
      </Button>
      <Button onPress={togglePlayer}>
        <Ionicons
          name={playbackState === State.Playing ? 'pause-circle-outline' : 'play-circle-outline'}
          size={100}
          color="#000"
        />
      </Button>
      <Button onPress={skipNext}>
        <Ionicons name="play-skip-forward-outline" size={50} color="#000" />
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  controlButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH - 128,
    marginTop: 20,
  },
  statusContainer: {
    height: 40,
    marginTop: 20,
    marginBottom: 60,
  },
})
