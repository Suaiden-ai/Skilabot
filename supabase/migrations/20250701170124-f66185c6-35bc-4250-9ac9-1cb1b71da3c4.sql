
-- Permitir que usuários excluam suas próprias conexões WhatsApp
CREATE POLICY "Users can delete their own whatsapp connections" 
  ON public.whatsapp_connections 
  FOR DELETE 
  USING (auth.uid() = user_id);
