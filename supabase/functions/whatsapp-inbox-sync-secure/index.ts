import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    
    // Validate required fields
    if (!Array.isArray(body) || body.length === 0) {
      return new Response(
        JSON.stringify({ error: "Array of inbox data is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const results = [];

    // Process each inbox payload
    for (const inboxPayload of body) {
      if (!inboxPayload.user_id || !inboxPayload.ai_configuration_id || !inboxPayload.inbox_id) {
        results.push({ 
          error: "Missing required fields: user_id, ai_configuration_id, or inbox_id",
          payload: inboxPayload 
        });
        continue;
      }

      try {
        // Insert or update whatsapp inbox data
        const { data, error } = await supabase
          .from('whatsapp_inboxes')
          .upsert({
            user_id: inboxPayload.user_id,
            ai_configuration_id: inboxPayload.ai_configuration_id,
            inbox_id: inboxPayload.inbox_id,
            inbox_name: inboxPayload.inbox_name || null,
            inbox_type: inboxPayload.inbox_type || 'whatsapp',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,ai_configuration_id,inbox_id'
          });

        if (error) {
          console.error('Error saving whatsapp inbox:', error);
          results.push({ 
            error: error.message,
            payload: inboxPayload 
          });
        } else {
          results.push({ 
            success: true, 
            data: data,
            payload: inboxPayload 
          });
        }
      } catch (error) {
        console.error('Error processing inbox payload:', error);
        results.push({ 
          error: "Failed to process inbox data",
          payload: inboxPayload 
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        results: results 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
}) 