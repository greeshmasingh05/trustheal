export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_health_reports: {
        Row: {
          created_at: string
          health_risk_score: number | null
          id: string
          reasoning: string | null
          recommended_doctor_type: string | null
          summary: string | null
          urgency_level: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          health_risk_score?: number | null
          id?: string
          reasoning?: string | null
          recommended_doctor_type?: string | null
          summary?: string | null
          urgency_level?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          health_risk_score?: number | null
          id?: string
          reasoning?: string | null
          recommended_doctor_type?: string | null
          summary?: string | null
          urgency_level?: string | null
          user_id?: string
        }
        Relationships: []
      }
      doctor_access_keys: {
        Row: {
          access_key: string
          created_at: string
          doctor_name: string | null
          expires_at: string
          hospital_name: string | null
          id: string
          is_used: boolean | null
          key_hash: string
          patient_user_id: string
          purpose: string | null
          used_at: string | null
        }
        Insert: {
          access_key: string
          created_at?: string
          doctor_name?: string | null
          expires_at: string
          hospital_name?: string | null
          id?: string
          is_used?: boolean | null
          key_hash: string
          patient_user_id: string
          purpose?: string | null
          used_at?: string | null
        }
        Update: {
          access_key?: string
          created_at?: string
          doctor_name?: string | null
          expires_at?: string
          hospital_name?: string | null
          id?: string
          is_used?: boolean | null
          key_hash?: string
          patient_user_id?: string
          purpose?: string | null
          used_at?: string | null
        }
        Relationships: []
      }
      health_logs: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          severity: number | null
          symptoms: string[]
          user_id: string
          voice_transcript: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          severity?: number | null
          symptoms: string[]
          user_id: string
          voice_transcript?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          severity?: number | null
          symptoms?: string[]
          user_id?: string
          voice_transcript?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          activity_level: string | null
          age: number | null
          alcohol: boolean | null
          allergies: string[] | null
          created_at: string
          decentralized_health_id: string | null
          full_name: string | null
          gender: string | null
          height_cm: number | null
          id: string
          onboarding_completed: boolean | null
          ongoing_medications: string | null
          past_diagnoses: string[] | null
          sleep_hours_avg: number | null
          sleep_quality: string | null
          smoking: boolean | null
          updated_at: string
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          alcohol?: boolean | null
          allergies?: string[] | null
          created_at?: string
          decentralized_health_id?: string | null
          full_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          onboarding_completed?: boolean | null
          ongoing_medications?: string | null
          past_diagnoses?: string[] | null
          sleep_hours_avg?: number | null
          sleep_quality?: string | null
          smoking?: boolean | null
          updated_at?: string
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          alcohol?: boolean | null
          allergies?: string[] | null
          created_at?: string
          decentralized_health_id?: string | null
          full_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          onboarding_completed?: boolean | null
          ongoing_medications?: string | null
          past_diagnoses?: string[] | null
          sleep_hours_avg?: number | null
          sleep_quality?: string | null
          smoking?: boolean | null
          updated_at?: string
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      sleep_entries: {
        Row: {
          created_at: string
          hours_slept: number
          id: string
          logged_date: string
          quality_rating: string
          sleep_score: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          hours_slept: number
          id?: string
          logged_date?: string
          quality_rating: string
          sleep_score?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          hours_slept?: number
          id?: string
          logged_date?: string
          quality_rating?: string
          sleep_score?: number | null
          user_id?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
