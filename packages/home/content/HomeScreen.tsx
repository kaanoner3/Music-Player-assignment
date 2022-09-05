import { useNavigation } from '@react-navigation/native'
import { Button } from '@skoove/design-system.button'
import { Image } from '@skoove/design-system.image'
import { Text } from '@skoove/design-system.text'
import { spacing } from '@skoove/design-system.theme'
import { MusicContentNavigationProps } from '@skoove/platform.navigation'
import { setStore, setCurrentSong } from '@skoove/platform.redux'
import * as React from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  ListRenderItem,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import TrackPlayer from 'react-native-track-player'
import { useDispatch } from 'react-redux'

import { useHomePageQuery } from '../hooks/useHomePageQuery'
import { useRefreshByUser } from '../hooks/useRefreshByUser'
import { AudioItem } from './types'

const noResulComponent = () => {
  return (
    <View testID="no-result">
      <Text>No Result</Text>
    </View>
  )
}
const LoadingComponent = () => {
  return (
    <View>
      <ActivityIndicator></ActivityIndicator>
    </View>
  )
}
export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<MusicContentNavigationProps>()
  const dispatch = useDispatch()
  const { data, refetch, isLoading } = useHomePageQuery(_data => {
    dispatch(setStore(_data))
    return _data
  })
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  const navigateToMusicPlayer = (index: number) => {
    dispatch(setCurrentSong(index))
    TrackPlayer.skip(index)
    navigation.navigate('MusicContent')
  }
  const renderItem: ListRenderItem<AudioItem> = ({ item, index }) => {
    return (
      <Button
        testID={`item-button-${index}`}
        onPress={() => {
          navigateToMusicPlayer(index)
        }}
        style={styles.itemContainer}>
        <Image resizeMode="cover" style={styles.image} uri={item.cover}>
          <Text textAlign="center" style={styles.text}>
            {item.title}
          </Text>
        </Image>
      </Button>
    )
  }
  if (isLoading) return <LoadingComponent />
  return (
    <View testID="HomeScreen" style={styles.container}>
      <FlatList
        refreshing
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
        }
        ListEmptyComponent={noResulComponent}
        data={data ?? []}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: spacing.s16,
  },
  itemContainer: {
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
