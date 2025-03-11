import StackBackButton from '@/components/navigation/StackBackButton'
import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'

export default function HomeLayout() {
  const colorScheme = useColorScheme()
  const backgroundColor = useThemeColor({}, 'background')

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: Colors[colorScheme || 'light'].text,
          fontFamily: 'Display',
        },
        headerShadowVisible: false,
        headerLeft: () => <StackBackButton />,
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen
        name='search'
        options={{
          headerTitle: 'Search a plant',
        }}
      />
    </Stack>
  )
}
