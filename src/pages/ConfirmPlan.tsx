
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const ConfirmPlan = () => {
  console.log("SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL); // <-- Adicionado para debug
  usePageTitle("Confirm Subscription | Skilabot");
  const [plan, setPlan] = useState<"basic" | "Intermediate" | null>(null);
  const { user, session, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    const planValue = profile?.plan;
    if (
      user &&
      profile &&
      (planValue === "basic" || planValue === "Basic" || planValue === "Intermediate" || planValue === "Intermediario")
    ) {
      navigate("/dashboard", { replace: true });
      return;
    }
    const pending = localStorage.getItem("pendingPlan");
    if (pending === "basic" || pending === "Intermediate") setPlan(pending);
    // Se não há plano pendente, apenas mantenha o usuário na página para escolher um plano
  }, [user, profile, loading, navigate]);

  useEffect(() => {
    if (!user && !loading) navigate("/auth?redirect=/confirm-plan");
  }, [user, loading, navigate]);

  const planDetails = {
    basic: {
      name: "Basic",
      price: "$149/month",
      benefits: [
        "1 WhatsApp channel",
        "1 customizable AI Agent",
        "Monitor conversations via Chatwoot",
        "Cancel anytime"
      ]
    },
    Intermediate: {
      name: "Intermediate",
      price: "$249/month",
      benefits: [
        "2 WhatsApp/Instagram channels",
        "2 customizable AI Agents",
        "Monitor conversations via Chatwoot",
        "Cancel anytime"
      ]
    }
  };

  const [selectedPlan, setSelectedPlan] = useState<"basic" | "Intermediate">(plan || "basic");

  const handleConfirm = async () => {
    if (!selectedPlan || !session) return;
    setLoadingBtn(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-stripe-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ plan: selectedPlan }),
      });
      if (!res.ok) throw new Error("Error creating payment session");
      const { url } = await res.json();
      window.location.href = url;
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleBack = () => {
    // Permite ao usuário trocar de plano
    setPlan(null);
    setSelectedPlan("basic");
    localStorage.removeItem("pendingPlan");
  };

  if (!selectedPlan) return null;
  const planInfo = planDetails[selectedPlan];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-2">Confirm your subscription</h2>
        <p className="mb-4 text-gray-600">You're about to subscribe to:</p>
        <div className="mb-6 p-4 rounded-lg bg-gray-50 border">
          <div className="text-lg font-semibold">{planInfo.name}</div>
          <div className="text-2xl font-bold text-green-600">{planInfo.price}</div>
          <ul className="text-left mt-2 text-sm text-gray-700 list-disc list-inside">
            {planInfo.benefits.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 text-center">Choose your plan:</label>
          <select
            id="plan-select"
            className="w-full border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={selectedPlan}
            onChange={e => setSelectedPlan(e.target.value as "basic" | "Intermediate")}
          >
            <option value="basic">Basic - $149/month</option>
            <option value="Intermediate">Intermediate - $249/month</option>
          </select>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <Button onClick={handleConfirm} disabled={loadingBtn} className="w-full text-lg">
          {loadingBtn ? "Redirecting..." : "Go to secure payment"}
        </Button>
        <button onClick={handleBack} className="mt-4 text-sm text-gray-500 hover:underline">Change plan</button>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Lock className="w-4 h-4" /> Secure payment powered by Stripe
        </div>
      </div>
    </div>
  );
};

export default ConfirmPlan;
