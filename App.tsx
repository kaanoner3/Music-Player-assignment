import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '@skoove/home.content'
import { MusicPlayerScreen } from '@skoove/music-player.content'
import { store } from '@skoove/platform.redux'
import { ScreenHOC, PlayerSetupHOC } from '@skoove/platform.screen'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
})

const Stack = createNativeStackNavigator()

const Home = ScreenHOC(HomeScreen)
const MusicContent = ScreenHOC(MusicPlayerScreen)

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <PlayerSetupHOC>
            <Stack.Navigator>
              <Stack.Screen name="Songs" component={Home} />
              <Stack.Screen name="MusicContent" component={MusicContent} />
            </Stack.Navigator>
          </PlayerSetupHOC>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  )
}
