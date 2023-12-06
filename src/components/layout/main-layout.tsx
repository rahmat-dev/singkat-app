import { Container, LoadingOverlay } from '@mantine/core'
import { Navigate, Outlet } from 'react-router-dom'

import Header from '~/components/header'
import { useAuth } from '~/context/auth-context'

export default function MainLayout() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <LoadingOverlay visible />

  if (!user) return <Navigate to="/signin" replace />

  return (
    <>
      <Header />
      <Container size="xs" component="main">
        <Outlet />
      </Container>
    </>
  )
}
