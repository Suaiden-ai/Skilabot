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
          setError('Smart Chat account not found. You need to connect WhatsApp first.');
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
      <div className="w-full h-full bg-white py-6 px-6 pl-20">
        <div className="w-full max-w-none">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">SMART CHAT</h1>
          
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardContent className="p-12">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                  <p className="text-gray-600 text-lg">Loading Smart Chat...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !chatwootData) {
    return (
      <div className="w-full h-full bg-white py-6 px-6 pl-20">
        <div className="w-full max-w-none">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">SMART CHAT</h1>
          
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                  Smart Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Alert className="mb-6 border-orange-200 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    {error || 'Chatwoot data not found'}
                  </AlertDescription>
                </Alert>
                
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    To access the Smart Chat, you need to first connect your Agent to WhatsApp.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/create-agent'}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white py-6 px-6 pl-20">
      <div className="w-full max-w-none">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">SMART CHAT</h1>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  Smart Chat
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    Connected
                  </Badge>
                </CardTitle>
                <Button
                  onClick={handleSSOLogin}
                  className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow-md px-6 py-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Login SSO Smartchat
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* Account Information Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 block mb-1">Email:</span>
                    <p className="text-sm text-gray-800 font-mono">{chatwootData.chatwoot_email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 block mb-1">Username:</span>
                    <p className="text-sm text-gray-800">{chatwootData.chatwoot_user_name}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 block mb-1">Account ID:</span>
                    <p className="text-sm text-gray-800 font-mono">{chatwootData.id_chatwoot}</p>
                  </div>
                </div>
              </div>
              
              {/* Login Instructions Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Login Instructions
                </h3>
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <div className="space-y-2">
                      <p><strong>1.</strong> Click "Login SSO Smartchat" button above to access Smartchat</p>
                      <p><strong>2.</strong> Use credentials: <strong>Email:</strong> {chatwootData.chatwoot_email} | <strong>Password:</strong> {chatwootData.chatwoot_password}</p>
                      <p><strong>3.</strong> If needed, you can reset password directly in Smartchat</p>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
