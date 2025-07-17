
import SpecializedConsulting from "@/components/dashboard/SpecializedConsulting";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users, Zap } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function SpecializedConsultingPage() {
  usePageTitle("Specialized Consulting | Skilabot");
  const benefits = [
    {
      icon: Users,
      title: "Consultoria Personalizada",
      description: "Especialistas dedicados para seu projeto específico"
    },
    {
      icon: Zap,
      title: "Configuração Otimizada",
      description: "Agents configurados para máxima performance"
    },
    {
      icon: CheckCircle,
      title: "Suporte Contínuo",
      description: "Acompanhamento e ajustes quando necessário"
    },
    {
      icon: Clock,
      title: "Implementação Rápida",
      description: "Redução do tempo de setup e configuração"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8 mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Consultoria Especializada</h1>
      <p className="text-gray-600">
        Maximize o potencial dos seus Agents com nossa consultoria personalizada
      </p>

      <SpecializedConsulting />

      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">O que está incluso</CardTitle>
          <CardDescription>
            Nossa consultoria especializada oferece suporte completo para seus projetos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Pronto para começar?
            </h3>
            <p className="text-gray-600 mb-4">
              Nossa equipe está preparada para ajudar você a criar Agents excepcionais
            </p>
            <div className="text-sm text-gray-500">
              Entre em contato conosco através do botão "Agendar Consultoria Gratuita" acima
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
