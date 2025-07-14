
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { generateChatwootPassword } from '@/utils/chatwootHelpers';

interface QrCodeDialogProps {
  showQrModal: boolean;
  setShowQrModal: (show: boolean) => void;
  qrCodeUrl: string | null;
  setQrCodeUrl: (url: string | null) => void;
  qrLoading: boolean;
  qrError: string | null;
  onRefreshQrCode: () => Promise<void>;
  configId: string;
  onConnectionSuccess: () => void;
  instanceName?: string;
}

export function QrCodeDialog({
  showQrModal,
  setShowQrModal,
  qrCodeUrl,
  setQrCodeUrl,
  qrLoading,
  qrError,
  onRefreshQrCode,
  configId,
  onConnectionSuccess,
  instanceName
}: QrCodeDialogProps) {
  const { user } = useAuth();
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'open' | 'connected' | 'failed' | null>(null);
  const [chatwootWebhookCalled, setChatwootWebhookCalled] = useState(false);

  const checkConnectionPeriodically = () => {
    if (!user || !configId || !instanceName) return;
    setChatwootWebhookCalled(false); // resetar ao iniciar nova conexão

    const intervalId = setInterval(async () => {
      try {
        console.log('Iniciando verificação periódica de conexão');
        
        const chatwootPassword = generateChatwootPassword(user.email || '', user.phone || '');
        
        // Buscar id_chatwoot da conta do usuário
        const { data: chatwootAccount } = await supabase
          .from('chatwoot_accounts')
          .select('id_chatwoot, user_id_chatwoot')
          .eq('user_id', user.id)
          .maybeSingle();

        const payload = {
          user_name: user.user_metadata?.name || user.email || "Usuário desconhecido",
          user_id: user.id,
          agent_id: configId,
          instance_name: instanceName,
          email: user.email || "",
          password: chatwootPassword,
          id_chatwoot: chatwootAccount?.id_chatwoot || null,
          user_id_chatwoot: chatwootAccount?.user_id_chatwoot || null
        };

        console.log('Payload enviado para validar-qrcode:', payload);
        const response = await fetch("https://nwh.suaiden.com/webhook/validar-qrcode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const text = await response.text();
          console.log('Resposta bruta do validar-qrcode:', text);
          let state = null;
          let number = null;
          let inboxPayloads = [];
          
          try {
            const json = JSON.parse(text);
            console.log('JSON parseado do validar-qrcode:', json);

            // Atualizar chatwoot_accounts com os dados do webhook, se existirem
            if (Array.isArray(json)) {
              for (const item of json) {
                if (item.id_chatwoot && item.user_id_chatwoot && item.chatwoot_user_name && item.user_id) {
                  const { error } = await supabase
                    .from('chatwoot_accounts')
                    .upsert({
                      user_id: item.user_id, // agora usa o user_id do webhook
                      id_chatwoot: item.id_chatwoot,
                      user_id_chatwoot: item.user_id_chatwoot,
                      chatwoot_user_name: item.chatwoot_user_name,
                      chatwoot_email: item.chatwoot_email,
                      chatwoot_password: item.chatwoot_password,
                      chatwoot_access_token: item.chatwoot_access_token
                    }, { onConflict: 'user_id' });
                  if (error) {
                    console.error('Erro ao fazer upsert em chatwoot_accounts:', error);
                  }
                }
              }
            } else if (json.id_chatwoot && json.user_id_chatwoot && json.chatwoot_user_name && json.user_id) {
              const { error } = await supabase
                .from('chatwoot_accounts')
                .upsert({
                  user_id: json.user_id, // agora usa o user_id do webhook
                  id_chatwoot: json.id_chatwoot,
                  user_id_chatwoot: json.user_id_chatwoot,
                  chatwoot_user_name: json.chatwoot_user_name,
                  chatwoot_email: json.chatwoot_email,
                  chatwoot_password: json.chatwoot_password,
                  chatwoot_access_token: json.chatwoot_access_token
                }, { onConflict: 'user_id' });
              if (error) {
                console.error('Erro ao fazer upsert em chatwoot_accounts:', error);
              }
            }
            let arrayToProcess = json;
            // Se vier como { data: [...] }, use json.data
            if (json && Array.isArray(json.data)) {
              arrayToProcess = json.data;
            }
            if (Array.isArray(arrayToProcess)) {
              inboxPayloads = arrayToProcess.map(item => ({
                state: item.state,
                inbox_id: item.inbox_id,
                user_id: item.user_id
              }));
              state = arrayToProcess[0]?.state;
              number = arrayToProcess[0]?.number;
            } else {
              state = arrayToProcess.state;
              number = arrayToProcess.number;
              inboxPayloads = [{
                state,
                inbox_id: arrayToProcess.inbox_id,
                user_id: arrayToProcess.user_id
              }];
            }
            console.log('Payloads para Edge Function:', inboxPayloads);
          } catch (err) {
            console.warn('Erro ao fazer parse do JSON do validar-qrcode:', err);
            if (text.includes('connected') || text.includes('conectado')) state = 'connected';
            else if (text.includes('open')) state = 'open';
          }
          
          if ((state === 'connected' || state === 'conectado' || state === 'open') && !chatwootWebhookCalled) {
            clearInterval(intervalId);
            setConnectionStatus('connected');
            setChatwootWebhookCalled(true);

            // Atualizar status no banco de dados
            await supabase
              .from('whatsapp_connections')
              .update({
                connection_status: 'connected',
                connected_at: new Date().toISOString(),
                disconnected_at: null
              })
              .eq('user_id', user.id)
              .eq('ai_configuration_id', configId);

            // NOVO: Buscar e salvar dados do webhook /webhook/chatwoot via Edge Function
            try {
              const chatwootResponse = await fetch("https://nwh.suaiden.com/webhook/chatwoot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user.id })
              });
              const chatwootData = await chatwootResponse.json();
              console.log('Resposta do webhook /chatwoot:', chatwootData);
              if (chatwootData && chatwootData.user_id) {
                // DEBUG: logar dados antes de enviar para Edge Function
                console.log('Enviando dados para Edge Function:', chatwootData);
                try {
                  const edgeResponse = await fetch("https://dawqhytdogagnwwhndjt.supabase.co/functions/v1/save-chatwoot-account", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd3FoeXRkb2dhZ253d2huZGp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDg2NTg3MSwiZXhwIjoyMDY2NDQxODcxfQ.sUfQQPwbBR_ihXqs06CbCulGwP3y_hRG8RX9eYa69Qo"
                    },
                    body: JSON.stringify(chatwootData)
                  });
                  console.log('Status da resposta da Edge Function:', edgeResponse.status);
                  const edgeResult = await edgeResponse.json();
                  console.log('Resposta da Edge Function:', edgeResult);
                  if (edgeResult.success) {
                    console.log('Dados do chatwoot salvos com sucesso via Edge Function!');
                  } else {
                    console.error('Erro ao salvar dados do chatwoot via Edge Function:', edgeResult.error);
                  }
                } catch (err) {
                  console.error('Erro de rede ao chamar Edge Function:', err);
                }
              }
            } catch (err) {
              console.error('Erro ao buscar/salvar dados do webhook /chatwoot via Edge Function:', err);
            }

            // Chamar função Edge para registrar inbox_id(s) após conexão bem-sucedida
            if (inboxPayloads.length > 0) {
              try {
                const edgeResponse = await fetch("https://dawqhytdogagnwwhndjt.supabase.co/functions/v1/whatsapp-inbox-syncts", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd3FoeXRkb2dhZ253d2huZGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NjU4NzEsImV4cCI6MjA2NjQ0MTg3MX0.st3PJZJsLff63mOTETQYBWha4Nz4gAzeyIHHkrQrSa8"
                  },
                  body: JSON.stringify(inboxPayloads),
                });
                
                if (edgeResponse.ok) {
                  const edgeResult = await edgeResponse.json();
                  console.log('Resposta da função Edge whatsapp-inbox-syncts:', edgeResult);
                } else {
                  const errorText = await edgeResponse.text();
                  console.error('Erro na função Edge whatsapp-inbox-syncts:', errorText);
                }
              } catch (edgeErr) {
                console.error('Erro ao chamar função Edge whatsapp-inbox-syncts:', edgeErr);
              }
            }

            setTimeout(() => {
              onConnectionSuccess();
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar conexão:', error);
      }
    }, 3000);

    return intervalId;
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (showQrModal && qrCodeUrl && !qrLoading && connectionStatus !== 'connected') {
      setIsCheckingConnection(true);
      intervalId = checkConnectionPeriodically();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIsCheckingConnection(false);
    };
  }, [showQrModal, qrCodeUrl, qrLoading, configId, user, instanceName, connectionStatus]);

  const handleClose = () => {
    setShowQrModal(false);
    setQrCodeUrl(null);
    setConnectionStatus(null);
    setIsCheckingConnection(false);
    setChatwootWebhookCalled(false);
  };

  const getStatusBadge = () => {
    if (connectionStatus === 'connected') {
      return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Conectado!</Badge>;
    }
    if (connectionStatus === 'open') {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Loader2 className="w-3 h-3 mr-1 animate-spin" />QR Code lido, conectando...</Badge>;
    }
    if (isCheckingConnection) {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200"><Loader2 className="w-3 h-3 mr-1 animate-spin" />Aguardando conexão...</Badge>;
    }
    if (qrError) {
      return <Badge className="bg-red-100 text-red-800 border-red-200"><AlertCircle className="w-3 h-3 mr-1" />Erro</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Aguardando leitura</Badge>;
  };

  return (
    <Dialog open={showQrModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Conectar WhatsApp</DialogTitle>
          <DialogDescription>
            Escaneie o QR Code com seu WhatsApp para conectar seu Agent.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            {getStatusBadge()}
          </div>

          <div className="flex flex-col items-center space-y-4">
            {qrLoading ? (
              <div className="flex flex-col items-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm text-gray-600">Gerando QR Code...</p>
              </div>
            ) : qrError ? (
              <div className="text-center space-y-3">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                <p className="text-sm text-red-600">{qrError}</p>
              </div>
            ) : qrCodeUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center p-4 bg-white rounded-lg border">
                  <img src={`data:image/png;base64,${qrCodeUrl}`} alt="QR Code" style={{ width: 200, height: 200 }} />
                </div>
                {connectionStatus === 'connected' && (
                  <div className="text-center space-y-2">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                    <p className="text-sm text-green-600 font-medium">WhatsApp conectado com sucesso!</p>
                    <p className="text-xs text-gray-500">Redirecionando...</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col space-y-2">
            <Button
              onClick={onRefreshQrCode}
              disabled={qrLoading || connectionStatus === 'connected'}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {qrLoading ? "Gerando..." : "Atualizar QR Code"}
            </Button>
            
            <Button 
              onClick={handleClose} 
              variant="ghost" 
              className="w-full"
              disabled={connectionStatus === 'connected'}
            >
              {connectionStatus === 'connected' ? 'Finalizando...' : 'Cancelar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
