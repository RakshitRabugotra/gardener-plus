import { checkThumbnail } from '@/lib/util'
import { useMemo } from 'react'
import {
  Dimensions,
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from 'react-native'
import { ThemedView } from './ThemedView'
import { Colors } from '@/constants/Colors'
import { Href, router } from 'expo-router'
import Images from '@/constants/Images'
import { ThemedText } from './ThemedText'

export interface ImageCardProps {
  text: string
  href?: Href
  imageSrc?: string
  fallbackSrc?: any
  styles?: {
    base?: ViewStyle
    image?: ImageStyle
    text?: TextStyle
  }
}

export const ImageCard = ({
  text,
  imageSrc,
  styles,
  href = undefined,
  fallbackSrc = Images.splashLogo,
}: ImageCardProps) => {
  // Get the colorscheme
  const colorScheme = useColorScheme()

  // Check if the plant has thumbnail
  const hasThumbnail = useMemo(
    () => (imageSrc ? checkThumbnail(imageSrc) : false),
    [imageSrc]
  )

  return (
    <ThemedView
      isMutedBackground
      style={[
        stylesheet.base,
        {
          borderColor:
            colorScheme === 'dark' ? Colors.light.tabIconDefault : '#000',
        },
        styles?.base,
      ]}
    >
      <TouchableOpacity
        onPress={() => href && router.push(href)}
        style={stylesheet.touchable}
      >
        <Image
          style={[stylesheet.image, styles?.image]}
          source={
            hasThumbnail
              ? {
                  uri: imageSrc,
                }
              : fallbackSrc
          }
        />
        <ThemedText style={[stylesheet.text, styles?.text]}>{text}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  )
}

const stylesheet = StyleSheet.create({
  base: {
    borderRadius: 12,
  },
  touchable: {
    width: '100%',
    gap: 8,
    padding: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.2,
    objectFit: 'cover',
  },
})
