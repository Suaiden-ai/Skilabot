import React from 'react';
import SystemSettings from '../components/dashboard/admin/SystemSettings';
import { useAuth } from '../contexts/AuthContext';
import { usePageTitle } from "@/hooks/usePageTitle";

export default function AdminSettings() {
  usePageTitle("Admin Settings | Skilabot");
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) return <div className="p-8">Acesso restrito.</div>;
  return <SystemSettings />;
} 