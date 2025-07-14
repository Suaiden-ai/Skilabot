import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye, Edit, Ban, Save, X, Key as KeyIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const statusColors = {
  active: "bg-green-100 text-green-800",
  suspended: "bg-red-100 text-red-800",
};

const planColors = {
  Basic: "bg-blue-100 text-blue-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
};

const planOptions = ["Basic", "Intermediate"];
const statusOptions = ["active", "suspended"];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [detailsUser, setDetailsUser] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsAgents, setDetailsAgents] = useState({ total: 0, active: 0 });
  const [detailsChatwoot, setDetailsChatwoot] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [detailsTab, setDetailsTab] = useState("details");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, email, status, plan, created_at, last_active_at")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setUsers(data.map(u => ({
        ...u,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || u.email || "U")}&background=random`,
        status: ["Intermediario", "Intermediário"].includes(u.status) ? "Intermediate" : (u.status || "active"),
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

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({ ...user });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const { id, avatar, ...fields } = editForm;
    if (fields.created_at === "-" || !fields.created_at) delete fields.created_at;
    if (fields.last_active_at === "-" || !fields.last_active_at) delete fields.last_active_at;
    if (fields.plan === "Intermediate") fields.plan = "Intermediario";
    const { error } = await supabase.from("profiles").update(fields).eq("id", id);
    setSaving(false);
    if (!error) {
      setEditingUser(null);
      fetchUsers();
    } else {
      alert("Error updating user: " + error.message);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const handleViewDetails = async (user) => {
    setDetailsUser(user);
    setDetailsLoading(true);
    setDetailsAgents({ total: 0, active: 0 });
    setDetailsChatwoot(null);
    setDetailsOpen(true);
    setDetailsTab("details");
    // Buscar quantidade de agents
    const { count: totalAgents } = await supabase.from("ai_configurations").select("id", { count: "exact", head: true }).eq("user_id", user.id);
    const { count: activeAgents } = await supabase.from("ai_configurations").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "active");
    setDetailsAgents({ total: totalAgents || 0, active: activeAgents || 0 });
    // Buscar conta chatwoot
    const { data: chatwoot } = await supabase.from("chatwoot_accounts").select("*").eq("user_id", user.id).maybeSingle();
    setDetailsChatwoot(chatwoot);
    // Buscar logs de atividade
    setActivityLoading(true);
    const { data: logs, error: logsError } = await supabase
      .from("user_activity_logs")
      .select("id, activity_type, description, metadata, ip_address, user_agent, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);
    setActivityLogs(logs || []);
    setActivityLoading(false);
    setDetailsLoading(false);
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === "active" ? "suspended" : "active";
    const { error } = await supabase
      .from("profiles")
      .update({ status: newStatus })
      .eq("id", user.id);
    if (error) {
      alert("Error updating status: " + error.message);
    } else {
      fetchUsers();
    }
  };

  // Filtros e paginação
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? u.status === statusFilter : true;
    const matchesPlan = planFilter ? u.plan === planFilter : true;
    const matchesDate = dateFilter ? u.created_at === dateFilter : true;
    return matchesSearch && matchesStatus && matchesPlan && matchesDate;
  });
  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
      {/* Modal de detalhes do usuário */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogTitle>User Details</DialogTitle>
          <div className="flex gap-2 mb-4">
            <button
              className={`px-3 py-1 rounded ${detailsTab === "details" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setDetailsTab("details")}
            >
              Details
            </button>
            <button
              className={`px-3 py-1 rounded ${detailsTab === "activity" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setDetailsTab("activity")}
            >
              Activity
            </button>
          </div>
          {detailsLoading ? (
            <div className="py-8 text-center">Loading...</div>
          ) : detailsUser && (
            detailsTab === "details" ? (
              <div className="space-y-4">
                <div><b>Name:</b> {detailsUser.name}</div>
                <div><b>Email:</b> {detailsUser.email}</div>
                <div><b>Agents:</b> {detailsAgents.total} (Active: {detailsAgents.active})</div>
                <div>
                  <b>Chatwoot Account:</b>
                  {detailsChatwoot ? (
                    <div className="text-xs mt-1">
                      <div><b>ID:</b> {detailsChatwoot.id_chatwoot || '-'} </div>
                      <div><b>User ID:</b> {detailsChatwoot.user_id_chatwoot || '-'} </div>
                      <div><b>Email:</b> {detailsChatwoot.email || '-'} </div>
                    </div>
                  ) : (
                    <span>Not found</span>
                  )}
                </div>
              </div>
            ) : (
              <div>
                {activityLoading ? (
                  <div>Loading activity...</div>
                ) : activityLogs.length === 0 ? (
                  <div>No activity found.</div>
                ) : (
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr>
                        <th className="p-1 text-left">Date</th>
                        <th className="p-1 text-left">Type</th>
                        <th className="p-1 text-left">Description</th>
                        <th className="p-1 text-left">IP</th>
                        <th className="p-1 text-left">User Agent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLogs.map(log => (
                        <tr key={log.id}>
                          <td className="p-1">{new Date(log.created_at).toLocaleString()}</td>
                          <td className="p-1">{log.activity_type}</td>
                          <td className="p-1">{log.description}</td>
                          <td className="p-1">{log.ip_address || "-"}</td>
                          <td className="p-1">{log.user_agent ? log.user_agent.slice(0, 30) + "..." : "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      {fetchError && (
        <div className="mb-4 text-red-600 font-semibold">Error fetching users: {fetchError}</div>
      )}
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border rounded px-2 py-1 text-sm"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          className="border rounded px-2 py-1 text-sm"
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
        >
          <option value="">Status</option>
          {statusOptions.map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={planFilter}
          onChange={e => { setPlanFilter(e.target.value); setPage(1); }}
        >
          <option value="">Plan</option>
          {planOptions.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <input
          type="date"
          className="border rounded px-2 py-1 text-sm"
          value={dateFilter}
          onChange={e => { setDateFilter(e.target.value); setPage(1); }}
          title="Filter by sign up date"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Plan</th>
              <th className="p-2 text-left">Sign Up Date</th>
              <th className="p-2 text-left">Last Access</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-2 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border"
                  />
                  {editingUser === user.id ? (
                    <input
                      className="ml-2 border rounded px-2 py-1 text-sm"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                    />
                  ) : (
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  )}
                </td>
                <td className="p-2">
                  {editingUser === user.id ? (
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[user.status] || "bg-gray-100 text-gray-800"}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  )}
                </td>
                <td className="p-2">
                  {editingUser === user.id ? (
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      name="plan"
                      value={editForm.plan}
                      onChange={handleEditChange}
                    >
                      {planOptions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${planColors[user.plan] || "bg-gray-100 text-gray-800"}`}>
                      {user.plan}
                    </span>
                  )}
                </td>
                <td className="p-2">
                  {editingUser === user.id ? (
                    <input
                      className="border rounded px-2 py-1 text-sm"
                      name="created_at"
                      value={editForm.created_at}
                      onChange={handleEditChange}
                      type="date"
                    />
                  ) : (
                    user.created_at
                  )}
                </td>
                <td className="p-2">
                  {editingUser === user.id ? (
                    <input
                      className="border rounded px-2 py-1 text-sm"
                      name="last_active_at"
                      value={editForm.last_active_at}
                      onChange={handleEditChange}
                      type="date"
                    />
                  ) : (
                    user.last_active_at
                  )}
                </td>
                <td className="p-2 flex gap-2">
                  {editingUser === user.id ? (
                    <>
                      <button
                        className="p-1 bg-green-500 hover:bg-green-600 text-white rounded"
                        onClick={handleSave}
                        disabled={saving}
                        title="Save"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
                        onClick={handleCancel}
                        title="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button title="View details" className="p-1 hover:bg-gray-100 rounded" onClick={() => handleViewDetails(user)}>
                        <Eye className="h-4 w-4 text-blue-500" />
                      </button>
                      <button title="Edit" className="p-1 hover:bg-gray-100 rounded" onClick={() => handleEdit(user)}>
                        <Edit className="h-4 w-4 text-green-500" />
                      </button>
                      <button
                        title={user.status === "active" ? "Deactivate" : "Activate"}
                        className={`p-1 rounded ${user.status === "active" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}
                        onClick={() => handleToggleStatus(user)}
                      >
                        {user.status === "active" ? <Ban className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginação */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 