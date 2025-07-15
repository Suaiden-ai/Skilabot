import PlansSection from "@/components/sections/dealerships/PlansSection";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Plans() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  // Função para interceptar a escolha do plano e redirecionar
  const handleChoosePlan = (plan: "basic" | "Intermediate" | "custom") => {
    if (plan === "custom") {
      navigate("/contact-sales");
      return;
    }
    localStorage.setItem("pendingPlan", plan);
    navigate("/confirm-plan");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full flex justify-end max-w-7xl mb-4">
        <Button
          variant="outline"
          onClick={async () => {
            await signOut();
            navigate("/auth");
          }}
          className="border-red-500 text-red-500 hover:bg-red-50"
        >
          Logout
        </Button>
      </div>
      <PlansSection onChoosePlan={handleChoosePlan} />
    </div>
  );
} 