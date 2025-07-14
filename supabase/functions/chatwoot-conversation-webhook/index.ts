
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name_lead, phone_lead, inbox_id, account_id, nameinbox, data_e_hora, id_conversa } = body;

    if (!name_lead || !phone_lead || !inbox_id) {
      console.error('Dados obrigatórios ausentes:', { name_lead, phone_lead, inbox_id });
      return new Response(
        JSON.stringify({ error: 'name_lead, phone_lead e inbox_id são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Processando dados do lead:', { name_lead, phone_lead, inbox_id, account_id, nameinbox, data_e_hora });

    // Buscar user_id na tabela chatwoot_inboxes
    const { data: chatwootInbox, error: findInboxError } = await supabaseClient.from('chatwoot_inboxes').select('user_id').eq('inbox_id', String(inbox_id)).maybeSingle();

    if (findInboxError) {
      console.error('Erro ao buscar inbox Chatwoot:', findInboxError);
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar inbox Chatwoot' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!chatwootInbox) {
      console.error('Nenhuma conta Chatwoot encontrada para inbox_id:', inbox_id);
      return new Response(
        JSON.stringify({ 
          error: 'Nenhuma conta Chatwoot encontrada para este inbox_id. O usuário deve primeiro conectar o WhatsApp.' 
        }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const user_id = chatwootInbox.user_id;

    // Verificar se já existe um lead com a mesma combinação (inbox_id, name_lead, phone_lead)
    const { data: existingLead, error: findLeadError } = await supabaseClient
      .from('chatwoot_leads')
      .select('*')
      .eq('inbox_id', String(inbox_id))
      .eq('name_lead', name_lead)
      .eq('phone_lead', phone_lead)
      .maybeSingle();

    if (findLeadError) {
      console.error('Erro ao buscar lead existente:', findLeadError);
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar lead existente' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    let result;

    if (existingLead) {
      // Lead já existe - atualizar também os campos extras
      console.log('Lead já existe, atualizando campos extras:', { name_lead, phone_lead, inbox_id, account_id, nameinbox, data_e_hora });
      
      const { error: updateError } = await supabaseClient
        .from('chatwoot_leads')
        .update({
          updated_at: new Date().toISOString(),
          account_id,
          nameinbox,
          data_e_hora,
          id_conversa
        })
        .eq('id', existingLead.id);

      if (updateError) {
        console.error('Erro ao atualizar lead:', updateError);
        return new Response(
          JSON.stringify({ error: 'Erro ao atualizar lead' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      result = { action: 'updated', lead_id: existingLead.id, user_id };
    } else {
      // Novo lead - criar registro com todos os campos
      console.log('Criando novo lead:', { name_lead, phone_lead, inbox_id, user_id, account_id, nameinbox, data_e_hora });
      
      const { data: newLead, error: insertError } = await supabaseClient
        .from('chatwoot_leads')
        .insert({
          user_id,
          inbox_id: String(inbox_id),
          name_lead,
          phone_lead,
          account_id,
          nameinbox,
          data_e_hora,
          id_conversa
        })
        .select()
        .single();

      if (insertError) {
        console.error('Erro ao criar novo lead:', insertError);
        return new Response(
          JSON.stringify({ error: 'Erro ao criar novo lead' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      result = { action: 'created', lead_id: newLead.id, user_id };
    }

    console.log('Lead processado com sucesso:', result);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Lead ${result.action === 'updated' ? 'atualizado' : 'criado'} com sucesso`,
        user_id: result.user_id,
        lead_id: result.lead_id,
        action: result.action,
        lead_data: {
          name_lead,
          phone_lead,
          inbox_id: String(inbox_id),
          account_id,
          nameinbox,
          data_e_hora,
          id_conversa
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Erro no webhook da conversa Chatwoot:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
