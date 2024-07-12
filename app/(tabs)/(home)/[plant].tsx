import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6'

// Internal dependencies
import { ThemedView } from '@/components/ThemedView'

// Custom utilities
import { getPlantFromID } from '@/lib/plants'

// Type definitions
import { PlantCareConditions, PlantFromID } from '@/types/plants'
import { ThemedText } from '@/components/ThemedText'
import { getPlantationConditions } from '@/lib/gemini'
import { Dimensions, StyleSheet, Text } from 'react-native'
import { View } from 'react-native'

export default function PlantInfo() {
  // The plant id from the query parameter
  const { plant: id } = useLocalSearchParams()

  // The state variables for plant info
  const [plant, setPlant] = useState<PlantFromID | null>(null)
  // and for plantation conditions
  const [plantConditions, setPlantConditions] =
    useState<PlantCareConditions | null>(null)

  useEffect(() => {
    // Get the plants on change of 'id'
    getPlantFromID(parseInt(id as string))
      .then((value) => setPlant(value))
      .catch((reason) => console.log(reason))
  }, [id])

  useEffect(() => {
    // Get the conditions for plant growth from Gemini
    getPlantationConditions(plant ? plant.scientific_name[0] : null).then(
      (value) => setPlantConditions(value)
    )
  }, [plant])

  return (
    <ThemedView>
      <Stack.Screen
        options={{
          title: plant ? plant.common_name : 'The Plant',
        }}
      />
      {/* The four essentials from the care description */}
      <ThemedView style={styles.attributeContainer}>
        <RangedAttributeInfoCard
          name={plantConditions ? 'sunlight' : null}
          min={plantConditions?.sunlight_hours_min}
          max={plantConditions?.sunlight_hours_max}
          units={'hrs'}
        />
        <RangedAttributeInfoCard
          name={plantConditions ? 'temperature' : null}
          min={plantConditions?.temperature_min}
          max={plantConditions?.temperature_max}
          units={plantConditions?.temperature_unit}
        />
        <RangedAttributeInfoCard
          name={plantConditions ? 'soil' : null}
          min={plantConditions?.soil_ph_min}
          max={plantConditions?.soil_ph_max}
          units='pH'
        />
        <RangedAttributeInfoCard
          name={plantConditions ? 'height' : null}
          min={plantConditions?.average_height_min}
          max={plantConditions?.average_height_max}
          units={plantConditions?.average_height_unit}
        />
      </ThemedView>
    </ThemedView>
  )
}

function RangedAttributeInfoCard({
  name,
  units = '',
  min = 0,
  max = 0,
}: {
  name: string | null
  min?: number
  max?: number
  units?: string
}) {
  return (
    <ThemedView style={styles.attributeBody}>
      <ThemedText style={styles.icon}>
        <Icon name='plant-wilt' size={24} color='black' />
      </ThemedText>
      <View style={styles.statContainer}>
        <Text style={styles.stat}>{`${min} to ${max} ${units}`}</Text>
        <Text style={styles.statTitle}>{name ? name : 'loading...'}</Text>
      </View>
    </ThemedView>
  )
}

// The window for the screen
const window = Dimensions.get('window')

const styles = StyleSheet.create({
  attributeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  attributeBody: {
    borderWidth: 2,
    borderRadius: 24,
    backgroundColor: 'white',
    padding: 16,
    margin: '5%',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexBasis: '40%',
  },
  icon: {
    borderRadius: 999,
    backgroundColor: 'green',
    padding: 12,
    width: 48,
    aspectRatio: 1,
    textAlign: 'center',
    marginRight: 'auto',
  },
  statContainer: {
    marginTop: 16,
  },
  stat: {
    fontSize: 18,
  },
  statTitle: {
    textTransform: 'capitalize',
    color: 'gray',
  },
})
