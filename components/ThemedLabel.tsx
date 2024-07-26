import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { PropsWithChildren } from 'react'
import { useColorScheme } from 'react-native'
import { ThemedText } from './ThemedText'

export function ThemedLabel({
  children,
  mono = false,
}: PropsWithChildren & {
  mono?: boolean
}) {
  const colorScheme = useColorScheme()
  const tintColor = useThemeColor({}, 'tint')

  // Theme for the background
  const background = mono
    ? { light: '#000', dark: Colors.light.background }
    : { light: tintColor, dark: tintColor }

  return (
    <ThemedText
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        fontFamily: 'SpaceMono',
        color: '#000',
        backgroundColor: background[colorScheme || 'light'],
      }}
    >
      {children}
    </ThemedText>
  )
}
