import { View, type ViewProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
  isMutedBackground?: boolean
}

export function ThemedView({
  style,
  lightColor,
  darkColor,
  isMutedBackground = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  const mutedBackground = useThemeColor({
    light: "",
    dark: "#2d2d2d"
  }, 'background') 

  return (
    <View
      style={[
        {
          backgroundColor: isMutedBackground
            ? mutedBackground
            : backgroundColor,
        },
        style,
      ]}
      {...otherProps}
    />
  )
}
