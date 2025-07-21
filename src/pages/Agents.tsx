import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { useEffect, useState } from "react";
import { PencilIcon, Trash2Icon, PlusIcon, MessageSquare, Mic, Image, Users, Smartphone, CheckCircle2 } from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { useAuth } from "../contexts/AuthContext";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";
import { agentTypeOptions, personalityOptions } from "../components/dashboard/KnowledgeBase/types";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "@/hooks/usePageTitle";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../components/ui/alert-dialog";

interface AgentWithConnection {
  id: string;
  ai_name: string;
  company_name: string;
  agent_type: string;
  personality: string;
  custom_prompt: string | null;
  whatsapp_connected: boolean;
  phone_number?: string;
}

export default function Agents() {
  usePageTitle("Agents | Skilabot");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [agents, setAgents] = useState<AgentWithConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editAgent, setEditAgent] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteAgentId, setDeleteAgentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      if (!user) return;
      setLoading(true);
      
      // Fetch agents with their WhatsApp connection status
      const { data: agentsData, error: agentsError } = await supabase
        .from("ai_configurations")
        .select("id, ai_name, company_name, agent_type, personality, custom_prompt")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (agentsError) {
        console.error("Error fetching agents:", agentsError);
        setLoading(false);
        return;
      }

      // Fetch WhatsApp connections for each agent
      const agentsWithConnections = await Promise.all(
        (agentsData || []).map(async (agent) => {
          const { data: connectionData } = await supabase
            .from("whatsapp_connections")
            .select("connection_status, phone_number")
            .eq("ai_configuration_id", agent.id)
            .eq("user_id", user.id)
            .single();

          return {
            ...agent,
            whatsapp_connected: connectionData?.connection_status === 'connected',
            phone_number: connectionData?.phone_number
          };
        })
      );

      setAgents(agentsWithConnections);
      setLoading(false);
    };
    
    fetchAgents();
  }, [user]);

  const handleEdit = (agent: any) => {
    setEditAgent({ ...agent });
  };

  const handleDelete = async (id: string) => {
    setDeleteAgentId(id);
  };

  const confirmDelete = async () => {
    if (!deleteAgentId) return;
    // 1. Deleta whatsapp_connections
    const { error: whatsappError } = await supabase
      .from("whatsapp_connections")
      .delete()
      .eq("ai_configuration_id", deleteAgentId)
      .eq("user_id", user?.id);

    if (whatsappError) {
      alert("Error deleting WhatsApp connections: " + whatsappError.message);
      setDeleteAgentId(null);
      return;
    }

    // 2. Deleta prompt_history
    const { error: promptError } = await supabase
      .from("prompt_history")
      .delete()
      .eq("ai_configuration_id", deleteAgentId)
      .eq("user_id", user?.id);

    if (promptError) {
      alert("Error deleting prompt history: " + promptError.message);
      setDeleteAgentId(null);
      return;
    }

    // 3. Deleta ai_configurations
    const { error: agentError } = await supabase
      .from("ai_configurations")
      .delete()
      .eq("id", deleteAgentId);

    if (agentError) {
      alert("Error deleting AGENT: " + agentError.message);
      setDeleteAgentId(null);
      return;
    }

    setAgents((prev) => prev.filter((a) => a.id !== deleteAgentId));
    setDeleteAgentId(null);
  };

  const handleCreate = () => {
    navigate("/dashboard", { state: { section: "knowledge-base" } });
  };

  const handleSave = async () => {
    if (!editAgent) return;
    setSaving(true);
    await supabase
      .from("ai_configurations")
      .update({
        ai_name: editAgent.ai_name,
        company_name: editAgent.company_name,
        agent_type: editAgent.agent_type,
        personality: editAgent.personality,
        custom_prompt: editAgent.custom_prompt,
      })
      .eq("id", editAgent.id);
    setAgents((prev) =>
      prev.map((a) => (a.id === editAgent.id ? { ...a, ...editAgent } : a))
    );
    setSaving(false);
    setEditAgent(null);
  };

  const agentCapabilities = [
    {
      icon: MessageSquare,
      title: "Automatic Text Response",
      description: "Responds to text messages automatically",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Mic,
      title: "Audio Response",
      description: "Processes and responds to audio messages",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Image,
      title: "Image Response",
      description: "Analyzes and responds to messages with images",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Users,
      title: "Manual Intervention",
      description: "Allows you to take over the conversation when needed",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My AGENTs
          </h1>
          <p className="text-gray-600 mt-1">Manage your AI assistants for WhatsApp</p>
        </div>
        <Button onClick={handleCreate} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <PlusIcon className="w-4 h-4 mr-2" /> Create New AGENT
        </Button>
      </div>

      {loading ? (
        <div className="col-span-full text-center text-gray-500 py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          Loading your agents...
        </div>
      ) : agents.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500 space-y-4">
            <MessageSquare className="w-16 h-16 mx-auto text-gray-300" />
            <div>
              <h3 className="text-lg font-medium text-gray-700">No AGENT created yet</h3>
              <p className="text-sm">Create your first AI assistant for WhatsApp</p>
            </div>
            <Button onClick={handleCreate} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <PlusIcon className="w-4 h-4 mr-2" /> Create First AGENT
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Agent Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg">
                        {agent.ai_name?.[0] || "A"}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-xl text-gray-800">{agent.ai_name}</h3>
                          {agent.whatsapp_connected ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              WhatsApp Connected
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-gray-300 text-gray-600">
                              <Smartphone className="w-3 h-3 mr-1" />
                              Not Connected
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 font-medium">{agent.company_name}</p>
                        {agent.phone_number && (
                          <p className="text-sm text-gray-500">{agent.phone_number}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons - Aligned to the right */}
                    <div className="flex gap-2 flex-shrink-0 self-start">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(agent)}>
                        <PencilIcon className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(agent.id)}>
                        <Trash2Icon className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Type:</span>
                      <p className="text-gray-800">{agent.agent_type}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Personality:</span>
                      <p className="text-gray-800">{agent.personality}</p>
                    </div>
                  </div>
                </div>

                {/* Agent Capabilities */}
                <div className="lg:w-96">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    AGENT Capabilities
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {agentCapabilities.map((capability, index) => {
                      const Icon = capability.icon;
                      return (
                        <div key={index} className={`p-3 rounded-lg ${capability.bgColor} border`}>
                          <Icon className={`w-5 h-5 ${capability.color} mb-1`} />
                          <h5 className="font-medium text-xs text-gray-800 mb-1">{capability.title}</h5>
                          <p className="text-xs text-gray-600 leading-tight">{capability.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de edição */}
      <Dialog open={!!editAgent} onOpenChange={(open) => !open && setEditAgent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit AGENT</DialogTitle>
          </DialogHeader>
          {editAgent && (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={editAgent.ai_name || ""}
                  onChange={e => setEditAgent({ ...editAgent, ai_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <Input
                  value={editAgent.company_name || ""}
                  onChange={e => setEditAgent({ ...editAgent, company_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <Select
                  value={editAgent.agent_type || ""}
                  onValueChange={value => setEditAgent({ ...editAgent, agent_type: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent type" />
                  </SelectTrigger>
                  <SelectContent>
                    {agentTypeOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Personality</label>
                <Select
                  value={editAgent.personality || ""}
                  onValueChange={value => setEditAgent({ ...editAgent, personality: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select personality" />
                  </SelectTrigger>
                  <SelectContent>
                    {personalityOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Custom prompt</label>
                <Input
                  value={editAgent.custom_prompt || ""}
                  onChange={e => setEditAgent({ ...editAgent, custom_prompt: e.target.value })}
                  placeholder="E.g.: Always respond succinctly and politely."
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={saving}>
                  Save
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

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
    </div>
  );
}
