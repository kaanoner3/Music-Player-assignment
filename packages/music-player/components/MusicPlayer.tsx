import { Image } from '@skoove/design-system.image'
import { spacing } from '@skoove/design-system.theme'
import { SCREEN_WIDTH } from '@skoove/design-system.theme/spacing'
import { AudioItem } from '@skoove/home.content'
import { ReducerStateType, setCurrentSong } from '@skoove/platform.redux'
import * as React from 'react'
import {
  FlatList,
  ListRenderItem,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import TrackPlayer, { Event, useTrackPlayerEvents } from 'react-native-track-player'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { ControlButtons } from './ControlButtons'
import { Slider } from './Slider'
import { SongDurationInfo } from './SongDurationInfo'
import { SongTitle } from './SongTitle'

const ITEM_HEIGHT = 340

const renderItem: ListRenderItem<AudioItem> = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image resizeMode="cover" style={styles.itemImage} uri={item.cover} />
    </View>
  )
}
const getItemLayout = (_: AudioItem[] | null | undefined, index: number) => ({
  length: SCREEN_WIDTH,
  offset: SCREEN_WIDTH * index,
  index,
})

export const MusicPlayer: React.FC = () => {
  const currentSongIndex = useSelector<ReducerStateType, number>(state => state.currentSongIndex)
  const songs = useSelector<ReducerStateType, AudioItem[]>(state => state.songs, shallowEqual)
  const flatListRef = React.useRef<FlatList>(null)
  const dispatch = useDispatch()

  useTrackPlayerEvents([Event.PlaybackTrackChanged], ({ nextTrack }) => {
    if (flatListRef.current && nextTrack < songs.length) {
      dispatch(setCurrentSong(nextTrack))
      flatListRef.current.scrollToIndex({ index: nextTrack })
    }
  })

  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x
    const index = Math.round(scrollX / SCREEN_WIDTH)

    if (scrollX > 0 && index !== currentSongIndex) {
      TrackPlayer.skip(index)
    }
  }

  const onSlidingComplete = React.useCallback((value: number) => {
    TrackPlayer.seekTo(value)
  }, [])

  return (
    <View style={styles.container}>
      <SongTitle />
      <FlatList
        testID="song-list"
        ref={flatListRef}
        onScrollEndDrag={onScrollEndDrag}
        getItemLayout={getItemLayout}
        initialScrollIndex={currentSongIndex}
        style={styles.flatList}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        data={songs}
        renderItem={renderItem}
      />
      <ControlButtons />
      <Slider onSlidingComplete={onSlidingComplete} />
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
    marginTop: spacing.s18,
  },
  flatList: { flexGrow: 0, paddingTop: spacing.s18 },
  itemContainer: {
    height: ITEM_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    paddingHorizontal: spacing.s32,
  },
  itemImage: { borderRadius: 15, width: '100%', height: '100%' },
})
