import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

// Internal Dependencies
import PlantSearchBar from '@/components/PlantSearchBar'
import { useState } from 'react'
import { PlantOverview } from '@/types/plants'
import { ThemedScrollView } from '@/components/ThemedScrollView'
import { router } from 'expo-router'

export default function HomeScreen() {
  // Get the insets of the safe area in view
  const insets = useSafeAreaInsets()

  return (
    <ThemedView style={[styles.content, { paddingTop: insets.top }]}>
      {/* The heading of the page */}
      <ThemedView style={styles.headingContainer}>
        <ThemedText type='title' style={{ fontFamily: 'SpaceMono' }}>
          Hello,
          <ThemedText type='title' style={{ fontFamily: 'Display' }}>
            Rakshit
          </ThemedText>
        </ThemedText>
        {/* TODO: The notification bell */}
      </ThemedView>
      {/* The search section */}
      <PlantSearchView />
      {/* Go the dynamic route - for dev only */}
      <Button title='goto [plant]' onPress={() => router.push('/1')} />
    </ThemedView>
  )
}

function PlantSearchView() {
  const [plants, setPlants] = useState<PlantOverview[] | null>(null)

  return (
    <ThemedView>
      {/* Search Form */}
      <PlantSearchBar setPlants={setPlants} />
      <ThemedScrollView>
        {plants &&
          plants.map((plant, index) => <PlantCard {...plant} key={index} />)}
      </ThemedScrollView>
    </ThemedView>
  )
}

function PlantCard({
  id,
  common_name,
  scientific_name,
  default_image,
}: PlantOverview) {
  console.log('Image: ', default_image)

  return (
    <TouchableOpacity onPress={() => router.push(`/${id}`)}>
      {default_image &&
        default_image.thumbnail?.endsWith('update_access.jpg') && (
          <Image
            style={{
              width: Dimensions.get('window').width,
              aspectRatio: 1,
            }}
            source={{
              uri: default_image.thumbnail,
            }}
          />
        )}
      <ThemedText type='title'>{common_name}</ThemedText>
      <ThemedText type='subtitle'>{scientific_name}</ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
