
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Bot, Smartphone, TrendingUp } from "lucide-react";
import { usePlanLimits, useCurrentUsage } from "@/hooks/usePlanLimits";

export default function PlanUsage() {
  const { planLimits, isLoading } = usePlanLimits();
  const { getCurrentUsage } = useCurrentUsage();
  const [usage, setUsage] = useState({ agents: 0, connections: 0 });

  useEffect(() => {
    const fetchUsage = async () => {
      if (planLimits) {
        const currentUsage = await getCurrentUsage();
        setUsage(currentUsage);
      }
    };
    fetchUsage();
  }, [planLimits, getCurrentUsage]);

  if (isLoading) {
    return (
      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!planLimits) return null;

  const agentUsagePercent = planLimits.max_agents > 0 ? (usage.agents / planLimits.max_agents) * 100 : 0;
  const connectionUsagePercent = planLimits.max_whatsapp_connections > 0 ? (usage.connections / planLimits.max_whatsapp_connections) * 100 : 0;

  return (
    <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-gray-800">
            <TrendingUp className="h-5 w-5" />
            <span>Uso do Plano</span>
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
            {planLimits.plan_name}
          </Badge>
        </div>
        <CardDescription>
          Acompanhe o uso dos recursos do seu plano atual
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Uso de Agents */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Agents</span>
            </div>
            <span className="text-sm text-gray-600">
              {usage.agents} / {planLimits.max_agents}
            </span>
          </div>
          <Progress value={agentUsagePercent} className="h-2" />
        </div>

        {/* Uso de Conexões WhatsApp */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Conexões WhatsApp</span>
            </div>
            <span className="text-sm text-gray-600">
              {usage.connections} / {planLimits.max_whatsapp_connections}
            </span>
          </div>
          <Progress value={connectionUsagePercent} className="h-2" />
        </div>

        {/* Recursos Extras */}
        {planLimits.has_specialized_consulting && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Consultoria especializada disponível</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
