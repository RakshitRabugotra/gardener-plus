import { useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

// Custom Actions
import { signUpWithEmail } from '@/actions/auth'

// Internal Dependencies
import ThemedTextInput from '@/components/form/ThemedTextInput'
import { ThemedButton } from '@/components/form/ThemedButton'
import { TranslateInView } from '@/anim/TranslateInView'
import { router } from 'expo-router'

export default function RegisterForm() {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // For handling the state of the form
  const [loading, setLoading] = useState<boolean>(false)

  // For the validation of the form data
  const [isFormValid, setFormValid] = useState<boolean>(false)

  // Handling the submit of the form
  const signUp = async () => {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await signUpWithEmail({ email, password, firstName, lastName })
    if (error) Alert.alert(error.message)
    console.log("result: ", session)
  console.log("error: ", error);

    if (!session) Alert.alert('Email Verification', `Check inbox for email verification at ${email}`)
    setLoading(false)
    // Redirect the user to the home page
    if (session) {
      Alert.alert('Registration successful! Try logging in!')
      router.replace('/')
    }
  }

  return (
    //Animate this
    <TranslateInView style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <ThemedTextInput
          label='First Name'
          leftIcon='caret-right'
          value={firstName}
          onChangeText={setFirstName}
          placeholder='John'
          autoComplete={'given-name'}
          autoCapitalize='words'
        />
      </View>

      <View style={styles.verticallySpaced}>
        <ThemedTextInput
          label='First Name'
          leftIcon='caret-right'
          value={lastName}
          onChangeText={setLastName}
          placeholder='Doe'
          autoComplete={'family-name'}
          autoCapitalize='words'
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <ThemedTextInput
          label='Email'
          leftIcon='envelope'
          value={email}
          onChangeText={setEmail}
          placeholder='you@example.com'
          autoComplete='email'
          autoCapitalize='none'
        />
      </View>
      <View style={styles.verticallySpaced}>
        <ThemedTextInput
          label='Password'
          leftIcon='lock'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder='••••••••'
          autoComplete='current-password'
          autoCapitalize='none'
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <ThemedButton
          title='Sign up'
          disabled={loading}
          onPress={() => signUp()}
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
