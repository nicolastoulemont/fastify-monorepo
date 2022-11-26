import { SignIn, action } from './SignIn'

export const signInRoute = {
  path: 'signin',
  element: <SignIn />,
  action,
} as const
