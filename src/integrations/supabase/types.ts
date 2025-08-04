export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_notifications: {
        Row: {
          body: string | null
          created_at: string
          created_by: string | null
          id: string
          read_by: string[] | null
          target: string | null
          title: string
          type: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          read_by?: string[] | null
          target?: string | null
          title: string
          type?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          read_by?: string[] | null
          target?: string | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_notifications_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_documents: {
        Row: {
          id: string
          agent_id: string
          user_id: string
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          file_content: string | null
          file_transcription: string | null
          knowledge_base_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          user_id: string
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          file_content?: string | null
          file_transcription?: string | null
          knowledge_base_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          user_id?: string
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          file_content?: string | null
          file_transcription?: string | null
          knowledge_base_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_documents_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_configurations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_configurations: {
        Row: {
          agent_type: string | null
          ai_name: string | null
          company_name: string | null
          created_at: string | null
          custom_prompt: string | null
          final_prompt: string | null
          has_tested: boolean | null
          id: string
          personality: string | null
          sectors: string[] | null
          support_email: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_type?: string | null
          ai_name?: string | null
          company_name?: string | null
          created_at?: string | null
          custom_prompt?: string | null
          final_prompt?: string | null
          has_tested?: boolean | null
          id?: string
          personality?: string | null
          sectors?: string[] | null
          support_email?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_type?: string | null
          ai_name?: string | null
          company_name?: string | null
          created_at?: string | null
          custom_prompt?: string | null
          final_prompt?: string | null
          has_tested?: boolean | null
          id?: string
          personality?: string | null
          sectors?: string[] | null
          support_email?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      banned_users: {
        Row: {
          banned_at: string
          banned_by: string
          id: string
          reason: string | null
          user_id: string
        }
        Insert: {
          banned_at?: string
          banned_by: string
          id?: string
          reason?: string | null
          user_id: string
        }
        Update: {
          banned_at?: string
          banned_by?: string
          id?: string
          reason?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "banned_users_banned_by_fkey"
            columns: ["banned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "banned_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_test_data: {
        Row: {
          ai_configuration_id: string
          conversation_id: string
          created_at: string
          id: string
          json_teste: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_configuration_id: string
          conversation_id: string
          created_at?: string
          id?: string
          json_teste: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_configuration_id?: string
          conversation_id?: string
          created_at?: string
          id?: string
          json_teste?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_test_data_ai_configuration_id_fkey"
            columns: ["ai_configuration_id"]
            isOneToOne: false
            referencedRelation: "ai_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      chatwoot_accounts: {
        Row: {
          chatwoot_access_token: string | null
          chatwoot_email: string
          chatwoot_password: string
          chatwoot_user_name: string
          created_at: string
          id: string
          id_chatwoot: string | null
          inbox_id: string | null
          name_lead: string | null
          number: string | null
          phone_lead: string | null
          state: string | null
          updated_at: string
          user_id: string
          user_id_chatwoot: string | null
        }
        Insert: {
          chatwoot_access_token?: string | null
          chatwoot_email: string
          chatwoot_password: string
          chatwoot_user_name: string
          created_at?: string
          id?: string
          id_chatwoot?: string | null
          inbox_id?: string | null
          name_lead?: string | null
          number?: string | null
          phone_lead?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
          user_id_chatwoot?: string | null
        }
        Update: {
          chatwoot_access_token?: string | null
          chatwoot_email?: string
          chatwoot_password?: string
          chatwoot_user_name?: string
          created_at?: string
          id?: string
          id_chatwoot?: string | null
          inbox_id?: string | null
          name_lead?: string | null
          number?: string | null
          phone_lead?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
          user_id_chatwoot?: string | null
        }
        Relationships: []
      }
      chatwoot_inboxes: {
        Row: {
          chatwoot_account_id: string | null
          created_at: string
          id: string
          id_chatwoot: string
          inbox_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          chatwoot_account_id?: string | null
          created_at?: string
          id?: string
          id_chatwoot: string
          inbox_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          chatwoot_account_id?: string | null
          created_at?: string
          id?: string
          id_chatwoot?: string
          inbox_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatwoot_inboxes_chatwoot_account_id_fkey"
            columns: ["chatwoot_account_id"]
            isOneToOne: false
            referencedRelation: "chatwoot_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      chatwoot_leads: {
        Row: {
          account_id: string | null
          chatwoot_inbox_id: string | null
          created_at: string
          data_e_hora: string | null
          id: string
          id_conversa: string | null
          inbox_id: string
          name_lead: string
          nameinbox: string | null
          phone_lead: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id?: string | null
          chatwoot_inbox_id?: string | null
          created_at?: string
          data_e_hora?: string | null
          id?: string
          id_conversa?: string | null
          inbox_id: string
          name_lead: string
          nameinbox?: string | null
          phone_lead: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string | null
          chatwoot_inbox_id?: string | null
          created_at?: string
          data_e_hora?: string | null
          id?: string
          id_conversa?: string | null
          inbox_id?: string
          name_lead?: string
          nameinbox?: string | null
          phone_lead?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatwoot_leads_chatwoot_inbox_id_fkey"
            columns: ["chatwoot_inbox_id"]
            isOneToOne: false
            referencedRelation: "chatwoot_inboxes"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_history: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          payment_method: string | null
          plan_type: string
          status: string
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          payment_method?: string | null
          plan_type: string
          status?: string
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          payment_method?: string | null
          plan_type?: string
          status?: string
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      plan_limits: {
        Row: {
          created_at: string
          has_specialized_consulting: boolean
          id: string
          max_agents: number
          max_whatsapp_connections: number
          plan_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          has_specialized_consulting?: boolean
          id?: string
          max_agents?: number
          max_whatsapp_connections?: number
          plan_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          has_specialized_consulting?: boolean
          id?: string
          max_agents?: number
          max_whatsapp_connections?: number
          plan_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_paid: boolean | null
          last_active_at: string | null
          name: string | null
          plan: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          status: string | null
          stripe_customer_id: string | null
          updated_at: string | null
          accepted_terms_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          is_paid?: boolean | null
          last_active_at?: string | null
          name?: string | null
          plan?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          accepted_terms_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_paid?: boolean | null
          last_active_at?: string | null
          name?: string | null
          plan?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          accepted_terms_at?: string | null
        }
        Relationships: []
      }
      prompt_history: {
        Row: {
          ai_configuration_id: string
          created_at: string
          final_prompt: string
          id: string
          json_robo: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_configuration_id: string
          created_at?: string
          final_prompt: string
          id?: string
          json_robo?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_configuration_id?: string
          created_at?: string
          final_prompt?: string
          id?: string
          json_robo?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_history_ai_configuration_id_fkey"
            columns: ["ai_configuration_id"]
            isOneToOne: false
            referencedRelation: "ai_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          id: string
          plan_type: string
          status: string
          stripe_customer_id: string
          stripe_subscription_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          plan_type: string
          status?: string
          stripe_customer_id: string
          stripe_subscription_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          plan_type?: string
          status?: string
          stripe_customer_id?: string
          stripe_subscription_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      user_activity_logs: {
        Row: {
          activity_type: string
          created_at: string
          description: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          description: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          description?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string
          id: string
          ip_address: unknown | null
          last_activity: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: unknown | null
          last_activity?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: unknown | null
          last_activity?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          created_at: string | null
          events: string[]
          headers: Json | null
          id: string
          status: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          events: string[]
          headers?: Json | null
          id?: string
          status?: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          events?: string[]
          headers?: Json | null
          id?: string
          status?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      whatsapp_connections: {
        Row: {
          ai_configuration_id: string
          connected_at: string | null
          connection_status: string
          created_at: string
          disconnected_at: string | null
          evolution_instance_id: string
          final_prompt: string | null
          id: string
          phone_number: string | null
          qr_code: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_configuration_id: string
          connected_at?: string | null
          connection_status?: string
          created_at?: string
          disconnected_at?: string | null
          evolution_instance_id: string
          final_prompt?: string | null
          id?: string
          phone_number?: string | null
          qr_code?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_configuration_id?: string
          connected_at?: string | null
          connection_status?: string
          created_at?: string
          disconnected_at?: string | null
          evolution_instance_id?: string
          final_prompt?: string | null
          id?: string
          phone_number?: string | null
          qr_code?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_connections_ai_configuration_id_fkey"
            columns: ["ai_configuration_id"]
            isOneToOne: false
            referencedRelation: "ai_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { uri: string }
          | { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { uri: string } | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { uri: string; content: string; content_type: string }
          | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      log_admin_activity: {
        Args: {
          _activity_type: string
          _description: string
          _target_user_id?: string
          _metadata?: Json
        }
        Returns: string
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
    }
    Enums: {
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
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
    Enums: {
      user_role: ["user", "admin"],
    },
  },
} as const
