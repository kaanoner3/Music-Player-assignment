import { default as RNSlider } from '@react-native-community/slider'
import { SCREEN_WIDTH } from '@skoove/design-system.theme/spacing'
import { ReducerStateType } from '@skoove/platform.redux'
import * as React from 'react'
import { useSelector } from 'react-redux'

interface SliderCompProps {
  onSliderValueChange: (value: number) => void
}

export const Slider: React.FC<SliderCompProps> = ({ onSliderValueChange }) => {
  const progression = useSelector<ReducerStateType, number>(state => state.progression)
  return (
    <RNSlider
      style={{ width: SCREEN_WIDTH - 40, height: 40 }}
      minimumValue={0}
      maximumValue={100}
      value={progression}
      onValueChange={onSliderValueChange}
      maximumTrackTintColor="#a0ada3"
      minimumTrackTintColor="#000000"
    />
  )
}
