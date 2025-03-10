import { ViewStyle } from "react-native"
import { ThemedView, ThemedViewProps } from "./ThemedView"

export const PaddedView = ({
  children,
  style,
  override = {
    padding: 16,
  },
  ...props
}: ThemedViewProps & {
  override?: {
    padding?: ViewStyle['padding']
    paddingHorizontal?: ViewStyle['paddingHorizontal']
    paddingVertical?: ViewStyle['paddingVertical']
  }
}) => {
  return (
    <ThemedView {...props} style={[style, override]}>
      {children}
    </ThemedView>
  )
}
