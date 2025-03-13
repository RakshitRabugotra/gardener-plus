import { PlantScan } from '@/types/plants'
import AsyncStorage from '@react-native-async-storage/async-storage'
// To handle file system
import * as FileSystem from 'expo-file-system'

const scanStorageKey = 'plant-scans'

export const getScans = async (): Promise<PlantScan[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(scanStorageKey)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.error('Error retrieving object:', e)
    return null
  }
}

/**
 * Saves a new plant scan object to the storage.
 *
 * This function retrieves the previous scans from the storage, appends the new scan object to them,
 * and then saves the updated list back to the storage. If there are no previous scans, it initializes
 * the storage with an empty array before appending the new scan.
 *
 * @param {PlantScan} object - The plant scan object to be saved.
 * @returns {Promise<void>} A promise that resolves when the scan has been successfully saved.
 *
 * @throws Will log an error to the console if there is an issue with saving the scan.
 */
export const saveScan = async (object: PlantScan): Promise<void> => {
  // Get the previous scans, and append this object to them
  let previousScans = await getScans()
  // If previous scans isn't defined, set it to empty array
  previousScans = previousScans ?? ([] as PlantScan[])

  try {
    // Convert the object to json and save the scan
    const jsonValue = JSON.stringify([...previousScans, object])
    await AsyncStorage.setItem(scanStorageKey, jsonValue)
  } catch (e) {
    console.error('Error saving object:', e)
  }
}

export const removeScan = async (
  id: string,
  deleteUsingId: boolean = false
) => {
  // Get the previous scans
  const previousScans = await getScans()
  // If not defined, we don't proceed
  if (!previousScans) return
  // Else, filter out the ones without this id
  const newScans = previousScans.filter((scan) => scan.id !== id)
  // Set the new scans object
  try {
    const jsonValue = JSON.stringify(newScans)
    await AsyncStorage.setItem(scanStorageKey, jsonValue)
  } catch (e) {
    console.error('Error deleting object: ', e)
  }
  // Try to delete the item using the id as the source
  if (!deleteUsingId) return
  // Delete the previous photo
  FileSystem.deleteAsync(id, {
    // and don't throw an error if the path doesn't exist
    idempotent: true,
  })
}
