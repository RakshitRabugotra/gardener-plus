import { View, StyleSheet, useColorScheme, Dimensions } from 'react-native'

// Icon
import { Ionicons } from '@expo/vector-icons'

// Type definitions
import { Session } from '@supabase/supabase-js'

// Constants
import { Colors } from '@/constants/Colors'

// Internal Dependencies
import { ThemedView } from '@/components/ui/ThemedView'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedButton } from '@/components/form/ThemedButton'
import {
  StackForwardLink,
  StackForwardLinkProps,
} from '@/components/navigation/StackForwardLink'

// Hooks
import useSession from '@/hooks/useSession'

const ACCOUNT_MENU: StackForwardLinkProps[] = [
  {
    title: 'my acconut',
    description: 'edit your name or change your password',
  },
]

const FEEDBACK_MENU: StackForwardLinkProps[] = [
  {
    title: 'feedback',
    description: 'rate us!',
  },
]

const PREFERNCE_MENU: StackForwardLinkProps[] = [
  {
    title: 'settings',
    description: 'change settings',
  },
]

export default function Profile() {
  const { session, signOut } = useSession()

  // If the user is not logged-in, then there's no matlab
  if (!session) return null

  return (
    <ThemedView style={styles.container}>
      <UserOverview session={session} />
      {/* Other options */}
      <Overview title='support & feedback' menu={FEEDBACK_MENU} />
      <Overview title='preferences' menu={PREFERNCE_MENU} />

      <View style={styles.inputContainer}>
        <ThemedButton title='Sign Out' onPress={() => signOut()} />
      </View>
    </ThemedView>
  )
}

function UserOverview({ session: { user } }: { session: Session }) {
  // Theme requirements
  const colorScheme = useColorScheme()
  const color =
    colorScheme === 'dark' ? Colors.light.background : Colors.dark.background

  return (
    <ThemedView>
      {/* <Avatar
        size={200}
        url={avatarUrl}
        onUpload={(url: string) => {
            setAvatarUrl(url)
            updateProfile({ username, website, avatar_url: url })
        }}
    /> */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name='person-circle' color={color} style={styles.icon} />
        <View>
          <ThemedText style={{ color, fontSize: 24 }}>
            {user.user_metadata.first_name + ' ' + user.user_metadata.last_name}
          </ThemedText>
          <ThemedText style={{ color, fontSize: 12 }}>{user.email}</ThemedText>
        </View>
      </View>
      {/* The account settings */}
      <View style={styles.inputContainer}>
        {ACCOUNT_MENU.map((item, index) => (
          <StackForwardLink {...item} key={index} />
        ))}
      </View>
    </ThemedView>
  )
}

function Overview({
  title,
  menu,
}: {
  title: string
  menu: StackForwardLinkProps[]
}) {
  return (
    <View style={[styles.overviewSection]}>
      <ThemedText type='title' style={styles.sectionTitle}>
        {title}
      </ThemedText>
      <View>
        {menu.map((item, index) => (
          <StackForwardLink {...item} key={index} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('screen').height,
    padding: 12,
  },
  icon: {
    fontSize: 100,
  },
  inputContainer: {
    paddingVertical: 8,
    alignSelf: 'stretch',
  },
  overviewSection: {
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    textTransform: 'capitalize',
    fontSize: 18,
    fontFamily: 'SpaceMono',
  },
})
