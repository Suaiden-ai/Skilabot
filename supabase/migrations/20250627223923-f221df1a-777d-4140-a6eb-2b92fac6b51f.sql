
-- Criar tabela para rastrear conexões do WhatsApp com Evolution API
CREATE TABLE public.whatsapp_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  ai_configuration_id UUID REFERENCES public.ai_configurations(id) NOT NULL,
  evolution_instance_id TEXT NOT NULL,
  connection_status TEXT NOT NULL DEFAULT 'connecting', -- connecting, connected, disconnected, error
  connected_at TIMESTAMP WITH TIME ZONE,
  disconnected_at TIMESTAMP WITH TIME ZONE,
  phone_number TEXT,
  qr_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS para garantir que usuários só vejam suas próprias conexões
ALTER TABLE public.whatsapp_connections ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas suas próprias conexões
CREATE POLICY "Users can view their own whatsapp connections" 
  ON public.whatsapp_connections 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para usuários criarem suas próprias conexões
CREATE POLICY "Users can create their own whatsapp connections" 
  ON public.whatsapp_connections 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para usuários atualizarem suas próprias conexões
CREATE POLICY "Users can update their own whatsapp connections" 
  ON public.whatsapp_connections 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Adicionar coluna json_robo na tabela prompt_history se não existir
ALTER TABLE public.prompt_history 
ADD COLUMN IF NOT EXISTS json_robo JSONB;

-- Adicionar índices para melhor performance
CREATE INDEX idx_whatsapp_connections_user_id ON public.whatsapp_connections(user_id);
CREATE INDEX idx_whatsapp_connections_ai_config_id ON public.whatsapp_connections(ai_configuration_id);
CREATE INDEX idx_whatsapp_connections_status ON public.whatsapp_connections(connection_status);
