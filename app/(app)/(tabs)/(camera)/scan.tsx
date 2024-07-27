import { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'

// To handle file system
import * as FileSystem from 'expo-file-system'

// Internal Dependencies
import Camera from '@/components/Camera'

// Type definitions
import type { CameraCapturedPicture, CameraView } from 'expo-camera'

// Icon Dependencies
import { getPlantFromImage } from '@/lib/gemini'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { router } from 'expo-router'
import { PlantDescription } from '@/types/plants'
import { ThemedButton } from '@/components/form/ThemedButton'
import { ThemedScrollView } from '@/components/ThemedScrollView'
import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Ionicons } from '@expo/vector-icons'

// import SearchBar from '@components/SearchBar'
// import { getPlantFromImage } from '@lib/gemini'

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
    <ThemedScrollView overScrollMode='never' style={styles.container}>
      <View style={styles.content}>
        <Camera getPicture={getPicture} />
      </View>
      <PlantDescriptionPreview picture={picture} description={pictureDesc} />
    </ThemedScrollView>
  )
}

function PlantDescriptionPreview({
  picture,
  description,
}: {
  picture?: CameraCapturedPicture
  description: PlantDescription | null
}) {
  // For color and themes
  const tint = useThemeColor({}, 'tint')

  if (!picture || typeof picture === 'undefined') return

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
          <View style={styles.initialView}>
            <ThemedText type='subtitle' style={{ fontFamily: 'SpaceMono' }}>
              Identifying
            </ThemedText>
            <ActivityIndicator size='large' color={'black'} />
          </View>
        ) : (
          <>
            {!description.isPlant ? (
              <View style={styles.initialView}>
                <ThemedText type='subtitle' style={{ fontFamily: 'SpaceMono' }}>
                  No plant found!
                </ThemedText>
              </View>
            ) : (
              <View
                style={[
                  styles.initialView,
                  { justifyContent: 'space-between' },
                ]}
              >
                <ThemedText style={styles.plantName}>
                  {description.plantScientificName}
                </ThemedText>
                <GotoPlant
                  href={'/search?name=' + description.plantScientificName}
                />

                {/* textStyles={styles.plantName} */}
              </View>
            )}
          </>
        )}
      </ThemedView>
    </View>
  )
}

function GotoPlant({ href }: { href: string }) {
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
    fontSize: 24,
  },
  previewContainer: {
    borderRadius: 24,
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    gap: 16,
    alignItems: 'center',
  },
  sectionHeading: {
    width: '100%',
    fontFamily: 'SpaceMono',
    textAlign: 'left',
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
