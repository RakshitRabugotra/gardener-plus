// Internal Libraries
import { PlantCareConditions, PlantFromID, PlantList } from '@/types/plants'
import { getPlantationConditions as plantationConditions } from './gemini'
import { supabase } from './supabase'
import { Tables } from '@/types/supabase'

// Environment Variables
const BASE_URL = process.env.EXPO_PUBLIC_PERENUAL_BASE_URL
const API_KEY = process.env.EXPO_PUBLIC_PERENUAL_API_KEY

// Utility to convert object from one interface to another
export const convertPlantFromID2TablePlant = (plantFromId: PlantFromID): Tables<'plants'> => {
  // This is a property fix for the plant
  // @ts-ignore
  const careGuides = plant['care-guides']
  // @ts-ignore
  delete plant['care-guides']

  return {
    ...plantFromId,
    care_guides: careGuides,
    dimensions: {
      ...plantFromId.dimensions,
    },
    default_image: {
      ...plantFromId.default_image,
    },
  }
}

// Utility to convert object from one interface to another
export const convertTablePlant2PlantFromID = (plantFromId: Tables<'plants'>): PlantFromID  => {
  return {
    ...plantFromId,
    dimensions: {
      ...(plantFromId.dimensions as any),
    },
    default_image: {
      ...(plantFromId.default_image as any),
    },
    hardiness_location: {
      ...(plantFromId.hardiness_location as any),
    },
    hardiness: {
      ...(plantFromId.hardiness as any)
    },
    watering_general_benchmark: {
      ...(plantFromId.watering_general_benchmark) as any
    }
  }
}

// To search for a particular plant
export const getPlantList = async (plantName: string) => {
  // Send a HTTP request
  const response = await fetch(
    `${BASE_URL}/api/species-list?key=${API_KEY}&page=1&q=${plantName}`
  )
  // Get the response and return it
  const json = await response.json()

  if (typeof json['X-Response'] !== 'undefined') {
    console.error('API limit exceeded')
    // we have successfully exceeded the API limit, return null
    return null
  }

  return json as PlantList
}

// To search for a plant with it's id
export const getPlantFromID = async (id: number): Promise<PlantFromID | null> => {
  // Fetch the result from the 'plants' table if the result is present, then return it
  const { data: plant, error } = await supabase
    .from('plants')
    .select('*')
    .eq('id', id)
    .single()

  // The the plant is not found
  if (!plant || error) {
    // Fetch the plant from the api
    const resp = await fetch(
      `${BASE_URL}/api/species/details/${id}?key=${API_KEY}`
    )

    if (!resp.ok) {
      // We're being asked to upgrade the API pricing
      return null
    }

    const data = await resp.json()
    // Check if we've exceeded the API limit
    if (typeof data['X-Response'] !== 'undefined') {
      console.error('API limit exceeded')
      // we have successfully exceeded the API limit, return null
      return null
    }
    // We've successful data fetch, cast the data to plant
    const plant = data as PlantFromID

    // This is a property fix for the plant
    // @ts-ignore
    const careGuides = plant['care-guides']
    // @ts-ignore
    delete plant['care-guides']

    // Now, store this result to the database
    const { error } = await supabase.from('plants').insert(
      convertPlantFromID2TablePlant(plant)
    )

    if (error) {
      console.error(
        'Error while logging the plant id data to database: ',
        error,
        { data }
      )
    }
    // Else, we're good to go with the data
    return data as PlantFromID
  }

  // If we encounter an error
  if (error) {
    console.error('error while fetching plant', error, { plant })
    return null
  }

  // Else, return the fetched plant, with no errors
  return convertTablePlant2PlantFromID(plant)
}

export const getPlantationConditions = async (
  id: number | null,
  plantScientificName: string | null
) => {
  // If the id, or the name is null, skip
  if (!id || !plantScientificName) return null

  // Fetch the data from the supabase for the given id,
  const { data, error } = await supabase
    .from('plant_care_conditions')
    .select('*')
    .eq('id', id)
    .single()

  // We were not able to fetch the data
  if (error || !data) {
    const conditions = await plantationConditions(plantScientificName)

    // If the conditions are null, return it
    if (!conditions) return null

    // Else, store the result in supabase
    const { error } = await supabase.from('plant_care_conditions').insert({
      ...conditions,
      id: id,
    })

    if (error) {
      console.error('Error while storing the condition results', error, {
        conditions,
      })
    }

    return conditions
  }

  // Else, return the data from the supabase
  return data as PlantCareConditions
}

/**
 * Is the plant liked by the user?
 */
export const isPlantFavorite = async (plant_id: number, user_id: string) => {
  const { data, error } = await supabase
    .from('favorite_plants')
    .select()
    .eq('plant_id', plant_id)
    .eq('user_id', user_id)

  if (!data || error) return false

  return data.length !== 0
}

/**
 * Get all the favorite plants of the user
 */
export const getFavoritePlants = async (user_id: string): Promise<PlantFromID[] | null> => {
  const { data, error } = await supabase
    .from('favorite_plants')
    .select(`plant_id, plants (*)`)
    .eq('user_id', user_id)

  if (error || !data) {
    console.error('error while fetching favorite plants', { error })
    return null
  }
  // Modify the data to show only the plants
  return data.map((item) => convertTablePlant2PlantFromID(item.plants))
}

/**
 * Toggle the plant to favorite
 */
export const toggleFavorite = async (
  plant_id: number,
  user_id: string,
  state: boolean
) => {
  // Means we have to add to the favorites
  if (state) {
    const { error } = await supabase.from('favorite_plants').upsert({
      plant_id,
      user_id,
    })
    // If there's any error, then show the error
    if (error) console.error('error while adding to favorites', { error })
    // If there was no error, then true, the plant is now a favorite
    // Else, false it couldn't be updated
    return new Boolean(!error).valueOf()
  }

  // Means we have to remove from the favorites
  const { error } = await supabase
    .from('favorite_plants')
    .delete({ count: 'exact' })
    .eq('plant_id', plant_id)
  // If there was an error, then there's still no favorite,
  // Else, update it to favorite
  return new Boolean(error).valueOf()
}
