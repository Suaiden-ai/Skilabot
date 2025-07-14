
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Zap, Calendar } from "lucide-react";

export default function SpecializedConsulting() {
  const handleScheduleConsulting = () => {
    // Aqui você pode implementar a lógica para agendar consultoria
    // Por exemplo, abrir um modal ou redirecionar para um sistema de agendamento
    console.log('Agendar consultoria especializada');
  };

  return (
    <Card className="shadow-md border-0 bg-gradient-to-br from-purple-50 to-indigo-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-purple-600" />
            <CardTitle className="text-purple-800">Consultoria Especializada</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
            Plano Intermediário
          </Badge>
        </div>
        <CardDescription className="text-purple-600">
          Receba ajuda especializada para criar Agents personalizados e otimizar seus resultados
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Configuração Personalizada</h4>
              <p className="text-sm text-gray-600">Ajuda para configurar Agents específicos para seu negócio</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Otimização de Performance</h4>
              <p className="text-sm text-gray-600">Melhore a eficiência dos seus Agents</p>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-purple-200">
          <Button 
            onClick={handleScheduleConsulting}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Agendar Consultoria Gratuita
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
