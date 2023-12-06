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

export interface FormValues {
  name?: string
  email: string
  password: string
}

export default function AuthenticationForm({
  type = 'signin',
  onSubmit,
  isLoading,
}: {
  type?: 'signin' | 'signup'
  onSubmit: (values: FormValues) => void
  isLoading: boolean
}) {
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validate: {
      name: val => (type === 'signup' && !val ? 'Name is required' : null),
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val => {
        if (!val) return 'Password is required'
        if (val.length < 8 && type === 'signup') {
          return 'Password should include at least 8 characters'
        }
      },
    },
  })

  return (
    <Center mih="100vh">
      <Paper radius="md" p="lg" withBorder w="100%" maw={360}>
        <Text fz={28} fw={600} mb="md">
          {type === 'signin' ? 'Sign In' : 'Sign Up'}
        </Text>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            {type === 'signup' && (
              <TextInput
                withAsterisk
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={event =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                error={form.errors.name}
              />
            )}

            <TextInput
              withAsterisk
              type="email"
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={event =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email}
            />

            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={event =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={form.errors.password}
            />

            <Button type="submit" loading={isLoading}>
              {type === 'signin' ? 'Sign In' : 'Sign Up'}
            </Button>
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
