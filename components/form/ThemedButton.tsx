import { useThemeColor } from '@/hooks/useThemeColor'
import { useMemo } from 'react'
import { StyleSheet, TextProps, TextStyle, ViewStyle } from 'react-native'
import { Pressable, PressableProps, Text } from 'react-native'
import { useColorScheme } from 'react-native'

export interface ThemedButtonProps extends Omit<PressableProps, 'children'> {
  title: string
  textProps?: Omit<TextProps, 'style'>
  styles?: {
    base?: PressableProps['style']
    text?: TextStyle
  }
}

export function ThemedButton({
  title,
  disabled,
  style,
  styles,
  textProps,
  ...rest
}: ThemedButtonProps) {
  const colorScheme = useColorScheme()
  const tintColor = useThemeColor({}, 'tint')
  const textColor = useThemeColor({}, 'text')

  const customStyling = {
    backgroundColor: disabled
      ? colorScheme === 'dark'
        ? '#333'
        : '#ddd'
      : tintColor,
    opacity: disabled ? 0.5 : 1,
  }

  // If styles is defined, then it'll get preference
  const buttonStyles = useMemo(() => {
    if (typeof styles?.base !== 'undefined') {
      return typeof styles?.base !== 'function'
        ? [stylesheet.button, customStyling, styles?.base]
        : styles.base
    } else {
      // Style is undefined so revert to 'style'
      return typeof style !== 'function' ? [stylesheet.button, customStyling, style] : style
    }
  }, [customStyling])

  return (
    <Pressable {...rest} style={buttonStyles}>
      <Text
        {...textProps}
        style={[{ color: textColor }, stylesheet.text, styles?.text]}
      >
        {title}
      </Text>
    </Pressable>
  )
}

const stylesheet = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 500,
  },
})
