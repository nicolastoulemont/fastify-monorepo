import { Dashboard, loader } from './Dashboard'

export const dashboardRoute = {
  path: 'dashboard',
  element: <Dashboard />,
  loader,
} as const
