
import { serve } from "https://deno.land/std/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.14.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
console.log("endpointSecret:", endpointSecret);
console.log("TEST_SECRET:", Deno.env.get("TEST_SECRET"));

serve(async (req) => {
  console.log("Webhook chamado!");
  // NÃO exija Authorization aqui!
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig!, endpointSecret);
    console.log("Evento Stripe recebido:", event.type);
  } catch (err) {
    console.error("Erro ao validar assinatura do Stripe:", err);
    return new Response(`Webhook Error: ${err.message}` || "Webhook Error", { status: 400, headers: { "Access-Control-Allow-Origin": "*" } });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Processando checkout.session.completed para session:", session.id);
    const userId = session.metadata?.user_id;
    const plan = session.metadata?.plan;
    const customerId = session.customer as string;

    if (userId && plan && customerId) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );
      // Atualiza plano e status do usuário
      await supabase
        .from("profiles")
        .update({ plan, status: "active" })
        .eq("id", userId);

      // Salva histórico de pagamento
      const { error } = await supabase.from("payment_history").insert([
        {
          user_id: userId,
          stripe_customer_id: customerId,
          plan_type: plan,
          status: "active",
          amount: session.amount_total ? session.amount_total / 100 : null,
          currency: session.currency,
          stripe_session_id: session.id,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) {
        console.error("Erro ao inserir payment_history:", error);
      } else {
        console.log("Pagamento salvo com sucesso!");
      }
    } else {
      console.error("Dados insuficientes para salvar pagamento:", { userId, plan, customerId });
    }
  }

  // NOVA LÓGICA: Inativar usuário em caso de falha/cancelamento
  if (
    event.type === "invoice.payment_failed" ||
    (event.type === "customer.subscription.updated" && event.data.object.status === "unpaid") ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object;
    const customerId = subscription.customer;
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    // Buscar o user_id pelo customerId na tabela profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();

    if (profile) {
      await supabase
        .from("profiles")
        .update({ status: "inactive", plan: null })
        .eq("id", profile.id);
      console.log(`Usuário ${profile.id} marcado como inactive e sem plano devido a evento Stripe: ${event.type}`);
    } else {
      console.error("Não foi possível encontrar o perfil para customerId:", customerId);
    }
  }

  return new Response("ok", { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
});
