import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useEffect, useMemo, useState } from 'react'

// Icon Dependencies
import Ionicons from '@expo/vector-icons/Ionicons'

// Internal Dependencies
import { ThemedView } from './ThemedView'
import { PlantOverview } from '@/types/plants'
import { getPlantList } from '@/lib/plants'

export default function PlantSearchBar({
  setPlants,
  refresh,
}: {
  refresh: number
  setPlants: React.Dispatch<React.SetStateAction<PlantOverview[] | null>>
}) {
  // The plant to search duh!
  const [plantToSearch, setPlantToSearch] = useState<string>('')
  // will fetch the plant once it's done editing
  const getMatchingPlants = async () => {
    getPlantList(plantToSearch).then((value) => setPlants(value.data))
  }
  // If we're asked to refresh, then refresh
  useEffect(() => {
    getMatchingPlants()
  }, [refresh])

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Search'
        keyboardType='web-search'
        returnKeyLabel='search'
        returnKeyType='search'
        onChangeText={setPlantToSearch}
        onEndEditing={getMatchingPlants}
        selectTextOnFocus
      />
      <TouchableOpacity style={styles.button} onPress={getMatchingPlants}>
        <Ionicons
          name='search'
          size={24}
          color={'#0d0d0d'}
          style={{ margin: 'auto' }}
        />
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    borderRadius: 12,
  },
  input: {
    flexGrow: 1,
    fontSize: 16,
    padding: 12,
  },
  button: {
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'flex-end',
    width: 48,
    height: 48,
    borderRadius: 999,
  },
})
