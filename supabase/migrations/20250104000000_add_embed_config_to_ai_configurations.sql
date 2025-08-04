-- Add embed_config column to ai_configurations table
ALTER TABLE ai_configurations 
ADD COLUMN embed_config JSONB DEFAULT NULL;

-- Add comment to explain the column
COMMENT ON COLUMN ai_configurations.embed_config IS 'Configuration for embedding the chatbot widget on external websites'; 