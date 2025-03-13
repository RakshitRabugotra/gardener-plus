import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { useEffect, useMemo, useState } from 'react'

// Icon Dependencies
import Ionicons from '@expo/vector-icons/Ionicons'

// Internal Dependencies
import { ThemedView } from './ui/ThemedView'
import { PlantOverview } from '@/types/plants'
import { getPlantList } from '@/lib/plants'

interface SearchBarStyleProps {
  styles?: {
    base?: ViewStyle
    textInput?: TextStyle
    button?: ViewStyle
    icon?: TextStyle
  }
}

export interface SearchBarProps
  extends SearchBarStyleProps,
    Omit<TextInputProps, 'style'> {
  onSearch: (searchValue: string) => void
}

export function SearchBar({ onSearch, styles, ...rest }: SearchBarProps) {
  // The plant to search duh!
  const [searchValue, setSearchValue] = useState<string>('')

  const onSubmit = () => {
    // If the search value is valid, then use the callback
    if (!searchValue || searchValue.length === 0) return
    // Else, use the callback
    return onSearch(searchValue)
  }

  return (
    <ThemedView style={[stylesheet.base, styles?.base]}>
      <TextInput
        {...rest}
        value={searchValue}
        onChangeText={setSearchValue}
        keyboardType='web-search'
        returnKeyLabel='search'
        returnKeyType='search'
        onSubmitEditing={onSubmit}
        style={[stylesheet.input, styles?.textInput]}
      />
      <TouchableOpacity
        style={[stylesheet.button, styles?.button]}
        onPress={onSubmit}
      >
        <Ionicons
          name='search'
          size={24}
          color={'#0d0d0d'}
          style={[stylesheet.icon, styles?.icon]}
        />
      </TouchableOpacity>
    </ThemedView>
  )
}

const stylesheet = StyleSheet.create({
  base: {
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
  icon: {
    margin: 'auto',
  },
})
