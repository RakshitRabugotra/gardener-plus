// Internal Libraries
import { PlantFromID, PlantList } from '@/types/plants'

// Environment Variables
const BASE_URL = process.env.EXPO_PUBLIC_PERENUAL_BASE_URL
const API_KEY = process.env.EXPO_PUBLIC_PERENUAL_API_KEY

// To search for a particular plant
export const getPlantList = async (plantName: string) => {
  // Send a HTTP request
  const response = await fetch(
    `${BASE_URL}/api/species-list?key=${API_KEY}&page=1&q=${plantName}`
  )
  // Get the response and return it
  const json = await response.json()
  return json as PlantList
}

// To search for a plant with it's id
export const getPlantFromID = async (id: number) => {
  // Fetch the result from the 'plants' table if the result is present, then return it
  // const { data: plant, error } = await supabase
  //   .from('plants')
  //   .select('*')
  //   .eq('id', id)
  //   .single()

  // The the plant is not found
  // if (!plant) {
  console.log(`plant with id ${id} couldn't be found in database`)
  console.log('fetching from the api...')
  // Fetch the plant from the api
  const resp = await fetch(
    `${BASE_URL}/api/species/details/${id}?key=${API_KEY}`
  )
  const data = await resp.json()
  console.log('fetched the items from the api...')
  return data as PlantFromID
  // }

  // If we encounter an error
  // if (error) {
  //   console.error('error while fetching plant', error)
  //   return null
  // }
  // // Else, return the fetched plant, with no errors
  // return plant
}
