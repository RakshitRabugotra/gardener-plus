import { PropsWithChildren, useEffect, useRef } from 'react'
import { Animated, Easing, ViewStyle } from 'react-native'

export type TranslateInViewProps = PropsWithChildren<{ style: ViewStyle }>

export const TranslateInView: React.FC<TranslateInViewProps> = (props) => {
  const translateAnim = useRef(new Animated.Value(32)).current // The initial value of the 'y'

  useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: 0,
      easing: Easing.ease,
      duration: 400,
      useNativeDriver: true,
    }).start()
  }, [translateAnim])

  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{ translateY: translateAnim }],
      }}
    >
      {props.children}
    </Animated.View>
  )
}
