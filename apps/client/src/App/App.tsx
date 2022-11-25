import { QueryClientProvider, queryClient } from './query'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
