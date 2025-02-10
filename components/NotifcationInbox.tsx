import { ActivityIndicator, View } from 'react-native'
import { ThemedText } from './ui/ThemedText'
import { ThemedView } from './ui/ThemedView'
import { ThemedButton } from './form/ThemedButton'
import GestureCarousel from './ui/GestureCarousel'
import { useMemo, useState } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'

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

const NotificationInbox = () => {
  const tint = useThemeColor({}, 'tint')
  const [data, setData] = useState<NotificationProps[] | null>(
    DUMMY_NOTIFICATION
  )

  const emptyFallback = useMemo(
    () => (
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
    ),
    []
  )

  const loadingFallback = useMemo(
    () => (
      <View style={{ padding: 32 }}>
        <ActivityIndicator size='large' color={tint} />
      </View>
    ),
    []
  )

  return (
    <ThemedView style={{ marginTop: 24 }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <ThemedText type='subtitle'>Notification Alerts</ThemedText>
        <ThemedText type='defaultSemiBold'>See all</ThemedText>
      </View>
      {!!data ? (
        data.length === 0 ? (
          emptyFallback
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
        loadingFallback
      )}
    </ThemedView>
  )
}

const Notification: React.FC<NotificationProps> = ({
  id,
  text,
  createdAt = new Date(),
}) => {
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

export default NotificationInbox
