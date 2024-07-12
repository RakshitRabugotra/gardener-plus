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
          soil_ph_min: number
          solid_ph_max: number
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
          soil_ph_min: number
          solid_ph_max: number
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
          soil_ph_min?: number
          solid_ph_max?: number
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
          attracts: string | null
          care_level: string | null
          "care-guides": string | null
          common_name: string | null
          cones: boolean | null
          cuisine: boolean | null
          cycle: string | null
          default_image: number | null
          depth_water_requirement: string | null
          description: string | null
          dimension: string | null
          dimensions: Json | null
          drought_tolerant: boolean | null
          edible_fruit: boolean | null
          edible_fruit_taste_profile: string | null
          edible_leaf: boolean | null
          family: string | null
          flower_color: string | null
          flowering_season: string | null
          flowers: boolean | null
          fruit_color: string | null
          fruit_nutritional_value: string | null
          fruits: boolean | null
          growth_rate: string | null
          hardiness: Json | null
          hardiness_location: Json | null
          harvest_season: string | null
          id: number
          indoor: boolean | null
          invasive: boolean | null
          leaf: boolean | null
          leaf_color: string | null
          maintenance: string | null
          medicinal: boolean | null
          origin: string | null
          other_name: string | null
          pest_susceptibility: string | null
          pest_susceptibility_api: string | null
          plant_anatomy: string | null
          poisonous_to_humans: string | null
          poisonous_to_pets: string | null
          propagation: string | null
          pruning_count: string | null
          pruning_month: string | null
          salt_tolerant: boolean | null
          scientific_name: string | null
          seeds: string | null
          soil: string | null
          sunlight: string | null
          thorny: boolean | null
          tropical: boolean | null
          type: string | null
          volume_water_requirement: string | null
          watering: string | null
          watering_general_benchmark: Json | null
          watering_period: string | null
        }
        Insert: {
          attracts?: string | null
          care_level?: string | null
          "care-guides"?: string | null
          common_name?: string | null
          cones?: boolean | null
          cuisine?: boolean | null
          cycle?: string | null
          default_image?: number | null
          depth_water_requirement?: string | null
          description?: string | null
          dimension?: string | null
          dimensions?: Json | null
          drought_tolerant?: boolean | null
          edible_fruit?: boolean | null
          edible_fruit_taste_profile?: string | null
          edible_leaf?: boolean | null
          family?: string | null
          flower_color?: string | null
          flowering_season?: string | null
          flowers?: boolean | null
          fruit_color?: string | null
          fruit_nutritional_value?: string | null
          fruits?: boolean | null
          growth_rate?: string | null
          hardiness?: Json | null
          hardiness_location?: Json | null
          harvest_season?: string | null
          id: number
          indoor?: boolean | null
          invasive?: boolean | null
          leaf?: boolean | null
          leaf_color?: string | null
          maintenance?: string | null
          medicinal?: boolean | null
          origin?: string | null
          other_name?: string | null
          pest_susceptibility?: string | null
          pest_susceptibility_api?: string | null
          plant_anatomy?: string | null
          poisonous_to_humans?: string | null
          poisonous_to_pets?: string | null
          propagation?: string | null
          pruning_count?: string | null
          pruning_month?: string | null
          salt_tolerant?: boolean | null
          scientific_name?: string | null
          seeds?: string | null
          soil?: string | null
          sunlight?: string | null
          thorny?: boolean | null
          tropical?: boolean | null
          type?: string | null
          volume_water_requirement?: string | null
          watering?: string | null
          watering_general_benchmark?: Json | null
          watering_period?: string | null
        }
        Update: {
          attracts?: string | null
          care_level?: string | null
          "care-guides"?: string | null
          common_name?: string | null
          cones?: boolean | null
          cuisine?: boolean | null
          cycle?: string | null
          default_image?: number | null
          depth_water_requirement?: string | null
          description?: string | null
          dimension?: string | null
          dimensions?: Json | null
          drought_tolerant?: boolean | null
          edible_fruit?: boolean | null
          edible_fruit_taste_profile?: string | null
          edible_leaf?: boolean | null
          family?: string | null
          flower_color?: string | null
          flowering_season?: string | null
          flowers?: boolean | null
          fruit_color?: string | null
          fruit_nutritional_value?: string | null
          fruits?: boolean | null
          growth_rate?: string | null
          hardiness?: Json | null
          hardiness_location?: Json | null
          harvest_season?: string | null
          id?: number
          indoor?: boolean | null
          invasive?: boolean | null
          leaf?: boolean | null
          leaf_color?: string | null
          maintenance?: string | null
          medicinal?: boolean | null
          origin?: string | null
          other_name?: string | null
          pest_susceptibility?: string | null
          pest_susceptibility_api?: string | null
          plant_anatomy?: string | null
          poisonous_to_humans?: string | null
          poisonous_to_pets?: string | null
          propagation?: string | null
          pruning_count?: string | null
          pruning_month?: string | null
          salt_tolerant?: boolean | null
          scientific_name?: string | null
          seeds?: string | null
          soil?: string | null
          sunlight?: string | null
          thorny?: boolean | null
          tropical?: boolean | null
          type?: string | null
          volume_water_requirement?: string | null
          watering?: string | null
          watering_general_benchmark?: Json | null
          watering_period?: string | null
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
            foreignKeyName: "user_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
