import { LoadingOverlay } from '@mantine/core'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '~/context/auth-context'

export default function AuthLayout() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <LoadingOverlay visible />

  if (user) return <Navigate to="/" replace />

  return <Outlet />
}
