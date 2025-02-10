import { useEffect, useMemo, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Text } from 'react-native'

// Internal Components
import { ThemedView } from '@/components/ui/ThemedView'
import { ThemedText } from '@/components/ui/ThemedText'

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

// Constants
import { Colors } from '@/constants/Colors'
import { Href, router, usePathname } from 'expo-router'
import { checkThumbnail } from '@/lib/util'
import { ThemedLabel } from '../ui/ThemedLabel'
import GestureCarousel from '../ui/GestureCarousel'
import Images from '@/constants/Images'

const heartColor = '#f04945'

type DummyPlantType = {
  id: string
  common_name: string
  default_image?: string
}
const DUMMY_PLANTS: DummyPlantType[] = [
  { id: '1', common_name: 'rosa indica', default_image: undefined },
  { id: '2', common_name: 'mangiferra indica', default_image: undefined },
  { id: '3', common_name: 'silver white fur', default_image: undefined },
  { id: '4', common_name: 'rose', default_image: undefined },
]

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
    // Else check if the plant is favorite?
    isPlantFavorite(plant.id, session.user.id).then((value) =>
      setFavorite(value)
    )
  }, [plant])

  const handleToggle = () => {
    // If the plant is null, then there's no favorite
    if (!plant) return setFavorite(false)
    // Else, set what's the new favorite
    toggleFavorite(plant.id, session.user.id, !isFavorite).then((value) =>
      setFavorite(value)
    )
  }

  return (
    <TouchableOpacity style={stylesheet.wrapper} onPress={() => handleToggle()}>
      <Text
        style={{
          ...stylesheet.text,
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
 * The component which shows the favorite plants of the user
 */
export const FavoritePlants = () => {
  // Get the current user
  const { session } = useSession()
  // If there's no session, then there's no point
  if (!session) return null

  // Check the pathname, to refresh the favorites
  const pathname = usePathname()

  // Fetch all the favorites of the user
  const [favorites, setFavorites] = useState<any[] | null>(null)

  useEffect(() => {
    // getFavoritePlants(session.user.id).then((value) => setFavorites(value))
  }, [pathname])

  return (
    <ThemedView style={{ marginTop: 24 }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <ThemedText type='subtitle'>My Garden</ThemedText>
        <ThemedText type='defaultSemiBold'>See all</ThemedText>
      </View>
      <FlatList
        horizontal
        data={favorites}
        renderItem={({ item }) => <PlantCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <PlantCard
            href="/search"
            common_name='Search plants to add'
            id='0'
            fallbackRes={Images.addIcon}
            styles={{
              text: {
                paddingHorizontal: 16,
                fontSize: 14,
                maxWidth: 150,
                textOverflow: 'wrap',
              },
              image: {
                width: 50,
                height: 50,
                margin: 30,
                marginHorizontal: 'auto',
              },
            }}
          />
        )}
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 12 }}
        contentContainerStyle={{ gap: 16 }}
      />
    </ThemedView>
  )
}

const PlantCard: React.FC<{
  id: string
  common_name: string
  default_image?: string
  fallbackRes?: any
  styles?: {
    text?: TextStyle
    image?: ImageStyle
  }
  href?: Href
}> = ({
  id,
  common_name,
  href = undefined,
  default_image = undefined,
  fallbackRes = undefined,
  styles = undefined,
}) => {
  const colorScheme = useColorScheme()

  // Now get the fields of the image
  const image = useMemo(
    () => (default_image ? JSON.parse(default_image) : null),
    [default_image]
  )
  // Check if the plant has thumbnail
  const hasThumbnail = useMemo(
    () => default_image && checkThumbnail(image?.thumbnail),
    [default_image]
  )

  return (
    <ThemedView
      isMutedBackground
      style={[
        stylesheet.card,
        {
          borderColor:
            colorScheme === 'dark' ? Colors.light.tabIconDefault : '#000',
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => router.push(href ?? `/${id}`)}
        style={stylesheet.plantContainer}
      >
        <Image
          style={[stylesheet.plantImage, styles?.image]}
          source={
            hasThumbnail
              ? {
                  uri: image.thumbnail,
                }
              : fallbackRes ?? Images.splashLogo
          }
        />
        <ThemedText style={[stylesheet.plantHeading, styles?.text]}>
          {common_name}
        </ThemedText>
      </TouchableOpacity>
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
}: any) => {
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
        stylesheet.card,
        {
          borderColor:
            colorScheme === 'dark' ? Colors.light.tabIconDefault : '#000',
          backgroundColor: colorScheme === 'dark' ? Colors.light.text : '#fff',
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => router.push(`/${id}`)}
        style={stylesheet.plantContainer}
      >
        <Image
          style={stylesheet.plantImage}
          source={
            hasThumbnail
              ? {
                  uri: image.thumbnail,
                }
              : Images.splashLogo
          }
        />

        <ThemedText style={stylesheet.plantHeading}>{common_name}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  )
}

const stylesheet = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  wrapper: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  plantContainer: {
    width: '100%',
    gap: 8,
    padding: 8,
  },
  plantHeading: {
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  plantImage: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.2,
    // backgroundColor: 'black',
    objectFit: 'cover',
    // borderRadius: 12,
  },
  text: {
    padding: 12,
    borderRadius: 999,
    aspectRatio: 1,
  },
})
