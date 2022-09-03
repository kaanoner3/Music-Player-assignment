import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image } from '@skoove/design-system.image'
import { Text } from '@skoove/design-system.text'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

const MOCK_SOURCE =
  'https://raw.githubusercontent.com/Learnfield-GmbH/CodingChallange/master/react%20native/simple%20audio%20player/data/Oceansound.png'

const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Open up App.tsx to start working on your app!</Text>
    <Image uri={MOCK_SOURCE} style={{ width: 200, height: 200 }} />
    <StatusBar style="auto" />
  </View>
)
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
