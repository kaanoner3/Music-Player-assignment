import { store } from '@skoove/platform.redux'
import { PlayerSetupHOC } from '@skoove/platform.screen'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { CoreNavigation } from '@skoove/platform.navigation'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
})

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PlayerSetupHOC>
          <CoreNavigation />
        </PlayerSetupHOC>
      </QueryClientProvider>
    </Provider>
  )
}
