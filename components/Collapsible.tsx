import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'

import { ThemedText } from '@/components/ui/ThemedText'
import { Colors } from '@/constants/Colors'
import { ViewProps } from 'react-native'

export function Collapsible({
  children,
  style,
  title,
}: ViewProps & { title: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useColorScheme() ?? 'light'

  return (
    <View style={style}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedText style={styles.title}>{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontFamily: 'SpaceMono',
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
    paddingBottom: 6,
    borderBottomWidth: 2,
  },
})
