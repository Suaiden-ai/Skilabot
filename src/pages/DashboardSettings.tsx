import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import { usePlanLimits, useCurrentUsage } from "@/hooks/usePlanLimits";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

function addOneMonth(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString();
}

export default function DashboardSettings() {
  const { profile, loadProfile } = useAuth();
  const navigate = useNavigate();
  const { planLimits } = usePlanLimits();
  const { getCurrentUsage } = useCurrentUsage();

  const [planInfo, setPlanInfo] = useState({
    plan: profile?.plan || "-",
    hiredAt: "",
    expiresAt: ""
  });
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [agents, setAgents] = useState(0);
  const [loadingAgents, setLoadingAgents] = useState(true);

  useEffect(() => {
    if (!profile) {
      navigate("/auth", { replace: true });
    }
  }, [profile, navigate]);

  useEffect(() => {
    async function fetchPlanInfo() {
      setLoadingPlan(true);
      if (!profile?.id) return;
      const { data } = await supabase
        .from("payment_history")
        .select("created_at")
        .eq("user_id", profile.id)
        .eq("status", "paid")
        .order("created_at", { ascending: false })
        .limit(1);
      let hiredAt = data && data.length > 0 ? data[0].created_at : null;
      setPlanInfo({
        plan: profile.plan || "-",
        hiredAt: hiredAt,
        expiresAt: hiredAt ? addOneMonth(hiredAt) : "-"
      });
      setLoadingPlan(false);
    }
    fetchPlanInfo();
  }, [profile?.id, profile?.plan]);

  useEffect(() => {
    async function fetchAgents() {
      if (!profile?.id || !planLimits) {
        setAgents(0);
        setLoadingAgents(false);
        return;
      }
      setLoadingAgents(true);
      try {
        const usage = await getCurrentUsage();
        setAgents(usage.agents || 0);
      } catch (err) {
        console.error('Erro ao buscar agents:', err);
        setAgents(0);
      } finally {
        setLoadingAgents(false);
      }
    }
    if (profile && planLimits) {
      fetchAgents();
    }
  }, [planLimits, profile]);

  const [username, setUsername] = useState(profile?.name || "");
  const [newUsername, setNewUsername] = useState(profile?.name || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    if (newUsername.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      setLoading(false);
      return;
    }
    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ name: newUsername })
        .eq("id", profile.id);
      if (updateError) {
        setError("Failed to update username. Please try again.");
      } else {
        setUsername(newUsername);
        setSuccess("Username updated successfully!");
        await loadProfile(profile.id);
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Cores do plano
  const planColors = {
    Basic: "bg-gray-200 text-gray-800",
    Intermediate: "bg-pink-100 text-pink-800",
    Premium: "bg-orange-100 text-orange-900",
    default: "bg-gray-100 text-gray-700"
  };
  const planColor = planColors[planInfo.plan] || planColors.default;

  const maxAgents = planLimits?.max_agents || 1;
  const agentsPercent = Math.min(100, Math.round((agents / maxAgents) * 100));

  return (
    <main className="flex-1 max-w-4xl mx-auto py-16 px-4 md:px-8 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] min-h-[90vh]">
      <h1 className="text-3xl font-bold mb-2 text-black">Account Settings</h1>
      <p className="text-gray-500 mb-8">Manage your personal information and subscription plan.</p>
      <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
        {/* Card do perfil */}
        <div className="bg-white rounded-2xl shadow-xl border p-8 flex flex-col items-center gap-4 min-w-[280px] w-full md:w-1/2 animate-fade-in">
          <Avatar className="h-20 w-20 mb-2 shadow-md">
            <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-pink-400 to-orange-300 text-white">
              {profile?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-1 w-full">
            <span className="text-lg font-semibold text-gray-900">{username}</span>
            <span className="flex items-center gap-1 text-gray-500 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              {profile?.email || "-"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 w-full mt-2">
            <span className="text-xs text-gray-400">Current Plan</span>
            <Badge className={`text-base px-4 py-1 rounded-full font-bold ${planColor}`}>{planInfo.plan}</Badge>
          </div>
          <div className="flex flex-col items-center gap-1 w-full mt-2">
            <span className="text-xs text-gray-400">Hired at</span>
            <span className="text-sm text-gray-700 font-medium">{formatDate(planInfo.hiredAt)}</span>
            <span className="text-xs text-gray-400 mt-1">Expires at</span>
            <span className="text-sm text-gray-700 font-medium">{formatDate(planInfo.expiresAt)}</span>
          </div>
          {/* AGENTS info */}
          <div className="flex flex-col items-center gap-1 w-full mt-4">
            <span className="text-xs text-gray-400">Agents</span>
            {loadingAgents || !planLimits ? (
              <span className="text-gray-400 text-sm">Loading...</span>
            ) : (
              <>
                <span className="text-base font-semibold text-gray-800">{agents} / {maxAgents} agents</span>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                  <div className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-500" style={{ width: `${agentsPercent}%` }} />
                </div>
              </>
            )}
          </div>
          {loadingPlan && <div className="text-xs text-gray-400 mt-2">Loading plan info...</div>}
        </div>
        {/* Formulário de alteração de nome */}
        <form className="space-y-6 max-w-md w-full md:w-1/2 bg-white rounded-2xl shadow-xl border p-8 animate-fade-in" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-2 text-gray-800">Username</label>
            <Input
              name="username"
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              required
              minLength={3}
              className="max-w-md"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-800">Email</label>
            <Input
              name="email"
              value={profile?.email || "-"}
              readOnly
              className="max-w-md bg-gray-100 cursor-not-allowed text-gray-500"
            />
          </div>
          {success && (
            <Alert className="mb-2 animate-fade-in">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive" className="mb-2 animate-fade-in">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full max-w-md" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2 justify-center"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>Saving...</span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
} 