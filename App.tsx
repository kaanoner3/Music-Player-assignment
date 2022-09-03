import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '@skoove/home.content'
import { MusicContentScreen } from '@skoove/music-player.content'
import { ScreenHOC } from '@skoove/platform.screen'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from '@skoove/platform.redux'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
})

const Stack = createNativeStackNavigator()

const Home = ScreenHOC(HomeScreen)
const MusicContent = ScreenHOC(MusicContentScreen)

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Songs" component={Home} />
            <Stack.Screen name="MusicContent" component={MusicContent} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  )
}
