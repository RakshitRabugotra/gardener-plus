import { PropsWithChildren } from "react"
import { TouchableOpacity, View } from 'react-native'

// Custom Components
import { ThemedView } from './ui/ThemedView'
import { ThemedText } from './ui/ThemedText'

export interface SectionProps extends PropsWithChildren {
  title: string
  marginTop?: boolean
  moreOptions?: {
    text: string
    onPress: () => void
  }
}

export const Section = ({
  title,
  marginTop = true,
  moreOptions = undefined,
  children,
}: SectionProps) => {
  return (
    <ThemedView style={{ marginTop: marginTop ? 24 : undefined }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <ThemedText type='subtitle'>{title}</ThemedText>
        {moreOptions && (
          <TouchableOpacity hitSlop={30} onPress={moreOptions.onPress}>
            <ThemedText type='defaultSemiBold'>{moreOptions.text}</ThemedText>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </ThemedView>
  )
}