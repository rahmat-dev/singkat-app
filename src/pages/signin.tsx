import { useState } from 'react'
import { toast } from 'sonner'
import AuthenticationForm, {
  type FormValues,
} from '~/components/form/authentication-form'
import { useAuth } from '~/context/auth-context'

export default function SignIn() {
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (values: FormValues) => {
    setIsLoading(true)
    try {
      await signIn(values.email, values.password)
      setIsLoading(false)
    } catch (error: any) {
      toast.error(
        error.code === 'auth/invalid-credential'
          ? 'Invalid email or password'
          : error.message,
      )
      setIsLoading(false)
    }
  }

  return <AuthenticationForm onSubmit={handleSignIn} isLoading={isLoading} />
}
