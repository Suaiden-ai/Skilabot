import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, FileText, DollarSign, Filter } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { usePageTitle } from "@/hooks/usePageTitle";

const statusOptions = ['active', 'inactive', 'pending', 'failed', 'refunded'];
const planOptions = ['Basic', 'Intermediate', 'Premium'];
const methodOptions = ['pix', 'credit_card', 'boleto'];

export default function AdminPayments() {
  usePageTitle("Admin Payments | Skilabot");
  const { user, isAdmin, profile } = useAuth();
  console.log("user", user);
  console.log("profile", profile);
  console.log("isAdmin", isAdmin);
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
  const [totalReceived, setTotalReceived] = useState(0);
  const [monthReceived, setMonthReceived] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line
  }, [statusFilter, planFilter, methodFilter, userFilter, dateStart, dateEnd, page]);

  useEffect(() => {
    // Calcular totais após buscar pagamentos
    let total = 0;
    let month = 0;
    let totalC = 0;
    let monthC = 0;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    payments.forEach((p: any) => {
      const status = (p.status || '').toLowerCase();
      if (status === 'paid' || status === 'active') {
        total += p.amount || 0;
        totalC++;
        const d = new Date(p.created_at);
        if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
          month += p.amount || 0;
          monthC++;
        }
      }
    });
    setTotalReceived(total);
    setMonthReceived(month);
    setTotalCount(totalC);
    setMonthCount(monthC);
  }, [payments]);

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

  const statusColors: Record<string, string> = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-blue-100 text-blue-800',
  };
  const methodIcons: Record<string, JSX.Element> = {
    credit_card: <CreditCard className="inline w-4 h-4 mr-1 text-pink-500" />, 
    boleto: <FileText className="inline w-4 h-4 mr-1 text-orange-500" />, 
    pix: <DollarSign className="inline w-4 h-4 mr-1 text-pink-500" />
  };
  function formatAmount(amount: number, currency: string) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency?.toUpperCase() || 'USD' }).format(amount || 0);
  }
  function formatDate(date: string) {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>
      {/* Totais */}
      <div className="flex flex-wrap gap-6 mb-4">
        <div className="bg-green-50 border border-green-200 rounded-lg px-6 py-3 flex flex-col items-start min-w-[180px]">
          <span className="text-xs text-green-700 font-medium mb-1">Total received</span>
          <span className="text-xl font-bold text-green-900">{formatAmount(totalReceived, 'usd')}</span>
          <span className="text-xs text-green-700 mt-1">{totalCount} payments</span>
        </div>
        <div className="bg-pink-50 border border-pink-200 rounded-lg px-6 py-3 flex flex-col items-start min-w-[180px]">
          <span className="text-xs text-pink-700 font-medium mb-1">Received this month</span>
          <span className="text-xl font-bold text-pink-900">{formatAmount(monthReceived, 'usd')}</span>
          <span className="text-xs text-pink-700 mt-1">{monthCount} payments</span>
        </div>
      </div>
      {/* Filtros melhorados */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border max-w-full">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-pink-500" />
          <span className="font-semibold text-lg">Filter payments</span>
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 items-center">
          <div className="flex flex-col w-48">
            <label className="block text-xs font-medium mb-1">User (name/email)</label>
            <Input value={userFilter} onChange={e => setUserFilter(e.target.value)} placeholder="Search user" className="h-10 text-sm" />
          </div>
          <div className="flex flex-col w-40">
            <label className="block text-xs font-medium mb-1">Status</label>
            <div className="relative">
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full h-10 border rounded pl-8 text-sm">
                <option value="">All</option>
                {statusOptions.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Filter className="w-4 h-4" />
              </span>
            </div>
          </div>
          <div className="flex flex-col w-40">
            <label className="block text-xs font-medium mb-1">Plan</label>
            <select value={planFilter} onChange={e => setPlanFilter(e.target.value)} className="w-full h-10 border rounded text-sm">
              <option value="">All</option>
              {planOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex flex-col w-40">
            <label className="block text-xs font-medium mb-1">Method</label>
            <div className="relative">
              <select value={methodFilter} onChange={e => setMethodFilter(e.target.value)} className="w-full h-10 border rounded pl-8 text-sm">
                <option value="">All</option>
                {methodOptions.map(m => (
                  <option key={m} value={m}>{m.replace('_', ' ').toUpperCase()}</option>
                ))}
              </select>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <DollarSign className="w-4 h-4" />
              </span>
            </div>
          </div>
          <div className="flex flex-col w-40">
            <label className="block text-xs font-medium mb-1">Date (from)</label>
            <Input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} className="h-10 text-sm" />
          </div>
          <div className="flex flex-col w-40">
            <label className="block text-xs font-medium mb-1">Date (to)</label>
            <Input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className="h-10 text-sm" />
          </div>
          <Button
            variant="ghost"
            className="ml-2 mt-6 text-gray-500 border border-gray-200 hover:bg-gray-100 h-10"
            onClick={() => {
              setStatusFilter('');
              setPlanFilter('');
              setMethodFilter('');
              setUserFilter('');
              setDateStart('');
              setDateEnd('');
            }}
          >
            Clear filters
          </Button>
        </div>
      </div>
      {/* Tabela de pagamentos */}
      {loading ? (
        <div>Loading...</div>
      ) : fetchError ? (
        <div className="text-red-600">{fetchError}</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-left font-semibold">User</th>
                <th className="p-3 text-left font-semibold">Amount</th>
                <th className="p-3 text-left font-semibold">Plan</th>
                <th className="p-3 text-left font-semibold">Method</th>
                <th className="p-3 text-left font-semibold">Status</th>
                <th className="p-3 text-left font-semibold">Transaction ID</th>
                <th className="p-3 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">No payments found.</td></tr>
              )}
              {payments.map((p: any) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">
                    <div className="font-medium">{p.profiles?.name || p.profiles?.email || p.user_id}</div>
                    <div className="text-xs text-gray-500">{p.profiles?.email}</div>
                  </td>
                  <td className="p-3 font-semibold text-gray-900">{formatAmount(p.amount, p.currency)}</td>
                  <td className="p-3">
                    <Badge className="bg-blue-100 text-blue-800">{p.plan_type}</Badge>
                  </td>
                  <td className="p-3">
                    {methodIcons[p.payment_method] || p.payment_method}
                    <span className="ml-1 capitalize">{p.payment_method?.replace('_', ' ')}</span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[p.status] || 'bg-gray-100 text-gray-800'}`}>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</span>
                  </td>
                  <td className="p-3">
                    <Tooltip content="Copy Transaction ID">
                      <span
                        className="cursor-pointer underline text-blue-600"
                        onClick={() => navigator.clipboard.writeText(p.transaction_id)}
                      >
                        {p.transaction_id?.slice(0, 8)}...{p.transaction_id?.slice(-4)}
                      </span>
                    </Tooltip>
                  </td>
                  <td className="p-3">{formatDate(p.created_at)}</td>
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