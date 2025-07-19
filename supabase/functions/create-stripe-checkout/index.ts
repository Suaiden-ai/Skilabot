
import { serve } from "https://deno.land/std/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.14.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function corsHeaders(extra = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    ...extra,
  };
}

// Função para obter a URL base correta
function getBaseUrl(req: Request): string {
  // Primeiro, tenta pegar do header Origin
  const origin = req.headers.get("Origin");
  if (origin) {
    return origin;
  }
  
  // Se não tiver Origin, tenta pegar do header Referer
  const referer = req.headers.get("Referer");
  if (referer) {
    try {
      const url = new URL(referer);
      return `${url.protocol}//${url.host}`;
    } catch (e) {
      console.log("Invalid Referer URL:", referer);
    }
  }
  
  // Fallback para a variável de ambiente
  const envUrl = Deno.env.get("FRONTEND_URL");
  if (envUrl) {
    return envUrl;
  }
  
  // Último fallback
  return "https://skilabot.com";
}

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });
const priceIds = {
  basic: Deno.env.get("STRIPE_BASIC_PRICE_ID")!,
  Intermediate: Deno.env.get("STRIPE_INTERMEDIATE_PRICE_ID")!,
};

const planMap = {
  basic: "Basic",
  Intermediate: "Intermediate", // ou "Intermediario" se preferir em português
};

serve(async (req) => {
  try {
    // Suporte a CORS
    if (req.method === "OPTIONS") {
      return new Response("ok", {
        headers: corsHeaders(),
      });
    }

    // 1. Auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.log("No Authorization header");
      return new Response("Unauthorized", { status: 401, headers: corsHeaders() });
    }
    const jwt = authHeader.replace("Bearer ", "");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const { data: { user }, error } = await supabase.auth.getUser(jwt);
    if (error || !user) {
      console.log("Auth error or no user", error, user);
      return new Response("Unauthorized", { status: 401, headers: corsHeaders() });
    }

    // 2. Parse body
    let plan;
    try {
      ({ plan } = await req.json());
      console.log("Requested plan:", plan);
    } catch (e) {
      console.log("Invalid body", e);
      return new Response("Invalid body", { status: 400, headers: corsHeaders() });
    }
    if (!["basic", "Intermediate"].includes(plan)) {
      console.log("Invalid plan value:", plan);
      return new Response("Invalid plan", { status: 400, headers: corsHeaders() });
    }

    // 3. Get or create Stripe customer
    let { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("stripe_customer_id, email")
      .eq("id", user.id)
      .single();
    if (profileError) {
      console.log("Error fetching profile:", profileError);
    }
    console.log("Profile:", profile);

    let customerId = profile?.stripe_customer_id;
    if (!customerId) {
      try {
        const customer = await stripe.customers.create({
          email: profile?.email || user.email,
          metadata: { user_id: user.id },
        });
        customerId = customer.id;
        await supabase
          .from("profiles")
          .update({ stripe_customer_id: customerId })
          .eq("id", user.id);
        console.log("Created new Stripe customer:", customerId);
      } catch (e) {
        console.log("Error creating Stripe customer:", e);
        throw e;
      }
    }

    // 4. Verificar se é a primeira assinatura do usuário
    let subscriptions;
    try {
      subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        limit: 10
      });
      console.log("Stripe subscriptions:", subscriptions);
    } catch (e) {
      console.log("Error fetching subscriptions:", e);
      throw e;
    }
    
    // Verifica se o usuário já teve alguma assinatura ativa (não apenas ativa agora)
    const hasActiveSubscription = subscriptions.data.some(sub => 
      sub.status === 'active' || sub.status === 'trialing'
    );
    const hasPastSubscription = subscriptions.data.some(sub => 
      sub.status === 'canceled' || sub.status === 'unpaid' || sub.status === 'past_due'
    );
    
    // Aplica trial apenas se nunca teve assinatura ativa
    const isFirstSubscription = !hasActiveSubscription && !hasPastSubscription;
    console.log("Is first subscription:", isFirstSubscription);
    console.log("Has active subscription:", hasActiveSubscription);
    console.log("Has past subscription:", hasPastSubscription);

    // 5. Obter a URL base correta
    const baseUrl = getBaseUrl(req);
    console.log("Using base URL:", baseUrl);

    // 6. Create Stripe Checkout Session
    const planValue = planMap[plan];
    let session;
    try {
      const sessionConfig: any = {
        mode: "subscription",
        payment_method_types: ["card"],
        customer: customerId,
        line_items: [{ price: priceIds[plan], quantity: 1 }],
        success_url: `${baseUrl}/success`,
        cancel_url: `${baseUrl}/plans`,
        metadata: { user_id: user.id, plan: planValue }
      };

      // Adiciona trial period apenas para primeira assinatura
      if (isFirstSubscription) {
        sessionConfig.subscription_data = { trial_period_days: 7 };
        console.log("Adding 7-day trial period for first subscription");
      } else {
        console.log("No trial period - user has previous subscriptions");
      }

      session = await stripe.checkout.sessions.create(sessionConfig);
      console.log("Stripe checkout session created:", session);
    } catch (e) {
      console.log("Error creating Stripe checkout session:", e);
      throw e;
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: corsHeaders({ "Content-Type": "application/json" }),
    });
  } catch (err) {
    console.log("Internal Server Error:", err);
    return new Response("Internal Server Error", { status: 500, headers: corsHeaders() });
  }
});
