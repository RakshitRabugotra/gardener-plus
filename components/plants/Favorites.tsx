import { useEffect, useMemo, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Text } from 'react-native'

// Internal Components
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

// Custom Hooks
import useSession from '@/hooks/useSession'
import { useThemeColor } from '@/hooks/useThemeColor'

// Utilities
import {
  getFavoritePlants,
  isPlantFavorite,
  toggleFavorite,
} from '@/lib/plants'

// Type definitions
import { PlantFromID } from '@/types/plants'
import { Tables } from '@/types/supabase-old'

// Constants
import { Colors } from '@/constants/Colors'
import { router, usePathname } from 'expo-router'
import { checkThumbnail } from '@/lib/util'
import { ThemedLabel } from '../ThemedLabel'

const heartColor = '#f04945'

export function AddFavorite({ plant }: { plant: PlantFromID | null }) {
  // Get the current user
  const { session } = useSession()
  // If there's no session, then there's no point
  if (!session) return null

  // For theme purposes
  const backgroundColor = useThemeColor({}, 'background')
  const text = useThemeColor({}, 'text')

  // Check if the plant is already added by the user
  const [isFavorite, setFavorite] = useState<boolean | null>(null)

  useEffect(() => {
    // If the plant is null, return false
    if (!plant) return
    // Else check if the plant is favourite?
    isPlantFavorite(plant.id, session.user.id).then((value) =>
      setFavorite(value)
    )
  }, [plant])

  const handleToggle = () => {
    // If the plant is null, then there's no favourite
    if (!plant) return setFavorite(false)
    // Else, set what's the new favourite
    toggleFavorite(plant.id, session.user.id, !isFavorite).then((value) =>
      setFavorite(value)
    )
  }

  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => handleToggle()}>
      <Text
        style={{
          ...styles.text,
          backgroundColor: text,
        }}
      >
        <Ionicons
          name='heart'
          color={
            isFavorite === null
              ? backgroundColor
              : isFavorite
              ? heartColor
              : backgroundColor
          }
          size={24}
        />
      </Text>
    </TouchableOpacity>
  )
}

/**
 * The component which shows the favourite plants of the user
 */
export const FavoritePlants = () => {
  // Get the current user
  const { session } = useSession()
  // If there's no session, then there's no point
  if (!session) return null

  // Check the pathname, to refresh the favourites
  const pathname = usePathname()

  // Fetch all the favourites of the user
  const [favourites, setFavorites] = useState<Tables<'plants'>[] | null>(null)

  useEffect(() => {
    getFavoritePlants(session.user.id).then((value) => setFavorites(value))
  }, [pathname])

  return (
    <ThemedView>
      <ThemedLabel style={{ marginHorizontal: 16, width: 'auto' }}>
        Your favorites
        <Ionicons name='heart' size={16} />
      </ThemedLabel>
      <View style={{ flexDirection: 'row', marginLeft: 16 }}>
        {favourites && (
          <FlatList
            horizontal
            data={favourites}
            renderItem={({ item }) => <FavoritePlantCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => <ThemedView></ThemedView>}
            // ListFooterComponent={() => <View style={{ paddingBottom: 216 }} />}
            // onRefresh={() => setRefresh((prev) => ++prev)}
            //if set to true, the UI will show a loading indicator
            // refreshing={false}
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 12 }}
          />
        )}
      </View>
    </ThemedView>
  )
}

/**
 * Favorite plant card
 */
export const FavoritePlantCard = ({
  id,
  scientific_name,
  common_name,
  default_image,
  ...props
}: Tables<'plants'>) => {
  const colorScheme = useColorScheme()

  // Now get the fields of the image
  const image = useMemo(() => JSON.parse(default_image), [default_image])
  // Check if the plant has thumbnail
  const hasThumbnail = useMemo(
    () => default_image && checkThumbnail(image.thumbnail),
    [default_image]
  )

  return (
    <ThemedView
      style={[
        styles.card,
        {
          borderColor:
            colorScheme === 'dark' ? Colors.light.tabIconDefault : '#000',
          backgroundColor: colorScheme === 'dark' ? Colors.light.text : '#fff',
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => router.push(`/${id}`)}
        style={styles.plantContainer}
      >
        <Image
          style={styles.plantImage}
          source={
            hasThumbnail
              ? {
                  uri: image.thumbnail,
                }
              : require('@/assets/images/splash-logo.png')
          }
        />

        <ThemedText style={styles.plantHeading}>{common_name}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    flexWrap: 'wrap',
    borderRadius: 12,
    marginHorizontal: 8,
    marginBottom: 16,
    padding: 12,
  },
  wrapper: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  plantContainer: {
    gap: 8,
    padding: 8,
  },
  plantHeading: {
    fontSize: 16,
    fontWeight: 500,
  },
  plantImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'black',
    objectFit: 'cover',
    borderRadius: 12,
  },
  text: {
    padding: 12,
    borderRadius: 999,
    aspectRatio: 1,
  },
})
