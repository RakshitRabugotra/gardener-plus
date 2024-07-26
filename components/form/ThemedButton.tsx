import { useThemeColor } from '@/hooks/useThemeColor'
import { TextStyle } from 'react-native'
import { Pressable, PressableProps, Text } from 'react-native'
import { useColorScheme } from 'react-native'

export function ThemedButton({
  title,
  disabled,
  textStyles,
  ...rest
}: Omit<PressableProps, 'style' | 'children'> & {
  title: string
  textStyles?: TextStyle
}) {
  const colorScheme = useColorScheme()
  const tintColor = useThemeColor({}, 'tint')
  const textColor = useThemeColor({}, 'text')

  return (
    <Pressable
      style={[
        {
          borderRadius: 6,
          backgroundColor: disabled
            ? colorScheme === 'dark'
              ? '#333'
              : '#ddd'
            : tintColor,
          opacity: disabled ? 0.5 : 1,
          paddingHorizontal: 16,
          paddingVertical: 8,
        },
      ]}
      {...rest}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 18,
          textAlign: 'center',
          fontWeight: 500,
          ...textStyles,
        }}
      >
        {title}
      </Text>
    </Pressable>
  )
}
