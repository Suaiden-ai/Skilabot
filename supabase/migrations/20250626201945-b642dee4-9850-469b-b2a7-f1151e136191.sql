
-- Create table to store user prompt history
CREATE TABLE public.prompt_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  ai_configuration_id UUID REFERENCES public.ai_configurations(id) NOT NULL,
  final_prompt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.prompt_history ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own prompt history
CREATE POLICY "Users can view their own prompt history" 
  ON public.prompt_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own prompt history
CREATE POLICY "Users can insert their own prompt history" 
  ON public.prompt_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own prompt history
CREATE POLICY "Users can update their own prompt history" 
  ON public.prompt_history 
  FOR UPDATE 
  USING (auth.uid() = user_id);
