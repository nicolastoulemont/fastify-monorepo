import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { signInRoute } from './signin'
import { rootRoute } from './root'
import { signUpRoute } from './signup'
import { channelsRoute } from './channels'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route /** / */ {...rootRoute} />
      <Route /** /signin */ {...signInRoute} />
      <Route /** /signup */ {...signUpRoute} />
      <Route /** /channels */ {...channelsRoute} />
    </>
  )
)
