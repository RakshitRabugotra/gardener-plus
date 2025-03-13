import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  useColorScheme,
} from 'react-native'

// Internal Dependencies for form
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'

// Icon dependencies
import Icon from 'react-native-vector-icons/FontAwesome6'

// Internal Dependencies
import { ThemedText } from '@/components/ui/ThemedText'

// Custom Hooks
import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'

export default function Auth() {
  const [isLogin, setLogin] = useState<boolean>(true)

  // For styling
  const colorScheme = useColorScheme()
  const tintColor = useThemeColor({}, 'tint')
  const backgroundColor = useThemeColor({}, 'background')

  return (
    <View
      style={[
        styles.page,
        {
          backgroundColor,
        },
      ]}
    >
      <View>
        <ThemedText
          type='title'
          style={[
            styles.heading,
            {
              color: colorScheme === 'dark' ? Colors.light.background : '#000',
            },
          ]}
        >
          {isLogin ? 'Welcome back!' : 'Get Started, New User'}
        </ThemedText>
        {/* The form component */}
        {isLogin ? <LoginForm /> : <RegisterForm />}

        {/* The component to change the state of the form */}
        <View style={styles.changeFormContainer}>
          <ThemedText>{isLogin ? 'New here?' : 'Have an account?'}</ThemedText>
          <TouchableOpacity
            style={styles.linkSubText}
            onPress={() => setLogin((prev) => !prev)}
          >
            <Text style={[styles.changeFormLink, { color: tintColor }]}>
              {isLogin ? (
                <>
                  Register instead <Icon name='arrow-up-right-from-square' />
                </>
              ) : (
                <>
                  Sign In instead <Icon name='arrow-up-right-from-square' />
                </>
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  changeFormContainer: {
    marginTop: 64,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  changeFormLink: { fontSize: 16 },
  heading: {
    marginTop: 64,
    fontFamily: 'Display',
    fontSize: 64,
    lineHeight: 64,
  },
  linkSubText: {
    cursor: 'pointer',
    textDecorationLine: 'underline',
  },
  page: {
    minHeight: Dimensions.get('screen').height,
    padding: 16,
  },
})
