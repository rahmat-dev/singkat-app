import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { Toaster } from 'sonner'

import { ModalsProvider } from '@mantine/modals'
import { AuthProvider } from '~/context/auth-context'
import { Router } from '~/router'
import { theme } from '~/theme'

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Toaster richColors />
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}
