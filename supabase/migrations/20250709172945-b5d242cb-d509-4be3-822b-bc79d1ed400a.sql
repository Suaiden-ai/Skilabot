
-- Primeiro, vamos remover a restrição que pode estar impedindo múltiplos registros
-- e criar uma estrutura que permita múltiplos leads por usuário e por inbox_id

-- Criar uma tabela separada para leads do Chatwoot
CREATE TABLE IF NOT EXISTS public.chatwoot_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  inbox_id TEXT NOT NULL,
  name_lead TEXT NOT NULL,
  phone_lead TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Índices para performance
  CONSTRAINT unique_lead_per_inbox UNIQUE (inbox_id, name_lead, phone_lead)
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_chatwoot_leads_user_id ON public.chatwoot_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_chatwoot_leads_inbox_id ON public.chatwoot_leads(inbox_id);

-- Habilitar RLS
ALTER TABLE public.chatwoot_leads ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can view their own leads" 
ON public.chatwoot_leads 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own leads" 
ON public.chatwoot_leads 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads" 
ON public.chatwoot_leads 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert leads" 
ON public.chatwoot_leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update leads" 
ON public.chatwoot_leads 
FOR UPDATE 
USING (true);
