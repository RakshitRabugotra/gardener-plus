import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { PropsWithChildren } from 'react'
import { useColorScheme } from 'react-native'
import { ThemedText } from './ThemedText'
import { TextStyle } from 'react-native'

export function ThemedLabel({
  children,
  mono = false,
  style,
}: PropsWithChildren & {
  mono?: boolean
  style?: TextStyle
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
        ...style,
      }}
    >
      {children}
    </ThemedText>
  )
}
