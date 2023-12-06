import { useState } from 'react'
import { toast } from 'sonner'
import AuthenticationForm, {
  type FormValues,
} from '~/components/form/authentication-form'
import { useAuth } from '~/context/auth-context'

export default function SignUp() {
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (values: FormValues) => {
    setIsLoading(true)
    try {
      await signUp(values.name!, values.email, values.password)
      setIsLoading(false)
    } catch (error: any) {
      toast.error(
        error.code === 'auth/email-already-in-use'
          ? 'Email is already registered'
          : error.message,
      )
      setIsLoading(false)
    }
  }

  return (
    <AuthenticationForm
      type="signup"
      onSubmit={handleSignUp}
      isLoading={isLoading}
    />
  )
}
