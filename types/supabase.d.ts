export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      plant_care: {
        Row: {
          average_height_description: string
          average_height_max: number
          average_height_min: number
          average_height_unit: string
          fertilizer: string
          id: number
          placement: string
          season: string
          soil_description: string
          soil_ph_max: number
          soil_ph_min: number
          sunlight_description: string
          sunlight_hours_max: number
          sunlight_hours_min: number
          temperature_description: string
          temperature_max: number
          temperature_min: number
          temperature_unit: string
        }
        Insert: {
          average_height_description: string
          average_height_max: number
          average_height_min: number
          average_height_unit: string
          fertilizer: string
          id: number
          placement: string
          season: string
          soil_description: string
          soil_ph_max: number
          soil_ph_min: number
          sunlight_description: string
          sunlight_hours_max: number
          sunlight_hours_min: number
          temperature_description: string
          temperature_max: number
          temperature_min: number
          temperature_unit: string
        }
        Update: {
          average_height_description?: string
          average_height_max?: number
          average_height_min?: number
          average_height_unit?: string
          fertilizer?: string
          id?: number
          placement?: string
          season?: string
          soil_description?: string
          soil_ph_max?: number
          soil_ph_min?: number
          sunlight_description?: string
          sunlight_hours_max?: number
          sunlight_hours_min?: number
          temperature_description?: string
          temperature_max?: number
          temperature_min?: number
          temperature_unit?: string
        }
        Relationships: []
      }
      plant_images: {
        Row: {
          license: number
          license_name: string | null
          license_url: string | null
          medium_url: string | null
          original_url: string | null
          regular_url: string | null
          small_url: string | null
          thumbnail: string | null
        }
        Insert: {
          license: number
          license_name?: string | null
          license_url?: string | null
          medium_url?: string | null
          original_url?: string | null
          regular_url?: string | null
          small_url?: string | null
          thumbnail?: string | null
        }
        Update: {
          license?: number
          license_name?: string | null
          license_url?: string | null
          medium_url?: string | null
          original_url?: string | null
          regular_url?: string | null
          small_url?: string | null
          thumbnail?: string | null
        }
        Relationships: []
      }
      plants: {
        Row: {
          attracts: string[]
          care_level: string | null
          common_name: string
          cones: boolean
          cuisine: boolean
          cycle: string
          default_image: string
          description: string | null
          dimension: string
          dimensions_max_value: number
          dimensions_min_value: number
          dimensions_type: string
          dimensions_unit: string
          edible_fruit: boolean
          edible_leaf: boolean
          family: string | null
          flower_color: string
          flowering_season: string
          flowers: boolean
          fruit_color: string | null
          fruits: boolean
          harvest_season: string
          id: number
          indoor: boolean
          invasive: boolean
          leaf: boolean
          leaf_color: string[]
          maintenance: string
          medicinal: boolean
          origin: string[]
          other_name: string[]
          plant_anatomy: string[]
          poisonous_to_humans: number
          poisonous_to_pets: number
          propagation: string[]
          pruning_count: string
          pruning_month: string[]
          scientific_name: string[]
          seeds: number
          sunlight: string[]
          thorny: boolean
          tropical: boolean
          type: string
          watering: string
          watering_period: string
        }
        Insert: {
          attracts?: string[]
          care_level?: string | null
          common_name?: string
          cones: boolean
          cuisine: boolean
          cycle?: string
          default_image?: string
          description?: string | null
          dimension?: string
          dimensions_max_value?: number
          dimensions_min_value?: number
          dimensions_type?: string
          dimensions_unit?: string
          edible_fruit: boolean
          edible_leaf: boolean
          family?: string | null
          flower_color?: string
          flowering_season?: string
          flowers: boolean
          fruit_color?: string | null
          fruits: boolean
          harvest_season?: string
          id: number
          indoor: boolean
          invasive: boolean
          leaf: boolean
          leaf_color?: string[]
          maintenance?: string
          medicinal: boolean
          origin?: string[]
          other_name?: string[]
          plant_anatomy?: string[]
          poisonous_to_humans?: number
          poisonous_to_pets?: number
          propagation?: string[]
          pruning_count?: string
          pruning_month?: string[]
          scientific_name?: string[]
          seeds?: number
          sunlight?: string[]
          thorny: boolean
          tropical: boolean
          type?: string
          watering?: string
          watering_period?: string
        }
        Update: {
          attracts?: string[]
          care_level?: string | null
          common_name?: string
          cones?: boolean
          cuisine?: boolean
          cycle?: string
          default_image?: string
          description?: string | null
          dimension?: string
          dimensions_max_value?: number
          dimensions_min_value?: number
          dimensions_type?: string
          dimensions_unit?: string
          edible_fruit?: boolean
          edible_leaf?: boolean
          family?: string | null
          flower_color?: string
          flowering_season?: string
          flowers?: boolean
          fruit_color?: string | null
          fruits?: boolean
          harvest_season?: string
          id?: number
          indoor?: boolean
          invasive?: boolean
          leaf?: boolean
          leaf_color?: string[]
          maintenance?: string
          medicinal?: boolean
          origin?: string[]
          other_name?: string[]
          plant_anatomy?: string[]
          poisonous_to_humans?: number
          poisonous_to_pets?: number
          propagation?: string[]
          pruning_count?: string
          pruning_month?: string[]
          scientific_name?: string[]
          seeds?: number
          sunlight?: string[]
          thorny?: boolean
          tropical?: boolean
          type?: string
          watering?: string
          watering_period?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string
          dob: string
          email: string
          first_name: string
          gender: string
          id: string
          last_name: string
          middle_name: string | null
        }
        Insert: {
          created_at?: string
          dob: string
          email: string
          first_name: string
          gender: string
          id: string
          last_name: string
          middle_name?: string | null
        }
        Update: {
          created_at?: string
          dob?: string
          email?: string
          first_name?: string
          gender?: string
          id?: string
          last_name?: string
          middle_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'user_profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
