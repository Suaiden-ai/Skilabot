
-- Adicionar coluna final_prompt na tabela whatsapp_connections
ALTER TABLE public.whatsapp_connections 
ADD COLUMN final_prompt TEXT;

-- Criar índice para melhor performance nas consultas
CREATE INDEX idx_whatsapp_connections_final_prompt ON public.whatsapp_connections(final_prompt);
