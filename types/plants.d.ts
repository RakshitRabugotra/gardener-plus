/**
 * Interface for the image of the plant
 */
export interface PlantImage {
  image_id: number
  license: number
  license_name: string
  license_url: string
  original_url: string
  regular_url: string
  medium_url: string
  small_url: string
  thumbnail: string
}

/**
 * The Plant overview from the plant list
 */
export interface PlantOverview {
  id: number
  common_name: string
  scientific_name: string[]
  other_name: string[]
  cycle: 'Annual' | 'Biennial' | 'Perennial' | string
  watering: string
  sunlight: []
  default_image: PlantImage
}

/**
 * The interface that is returned when searching for a plant
 */
export interface PlantList {
  data: PlantOverview[]
  to: number
  per_page: number
  current_page: number
  from: number
  last_page: number
  total: number
}

/**
 * The details of the specific plant from id
 */
export interface PlantFromID {
  id: number
  common_name: string
  scientific_name: string[]
  other_name: string[]
  family: string | null
  origin: string[]
  type: string
  dimension: string
  dimensions: {
    type: 'Height' | string
    min_value: number
    max_value: number
    unit: 'feet' | string
  }
  cycle: 'Annual' | 'Biennial' | 'Perennial' | string
  attracts: string[]
  propagation: string[]
  watering: string
  watering_period: string | null
  plant_anatomy: string[]
  sunlight: string[]
  pruning_month: string[]
  pruning_count: string
  seeds: number
  maintenance: string | null
  thorny: boolean
  invasive: boolean
  tropical: boolean
  indoor: boolean
  care_level: 'Medium' | string
  flowers: boolean
  flowering_season: string | null
  flower_color: string
  cones: boolean
  fruits: boolean
  edible_fruit: boolean
  fruit_color: string | null
  harvest_season: string | null
  leaf: boolean
  leaf_color: string[]
  edible_leaf: boolean
  cuisine: boolean
  medicinal: boolean
  poisonous_to_humans: number
  poisonous_to_pets: number
  description: string
  default_image: PlantImage
}

/**
 * Custom structure to store the plant care in gemini
 */
export interface PlantCareConditions {
  sunlight_description: string
  sunlight_hours_min: number
  sunlight_hours_max: number
  soil_description: string
  soil_ph_min: number
  soil_ph_max: number
  season: 'spring' | 'summer' | 'monsoon' | 'fall' | 'winter'
  temperature_description: string
  temperature_min: number
  temperature_max: number
  temperature_unit: string
  average_height_description: string
  average_height_min: number
  average_height_max: number
  average_height_unit: string
  placement: 'indoor' | 'outdoor' | 'both'
  fertilizer: string
}

/**
 * Custom structure to check whether the given image contains a plant
 */
export interface PlantDescription {
  isPlant: boolean
  plantScientificName: string | null
}
