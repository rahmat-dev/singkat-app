import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Header from '~/components/header'
import HomePage from '~/pages/home'
import SignIn from '~/pages/signin'

const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/signin', element: <SignIn /> },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
