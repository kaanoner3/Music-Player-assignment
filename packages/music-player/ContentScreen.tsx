import Ionicons from '@expo/vector-icons/Ionicons'
import { Button } from '@skoove/design-system.button'
import { Image } from '@skoove/design-system.image'
import { spacing } from '@skoove/design-system.theme'
import { SCREEN_WIDTH } from '@skoove/design-system.theme/spacing'
import { AudioItem } from '@skoove/home.content'
import { ReducerStateType, setCurrentSong, setProgression } from '@skoove/platform.redux'
import * as React from 'react'
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Slider } from './components/Slider'

import { SongDurationInfo } from './components/SongDurationInfo'
import { SongTitle } from './components/SongTitle'

const renderItem: ListRenderItem<AudioItem> = ({ item }) => {
  return (
    <View
      style={{
        height: 340,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        paddingHorizontal: 32,
      }}>
      <Image
        resizeMode="cover"
        style={{ borderRadius: 15, width: '100%', height: '100%' }}
        uri={item.cover}
      />
    </View>
  )
}

export const MusicContentScreen: React.FC = () => {
  const currentSongIndex = useSelector<ReducerStateType, number>(state => state.currentSongIndex)
  const songs = useSelector<ReducerStateType, AudioItem[]>(state => state.songs, shallowEqual)
  const dispatch = useDispatch()

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x
    const index = Math.round(scrollX / SCREEN_WIDTH)
    if (scrollX > 0 && index !== currentSongIndex) {
      dispatch(setCurrentSong(index))
    }
  }
  const onSliderValueChange = (value: number) => {
    dispatch(setProgression(value))
  }

  return (
    <View style={styles.container}>
      <SongTitle />
      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
        }}
        onScroll={scrollHandler}
        style={{ flexGrow: 0, paddingTop: spacing.s18 }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        data={songs}
        renderItem={renderItem}
      />
      <View style={styles.controlButtonContainer}>
        <Button>
          <Ionicons name="play-skip-back-outline" size={50} color="#000" />
        </Button>
        <Button>
          <Ionicons name="play-circle-outline" size={100} color="#000" />
        </Button>
        <Button>
          <Ionicons name="play-skip-forward-outline" size={50} color="#000" />
        </Button>
      </View>
      <Slider onSliderValueChange={onSliderValueChange} />
      <SongDurationInfo />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  controlButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH - 128,
    marginTop: 20,
  },
})
