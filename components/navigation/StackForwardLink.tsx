import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, useColorScheme, View } from 'react-native'

export interface StackForwardLinkProps {
  title: string
  description: string
}

export function StackForwardLink({
  title,
  description,
}: StackForwardLinkProps) {
  const colorScheme = useColorScheme()

  return (
    <ThemedView
      style={[
        styles.container,
        styles.boxWithShadow,
        colorScheme === 'dark' ? styles.boxShadowDark : styles.boxShadowLight,
      ]}
    >
      <View>
        <ThemedText type='title' style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText type='subtitle' style={styles.description}>
          {description}
        </ThemedText>
      </View>
      <Ionicons
        name='arrow-forward'
        color={colorScheme === 'dark' ? '#fff' : '#000'}
        style={styles.icon}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  boxWithShadow: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    borderRadius: 12,
    elevation: 5,
  },
  boxShadowLight: {
    shadowColor: '#000',
  },
  boxShadowDark: {
    shadowColor: '#ddd',
  },
  container: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  description: {
    opacity: 0.57,
    fontSize: 14,
  },
})
