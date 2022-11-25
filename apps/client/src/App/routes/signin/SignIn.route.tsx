import { SignIn, action } from './SignIn'

export const signInRoute = {
  path: 'sign-in',
  element: <SignIn />,
  action,
} as const
