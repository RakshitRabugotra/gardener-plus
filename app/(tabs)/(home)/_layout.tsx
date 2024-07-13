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
        headerLeft: () => <StackBackButton />,
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  )
}

/*
{({ route }) => ({
          title: route.params.name,
          statusBarColor: '#ebefde',
          statusBarTranslucent: true,
          headerStyle: {
            backgroundColor: '#ebefde',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Display-Italic',
          },
          headerLeft: () => (
            <NavBackButton onPress={() => navigation.goBack()} />
          ),
        })}
*/
