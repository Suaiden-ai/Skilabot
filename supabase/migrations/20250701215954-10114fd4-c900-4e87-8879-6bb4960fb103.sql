
-- Criar tabela para definir limites por plano
CREATE TABLE public.plan_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_name TEXT NOT NULL UNIQUE,
  max_agents INTEGER NOT NULL DEFAULT 1,
  max_whatsapp_connections INTEGER NOT NULL DEFAULT 1,
  has_specialized_consulting BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir limites para os planos existentes
INSERT INTO public.plan_limits (plan_name, max_agents, max_whatsapp_connections, has_specialized_consulting) VALUES
('Basic', 1, 1, false),
('Intermediário', 3, 3, true),
('Premium', 10, 10, true);

-- Habilitar RLS na tabela plan_limits
ALTER TABLE public.plan_limits ENABLE ROW LEVEL SECURITY;

-- Política para permitir que todos os usuários autenticados vejam os limites dos planos
CREATE POLICY "All authenticated users can view plan limits" 
  ON public.plan_limits 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Política para apenas admins modificarem os limites dos planos
CREATE POLICY "Only admins can modify plan limits" 
  ON public.plan_limits 
  FOR ALL 
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::user_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::user_role));
