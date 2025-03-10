import { useRef } from 'react'
import { Dimensions, View, ViewStyle } from 'react-native'
import { SharedValue, useSharedValue } from 'react-native-reanimated'
import Carousel, {
  CarouselRenderItem,
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel'

const defaultWidth = Dimensions.get('window').width

export interface GestureCarouselProps<T> {
  isPaginated?: boolean
  width?: number
  height?: number
  data: T[]
  renderItem: CarouselRenderItem<T>
  styles?: {
    viewContainer?: ViewStyle
    carouselContainer?: ViewStyle
    carouselContent?: ViewStyle
  }
}

export function GestureCarousel<T>({
  isPaginated = false,
  width = defaultWidth,
  height = defaultWidth / 2,
  data,
  renderItem,
  styles,
}: GestureCarouselProps<T>) {
  const ref = useRef<ICarouselInstance>(null)
  const progress = useSharedValue<number>(0)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    })
  }

  const carousel = (
    <Carousel
      ref={ref}
      width={width}
      height={height}
      data={data}
      onProgressChange={progress}
      renderItem={renderItem}
      containerStyle={[styles?.carouselContainer]}
      style={[styles?.carouselContent]}
    />
  )

  // If we're using pagination, then also return pagination
  return !isPaginated ? (
    carousel
  ) : (
    <View style={[{ flex: 1 }, styles?.viewContainer]}>
      {carousel}
      <Pagination.Basic
        progress={progress}
        data={data as any[]}
        dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  )
}

/**
 * Example Carousel render:
 * renderItem={({ index }) => (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        justifyContent: "center",
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
    </View>
  )}
 */
