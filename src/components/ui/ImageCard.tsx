import { checkThumbnail } from '@/lib/util'
import { useMemo } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native'
import { ThemedView } from './ThemedView'
import { Colors } from '@/constants/Colors'
import { Href, router } from 'expo-router'
import Images from '@/constants/Images'
import { ThemedText } from './ThemedText'

interface ImageCardDataProps {
  text: string
  href?: Href
  imageSrc?: string
  fallbackSrc?: any
}

interface ImageCardStyleProps {
  styles?: {
    base?: ViewStyle
    image?: ImageStyle
    text?: TextStyle
  }
  loadingStyles?: {
    base?: ViewStyle
    indicator?: ViewStyle
  }
}

export interface ImageCardProps
  extends ImageCardDataProps,
    ImageCardStyleProps {
  horizontal?: boolean
  endContent?: React.ReactNode
  isLoading?: boolean
  LoadingFallbackComponent?: typeof LoadingFallback
}

export const ImageCard = ({
  imageSrc,
  styles,
  href = undefined,
  horizontal = false,
  isLoading = false,
  LoadingFallbackComponent = LoadingFallback,
  fallbackSrc = Images.splashLogo,
  loadingStyles,
  ...rest
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
        horizontal && stylesheet?.baseHorizontal,
        styles?.base,
      ]}
    >
      {isLoading ? (
        <LoadingFallbackComponent loadingStyles={loadingStyles} />
      ) : (
        <MainContent
          {...rest}
          href={href}
          horizontal={horizontal}
          styles={styles}
          hasThumbnail={hasThumbnail}
          imageSrc={imageSrc}
          fallbackSrc={fallbackSrc}
        />
      )}
    </ThemedView>
  )
}

const MainContent = ({
  href,
  horizontal,
  styles,
  hasThumbnail,
  imageSrc,
  fallbackSrc,
  text,
  endContent,
}: {
  hasThumbnail: boolean
} & Partial<ImageCardProps>) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => href && router.push(href)}
        style={
          horizontal ? stylesheet.touchableHorizontal : stylesheet.touchable
        }
      >
        <Image
          style={[
            horizontal ? stylesheet.imageHorizontal : stylesheet.image,
            styles?.image,
            !hasThumbnail && { borderRadius: 999 } 
          ]}
          source={
            hasThumbnail
              ? {
                  uri: imageSrc,
                }
              : fallbackSrc
          }
        />
        <View style={{ maxWidth: '100%', flexWrap: 'wrap' }}>
          <ThemedText
            style={[
              horizontal ? stylesheet.textHorizontal : stylesheet.text,
              styles?.text,
            ]}
          >
            {text}
          </ThemedText>
        </View>
      </TouchableOpacity>
      {endContent}
    </>
  )
}

const LoadingFallback = ({ loadingStyles }: {loadingStyles?: ImageCardStyleProps['loadingStyles']}) => {
  return (
    <View style={loadingStyles?.base}>
      <ActivityIndicator size='small' color={Colors.dark.tabIconDefault} style={loadingStyles?.indicator} />
    </View>
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
  // The horizontal variants
  baseHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 1,
  },
  touchableHorizontal: {
    gap: 12,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textHorizontal: {
    fontSize: 18,
    fontFamily: 'Display',
    fontWeight: 500,
    textTransform: 'capitalize',
    textAlign: 'left',
    maxWidth: '50%',
    // width: '100%',
  },
  imageHorizontal: {
    width: 90,
    height: 90,
    aspectRatio: 1,
    objectFit: 'cover',
  },
})
