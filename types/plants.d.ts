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
  other_name: string[] | unknown[]
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
  other_name: string[] | unknown[]
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
  attracts: string | unknown[]
  propagation: string[] | unknown[]
  hardiness: {
    min: string
    max: string
  }
  hardiness_location: {
    full_url: string
    full_iframe: string
  }
  watering: string
  depth_water_requirement: unknown[]
  volume_water_requirement: unknown[]
  watering_period: unknown | null
  watering_general_benchmark: {
    value: string
    unit: 'days' | string
  }
  plant_anatomy: unknown[]
  sunlight: string[]
  pruning_month: string[]
  pruning_count: unknown[]
  seeds: number
  maintenance: unknown | null
  'care-guides': string
  soil: unknown[]
  growth_rate: 'High' | string
  drought_tolerant: boolean
  salt_tolerant: boolean
  thorny: boolean
  invasive: boolean
  tropical: boolean
  indoor: boolean
  care_level: 'Medium' | string
  pest_susceptibility: unknown[]
  pest_susceptibility_api: 'Coming Soon' | string
  flowers: boolean
  flowering_season: unknown | null
  flower_color: string
  cones: boolean
  fruits: boolean
  edible_fruit: boolean
  edible_fruit_taste_profile: 'Coming Soon' | string
  fruit_nutritional_value: 'Coming Soon' | string
  fruit_color: []
  harvest_season: unknown | null
  leaf: boolean
  leaf_color: string[]
  edible_leaf: boolean
  cuisine: boolean
  medicinal: boolean
  poisonous_to_humans: number
  poisonous_to_pets: number
  description: string
  default_image: PlantImage
  other_images: string
}

/**
 * Custom structure to store the plant care in gemini
 */
export interface PlantCare {
  sunlight_description: string
  sunlight_hours_min: number
  sunlight_hours_max: number
  soil_description: string
  soil_ph_min: number
  solid_ph_max: number
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
