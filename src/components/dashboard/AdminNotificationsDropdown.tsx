
import { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminNotificationsDropdown() {
  const { profile } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profile) return;
    fetchNotifications();
    // Fechar dropdown ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    // Realtime subscription
    const channel = supabase.channel('realtime:admin_notifications')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_notifications' }, () => {
        fetchNotifications();
      })
      .subscribe();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      supabase.removeChannel(channel);
    };
  }, [profile]);

  const fetchNotifications = async () => {
    let query = supabase
      .from("admin_notifications")
      .select("id, title, body, created_at, read_by, type, target")
      .order("created_at", { ascending: false })
      .limit(20);
    if (profile?.role !== "admin") {
      // Para usuários comuns, mostrar apenas notificações para todos ou para user
      query = query.in("target", ["all", "user"]);
    }
    const { data, error } = await query;
    if (!error && data) setNotifications(data);
  };

  const handleMarkAsRead = async (id: string) => {
    if (!profile) return;
    const notif = notifications.find((n: any) => n.id === id);
    if (!notif) return;
    if (notif.read_by && notif.read_by.includes(profile?.id)) return;
    // Atualiza read_by no Supabase
    const { error } = await supabase
      .from("admin_notifications")
      .update({ read_by: [...(notif.read_by || []), profile?.id] })
      .eq("id", id);
    if (!error) fetchNotifications();
  };

  const unreadCount = notifications.filter((n: any) => !(n.read_by || []).includes(profile?.id)).length;

  if (!profile) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        title="Notifications"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-3 border-b font-semibold">Notifications</div>
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm">No notifications.</div>
          ) : (
            <ul>
              {notifications.map((n: any) => (
                <li
                  key={n.id}
                  className={`px-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 ${!(n.read_by || []).includes(profile?.id) ? "bg-blue-50" : ""}`}
                  onClick={() => handleMarkAsRead(n.id)}
                  title={n.body || n.title}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase ${n.type === "error" ? "text-red-500" : n.type === "warning" ? "text-yellow-600" : "text-blue-600"}`}>{n.type || "info"}</span>
                    <span className="text-xs text-gray-400 ml-auto">{new Date(n.created_at).toLocaleString()}</span>
                  </div>
                  <div className="font-medium truncate">{n.title}</div>
                  {n.body && <div className="text-xs text-gray-600 truncate">{n.body}</div>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
