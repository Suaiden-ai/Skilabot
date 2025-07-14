
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, MessageSquare, Smartphone, Settings } from 'lucide-react';

interface QuickStartProps {
  onStartConfiguration: () => void;
}

export const QuickStart: React.FC<QuickStartProps> = ({ onStartConfiguration }) => {
  const steps = [
    {
      icon: Settings,
      title: "Configure seu Agent",
      description: "Defina nome, personalidade e área de atuação"
    },
    {
      icon: MessageSquare,
      title: "Teste no Chat",
      description: "Converse com seu Agent para verificar se está funcionando"
    },
    {
      icon: Smartphone,
      title: "Conecte ao WhatsApp",
      description: "Escaneie o QR Code para integrar com WhatsApp Business"
    },
    {
      icon: Rocket,
      title: "Agent Ativo!",
      description: "Seu Agent estará respondendo automaticamente"
    }
  ];

  return (
    <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-blue-800">
          <Rocket className="h-6 w-6" />
          <span>Bem-vindo ao Skilabot!</span>
        </CardTitle>
        <CardDescription className="text-blue-600">
          Crie seu primeiro Agent AI em apenas 4 passos simples
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-sm text-blue-900">{step.title}</h4>
                  <p className="text-xs text-blue-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center pt-4">
          <Button 
            onClick={onStartConfiguration}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Começar Agora
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
