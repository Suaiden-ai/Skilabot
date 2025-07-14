import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Edit, Ban, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  suspended: "bg-red-100 text-red-800",
};

const planColors = {
  Free: "bg-gray-100 text-gray-800",
  Basic: "bg-blue-100 text-blue-800",
  Intermediario: "bg-yellow-100 text-yellow-800",
  "Intermediário": "bg-yellow-100 text-yellow-800",
  Pro: "bg-blue-100 text-blue-800",
  Enterprise: "bg-purple-100 text-purple-800",
};

const statusOptions = ["active", "inactive", "suspended"];
const planOptions = ["Basic", "Intermediate"];

function exportToCSV(users) {
  const header = ["Name", "Email", "Status", "Plan", "Sign Up Date", "Last Access"];
  const rows = users.map(u => [
    u.name, u.email, u.status, u.plan, u.created_at, u.last_active_at
  ]);
  const csvContent =
    "data:text/csv;charset=utf-8," +
    [header, ...rows].map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "users.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function UserTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState("");
  // Remover pageSize, paginação e filtros

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, email, status, plan, created_at, last_active_at")
      .order("created_at", { ascending: false })
      .limit(4);
    console.log("Supabase users fetch:", { data, error });
    if (!error && data) {
      setUsers(data.map(u => ({
        ...u,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || u.email || "U")}&background=random`,
        status: (u.status || "active").toLowerCase(),
        plan: ["Intermediario", "Intermediário"].includes(u.plan) ? "Intermediate" : (u.plan || "Basic"),
        name: u.name || u.email || "-",
        email: u.email || "-",
        created_at: u.created_at ? u.created_at.slice(0, 10) : "-",
        last_active_at: u.last_active_at ? u.last_active_at.slice(0, 10) : "-",
      })));
      setFetchError("");
    } else {
      setUsers([]);
      setFetchError(error?.message || "Unknown error fetching users");
    }
  };

  // Não há mais uso de pageSize, nem de variáveis relacionadas à paginação ou filtros

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
      {fetchError && (
        <div className="mb-4 text-red-600 font-semibold">Error fetching users: {fetchError}</div>
      )}
      <h2 className="text-xl font-bold mb-4">Latest Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Plan</th>
              <th className="p-2 text-left">Sign Up Date</th>
              <th className="p-2 text-left">Last Access</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-2 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border"
                  />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[user.status] || "bg-gray-100 text-gray-800"}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${planColors[user.plan] || "bg-gray-100 text-gray-800"}`}>
                    {user.plan}
                  </span>
                </td>
                <td className="p-2">{user.created_at}</td>
                <td className="p-2">{user.last_active_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}