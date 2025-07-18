import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const payloads = await req.json();
    console.log('Payloads recebidos:', payloads);

    if (!Array.isArray(payloads) || payloads.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Array de payloads é obrigatório' }),
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

    const results = [];

    for (const payload of payloads) {
      const { state, user_id } = payload;
      const inbox_id = String(payload.inbox_id);

      if (!inbox_id || !user_id) {
        console.error('Dados obrigatórios ausentes no payload:', payload);
        results.push({ error: 'inbox_id e user_id são obrigatórios', payload });
        continue;
      }

      try {
        // 1. Buscar conta Chatwoot existente do usuário
        const { data: chatwootAccount, error: accountError } = await supabaseClient
          .from('chatwoot_accounts')
          .select('*')
          .eq('user_id', user_id)
          .maybeSingle();

        if (accountError) {
          console.error('Erro ao buscar conta Chatwoot:', accountError);
          results.push({ error: 'Erro ao buscar conta Chatwoot', payload });
          continue;
        }

        if (!chatwootAccount) {
          console.error('Conta Chatwoot não encontrada para user_id:', user_id);
          results.push({ error: 'Conta Chatwoot não encontrada', payload });
          continue;
        }

        // 2. Verificar se o inbox_id já existe na tabela chatwoot_inboxes
        const { data: existingInbox, error: findInboxError } = await supabaseClient
          .from('chatwoot_inboxes')
          .select('*')
          .eq('inbox_id', inbox_id)
          .maybeSingle();

        if (findInboxError && findInboxError.code !== 'PGRST116') {
          console.error('Erro ao buscar inbox existente:', findInboxError);
          results.push({ error: 'Erro ao buscar inbox existente', payload });
          continue;
        }

        let inboxResult;

        if (existingInbox) {
          // Inbox já existe - atualizar informações
          console.log('Inbox já existe, atualizando:', inbox_id);
          
          const { data: updatedInbox, error: updateError } = await supabaseClient
            .from('chatwoot_inboxes')
            .update({
              chatwoot_account_id: chatwootAccount.id,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingInbox.id)
            .select()
            .single();

          if (updateError) {
            console.error('Erro ao atualizar inbox:', updateError);
            results.push({ error: 'Erro ao atualizar inbox', payload });
            continue;
          }

          inboxResult = { action: 'updated', inbox: updatedInbox };
        } else {
          // Novo inbox - criar registro
          console.log('Criando novo inbox:', { inbox_id, user_id, id_chatwoot: chatwootAccount.id_chatwoot });
          
          const { data: newInbox, error: insertError } = await supabaseClient
            .from('chatwoot_inboxes')
            .insert({
              user_id: user_id,
              inbox_id: inbox_id,
              id_chatwoot: chatwootAccount.id_chatwoot,
              chatwoot_account_id: chatwootAccount.id
            })
            .select()
            .single();

          if (insertError) {
            console.error('Erro ao criar novo inbox:', insertError);
            results.push({ error: 'Erro ao criar novo inbox', payload });
            continue;
          }

          inboxResult = { action: 'created', inbox: newInbox };
        }

        results.push({
          success: true,
          user_id: user_id,
          inbox_id: inbox_id,
          id_chatwoot: chatwootAccount.id_chatwoot,
          ...inboxResult
        });

        console.log('Processamento concluído com sucesso:', inboxResult);

      } catch (error) {
        console.error('Erro ao processar payload:', error);
        results.push({ error: 'Erro interno ao processar payload', payload });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Processados ${results.length} payloads`,
        results
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Erro geral na função:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
}); 