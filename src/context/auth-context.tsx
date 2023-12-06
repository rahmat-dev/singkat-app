import {
  createUserWithEmailAndPassword,
  signOut as logout,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth } from '~/lib/firebase'
import type { User } from '~/types'

const AuthContext = createContext<{
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => void
  signUp: (name: string, email: string, password: string) => void
  signOut: () => void
}>({
  user: null,
  isLoading: true,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (name: string, email: string, password: string) => {
    const creds = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(creds.user, { displayName: name })
    setUser({
      id: creds.user.uid,
      name: creds.user.displayName!,
      email: creds.user.email!,
    })
  }

  const signOut = async () => {
    await logout(auth)
  }

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, _user => {
      setIsLoading(true)

      if (_user) {
        setUser(() => ({
          id: _user.uid,
          name: _user.displayName!,
          email: _user.email!,
        }))
      } else setUser(null)

      setIsLoading(false)
    })

    return () => {
      unsubcribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
