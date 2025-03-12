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

// /**
//  * The Plant overview from the plant list
//  */
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
  attracts: string[]
  care_guides: string | null
  care_level: string | null
  common_name: string
  cones: boolean
  cuisine: boolean
  cycle: string
  default_image: PlantImage
  depth_water_requirement: string[] | null
  description: string
  dimension: string
  dimensions: {
    max_value: number
    min_value: number
    type: any | null
    unit: string
  }
  drought_tolerant: boolean | null
  edible_fruit: boolean
  edible_fruit_taste_profile: string | null
  edible_leaf: boolean
  family: string | null
  flower_color: string
  flowering_season: string | null
  flowers: boolean
  fruit_color: string[] | null
  fruit_nutritional_value: string | null
  fruits: boolean
  growth_rate: string | null
  hardiness: {
    max: string
    min: string
  } | null
  hardiness_location: {
    full_iframe: string
    full_url: string
  } | null
  harvest_season: string | null
  id: number
  indoor: boolean
  invasive: boolean
  leaf: boolean
  leaf_color: string[]
  maintenance: string | null
  medicinal: boolean
  origin: string[]
  other_images: string | null
  other_name: string[]
  pest_susceptibility: string[] | null
  pest_susceptibility_api: string | null
  plant_anatomy: string[]
  poisonous_to_humans: string
  poisonous_to_pets: string
  propagation: string[]
  pruning_count: string[]
  pruning_month: string[]
  salt_tolerant: boolean | null
  scientific_name: string[]
  seeds: string
  soil: string[] | null
  sunlight: string[]
  thorny: boolean
  tropical: boolean
  type: string
  volume_water_requirement: string[] | null
  watering: string
  watering_general_benchmark: { unit: string; value: any | null } | null
  watering_period: string | null
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

/**
 * The scans of plant images
 */
export interface PlantScan extends Partial<PlantDescription> {
  id: string
  image: string
  plantCommonName: string
}