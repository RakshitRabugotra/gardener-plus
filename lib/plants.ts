// Internal Libraries
import { PlantCareConditions, PlantFromID, PlantList } from '@/types/plants'
import { getPlantationConditions as plantationConditions } from './gemini'
import { supabase } from './supabase'
import { Tables } from '@/types/supabase'

// Environment Variables
const BASE_URL = process.env.EXPO_PUBLIC_PERENUAL_BASE_URL
const API_KEY = process.env.EXPO_PUBLIC_PERENUAL_API_KEY

// To search for a particular plant
export const getPlantList = async (plantName: string) => {
  // Send a HTTP request
  const response = await fetch(
    `${BASE_URL}/api/species-list?key=${API_KEY}&page=1&q=${plantName}`,
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
export const getPlantFromID = async (id: number) => {
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
      `${BASE_URL}/api/species/details/${id}?key=${API_KEY}`,
    )
    const data = await resp.json()
    // Check if we've exceeded the API limit
    if (typeof data['X-Response'] !== 'undefined') {
      console.error('API limit exceeded')
      // we have successfully exceeded the API limit, return null
      return null
    }
    // We've successful data fetch, cast the data to plant
    const plant = data as PlantFromID

    // Now, store this result to the database
    const { error } = await supabase.from('plants').insert({
      id: plant.id,
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
      other_name: plant.other_name,
      family: plant.family,
      origin: plant.origin,
      type: plant.type,
      dimension: plant.dimension,
      cycle: plant.cycle,
      attracts: plant.attracts,
      propagation: plant.propagation,
      watering: plant.watering,
      plant_anatomy: plant.plant_anatomy,
      sunlight: plant.sunlight,
      pruning_month: plant.pruning_month,
      pruning_count: JSON.stringify(plant.pruning_count),
      seeds: plant.seeds,
      thorny: plant.thorny,
      invasive: plant.invasive,
      tropical: plant.tropical,
      indoor: plant.indoor,
      care_level: plant.care_level,
      flowers: plant.flowers,
      flower_color: plant.flower_color,
      cones: plant.cones,
      fruits: plant.fruits,
      edible_fruit: plant.edible_fruit,
      fruit_color: plant.fruit_color,
      leaf: plant.leaf,
      leaf_color: plant.leaf_color,
      edible_leaf: plant.edible_leaf,
      cuisine: plant.cuisine,
      medicinal: plant.medicinal,
      poisonous_to_humans: plant.poisonous_to_humans,
      poisonous_to_pets: plant.poisonous_to_pets,
      description: plant.description,
      flowering_season: plant.flowering_season || '',
      harvest_season: plant.harvest_season || '',
      maintenance: plant.maintenance || '',
      watering_period: plant.watering || '',
      dimensions_type: plant.dimensions.type || '',
      dimensions_min_value: plant.dimensions.min_value,
      dimensions_max_value: plant.dimensions.max_value,
      dimensions_unit: plant.dimensions.unit,
      default_image: JSON.stringify(plant.default_image),
    })

    if (error) {
      console.error(
        'Error while logging the plant id data to database: ',
        error,
        { data },
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
  return {
    ...plant,
    dimensions: {
      type: plant.dimensions_type,
      min_value: plant.dimensions_min_value,
      max_value: plant.dimensions_max_value,
      unit: plant.dimensions_unit,
    },
    pruning_count: JSON.parse(plant.pruning_count),
    default_image: JSON.parse(plant.default_image),
  } as PlantFromID
}

export const getPlantationConditions = async (
  id: number | null,
  plantScientificName: string | null,
) => {
  // If the id, or the name is null, skip
  if (!id || !plantScientificName) return null

  // Fetch the data from the supabase for the given id,
  const { data, error } = await supabase
    .from('plant_care')
    .select('*')
    .eq('id', id)
    .single()

  // We were not able to fetch the data
  if (error || !data) {
    const conditions = await plantationConditions(plantScientificName)

    // If the conditions are null, return it
    if (!conditions) return null

    // Else, store the result in supabase
    const { error } = await supabase.from('plant_care').insert({
      ...(conditions as Tables<'plant_care'>),
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
