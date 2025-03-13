import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

// Custom hooks and contexts
import { useFonts } from '@/hooks/useFonts'
import { SessionProvider } from '@/contexts/SessionContext'

// Supabase
import { Slot } from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts()

  /* For hiding Splashscreen till fonts load */
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  )
}
