import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome6'
import { ThemedText } from '@/components/ThemedText'
import { useState } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors'

export default function ThemedTextInput({
  label,
  leftIcon,
  style,
  ...props
}: TextInputProps & { label: string; leftIcon: string }) {
  // For styling
  const colorScheme = useColorScheme()
  const tintColor = useThemeColor({}, 'tint')
  const disabledColor = useThemeColor({}, 'tabIconDefault')
  // Changing the border color on focus
  const [borderColor, setBorderColor] = useState<string>(disabledColor)

  return (
    <View>
      <ThemedText
        style={[
          styles.label,
          {
            color:
              colorScheme === 'dark'
                ? Colors.light.background
                : Colors.dark.background,
          },
        ]}
      >
        {label}
      </ThemedText>
      <View style={styles.inputContainer}>
        <Icon
          name={leftIcon}
          size={24}
          color={
            colorScheme === 'dark'
              ? Colors.light.background
              : Colors.dark.background
          }
        />
        <TextInput
          {...props}
          style={[
            styles.input,
            style,
            {
              color:
                colorScheme === 'dark'
                  ? Colors.light.background
                  : Colors.dark.background,
              borderBottomColor: borderColor,
            },
          ]}
          placeholderTextColor={
            colorScheme === 'dark'
              ? Colors.light.background
              : Colors.dark.background
          }
          onFocus={() => setBorderColor(tintColor)}
          onBlur={() => setBorderColor(disabledColor)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexGrow: 1,
    fontFamily: 'SpaceMono',
    fontSize: 18,
    paddingVertical: 4,
    borderBottomWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
})
