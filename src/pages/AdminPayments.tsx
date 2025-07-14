import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const statusOptions = ['pending', 'paid', 'failed', 'refunded'];
const planOptions = ['Basic', 'Intermediate', 'Premium'];
const methodOptions = ['pix', 'credit_card', 'boleto'];

export default function AdminPayments() {
  const { user, isAdmin } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line
  }, [statusFilter, planFilter, methodFilter, userFilter, dateStart, dateEnd, page]);

  const fetchPayments = async () => {
    setLoading(true);
    let query = supabase
      .from('payment_history')
      .select('*, profiles:profiles(id, name, email)')
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);
    if (statusFilter) query = query.eq('status', statusFilter);
    if (planFilter) query = query.eq('plan_type', planFilter);
    if (methodFilter) query = query.eq('payment_method', methodFilter);
    if (userFilter) query = query.ilike('profiles.name', `%${userFilter}%`);
    if (dateStart) query = query.gte('created_at', dateStart);
    if (dateEnd) query = query.lte('created_at', dateEnd + 'T23:59:59');
    const { data, error } = await query;
    if (!error && data) {
      setPayments(data);
      setFetchError('');
    } else {
      setPayments([]);
      setFetchError(error?.message || 'Unknown error fetching payments');
    }
    setLoading(false);
  };

  if (!user || !isAdmin) return <div className="p-8">Access denied.</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block text-xs font-medium mb-1">User (name/email)</label>
          <Input value={userFilter} onChange={e => setUserFilter(e.target.value)} placeholder="Search user" className="w-48" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Status</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-32 border rounded">
            <option value="">All</option>
            {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Plan</label>
          <select value={planFilter} onChange={e => setPlanFilter(e.target.value)} className="w-32 border rounded">
            <option value="">All</option>
            {planOptions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Method</label>
          <select value={methodFilter} onChange={e => setMethodFilter(e.target.value)} className="w-32 border rounded">
            <option value="">All</option>
            {methodOptions.map(m => <option key={m} value={m}>{m.replace('_', ' ').toUpperCase()}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Date (from)</label>
          <Input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} className="w-36" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Date (to)</label>
          <Input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className="w-36" />
        </div>
      </div>
      {/* Tabela de pagamentos */}
      {loading ? (
        <div>Loading...</div>
      ) : fetchError ? (
        <div className="text-red-600">{fetchError}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Currency</th>
                <th className="p-2 text-left">Plan</th>
                <th className="p-2 text-left">Method</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Transaction ID</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 text-gray-400">No payments found.</td></tr>
              )}
              {payments.map((p: any) => (
                <tr key={p.id} className="border-b">
                  <td className="p-2">{p.profiles?.name || p.profiles?.email || p.user_id}</td>
                  <td className="p-2">{p.amount}</td>
                  <td className="p-2">{p.currency}</td>
                  <td className="p-2">{p.plan_type}</td>
                  <td className="p-2">{p.payment_method}</td>
                  <td className="p-2">{p.status}</td>
                  <td className="p-2">{p.transaction_id}</td>
                  <td className="p-2">{p.created_at ? p.created_at.slice(0, 10) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Paginação simples */}
      <div className="flex gap-2 mt-4">
        <Button variant="outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
        <span>Page {page}</span>
        <Button variant="outline" onClick={() => setPage(p => p + 1)} disabled={payments.length < pageSize}>Next</Button>
      </div>
    </div>
  );
} 