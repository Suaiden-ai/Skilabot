
import { usePlanLimits, useCurrentUsage } from "./usePlanLimits";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const usePlanValidation = () => {
  const { planLimits } = usePlanLimits();
  const { getCurrentUsage } = useCurrentUsage();
  const { profile } = useAuth();

  const checkCanCreateAgent = async (): Promise<boolean> => {
    if (!planLimits || !profile) {
      toast.error("Erro ao verificar limites do plano");
      return false;
    }

    const usage = await getCurrentUsage();
    
    if (usage.agents >= planLimits.max_agents) {
      let planLabel = planLimits.plan_name;
      if (planLabel === 'Intermediate') planLabel = 'Intermediate';
      if (planLabel === 'Basic') planLabel = 'Basic';
      if (planLabel === 'Premium') planLabel = 'Premium';
      toast.error(`You have reached the limit of ${planLimits.max_agents} agents for your ${planLabel} plan.`);
      return false;
    }

    return true;
  };

  const checkCanCreateConnection = async (): Promise<boolean> => {
    if (!planLimits || !profile) {
      toast.error("Erro ao verificar limites do plano");
      return false;
    }

    const usage = await getCurrentUsage();
    
    if (usage.connections >= planLimits.max_whatsapp_connections) {
      toast.error(`Você atingiu o limite de ${planLimits.max_whatsapp_connections} conexões WhatsApp do seu plano ${planLimits.plan_name}.`);
      return false;
    }

    return true;
  };

  const getCurrentPlanUsage = async () => {
    if (!planLimits) return null;
    
    const usage = await getCurrentUsage();
    
    return {
      agents: {
        current: usage.agents,
        max: planLimits.max_agents,
        percentage: (usage.agents / planLimits.max_agents) * 100
      },
      connections: {
        current: usage.connections,
        max: planLimits.max_whatsapp_connections,
        percentage: (usage.connections / planLimits.max_whatsapp_connections) * 100
      }
    };
  };

  return {
    checkCanCreateAgent,
    checkCanCreateConnection,
    getCurrentPlanUsage,
    planLimits
  };
};
