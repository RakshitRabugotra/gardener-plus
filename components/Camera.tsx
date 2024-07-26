import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { useRef, useState } from 'react'
import { Button, StyleSheet, TouchableOpacity } from 'react-native'

// Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Components
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'

export default function Camera({
  getPicture,
}: {
  getPicture: (camera: React.RefObject<CameraView>) => void
}) {
  const camera = useRef<CameraView>(null)
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions()

  if (!permission) {
    // Camera permissions are still loading.
    return <ThemedView />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message}>
          We need your permission to show the camera
        </ThemedText>
        <Button onPress={requestPermission} title='grant permission' />
      </ThemedView>
    )
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }

  return (
    <ThemedView style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camera}>
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <Icon
              name='camera-flip'
              size={32}
              color='white'
              style={styles.flipIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => getPicture(camera)}
          >
            <Icon
              name='camera-iris'
              size={32}
              color='white'
              style={styles.captureIcon}
            />
          </TouchableOpacity>
        </ThemedView>
      </CameraView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 3 / 4,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    minWidth: '100%',
  },
  buttonContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 32,
  },
  captureButton: {
    flex: 1,
    zIndex: -1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  captureIcon: {
    borderRadius: 999,
    backgroundColor: 'black',
    fontSize: 48,
    padding: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  flipButton: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'baseline',
  },
  flipIcon: {
    borderRadius: 999,
    backgroundColor: 'green',
    fontSize: 32,
    padding: 12,
    fontWeight: 'bold',
    color: 'white',
  },
})
