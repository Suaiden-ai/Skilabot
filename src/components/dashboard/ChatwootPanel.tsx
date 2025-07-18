import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ChatwootPanel() {
  usePageTitle("Chatwoot Panel | Skilabot");
  const { user } = useAuth();
  const [chatwootData, setChatwootData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const fetchChatwootData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('chatwoot_accounts')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          setError('Chatwoot account not found. You need to connect WhatsApp first.');
        } else {
          setChatwootData(data);
        }
      } catch (err: any) {
        console.error('Error fetching Chatwoot data:', err);
        setError('Error loading Chatwoot data');
      } finally {
        setLoading(false);
      }
    };

    fetchChatwootData();
  }, [user]);

  const handleSSOLogin = async () => {
    if (!chatwootData) return;
    try {
      const userIdChatwoot = chatwootData.user_id_chatwoot;
      if (!userIdChatwoot) {
        alert('user_id_chatwoot not found for this user.');
        return;
      }
      // Enviar para o webhook customizado
      const response = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/sso_link_chatwoot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id_chatwoot: userIdChatwoot })
      });
      if (!response.ok) {
        alert('Error generating Chatwoot SSO link');
        return;
      }
      const data = await response.json();
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        alert('SSO link not returned by server');
      }
    } catch (err) {
      console.error('Error generating Chatwoot SSO link:', err);
      alert('Error generating Chatwoot SSO link');
    }
  };

  const getChatwootUrl = () => {
    if (!chatwootData?.id_chatwoot) return 'http://localhost:3001/chatwoot/';
    return `http://localhost:3001/chatwoot/app/accounts/${chatwootData.id_chatwoot}/dashboard`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-gray-600">Loading Chatwoot panel...</p>
        </div>
      </div>
    );
  }

  if (error || !chatwootData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Chatwoot Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Chatwoot data not found'}
            </AlertDescription>
          </Alert>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              To access the Chatwoot panel, you need to first connect your Agent to WhatsApp.
            </p>
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle className="flex items-center gap-2">
              Chatwoot Panel
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Connected
              </Badge>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSSOLogin}
              className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
            >
              <ExternalLink className="h-4 w-4" />
              Login SSO Chatwoot
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <span className="text-sm font-medium text-gray-700">Email:</span>
              <p className="text-sm text-gray-600">{chatwootData.chatwoot_email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Username:</span>
              <p className="text-sm text-gray-600">{chatwootData.chatwoot_user_name}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Account ID:</span>
              <p className="text-sm text-gray-600 font-mono">{chatwootData.id_chatwoot}</p>
            </div>
          </div>
          
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Login Instructions:</strong>
              <br />
              1. Click "Login SSO Chatwoot" to access Chatwoot
              <br />
              2. Use credentials: <strong>Email:</strong> {chatwootData.chatwoot_email} | <strong>Password:</strong> {chatwootData.chatwoot_password}
              <br />
              3. If needed, you can reset password directly in Chatwoot
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
