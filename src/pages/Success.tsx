
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpa o plano pendente do localStorage após sucesso
    localStorage.removeItem("pendingPlan");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Pagamento Realizado com Sucesso!
        </h1>
        <p className="text-gray-600 mb-6">
          Sua assinatura foi ativada. Agora você pode acessar todos os recursos do seu plano.
        </p>
        <Button 
          onClick={() => navigate("/dashboard")} 
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Ir para o Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Success;
