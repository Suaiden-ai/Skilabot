-- Criar tabela para armazenar documentos anexados aos agentes
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

-- Criar índices para melhor performance
CREATE INDEX idx_agent_documents_agent_id ON public.agent_documents(agent_id);
CREATE INDEX idx_agent_documents_user_id ON public.agent_documents(user_id);

-- Habilitar RLS na tabela
ALTER TABLE public.agent_documents ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS para agent_documents
CREATE POLICY "Users can view their own agent documents" 
  ON public.agent_documents 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own agent documents" 
  ON public.agent_documents 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own agent documents" 
  ON public.agent_documents 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own agent documents" 
  ON public.agent_documents 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Criar bucket de storage para documentos dos agentes (se não existir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('agent-documents', 'agent-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Política de storage para agent-documents
CREATE POLICY "Users can upload their own agent documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'agent-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own agent documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'agent-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own agent documents"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'agent-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own agent documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'agent-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  ); 