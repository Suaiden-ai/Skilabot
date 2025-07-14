
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

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });
const priceIds = {
  basic: Deno.env.get("STRIPE_BASIC_PRICE_ID")!,
  medium: Deno.env.get("STRIPE_MEDIUM_PRICE_ID")!,
};

const planMap = {
  basic: "Basic",
  medium: "Intermediate", // ou "Intermediario" se preferir em português
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
    if (!authHeader) return new Response("Unauthorized", { status: 401, headers: corsHeaders() });
    const jwt = authHeader.replace("Bearer ", "");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const { data: { user }, error } = await supabase.auth.getUser(jwt);
    if (error || !user) return new Response("Unauthorized", { status: 401, headers: corsHeaders() });

    // 2. Parse body
    let plan;
    try {
      ({ plan } = await req.json());
    } catch {
      return new Response("Invalid body", { status: 400, headers: corsHeaders() });
    }
    if (!["basic", "medium"].includes(plan)) return new Response("Invalid plan", { status: 400, headers: corsHeaders() });

    // 3. Get or create Stripe customer
    let { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, email")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email || user.email,
        metadata: { user_id: user.id },
      });
      customerId = customer.id;
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // 4. Create Stripe Checkout Session
    const planValue = planMap[plan];
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [{ price: priceIds[plan], quantity: 1 }],
      success_url: `${Deno.env.get("FRONTEND_URL")}/success`,
      cancel_url: `${Deno.env.get("FRONTEND_URL")}/plans`,
      metadata: { user_id: user.id, plan: planValue },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: corsHeaders({ "Content-Type": "application/json" }),
    });
  } catch (err) {
    return new Response("Internal Server Error", { status: 500, headers: corsHeaders() });
  }
});
