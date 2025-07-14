
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ConfirmPlan = () => {
  const [plan, setPlan] = useState<"basic" | "medium" | null>(null);
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
      (planValue === "basic" || planValue === "Basic" || planValue === "medium" || planValue === "Intermediario")
    ) {
      navigate("/dashboard", { replace: true });
      return;
    }
    const pending = localStorage.getItem("pendingPlan");
    if (pending === "basic" || pending === "medium") setPlan(pending);
    else navigate("/dealerships-resellers");
  }, [user, profile, loading, navigate]);

  useEffect(() => {
    if (!user && !loading) navigate("/auth?redirect=/confirm-plan");
  }, [user, loading, navigate]);

  const handleConfirm = async () => {
    if (!plan || !session) return;
    setLoadingBtn(true);
    setError(null);
    try {
      const res = await fetch("https://dawqhytdogagnwwhndjt.functions.supabase.co/create-stripe-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) throw new Error("Erro ao criar sessão de pagamento");
      const { url } = await res.json();
      window.location.href = url;
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoadingBtn(false);
    }
  };

  if (!plan) return null;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Confirme seu plano</h2>
        <p className="mb-6">Você está contratando o plano <b>{plan}</b>.</p>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <Button onClick={handleConfirm} disabled={loadingBtn} className="w-full">
          {loadingBtn ? "Redirecionando..." : "Ir para pagamento"}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmPlan;
