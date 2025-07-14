
-- Criar tabela para armazenar os dados de teste do chatbot
CREATE TABLE public.chatbot_test_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  ai_configuration_id UUID REFERENCES public.ai_configurations(id) NOT NULL,
  conversation_id TEXT NOT NULL,
  json_teste JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS para garantir que usuários só vejam seus próprios dados
ALTER TABLE public.chatbot_test_data ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas seus próprios dados de teste
CREATE POLICY "Users can view their own test data" 
  ON public.chatbot_test_data 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para usuários criarem seus próprios dados de teste
CREATE POLICY "Users can create their own test data" 
  ON public.chatbot_test_data 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para usuários atualizarem seus próprios dados de teste
CREATE POLICY "Users can update their own test data" 
  ON public.chatbot_test_data 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Adicionar coluna para marcar se o usuário já testou o AGENT AI
ALTER TABLE public.ai_configurations 
ADD COLUMN has_tested BOOLEAN DEFAULT FALSE;

-- Adicionar índices para melhor performance
CREATE INDEX idx_chatbot_test_data_user_id ON public.chatbot_test_data(user_id);
CREATE INDEX idx_chatbot_test_data_ai_config_id ON public.chatbot_test_data(ai_configuration_id);
CREATE INDEX idx_chatbot_test_data_conversation_id ON public.chatbot_test_data(conversation_id);
