
-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- Add role column to profiles table
ALTER TABLE public.profiles ADD COLUMN role public.user_role DEFAULT 'user';

-- Update the handle_new_user function to set default role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'name', new.email),
    'user'
  );
  
  -- Create default AI configuration
  INSERT INTO public.ai_configurations (user_id, company_name)
  VALUES (new.id, 'Minha Empresa');
  
  RETURN new;
END;
$$;

-- Create function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role user_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
      AND role = _role
  )
$$;

-- Add policy for admins to view all profiles
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

-- Add policy for admins to view all AI configurations
CREATE POLICY "Admins can view all AI configurations" 
  ON public.ai_configurations 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));
