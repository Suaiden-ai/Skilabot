import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Troque por seu domínio em produção
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Só aceita POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }

  // (Opcional) Captura a API Key enviada no header Authorization
  const authHeader = req.headers.get("Authorization");
  // Se quiser obrigar a API Key, descomente abaixo:
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return new Response(JSON.stringify({ error: "Missing or invalid API Key" }), {
  //     status: 401,
  //     headers: {
  //       ...corsHeaders,
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }

  try {
    const body = await req.json();

    // Sua lógica aqui (exemplo: console.log(body, authHeader))
    // Exemplo: disparar webhook externo, salvar no banco, etc.

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid request", details: String(err) }), {
      status: 400,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});