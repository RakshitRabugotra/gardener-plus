import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

// Icon dependencies
import Icon from 'react-native-vector-icons/Feather'

export default function StackBackButton() {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => router.back()}>
      <Text style={styles.text}>
        <Icon name='arrow-left' size={24} color={'white'} />
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },

  text: {
    padding: 12,
    borderRadius: 999,
    backgroundColor: 'black',
    aspectRatio: 1,
  },
})
