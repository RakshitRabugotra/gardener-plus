import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

// Custom actions
import { signInWithEmail } from '@/actions/auth'

// Internal dependencies
import ThemedTextInput from '@/components/form/ThemedTextInput'
import { ThemedButton } from '@/components/form/ThemedButton'

// Custom animated components
import { TranslateInView } from '@/anim/TranslateInView'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import useSession from '@/hooks/useSession'

export default function LoginForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { signIn } = useSession()

  async function handleSignIn() {
    setLoading(true)
    const { session, error } = await signIn({ email, password })
    // If some error, show the user
    if (error) Alert.alert(error.message)
    setLoading(false)
    // If everything's alright, redirect to base url
    router.replace('/')
  }

  return (
    <TranslateInView style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <ThemedTextInput
          label='Email'
          leftIcon='envelope'
          onChangeText={setEmail}
          value={email}
          placeholder='you@example.com'
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <ThemedTextInput
          label='Password'
          leftIcon='lock'
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder='••••••••'
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <ThemedButton
          title='Sign in'
          disabled={loading}
          onPress={() => handleSignIn()}
        />
      </View>
    </TranslateInView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
