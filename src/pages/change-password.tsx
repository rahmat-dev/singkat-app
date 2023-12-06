import { Button, PasswordInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { updatePassword } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'sonner'
import { auth } from '~/lib/firebase'

interface FormValues {
  password: string
  passwordConfirmation: string
}

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormValues>({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validate: {
      password: value => {
        if (!value) return 'Password is required'
        if (value.length < 8) {
          return 'Password should include at least 8 characters'
        }
      },
      passwordConfirmation: (value, values) => {
        if (value !== values.password)
          return "Password confirmation doesn't match"
      },
    },
  })

  const handleChangePassword = async (values: FormValues) => {
    setIsLoading(true)
    try {
      await updatePassword(auth.currentUser!, values.password)
      form.reset()
      toast.success('Password has been updated')
      setIsLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <Stack mt={80}>
      <form onSubmit={form.onSubmit(handleChangePassword)}>
        <Stack>
          <PasswordInput
            withAsterisk
            label="Password"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            withAsterisk
            label="Password Confirmation"
            {...form.getInputProps('passwordConfirmation')}
          />
          <Button type="submit" loading={isLoading}>
            Update
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
