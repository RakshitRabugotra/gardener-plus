import { supabase } from '@/lib/supabase'

export interface AuthCredentials {
  email: string
  password: string
}

export interface SignUpCredentials extends AuthCredentials {
  firstName: string
  lastName: string
  //   dateOfBirth: string TODO: implement these later
  //   gender: string
}

/*
For supabase auth
*/
export async function signInWithEmail({ email, password }: AuthCredentials) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signUpWithEmail({
  email,
  password,
  firstName,
  lastName,
}: SignUpCredentials) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName, email },
      //   emailRedirectTo: `${origin}/auth/callback`, TODO: change this to redirect to app's website
    },
  })
}

export async function signOut() {
  console.log('Signing out...')
  const { error } = await supabase.auth.signOut()
  if (error) console.error("Couldn't sign out")
}
