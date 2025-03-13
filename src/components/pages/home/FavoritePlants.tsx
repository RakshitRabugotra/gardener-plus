import { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons'

// Custom Components
import { Section } from '@/components/Section'
import { ImageCard, ImageCardProps } from '@/components/ui/ImageCard'

// Hooks
import { usePathname } from 'expo-router'
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
import Images from '@/constants/Images'
import { Colors } from '@/constants/Colors'

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

  const handleToggle = useCallback(() => {
    // If the plant is null, then there's no favorite
    if (!plant) return setFavorite(false)
    // Else, set what's the new favorite
    toggleFavorite(plant.id, session.user.id, !isFavorite).then((value) =>
      setFavorite(value)
    )
  }, [plant, toggleFavorite, setFavorite, session, isFavorite])

  useEffect(() => {
    // If the plant is null, return false
    if (!plant) return
    // Else check if the plant is favorite?
    isPlantFavorite(plant.id, session.user.id).then((value) =>
      setFavorite(value)
    )
  }, [plant])

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
              ? Colors.more.heartRed
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

  // State Variables
  const [favorites, setFavorites] = useState<PlantFromID[] | null>(null)
  const [isLoading, setLoading] = useState(false)

  // Fetch all the favorites of the user
  useEffect(() => {
    setLoading(true)
    getFavoritePlants(session.user.id)
      .then((value) => setFavorites(value))
      .catch((err) =>
        console.error('Error while fetching favorites in FavoritePlants: ', err)
      )
      .finally(() => setLoading(false))
  }, [pathname])

  return (
    <Section title='My Garden'>
      <View style={{ marginVertical: 12 }}>
        {isLoading ? (
          <LoadingFallback />
        ) : (
          <FlatList
            horizontal
            data={favorites}
            renderItem={({ item }) => (
              <PlantCard {...item} text={item.common_name} />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<EmptyFallback />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
          />
        )}
      </View>
    </Section>
  )
}

/**
 * Favorite plant card
 */
export const PlantCard = ({
  id,
  href,
  scientific_name,
  common_name,
  default_image,
  ...rest
}: Partial<PlantFromID> & ImageCardProps) => {
  // Now get the fields of the image
  const image = useMemo(() => {
    return default_image?.thumbnail ?? '#'
  }, [default_image])

  return (
    <ImageCard
      fallbackSrc={rest.fallbackSrc}
      imageSrc={image}
      href={id && id >= 0 ? `/${id}` : href}
      styles={cardStyles}
      {...rest}
    />
  )
}

const EmptyFallback = () => (
  <PlantCard
    href='/search'
    text='Search plants to add'
    id={-1}
    fallbackSrc={Images.addIcon}
    styles={cardStyles}
  />
)

const LoadingFallback = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        borderRadius: 12,
      }}
    >
      <PlantCard
        isLoading
        text='Loading...'
        loadingStyles={{
          base: {
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            flexBasis: '25%',
            aspectRatio: 1,
          },
        }}
      />
    </View>
  )
}

const stylesheet = StyleSheet.create({
  wrapper: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },

  text: {
    padding: 12,
    borderRadius: 999,
    aspectRatio: 1,
  },
})

const cardStyles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  image: {
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 12,
  },
  text: {
    maxWidth: '80%',
    textOverflow: 'wrap',
    marginHorizontal: 'auto',
  },
})
