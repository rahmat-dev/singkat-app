import { collection, getDocs, query, where } from 'firebase/firestore'
import {
  LoaderFunction,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom'

import NotFound from '~/components/errors/not-found'
import AuthLayout from '~/components/layout/auth-layout'
import MainLayout from '~/components/layout/main-layout'
import { db } from '~/lib/firebase'
import HomePage from '~/pages/home'
import SignIn from '~/pages/signin'
import SignUp from '~/pages/signup'

const redirectToOriginalUrl: LoaderFunction = async ({ params }) => {
  const shortUrl = params.shortUrl
  const q = query(collection(db, 'links'), where('shortUrl', '==', shortUrl))
  const querySnapshot = await getDocs(q)
  if (querySnapshot.docs.length) {
    return redirect(querySnapshot.docs[0].data().originalUrl)
  }

  return {}
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: '/', element: <HomePage /> }],
  },
  {
    path: '/:shortUrl',
    loader: redirectToOriginalUrl,
    element: <NotFound />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
