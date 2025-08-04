import { useState, useEffect, useCallback } from "react";
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
      // Se não há profile, usar Basic como padrão
      if (!profile) {
        console.log('usePlanLimits - No profile available, using Basic plan');
        setPlanLimits({
          id: 'fallback',
          plan_name: 'Basic',
          max_agents: 1,
          max_whatsapp_connections: 1,
          has_specialized_consulting: false
        });
        setIsLoading(false);
        return;
      }

      const plan = profile.plan || 'Basic';
      console.log('usePlanLimits - Profile:', profile);
      console.log('usePlanLimits - Plan from profile:', plan);
      
      // Normalizar o nome do plano
      let searchPlan = plan;
      if (plan === 'Intermediate' || plan === 'Intermediario') {
        searchPlan = 'Intermediate';
      } else if (plan === 'Premium') {
        searchPlan = 'Premium';
      } else {
        searchPlan = 'Basic';
      }
      
      console.log('usePlanLimits - Searching for plan:', searchPlan);
      
      try {
        const { data, error } = await supabase
          .from('plan_limits')
          .select('*')
          .eq('plan_name', searchPlan)
          .maybeSingle();

        if (error) {
          console.error('Erro ao buscar limites do plano:', error);
          // Fallback para Basic em caso de erro
          const fallbackResult = await supabase
            .from('plan_limits')
            .select('*')
            .eq('plan_name', 'Basic')
            .maybeSingle();
          
          setPlanLimits(fallbackResult.data as PlanLimits);
          return;
        }

        if (!data) {
          console.warn(`Plano ${searchPlan} não encontrado, usando Basic como fallback`);
          // Fallback para Basic se não encontrar o plano
          const fallbackResult = await supabase
            .from('plan_limits')
            .select('*')
            .eq('plan_name', 'Basic')
            .maybeSingle();
          setPlanLimits(fallbackResult.data as PlanLimits);
          return;
        }

        console.log('usePlanLimits - Limites encontrados:', data);
        setPlanLimits(data as PlanLimits);
      } catch (error) {
        console.error('Error fetching plan limits:', error);
        // Em caso de erro, usar valores padrão
        setPlanLimits({
          id: 'fallback',
          plan_name: 'Basic',
          max_agents: 1,
          max_whatsapp_connections: 1,
          has_specialized_consulting: false
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanLimits();
  }, [profile]);

  return {
    planLimits,
    isLoading,
  };
};

// Hook separado para o uso atual
export const useCurrentUsage = () => {
  const { profile } = useAuth();

  const getCurrentUsage = useCallback(async () => {
    if (!profile?.id) {
      console.log('useCurrentUsage - No profile ID found');
      return { agents: 0, connections: 0 };
    }

    console.log('useCurrentUsage - Fetching usage for user:', profile.id);

    try {
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

      const usage = {
        agents: agentsResult.data?.length || 0,
        connections: connectionsResult.data?.length || 0,
      };

      console.log('useCurrentUsage - Usage data:', usage);
      return usage;
    } catch (error) {
      console.error('useCurrentUsage - Error fetching usage:', error);
      return { agents: 0, connections: 0 };
    }
  }, [profile?.id]);

  return {
    getCurrentUsage,
  };
};