import React from 'react';
import SystemSettings from '../components/dashboard/admin/SystemSettings';
import { useAuth } from '../contexts/AuthContext';

export default function AdminSettings() {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) return <div className="p-8">Acesso restrito.</div>;
  return <SystemSettings />;
} 