-- Add support_email field to ai_configurations table
ALTER TABLE public.ai_configurations
ADD COLUMN support_email TEXT;

-- Add comment to explain the field
COMMENT ON COLUMN public.ai_configurations.support_email IS 'Optional support email for the AI agent'; 