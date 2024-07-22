import { useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

// To handle file system
import * as FileSystem from 'expo-file-system'

// Internal Dependencies
import Camera from '@/components/Camera'

// Type definitions
import type { CameraCapturedPicture, CameraView } from 'expo-camera'

// Icon Dependencies
import Icon from 'react-native-vector-icons/Ionicons'
import { getPlantFromImage } from '@/lib/gemini'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { PlantDescription } from '@/types/plants'
import ThemedButton from '@/components/form/ThemedButton'

// import SearchBar from '@components/SearchBar'
// import { getPlantFromImage } from '@lib/gemini'

export default function Scan() {
  // Get the safe area insets
  const insets = useSafeAreaInsets()

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
        skipProcessing: true,
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
    setPictureDesc(null)
    // Get the name of the plant from this
    getPlantFromImage({ image: picture }).then((plantDescription) => {
      setPictureDesc(plantDescription)
    })
  }, [picture])

  return (
    <ScrollView>
      <ThemedView style={[styles.content, { paddingTop: insets.top }]}>
        <Camera getPicture={getPicture} />
      </ThemedView>
      <ThemedView style={[styles.previewContainer, styles.pb128]}>
        <ThemedText type='title' style={styles.heading}>
          Preview
        </ThemedText>
        <PlantDescriptionPreview picture={picture} description={pictureDesc} />
      </ThemedView>
    </ScrollView>
  )
}

function PlantDescriptionPreview({
  picture,
  description,
}: {
  picture?: CameraCapturedPicture
  description: PlantDescription | null
}) {
  if (!picture || typeof picture === 'undefined') return

  // Else, return the option to search the plant
  return (
    <ThemedView style={styles.previewContainer}>
      <Image
        source={{
          uri: picture.uri,
          width: Dimensions.get('window').width / 2,
          height:
            (Dimensions.get('window').height *
              (picture.width / picture.height)) /
            2,
        }}
      />
      {!description ? (
        <ThemedView>
          <ThemedText>Loading</ThemedText>
        </ThemedView>
      ) : (
        <>
          {!description.isPlant ? (
            <ThemedText>The image is not a plant... Try again</ThemedText>
          ) : (
            <>
              <ThemedText>{description.plantScientificName}</ThemedText>
              <ThemedButton
                onPress={() =>
                  router.push('?name=' + description.plantScientificName)
                }
                title='Goto plant'
              />
            </>
          )}
        </>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    paddingVertical: 32,
    gap: 16,
    overflow: 'hidden',
  },
  heading: {
    width: '100%',
    fontFamily: 'SpaceMono',
    textAlign: 'left',
  },
  pb128: {
    marginBottom: 128,
  },
  previewContainer: {
    padding: 16,
    gap: 16,
    alignItems: 'center',
  },
})

/* <SearchBar
    className="text-base grow border-0 outline-0 p-4 rounded-3xl bg-white"
    placeholder="Or Search By Name..."
    keyboardType="web-search"
    returnKeyLabel="search"
    returnKeyType="search"
    // onChangeText={setPlantToSearch}
    // onEndEditing={getMatchingPlants}
    onIconPress={() => {}}
    selectTextOnFocus
/> */
