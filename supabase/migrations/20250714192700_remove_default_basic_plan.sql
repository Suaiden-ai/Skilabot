
-- Update the handle_new_user function to NOT set a default plan
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
  
  -- Create default AI configuration
  INSERT INTO public.ai_configurations (user_id, company_name)
  VALUES (new.id, 'Minha Empresa');
  
  RETURN new;
END;
$$;

-- Update existing profiles that have 'Basic' plan to NULL if they haven't paid
-- (This is optional - only run if you want to reset existing unpaid users)
-- UPDATE public.profiles 
-- SET plan = NULL 
-- WHERE plan = 'Basic' 
-- AND id NOT IN (
--   SELECT DISTINCT user_id 
--   FROM public.payment_history 
--   WHERE status = 'completed'
-- );
