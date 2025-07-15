
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, MessageSquare, Smartphone, MessageCircle, BarChart3, Settings, HelpCircle, Plus, LogOut, User, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const isAdmin = profile?.role === 'admin';

  let menuItems = [];
  if (isAdmin) {
    menuItems = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: BarChart3,
        path: "/admin-dashboard",
        category: "main"
      },
      {
        id: "admin-users",
        label: "Users",
        icon: User,
        path: "/admin-users",
        category: "main"
      },
      {
        id: "admin-settings",
        label: "Settings",
        icon: Settings,
        path: "/admin-settings",
        category: "main"
      },
      {
        id: "admin-payments",
        label: "Payments",
        icon: CreditCard,
        path: "/admin-payments",
        category: "main"
      }
    ];
  } else {
    menuItems = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: BarChart3,
        path: "/dashboard",
        category: "main"
      },
      {
        id: "kanban",
        label: "Kanban",
        icon: Zap,
        path: "/dashboard-kanban",
        category: "main"
      },
      {
        id: "agents",
        label: "My Agents",
        icon: MessageSquare,
        path: "/agents",
        category: "main"
      },
      {
        id: "whatsapp-connections",
        label: "Connections",
        icon: Smartphone,
        path: "/whatsapp-connections",
        category: "main"
      },
      {
        id: "chatwoot-panel",
        label: "Conversations",
        icon: MessageCircle,
        path: "/chatwoot-panel",
        category: "main"
      }
    ];
  }

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="flex flex-col h-full w-64 fixed top-0 left-0 bg-white text-gray-800 shadow-lg border-r border-gray-200 z-30" style={{ minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="mt-8 mb-6 px-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-orange-300 rounded-full flex items-center justify-center shadow-md mb-2 border-4 border-white">
            <span className="font-bold text-white text-2xl">{profile?.name ? profile.name[0] : '?'}</span>
          </div>
          <div className="text-xs text-gray-400">Welcome,</div>
          <div className="font-semibold text-gray-800 text-base">{profile?.name || 'User'}</div>
        </div>
        <div className="mb-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-none w-full flex justify-center py-1.5 text-xs font-medium shadow-none">
            {isAdmin ? (
              'Administrator'
            ) : (
              (() => {
                const plan = (profile?.plan || '').toLowerCase();
                if (plan === 'intermediate') return 'Plan Intermediate';
                if (plan === 'premium') return 'Plan Premium';
                if (plan === 'basic') return 'Plan Basic';
                return 'No plan';
              })()
            )}
          </Badge>
        </div>
      </div>
      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium gap-3
                  ${isActive ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700 shadow' : 'hover:bg-gray-100 text-gray-700'}`}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 pb-6 px-6 mt-2">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 px-4 py-2 rounded-lg font-medium text-sm"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </nav>
  );
}
