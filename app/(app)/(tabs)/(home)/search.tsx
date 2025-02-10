import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native'

// Components
import { PlantSearchBar } from '@/components/PlantSearchBar'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'

// Utilities
import { getPlantList } from '@/lib/plants'
import { checkThumbnail } from '@/lib/util'

// Type definitions
import { PlantOverview } from '@/types/plants'

export default function Search() {
  // Use the local search params to get the name of the plant if any
  const local = useLocalSearchParams()

  const [plants, setPlants] = useState<PlantOverview[] | null>(null)
  const [refresh, setRefresh] = useState<number>(0)
  // Get the search name whenever the local search params changes
  const searchName = useMemo(
    () =>
      typeof local.name === 'undefined' ? undefined : (local.name as string),
    [local]
  )

  // Get the matching plants with the given name
  const getMatchingPlants = async () => {
    getPlantList(searchName!).then((value) =>
      value ? setPlants(value.data) : null
    )
  }

  useEffect(() => {
    if (!searchName) return
    if (typeof searchName === 'undefined') return
    // Else, search the plant
    getMatchingPlants()
  }, [searchName])

  return (
    <ThemedView style={styles.container}>
      {/* Search Form */}
      <PlantSearchBar
        refresh={refresh}
        setPlants={setPlants}
        defaultSearch={searchName}
      />
      {/* Search results */}
      <PlantList plants={plants} setRefresh={setRefresh} />
    </ThemedView>
  )
}

function PlantList({
  plants,
  setRefresh,
}: {
  plants: PlantOverview[] | null
  setRefresh: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    plants && (
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
    )
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
  container: {
    minHeight: Dimensions.get('screen').height,
    paddingHorizontal: 16,
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
