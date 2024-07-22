import { GoogleGenerativeAI } from '@google/generative-ai'
// To handle file system
import * as FileSystem from 'expo-file-system'

// Type definitions
import type { GenerativeModel } from '@google/generative-ai'
import type { CameraCapturedPicture } from 'expo-camera'
import { PlantCareConditions, PlantDescription } from '@/types/plants'

// Environment Variables
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY!

// Initiates a Google generative AI model with API_KEY
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
// Get the specified text model for plant descriptions with this
const multiModel: GenerativeModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: { responseMimeType: 'application/json' },
})

/***
 * Identifies the plant from the image
 */
export async function getPlantFromImage({
  image,
}: {
  image?: CameraCapturedPicture
}) {
  // If the image is null, then do nothing
  if (typeof image === 'undefined') return null

  const prompt = `
    Prompt: identify the given plant in the image
    {
    isPlant: false if not a plant, else true
    plantScientificName: null if not a plant, else the scientific name of the plant in the image
    }
  `

  const result = await multiModel.generateContent([
    prompt as string,
    await fileToGenerativePart(image.uri, 'image/png'),
  ])
  const response = result.response
  const text = response.text()
  return JSON.parse(text) as PlantDescription
}

/***
 * Gives the plantation conditions for a plant, based on it's name
 */
export async function getPlantationConditions(
  plantScientificName: string | null
) {
  if (!plantScientificName) return null

  const prompt = `
  What are the required plantation conditions with small descriptions for '${plantScientificName}' using this JSON schema: 
  {
  sunlight_description: string,
  sunlight_hours_min: number,
  sunlight_hours_max: number,
  soil_description: string,
  soil_ph_min: number,
  soil_ph_max: number,
  season: 'spring' | 'summer' | 'monsoon' | 'fall' | 'winter',
  temperature_description: string,
  temperature_min: number,
  temperature_max: number,
  temperature_unit: "°C",
  average_height_description: string,
  average_height_min: number,
  average_height_max: number,
  average_height_unit: "meters" | "centimeters" | "millimeters",
  placement: 'indoor' | 'outdoor' | 'both',
  fertilizer: string,
  }
  `
  const result = await multiModel.generateContent(prompt as string)
  const response = result.response
  const text = response.text()

  return JSON.parse(text) as PlantCareConditions
}

/*
 * Utilities functions
 */

// Converts local file information to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(path: string, mimeType: string) {
  return {
    inlineData: {
      data: await FileSystem.readAsStringAsync(path, {
        encoding: FileSystem.EncodingType.Base64,
      }),
      mimeType,
    },
  }
}
