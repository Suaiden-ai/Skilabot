-- Add sectors field to ai_configurations table
ALTER TABLE public.ai_configurations 
ADD COLUMN sectors TEXT[] DEFAULT '{}';

-- Add comment to explain the field
COMMENT ON COLUMN public.ai_configurations.sectors IS 'Array of sectors for the AI agent (e.g., SDR, HR, Sales, Support)'; 