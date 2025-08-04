
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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { generateChatwootPassword } from '@/utils/chatwootHelpers';

interface QrCodeDialogProps {
  showQrModal: boolean;
  setShowQrModal: (show: boolean) => void;
  qrCodeData: string;
  setQrCodeData: (data: string) => void;
  qrCodeLoading: boolean;
  setQrCodeLoading: (loading: boolean) => void;
  connectionStatus: string;
  setConnectionStatus: (status: string) => void;
  onRefreshQrCode: () => Promise<void>;
  agent: any;
  onConnectionSuccess: () => void;
  generateWebhookData: (agent: any) => Promise<any>;
}

export default function QrCodeDialog({
  showQrModal,
  setShowQrModal,
  qrCodeData,
  setQrCodeData,
  qrCodeLoading,
  setQrCodeLoading,
  connectionStatus,
  setConnectionStatus,
  onRefreshQrCode,
  agent,
  onConnectionSuccess,
  generateWebhookData
}: QrCodeDialogProps) {
  const { user, session } = useAuth();
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [chatwootWebhookCalled, setChatwootWebhookCalled] = useState(false);
  const [validationInterval, setValidationInterval] = useState<NodeJS.Timeout | null>(null);
  const [qrUpdateInterval, setQrUpdateInterval] = useState<NodeJS.Timeout | null>(null);

  const validateQrCode = async (agent: any, chatwootData: any) => {
    try {
      console.log('=== DEBUG: Validando QR Code ===');
      const chatwootPassword = generateChatwootPassword(user?.email || '', user?.phone || '');
      
      // Buscar id_chatwoot da conta do usuário
      const { data: chatwootAccount } = await supabase
        .from('chatwoot_accounts')
        .select('id_chatwoot, user_id_chatwoot')
        .eq('user_id', user?.id)
        .maybeSingle();

      const payload = {
        user_name: user?.user_metadata?.name || user?.email || "Usuário desconhecido",
        user_id: user?.id,
        agent_id: agent.id,
        instance_name: (await generateWebhookData(agent)).instance_name,
        email: user?.email || "",
        password: chatwootPassword,
        id_chatwoot: chatwootAccount?.id_chatwoot || null,
        user_id_chatwoot: chatwootAccount?.user_id_chatwoot || null
      };

      console.log('=== DEBUG: Payload enviado para validar-qrcode ===', payload);
      const response = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/validar-qrcode`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const text = await response.text();
        console.log('=== DEBUG: Resposta bruta do validar-qrcode ===', text);
        let state = null;
        let number = null;
        let inboxPayloads = [];
        
        try {
          const json = JSON.parse(text);
          console.log('=== DEBUG: JSON parseado do validar-qrcode ===', json);

          // Atualizar chatwoot_accounts com os dados do webhook, se existirem
          if (Array.isArray(json)) {
            for (const item of json) {
              if (item.id_chatwoot && item.user_id_chatwoot && item.chatwoot_user_name && item.user_id) {
                const { error } = await supabase
                  .from('chatwoot_accounts')
                  .upsert({
                    user_id: item.user_id,
                    id_chatwoot: item.id_chatwoot,
                    user_id_chatwoot: item.user_id_chatwoot,
                    chatwoot_user_name: item.chatwoot_user_name,
                    chatwoot_email: item.chatwoot_email,
                    chatwoot_password: item.chatwoot_password,
                    chatwoot_access_token: item.chatwoot_access_token
                  }, { onConflict: 'user_id' });
                if (error) {
                  console.error('=== DEBUG: Erro ao fazer upsert em chatwoot_accounts ===', error);
                }
              }
            }
          } else if (json.id_chatwoot && json.user_id_chatwoot && json.chatwoot_user_name && json.user_id) {
            const { error } = await supabase
              .from('chatwoot_accounts')
              .upsert({
                user_id: json.user_id,
                id_chatwoot: json.id_chatwoot,
                user_id_chatwoot: json.user_id_chatwoot,
                chatwoot_user_name: json.chatwoot_user_name,
                chatwoot_email: json.chatwoot_email,
                chatwoot_password: json.chatwoot_password,
                chatwoot_access_token: json.chatwoot_access_token
              }, { onConflict: 'user_id' });
            if (error) {
              console.error('=== DEBUG: Erro ao fazer upsert em chatwoot_accounts ===', error);
            }
          }
          
          let arrayToProcess = json;
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
          console.log('=== DEBUG: Payloads para Edge Function ===', inboxPayloads);
        } catch (err) {
          console.warn('=== DEBUG: Erro ao fazer parse do JSON do validar-qrcode ===', err);
          if (text.includes('connected') || text.includes('conectado')) state = 'connected';
          else if (text.includes('open')) state = 'open';
        }
        
        if ((state === 'connected' || state === 'conectado' || state === 'open') && !chatwootWebhookCalled) {
          // Limpar intervalos
          if (validationInterval) clearInterval(validationInterval);
          if (qrUpdateInterval) clearInterval(qrUpdateInterval);
          
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
            .eq('user_id', user?.id)
            .eq('ai_configuration_id', agent.id);

          // Buscar e salvar dados do webhook /webhook/chatwoot via Edge Function
          try {
            const chatwootResponse = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/chatwoot`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ user_id: user?.id })
            });
            const text = await chatwootResponse.text();
            console.log('=== DEBUG: Resposta do webhook /webhook/chatwoot ===', text);
            let chatwootData = null;
            try {
              chatwootData = text ? JSON.parse(text) : null;
              console.log('=== DEBUG: Chatwoot data parseada ===', chatwootData);
            } catch (e) {
              console.error('Resposta não é JSON válido:', text);
            }
            if (chatwootData && chatwootData.user_id) {
              console.log('=== DEBUG: Enviando dados para Edge Function save-chatwoot-account ===', chatwootData);
              try {
                const edgeResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/save-chatwoot-account`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(chatwootData)
                });
                let edgeResult = null;
                const text = await edgeResponse.text();
                try {
                  edgeResult = text ? JSON.parse(text) : null;
                } catch (e) {
                  console.error('Resposta não é JSON válido:', text);
                }
                if (edgeResult && edgeResult.success) {
                  console.log('=== DEBUG: Dados do chatwoot salvos com sucesso via Edge Function! ===');
                } else {
                  console.error('=== DEBUG: Erro ao salvar dados do chatwoot via Edge Function ===', edgeResult?.error);
                }
              } catch (err) {
                console.error('=== DEBUG: Erro de rede ao chamar Edge Function ===', err);
              }
            }
          } catch (err) {
            console.error('=== DEBUG: Erro ao buscar/salvar dados do webhook /chatwoot via Edge Function ===', err);
          }

          // Chamar função Edge para registrar inbox_id(s) após conexão bem-sucedida
          console.log('=== DEBUG: Verificando inbox payloads ===', inboxPayloads);
          if (inboxPayloads.length > 0) {
            console.log('=== DEBUG: Inbox payloads encontrados, chamando Edge Function whatsapp-inbox-syncts ===');
            try {
              const inboxResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/whatsapp-inbox-syncts`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(inboxPayloads)
              });
              const text = await inboxResponse.text();
              let inboxResult = null;
              try {
                inboxResult = text ? JSON.parse(text) : null;
              } catch (e) {
                console.error('Resposta não é JSON válido:', text);
              }
              if (inboxResult && inboxResult.success) {
                console.log('=== DEBUG: Inboxes sincronizados com sucesso via Edge Function! ===');
              } else {
                console.error('=== DEBUG: Erro na função Edge whatsapp-inbox-sync ===', inboxResult);
              }
            } catch (edgeErr) {
              console.error('=== DEBUG: Erro ao chamar função Edge whatsapp-inbox-sync ===', edgeErr);
            }
          }

          // Fechar modal após 2 segundos
          setTimeout(() => {
            setShowQrModal(false);
            onConnectionSuccess();
          }, 2000);
        }
      }
    } catch (error) {
      console.error('=== DEBUG: Erro ao validar QR Code ===', error);
    }
  };

  const updateQrCode = async (agent: any, chatwootData: any) => {
    try {
      console.log('=== DEBUG: Atualizando QR Code ===');
      const qrPayload = {
        user_id: user?.id,
        user_name: (await generateWebhookData(agent)).user_name,
        email: (await generateWebhookData(agent)).email,
        plan: (await generateWebhookData(agent)).plan,
        instance_name: (await generateWebhookData(agent)).instance_name
      };

      const qrResponse = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/gerarqrcodeskilabot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(qrPayload)
      });

      if (qrResponse.ok) {
        const responseText = await qrResponse.text();
        let qrCodeData = null;

        try {
          const parsedResponse = JSON.parse(responseText);
          qrCodeData = parsedResponse.qrCode || parsedResponse.base64 || parsedResponse.qr_code;
        } catch (jsonError) {
          if (responseText && /^[A-Za-z0-9+/=]+$/.test(responseText) && responseText.length > 100) {
            qrCodeData = responseText;
          }
        }

        if (qrCodeData && /^[A-Za-z0-9+/=]+$/.test(qrCodeData) && qrCodeData.length > 100) {
          setQrCodeData(`data:image/png;base64,${qrCodeData}`);
          console.log('=== DEBUG: QR Code atualizado com sucesso ===');
        }
      }
    } catch (error) {
      console.error('=== DEBUG: Erro ao atualizar QR Code ===', error);
    }
  };

  useEffect(() => {
    if (showQrModal && qrCodeData && !qrCodeLoading && connectionStatus !== 'connected') {
      setIsCheckingConnection(true);
      
      // Iniciar validação periódica
      const validationInterval = setInterval(() => {
        validateQrCode(agent, null);
      }, 10000); // 10 segundos
      setValidationInterval(validationInterval);
      
      // Iniciar atualização periódica do QR Code
      const qrUpdateInterval = setInterval(() => {
        updateQrCode(agent, null);
      }, 30000); // 30 segundos
      setQrUpdateInterval(qrUpdateInterval);
    }

    return () => {
      if (validationInterval) clearInterval(validationInterval);
      if (qrUpdateInterval) clearInterval(qrUpdateInterval);
      setIsCheckingConnection(false);
    };
  }, [showQrModal, qrCodeData, qrCodeLoading, connectionStatus, agent]);

  const handleClose = () => {
    setShowQrModal(false);
    setQrCodeData('');
    setConnectionStatus('initializing');
    setIsCheckingConnection(false);
    setChatwootWebhookCalled(false);
    if (validationInterval) clearInterval(validationInterval);
    if (qrUpdateInterval) clearInterval(qrUpdateInterval);
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
    if (connectionStatus === 'error') {
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
            {qrCodeLoading ? (
              <div className="flex flex-col items-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm text-gray-600">Gerando QR Code...</p>
              </div>
            ) : connectionStatus === 'error' ? (
              <div className="text-center space-y-3">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                <p className="text-sm text-red-600">Erro ao gerar QR Code</p>
              </div>
            ) : qrCodeData ? (
              <div className="space-y-4">
                <div className="flex justify-center p-4 bg-white rounded-lg border">
                  <img src={qrCodeData} alt="QR Code" style={{ width: 200, height: 200 }} />
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
              disabled={qrCodeLoading || connectionStatus === 'connected'}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {qrCodeLoading ? "Gerando..." : "Atualizar QR Code"}
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
