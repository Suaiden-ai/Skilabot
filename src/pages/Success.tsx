
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Success = () => {
  const navigate = useNavigate();
  const { user, loadProfile } = useAuth();

  useEffect(() => {
    // Limpa o plano pendente do localStorage após sucesso
    localStorage.removeItem("pendingPlan");
  }, []);

  useEffect(() => {
    // Se o usuário está logado, força recarregar o profile do banco
    if (user && loadProfile) {
      loadProfile(user.id);
    }
  }, [user, loadProfile]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your subscription has been activated. You can now access all features of your plan.
        </p>
        <Button 
          onClick={() => navigate("/dashboard")} 
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Success;
