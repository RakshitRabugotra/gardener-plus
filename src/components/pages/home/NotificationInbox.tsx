import { ActivityIndicator, View } from 'react-native'
import { ThemedText } from '../../ui/ThemedText'
import { ThemedView } from '../../ui/ThemedView'
import { ThemedButton } from '../../form/ThemedButton'
import { GestureCarousel } from '../../ui/GestureCarousel'
import { useState } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Section } from '@/components/Section'

interface NotificationProps {
  id: string
  text: string
  createdAt?: Date
}

const DUMMY_NOTIFICATION: NotificationProps[] = [
  {
    id: '1',
    text: 'You have not watered your plant: Rose today!',
    createdAt: new Date(),
  },
  { id: '2', text: 'Plow the field!!', createdAt: new Date() },
  {
    id: '3',
    text: 'You have not watered your plant: Mango today!',
    createdAt: new Date(),
  },
  { id: '4', text: 'You have to grow tomato!', createdAt: new Date() },
  {
    id: '5',
    text: 'You have not watered your plant: Aamla today!',
    createdAt: new Date(),
  },
]

const fallbackItem: NotificationProps = {
  id: '0',
  text: 'No new notifications. Hurray!',
  createdAt: new Date(),
}

export const NotificationInbox = () => {
  const tint = useThemeColor({}, 'tint')

  const [data, setData] = useState<NotificationProps[] | null>(
    DUMMY_NOTIFICATION
  )

  return (
    <Section
      title='Notification Alerts'
      moreOptions={{ text: 'See all', onPress: () => {} }}
    >
      {!!data ? (
        data.length === 0 ? (
          <EmptyFallback />
        ) : (
          <GestureCarousel
            data={data}
            renderItem={({ item, index }) => (
              <Notification {...item} key={index} />
            )}
            styles={{
              carouselContainer: { marginTop: 16 },
            }}
          />
        )
      ) : (
        <LoadingFallback color={tint} />
      )}
    </Section>
  )
}

const Notification = ({
  id,
  text,
  createdAt = new Date(),
}: NotificationProps) => {
  const dummyMessage = 'You have not watered your plant: Rose today!'

  return (
    <ThemedView
      isMutedBackground
      style={{
        borderRadius: 8,
        marginRight: 30,
        padding: 16,
        position: 'relative',
      }}
    >
      <ThemedText
        style={{
          textAlign: 'center',
          paddingHorizontal: 32,
          paddingVertical: 18,
        }}
      >
        {text}
      </ThemedText>
      <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center' }}>
        <ThemedButton title='Okay!' />
        <ThemedButton
          title='Ignore'
          styles={{
            base: { backgroundColor: 'white' },
            text: { color: 'red' },
          }}
        />
      </View>
      {/* Close Icon */}
      <ThemedButton
        title='x'
        styles={{
          base: {
            aspectRatio: 1,
            borderRadius: 999,
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'transparent',
            transform: [{ translateY: '-50%' }, { translateX: '50%' }],
          },
          text: { color: 'red', fontSize: 14 },
        }}
      />
    </ThemedView>
  )
}

const EmptyFallback = () => (
  <ThemedView
    isMutedBackground
    style={{
      padding: 16,
      width: '100%',
      borderRadius: 12,
      marginVertical: 16,
      marginBottom: 18,
    }}
  >
    <ThemedText type='defaultSemiBold'>{fallbackItem.text}</ThemedText>
  </ThemedView>
)

const LoadingFallback = ({ color }: { color: string }) => (
  <View style={{ padding: 32 }}>
    <ActivityIndicator size='large' color={color} />
  </View>
)
