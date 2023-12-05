import {
  Anchor,
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Link } from 'react-router-dom'

export default function AuthenticationForm({
  type = 'signin',
}: {
  type?: 'signin' | 'signup'
}) {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  })

  return (
    <Center mih="100vh">
      <Paper radius="md" p="lg" withBorder w="100%" maw={360}>
        <Text fz={28} fw={600} mb="md">
          {type === 'signin' ? 'Sign In' : 'Sign Up'}
        </Text>

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            {type === 'signup' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={event =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={event =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={event =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
            />

            <Button>{type === 'signin' ? 'Sign In' : 'Sign Up'}</Button>
            <Anchor
              component={Link}
              to={type === 'signin' ? '/signup' : '/signin'}
              size="sm"
              ta="center"
              c="gray"
            >
              {type === 'signup'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
          </Stack>
        </form>
      </Paper>
    </Center>
  )
}
