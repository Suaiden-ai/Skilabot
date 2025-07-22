
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";

export default function Dashboard() {
  usePageTitle("Dashboard | Skilabot");
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8 mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
      {/* Conteúdo da página original aqui */}
      <div className="my-8">
        <Link to="/dashboard/settings" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors duration-200">
          Settings
        </Link>
      </div>
    </div>
  );
}
