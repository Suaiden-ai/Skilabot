-- Criar tabela para salvar as configurações das colunas do kanban
CREATE TABLE public.kanban_columns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  column_id TEXT NOT NULL,
  column_name TEXT NOT NULL,
  column_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS para garantir que usuários só vejam suas próprias colunas
ALTER TABLE public.kanban_columns ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas suas próprias colunas
CREATE POLICY "Users can view their own kanban columns" 
  ON public.kanban_columns 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para usuários criarem suas próprias colunas
CREATE POLICY "Users can create their own kanban columns" 
  ON public.kanban_columns 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para usuários atualizarem suas próprias colunas
CREATE POLICY "Users can update their own kanban columns" 
  ON public.kanban_columns 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Política para usuários deletarem suas próprias colunas
CREATE POLICY "Users can delete their own kanban columns" 
  ON public.kanban_columns 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Adicionar índices para melhor performance
CREATE INDEX idx_kanban_columns_user_id ON public.kanban_columns(user_id);
CREATE INDEX idx_kanban_columns_order ON public.kanban_columns(column_order);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_kanban_columns_updated_at 
    BEFORE UPDATE ON public.kanban_columns 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 