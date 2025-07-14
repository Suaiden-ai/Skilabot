import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Activity, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
// Remover importação do recharts
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend
// } from "recharts";
import UserTable from "./UserTable";
import SidebarMenu from "../../SidebarMenu";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TablesInsert } from "@/integrations/supabase/types";

// Colors for charts
const COLORS = ["#6366f1", "#f472b6", "#fb923c", "#60a5fa", "#34d399", "#a78bfa"];

const mockUsers = [
  // Add mock data as needed
];

const AdminDashboard = () => {
  // Métricas reais
  const [totalUsers, setTotalUsers] = useState(0);
  const [basicUsers, setBasicUsers] = useState(0);
  const [interUsers, setInterUsers] = useState(0);

  const { profile } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifBody, setNotifBody] = useState("");
  const [notifType, setNotifType] = useState("info");
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifTarget, setNotifTarget] = useState("all");

  useEffect(() => {
    fetchUserReports();
  }, []);

  const fetchUserReports = async () => {
    try {
      // Total de usuários
      const { count: total } = await supabase.from("profiles").select("*", { count: "exact", head: true });
      setTotalUsers(total || 0);
      // Usuários plano Basic
      const { count: basic } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("plan", "Basic");
      setBasicUsers(basic || 0);
      // Usuários plano Intermediário
      const { count: inter } = await supabase.from("profiles").select("*", { count: "exact", head: true }).in("plan", ["Intermediario", "Intermediário"]);
      setInterUsers(inter || 0);
    } catch (error) {
      setTotalUsers(0);
      setBasicUsers(0);
      setInterUsers(0);
    }
  };

  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim()) {
      toast.error("Title is required");
      return;
    }
    setNotifLoading(true);
    const { error } = await (supabase as any)
      .from("admin_notifications")
      .insert([
        {
          title: notifTitle,
          body: notifBody,
          type: notifType,
          created_by: profile?.id,
          target: notifTarget
        }
      ]);
    setNotifLoading(false);
    if (!error) {
      toast.success("Notification created!");
      setNotifOpen(false);
      setNotifTitle("");
      setNotifBody("");
      setNotifType("info");
      setNotifTarget("all");
    } else {
      toast.error("Error creating notification: " + error.message);
    }
  };

  // --- Charts ---
  const fetchTimeline = async () => {
    // Implement real query as per previous example
    setTimelineData([
      { name: "Jan", value: 10 },
      { name: "Feb", value: 20 },
      { name: "Mar", value: 30 },
      { name: "Apr", value: 25 },
      { name: "May", value: 40 },
      { name: "Jun", value: 35 },
    ]);
  };

  const fetchPlanDistribution = async () => {
    setPlanData([
      { name: "Free", value: 60 },
      { name: "Pro", value: 30 },
      { name: "Enterprise", value: 10 },
    ]);
  };

  const fetchActiveByWeek = async () => {
    setActiveByWeek([
      { name: "S1", value: 10 },
      { name: "S2", value: 15 },
      { name: "S3", value: 20 },
      { name: "S4", value: 18 },
      { name: "S5", value: 22 },
      { name: "S6", value: 25 },
    ]);
  };

  // --- Render ---
  return (
    <div className="h-full overflow-y-auto p-8">
      {/* Botão Nova Notificação */}
      {profile?.role === "admin" && (
        <div className="flex justify-end mb-6">
          <Button onClick={() => setNotifOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            New Notification
          </Button>
        </div>
      )}
      {/* Modal de Nova Notificação */}
      <Dialog open={notifOpen} onOpenChange={setNotifOpen}>
        <DialogContent>
          <DialogTitle>New Notification</DialogTitle>
          <form onSubmit={handleCreateNotification} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                className="w-full border rounded px-2 py-1"
                value={notifTitle}
                onChange={e => setNotifTitle(e.target.value)}
                required
                maxLength={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Body</label>
              <textarea
                className="w-full border rounded px-2 py-1"
                value={notifBody}
                onChange={e => setNotifBody(e.target.value)}
                rows={3}
                maxLength={500}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                className="w-full border rounded px-2 py-1"
                value={notifType}
                onChange={e => setNotifType(e.target.value)}
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Target Audience</label>
              <select
                className="w-full border rounded px-2 py-1"
                value={notifTarget}
                onChange={e => setNotifTarget(e.target.value)}
              >
                <option value="all">All</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button type="button" variant="ghost" onClick={() => setNotifOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" disabled={notifLoading}>
                Send
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* User reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">{totalUsers}</span>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-100 to-green-50 shadow-lg">
          <CardHeader>
            <CardTitle>Users on Basic Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">{basicUsers}</span>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-100 to-yellow-50 shadow-lg">
          <CardHeader>
            <CardTitle>Users on Intermediate Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">{interUsers}</span>
          </CardContent>
        </Card>
      </div>
      {/* Charts placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>New registrations timeline (6 months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-500 text-center py-12">[Gráfico desativado temporariamente]</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribution by Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-500 text-center py-12">[Gráfico desativado temporariamente]</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users per Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-500 text-center py-12">[Gráfico desativado temporariamente]</div>
          </CardContent>
        </Card>
      </div>
      {/* 2. User List with Advanced Filters */}
      <UserTable />
      {/* 3. User Details Modal/Page */}
      {/* Implement a UserDetails component to display and edit user details */}
      {/* 4. Permissions and Roles Management */}
      {/* Implement a RolesManager component to manage roles and permissions */}
      {/* 5. Activity Logs */}
      {/* Implement an ActivityLogs component to display and filter logs */}
    </div>
  );
};

export default AdminDashboard;