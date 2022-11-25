import { SignUp, action } from './SignUp'
import { ErrorPage } from '../../components'

export const signUpRoute = {
  path: 'sign-up',
  element: <SignUp />,
  errorElement: <ErrorPage />,
  action,
} as const
