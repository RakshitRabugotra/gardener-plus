import { Redirect, SplashScreen, Stack } from 'expo-router'
import { AppState, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
// To handle gestures
import { GestureHandlerRootView } from "react-native-gesture-handler"

// Custom hooks
import { useThemeColor } from '@/hooks/useThemeColor'
import useSession from '@/hooks/useSession'
import { supabase } from '@/lib/supabase'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function AppLayout() {
  const colorScheme = useColorScheme()
  const statusBarColor = useThemeColor({}, 'background')

  // Use the session from the context
  const { session } = useSession()

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/auth' />
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              statusBarBackgroundColor: statusBarColor
            }}
          >
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
          </Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
