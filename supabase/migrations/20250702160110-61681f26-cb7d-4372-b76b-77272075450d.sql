
-- Remove a constraint única que limita um usuário a ter apenas uma configuração de AI
ALTER TABLE public.ai_configurations DROP CONSTRAINT IF EXISTS ai_configurations_user_id_key;

-- Adiciona um índice não-único para manter a performance nas consultas
CREATE INDEX IF NOT EXISTS idx_ai_configurations_user_id ON public.ai_configurations(user_id);
