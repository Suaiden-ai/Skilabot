import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../integrations/supabase/client";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Trash2, WifiOff, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { QrCodeDialog } from "../components/dashboard/KnowledgeBase/QrCodeDialog";
import { generateChatwootPassword } from "../utils/chatwootHelpers";
import { usePageTitle } from "@/hooks/usePageTitle";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../components/ui/alert-dialog";

export default function WhatsappConnections() {
  usePageTitle("WhatsApp Connections | Skilabot");
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
  // Adicionar estado para controle do modal de desconexão
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
    setCurrentConnectionId(id);
    setCurrentInstanceName(instanceName);
    setQrLoading(true);
    setQrError(null);
    setShowQrModal(true);
    
    try {
      if (!user) throw new Error('User not authenticated');
      
      // Get user's agent count
      const { count: agentsCount } = await supabase
        .from('ai_configurations')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Update status to connecting
      const { error } = await supabase
        .from("whatsapp_connections")
        .update({
          connection_status: "connecting",
          disconnected_at: null,
        })
        .eq("id", id);

      if (error) throw error;

      // Generate password: email+phone in base64 (first 10 characters)
      const userEmail = user.email || "";
      const userPhone = user.phone || "";
      const passwordBase = generateChatwootPassword(userEmail, userPhone);

      // 1. Call chatwoot webhook first
      const chatwootPayload = {
        user_name: user.user_metadata?.name || user.email || "Unknown User",
        user_id: user.id,
        agent_id: id,
        instance_name: instanceName,
        email: userEmail,
        password: passwordBase,
        plan: profile?.plan || null,
        agents_count: agentsCount || 0
      };
      
      console.log('Payload sent to chatwoot webhook:', chatwootPayload);
      
      const chatwootResponse = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/chatwoot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatwootPayload),
      });
      
      if (!chatwootResponse.ok) throw new Error("Error integrating with Chatwoot");
      
      const chatwootData = await chatwootResponse.json();
      console.log('Chatwoot webhook response:', chatwootData);
      
      // Buscar qualquer linha do usuário que tenha id_chatwoot preenchido
      let id_chatwoot = null;
      let user_id_chatwoot = null;
      const { data: allAccounts } = await supabase
        .from('chatwoot_accounts')
        .select('*')
        .eq('user_id', user.id);
      console.log('Linhas chatwoot_accounts encontradas:', allAccounts);
      if (allAccounts && allAccounts.length > 0) {
        const withIdChatwoot = allAccounts.find(acc => !!acc.id_chatwoot);
        if (withIdChatwoot) {
          id_chatwoot = withIdChatwoot.id_chatwoot;
          user_id_chatwoot = withIdChatwoot.user_id_chatwoot;
        }
      }
      console.log('id_chatwoot selecionado:', id_chatwoot);

      // 2. Then call webhook to generate QR Code
      const chatwootPayloadWithId = {
        user_name: user.user_metadata?.name || user.email || "Unknown User",
        user_id: user.id,
        agent_id: id,
        instance_name: instanceName,
        email: userEmail,
        password: passwordBase,
        id_chatwoot,
        user_id_chatwoot
      };
      console.log('Payload FINAL enviado para validar-qrcode:', chatwootPayloadWithId);
      const refreshResponse = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/validar-qrcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatwootPayloadWithId),
      });
      
      if (!refreshResponse.ok) throw new Error("Error obtaining QR Code");
      
      const responseText = await refreshResponse.text();
      console.log('Complete webhook response:', responseText);
      
      let qrCodeData = null;
      
      try {
        const parsedResponse = JSON.parse(responseText);
        console.log('Response parsed as JSON:', parsedResponse);
        qrCodeData = parsedResponse.qrCode || parsedResponse.base64;
      } catch (jsonError) {
        console.log('Response is not JSON, treating as base64 string');
        if (responseText && /^[A-Za-z0-9+/=]+$/.test(responseText) && responseText.length > 100) {
          qrCodeData = responseText;
        }
      }
      
      if (qrCodeData && /^[A-Za-z0-9+/=]+$/.test(qrCodeData) && qrCodeData.length > 100) {
        setQrCodeUrl(qrCodeData);
      } else {
        throw new Error("QR Code not found or invalid in response");
      }

      setConnections((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, connection_status: "connecting", disconnected_at: null } : c
        )
      );
    } catch (error) {
      console.error("Error reconnecting:", error);
      toast.error("Reconnection failed. Please try again.");
      setShowQrModal(false);
    } finally {
      setActionLoading(null);
      setQrLoading(false);
    }
  };

  const handleRefreshQrCode = async () => {
    if (!user || !currentInstanceName) return;
    
    setQrLoading(true);
    setQrError(null);
    
    try {
      // Generate password: email+phone in base64 (first 10 characters)
      const userEmail = user.email || "";
      const userPhone = user.phone || "";
      const passwordBase = generateChatwootPassword(userEmail, userPhone);

      const refreshPayload = {
        user_name: user.user_metadata?.name || user.email || "Unknown User",
        user_id: user.id,
        agent_id: currentConnectionId,
        instance_name: currentInstanceName,
        email: userEmail,
        password: passwordBase
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

  const handleWhatsAppConnectionSuccess = () => {
    console.log('WhatsApp connection successful, updating local state...');
    
    if (currentConnectionId) {
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
    }
    
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
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Connections</h1>
      <div className="flex items-center justify-between">
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

      <QrCodeDialog
        showQrModal={showQrModal}
        setShowQrModal={setShowQrModal}
        qrCodeUrl={qrCodeUrl}
        setQrCodeUrl={setQrCodeUrl}
        qrLoading={qrLoading}
        qrError={qrError}
        onRefreshQrCode={handleRefreshQrCode}
        configId={currentConnectionId || ''}
        onConnectionSuccess={handleWhatsAppConnectionSuccess}
        instanceName={currentInstanceName || undefined}
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
