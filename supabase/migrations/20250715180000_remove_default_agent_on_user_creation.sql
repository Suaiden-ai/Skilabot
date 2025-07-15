-- Remover criação automática de AGENT (ai_configurations) ao criar novo usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role, plan)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'name', new.email),
    'user',
    NULL  -- Não define plano automaticamente
  );
  -- Não cria mais configuração de IA padrão
  RETURN new;
END;
$$; 