import { FlatList, View } from 'react-native'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { CheckBox } from '@rneui/themed'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useState } from 'react'

const MY_TASKS = [
  'Water marcus at 2AM',
  'Use good potting soil',
  'prune your plant regularly',
  'clean up water',
]

const PendingTasks = ({ slice = 4 } : {slice?: number}) => {
  const renderItem = ({ item }: { item: string }) => (
    <Task item={item} key={item} />
  )

  return (
    <ThemedView>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <ThemedText type='subtitle'>My Tasks</ThemedText>
        <ThemedText type='defaultSemiBold'>See all</ThemedText>
      </View>
      {/* We shouldn't use flat list here, just show the top 4 tasks */}
      <View style={{ marginTop: 16 }}>
        {MY_TASKS.slice(0, slice).map(item => renderItem({ item }))}
      </View>
    </ThemedView>
  )
}

const Task: React.FC<{ item: string }> = ({ item }) => {
  const tint = useThemeColor({}, 'tint')

  const [checked, setChecked] = useState(
    Math.floor(Math.random() * 10) % 2 === 0 ? true : false
  )

  return (
    <ThemedView
      isMutedBackground
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        marginVertical: 2,
        marginRight: 30,
        padding: 16,
        position: 'relative',
      }}
      key={item}
    >
      <CheckBox
        checked={checked}
        checkedColor={tint}
        onPress={() => setChecked((prev) => !prev)}
        containerStyle={{ backgroundColor: 'transparent', padding: 0 }}
      />
      <ThemedText
        type='defaultSemiBold'
        style={{ textTransform: 'capitalize' }}
      >
        {item}
      </ThemedText>
    </ThemedView>
  )
}

export default PendingTasks
