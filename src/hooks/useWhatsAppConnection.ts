import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { AgentWithConnection } from './useAgents';
import { generateFinalPrompt } from '@/utils/promptGenerator';
import { generateChatwootPassword } from '@/utils/chatwootHelpers';

export const useWhatsAppConnection = (onConnectionSuccess?: () => void) => {
  const { user, profile } = useAuth();
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string>('');
  const [qrCodeLoading, setQrCodeLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'initializing' | 'connecting' | 'open' | 'connected' | 'failed' | 'error' | null>(null);
  const [currentAgent, setCurrentAgent] = useState<AgentWithConnection | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [chatwootWebhookCalled, setChatwootWebhookCalled] = useState(false);
  const [shouldStartPeriodicCheck, setShouldStartPeriodicCheck] = useState(false);
  const [currentInstanceName, setCurrentInstanceName] = useState<string>('');

  const generateWebhookData = async (agent: AgentWithConnection) => {
    let accountId = null;
    try {
      const { data: chatwootAccount } = await supabase
        .from('chatwoot_accounts')
        .select('id_chatwoot')
        .eq('user_id', user?.id)
        .single();
      
      accountId = chatwootAccount?.id_chatwoot || null;
      console.log('🔍 Account ID encontrada:', accountId);
    } catch (error) {
      console.log('🔍 Usuário não possui account_id ainda');
      accountId = null;
    }

    if (agent.evolution_instance_id && agent.has_connection_history) {
      console.log('🔄 Reconexão detectada. Usando evolution_instance_id existente:', agent.evolution_instance_id);
      setCurrentInstanceName(agent.evolution_instance_id);
      
      const numbers = '0123456789';
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      
      let password = '';
      password += numbers[Math.floor(Math.random() * numbers.length)];
      password += specialChars[Math.floor(Math.random() * specialChars.length)];
      for (let i = 0; i < 8; i++) {
        const allChars = letters + numbers;
        password += allChars[Math.floor(Math.random() * allChars.length)];
      }
      password = password.split('').sort(() => Math.random() - 0.5).join('');
      
      return {
        user_name: user?.user_metadata?.name || user?.email || "Usuário desconhecido",
        user_id: user?.id,
        agent_id: agent.id,
        instance_name: agent.evolution_instance_id,
        email: user?.email || "",
        plan: profile?.plan || "basic",
        password: password,
        account_id: accountId
      };
    }

    if (currentInstanceName && currentAgent?.id === agent.id) {
      console.log('🔄 Reutilizando instance_name existente:', currentInstanceName);
      console.log('🔍 currentAgent.id:', currentAgent.id, 'agent.id:', agent.id);
    } else if (!currentInstanceName && currentAgent?.id === agent.id) {
      console.log('⚠️ currentInstanceName está vazio mas temos currentAgent. Gerando novo instance_name.');
    } else {
      console.log('🆕 Gerando novo instance_name para agente:', agent.id);
    }
    
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let password = '';
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    for (let i = 0; i < 8; i++) {
      const allChars = letters + numbers;
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    if (currentInstanceName && currentAgent?.id === agent.id) {
      return {
        user_name: user?.user_metadata?.name || user?.email || "Usuário desconhecido",
        user_id: user?.id,
        agent_id: agent.id,
        instance_name: currentInstanceName,
        email: user?.email || "",
        plan: profile?.plan || "basic",
        password: password,
        account_id: accountId
      };
    }
    
    const randomChars = Math.random().toString(36).substring(2, 12);
    const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || "user";
    const instanceName = `${userName}_${randomChars}`;
    
    setCurrentInstanceName(instanceName);
    console.log('🆕 Gerando novo instance_name:', instanceName);
    
    return {
      user_name: user?.user_metadata?.name || user?.email || "Usuário desconhecido",
      user_id: user?.id,
      agent_id: agent.id,
      instance_name: instanceName,
      email: user?.email || "",
      plan: profile?.plan || "basic",
      password: password,
      account_id: accountId
    };
  };

  const saveFinalPrompt = async (agent: AgentWithConnection) => {
    try {
      const { data: agentData, error: agentError } = await supabase
        .from('ai_configurations')
        .select('final_prompt')
        .eq('id', agent.id)
        .maybeSingle();

      if (agentError) {
        console.error('❌ Erro ao buscar final_prompt da ai_configurations:', agentError);
        return;
      }

      if (!agentData?.final_prompt) {
        console.log('⚠️ final_prompt não encontrado na ai_configurations, gerando novo...');
        const finalPrompt = generateFinalPrompt(agent);
        
        // Truncar o final_prompt se for muito grande
        const maxPromptLength = 10000;
        const truncatedFinalPrompt = finalPrompt && finalPrompt.length > maxPromptLength 
          ? finalPrompt.substring(0, maxPromptLength) + '... [TRUNCATED]'
          : finalPrompt;
        
        const { error } = await supabase
          .from('whatsapp_connections')
          .update({
            final_prompt: truncatedFinalPrompt
          })
          .eq('user_id', user?.id)
          .eq('ai_configuration_id', agent.id);

        if (error) {
          console.error('❌ Erro ao salvar final_prompt gerado:', error);
        } else {
          console.log('✅ final_prompt gerado e salvo com sucesso');
        }
      } else {
        console.log('📋 Copiando final_prompt da ai_configurations para whatsapp_connections');
        
        // Truncar o final_prompt se for muito grande
        const maxPromptLength = 10000;
        const truncatedFinalPrompt = agentData.final_prompt && agentData.final_prompt.length > maxPromptLength 
          ? agentData.final_prompt.substring(0, maxPromptLength) + '... [TRUNCATED]'
          : agentData.final_prompt;
        
        const { error } = await supabase
          .from('whatsapp_connections')
          .update({
            final_prompt: truncatedFinalPrompt
          })
          .eq('user_id', user?.id)
          .eq('ai_configuration_id', agent.id);

        if (error) {
          console.error('❌ Erro ao copiar final_prompt:', error);
        } else {
          console.log('✅ final_prompt copiado com sucesso');
        }
      }
    } catch (error) {
      console.error('❌ Erro ao gerar/salvar final_prompt:', error);
    }
  };

  const checkConnectionPeriodically = () => {
    console.log('🚀 INICIANDO checkConnectionPeriodically');
    if (!user || !currentAgent) {
      console.log('❌ Usuário ou agente não encontrado');
      return { validationIntervalId: null, qrUpdateIntervalId: null };
    }
    
    console.log('✅ Usuário e agente encontrados, iniciando intervalos');
    setChatwootWebhookCalled(false);

    const isReconnection = currentAgent.has_connection_history && currentAgent.evolution_instance_id;
    console.log('🔍 É reconexão na verificação periódica?', isReconnection);

    const validationIntervalId = setInterval(async () => {
      console.log('⏰ EXECUTANDO VERIFICAÇÃO DE CONEXÃO (20s):', new Date().toLocaleTimeString());
      try {
        const chatwootPassword = generateChatwootPassword(user.email || '', user.phone || '');
        
        const { data: chatwootAccount } = await supabase
          .from('chatwoot_accounts')
          .select('id_chatwoot, user_id_chatwoot')
          .eq('user_id', user.id)
          .maybeSingle();

        const webhookData = await generateWebhookData(currentAgent);
        console.log('🔍 Instance_name sendo usado na verificação periódica:', webhookData.instance_name);
        
        const validationWebhook = isReconnection ? '/validar-qrcode-connections' : '/validar-qrcode';
        console.log('🔧 PASSO 3: Chamando webhook', validationWebhook);
        
        const payload = {
          user_name: user.user_metadata?.name || user.email || "Usuário desconhecido",
          user_id: user.id,
          agent_id: currentAgent.id,
          instance_name: webhookData.instance_name,
          email: user.email || "",
          password: chatwootPassword,
          id_chatwoot: chatwootAccount?.id_chatwoot || null,
          user_id_chatwoot: chatwootAccount?.user_id_chatwoot || null
        };

        console.log('📦 Payload sendo enviado:', payload);
        
        try {
          console.log('🔄 Tentando chamada direta...');
          console.log('🔗 URL sendo chamada:', `${import.meta.env.VITE_NWH_BASE_URL}/webhook${validationWebhook}`);
          
          const response = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook${validationWebhook}`, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
          });
          console.log('📊 Status da chamada direta:', response.status);
          console.log('📊 Status Text:', response.statusText);
          console.log('📊 Headers da resposta:', Object.fromEntries(response.headers.entries()));

          if (response.ok) {
            const text = await response.text();
            console.log('📄 Resposta do webhook', validationWebhook, ':', text.substring(0, 200) + '...');
            let state = null;
            let number = null;
            let inboxPayloads = [];
            
            try {
              const json = JSON.parse(text);

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
              console.log('📊 JSON parseado com sucesso');
              console.log('📊 arrayToProcess:', arrayToProcess);
              console.log('📊 state extraído:', state);
              console.log('📊 number extraído:', number);
            } catch (err) {
              console.warn('Erro ao fazer parse do JSON do validar-qrcode:', err);
              console.log('📄 Texto original que falhou no parse:', text);
              if (text.includes('connected') || text.includes('conectado')) state = 'connected';
              else if (text.includes('open')) state = 'open';
              console.log('📊 State detectado por fallback:', state);
            }
            console.log('🔍 State detectado após parse:', state);
            
            if (inboxPayloads.length > 0) {
              console.log('🚀 CHAMANDO EDGE FUNCTION whatsapp-inbox-syncts');
              try {
                const inboxResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/whatsapp-inbox-syncts`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
                  },
                  body: JSON.stringify(inboxPayloads)
                });
                const text = await inboxResponse.text();
                console.log('✅ Edge Function whatsapp-inbox-syncts chamada com sucesso. Status:', inboxResponse.status);
                console.log('📄 Resposta da Edge Function whatsapp-inbox-syncts:', text);
              } catch (edgeErr) {
                console.error('❌ Erro ao chamar Edge Function whatsapp-inbox-syncts:', edgeErr.message);
              }
            } else {
              console.log('📊 Nenhum inboxPayload para enviar para Edge Function whatsapp-inbox-syncts');
            }
            
            // Verificar todos os estados possíveis
            console.log('🔍 Verificando condições para salvar conexão:');
            console.log('📊 state === "open":', state === 'open');
            console.log('📊 state === "connected":', state === 'connected');
            console.log('📊 !chatwootWebhookCalled:', !chatwootWebhookCalled);
            console.log('📊 state válido para conexão:', ['open', 'connected'].includes(state));
            
            if ((state === 'open' || state === 'connected') && !chatwootWebhookCalled) {
              console.log('🎉 CONEXÃO DETECTADA (state=' + state + ') - FINALIZANDO');
              console.log('📊 State detectado:', state);
              console.log('📊 chatwootWebhookCalled:', chatwootWebhookCalled);
              console.log('📊 currentAgent:', currentAgent);
              console.log('📊 user:', user);
              console.log('📊 currentInstanceName:', currentInstanceName);
              
              clearInterval(validationIntervalId);
              clearInterval(qrUpdateIntervalId);
              setConnectionStatus('connected');
              setChatwootWebhookCalled(true);

              console.log('🔄 Atualizando status no banco de dados...');
              
              const { data: agentConfig, error: agentError } = await supabase
                .from('ai_configurations')
                .select('final_prompt')
                .eq('id', currentAgent.id)
                .maybeSingle();

              if (agentError) {
                console.error('❌ Erro ao buscar final_prompt:', agentError);
              } else {
                console.log('✅ Agent config encontrado:', agentConfig);
              }

              const finalPrompt = agentConfig?.final_prompt || generateFinalPrompt(currentAgent);
              console.log('📝 Final Prompt obtido:', finalPrompt ? 'Sim' : 'Não');
              console.log('📝 Tamanho do final_prompt:', finalPrompt?.length || 0);
              
              // Truncar o final_prompt se for muito grande para evitar problemas com índices
              const maxPromptLength = 10000; // Limite seguro para evitar problemas de índice
              const truncatedFinalPrompt = finalPrompt && finalPrompt.length > maxPromptLength 
                ? finalPrompt.substring(0, maxPromptLength) + '... [TRUNCATED]'
                : finalPrompt;
              
              console.log('📝 Final Prompt após truncamento:', truncatedFinalPrompt ? 'Sim' : 'Não');
              console.log('📝 Tamanho do final_prompt após truncamento:', truncatedFinalPrompt?.length || 0);
              
              const { data: existingConnection, error: findError } = await supabase
                .from('whatsapp_connections')
                .select('*')
                .eq('user_id', user.id)
                .eq('ai_configuration_id', currentAgent.id)
                .maybeSingle();
              
              if (findError) {
                console.error('❌ Erro ao buscar conexão existente:', findError);
              } else {
                console.log('✅ Busca por conexão existente concluída');
              }
              
              console.log('📊 Conexão existente:', existingConnection);
              
              let updateResult;
              
              if (existingConnection) {
                console.log('📝 Atualizando conexão existente...');
                const { data: updateData, error: updateError } = await supabase
                  .from('whatsapp_connections')
                  .update({
                    connection_status: 'connected',
                    connected_at: new Date().toISOString(),
                    disconnected_at: null,
                    final_prompt: truncatedFinalPrompt
                  })
                  .eq('user_id', user.id)
                  .eq('ai_configuration_id', currentAgent.id);
                
                if (updateError) {
                  console.error('❌ Erro ao atualizar status no banco:', updateError);
                  console.error('❌ Detalhes do erro:', {
                    message: updateError.message,
                    details: updateError.details,
                    hint: updateError.hint
                  });
                } else {
                  console.log('✅ Status e final_prompt atualizados com sucesso:', updateData);
                  updateResult = updateData;
                }
              } else {
                console.log('📝 Criando novo registro de conexão...');
                console.log('📝 Dados para inserção:', {
                  user_id: user.id,
                  ai_configuration_id: currentAgent.id,
                  evolution_instance_id: currentInstanceName,
                  connection_status: 'connected',
                  connected_at: new Date().toISOString(),
                  disconnected_at: null,
                  final_prompt: truncatedFinalPrompt ? 'EXISTS' : 'NULL'
                });
                
                const { data: insertData, error: insertError } = await supabase
                  .from('whatsapp_connections')
                  .insert({
                    user_id: user.id,
                    ai_configuration_id: currentAgent.id,
                    evolution_instance_id: currentInstanceName,
                    connection_status: 'connected',
                    connected_at: new Date().toISOString(),
                    disconnected_at: null,
                    final_prompt: truncatedFinalPrompt
                  });
                
                if (insertError) {
                  console.error('❌ Erro ao criar registro de conexão:', insertError);
                  console.error('❌ Detalhes do erro:', {
                    message: insertError.message,
                    details: insertError.details,
                    hint: insertError.hint
                  });
                } else {
                  console.log('✅ Novo registro de conexão criado com sucesso:', insertData);
                  updateResult = insertData;
                }
              }

              if (updateResult) {
                console.log('🔄 Chamando saveFinalPrompt...');
                await saveFinalPrompt(currentAgent);
                console.log('✅ saveFinalPrompt concluído');
              } else {
                console.log('⚠️ updateResult é null/undefined, não chamando saveFinalPrompt');
              }

              setTimeout(() => {
                console.log('⏰ Timeout executado - fechando modal e atualizando estado');
                setShouldStartPeriodicCheck(false);
                setShowQrModal(false);
                // Chamar callback para atualizar o estado da página
                if (onConnectionSuccess) {
                  console.log('🔄 Chamando onConnectionSuccess callback');
                  onConnectionSuccess();
                }
              }, 2000);
            } else {
              console.log('⚠️ Condição não atendida para salvar conexão:');
              console.log('📊 state:', state);
              console.log('📊 chatwootWebhookCalled:', chatwootWebhookCalled);
              console.log('📊 state é válido:', ['open', 'connected'].includes(state));
            }
          } else {
            console.log('⚠️ Webhook não retornou sucesso:', response.status);
          }
        } catch (fetchError) {
          console.error('❌ Erro ao chamar webhook', validationWebhook, ':', fetchError);
          console.error('❌ Detalhes do erro:', {
            message: fetchError.message,
            name: fetchError.name,
            stack: fetchError.stack
          });
        }
      } catch (error) {
        console.error('Erro ao verificar conexão:', error);
      }
    }, 20000);

    const qrUpdateIntervalId = setInterval(async () => {
      console.log('⏰ ATUALIZANDO QR CODE (30s):', new Date().toLocaleTimeString());
      try {
        console.log('📞 PASSO 4: Chamando webhook /atualizar-qrcode');
        try {
          const webhookData = await generateWebhookData(currentAgent);
          const qrPayload = {
            user_id: user?.id,
            user_name: webhookData.user_name,
            email: webhookData.email,
            plan: webhookData.plan,
            instance_name: webhookData.instance_name
          };

          const qrResponse = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/atualizar-qrcode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(qrPayload)
          });

          if (qrResponse.ok) {
            const responseText = await qrResponse.text();
            console.log('📄 Resposta do webhook /atualizar-qrcode:', responseText.substring(0, 200) + '...');
            
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
              console.log('✅ QR Code atualizado com sucesso');
            } else {
              console.log('⚠️ QR Code não foi atualizado (mantendo o anterior)');
            }
          } else {
            console.log('⚠️ Erro ao atualizar QR Code:', qrResponse.status);
          }
        } catch (fetchError) {
          console.error('❌ Erro de CORS ou rede ao chamar /atualizar-qrcode:', fetchError);
        }
      } catch (error) {
        console.error('❌ Erro ao atualizar QR Code:', error);
      }
    }, 30000);

    return { validationIntervalId, qrUpdateIntervalId };
  };

  useEffect(() => {
    let validationIntervalId: NodeJS.Timeout | null = null;
    let qrUpdateIntervalId: NodeJS.Timeout | null = null;
    
    console.log('🔍 USEEFFECT - Verificando condições para iniciar verificação periódica:');
    console.log('📊 shouldStartPeriodicCheck:', shouldStartPeriodicCheck);
    console.log('📊 qrCodeData:', qrCodeData ? 'EXISTS' : 'NULL');
    console.log('📊 qrCodeLoading:', qrCodeLoading);
    console.log('📊 currentAgent:', currentAgent ? 'EXISTS' : 'NULL');
    console.log('📊 user:', user ? 'EXISTS' : 'NULL');
    console.log('📊 connectionStatus:', connectionStatus);
    
    if (shouldStartPeriodicCheck && qrCodeData && !qrCodeLoading && currentAgent && user && connectionStatus !== 'connected') {
      console.log('✅ CONDIÇÕES ATENDIDAS - INICIANDO VERIFICAÇÃO PERIÓDICA');
      setIsCheckingConnection(true);
      const intervals = checkConnectionPeriodically();
      validationIntervalId = intervals.validationIntervalId;
      qrUpdateIntervalId = intervals.qrUpdateIntervalId;
    } else {
      console.log('❌ CONDIÇÕES NÃO ATENDIDAS - Verificação periódica não iniciada');
    }

    return () => {
      if (validationIntervalId) {
        clearInterval(validationIntervalId);
      }
      if (qrUpdateIntervalId) {
        clearInterval(qrUpdateIntervalId);
      }
      setIsCheckingConnection(false);
    };
  }, [shouldStartPeriodicCheck, qrCodeData, qrCodeLoading, currentAgent, user, connectionStatus]);

  return {
    showQrModal,
    setShowQrModal,
    qrCodeData,
    setQrCodeData,
    qrCodeLoading,
    setQrCodeLoading,
    connectionStatus,
    setConnectionStatus,
    currentAgent,
    setCurrentAgent,
    isCheckingConnection,
    chatwootWebhookCalled,
    setChatwootWebhookCalled,
    shouldStartPeriodicCheck,
    setShouldStartPeriodicCheck,
    currentInstanceName,
    setCurrentInstanceName,
    generateWebhookData,
    checkConnectionPeriodically
  };
}; 