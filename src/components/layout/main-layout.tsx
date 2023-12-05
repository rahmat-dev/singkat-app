import { Container } from '@mantine/core'
import { Outlet } from 'react-router-dom'

import Header from '~/components/header'

export default function MainLayout() {
  return (
    <>
      <Header />
      <Container size="xs" component="main">
        <Outlet />
      </Container>
    </>
  )
}
