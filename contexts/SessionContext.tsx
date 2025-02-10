import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import { supabase } from '@/lib/supabase'
import { AuthError, Session } from '@supabase/supabase-js'
import { AuthCredentials, signInWithEmail, signOut } from '@/actions/auth'

export const AuthContext = createContext<{
  session: Session | null
  error: Error | null,
  signIn: (props: AuthCredentials) => Promise<{
    session: Session | null
    error: AuthError | null
  }>
  signOut: () => void
  isLoading: boolean
}>({
  session: null,
  error: null,
  isLoading: false,
  signIn: async () => ({ session: null, error: null }),
  signOut() {},
})

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState<AuthError | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        session,
        error,
        signIn: async (props) => {
          const {
            data: { session },
            error,
          } = await signInWithEmail(props)
          setSession((_) => session)
          setError((_) => error)
          return { session, error }
        },
        signOut: () => {
          setSession((prev) => null)
          signOut()
        },
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
