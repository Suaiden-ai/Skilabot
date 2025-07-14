
-- Adicionar as novas colunas na tabela chatwoot_accounts
ALTER TABLE public.chatwoot_accounts 
ADD COLUMN IF NOT EXISTS name_lead TEXT,
ADD COLUMN IF NOT EXISTS phone_lead TEXT;

-- O inbox_id já existe na tabela segundo o schema atual
-- Mas vamos garantir que ele possa ser usado para relacionar com as conversas
-- Criar um índice para melhorar a performance das consultas por inbox_id
CREATE INDEX IF NOT EXISTS idx_chatwoot_accounts_inbox_id ON public.chatwoot_accounts(inbox_id);

-- Política para permitir atualizações via webhook (sistema)
-- Vamos criar uma política que permite atualizações baseadas no inbox_id
CREATE POLICY "System can update chatwoot accounts by inbox_id" 
ON public.chatwoot_accounts 
FOR UPDATE 
USING (true);

-- Criar tabela para armazenar inboxes do Chatwoot
CREATE TABLE IF NOT EXISTS public.chatwoot_inboxes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users,
  id_chatwoot TEXT NOT NULL,
  inbox_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_inbox_per_user UNIQUE (user_id, inbox_id)
);
