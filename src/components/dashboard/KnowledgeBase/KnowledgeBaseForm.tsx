
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Building2, Palette, MessageSquare } from "lucide-react";
import { agentTypeOptions, personalityOptions } from "./types";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { usePlanValidation } from "@/hooks/usePlanValidation";
import { toast } from "sonner";

interface KnowledgeBaseFormProps {
  onNext: () => void;
  onAgentCreated: (agentId: string) => void;
}

export default function KnowledgeBaseForm({ onNext, onAgentCreated }: KnowledgeBaseFormProps) {
  const { user } = useAuth();
  const { checkCanCreateAgent } = usePlanValidation();
  const [formData, setFormData] = useState({
    ai_name: "",
    company_name: "",
    agent_type: "",
    personality: "",
    custom_prompt: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create an agent");
      return;
    }

    // Verificar se pode criar um novo agent
    const canCreate = await checkCanCreateAgent();
    if (!canCreate) {
      return; // O toast de erro já foi mostrado pelo hook
    }

    if (!formData.ai_name || !formData.company_name || !formData.agent_type || !formData.personality) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("ai_configurations")
        .insert({
          user_id: user.id,
          ai_name: formData.ai_name,
          company_name: formData.company_name,
          agent_type: formData.agent_type,
          personality: formData.personality,
          custom_prompt: formData.custom_prompt || null
        })
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar configuração:", error);
        toast.error("Error creating agent. Please try again.");
        return;
      }

      toast.success("Agent created successfully!");
      onAgentCreated(data.id);
      onNext();

    } catch (error) {
      console.error("Erro ao criar agent:", error);
      toast.error("Unexpected error creating agent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-blue-600" />
          <span>AI Agent Setup</span>
        </CardTitle>
        <CardDescription>
          Set up your smart assistant's basic information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ai_name" className="flex items-center space-x-2">
                <Bot className="h-4 w-4" />
                <span>Agent Name *</span>
              </Label>
              <Input
                id="ai_name"
                placeholder="e.g. Maria Assistant"
                value={formData.ai_name}
                onChange={(e) => setFormData({ ...formData, ai_name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_name" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Company Name *</span>
              </Label>
              <Input
                id="company_name"
                placeholder="e.g. My Company Ltd."
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Agent Type *</span>
              </Label>
              <Select 
                value={formData.agent_type} 
                onValueChange={(value) => setFormData({ ...formData, agent_type: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select agent type" />
                </SelectTrigger>
                <SelectContent>
                  {agentTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Personality *</span>
              </Label>
              <Select 
                value={formData.personality} 
                onValueChange={(value) => setFormData({ ...formData, personality: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select personality" />
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom_prompt">Custom Prompt (Optional)</Label>
            <Textarea
              id="custom_prompt"
              placeholder="e.g. Always respond succinctly and politely. Be proactive in offering help..."
              value={formData.custom_prompt}
              onChange={(e) => setFormData({ ...formData, custom_prompt: e.target.value })}
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? "Creating Agent..." : "Create Agent"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
