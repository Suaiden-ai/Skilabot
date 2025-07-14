
-- Remove qualquer valor padrão da coluna plan
ALTER TABLE public.profiles ALTER COLUMN plan DROP DEFAULT;

-- Atualiza a função handle_new_user para NÃO definir plano
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
    NULL  -- Explicitamente NULL - sem plano até pagamento
  );
  
  -- Create default AI configuration
  INSERT INTO public.ai_configurations (user_id, company_name)
  VALUES (new.id, 'Minha Empresa');
  
  RETURN new;
END;
$$;

-- Remove qualquer plano "Basic" de usuários que não pagaram
UPDATE public.profiles 
SET plan = NULL 
WHERE plan = 'Basic' 
AND id NOT IN (
  SELECT DISTINCT user_id 
  FROM public.payment_history 
  WHERE status = 'completed'
);
