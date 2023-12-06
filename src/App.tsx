import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { Toaster } from 'sonner'

import { AuthProvider } from '~/context/auth-context'
import { Router } from '~/router'
import { theme } from '~/theme'

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Toaster richColors />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </MantineProvider>
  )
}
