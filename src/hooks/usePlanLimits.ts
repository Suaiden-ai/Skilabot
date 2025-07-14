import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PlanLimits {
  id: string;
  plan_name: string;
  max_agents: number;
  max_whatsapp_connections: number;
  has_specialized_consulting: boolean;
}

export const usePlanLimits = () => {
  const { profile } = useAuth();
  const [planLimits, setPlanLimits] = useState<PlanLimits | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlanLimits = async () => {
      const plan = profile?.plan || 'Basic';
      console.log('Buscando limites para o plano:', plan);
      
      try {
        // Normalize the plan name to handle accent variations
        let searchPlan = plan;
        if (plan === 'Intermediario') {
          searchPlan = 'Intermediário';
          console.log('Convertendo plano para busca:', searchPlan);
        }
        
        const { data, error } = await supabase
          .from('plan_limits')
          .select('*')
          .eq('plan_name', searchPlan)
          .maybeSingle();

        if (error) {
          console.error('Erro ao buscar limites do plano:', error);
          
          // If not found and original plan was "Intermediario", fallback to Basic
          if (plan === 'Intermediario') {
            console.warn('Plano Intermediario não encontrado, usando limites do Basic como fallback');
            const fallbackResult = await supabase
              .from('plan_limits')
              .select('*')
              .eq('plan_name', 'Basic')
              .maybeSingle();
            
            setPlanLimits(fallbackResult.data as PlanLimits);
            return;
          }
          
          throw error;
        }

        if (!data) {
          console.warn('Plano não encontrado, usando limites do Basic como fallback');
          // Fallback para Basic se não encontrar o plano
          const fallbackResult = await supabase
            .from('plan_limits')
            .select('*')
            .eq('plan_name', 'Basic')
            .maybeSingle();
          
          setPlanLimits(fallbackResult.data as PlanLimits);
          return;
        }

        console.log('Limites encontrados:', data);
        setPlanLimits(data as PlanLimits);
      } catch (error) {
        console.error('Error fetching plan limits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanLimits();
  }, [profile?.plan]);

  return {
    planLimits,
    isLoading,
  };
};

// Hook separado para o uso atual
export const useCurrentUsage = () => {
  const { profile } = useAuth();

  const getCurrentUsage = async () => {
    if (!profile?.id) return { agents: 0, connections: 0 };

    const [agentsResult, connectionsResult] = await Promise.all([
      supabase
        .from('ai_configurations')
        .select('id')
        .eq('user_id', profile.id),
      supabase
        .from('whatsapp_connections')
        .select('id')
        .eq('user_id', profile.id)
    ]);

    return {
      agents: agentsResult.data?.length || 0,
      connections: connectionsResult.data?.length || 0,
    };
  };

  return {
    getCurrentUsage,
  };
};