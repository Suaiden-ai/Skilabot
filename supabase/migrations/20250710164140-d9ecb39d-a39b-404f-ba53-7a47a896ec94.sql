
-- Ajustar a tabela chatwoot_inboxes para ter relacionamento com chatwoot_accounts
ALTER TABLE public.chatwoot_inboxes 
DROP CONSTRAINT IF EXISTS chatwoot_inboxes_user_id_fkey;

-- Adicionar foreign key para chatwoot_accounts baseado no id_chatwoot
ALTER TABLE public.chatwoot_inboxes 
ADD COLUMN IF NOT EXISTS chatwoot_account_id UUID REFERENCES public.chatwoot_accounts(id);

-- Criar índice para performance
CREATE INDEX IF NOT EXISTS idx_chatwoot_inboxes_chatwoot_account_id 
ON public.chatwoot_inboxes(chatwoot_account_id);

-- Ajustar chatwoot_leads para referenciar chatwoot_inboxes
ALTER TABLE public.chatwoot_leads 
ADD COLUMN IF NOT EXISTS chatwoot_inbox_id UUID REFERENCES public.chatwoot_inboxes(id);

-- Criar índice para performance  
CREATE INDEX IF NOT EXISTS idx_chatwoot_leads_chatwoot_inbox_id 
ON public.chatwoot_leads(chatwoot_inbox_id);

-- Garantir que chatwoot_accounts tenha constraint única por usuário
ALTER TABLE public.chatwoot_accounts 
DROP CONSTRAINT IF EXISTS unique_user_chatwoot_account;

ALTER TABLE public.chatwoot_accounts 
ADD CONSTRAINT unique_user_chatwoot_account UNIQUE (user_id);

-- Garantir que cada inbox_id seja único globalmente
ALTER TABLE public.chatwoot_inboxes 
DROP CONSTRAINT IF EXISTS unique_inbox_id;

ALTER TABLE public.chatwoot_inboxes 
ADD CONSTRAINT unique_inbox_id UNIQUE (inbox_id);

-- Habilitar RLS na tabela chatwoot_inboxes se não estiver
ALTER TABLE public.chatwoot_inboxes ENABLE ROW LEVEL SECURITY;

-- Políticas para chatwoot_inboxes
DROP POLICY IF EXISTS "Users can view their own inboxes" ON public.chatwoot_inboxes;
CREATE POLICY "Users can view their own inboxes" 
ON public.chatwoot_inboxes 
FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert their own inboxes" ON public.chatwoot_inboxes;
CREATE POLICY "Users can insert their own inboxes" 
ON public.chatwoot_inboxes 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "System can manage inboxes" ON public.chatwoot_inboxes;
CREATE POLICY "System can manage inboxes" 
ON public.chatwoot_inboxes 
FOR ALL 
USING (true);
