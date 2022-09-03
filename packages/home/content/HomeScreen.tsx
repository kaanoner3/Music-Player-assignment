import { useNavigation } from '@react-navigation/native'
import { Button } from '@skoove/design-system.button'
import { Image } from '@skoove/design-system.image'
import { Text } from '@skoove/design-system.text'
import { spacing } from '@skoove/design-system.theme'
import { setStore, setCurrentSong } from '@skoove/platform.redux'
import * as React from 'react'
import { StyleSheet, FlatList, View, ListRenderItem } from 'react-native'
import { useDispatch } from 'react-redux'

import { useHomePageQuery } from '../hooks/useHomePageQuery'
import { AudioItem } from './types'

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const response = useHomePageQuery(data => {
    dispatch(setStore(data))
    return data
  })

  const navigateToMusicPlayer = (index: number) => {
    dispatch(setCurrentSong(index))
    navigation.navigate('MusicContent')
  }
  const renderItem: ListRenderItem<AudioItem> = ({ item, index }) => {
    return (
      <Button onPress={() => navigateToMusicPlayer(index)} style={styles.itemContainer}>
        <Image resizeMode="cover" style={styles.image} uri={item.cover}>
          <Text textAlign="center" style={styles.text}>
            {item.title}
          </Text>
        </Image>
      </Button>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        data={response.data ?? []}
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
