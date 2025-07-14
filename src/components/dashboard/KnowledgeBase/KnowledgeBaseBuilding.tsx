import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle, MessageSquare, Mic, Image, Users } from "lucide-react";
import { AIConfiguration, WhatsAppConnection } from "./types";
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface KnowledgeBaseBuildingProps {
  config: AIConfiguration;
  onNext: () => void;
  onBack: () => void;
}

export const KnowledgeBaseBuilding: React.FC<KnowledgeBaseBuildingProps> = ({
  config,
  onNext,
  onBack
}) => {
  const { user } = useAuth();
  const [integrationStatus, setIntegrationStatus] = useState<'integrating' | 'connected'>('integrating');
  const [currentConnection, setCurrentConnection] = useState<WhatsAppConnection | null>(null);
  const navigate = useNavigate();

  // Verificar status da conexão a cada minuto
  useEffect(() => {
    const checkConnectionStatus = async () => {
      if (!user || !config.id) return;

      try {
        const { data, error } = await supabase
          .from('whatsapp_connections')
          .select('*')
          .eq('user_id', user.id)
          .eq('ai_configuration_id', config.id)
          .single();

        if (!error && data) {
          // Type assertion to ensure compatibility
          const connectionData: WhatsAppConnection = {
            ...data,
            connection_status: data.connection_status as "connected" | "error" | "connecting" | "disconnected"
          };
          
          setCurrentConnection(connectionData);
          if (data.connection_status === 'connected') {
            setIntegrationStatus('connected');
            toast.success("🎉 Your AI AGENT was connected successfully!", {
              description: "Now it's ready to respond to messages on WhatsApp!"
            });
          }
        }
      } catch (error) {
        console.error('Erro ao verificar status da conexão:', error);
      }
    };

    // Verificar imediatamente
    checkConnectionStatus();

    // Verificar a cada minuto
    const interval = setInterval(checkConnectionStatus, 60000);

    return () => clearInterval(interval);
  }, [user, config.id]);

  const isConnected = integrationStatus === 'connected';

  const handleGoToAgents = () => {
    // Navigate to dashboard with agents section
    navigate('/dashboard', { replace: true });
    // Small delay to ensure navigation completes before setting state
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('navigate-to-agents'));
    }, 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {integrationStatus === 'integrating' ? (
            <Loader2 className="h-6 w-6 animate-spin text-green-600" />
          ) : (
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          )}
          <span>Building your AI AGENT</span>
        </CardTitle>
        <CardDescription>
          {integrationStatus === 'integrating' 
            ? 'Your WhatsApp was successfully connected! We are building your custom AI AGENT for WhatsApp Business.'
            : 'Your AI AGENT was built successfully!'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span>WhatsApp Business connected</span>
            {currentConnection?.phone_number && (
              <span className="text-sm text-gray-500">({currentConnection.phone_number})</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span>AI AGENT configuration validated</span>
          </div>
          <div className="flex items-center space-x-3">
            {integrationStatus === 'integrating' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span>Integrating AI AGENT with WhatsApp Business...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>AI AGENT successfully connected to WhatsApp Business</span>
              </>
            )}
          </div>
        </div>

        {integrationStatus === 'connected' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your AI AGENT's capabilities on WhatsApp:</h3>
            <div className="grid gap-4">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Automatic Text Response</h4>
                  <p className="text-sm text-blue-700">The Agent can automatically respond to text messages.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <Mic className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Audio Message Response</h4>
                  <p className="text-sm text-green-700">The Agent can respond to audio messages.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <Image className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900">Image Message Response</h4>
                  <p className="text-sm text-purple-700">The Agent can respond to image messages.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                <Users className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900">Manual Intervention</h4>
                  <p className="text-sm text-orange-700">
                    When the Agent is responding to messages on WhatsApp and you want to intervene,
                    just send a message yourself to the person the Agent was responding to.
                    The Agent will understand that you have entered the conversation and will stop responding for about 24h.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {integrationStatus === 'integrating' && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This process may take a few minutes. Your AI AGENT will be available soon on your WhatsApp Business.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <span className="text-sm font-medium">Your AI AGENT's information:</span>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div><strong>Name:</strong> {config.ai_name}</div>
            <div><strong>Company:</strong> {config.company_name}</div>
            <div><strong>Type:</strong> {config.agent_type}</div>
            <div><strong>Personality:</strong> {config.personality}</div>
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={() => {
            if (isConnected) {
              handleGoToAgents();
            } else {
              onNext();
            }
          }}
          className="w-full"
        >
          {isConnected ? "Go to My Agents" : "Back to Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBaseBuilding;
