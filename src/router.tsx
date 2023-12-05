import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import HomePage from '~/pages/Home'
import SignIn from '~/pages/SignIn'

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/signin', element: <SignIn /> },
])

export function Router() {
  return <RouterProvider router={router} />
}
