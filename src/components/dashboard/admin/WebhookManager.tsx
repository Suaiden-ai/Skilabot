import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

const EVENT_OPTIONS = [
  { value: 'user_created', label: 'User Created' },
  { value: 'payment_created', label: 'Payment Created' },
  { value: 'plan_upgraded', label: 'Plan Upgraded' },
  { value: 'plan_downgraded', label: 'Plan Downgraded' },
  // Adicione mais eventos conforme necessário
];

export default function WebhookManager() {
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [form, setForm] = useState({
    id: '',
    url: '',
    events: [],
    status: 'active',
    headers: '',
  });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const fetchWebhooks = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('webhooks').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setWebhooks(data);
      setFetchError('');
    } else {
      setWebhooks([]);
      setFetchError(error?.message || 'Unknown error fetching webhooks');
    }
    setLoading(false);
  };

  const handleEdit = (wh: any) => {
    setForm({
      id: wh.id,
      url: wh.url,
      events: wh.events || [],
      status: wh.status,
      headers: wh.headers ? JSON.stringify(wh.headers, null, 2) : '',
    });
    setEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this webhook?')) return;
    await supabase.from('webhooks').delete().eq('id', id);
    fetchWebhooks();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    let headersJson = null;
    if (form.headers) {
      try {
        headersJson = JSON.parse(form.headers);
      } catch {
        alert('Headers must be valid JSON');
        setSaving(false);
        return;
      }
    }
    const payload = {
      url: form.url,
      events: form.events,
      status: form.status,
      headers: headersJson,
    };
    let result;
    if (editing && form.id) {
      result = await supabase.from('webhooks').update(payload).eq('id', form.id);
    } else {
      result = await supabase.from('webhooks').insert([payload]);
    }
    setSaving(false);
    setEditing(false);
    setForm({ id: '', url: '', events: [], status: 'active', headers: '' });
    fetchWebhooks();
  };

  const handleNew = () => {
    setForm({ id: '', url: '', events: [], status: 'active', headers: '' });
    setEditing(true);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : fetchError ? (
        <div className="text-red-600">{fetchError}</div>
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <Button onClick={handleNew}>Add Webhook</Button>
          </div>
          <table className="min-w-full border text-sm mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">URL</th>
                <th className="p-2 text-left">Events</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.length === 0 && (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">No webhooks found.</td></tr>
              )}
              {webhooks.map((wh: any) => (
                <tr key={wh.id} className="border-b">
                  <td className="p-2">{wh.url}</td>
                  <td className="p-2">{(wh.events || []).join(', ')}</td>
                  <td className="p-2">{wh.status}</td>
                  <td className="p-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(wh)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(wh.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {/* Formulário de edição/criação */}
      {editing && (
        <form onSubmit={handleSave} className="bg-gray-50 border rounded p-6 max-w-xl mb-8">
          <h3 className="font-semibold mb-4">{form.id ? 'Edit Webhook' : 'Add Webhook'}</h3>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">URL</label>
            <Input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} required placeholder="https://..." />
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Events</label>
            <select
              multiple
              value={form.events}
              onChange={e => setForm(f => ({ ...f, events: Array.from(e.target.selectedOptions, opt => opt.value) }))}
              className="w-full h-24 border rounded"
              required
            >
              {EVENT_OPTIONS.map(ev => (
                <option key={ev.value} value={ev.value}>{ev.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full border rounded">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Headers (JSON, optional)</label>
            <textarea
              value={form.headers}
              onChange={e => setForm(f => ({ ...f, headers: e.target.value }))}
              className="w-full border rounded font-mono text-xs"
              rows={3}
              placeholder='{"Authorization": "Bearer ..."}'
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button type="button" variant="outline" onClick={() => { setEditing(false); setForm({ id: '', url: '', events: [], status: 'active', headers: '' }); }}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
          </div>
        </form>
      )}
    </div>
  );
} 