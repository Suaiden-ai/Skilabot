import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { toast } from '../../ui/use-toast';
import WebhookManager from './WebhookManager';

export default function SystemSettings() {
  const { user, isAdmin } = useAuth();
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edited, setEdited] = useState({});
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    if (!user || !isAdmin) return;
    setLoading(true);
    supabase
      .from('system_settings')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          setFetchError(error.message);
          toast({ title: 'Error loading settings', description: error.message });
        } else {
          setSettings(data);
          setFetchError("");
        }
        setLoading(false);
      });
  }, [user, isAdmin]);

  if (!user || !isAdmin) return <div className="p-8">Access denied.</div>;
  if (loading) return <div className="p-8">Loading settings...</div>;
  if (fetchError) return <div className="p-8 text-red-600">Error: {fetchError}</div>;

  const handleChange = (key, value) => {
    setEdited((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key) => {
    setSaving(true);
    const value = edited[key] ?? settings.find((s) => s.key === key)?.value;
    const { error } = await supabase
      .from('system_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key);
    if (error) {
      toast({ title: 'Erro ao salvar', description: error.message });
    } else {
      toast({ title: 'Configuração salva!' });
      setSettings((prev) => prev.map((s) => (s.key === key ? { ...s, value } : s)));
      setEdited((prev) => ({ ...prev, [key]: undefined }));
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Customize system texts, emails, and messages used throughout the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          {settings.length === 0 ? (
            <div className="text-gray-500">No settings found.</div>
          ) : (
            <div className="space-y-6">
              {settings.map((setting) => (
                <Card key={setting.key} className="bg-gray-50 border-none shadow-none">
                  <CardContent className="py-4">
                    <div className="mb-2 text-sm text-muted-foreground font-semibold">{setting.description || setting.key}</div>
                    {setting.value.length > 60 ? (
                      <Textarea
                        value={edited[setting.key] ?? setting.value}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        rows={4}
                        className="mb-2"
                      />
                    ) : (
                      <Input
                        value={edited[setting.key] ?? setting.value}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        className="mb-2"
                      />
                    )}
                    <Button
                      size="sm"
                      disabled={saving || (edited[setting.key] ?? setting.value) === setting.value}
                      onClick={() => handleSave(setting.key)}
                    >
                      Save
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>Configure integrations and automations for external systems (accounting, CRM, marketing, etc).</CardDescription>
        </CardHeader>
        <CardContent>
          <WebhookManager />
        </CardContent>
      </Card>
    </div>
  );
} 