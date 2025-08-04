import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../integrations/supabase/client";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Trash2, WifiOff, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import QrCodeDialog from "../components/dashboard/KnowledgeBase/QrCodeDialog";
import { usePageTitle } from "@/hooks/usePageTitle";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../components/ui/alert-dialog";

export default function Connections() {
  usePageTitle("Connections | Skilabot");
  const { user, profile } = useAuth();
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);
  const [currentConnectionId, setCurrentConnectionId] = useState<string | null>(null);
  const [currentInstanceName, setCurrentInstanceName] = useState<string | null>(null);
  const [deleteConnectionId, setDeleteConnectionId] = useState<string | null>(null);
  const [deleteInstanceName, setDeleteInstanceName] = useState<string | null>(null);
  const [validationInterval, setValidationInterval] = useState<NodeJS.Timeout | null>(null);
  const [disconnectConnectionId, setDisconnectConnectionId] = useState<string | null>(null);
  const [disconnectInstanceName, setDisconnectInstanceName] = useState<string | null>(null);

  useEffect(() => {
    const fetchConnections = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("whatsapp_connections")
        .select("id, phone_number, connection_status, connected_at, disconnected_at, ai_configuration_id, evolution_instance_id")
        .eq("user_id", user.id)
        .order("connected_at", { ascending: false });
      setConnections(data || []);
      setLoading(false);
    };
    fetchConnections();
  }, [user]);

  const handleDisconnect = (id: string, instanceName: string) => {
    setDisconnectConnectionId(id);
    setDisconnectInstanceName(instanceName);
  };

  const confirmDisconnect = async () => {
    if (!disconnectConnectionId || !disconnectInstanceName) return;
    setActionLoading(disconnectConnectionId);
    try {
      // Atualizar status no banco
      const { error } = await supabase
        .from("whatsapp_connections")
        .update({
          connection_status: "disconnected",
          disconnected_at: new Date().toISOString(),
        })
        .eq("id", disconnectConnectionId);

      if (error) throw error;

      // Chamar webhook para desconectar no Evolution API
      try {
        const payload = {
          instance_name: disconnectInstanceName,
          user_name: user!.user_metadata?.name || user!.email || "Unknown User",
          user_id: user!.id,
          email: user!.email || ""
        };

        const response = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/Desconectar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Instance disconnected successfully!");
        } else {
          console.error("Webhook response error:", response.status);
        }
      } catch (webhookError) {
        console.error("Error disconnecting via webhook:", webhookError);
        // Continue even if webhook fails, since we already updated the database
      }

      // Atualizar estado local
      setConnections((prev) =>
        prev.map((c) =>
          c.id === disconnectConnectionId ? { ...c, connection_status: "disconnected", disconnected_at: new Date().toISOString() } : c
        )
      );
    } catch (error) {
      console.error("Error disconnecting:", error);
      toast.error("Disconnection failed. Please try again.");
    } finally {
      setActionLoading(null);
      setDisconnectConnectionId(null);
      setDisconnectInstanceName(null);
    }
  };

  const handleDelete = (id: string, instanceName: string) => {
    setDeleteConnectionId(id);
    setDeleteInstanceName(instanceName);
  };

  const confirmDelete = async () => {
    if (!deleteConnectionId || !deleteInstanceName) return;
    setActionLoading(deleteConnectionId);
    try {
      // Delete from database
      const { error } = await supabase.from("whatsapp_connections").delete().eq("id", deleteConnectionId);
      if (error) throw error;

      // Call webhook to delete instance in Evolution API
      try {
        const payload = {
          instance_name: deleteInstanceName,
          user_name: user!.user_metadata?.name || user!.email || "Unknown User",
          user_id: user!.id,
          email: user!.email || ""
        };

        const response = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/Excluir-Instancia`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Instance deleted successfully!");
        } else {
          console.error("Webhook response error:", response.status);
        }
      } catch (webhookError) {
        console.error("Error deleting via webhook:", webhookError);
        // Continue even if webhook fails, since we already deleted from database
      }
      setConnections((prev) => prev.filter((c) => c.id !== deleteConnectionId));
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete connection. Please try again.");
    } finally {
      setActionLoading(null);
      setDeleteConnectionId(null);
      setDeleteInstanceName(null);
    }
  };

  const handleReconnect = async (id: string, instanceName: string) => {
    setActionLoading(id);
    
    try {
      if (!user) throw new Error('User not authenticated');

      // Atualizar o estado antes de processar o QR Code
      setCurrentConnectionId(id);
      setCurrentInstanceName(instanceName);
      setShowQrModal(true);
      setQrLoading(true);

      // Call webhook to generate QR Code
      const payload = {
        user_id: user.id,
        user_name: user.user_metadata?.name || user.email || "Unknown User",
        email: user.email || "",
        plan: profile?.plan || "basic",
        instance_name: instanceName
      };

      // 1. Chamar webhook atualizar-qrcode
      const response = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/atualizar-qrcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error reconnecting: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('atualizar-qrcode response:', responseText);

      // Iniciar a validação periódica
      if (validationInterval) {
        clearInterval(validationInterval);
      }

      const validateConnection = async () => {
        try {
          const validateResponse = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/validar-qrcode-connections`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ instance_name: instanceName }),
          });

          if (!validateResponse.ok) {
            console.error('Error calling validar-qrcode-connections:', validateResponse.status);
            return;
          }

          const validateText = await validateResponse.text();
          console.log('validar-qrcode-connections response:', validateText);

          try {
            const validateData = JSON.parse(validateText);
            if (validateData.state === 'open') {
              // Conexão bem sucedida
              if (validationInterval) {
                clearInterval(validationInterval);
                setValidationInterval(null);
              }
              
              // Atualizar status e fechar modal
              await handleWhatsAppConnectionSuccess();
            }
          } catch (parseError) {
            console.error('Error parsing validation response:', parseError);
          }
        } catch (validateError) {
          console.error('Error calling validar-qrcode-connections:', validateError);
        }
      };

      // Chamar imediatamente e configurar o intervalo
      await validateConnection();
      const interval = setInterval(validateConnection, 15000); // 15 segundos
      setValidationInterval(interval);

      // Processar resposta do QR Code
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
        setQrCodeUrl(qrCodeData);
        setQrLoading(false);
      } else {
        setQrError("QR Code not found or invalid in response");
        setQrLoading(false);
        throw new Error("QR Code not found or invalid in response");
      }
    } catch (error) {
      console.error("Error reconnecting:", error);
      toast.error("Reconnection failed. Please try again.");
      // Não fechar o modal em caso de erro, permitir que o usuário tente novamente
      setQrError("Failed to get QR Code. Please try again.");
      setQrLoading(false);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRefreshQrCode = async () => {
    if (!user || !currentInstanceName) return;
    
    setQrLoading(true);
    setQrError(null);
    
    try {
      const refreshPayload = {
        user_name: user.user_metadata?.name || user.email || "Unknown User",
        user_id: user.id,
        agent_id: currentConnectionId,
        instance_name: currentInstanceName,
        email: user.email || "",
        plan: profile?.plan || "basic"
      };
      
      console.log('Payload sent to update QR Code:', refreshPayload);
      
      const refreshResponse = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/atualizar-qrcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(refreshPayload),
      });
      
      if (!refreshResponse.ok) throw new Error("Error updating QR Code");
      
      const responseText = await refreshResponse.text();
      console.log('Complete update webhook response:', responseText);
      
      let qrCodeData = null;
      
      try {
        const parsedResponse = JSON.parse(responseText);
        console.log('Update response parsed as JSON:', parsedResponse);
        qrCodeData = parsedResponse.qrCode || parsedResponse.base64;
      } catch (jsonError) {
        console.log('Update response is not JSON, treating as base64 string');
        if (responseText && /^[A-Za-z0-9+/=]+$/.test(responseText) && responseText.length > 100) {
          qrCodeData = responseText;
        }
      }
      
      if (qrCodeData && /^[A-Za-z0-9+/=]+$/.test(qrCodeData) && qrCodeData.length > 100) {
        setQrCodeUrl(qrCodeData);
      } else {
        throw new Error("Updated QR Code is not valid");
      }
    } catch (err: any) {
      console.error('Complete error updating QR Code:', err);
      setQrError("Could not update QR Code. Please try again.");
    } finally {
      setQrLoading(false);
    }
  };

  const handleWhatsAppConnectionSuccess = async () => {
    console.log('WhatsApp connection successful, updating state...');
    
    if (currentConnectionId) {
      try {
        // Atualizar o status no banco para "connected"
        const { error } = await supabase
          .from("whatsapp_connections")
          .update({
            connection_status: "connected",
            connected_at: new Date().toISOString(),
            disconnected_at: null,
          })
          .eq("id", currentConnectionId);

        if (error) throw error;

        // Atualizar o estado local
        setConnections((prev) =>
          prev.map((c) =>
            c.id === currentConnectionId ? { 
              ...c, 
              connection_status: "connected", 
              connected_at: new Date().toISOString(),
              disconnected_at: null
            } : c
          )
        );
        
        toast.success("WhatsApp connected successfully!");
      } catch (error) {
        console.error("Error updating connection status:", error);
        toast.error("Connection status update failed. Please refresh the page.");
      }
    }
    
    // Limpar os estados do modal
    setShowQrModal(false);
    setCurrentConnectionId(null);
    setCurrentInstanceName(null);
    setQrCodeUrl(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Connected</Badge>;
      case 'connecting':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Connecting</Badge>;
      case 'disconnected':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Disconnected</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8 mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-6">
        Connections
      </h1>

      {/* Seção de Conexões Existentes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Existing Connections</h2>
          <Badge variant="outline" className="text-sm">
            {connections.length} connection{connections.length !== 1 ? 's' : ''}
          </Badge>
        </div>
        
        <div className="grid gap-6">
          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading...</div>
          ) : connections.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-gray-500 mb-4">No connections found.</div>
              <p className="text-sm text-gray-400">
                Go to Dashboard and configure your first AI Agent to get started.
              </p>
            </Card>
          ) : (
            connections.map((conn) => (
              <Card key={conn.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(conn.connection_status)}
                    <span className="text-sm text-gray-500 font-mono">
                      {conn.evolution_instance_id}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {conn.connection_status === 'connected' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(conn.id, conn.evolution_instance_id)}
                        disabled={actionLoading === conn.id}
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                      >
                        <WifiOff className="h-4 w-4 mr-1" />
                        {actionLoading === conn.id ? "Disconnecting..." : "Disconnect"}
                      </Button>
                    )}
                    {conn.connection_status === 'disconnected' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReconnect(conn.id, conn.evolution_instance_id)}
                        disabled={actionLoading === conn.id}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        {actionLoading === conn.id ? "Reconnecting..." : "Reconnect"}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(conn.id, conn.evolution_instance_id)}
                      disabled={actionLoading === conn.id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {actionLoading === conn.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Number:</span>
                    <div className="text-gray-600">
                      {conn.phone_number || <span className="italic">Not provided</span>}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Agent ID:</span>
                    <div className="text-gray-600 font-mono text-xs">
                      {conn.ai_configuration_id}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Connected at:</span>
                    <div className="text-gray-600">
                      {conn.connected_at 
                        ? new Date(conn.connected_at).toLocaleString('en-US')
                        : <span className="italic">-</span>
                      }
                    </div>
                  </div>
                  {conn.disconnected_at && (
                    <div>
                      <span className="font-medium text-gray-700">Disconnected at:</span>
                      <div className="text-gray-600">
                        {new Date(conn.disconnected_at).toLocaleString('en-US')}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <QrCodeDialog
        showQrModal={showQrModal}
        setShowQrModal={(show) => {
          if (!show) {
            // Quando o modal é fechado, limpar os estados
            setQrCodeUrl(null);
            setQrError(null);
            setQrLoading(false);
            setShowQrModal(false);
            
            // Limpar o intervalo de validação
            if (validationInterval) {
              clearInterval(validationInterval);
              setValidationInterval(null);
            }
            
            // Não limpar currentConnectionId e currentInstanceName para manter o botão Reconnect
          } else {
            setShowQrModal(true);
          }
        }}
        qrCodeData={qrCodeUrl ? `data:image/png;base64,${qrCodeUrl}` : ''}
        setQrCodeData={setQrCodeUrl}
        qrCodeLoading={qrLoading}
        setQrCodeLoading={setQrLoading}
        connectionStatus={qrError ? 'error' : qrLoading ? 'loading' : qrCodeUrl ? 'waiting' : 'initializing'}
        setConnectionStatus={() => {}}
        onRefreshQrCode={handleRefreshQrCode}
        agent={{
          id: currentConnectionId || '',
          instance_name: currentInstanceName
        }}
        onConnectionSuccess={handleWhatsAppConnectionSuccess}
        generateWebhookData={async (agent) => {
          // Verificar se o usuário já possui uma account_id na tabela chatwoot_accounts
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

          return {
            user_name: user?.user_metadata?.name || user?.email || "Unknown User",
            user_id: user?.id,
            email: user?.email || "",
            plan: profile?.plan || "basic",
            instance_name: agent.instance_name,
            account_id: accountId
          };
        }}
      />
      <AlertDialog open={!!deleteConnectionId} onOpenChange={open => !open && setDeleteConnectionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Connection</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this WhatsApp connection? This action cannot be undone and will completely remove the connection from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Dialog de confirmação de desconexão */}
      <AlertDialog open={!!disconnectConnectionId} onOpenChange={open => !open && setDisconnectConnectionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect WhatsApp</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disconnect this WhatsApp connection? The connection will be disconnected, but not deleted. You can reconnect later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDisconnect}>Disconnect</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}