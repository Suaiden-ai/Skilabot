
-- Criar tabela para armazenar informações do Chatwoot
CREATE TABLE public.chatwoot_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  chatwoot_user_name TEXT NOT NULL,
  chatwoot_email TEXT NOT NULL,
  chatwoot_password TEXT NOT NULL,
  chatwoot_access_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS para garantir que usuários só vejam suas próprias contas
ALTER TABLE public.chatwoot_accounts ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas suas próprias contas do Chatwoot
CREATE POLICY "Users can view their own chatwoot accounts" 
  ON public.chatwoot_accounts 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para usuários criarem suas próprias contas do Chatwoot
CREATE POLICY "Users can create their own chatwoot accounts" 
  ON public.chatwoot_accounts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para usuários atualizarem suas próprias contas do Chatwoot
CREATE POLICY "Users can update their own chatwoot accounts" 
  ON public.chatwoot_accounts 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Adicionar índices para melhor performance
CREATE INDEX idx_chatwoot_accounts_user_id ON public.chatwoot_accounts(user_id);
CREATE UNIQUE INDEX idx_chatwoot_accounts_user_email ON public.chatwoot_accounts(user_id, chatwoot_email);
