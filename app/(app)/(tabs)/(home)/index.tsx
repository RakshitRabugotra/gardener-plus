import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, useColorScheme } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

// Utilities
import useSession from '@/hooks/useSession'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { useThemeColor } from '@/hooks/useThemeColor'
import { FavouritePlants } from '@/components/plants/Favourites'

export default function HomeScreen() {
  // Get the insets of the safe area in view
  const insets = useSafeAreaInsets()
  // Get the current logged-in user
  const { session, signOut } = useSession()

  return (
    <ThemedView style={[styles.content, { paddingTop: insets.top }]}>
      {/* The heading of the page */}
      <ThemedView style={styles.headingContainer}>
        <ThemedText type='title' style={{ fontFamily: 'SpaceMono' }}>
          Hello,
          <ThemedText type='title' style={{ fontFamily: 'Display' }}>
            {session?.user.user_metadata.first_name}
          </ThemedText>
        </ThemedText>
        <ThemedView style={{ flexDirection: 'row', gap: 2 }}>
          <Notifications />
          <SearchIcon />
        </ThemedView>
      </ThemedView>
      {/* The search section */}
      {/* Go the dynamic route - for dev only */}
      {/* <Button title='goto [plant]' onPress={() => router.push('/1')} /> */}
      {/* The Favourite plants of the user */}
      <FavouritePlants />
    </ThemedView>
  )
}

function SearchIcon() {
  const colorScheme = useColorScheme()
  return (
    <TouchableOpacity onPress={() => router.push('/search')}>
      <Ionicons
        name='search-circle'
        color={
          colorScheme === 'dark'
            ? Colors.light.background
            : Colors.dark.background
        }
        size={48}
      />
    </TouchableOpacity>
  )
}

function Notifications() {
  /* TODO: The notification bell */
  const colorScheme = useColorScheme()
  return (
    <TouchableOpacity>
      <Ionicons
        name='notifications-circle'
        color={
          colorScheme === 'dark'
            ? Colors.light.background
            : Colors.dark.background
        }
        size={48}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 16,
    overflow: 'hidden',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingVertical: 8,
  },
})
