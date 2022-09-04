import { ScreenHOC } from '@skoove/platform.screen'

import { HomeScreen } from '@skoove/home.content'
import { MusicPlayerScreen } from '@skoove/music-player.content'
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

export type CoreStackParamList = {
  Songs: undefined
  MusicContent: undefined
}
export type MusicContentNavigationProps = NativeStackNavigationProp<
  CoreStackParamList,
  'MusicContent'
>
const CoreStack = createNativeStackNavigator()

const Home = ScreenHOC(HomeScreen)
const MusicContent = ScreenHOC(MusicPlayerScreen)
export const CoreNavigation = () => {
  return (
    <NavigationContainer>
      <CoreStack.Navigator>
        <CoreStack.Screen name="Songs" component={Home} />
        <CoreStack.Screen name="MusicContent" component={MusicContent} />
      </CoreStack.Navigator>
    </NavigationContainer>
  )
}
