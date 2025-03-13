import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native'

// Components
import { SearchBar } from '@/components/SearchBar'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'

// Utilities
import { getPlantList } from '@/lib/plants'
import { checkThumbnail } from '@/lib/util'

// Type definitions
import { PlantOverview } from '@/types/plants'
import { Colors } from '@/constants/Colors'

export default function Search() {
  // Use the local search params to get the name of the plant if any
  const local = useLocalSearchParams()

  // State variables
  const [plants, setPlants] = useState<PlantOverview[] | null>(null)
  const [isLoading, setLoading] = useState(false)

  // Get the search name whenever the local search params changes
  const searchName = useMemo(
    () => (typeof local?.name === 'undefined' ? null : (local.name as string)),
    [local]
  )

  // To fetch the given-value
  const getMatchingPlants = useCallback(
    (searchValue: string) => {
      if (!searchValue || searchValue.length === 0) return
      // Set the loading indicator
      setLoading(true)
      // Fetch the list after validation
      getPlantList(searchValue)
        .then((value) => (value ? setPlants(value.data) : null))
        .catch((err) => console.error('Error while fetching plant-list: ', err))
        // Remove the loading state
        .finally(() => setLoading(false))
    },
    [setPlants, getPlantList, setLoading]
  )

  useEffect(() => {
    if (!searchName) return
    getMatchingPlants(searchName)
  }, [searchName])

  return (
    <ThemedView style={styles.container}>
      {/* Search Form */}
      <SearchBar
        placeholder='Rosa Indica...'
        selectTextOnFocus
        onSearch={getMatchingPlants}
      />
      {/* Search results */}
      {isLoading ? (
        <LoadingFallback />
      ) : (
        plants !== null && <PlantList plants={plants} />
      )}
    </ThemedView>
  )
}

const LoadingFallback = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color={Colors.dark.tabIconSelected} />
    </View>
  )
}

const PlantList = ({ plants }: { plants: PlantOverview[] | null }) => {
  return (
    plants && (
      <FlatList
        data={plants}
        renderItem={({ item }) => <PlantCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <ThemedText>No result found...</ThemedText>}
        ListFooterComponent={() => <View style={{ paddingBottom: 250 }} />}
        refreshing={false}
        style={{ marginVertical: 12 }}
      />
    )
  )
}

const PlantCard = ({
  id,
  common_name,
  scientific_name,
  default_image,
}: PlantOverview) => {
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
  container: {
    minHeight: Dimensions.get('screen').height,
    paddingHorizontal: 16,
  },
  loading: {
    marginTop: 24,
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
  plantScientificName: {
    fontSize: 16,
    fontFamily: 'Display',
  },
})
