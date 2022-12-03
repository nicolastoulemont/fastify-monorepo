import { Channels, loader } from './Channels'

export const channelsRoute = {
  path: 'channels',
  element: <Channels />,
  loader,
} as const
