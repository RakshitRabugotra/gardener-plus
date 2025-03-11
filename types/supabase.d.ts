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
      favorite_plants: {
        Row: {
          id: string
          plant_id: number
          user_id: string
        }
        Insert: {
          id?: string
          plant_id: number
          user_id?: string
        }
        Update: {
          id?: string
          plant_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_plants_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_plants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plant_care_conditions: {
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
          id?: number
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
        Relationships: [
          {
            foreignKeyName: "plant_care_conditions_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
        ]
      }
      plants: {
        Row: {
          attracts: string[]
          care_level: string
          common_name: string
          cones: boolean
          cuisine: boolean
          cycle: string
          default_image: Json
          description: string
          dimension: string
          dimensions: Json
          edible_fruit: boolean
          edible_leaf: boolean
          family: string | null
          flower_color: string
          flowering_season: string | null
          flowers: boolean
          fruit_color: string[] | null
          fruits: boolean
          harvest_season: string | null
          id: number
          indoor: boolean
          invasive: boolean
          leaf: boolean
          leaf_color: string[]
          maintenance: string | null
          medicinal: boolean
          origin: string[]
          other_name: string[]
          plant_anatomy: string[]
          poisonous_to_humans: number
          poisonous_to_pets: number
          propagation: string[]
          pruning_count: string[]
          pruning_month: string[]
          scientific_name: string[]
          seeds: number
          sunlight: string[]
          thorny: boolean
          tropical: boolean
          type: string
          watering: string
          watering_period: string | null
        }
        Insert: {
          attracts: string[]
          care_level: string
          common_name: string
          cones: boolean
          cuisine: boolean
          cycle: string
          default_image: Json
          description: string
          dimension: string
          dimensions: Json
          edible_fruit: boolean
          edible_leaf: boolean
          family?: string | null
          flower_color: string
          flowering_season?: string | null
          flowers: boolean
          fruit_color?: string[] | null
          fruits: boolean
          harvest_season?: string | null
          id?: number
          indoor: boolean
          invasive: boolean
          leaf: boolean
          leaf_color: string[]
          maintenance?: string | null
          medicinal: boolean
          origin: string[]
          other_name: string[]
          plant_anatomy: string[]
          poisonous_to_humans: number
          poisonous_to_pets: number
          propagation: string[]
          pruning_count: string[]
          pruning_month: string[]
          scientific_name: string[]
          seeds: number
          sunlight: string[]
          thorny: boolean
          tropical: boolean
          type: string
          watering: string
          watering_period?: string | null
        }
        Update: {
          attracts?: string[]
          care_level?: string
          common_name?: string
          cones?: boolean
          cuisine?: boolean
          cycle?: string
          default_image?: Json
          description?: string
          dimension?: string
          dimensions?: Json
          edible_fruit?: boolean
          edible_leaf?: boolean
          family?: string | null
          flower_color?: string
          flowering_season?: string | null
          flowers?: boolean
          fruit_color?: string[] | null
          fruits?: boolean
          harvest_season?: string | null
          id?: number
          indoor?: boolean
          invasive?: boolean
          leaf?: boolean
          leaf_color?: string[]
          maintenance?: string | null
          medicinal?: boolean
          origin?: string[]
          other_name?: string[]
          plant_anatomy?: string[]
          poisonous_to_humans?: number
          poisonous_to_pets?: number
          propagation?: string[]
          pruning_count?: string[]
          pruning_month?: string[]
          scientific_name?: string[]
          seeds?: number
          sunlight?: string[]
          thorny?: boolean
          tropical?: boolean
          type?: string
          watering?: string
          watering_period?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
        }
        Relationships: []
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
