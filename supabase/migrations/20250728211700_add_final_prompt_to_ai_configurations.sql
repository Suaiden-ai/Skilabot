-- Adicionar coluna final_prompt na tabela ai_configurations se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'ai_configurations' 
        AND column_name = 'final_prompt'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.ai_configurations ADD COLUMN final_prompt TEXT;
    END IF;
END $$;

-- Adicionar coluna agent_type na tabela ai_configurations se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'ai_configurations' 
        AND column_name = 'agent_type'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.ai_configurations ADD COLUMN agent_type TEXT;
    END IF;
END $$;

-- Remover a constraint UNIQUE(user_id) se existir, pois agora podemos ter múltiplos agentes
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'ai_configurations' 
        AND constraint_name = 'ai_configurations_user_id_key'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.ai_configurations DROP CONSTRAINT ai_configurations_user_id_key;
    END IF;
END $$; 