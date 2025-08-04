# Sistema de Upload de Documentos para Agentes AI

## Visão Geral

Este sistema permite que usuários anexem documentos como base de conhecimento para seus agentes AI. Os documentos são armazenados de forma segura no Supabase Storage e referenciados na base de dados.

## Funcionalidades Implementadas

### 1. Upload de Documentos
- **Tipos suportados**: PDF, DOC, DOCX, TXT, RTF, XLSX, XLS, CSV
- **Tamanho máximo**: 5MB por arquivo
- **Limite**: 5 arquivos por agente
- **Upload por drag & drop** ou seleção de arquivos

### 2. Gerenciamento de Documentos
- Visualização de documentos anexados
- Download de documentos
- Remoção de documentos
- Status de upload em tempo real

### 3. Integração com Agentes
- Documentos vinculados a agentes específicos
- Acesso apenas aos documentos do próprio usuário
- Políticas de segurança (RLS) implementadas

## Estrutura do Banco de Dados

### Tabela `agent_documents`
```sql
CREATE TABLE public.agent_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL REFERENCES public.ai_configurations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_content TEXT, -- Para armazenar o conteúdo extraído do documento
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Storage Bucket
- **Nome**: `agent-documents`
- **Visibilidade**: Privado
- **Estrutura**: `{user_id}/{agent_id}/{filename}`

## Componentes Criados

### 1. `FileUpload` (`src/components/ui/file-upload.tsx`)
Componente reutilizável para upload de arquivos com:
- Drag & drop
- Validação de tipos e tamanhos
- Progress bar
- Preview de arquivos
- Remoção de arquivos

### 2. `AgentDocuments` (`src/components/agents/AgentDocuments.tsx`)
Componente para gerenciar documentos de um agente específico:
- Lista de documentos
- Upload de novos documentos
- Download e remoção
- Status de documentos

### 3. Atualização do `DashboardOverview`
- Novo step (Step 3) para upload de documentos
- Integração com o processo de criação de agentes

### 4. Atualização do `AgentDialog`
- Abas para separar configurações e documentos
- Integração com `AgentDocuments`

## Fluxo de Uso

### Criação de Agente com Documentos
1. Usuário acessa `/create-agent`
2. Preenche informações básicas (Step 1)
3. Configura prompt personalizado (Step 2)
4. **Novo**: Faz upload de documentos (Step 3)
5. Cria o agente com documentos anexados

### Edição de Agente
1. Usuário edita um agente existente
2. Acessa aba "Knowledge Base"
3. Gerencia documentos anexados
4. Pode adicionar, remover ou baixar documentos

## Segurança

### Row Level Security (RLS)
- Usuários só podem ver seus próprios documentos
- Usuários só podem inserir documentos para seus agentes
- Usuários só podem atualizar/deletar seus próprios documentos

### Storage Policies
- Usuários só podem fazer upload para suas pastas
- Usuários só podem acessar seus próprios arquivos
- Estrutura de pastas por usuário e agente

## Limitações e Considerações

### Limitações Atuais
- Tamanho máximo de 5MB por arquivo
- Máximo de 5 arquivos por agente
- Tipos de arquivo limitados
- Não há extração automática de conteúdo

### Melhorias Futuras
- Extração de texto de PDFs
- Processamento de documentos para IA
- Suporte a mais tipos de arquivo
- Compressão automática de imagens
- OCR para documentos escaneados

## Configuração

### Variáveis de Ambiente
Não são necessárias novas variáveis de ambiente, pois usa as configurações existentes do Supabase.

### Migração
A migração `20250101000000_create_agent_documents.sql` deve ser aplicada:
```bash
supabase db push
```

## Uso da API

### Upload de Documento
```typescript
const { data, error } = await supabase.storage
  .from('agent-documents')
  .upload(`${userId}/${agentId}/${filename}`, file);
```

### Listar Documentos
```typescript
const { data, error } = await supabase
  .from('agent_documents')
  .select('*')
  .eq('agent_id', agentId);
```

### Deletar Documento
```typescript
// Remover do banco
await supabase
  .from('agent_documents')
  .delete()
  .eq('id', documentId);

// Remover do storage
await supabase.storage
  .from('agent-documents')
  .remove([filePath]);
```

## Testes

### Testes Manuais
1. Criar um novo agente com documentos
2. Editar um agente existente e adicionar documentos
3. Testar download de documentos
4. Testar remoção de documentos
5. Verificar permissões de acesso

### Cenários de Teste
- Upload de arquivos válidos
- Tentativa de upload de arquivos inválidos
- Upload de múltiplos arquivos
- Remoção de documentos
- Acesso a documentos de outros usuários (deve falhar)

## Troubleshooting

### Problemas Comuns
1. **Erro de upload**: Verificar permissões do bucket
2. **Erro de acesso**: Verificar políticas RLS
3. **Arquivo não encontrado**: Verificar se o arquivo foi removido do storage

### Logs
Verificar logs do Supabase para:
- Erros de upload
- Violações de políticas RLS
- Problemas de storage

## Contribuição

Para adicionar novas funcionalidades:
1. Atualizar tipos no `types.ts`
2. Criar migrações se necessário
3. Atualizar componentes
4. Adicionar testes
5. Atualizar documentação 