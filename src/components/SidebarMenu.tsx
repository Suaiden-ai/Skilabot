
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, MessageSquare, Smartphone, MessageCircle, BarChart3, Settings, HelpCircle, Plus, LogOut, User, CreditCard, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Debug logs
  useEffect(() => {
    console.log('SidebarMenu - Profile:', profile);
    console.log('SidebarMenu - Profile name:', profile?.name);
    console.log('SidebarMenu - Profile plan:', profile?.plan);
  }, [profile]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

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
      },

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
        id: "create-agent",
        label: "Create Agent",
        icon: Plus,
        path: "/create-agent",
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
        id: "connections",
        label: "Connections",
        icon: Smartphone,
        path: "/connections",
        category: "main"
      },
      {
        id: "conversations",
        label: "Conversations",
        icon: MessageCircle,
        path: "/conversations",
        category: "main"
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        path: "/dashboard/settings",
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

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Função para obter o nome de exibição do usuário
  const getUserDisplayName = () => {
    if (profile?.name) {
      return profile.name;
    }
    if (profile?.email) {
      return profile.email.split('@')[0]; // Usar parte do email se não há nome
    }
    return 'User';
  };

  // Função para obter a inicial do nome
  const getUserInitial = () => {
    const displayName = getUserDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={handleMobileMenuToggle}
          variant="outline"
          size="sm"
          className="bg-white shadow-lg border-gray-200 hover:bg-gray-50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Page Title */}
      <div className="lg:hidden fixed top-4 left-16 right-4 z-40">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-gray-200">
          <h1 className="text-sm font-medium text-gray-700 truncate">
            {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h1>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="font-bold text-white text-lg">{getUserInitial()}</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Welcome,</div>
                    <div className="font-semibold text-gray-800">{getUserDisplayName()}</div>
                  </div>
                </div>
                <Button
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Menu Plan Badge */}
              <div className="px-6 py-4 border-b border-gray-200">
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-none w-full flex justify-center py-2 text-sm font-medium">
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

              {/* Mobile Menu Items */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-2 px-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMobileNavigation(item.path)}
                        className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium gap-3
                          ${isActive ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg' : 'hover:bg-pink-50 text-gray-700'}`}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Menu Footer */}
              <div className="border-t border-gray-200 p-4">
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 gap-3"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ width: 72 }}
        animate={{ 
          width: isHovered ? 256 : 72,
          transition: {
            type: "tween",
            duration: 0.3,
            ease: "easeInOut"
          }
        }}
        className="hidden lg:flex flex-col h-screen fixed top-0 left-0 bg-white text-gray-800 shadow-lg border-r border-gray-200 z-30"
      >
             {/* Header Section */}
       <motion.div 
         className="mt-4 mb-8 px-2 flex flex-col items-center"
         animate={{
           paddingLeft: isHovered ? 24 : 8,
           paddingRight: isHovered ? 24 : 8,
         }}
         transition={{
           type: "tween",
           duration: 0.3,
           ease: "easeInOut"
         }}
       >
                 <div className="flex flex-col items-center mb-6">
           <motion.div 
             className="w-14 h-14 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-md mb-3 border-4 border-white"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             transition={{ type: "spring", stiffness: 400, damping: 10 }}
           >
             <span className="font-bold text-white text-2xl">{getUserInitial()}</span>
           </motion.div>
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -5, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -5, height: 0 }}
                transition={{ 
                  duration: 0.25, 
                  ease: "easeInOut"
                }}
                className="text-center overflow-hidden"
              >
                                 <div className="text-sm text-gray-500 mb-1">Welcome,</div>
                 <div className="font-semibold text-gray-800 text-lg">{getUserDisplayName()}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div 
              className="mb-2 w-full overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: "auto" }}
              exit={{ opacity: 0, scale: 0.9, height: 0 }}
              transition={{ 
                duration: 0.25, 
                ease: "easeInOut"
              }}
            >
                             <Badge variant="secondary" className="bg-green-100 text-green-700 border-none w-full flex justify-center py-2 text-sm font-medium shadow-none">
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

             {/* Menu Items */}
       <div className="flex-1 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
         <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                                 className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 text-sm font-medium gap-3
                   ${isActive ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg' : 'hover:bg-pink-50 text-gray-700'}
                   ${!isHovered ? 'justify-center px-0' : ''}`}
                onClick={() => handleNavigation(item.path)}
                title={!isHovered ? item.label : undefined}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <AnimatePresence mode="wait">
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -5, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: "auto" }}
                      exit={{ opacity: 0, x: -5, width: 0 }}
                      transition={{ 
                        duration: 0.25, 
                        ease: "easeInOut"
                      }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

             {/* Footer */}
       <motion.div 
         className="border-t border-gray-200 pt-6 pb-8 mt-4"
        animate={{
          paddingLeft: isHovered ? 24 : 8,
          paddingRight: isHovered ? 24 : 8,
        }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <motion.button
          onClick={handleSignOut}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
                     className={`w-full flex items-center gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 px-3 py-3 rounded-lg font-medium text-sm ${!isHovered ? 'justify-center px-0' : ''}`}
          title={!isHovered ? 'Sign Out' : undefined}
        >
          <LogOut className="h-5 w-5" />
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, x: -5, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -5, width: 0 }}
                transition={{ 
                  duration: 0.25, 
                  ease: "easeInOut"
                }}
                className="overflow-hidden whitespace-nowrap"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
                 </motion.button>
       </motion.div>
     </motion.nav>
    </>
  );
}
