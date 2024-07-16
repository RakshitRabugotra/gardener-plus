import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

// Internal Dependencies
import PlantSearchBar from '@/components/PlantSearchBar'
import { useMemo, useState } from 'react'
import { PlantOverview } from '@/types/plants'
import { router } from 'expo-router'
import { checkThumbnail } from '@/lib/util'
import useSession from '@/hooks/useSession'
import { Pressable } from 'react-native'
import { signOut } from '@/actions/auth'

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
        {/* TODO: The notification bell */}
        <ThemedView>
          <Pressable onPress={() => signOut()}>
            <ThemedText>Logout</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
      {/* The search section */}
      <PlantSearchView />
      {/* Go the dynamic route - for dev only */}
      {/* <Button title='goto [plant]' onPress={() => router.push('/1')} /> */}
    </ThemedView>
  )
}

function PlantSearchView() {
  const [plants, setPlants] = useState<PlantOverview[] | null>(null)
  const [refresh, setRefresh] = useState<number>(0)

  return (
    <ThemedView style={styles.plantSearchContainer}>
      {/* Search Form */}
      <PlantSearchBar refresh={refresh} setPlants={setPlants} />
      {plants && (
        <FlatList
          data={plants}
          renderItem={({ item }) => <PlantCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => <ThemedText>No result found...</ThemedText>}
          ListFooterComponent={() => <View style={{ paddingBottom: 216 }} />}
          onRefresh={() => setRefresh((prev) => ++prev)}
          //if set to true, the UI will show a loading indicator
          refreshing={false}
          style={{ marginVertical: 12 }}
        />
      )}
    </ThemedView>
  )
}

function PlantCard({
  id,
  common_name,
  scientific_name,
  default_image,
}: PlantOverview) {
  const hasThumbnail = useMemo(
    () => default_image && checkThumbnail(default_image.thumbnail),
    [default_image]
  )

  return (
    <TouchableOpacity
      onPress={() => router.push(`/${id}`)}
      style={styles.plantCard}
    >
      <View style={styles.plantImageContainer}>
        <Image
          style={styles.plantImage}
          source={
            hasThumbnail
              ? {
                  uri: default_image.thumbnail,
                }
              : require('@/assets/images/splash-logo.png')
          }
        />
      </View>
      <View style={styles.plantNameContainer}>
        <ThemedText style={styles.plantName}>{common_name}</ThemedText>
        <ThemedText style={styles.plantScientificName}>
          {scientific_name}
        </ThemedText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingVertical: 32,
    gap: 16,
    overflow: 'hidden',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 8,
  },
  plantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 12,
  },
  plantImage: {
    width: 64,
    height: 64,
    backgroundColor: 'black',
    objectFit: 'cover',
    borderRadius: 12,
  },
  plantImageContainer: {
    width: '20%',
  },
  plantName: {
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: 'bold',
  },
  plantNameContainer: {
    flexGrow: 1,
  },
  plantSearchContainer: {
    paddingHorizontal: 16,
  },
  plantScientificName: {
    fontSize: 16,
    fontFamily: 'Display',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})
