import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { PlusIcon, MessageSquare, LayoutGrid, List, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "@/hooks/usePageTitle";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../components/ui/alert-dialog";
import { KnowledgeBaseChat } from "../components/dashboard/KnowledgeBase/KnowledgeBaseChat";
import { ChatMessage } from "../components/dashboard/KnowledgeBase/types";
import { useAgents, AgentWithConnection } from "../hooks/useAgents";
import { useWhatsAppConnection } from "../hooks/useWhatsAppConnection";
import { AgentCard } from "../components/agents/AgentCard";
import { AgentDialog } from "../components/agents/AgentDialog";
import { WhatsAppQRModal } from "../components/agents/WhatsAppQRModal";
import { AgentEmbed } from "../components/agents/AgentEmbed";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../integrations/supabase/client";
import { generateFinalPrompt } from "../utils/promptGenerator";

export default function Agents() {
  usePageTitle("Agents | Skilabot");
  const { user } = useAuth();
  const navigate = useNavigate();
  const { agents, loading, fetchAgents } = useAgents();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editAgent, setEditAgent] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteAgentId, setDeleteAgentId] = useState<string | null>(null);
  const [testAgent, setTestAgent] = useState<AgentWithConnection | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [embedAgent, setEmbedAgent] = useState<AgentWithConnection | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  
  // Estado para o KnowledgeBaseChat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [testMessageCount, setTestMessageCount] = useState(0);
  const [hasCompletedTest, setHasCompletedTest] = useState(false);
  const [conversationId, setConversationId] = useState('');

  // Hook para WhatsApp Connection
  const {
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
  } = useWhatsAppConnection(fetchAgents);

  // Handlers para ações dos agentes
  const handleEdit = (agent: AgentWithConnection) => {
    setEditAgent(agent);
  };

  const handleDelete = async (id: string) => {
    setDeleteAgentId(id);
  };

  const confirmDelete = async () => {
    if (!deleteAgentId) return;

    try {
      // Buscar o instance_name do agente antes de deletar
      const { data: connectionData } = await supabase
        .from("whatsapp_connections")
        .select("evolution_instance_id")
        .eq("ai_configuration_id", deleteAgentId)
        .eq("user_id", user?.id)
        .maybeSingle();

      const instanceName = connectionData?.evolution_instance_id;

      // Chamar webhook para excluir instância se existir
      if (instanceName) {
        try {
          const deleteInstancePayload = {
            user_id: user?.id,
            user_name: user?.user_metadata?.name || user?.email || "Unknown User",
            email: user?.email || "",
            plan: "basic",
            instance_name: instanceName
          };

          const deleteResponse = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/Excluir-Instancia`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deleteInstancePayload)
          });

          if (deleteResponse.ok) {
            await deleteResponse.text();
          }
        } catch (webhookError) {
          // Erro ao chamar webhook de exclusão de instância
        }
      }

      // Delete WhatsApp connections first
      await supabase
        .from("whatsapp_connections")
        .delete()
        .eq("ai_configuration_id", deleteAgentId);

      // Delete the agent
      const { error } = await supabase
        .from("ai_configurations")
        .delete()
        .eq("id", deleteAgentId);

      if (error) {
        return;
      }

      // Remove from state
      fetchAgents();
      setDeleteAgentId(null);
    } catch (error) {
      // Error deleting agent
    }
  };

  const handleCreate = () => {
    setEditAgent({
      ai_name: "",
      company_name: "",
      agent_type: "customer_service",
      personality: "friendly",
      
    });
  };

  const handleSave = async () => {
      setEditAgent(null);
    fetchAgents();
  };

  // Handlers para WhatsApp Connection
  const handleConnectWhatsApp = async (agent: AgentWithConnection) => {
    console.log('🚀 handleConnectWhatsApp chamado para agente:', agent.id);
    console.log('📊 Agent details:', {
      id: agent.id,
      ai_name: agent.ai_name,
      has_connection_history: agent.has_connection_history,
      evolution_instance_id: agent.evolution_instance_id
    });
    
    const isReconnection = agent.has_connection_history && agent.evolution_instance_id;
    console.log('🔄 É reconexão?', isReconnection);
    
    setCurrentAgent(agent);
    setShowQrModal(true);
    setQrCodeLoading(true);
    setConnectionStatus('initializing');
    setQrCodeData('');

    try {
      if (isReconnection) {
        // FLUXO DE RECONEXÃO
        const payload = {
              user_id: user?.id,
          user_name: user?.user_metadata?.name || user?.email || "Unknown User",
          email: user?.email || "",
          plan: "basic",
          instance_name: agent.evolution_instance_id
        };

        const response = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/atualizar-qrcode`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
      });

      if (!response.ok) {
          throw new Error(`Error reconnecting: ${response.status}`);
        }

        const responseText = await response.text();

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
          setQrCodeLoading(false);
          console.log('✅ QR Code válido encontrado, iniciando verificação periódica');
          setShouldStartPeriodicCheck(true);
        } else {
          setQrCodeLoading(false);
          setConnectionStatus('error');
          console.log('❌ QR Code inválido ou não encontrado');
          throw new Error("QR Code not found or invalid in reconnection response");
        }

      } else {
        // FLUXO DE PRIMEIRA CONEXÃO
        try {
          const webhookData = await generateWebhookData(agent);
        
        const chatwootResponse = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/chatwoot`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookData)
        });

        if (chatwootResponse.ok) {
          const chatwootText = await chatwootResponse.text();
          
          let chatwootData = null;
          try {
            chatwootData = chatwootText ? JSON.parse(chatwootText) : null;
          } catch (e) {
            // Resposta do /chatwoot não é JSON válido
          }

        if (chatwootData && chatwootData.user_id) {
          try {
            const edgeResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/save-chatwoot-account`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
              },
              body: JSON.stringify(chatwootData)
            });
            await edgeResponse.text();
          } catch (err) {
            // Erro ao chamar Edge Function save-chatwoot-account
          }
        }

        try {
          const qrPayload = {
            user_id: user?.id,
            user_name: webhookData.user_name,
            email: webhookData.email,
            plan: webhookData.plan,
            instance_name: webhookData.instance_name
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
            setQrCodeLoading(false);
            console.log('✅ QR Code válido encontrado (primeira conexão), iniciando verificação periódica');
            setShouldStartPeriodicCheck(true);
          } else {
            setQrCodeLoading(false);
            setConnectionStatus('error');
            console.log('❌ QR Code inválido ou não encontrado (primeira conexão)');
            setShouldStartPeriodicCheck(false);
          }
        } else {
          setQrCodeLoading(false);
          setConnectionStatus('error');
          setShouldStartPeriodicCheck(false);
        }
      } catch (fetchError) {
        setQrCodeLoading(false);
        setConnectionStatus('error');
        setShouldStartPeriodicCheck(false);
      }
    } else {
      setQrCodeLoading(false);
      setConnectionStatus('error');
      setShouldStartPeriodicCheck(false);
    }
  } catch (fetchError) {
    setQrCodeLoading(false);
    setConnectionStatus('error');
    setShouldStartPeriodicCheck(false);
  }
      }
    } catch (error) {
      setQrCodeLoading(false);
      setConnectionStatus('error');
      setShouldStartPeriodicCheck(false);
    }
  };

  const handleDisconnectWhatsApp = async (agent: AgentWithConnection) => {
    try {
      try {
        const { data: connectionData } = await supabase
          .from('whatsapp_connections')
          .select('evolution_instance_id')
          .eq('user_id', user?.id)
          .eq('ai_configuration_id', agent.id)
          .maybeSingle();

        const disconnectPayload = {
          user_id: user?.id,
          user_name: user?.user_metadata?.name || user?.email || "Usuário desconhecido",
          agent_id: agent.id,
          email: user?.email || "",
          plan: "basic",
          instance_name: connectionData?.evolution_instance_id || null
        };

        const disconnectResponse = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/Desconectar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(disconnectPayload)
        });

        if (disconnectResponse.ok) {
          await disconnectResponse.text();
        }
      } catch (fetchError) {
        // Erro ao chamar webhook de desconexão
      }

      const { error } = await supabase
        .from('whatsapp_connections')
        .update({
          connection_status: 'disconnected',
          disconnected_at: new Date().toISOString()
        })
        .eq('user_id', user?.id)
        .eq('ai_configuration_id', agent.id);

      if (error) {
        return;
      }

      fetchAgents();
    } catch (error) {
      // Erro ao desconectar WhatsApp
    }
  };

  // Função para atualizar o QR Code
  const onRefreshQrCode = async () => {
    if (!currentAgent) return;
    
    setQrCodeLoading(true);
    setConnectionStatus('initializing');
    
    try {
      const webhookData = await generateWebhookData(currentAgent);
      
      const qrPayload = {
        user_id: user?.id,
        user_name: webhookData.user_name,
        email: webhookData.email,
        plan: webhookData.plan,
        instance_name: webhookData.instance_name
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
                  setQrCodeLoading(false);
                  setShouldStartPeriodicCheck(true);
                } else {
                  setQrCodeLoading(false);
                  setConnectionStatus('error');
                }
              } else {
                setQrCodeLoading(false);
                setConnectionStatus('error');
                setShouldStartPeriodicCheck(false);
              }
            } catch (error) {
              setQrCodeLoading(false);
              setConnectionStatus('error');
              setShouldStartPeriodicCheck(false);
            }
  };

  const closeChatbot = () => {
    setShowChatbot(false);
    setTestAgent(null);
    setMessages([]);
    setInputMessage('');
    setTestMessageCount(0);
    setHasCompletedTest(false);
    setConversationId('');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !testAgent || !user) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsChatLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/chatbot-dashboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          {
            headers: {
              "content-type": "application/json",
              "user-agent": navigator.userAgent,
              "accept": "*/*",
              "accept-language": navigator.language
            },
            params: {},
            query: {},
            body: {
              message: userMessage.text,
              agent_id: testAgent.id,
              agent_name: testAgent.ai_name,
              company_name: testAgent.company_name,
              conversation_id: conversationId,
              user_id: user?.id,
              final_prompt: generateFinalPrompt({
                ai_name: testAgent.ai_name,
                company_name: testAgent.company_name,
                agent_type: testAgent.agent_type,
                personality: testAgent.personality,
                custom_prompt: testAgent.custom_prompt
              })
            },
            webhookUrl: `${import.meta.env.VITE_NWH_BASE_URL}/webhook/chatbot-dashboard`,
            executionMode: "production"
          }
        ])
      });

      if (!response.ok) {
        return;
      }
    
      const responseData = await response.text();
      let botResponse;
      try {
        const jsonResponse = JSON.parse(responseData);
        if (typeof jsonResponse === 'string' && jsonResponse.includes('{"output":')) {
          try {
            const outputJson = JSON.parse(jsonResponse);
            botResponse = outputJson.output;
          } catch {
            botResponse = jsonResponse;
          }
            } else {
          botResponse = jsonResponse.response || jsonResponse.message || jsonResponse.output || responseData;
        }
      } catch (e) {
        if (responseData.includes('{"output":')) {
          try {
            const outputJson = JSON.parse(responseData);
            botResponse = outputJson.output;
          } catch {
            botResponse = responseData;
            }
          } else {
          botResponse = responseData;
        }
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse || 'Sorry, I could not process your message.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setTestMessageCount(prev => prev + 1);

      if (!conversationId) {
        setConversationId(`test_${Date.now()}`);
      }
    } catch (error) {
      // Error in chat
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleTestChatbot = (agent: AgentWithConnection) => {
    setTestAgent(agent);
    setShowChatbot(true);
    setMessages([]);
    setInputMessage('');
    setTestMessageCount(0);
    setHasCompletedTest(false);
    setConversationId(`test_agent_${agent.id}`);
  };

  const handleEmbedAgent = (agent: AgentWithConnection) => {
    setEmbedAgent(agent);
    setShowEmbedModal(true);
  };

  const closeQrModal = () => {
    setShowQrModal(false);
    setShouldStartPeriodicCheck(false);
    setChatwootWebhookCalled(false);
    setConnectionStatus('initializing');
    setQrCodeData('');
    setQrCodeLoading(false);
    setCurrentInstanceName('');
  };

  const closeEmbedModal = () => {
    setShowEmbedModal(false);
    setEmbedAgent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16 lg:pt-0">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header Section */}
        <div className="mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-6">
            <div>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                My AI Agents
              </h1>
              <p className="text-xs sm:text-base lg:text-lg text-gray-600">Manage your AI assistants for WhatsApp</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1 self-center sm:self-auto">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                onClick={() => navigate('/create-agent')} 
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-3 sm:px-6 py-2 h-auto text-xs sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Create New AGENT
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8 sm:py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 border-4 border-pink-500 border-t-transparent mx-auto mb-3 sm:mb-6"></div>
              <p className="text-gray-600 text-sm sm:text-xl font-medium">Loading your agents...</p>
            </div>
          </div>
        ) : agents.length === 0 ? (
          <div className="flex items-center justify-center py-8 sm:py-20">
            <Card className="p-6 sm:p-16 text-center max-w-lg mx-auto bg-white shadow-xl border-0">
              <div className="space-y-4 sm:space-y-8">
                <div className="w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <MessageSquare className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">No AGENT created yet</h3>
                  <p className="text-xs sm:text-base lg:text-lg text-gray-600">Create your first AI assistant for WhatsApp</p>
                </div>
                <Button 
                  onClick={() => navigate('/create-agent')} 
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  <PlusIcon className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> Create First AGENT
                </Button>
              </div>
            </Card>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-2 sm:space-y-4">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onTest={handleTestChatbot}
                onConnect={handleConnectWhatsApp}
                onDisconnect={handleDisconnectWhatsApp}
                onEmbed={handleEmbedAgent}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 items-start">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onTest={handleTestChatbot}
                onConnect={handleConnectWhatsApp}
                onDisconnect={handleDisconnectWhatsApp}
                onEmbed={handleEmbedAgent}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dialog de edição/criação de agent */}
      <AgentDialog
        editAgent={editAgent}
        onClose={() => setEditAgent(null)}
        onSave={handleSave}
        saving={saving}
      />

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={!!deleteAgentId} onOpenChange={open => !open && setDeleteAgentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete AGENT</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this AGENT? This action cannot be undone and will remove all related WhatsApp connections and prompt history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal de QR Code WhatsApp */}
      {currentAgent && (
        <WhatsAppQRModal
          showQrModal={showQrModal}
          onClose={closeQrModal}
          qrCodeData={qrCodeData}
          qrCodeLoading={qrCodeLoading}
          connectionStatus={connectionStatus}
          onRefreshQrCode={onRefreshQrCode}
        />
      )}

             {/* Chatbot de teste */}
       {showChatbot && testAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeChatbot}></div>
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl h-[90vh] sm:h-[80vh] max-h-[600px] flex flex-col">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-semibold truncate">Test Chatbot - {testAgent?.ai_name}</h2>
              </div>
              <button
                onClick={closeChatbot}
                className="ml-auto p-1 sm:p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-label="Close chatbot"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
             <div className="flex-1 min-h-0 overflow-hidden">
               <KnowledgeBaseChat
                 config={{
                   id: testAgent.id,
                   ai_name: testAgent.ai_name,
                   company_name: testAgent.company_name,
                   agent_type: testAgent.agent_type,
                   personality: testAgent.personality,
                   custom_prompt: testAgent.custom_prompt,
                   final_prompt: null,
                   has_tested: false
                 }}
                 messages={messages}
                 inputMessage={inputMessage}
                 setInputMessage={setInputMessage}
                 handleSendMessage={handleSendMessage}
                 isChatLoading={isChatLoading}
                 testMessageCount={testMessageCount}
                 hasCompletedTest={hasCompletedTest}
                 setStep={() => {}}
                 conversationId={conversationId}
               />
             </div>
          </div>
        </div>
       )}

      {/* Modal de Embed */}
      {showEmbedModal && embedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeEmbedModal}></div>
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] max-h-[800px] flex flex-col">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-semibold truncate">
                  Embed Chatbot - {embedAgent?.ai_name}
                </h2>
              </div>
              <button
                onClick={closeEmbedModal}
                className="ml-auto p-1 sm:p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-label="Close embed modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
              <AgentEmbed
                agentId={embedAgent.id}
                userId={user?.id || ''}
                agentName={embedAgent.ai_name}
                onClose={closeEmbedModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
