
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bot, Building2, MessageSquare, CheckCircle2, XCircle, Sparkles, Palette, Plus, Zap, Users, Target, FileText, Info, RotateCcw } from "lucide-react";
import { agentTypeOptions, personalityOptions, sectorOptions } from "./KnowledgeBase/types";
import { useAuth } from "@/contexts/AuthContext";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { generateFinalPrompt, generateOtherAgentTypePrompt } from "@/utils/promptGenerator";
import { useNavigate } from "react-router-dom";
import { FileUpload, UploadedFile } from "@/components/ui/file-upload";

export default function DashboardOverview() {
  console.log('=== DEBUG: DashboardOverview component mounted ===');
  const { profile, user } = useAuth();
  const { planLimits, isLoading: loadingLimits } = usePlanLimits();
  const navigate = useNavigate();
  const [usage, setUsage] = useState({ agents: 0, connections: 0 });
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({
    ai_name: "",
    company_name: "",
    support_email: "",
    agent_type: "",
    personality: "",

    sectors: [] as string[]
  });

  const [creating, setCreating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [customSector, setCustomSector] = useState("");
  const [showCustomSectorInput, setShowCustomSectorInput] = useState(false);
  const [customAgentType, setCustomAgentType] = useState("");
  const [showCustomAgentTypeInput, setShowCustomAgentTypeInput] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState("");
  const [originalPrompt, setOriginalPrompt] = useState("");



  useEffect(() => {
    async function fetchData() {
      if (!user?.id) {
        console.log('DashboardOverview - No user ID available, skipping data fetch');
        setLoading(false);
        return;
      }

      if (isFetching) {
        console.log('DashboardOverview - Already fetching data, skipping');
        return;
      }

      setIsFetching(true);
      setLoading(true);
      
      try {
        // Fetch usage data directly instead of using the hook
        if (profile?.id) {
          const [agentsResult, connectionsResult] = await Promise.all([
            supabase
              .from('ai_configurations')
              .select('id')
              .eq('user_id', profile.id),
            supabase
              .from('whatsapp_connections')
              .select('id')
              .eq('user_id', profile.id)
          ]);

          const usageData = {
            agents: agentsResult.data?.length || 0,
            connections: connectionsResult.data?.length || 0,
          };
          setUsage(usageData);
          console.log('Usage data:', usageData);
        }
        
        const { data, error } = await supabase
          .from("ai_configurations")
          .select("id, ai_name, company_name, agent_type, personality, final_prompt")
          .eq("user_id", user.id);
        
        if (error) {
          console.error('Error fetching agents:', error);
        } else {
          setAgents(data || []);
          console.log('Agents data:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    }
    
    if (user?.id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user?.id, profile?.id, creating]);

  // Save original prompt when first generated
  useEffect(() => {
    if (currentStep === 2 && !originalPrompt) {
      const generatePrompt = () => {
        if (formData.agent_type === "Other") {
          return generateOtherAgentTypePrompt({
            ai_name: formData.ai_name,
            company_name: formData.company_name,
            personality: formData.personality,
            support_email: formData.support_email || null,
            sectors: formData.sectors.length > 0 ? formData.sectors : null
          });
        } else {
          return generateFinalPrompt({
            ai_name: formData.ai_name,
            company_name: formData.company_name,
            agent_type: formData.agent_type,
            personality: formData.personality,

            support_email: formData.support_email || null,
            sectors: formData.sectors.length > 0 ? formData.sectors : null
          });
        }
      };
      
      const currentPrompt = finalPrompt || generatePrompt();
      if (currentPrompt) {
        setOriginalPrompt(currentPrompt);
      }
    }
  }, [currentStep, originalPrompt, finalPrompt, formData]);

  // Função para fazer merge da transcrição com o final_prompt
  const mergeTranscriptionWithPrompt = async (agentId: string) => {
    try {
      console.log('Iniciando merge da transcrição para agente:', agentId);
      
      // Buscar todos os documentos do agente com transcrição
      const { data: documents, error: docsError } = await supabase
        .from('agent_documents')
        .select('file_transcription, file_name, id, knowledge_base_id')
        .eq('agent_id', agentId)
        .not('file_transcription', 'is', null);
      
      if (docsError) {
        console.error('Erro ao buscar documentos:', docsError);
        return;
      }
      
      if (!documents || documents.length === 0) {
        console.log('Nenhum documento com transcrição encontrado');
        return;
      }
      
      // Verificar se há transcrições válidas
      const validDocuments = documents.filter(doc => 
        doc.file_transcription && 
        doc.file_transcription.trim().length > 0
      );
      
      if (validDocuments.length === 0) {
        console.log('Nenhum documento com transcrição válida encontrado');
        return;
      }
      
      console.log(`Processando ${validDocuments.length} documento(s) com transcrição válida`);
      
      validDocuments.forEach((doc, index) => {
        console.log(`Documento ${index + 1}: ${doc.file_name}`);
        console.log(`Tamanho da transcrição: ${doc.file_transcription?.length || 0} caracteres`);
        console.log(`Knowledge base ID: ${doc.knowledge_base_id || 'não definido'}`);
      });
      
      // Buscar o final_prompt atual do agente
      const { data: agentData, error: agentError } = await supabase
        .from('ai_configurations')
        .select('final_prompt')
        .eq('id', agentId)
        .single();
      
      if (agentError) {
        console.error('Erro ao buscar final_prompt do agente:', agentError);
        return;
      }
      
      if (!agentData?.final_prompt) {
        console.log('Agente não possui final_prompt');
        return;
      }
      
      // Atualizar knowledge_base_id para cada documento que não tem
      for (const doc of validDocuments) {
        if (!doc.knowledge_base_id) {
          const knowledgeBaseId = `doc_${doc.id}`;
          const { error: updateError } = await supabase
            .from('agent_documents')
            .update({ knowledge_base_id: knowledgeBaseId })
            .eq('id', doc.id);
          
          if (updateError) {
            console.error('Erro ao atualizar knowledge_base_id:', updateError);
          } else {
            console.log(`knowledge_base_id atualizado para documento ${doc.file_name}: ${knowledgeBaseId}`);
          }
        }
      }
      
      // Remover todas as seções de knowledge-base existentes do prompt
      const basePrompt = agentData.final_prompt.replace(/<knowledge-base id="[^"]*"[\s\S]*?<\/knowledge-base>/g, '').trim();
      
      // Criar todas as seções de conhecimento base para todos os documentos válidos
      const allKnowledgeBaseSections = validDocuments.map(doc => {
        const knowledgeBaseId = doc.knowledge_base_id || `doc_${doc.id}`;
        return `<knowledge-base id="${knowledgeBaseId}">\nDocumento: ${doc.file_name}\nConteúdo: ${doc.file_transcription}\n</knowledge-base>`;
      });
      
      // Construir o novo prompt com todas as seções de knowledge base
      let updatedFinalPrompt = `${basePrompt}\n\n${allKnowledgeBaseSections.join('\n\n')}`;
      
      console.log('Rebuilding knowledge base section with all valid documents');
      console.log(`Total documents in knowledge base: ${validDocuments.length}`);
      
      // Salvar o prompt sem limite de tamanho
      console.log('Novo final_prompt criado com knowledge base');
      console.log('Tamanho do novo prompt:', updatedFinalPrompt.length, 'caracteres');
      
      // Atualizar ai_configurations
      const { error: updateAgentError } = await supabase
        .from('ai_configurations')
        .update({ final_prompt: updatedFinalPrompt })
        .eq('id', agentId);
      
      if (updateAgentError) {
        console.error('Erro ao atualizar ai_configurations:', updateAgentError);
        toast.error('Erro ao salvar knowledge base');
        return;
      }
      
      console.log('ai_configurations atualizado com sucesso');
      
      // Atualizar whatsapp_connections (se existir)
      const { data: whatsappConnections, error: whatsappError } = await supabase
        .from('whatsapp_connections')
        .select('id, final_prompt')
        .eq('ai_configuration_id', agentId);
      
      if (whatsappError) {
        console.error('Erro ao buscar whatsapp_connections:', whatsappError);
      } else if (whatsappConnections && whatsappConnections.length > 0) {
        // Atualizar cada conexão WhatsApp com o novo prompt completo
        for (const connection of whatsappConnections) {
          const { error: updateConnectionError } = await supabase
            .from('whatsapp_connections')
            .update({ final_prompt: updatedFinalPrompt })
            .eq('id', connection.id);
          
          if (updateConnectionError) {
            console.error('Erro ao atualizar whatsapp_connection:', updateConnectionError);
          } else {
            console.log('whatsapp_connection atualizada:', connection.id);
          }
        }
      }
      
      console.log('Merge da transcrição concluído com sucesso');
      toast.success('Knowledge base atualizada com sucesso!');
      
    } catch (error) {
      console.error('Erro durante merge da transcrição:', error);
      throw error;
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== DEBUG: DashboardOverview handleSubmit called ===');
    
    if (!user) {
      toast.error("You must be logged in to create an agent");
      return;
    }
    if (!formData.ai_name || !formData.company_name || !formData.agent_type || !formData.personality) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (planLimits && usage.agents >= planLimits.max_agents) {
      toast.error("You have reached the maximum number of agents for your plan.");
      return;
    }
    
    setCreating(true);
    try {
      console.log('=== DEBUG: Generating final_prompt ===');
      console.log('Form data:', formData);
      
      // Use the final prompt from state or generate it
      const promptToUse = finalPrompt || generateFinalPrompt({
        ai_name: formData.ai_name,
        company_name: formData.company_name,
        agent_type: formData.agent_type,
        personality: formData.personality,
        custom_prompt: formData.custom_prompt || null,
        support_email: formData.support_email || null,
        sectors: formData.sectors.length > 0 ? formData.sectors : null
      });

      console.log('Generated final_prompt:', finalPrompt);
      console.log('Final prompt length:', finalPrompt.length);

      const insertData = {
        user_id: user.id,
        ai_name: formData.ai_name,
        company_name: formData.company_name,
        support_email: formData.support_email || null,
        agent_type: formData.agent_type,
        personality: formData.personality,
        custom_prompt: formData.custom_prompt || null,
        sectors: formData.sectors.length > 0 ? formData.sectors : null,
        final_prompt: promptToUse
      };

      console.log('Data to insert:', insertData);

      // Teste: verificar se todos os campos necessários estão presentes
      console.log('=== DEBUG: Verificando campos antes da inserção ===');
      console.log('user_id:', insertData.user_id);
      console.log('ai_name:', insertData.ai_name);
      console.log('company_name:', insertData.company_name);
      console.log('agent_type:', insertData.agent_type);
      console.log('personality:', insertData.personality);
      console.log('custom_prompt:', insertData.custom_prompt);
      console.log('final_prompt:', insertData.final_prompt);
      console.log('final_prompt length:', insertData.final_prompt?.length);

      console.log('About to insert data into database...');
      const { data, error } = await supabase
        .from("ai_configurations")
        .insert(insertData)
        .select()
        .single();

      console.log('Database response:', { data, error });
      console.log('Inserted data:', data);
      
      if (data) {
        console.log('Final prompt in inserted data:', data.final_prompt);
        console.log('Final prompt length in data:', data.final_prompt?.length);
        console.log('Final prompt type:', typeof data.final_prompt);
      }

      if (error) {
        console.error("Erro ao criar configuração:", error);
        console.error("Error details:", error.details);
        console.error("Error hint:", error.hint);
        console.error("Error code:", error.code);
        toast.error("Error creating agent. Please try again.");
        return;
      }
      
      // Verificar se o final_prompt foi salvo corretamente
      if (data?.id) {
        console.log('=== DEBUG: Verificando se final_prompt foi salvo ===');
        const { data: verifyData, error: verifyError } = await supabase
          .from("ai_configurations")
          .select("id, ai_name, final_prompt")
          .eq("id", data.id)
          .single();
        
        if (verifyError) {
          console.error('Erro ao verificar dados salvos:', verifyError);
        } else {
          console.log('Dados verificados:', verifyData);
          console.log('Final prompt verificado:', verifyData?.final_prompt);
          console.log('Final prompt verificado length:', verifyData?.final_prompt?.length);
        }

        // Processar arquivos anexados se houver
        if (uploadedFiles.length > 0) {
          console.log('=== DEBUG: Processando arquivos anexados ===');
          console.log('Total de arquivos:', uploadedFiles.length);
          console.log('Arquivos:', uploadedFiles);
          
          try {
            const filesToProcess = uploadedFiles.filter(file => file.file);
            console.log('Arquivos para processar:', filesToProcess.length);
            
            for (const file of filesToProcess) {
              console.log('Processando arquivo:', file.name, 'ID:', file.id, 'Tem file:', !!file.file);
              console.log('Arquivo será processado:', file.name);

              // Fazer upload para o storage se o arquivo ainda não foi enviado
              let fileUrl = file.url;
              if (file.file) {
                console.log('Fazendo upload do arquivo para o storage:', file.name);
                console.log('Tipo do arquivo:', file.file.type);
                console.log('Tamanho do arquivo:', file.file.size);
                
                const fileName = `${Date.now()}-${file.name}`;
                const filePath = `${user.id}/${data.id}/${fileName}`;
                console.log('Caminho do arquivo:', filePath);

                const { data: uploadData, error: uploadError } = await supabase.storage
                  .from('agent-documents')
                  .upload(filePath, file.file);

                if (uploadError) {
                  console.error('Erro no upload para storage:', uploadError);
                  toast.error(`Erro ao fazer upload do arquivo "${file.name}"`);
                  continue;
                }

                console.log('Upload para storage bem-sucedido:', uploadData);

                // Obter URL pública
                const { data: urlData } = supabase.storage
                  .from('agent-documents')
                  .getPublicUrl(filePath);

                fileUrl = urlData.publicUrl;
                console.log('Arquivo enviado para storage com URL:', fileUrl);
              }

              // Salvar no banco de dados
              console.log('Salvando documento no banco:', {
                agent_id: data.id,
                user_id: user.id,
                file_name: file.name,
                file_size: file.size,
                file_type: file.type,
                file_url: fileUrl
              });
              
              const { data: docData, error: docError } = await supabase
                .from('agent_documents')
                .insert({
                  agent_id: data.id,
                  user_id: user.id,
                  file_name: file.name,
                  file_size: file.size,
                  file_type: file.type,
                  file_url: fileUrl
                })
                .select()
                .single();

              if (docError) {
                console.error('Erro ao salvar documento:', docError);
                toast.error(`Erro ao salvar documento "${file.name}"`);
              } else {
                console.log('Documento salvo:', docData);
                
                // Chamar webhook após salvar documento e aguardar retorno
                try {
                  const webhookPayload = {
                    user_id: user.id,
                    agent_id: data.id,
                    file_name: file.name,
                    file_type: file.type,
                    file_url: fileUrl
                  };
                  
                  console.log('Enviando webhook com payload:', webhookPayload);
                          console.log('URL do webhook:', `${import.meta.env.VITE_NWH_BASE_URL}/webhook/docs-skilabot`);
        
        const webhookResponse = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/docs-skilabot`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(webhookPayload),
                    signal: AbortSignal.timeout(30000) // 30 segundos de timeout
                  });
                  
                  if (webhookResponse.ok) {
                    console.log('Webhook enviado com sucesso para documento:', file.name);
                    console.log('Status da resposta:', webhookResponse.status);
                    
                    // Aguardar e processar o retorno do webhook
                    const webhookData = await webhookResponse.json();
                    console.log('Retorno do webhook:', webhookData);
                    
                    // Se o webhook retornou uma transcrição, salvar na tabela
                    let transcription = null;
                    let fieldUsed = '';
                    
                    if (webhookData.transcription || webhookData.text || webhookData.content || webhookData.merged_text) {
                      transcription = webhookData.transcription || webhookData.text || webhookData.content || webhookData.merged_text;
                      fieldUsed = webhookData.transcription ? 'transcription' : webhookData.text ? 'text' : webhookData.content ? 'content' : 'merged_text';
                    } else {
                      // Processar outros tipos de dados (arrays, objetos, etc.)
                      const dataKeys = Object.keys(webhookData);
                      if (dataKeys.length > 0) {
                        // Converter dados para texto
                        transcription = JSON.stringify(webhookData, null, 2);
                        fieldUsed = `processed_${dataKeys[0]}`;
                        console.log('Processando dados não-texto do webhook:', dataKeys);
                      }
                    }
                    
                    if (transcription) {
                      console.log('Salvando transcrição para documento:', file.name);
                      console.log('Campo usado:', fieldUsed);
                      console.log('Tamanho da transcrição:', transcription.length, 'caracteres');
                      
                      const { error: updateError } = await supabase
                        .from('agent_documents')
                        .update({
                          file_transcription: transcription
                        })
                        .eq('id', docData.id);
                      
                      if (updateError) {
                        console.error('Erro ao salvar transcrição:', updateError);
                        toast.error(`Erro ao salvar transcrição do documento "${file.name}"`);
                      } else {
                        console.log('Transcrição salva com sucesso para documento:', file.name);
                        
                        
                        // Fazer merge da transcrição com o final_prompt
                        try {
                          await mergeTranscriptionWithPrompt(data.id);
                        } catch (mergeError) {
                          console.error('Erro ao fazer merge da transcrição:', mergeError);
                        }
                        
                        // Após transcrição bem-sucedida, deletar o arquivo do storage
                        if (docData.file_url) {
                          try {
                            console.log('Deletando arquivo do storage após transcrição bem-sucedida:', file.name);
                            console.log('URL do arquivo:', docData.file_url);
                            
                            // Extrair o path correto do storage da URL
                            const urlParts = docData.file_url.split('/');
                            const storagePath = urlParts.slice(-3).join('/'); // Pegar os últimos 3 segmentos
                            console.log('Path do storage para deletar:', storagePath);
                            
                            const { error: deleteError } = await supabase.storage
                              .from('agent-documents')
                              .remove([storagePath]);
                            
                            if (deleteError) {
                              console.error('Erro ao deletar arquivo do storage:', deleteError);
                              console.error('Detalhes do erro:', deleteError);
                            } else {
                              console.log('Arquivo deletado do storage com sucesso:', file.name);
                            }
                          } catch (deleteError) {
                            console.error('Erro ao deletar arquivo do storage:', deleteError);
                          }
                        }
                      }
                    } else {
                      console.log('Webhook não retornou transcrição para documento:', file.name);
                      toast.info(`Document "${file.name}" sent, awaiting processing...`);
                    }
                  } else {
                    console.error('Erro ao enviar webhook para documento:', file.name, webhookResponse.status);
                    console.error('Resposta do webhook:', await webhookResponse.text());
                  }
                } catch (webhookError) {
                  console.error('Erro ao chamar webhook:', webhookError);
                  
                  if (webhookError.name === 'AbortError') {
                    console.error('Timeout do webhook após 30 segundos');
                    toast.error(`Timeout when processing document "${file.name}"`);
                  } else {
                    toast.error(`Error processing document "${file.name}"`);
                  }
                }
              }
            }
            
            console.log(`Processamento concluído: ${filesToProcess.length} documento(s) anexado(s) com sucesso!`);
            toast.success(`${filesToProcess.length} document(s) attached successfully!`);
            
            // Limpar Storage de arquivos temporários após TODOS os documentos serem processados
            try {
              console.log('=== LIMPEZA FINAL DO STORAGE ===');
              console.log('Todos os documentos foram processados, iniciando limpeza do Storage...');
              
              const { data: storageFiles, error: listError } = await supabase.storage
                .from('agent-documents')
                .list(`${user.id}/${data.id}`);
              
              if (!listError && storageFiles && storageFiles.length > 0) {
                const filesToDelete = storageFiles.map(file => `${user.id}/${data.id}/${file.name}`);
                console.log(`Encontrados ${filesToDelete.length} arquivo(s) no Storage para remoção:`, filesToDelete);
                
                const { error: deleteError } = await supabase.storage
                  .from('agent-documents')
                  .remove(filesToDelete);
                
                if (deleteError) {
                  console.error('Erro ao limpar Storage:', deleteError);
                  
                } else {
                  console.log(`✅ Storage limpo com sucesso! ${filesToDelete.length} arquivo(s) removido(s)`);
                  
                }
              } else {
                console.log('Nenhum arquivo encontrado no Storage para remoção');
              }
            } catch (cleanupError) {
              console.error('Erro ao limpar Storage:', cleanupError);
              
            }
          } catch (error) {
            console.error('Erro ao processar documentos:', error);
            toast.error('Error processing attached documents');
          }
        }
      }
      
      toast.success("Agent created successfully!");
              setFormData({ ai_name: "", company_name: "", support_email: "", agent_type: "", personality: "", sectors: [] });
      setSelectedSector("");
      setCustomSector("");
      setShowCustomSectorInput(false);
      setCustomAgentType("");
      setShowCustomAgentTypeInput(false);
      setFinalPrompt("");
      setOriginalPrompt("");
      setUploadedFiles([]);
      setCurrentStep(1);
      navigate('/agents');
    } catch (error) {
      console.error("Erro ao criar agent:", error);
      toast.error("Unexpected error creating agent");
    } finally {
      setCreating(false);
    }
  };

  // Cards data with better fallbacks
  const planName = profile?.plan || "No plan";
  const maxAgents = planLimits?.max_agents || 1;
  const agentsCreated = usage.agents;
  const agentsLeft = Math.max(0, maxAgents - agentsCreated);

  // Loading state
  if (loading || loadingLimits) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // If no user, show a message
  if (!user?.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No User Found</h2>
              <p className="text-gray-600">Please log in to access the dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-3 sm:mb-4">
          <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Create Your AI Agent</h2>
        <p className="text-sm sm:text-base text-gray-600">Let's start by setting up your agent's basic information</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg bg-white border border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <Bot className="h-5 w-5 text-pink-500" />
              <span>Agent Identity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ai_name" className="text-sm font-medium text-gray-700">
                Agent Name *
              </Label>
              <Input
                id="ai_name"
                placeholder="e.g. Maria Assistant"
                value={formData.ai_name}
                onChange={(e) => setFormData({ ...formData, ai_name: e.target.value })}
                className="border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_name" className="text-sm font-medium text-gray-700">
                Company Name *
              </Label>
              <Input
                id="company_name"
                placeholder="e.g. My Company Ltd."
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support_email" className="text-sm font-medium text-gray-700">
                Support Email (Optional)
              </Label>
              <Input
                id="support_email"
                type="email"
                placeholder="e.g. support@mycompany.com"
                value={formData.support_email}
                onChange={(e) => setFormData({ ...formData, support_email: e.target.value })}
                className="border-gray-200 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white border border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <Target className="h-5 w-5 text-pink-500" />
              <span>Agent Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Agent Type *
              </Label>
              <Select
                value={formData.agent_type}
                onValueChange={(value) => {
                  setFormData({ ...formData, agent_type: value });
                  if (value === "Other") {
                    setShowCustomAgentTypeInput(true);
                  } else {
                    setShowCustomAgentTypeInput(false);
                    setCustomAgentType("");
                  }
                }}
                required
              >
                <SelectTrigger className="border-gray-200 focus:border-pink-500 focus:ring-pink-500">
                  <SelectValue placeholder="Select agent type" />
                </SelectTrigger>
                <SelectContent>
                  {agentTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {showCustomAgentTypeInput && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Custom Agent Type</Label>
                  <Input
                    placeholder="Enter your custom agent type"
                    value={customAgentType}
                    onChange={(e) => {
                      setCustomAgentType(e.target.value);
                      setFormData({ ...formData, agent_type: e.target.value });
                    }}
                    className="border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Sectors (Optional)
              </Label>
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
                    <Label className="text-sm font-medium text-gray-700">
                      Custom Sector
                    </Label>
                    <Input
                      placeholder="Enter your custom sector"
                      value={customSector}
                      onChange={(e) => {
                        setCustomSector(e.target.value);
                        setFormData({ ...formData, sectors: e.target.value ? [e.target.value] : [] });
                      }}
                      className="border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Personality *
              </Label>
              <Select
                value={formData.personality}
                onValueChange={(value) => setFormData({ ...formData, personality: value })}
                required
              >
                <SelectTrigger className="border-gray-200 focus:border-pink-500 focus:ring-pink-500">
                  <SelectValue placeholder="Select personality" />
                </SelectTrigger>
                <SelectContent>
                  {personalityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={() => setCurrentStep(2)} 
          disabled={!formData.ai_name || !formData.company_name || !formData.agent_type || !formData.personality}
          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
        >
          Continue to Customization
          <Zap className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => {
    // Generate the appropriate prompt based on agent type
    const generatePrompt = () => {
      if (formData.agent_type === "Other") {
        return generateOtherAgentTypePrompt({
          ai_name: formData.ai_name,
          company_name: formData.company_name,
          personality: formData.personality,
          support_email: formData.support_email || null,
          sectors: formData.sectors.length > 0 ? formData.sectors : null
        });
      } else {
        return generateFinalPrompt({
          ai_name: formData.ai_name,
          company_name: formData.company_name,
          agent_type: formData.agent_type,
          personality: formData.personality,
          custom_prompt: formData.custom_prompt,
          support_email: formData.support_email || null,
          sectors: formData.sectors.length > 0 ? formData.sectors : null
        });
      }
    };

    const currentPrompt = finalPrompt || generatePrompt();

    return (
      <div className="space-y-4">
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-3 sm:mb-4">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Agent Prompt</h2>
          <p className="text-sm sm:text-base text-gray-600">Review and customize your agent's behavior and communication style</p>
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <div className="text-blue-800 font-semibold mb-1">How this works</div>
          <AlertDescription className="text-blue-700 text-sm">
            We've automatically generated a comprehensive prompt for your AI agent based on the information you provided in the previous step. 
            This prompt includes your agent's identity, role, personality, and behavior guidelines. You can review and edit it to ensure it matches your exact needs.
          </AlertDescription>
        </Alert>

        <Card className="border-0 shadow-lg bg-white border border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <Sparkles className="h-5 w-5 text-pink-500" />
              <span>Agent Prompt</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Generated Prompt
              </Label>
              <p className="text-sm text-gray-600">
                This prompt was automatically generated based on your agent's configuration. It includes:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 ml-2">
                <li><strong>Overview:</strong> Agent identity and company information</li>
                <li><strong>Main Objective:</strong> Your agent's primary role and specialization</li>
                <li><strong>Tone:</strong> Communication style and personality</li>
                <li><strong>Rules:</strong> Mandatory behavior guidelines</li>
                <li><strong>Guidelines:</strong> Conversation flow and interaction patterns</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                You can edit any section to customize your agent's behavior. The prompt uses XML-like tags to structure different aspects of your agent's personality.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-gray-700">
                  Generated Prompt
                </Label>
                {originalPrompt && finalPrompt !== originalPrompt && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFinalPrompt(originalPrompt);
                      toast.success("Prompt reset to original version");
                    }}
                    className="text-xs border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset to Original
                  </Button>
                )}
              </div>
              <Textarea
                placeholder="Agent prompt will be generated here..."
                value={currentPrompt}
                onChange={(e) => setFinalPrompt(e.target.value)}
                rows={12}
                className="border-gray-200 focus:border-pink-500 focus:ring-pink-500 resize-none font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>💡 Tips:</strong> You can modify any section to better match your needs. For example:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 ml-2">
                <li>Change the tone to be more formal or casual</li>
                <li>Add specific instructions for your industry</li>
                <li>Modify the conversation guidelines</li>
                <li>Update contact information or specializations</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                The prompt defines how your agent will interact with users. Make sure it reflects your desired tone and behavior.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(1)}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
          >
            Back
          </Button>
          <Button 
            onClick={() => setCurrentStep(3)}
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
          >
            Continue to Documents
            <FileText className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="space-y-4">
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-3 sm:mb-4">
          <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Knowledge Base Documents</h2>
        <p className="text-sm sm:text-base text-gray-600">Upload documents that will serve as knowledge base for your AI agent</p>
      </div>

      <Card className="border-0 shadow-lg bg-white border border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900">
            <FileText className="h-5 w-5 text-pink-500" />
            <span>Upload Documents (Optional)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Knowledge Base Files
            </Label>
            <p className="text-xs text-gray-500">
              Upload PDFs, Word documents, or text files that contain information your agent should know.
              These documents will be used to train your AI agent's knowledge base.
            </p>
          </div>
          
          <FileUpload
            userId={user?.id || ''}
            onFilesChange={setUploadedFiles}
            uploadedFiles={uploadedFiles}
            maxFiles={5}
            maxFileSize={5 * 1024 * 1024} // 5MB
            acceptedTypes={['.pdf', '.doc', '.docx', '.txt', '.rtf', '.xlsx', '.xls', '.csv']}
          />
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(2)}
          className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
        >
          Back
        </Button>
        <Button 
          onClick={(e) => {
            console.log('=== DEBUG: Create Agent button clicked ===');
            handleSubmit(e);
          }} 
          disabled={creating}
          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
        >
          {creating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating Agent...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Create Agent
            </>
          )}
        </Button>
      </div>
    </div>
  );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 pt-20 lg:pt-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Welcome back! Here's an overview of your AI agents.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-orange-500 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-white">
                <span className="text-xs sm:text-sm font-medium opacity-90">Current Plan</span>
                <Users className="h-4 w-4 sm:h-5 sm:w-5 opacity-80" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{planName}</div>
              <p className="text-xs opacity-80 mt-1">Active subscription</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white border border-pink-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-gray-900">
                <span className="text-xs sm:text-sm font-medium">Agents Created</span>
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{agentsCreated}</div>
              <p className="text-xs text-gray-600 mt-1">Total agents</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white border border-pink-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-gray-900">
                <span className="text-xs sm:text-sm font-medium">Agents Left</span>
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{agentsLeft}</div>
              <p className="text-xs text-gray-600 mt-1">Available slots</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white border border-pink-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-gray-900">
                <span className="text-xs sm:text-sm font-medium">Recent Agents</span>
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {agents.length === 0 ? (
                <div className="text-xs sm:text-sm text-gray-600">No agents created yet</div>
              ) : (
                <div className="space-y-1">
                  {agents.slice(0, 3).map((a) => (
                    <div key={a.id} className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-700 truncate flex-1 mr-2">{a.ai_name}</span>
                      <Badge className="bg-green-500 text-white text-xs">
                        Active
                      </Badge>
                    </div>
                  ))}
                  {agents.length > 3 && (
                    <div className="text-xs text-gray-500 mt-1">
                      +{agents.length - 3} more
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Agent Creation Section */}
        <Card className="border-0 shadow-xl bg-white border border-pink-200">
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            {currentStep === 1 ? renderStep1() : currentStep === 2 ? renderStep2() : renderStep3()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
