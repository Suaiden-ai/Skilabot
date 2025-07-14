
import { serve } from "https://deno.land/std/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.14.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

serve(async (req) => {
  // Exigir Authorization com token fixo
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response("Missing authorization header", { status: 401, headers: { "Access-Control-Allow-Origin": "*" } });
  }
  const expectedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd3FoeXRkb2dhZ253d2huZGp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDg2NTg3MSwiZXhwIjoyMDY2NDQxODcxfQ.sUfQQPwbBR_ihXqs06CbCulGwP3y_hRG8RX9eYa69Qo";
  if (authHeader !== `Bearer ${expectedToken}`) {
    return new Response("Invalid authorization token", { status: 403, headers: { "Access-Control-Allow-Origin": "*" } });
  }

  // NÃO exija Authorization aqui!
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}` || "Webhook Error", { status: 400, headers: { "Access-Control-Allow-Origin": "*" } });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const plan = session.metadata?.plan;
    const customerId = session.customer as string;

    if (userId && plan && customerId) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );
      // Atualiza plano do usuário
      await supabase
        .from("profiles")
        .update({ plan })
        .eq("id", userId);

      // Salva histórico de pagamento
      await supabase.from("payment_history").insert([
        {
          user_id: userId,
          stripe_customer_id: customerId,
          plan,
          status: "active",
          amount: session.amount_total ? session.amount_total / 100 : null,
          currency: session.currency,
          stripe_session_id: session.id,
          created_at: new Date().toISOString(),
        },
      ]);
    }
  }

  return new Response("ok", { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
});
