
import { Outlet, useNavigate } from "react-router-dom";
import SidebarMenu from "../SidebarMenu";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { LogOut, User, Shield, Bell, Search, Download, Send } from "lucide-react";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import React from "react";
import AdminNotificationsDropdown from "../dashboard/AdminNotificationsDropdown";

export default function DashboardLayout() {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  // Proteção de rota: redireciona para /auth se não estiver autenticado
  React.useEffect(() => {
    console.log('DashboardLayout:', { loading, user, profile });
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
    // Removido o else if que redirecionava admin para /admin-dashboard
  }, [user, profile, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 min-h-screen w-full flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SidebarMenu />
      </motion.div>
      {/* Main Content */}
      <motion.main 
        className="flex-1 min-h-screen ml-64 overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Topbar com notificações e logout */}
        <div className="flex items-center justify-end gap-4 px-8 py-4 border-b bg-white/80 sticky top-0 z-30">
          <AdminNotificationsDropdown />
        </div>
        <div className="h-full overflow-y-auto">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}
