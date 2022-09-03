import { spacing } from '@skoove/design-system.theme'
import * as React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'

import { useHomePageQuery } from '../hooks/useHomePageQuery'
import { AudioListItem } from './components/AudioListItem'

export const HomeScreen: React.FC = () => {
  const response = useHomePageQuery(data => {
    return data
  })

  React.useEffect(() => {
    console.log('render', response)
  }, [response])

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        renderItem={AudioListItem}
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
})
