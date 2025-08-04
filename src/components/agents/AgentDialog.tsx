import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { agentTypeOptions, personalityOptions, sectorOptions } from "../dashboard/KnowledgeBase/types";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../integrations/supabase/client";
import { generateFinalPrompt } from "@/utils/promptGenerator";
import { AgentWithConnection } from "../../hooks/useAgents";
import { AgentDocuments } from "./AgentDocuments";

interface AgentDialogProps {
  editAgent: any | null;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
}

export const AgentDialog = ({ editAgent, onClose, onSave, saving }: AgentDialogProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    ai_name: "",
    company_name: "",
    support_email: "",
    agent_type: "customer_service",
    personality: "friendly",
    sectors: [],
    final_prompt: ""
  });
  
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [isPromptEdited, setIsPromptEdited] = useState(false);


  const [selectedSector, setSelectedSector] = useState<string>(editAgent?.sectors?.[0] || "");
  const [customSector, setCustomSector] = useState("");
  const [showCustomSectorInput, setShowCustomSectorInput] = useState(false);
  const [customAgentType, setCustomAgentType] = useState("");
  const [showCustomAgentTypeInput, setShowCustomAgentTypeInput] = useState(false);

  // Carregar dados do agente quando estiver editando
  useEffect(() => {
    const loadAgentData = async () => {
              if (editAgent?.id && user?.id) {
          try {
            const { data, error } = await supabase
              .from('ai_configurations')
              .select('*')
              .eq('id', editAgent.id)
              .single();

            if (error) {
              console.error('Erro ao carregar dados do agente:', error);
              return;
            }

            if (data) {
              const newFormData = {
                ai_name: data.ai_name || "",
                company_name: data.company_name || "",
                support_email: data.support_email || "",
                agent_type: data.agent_type || "customer_service",
                personality: data.personality || "friendly",
                sectors: data.sectors || [],
                final_prompt: data.final_prompt || ""
              };

              setFormData(newFormData);
              setOriginalPrompt(data.final_prompt || "");
              setIsPromptEdited(false);

            // Configurar setores
            if (data.sectors && data.sectors.length > 0) {
              setSelectedSector(data.sectors[0]);
              if (data.sectors[0] === "Others") {
                setShowCustomSectorInput(true);
                setCustomSector(data.sectors[0]);
              }
            }

            // Configurar agent type customizado
            if (data.agent_type && !agentTypeOptions.includes(data.agent_type)) {
              setShowCustomAgentTypeInput(true);
              setCustomAgentType(data.agent_type);
            }
          }
        } catch (error) {
          console.error('❌ Erro ao carregar dados do agente:', error);
        }
      }
    };

    loadAgentData();
  }, [editAgent?.id, user?.id]);

  // Limpar formData quando editAgent mudar
  useEffect(() => {
    if (!editAgent) {
      setFormData({
        ai_name: "",
        company_name: "",
        support_email: "",
        agent_type: "customer_service",
        personality: "friendly",
        sectors: [],
        final_prompt: ""
      });
      setOriginalPrompt("");
      setIsPromptEdited(false);
    }
  }, [editAgent]);

  const handleResetPrompt = () => {
    setFormData(prev => ({ ...prev, final_prompt: originalPrompt }));
    setIsPromptEdited(false);
  };



  const handlePromptChange = (value: string) => {
    setFormData(prev => ({ ...prev, final_prompt: value }));
    setIsPromptEdited(value !== originalPrompt);
  };

  const handleSave = async () => {
    if (!editAgent || !user) return;

    try {
      // Se já existe um final_prompt, mantém ele. Senão, gera um novo
      const finalPrompt = formData.final_prompt || generateFinalPrompt({
        ...formData,
        support_email: formData.support_email || null,
        sectors: formData.sectors.length > 0 ? formData.sectors : null
      });
      
                const { error } = await supabase
            .from("ai_configurations")
                          .upsert({
                id: editAgent.id,
                user_id: user.id,
                ai_name: formData.ai_name,
                company_name: formData.company_name,
                support_email: formData.support_email || null,
                agent_type: formData.agent_type,
                personality: formData.personality,
                sectors: formData.sectors.length > 0 ? formData.sectors : null,
                final_prompt: finalPrompt
              });

      if (error) {
        console.error("❌ Erro ao salvar agente:", error);
        return;
      }

      if (editAgent.id) {
        console.log('🔄 Atualizando final_prompt na whatsapp_connections...');
        
        const { error: updateError } = await supabase
          .from("whatsapp_connections")
          .update({
            final_prompt: finalPrompt
          })
          .eq('user_id', user.id)
          .eq('ai_configuration_id', editAgent.id);

        if (updateError) {
          console.error("❌ Erro ao atualizar final_prompt na whatsapp_connections:", updateError);
        } else {
          console.log("✅ final_prompt atualizado na whatsapp_connections");
        }
      }

      onSave();
    } catch (error) {
      console.error("Error saving agent:", error);
    }
  };

  return (
    <Dialog open={!!editAgent} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editAgent?.id ? 'Edit AGENT' : 'Create New AGENT'}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings">Agent Settings</TabsTrigger>
            <TabsTrigger value="documents" disabled={!editAgent?.id}>
              Knowledge Base
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Agent Name</label>
              <Input
                value={formData.ai_name}
                onChange={(e) => setFormData({...formData, ai_name: e.target.value})}
                placeholder="Enter agent name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <Input
                value={formData.company_name}
                onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                placeholder="Enter company name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Email (Optional)</label>
              <Input
                type="email"
                value={formData.support_email}
                onChange={(e) => setFormData({...formData, support_email: e.target.value})}
                placeholder="e.g. support@mycompany.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Agent Type</label>
              <Select 
                value={formData.agent_type} 
                onValueChange={(value) => {
                  setFormData({...formData, agent_type: value});
                  if (value === "Other") {
                    setShowCustomAgentTypeInput(true);
                  } else {
                    setShowCustomAgentTypeInput(false);
                    setCustomAgentType("");
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {agentTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {showCustomAgentTypeInput && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Custom Agent Type</label>
                  <Input
                    placeholder="Enter your custom agent type"
                    value={customAgentType}
                    onChange={(e) => {
                      setCustomAgentType(e.target.value);
                      setFormData({ ...formData, agent_type: e.target.value });
                    }}
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sectors (Optional)</label>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {sectorOptions.map((sector) => (
                    <div key={sector.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`sector-${sector.value}`}
                        name="sector"
                        checked={selectedSector === sector.value}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSector(sector.value);
                            setFormData({ ...formData, sectors: [sector.value] });
                            if (sector.value === "Others") {
                              setShowCustomSectorInput(true);
                            } else {
                              setShowCustomSectorInput(false);
                              setCustomSector("");
                            }
                          }
                        }}
                        className="border-gray-300 text-pink-500 focus:ring-pink-500"
                      />
                      <label htmlFor={`sector-${sector.value}`} className="text-sm text-gray-700">
                        {sector.label}
                      </label>
                    </div>
                  ))}
                </div>
                {showCustomSectorInput && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Custom Sector</label>
                    <Input
                      placeholder="Enter your custom sector"
                      value={customSector}
                      onChange={(e) => {
                        setCustomSector(e.target.value);
                        setFormData({ ...formData, sectors: e.target.value ? [e.target.value] : [] });
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Personality</label>
              <Select value={formData.personality} onValueChange={(value) => setFormData({...formData, personality: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {personalityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Prompt</label>
                {isPromptEdited && (
                  <Button
                    onClick={handleResetPrompt}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Reset to Original
                  </Button>
                )}
              </div>
              <textarea
                value={formData.final_prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                placeholder="Agent's final prompt..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={8}
              />
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">
                  Edit the prompt manually. Changes will be saved when you click "Save AGENT".
                </p>
                {isPromptEdited && (
                  <span className="text-xs text-orange-600 font-medium">
                    ⚠️ Prompt edited
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save AGENT'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            {editAgent?.id && user?.id && (
              <AgentDocuments
                agentId={editAgent.id}
                userId={user.id}
                onDocumentsChange={onSave}
              />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}; 