import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Trash2, 
  Upload,
  File,
  AlertCircle,
  CheckCircle,
  Table
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { FileUpload, UploadedFile } from '@/components/ui/file-upload';

interface AgentDocument {
  id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  file_url: string;
  file_content: string | null;
  file_transcription: string | null;
  created_at: string;
}

interface AgentDocumentsProps {
  agentId: string;
  userId: string;
  onDocumentsChange?: () => void;
}

export function AgentDocuments({ agentId, userId, onDocumentsChange }: AgentDocumentsProps) {
  const [documents, setDocuments] = useState<AgentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [processingDocuments, setProcessingDocuments] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, [agentId]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('agent_documents')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar documentos:', error);
        toast.error('Erro ao carregar documentos');
      } else {
        setDocuments(data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      toast.error('Erro ao carregar documentos');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-4 w-4" />;
    if (type.includes('word') || type.includes('document')) return <File className="h-4 w-4" />;
    if (type.includes('excel') || type.includes('xls') || type.includes('xlsx')) return <Table className="h-4 w-4" />;
    if (type.includes('csv')) return <File className="h-4 w-4" />; // CSV pode ser um arquivo de texto
    return <File className="h-4 w-4" />;
  };

  // Função para fazer merge da transcrição com o final_prompt (copiada do DashboardOverview)
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
      
      console.log('Merge da transcrição concluído com sucesso');
      toast.success('Knowledge base atualizada com sucesso!');
      
    } catch (error) {
      console.error('Erro durante merge da transcrição:', error);
      throw error;
    }
  };

  const handleDelete = async (documentId: string, fileName: string) => {
    try {
      // Buscar o documento para obter a URL do arquivo, transcrição e knowledge_base_id
      const { data: docData, error: fetchError } = await supabase
        .from('agent_documents')
        .select('file_url, file_transcription, knowledge_base_id')
        .eq('id', documentId)
        .single();

      if (fetchError) {
        console.error('Erro ao buscar documento:', fetchError);
        toast.error('Erro ao buscar documento');
        return;
      }

      // Remover do banco de dados
      const { error: deleteError } = await supabase
        .from('agent_documents')
        .delete()
        .eq('id', documentId);

      if (deleteError) {
        console.error('Erro ao deletar documento:', deleteError);
        toast.error('Erro ao deletar documento');
        return;
      }

      // Remover do storage se a URL existir
      if (docData?.file_url) {
        const filePath = docData.file_url.split('/').slice(-3).join('/');
        await supabase.storage
          .from('agent-documents')
          .remove([filePath]);
      }

      // Remover o conteúdo do arquivo do final_prompt usando knowledge_base_id
      if (docData?.knowledge_base_id) {
        await removeTranscriptionFromPrompt(agentId, docData.knowledge_base_id);
      }

      toast.success(`Documento "${fileName}" removido com sucesso`);
      fetchDocuments();
      // Remover a chamada do onDocumentsChange para evitar fechar o modal
    } catch (error) {
      console.error('Erro ao deletar documento:', error);
      toast.error('Erro ao deletar documento');
    }
  };

  const removeTranscriptionFromPrompt = async (agentId: string, knowledgeBaseId: string) => {
    try {
      console.log('Removendo knowledge base ID:', knowledgeBaseId);
      
      // Buscar a configuração atual do agente
      const { data: aiConfig, error: configError } = await supabase
        .from('ai_configurations')
        .select('final_prompt')
        .eq('id', agentId)
        .single();

      if (configError) {
        console.error('Erro ao buscar configuração do agente:', configError);
        return;
      }

      if (!aiConfig?.final_prompt) {
        console.log('Nenhum final_prompt encontrado');
        return;
      }

      console.log('Prompt atual encontrado, tamanho:', aiConfig.final_prompt.length);

      // Remover apenas a seção específica do knowledge base usando o ID
      let updatedPrompt = aiConfig.final_prompt;
      
      // Procurar a seção knowledge-base que contém o ID específico
      const knowledgeBaseRegex = /<knowledge-base id="([^"]*)"([\s\S]*?)<\/knowledge-base>/g;
      const matches = updatedPrompt.match(knowledgeBaseRegex);
      
      if (matches) {
        console.log('Encontradas', matches.length, 'seções knowledge-base');
        
        for (const match of matches) {
          console.log('Verificando seção knowledge-base, tamanho:', match.length);
          
          // Extrair o ID da seção knowledge-base
          const idMatch = match.match(/<knowledge-base id="([^"]*)"/);
          if (idMatch && idMatch[1] === knowledgeBaseId) {
            console.log('Knowledge base ID encontrado:', knowledgeBaseId);
            
            // Remover toda a seção knowledge-base que contém este ID
            updatedPrompt = updatedPrompt.replace(match, '');
            console.log('Seção knowledge-base removida completamente');
          }
        }
      } else {
        console.log('Nenhuma seção knowledge-base encontrada');
      }

      // Limpar linhas vazias extras no prompt geral
      updatedPrompt = updatedPrompt.replace(/\n\s*\n\s*\n/g, '\n\n');

      console.log('Prompt atualizado, tamanho:', updatedPrompt.length);

      // Atualizar ai_configurations
      const { error: updateConfigError } = await supabase
        .from('ai_configurations')
        .update({ final_prompt: updatedPrompt })
        .eq('id', agentId);

      if (updateConfigError) {
        console.error('Erro ao atualizar ai_configurations:', updateConfigError);
        return;
      }

      console.log('ai_configurations atualizada com sucesso');

      // Buscar e atualizar todas as conexões WhatsApp associadas
      const { data: whatsappConnections, error: connectionsError } = await supabase
        .from('whatsapp_connections')
        .select('id, final_prompt')
        .eq('ai_configuration_id', agentId);

      if (connectionsError) {
        console.error('Erro ao buscar conexões WhatsApp:', connectionsError);
        return;
      }

      console.log('Encontradas', whatsappConnections?.length || 0, 'conexões WhatsApp');

      // Atualizar cada conexão WhatsApp
      for (const connection of whatsappConnections || []) {
        if (connection.final_prompt) {
          let updatedConnectionPrompt = connection.final_prompt;
          
          // Aplicar a mesma lógica de remoção
          const connectionMatches = updatedConnectionPrompt.match(knowledgeBaseRegex);
          
          if (connectionMatches) {
            for (const match of connectionMatches) {
              // Extrair o ID da seção knowledge-base
              const idMatch = match.match(/<knowledge-base id="([^"]*)"/);
              if (idMatch && idMatch[1] === knowledgeBaseId) {
                // Remover toda a seção knowledge-base que contém este ID
                updatedConnectionPrompt = updatedConnectionPrompt.replace(match, '');
              }
            }
          }

          // Limpar linhas vazias extras no prompt geral
          updatedConnectionPrompt = updatedConnectionPrompt.replace(/\n\s*\n\s*\n/g, '\n\n');

          // Atualizar a conexão
          const { error: updateConnectionError } = await supabase
            .from('whatsapp_connections')
            .update({ final_prompt: updatedConnectionPrompt })
            .eq('id', connection.id);

          if (updateConnectionError) {
            console.error('Erro ao atualizar conexão WhatsApp:', updateConnectionError);
          }
        }
      }

      toast.success('Knowledge base atualizada após remoção do documento');
    } catch (error) {
      console.error('Erro ao remover transcrição do prompt:', error);
      toast.error('Erro ao atualizar knowledge base');
    }
  };

  const handleFilesUploaded = async (files: UploadedFile[]) => {
    setProcessingDocuments(true);
    try {
      // Filtrar apenas arquivos que ainda não foram processados
      // Um arquivo é considerado "não processado" se:
      // 1. Tem status 'success'
      // 2. Tem o arquivo original (file)
      // 3. Não tem URL (não foi enviado para storage ainda)
      // 4. Não existe no banco de dados com o mesmo nome e tamanho
      // 5. Se existe no banco, não deve ter transcrição (file_transcription)
      const filesToProcess: UploadedFile[] = [];
      
      for (const file of files) {
        if (file.status === 'success' && file.file && !file.url) {
          // Verificar se já existe no banco de dados
          const { data: existingDoc } = await supabase
            .from('agent_documents')
            .select('id, file_transcription')
            .eq('agent_id', agentId)
            .eq('file_name', file.name)
            .eq('file_size', file.size)
            .single();
          
          if (!existingDoc) {
            // Arquivo não existe no banco, pode processar
            filesToProcess.push(file);
          } else if (existingDoc && !existingDoc.file_transcription) {
            // Arquivo existe mas não tem transcrição, pode processar
            console.log('Arquivo existe mas sem transcrição, reprocessando:', file.name);
            filesToProcess.push(file);
          } else {
            // Arquivo existe e já tem transcrição, não processar
            console.log('Arquivo já existe e tem transcrição, pulando:', file.name);
          }
        }
      }
      
      console.log('=== DEBUG: Processando documentos no AgentDocuments ===');
      console.log('Total de arquivos recebidos:', files.length);
      console.log('Arquivos para processar:', filesToProcess.length);
      console.log('Arquivos:', filesToProcess);
      
      // Se não há arquivos para processar, apenas limpar a lista
      if (filesToProcess.length === 0) {
        console.log('Nenhum arquivo novo para processar');
        setUploadedFiles([]);
        setShowUpload(false);
        fetchDocuments();
        // Remover a chamada do onDocumentsChange para evitar fechar o modal
        return;
      }
      
      for (const file of filesToProcess) {
        console.log('Processando arquivo:', file.name, 'ID:', file.id, 'Tem file:', !!file.file);
        
        // Verificar se o arquivo já existe no banco antes de fazer upload
        const { data: existingDoc } = await supabase
          .from('agent_documents')
          .select('id, file_url, file_transcription')
          .eq('agent_id', agentId)
          .eq('file_name', file.name)
          .eq('file_size', file.size)
          .single();
        
        let docData;
        
        if (existingDoc && existingDoc.file_url && !existingDoc.file_transcription) {
          // Arquivo já existe no banco e storage, mas não tem transcrição
          console.log('Usando arquivo existente no banco:', file.name);
          docData = existingDoc;
        } else {
          // Fazer upload para o storage
          let fileUrl = '';
          if (file.file) {
            console.log('Fazendo upload do arquivo para o storage:', file.name);
            console.log('Tipo do arquivo:', file.file.type);
            console.log('Tamanho do arquivo:', file.file.size);
            
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = `${userId}/${agentId}/${fileName}`;
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
            agent_id: agentId,
            user_id: userId,
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            file_url: fileUrl
          });
          
          const { data: newDocData, error: docError } = await supabase
            .from('agent_documents')
            .insert({
              agent_id: agentId,
              user_id: userId,
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
            continue;
          }
          
          docData = newDocData;
          console.log('Documento salvo:', docData);
        }
        
        // Chamar webhook apenas se o documento não tem transcrição
        if (docData && !docData.file_transcription) {
          try {
            const webhookPayload = {
              user_id: userId,
              agent_id: agentId,
              file_name: file.name,
              file_type: file.type,
              file_url: docData.file_url
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
                    await mergeTranscriptionWithPrompt(agentId);
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
        } else {
          console.log('Documento já tem transcrição, pulando webhook:', file.name);
        }
      }
      
      console.log(`Processamento concluído: ${filesToProcess.length} documento(s) anexado(s) com sucesso!`);
      toast.success(`${filesToProcess.length} document(s) attached successfully!`);
      
      // Limpar a lista de arquivos após o processamento
      setUploadedFiles([]);
      setShowUpload(false);
      fetchDocuments();
      // Remover a chamada do onDocumentsChange para evitar fechar o modal
    } catch (error) {
      console.error('Erro ao processar documentos:', error);
      toast.error('Erro ao processar documentos anexados');
    } finally {
      setProcessingDocuments(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-pink-500" />
              <span>Knowledge Base Documents</span>
            </div>
            <Button
              onClick={() => setShowUpload(!showUpload)}
              variant="outline"
              size="sm"
              disabled={processingDocuments}
            >
              <Upload className="h-4 w-4 mr-2" />
              {showUpload ? 'Cancel' : 'Add Documents'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {processingDocuments && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Processing documents... Please wait while we upload, transcribe, and update your knowledge base.
              </AlertDescription>
            </Alert>
          )}
          
          {showUpload && (
            <div className="border-t pt-4">
              <FileUpload
                agentId={agentId}
                userId={userId}
                onFilesChange={handleFilesUploaded}
                uploadedFiles={uploadedFiles}
                maxFiles={5}
                maxFileSize={5 * 1024 * 1024} // 5MB
                acceptedTypes={['.pdf', '.doc', '.docx', '.txt', '.rtf', '.xlsx', '.xls', '.csv']}
              />
            </div>
          )}

          {documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No documents uploaded yet</p>
              <p className="text-sm text-gray-400">
                Upload documents to provide knowledge base for your AI agent
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900">
                Uploaded Documents ({documents.length})
              </h3>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <Card key={doc.id} className="border border-gray-200">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="flex-shrink-0">
                            {getFileIcon(doc.file_type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {doc.file_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(doc.file_size)} • {new Date(doc.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {doc.file_transcription ? 'Processed' : 'Uploaded'}
                          </Badge>
                          
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(doc.id, doc.file_name)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            disabled={processingDocuments}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {documents.length > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                These documents will be used as knowledge base for your AI agent. 
                The agent will be able to reference information from these documents when responding to users.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 