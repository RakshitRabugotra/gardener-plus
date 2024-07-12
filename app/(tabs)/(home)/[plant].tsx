import { ThemedView } from '@/components/ThemedView'
import { getPlantFromID } from '@/lib/plants'
import { PlantFromID } from '@/types/plants'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'

export default function PlantInfo() {
  const { plant: id } = useLocalSearchParams()
  const [plant, setPlant] = useState<PlantFromID | null>(null)

  useEffect(() => {
    getPlantFromID(parseInt(id as string)).then((value) => setPlant(value))
  }, [id])

  return (
    <ThemedView>
      <Stack.Screen
        options={{
          title: plant ? plant.common_name : 'The Plant',
        }}
      />
    </ThemedView>
  )
}
