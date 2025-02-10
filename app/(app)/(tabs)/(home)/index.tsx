import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, useColorScheme } from 'react-native'

import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'

// Utilities
import useSession from '@/hooks/useSession'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { TouchableOpacity } from 'react-native'
import { router, Stack } from 'expo-router'
import { FavoritePlants } from '@/components/plants/Favorites'
import PaddedView from '@/components/ui/PaddedView'
import NotificationInbox from '@/components/NotifcationInbox'
import PendingTasks from '@/components/ui/home/PendingTasks'
import { ThemedScrollView } from '@/components/ui/ThemedScrollView'
import { useThemeColor } from '@/hooks/useThemeColor'

export default function HomeScreen() {
  // Get the insets of the safe area in view
  const insets = useSafeAreaInsets()
  // Get the current logged-in user
  const { session, signOut } = useSession()
  // The theme color
  const backgroundColor = useThemeColor({}, 'background')

  return (
    <ThemedScrollView style={[styles.content, { paddingTop: insets.top }]}>
      {/* The heading of the page */}
      <ThemedView style={styles.headingContainer}>
        <ThemedText type='title' style={{ fontFamily: 'Display' }}>
          <ThemedText type='subtitle'>{'Hi, '}</ThemedText>
          {session?.user.user_metadata.first_name}
        </ThemedText>

        <ThemedView style={{ flexDirection: 'row', gap: 2 }}>
          {/* <Notifications /> */}
          <SearchIcon />
        </ThemedView>
      </ThemedView>
      {/* The search section */}
      {/* Go the dynamic route - for dev only */}
      {/* <Button title='goto [plant]' onPress={() => router.push('/1')} /> */}
      {/* The Favorite plants of the user */}
      <PaddedView>
        <FavoritePlants />
        <NotificationInbox />
        <PendingTasks />
      </PaddedView>

      {/* <FavoritePlants /> */}
    </ThemedScrollView>
  )
}

const SearchIcon = () => {
  const colorScheme = useColorScheme()
  return (
    <TouchableOpacity onPress={() => router.push('/search')}>
      <Ionicons
        name='search-circle'
        color={Colors[colorScheme === 'dark' ? 'light' : 'dark'].background}
        size={48}
      />
    </TouchableOpacity>
  )
}

const Notifications = () => {
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
    position: 'relative',
    flex: 1,
    paddingVertical: 32,
    gap: 16,
    overflow: 'hidden',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
})
