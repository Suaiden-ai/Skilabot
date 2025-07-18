
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Dashboard() {
  usePageTitle("Dashboard | Skilabot");
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8 mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
      {/* Conteúdo da página original aqui */}
    </div>
  );
}
