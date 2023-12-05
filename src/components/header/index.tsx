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
import { Link, Outlet } from 'react-router-dom'

import classes from '~/components/header/header.module.css'

export default function Header() {
  return (
    <>
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
                        John Doe
                      </Text>
                      <Text size="xs" c="gray">
                        johndoe@gmail.com
                      </Text>
                    </Stack>
                    <Avatar>JD</Avatar>
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconLock size={18} />}>
                  Change Password
                </Menu.Item>
                <Menu.Item leftSection={<IconLogout size={18} />}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </Container>
      </header>

      <Container size="xs" component="main">
        <Outlet />
      </Container>
    </>
  )
}
