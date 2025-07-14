
-- Adicionar os campos id_chatwoot e user_id_chatwoot na tabela chatwoot_accounts
ALTER TABLE public.chatwoot_accounts 
ADD COLUMN IF NOT EXISTS id_chatwoot TEXT,
ADD COLUMN IF NOT EXISTS user_id_chatwoot TEXT;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_chatwoot_accounts_id_chatwoot ON public.chatwoot_accounts(id_chatwoot);
CREATE INDEX IF NOT EXISTS idx_chatwoot_accounts_user_id_chatwoot ON public.chatwoot_accounts(user_id_chatwoot);
