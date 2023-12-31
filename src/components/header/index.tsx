import {
  Avatar,
  Container,
  Group,
  Menu,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { IconLock, IconLogout } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

import classes from '~/components/header/header.module.css'
import { useAuth } from '~/context/auth-context'

const renderAvatarInitial = (name?: string) => {
  if (!name) return ''

  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n.charAt(0))
    .join('')
    .toUpperCase()
}

export default function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Text
            component={Link}
            to="/"
            tt="uppercase"
            size="xl"
            fw="bold"
            c="teal"
          >
            Singkat
          </Text>
          <Menu transitionProps={{ exitDuration: 0 }} withinPortal>
            <Menu.Target>
              <UnstyledButton>
                <Group>
                  <Stack gap={0} ta="right">
                    <Text size="xs" fw={500}>
                      {user?.name}
                    </Text>
                    <Text size="xs" c="gray">
                      {user?.email}
                    </Text>
                  </Stack>
                  <Avatar>{renderAvatarInitial(user?.name)}</Avatar>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                component={Link}
                to="/change-password"
                leftSection={<IconLock size={18} />}
              >
                Change Password
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout size={18} />}
                onClick={signOut}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </Container>
    </header>
  )
}
