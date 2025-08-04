import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';

export interface AgentWithConnection {
  id: string;
  ai_name: string;
  company_name: string;
  support_email: string | null;
  agent_type: string;
  personality: string;
  custom_prompt: string | null;
  sectors: string[] | null;
  whatsapp_connected: boolean;
  phone_number?: string;
  has_connection_history: boolean;
  connection_status?: string;
  evolution_instance_id?: string;
}

export const useAgents = () => {
  const { user } = useAuth();
  const [agents, setAgents] = useState<AgentWithConnection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    if (!user) return;
    setLoading(true);
    
            const { data: agentsData, error: agentsError } = await supabase
          .from("ai_configurations")
          .select("id, ai_name, company_name, support_email, agent_type, personality, custom_prompt, sectors")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

    if (agentsError) {
      console.error("Error fetching agents:", agentsError);
      setLoading(false);
      return;
    }

    const agentsWithConnections = await Promise.all(
      (agentsData || []).map(async (agent) => {
        const { data: connectionData } = await supabase
          .from("whatsapp_connections")
          .select("connection_status, phone_number, evolution_instance_id, connected_at, disconnected_at")
          .eq("ai_configuration_id", agent.id)
          .eq("user_id", user.id)
          .maybeSingle();

        const hasConnectionHistory = !!connectionData;
        const isConnected = connectionData?.connection_status === 'connected';

        return {
          ...agent,
          whatsapp_connected: isConnected,
          phone_number: connectionData?.phone_number,
          has_connection_history: hasConnectionHistory,
          connection_status: connectionData?.connection_status,
          evolution_instance_id: connectionData?.evolution_instance_id
        };
      })
    );

    setAgents(agentsWithConnections);
    setLoading(false);
  };

  useEffect(() => {
    fetchAgents();
  }, [user]);

  return {
    agents,
    loading,
    fetchAgents
  };
}; 