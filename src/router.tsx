import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import MainLayout from '~/components/layout/main-layout'
import HomePage from '~/pages/home'
import SignIn from '~/pages/signin'
import SignUp from '~/pages/signup'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: '/', element: <HomePage /> }],
  },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
])

export function Router() {
  return <RouterProvider router={router} />
}
