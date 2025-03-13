import { PropsWithChildren, useEffect, useRef } from 'react'
import { Animated, Easing, ViewStyle } from 'react-native'

export type TranslateInViewProps = PropsWithChildren<{ style: ViewStyle }>

export const TranslateInView: React.FC<TranslateInViewProps> = (props) => {
  const translateAnim = useRef(new Animated.Value(32)).current // The initial value of the 'y'
  const opacityAnim = useRef(new Animated.Value(0.37)).current // The initial value of opacity

  useEffect(() => {
    const translation = Animated.timing(translateAnim, {
      toValue: 0,
      easing: Easing.ease,
      duration: 400,
      useNativeDriver: true,
    })
    const opacity = Animated.timing(opacityAnim, {
      toValue: 1,
      easing: Easing.ease,
      duration: 400,
      useNativeDriver: true,
    })
    Animated.parallel([translation, opacity]).start()
  }, [translateAnim, opacityAnim])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: opacityAnim,
        transform: [{ translateY: translateAnim }],
      }}
    >
      {props.children}
    </Animated.View>
  )
}
