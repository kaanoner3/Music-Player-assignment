import { default as RNSlider } from '@react-native-community/slider'
import { SCREEN_WIDTH } from '@skoove/design-system.theme/spacing'
import * as React from 'react'
import { useProgress } from 'react-native-track-player'

interface SliderCompProps {
  onSlidingComplete: (value: number) => void
}

export const Slider: React.FC<SliderCompProps> = ({ onSlidingComplete }) => {
  const { position, duration } = useProgress(1)
  return (
    <RNSlider
      style={{ width: SCREEN_WIDTH - 40, height: 40 }}
      minimumValue={0}
      maximumValue={duration}
      value={position}
      onSlidingComplete={onSlidingComplete}
      maximumTrackTintColor="#a0ada3"
      minimumTrackTintColor="#000000"
    />
  )
}
