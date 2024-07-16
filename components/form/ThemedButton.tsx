import { useThemeColor } from '@/hooks/useThemeColor'
import { Pressable, PressableProps, Text } from 'react-native'
import { useColorScheme } from 'react-native'

export default function ThemedButton({
  title,
  disabled,
  ...rest
}: Omit<PressableProps, 'style' | 'children'> & { title: string }) {
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
        }}
      >
        {title}
      </Text>
    </Pressable>
  )
}
