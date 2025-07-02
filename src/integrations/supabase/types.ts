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
      customers: {
        Row: {
          created_at: string
          id: string
          last_message_sent: string | null
          name: string
          phone_number: string
          segment: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_sent?: string | null
          name: string
          phone_number: string
          segment?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_sent?: string | null
          name?: string
          phone_number?: string
          segment?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      login_logs: {
        Row: {
          created_at: string
          email: string
          error_message: string | null
          id: string
          ip_address: string | null
          login_attempt_at: string
          success: boolean
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          error_message?: string | null
          id?: string
          ip_address?: string | null
          login_attempt_at?: string
          success: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          error_message?: string | null
          id?: string
          ip_address?: string | null
          login_attempt_at?: string
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      message_analytics: {
        Row: {
          created_at: string
          date: string
          delivered_count: number | null
          id: string
          message_id: string | null
          read_count: number | null
          response_count: number | null
          sent_count: number | null
          template_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          delivered_count?: number | null
          id?: string
          message_id?: string | null
          read_count?: number | null
          response_count?: number | null
          sent_count?: number | null
          template_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          delivered_count?: number | null
          id?: string
          message_id?: string | null
          read_count?: number | null
          response_count?: number | null
          sent_count?: number | null
          template_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      message_history: {
        Row: {
          created_at: string
          customer_count: number
          id: string
          message_body: string | null
          message_text: string | null
          message_title: string | null
          sent_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          customer_count?: number
          id?: string
          message_body?: string | null
          message_text?: string | null
          message_title?: string | null
          sent_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          customer_count?: number
          id?: string
          message_body?: string | null
          message_text?: string | null
          message_title?: string | null
          sent_at?: string
          user_id?: string
        }
        Relationships: []
      }
      message_logs: {
        Row: {
          created_at: string
          customer_id: string
          delivered_at: string | null
          delivery_status: string
          error_message: string | null
          id: string
          message_id: string
          phone_number: string
          platform: string | null
          read_at: string | null
          sent_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          delivered_at?: string | null
          delivery_status?: string
          error_message?: string | null
          id?: string
          message_id: string
          phone_number: string
          platform?: string | null
          read_at?: string | null
          sent_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          delivered_at?: string | null
          delivery_status?: string
          error_message?: string | null
          id?: string
          message_id?: string
          phone_number?: string
          platform?: string | null
          read_at?: string | null
          sent_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_logs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_logs_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
          user_id: string
          variables: Json | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
          user_id: string
          variables?: Json | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string
          variables?: Json | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          id: string
          message_text: string
          message_type: string | null
          recipient_count: number | null
          scheduled_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_text: string
          message_type?: string | null
          recipient_count?: number | null
          scheduled_date: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message_text?: string
          message_type?: string | null
          recipient_count?: number | null
          scheduled_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          error_message: string | null
          id: string
          payment_method: string
          phone_number: string | null
          processed_at: string | null
          reference_number: string | null
          status: string
          subscription_id: string | null
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          error_message?: string | null
          id?: string
          payment_method: string
          phone_number?: string | null
          processed_at?: string | null
          reference_number?: string | null
          status?: string
          subscription_id?: string | null
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          error_message?: string | null
          id?: string
          payment_method?: string
          phone_number?: string | null
          processed_at?: string | null
          reference_number?: string | null
          status?: string
          subscription_id?: string | null
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          currency: string | null
          end_date: string | null
          id: string
          plan_type: string
          price_paid: number | null
          start_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string | null
          end_date?: string | null
          id?: string
          plan_type: string
          price_paid?: number | null
          start_date?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string | null
          end_date?: string | null
          id?: string
          plan_type?: string
          price_paid?: number | null
          start_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          date_format: string | null
          email_notifications: boolean | null
          id: string
          language: string
          marketing_emails: boolean | null
          payment_status: string | null
          sms_notifications: boolean | null
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_format?: string | null
          email_notifications?: boolean | null
          id?: string
          language?: string
          marketing_emails?: boolean | null
          payment_status?: string | null
          sms_notifications?: boolean | null
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_format?: string | null
          email_notifications?: boolean | null
          id?: string
          language?: string
          marketing_emails?: boolean | null
          payment_status?: string | null
          sms_notifications?: boolean | null
          timezone?: string | null
          updated_at?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
