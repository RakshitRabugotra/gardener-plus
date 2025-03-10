import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Href, router } from 'expo-router'

// To handle file system
import * as FileSystem from 'expo-file-system'

// Internal Dependencies
import Camera from '@/components/Camera'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'
import { ThemedScrollView } from '@/components/ui/ThemedScrollView'
import { PreviousScans } from '@/components/pages/scan/PreviousScans'

// Type definitions
import type { CameraCapturedPicture, CameraView } from 'expo-camera'
import type { PlantDescription } from '@/types/plants'

// Icon Dependencies
import { Ionicons } from '@expo/vector-icons'
import { getPlantFromImage } from '@/lib/gemini'

// Custom Hooks
import { useThemeColor } from '@/hooks/useThemeColor'
import { PaddedView } from '@/components/ui/PaddedView'
import { saveScan } from '@/service/storage'

export default function Scan() {
  // The picture taken by the camera
  const [picture, setPicture] = useState<CameraCapturedPicture>()
  const [pictureDesc, setPictureDesc] = useState<PlantDescription | null>(null)

  /**
   * Gets the picture from the camera object
   * @param cam The camera reference from the camera
   */
  const getPicture = (cam: React.RefObject<CameraView>) => {
    // If the camera is not defined, then return
    if (!cam) return
    // Else, take the picture and resolve the promise
    cam.current
      ?.takePictureAsync({
        quality: 0.4,
        exif: false,
        // fastMode: true,
      })
      .then((photo) => {
        setPicture((prev) => {
          // If the previous photo was not defined, then return new photo
          if (!prev || typeof photo === 'undefined') return photo
          // Delete the previous photo
          FileSystem.deleteAsync(prev?.uri, {
            // and don't throw an error if the path doesn't exist
            idempotent: true,
          })
          // Return the new photo after deleting previous
          return photo
        })
      })
  }

  // Get the description of the plant, whenever the photo changes
  useEffect(() => {
    // Only if picture is defined
    if (!picture) return

    setPictureDesc(null)
    // Get the name of the plant from this
    getPlantFromImage({ image: picture }).then((plantDescription) => {
      setPictureDesc(plantDescription)
      // When we get the description, set the previous scans object
      if (!plantDescription) return
      // Save the new photo to the async storage
      saveScan({
        id: picture?.base64!,
        image: picture?.uri!,
        plantCommonName: plantDescription.plantScientificName!,
        isPlant: plantDescription.isPlant!,
        plantScientificName: plantDescription.plantScientificName!,
      })
    })
  }, [picture])

  return (
    <ThemedScrollView overScrollMode='never' style={styles.container}>
      <View style={styles.content}>
        <Camera getPicture={getPicture} />
      </View>
      <PaddedView style={{ paddingBottom: 250 }}>
        <PlantDescriptionPreview picture={picture} description={pictureDesc} />
      </PaddedView>
    </ThemedScrollView>
  )
}

const PlantDescriptionPreview = ({
  picture,
  description,
}: {
  picture?: CameraCapturedPicture
  description: PlantDescription | null
}) => {
  // For color and themes
  const tint = useThemeColor({}, 'tint')

  if (!picture || typeof picture === 'undefined') return <PreviousScans />

  // Else, return the option to search the plant
  return (
    <View style={[styles.previewContainer, { paddingBottom: 215 }]}>
      <ThemedView style={[styles.previewContainer, { backgroundColor: tint }]}>
        <Image
          source={{
            uri: picture.uri,
            width: Dimensions.get('window').width,
          }}
          style={{
            width: '30%',
            aspectRatio: 1,
            borderRadius: 16,
          }}
        />
        {!description ? (
          <LoadingFallback />
        ) : (
          <SearchResult description={description} />
        )}
      </ThemedView>
    </View>
  )
}

const LoadingFallback = () => {
  return (
    <View style={styles.initialView}>
      <ThemedText type='subtitle' style={{ fontFamily: 'SpaceMono' }}>
        Identifying
      </ThemedText>
      <ActivityIndicator size='large' color={'black'} />
    </View>
  )
}

const SearchResult = ({ description }: { description: PlantDescription }) => {
  return (
    <>
      {!description.isPlant ? (
        <View style={styles.initialView}>
          <ThemedText type='subtitle' style={{ fontFamily: 'SpaceMono' }}>
            No plant found!
          </ThemedText>
        </View>
      ) : (
        <View style={[styles.initialView, { justifyContent: 'space-between' }]}>
          <ThemedText style={styles.plantName}>
            {description.plantScientificName}
          </ThemedText>
          <GotoPlant
            href={('/search?name=' + description.plantScientificName) as Href}
          />
        </View>
      )}
    </>
  )
}

const GotoPlant = ({ href }: { href: Href }) => {
  const tint = useThemeColor({}, 'tint')

  return (
    <TouchableOpacity
      onPress={() => router.push(href)}
      style={{
        backgroundColor: 'black',
        borderRadius: 16,
        width: '30%',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Ionicons name='arrow-forward' size={24} color={tint} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('screen').height,
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    gap: 16,
    overflow: 'hidden',
  },
  heading: {
    fontFamily: 'Display',
  },
  imageContainer: {
    width: '40%',
    aspectRatio: 1,
    objectFit: 'cover',
    backgroundColor: 'black',
  },
  initialView: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  plantName: {
    fontFamily: 'Display',
    flexWrap: 'wrap',
    maxWidth: '50%',
    fontSize: 24,
  },
  previewContainer: {
    borderRadius: 24,
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  sectionHeading: {
    width: '100%',
    fontFamily: 'SpaceMono',
    textAlign: 'left',
  },
})
