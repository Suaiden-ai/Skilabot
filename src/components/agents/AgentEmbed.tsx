import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Code, 
  Copy, 
  CheckCircle,
  Globe,
  Palette,
  Settings,
  Eye,
  EyeOff,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AgentEmbedProps {
  agentId: string;
  userId: string;
  agentName: string;
  onClose: () => void;
}

interface EmbedConfig {
  primaryColor: string;
  secondaryColor: string;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showHeader: boolean;
  headerText: string;
  welcomeMessage: string;
  enabled: boolean;
}

export function AgentEmbed({ agentId, userId, agentName, onClose }: AgentEmbedProps) {
  const [embedConfig, setEmbedConfig] = useState<EmbedConfig>({
    primaryColor: '#ec4899',
    secondaryColor: '#f97316',
    position: 'bottom-right',
    showHeader: true,
    headerText: `Chat with ${agentName}`,
    welcomeMessage: 'Hello! How can I help you today?',
    enabled: false
  });
  
  const [embedCode, setEmbedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateEmbedCode();
  }, [embedConfig, agentId]);

  const generateEmbedCode = () => {
    const config = {
      agentId,
      userId,
      ...embedConfig
    };

    const code = `
<!-- Skilabot Chat Widget -->
<script>
(function() {
  window.SkilabotConfig = ${JSON.stringify(config, null, 2)};
  
  var script = document.createElement('script');
  script.src = '${window.location.origin}/widget.js';
  script.async = true;
  document.head.appendChild(script);
})();
</script>
`;

    setEmbedCode(code);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast.success('Embed code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const handleSaveConfig = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('ai_configurations')
        .update({
          embed_config: embedConfig
        })
        .eq('id', agentId);

      if (error) {
        toast.error('Error saving embed configuration');
      } else {
        toast.success('Embed configuration saved successfully!');
      }
    } catch (error) {
      toast.error('Error saving embed configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_configurations')
        .select('embed_config')
        .eq('id', agentId)
        .single();

      if (error) {
        console.log('No saved configuration found');
        return;
      }

      if (data?.embed_config) {
        setEmbedConfig(data.embed_config);
        toast.success('Embed configuration loaded!');
      }
    } catch (error) {
      console.error('Error loading configuration:', error);
    }
  };

  useEffect(() => {
    handleLoadConfig();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-pink-500" />
            Embed Chatbot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertDescription>
              Embed this chatbot on your website to provide instant customer support. 
              The widget will appear as a floating chat button that users can click to start a conversation.
            </AlertDescription>
          </Alert>

          {/* Configuration Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enabled" className="text-sm font-medium">
                Enable Embed Widget
              </Label>
              <Switch
                id="enabled"
                checked={embedConfig.enabled}
                onCheckedChange={(checked) => 
                  setEmbedConfig(prev => ({ ...prev, enabled: checked }))
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={embedConfig.primaryColor}
                    onChange={(e) => 
                      setEmbedConfig(prev => ({ ...prev, primaryColor: e.target.value }))
                    }
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={embedConfig.primaryColor}
                    onChange={(e) => 
                      setEmbedConfig(prev => ({ ...prev, primaryColor: e.target.value }))
                    }
                    placeholder="#ec4899"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={embedConfig.secondaryColor}
                    onChange={(e) => 
                      setEmbedConfig(prev => ({ ...prev, secondaryColor: e.target.value }))
                    }
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={embedConfig.secondaryColor}
                    onChange={(e) => 
                      setEmbedConfig(prev => ({ ...prev, secondaryColor: e.target.value }))
                    }
                    placeholder="#f97316"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Widget Position</Label>
              <select
                id="position"
                value={embedConfig.position}
                onChange={(e) => 
                  setEmbedConfig(prev => ({ ...prev, position: e.target.value as any }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showHeader" className="text-sm font-medium">
                Show Header
              </Label>
              <Switch
                id="showHeader"
                checked={embedConfig.showHeader}
                onCheckedChange={(checked) => 
                  setEmbedConfig(prev => ({ ...prev, showHeader: checked }))
                }
              />
            </div>

            {embedConfig.showHeader && (
              <div className="space-y-2">
                <Label htmlFor="headerText">Header Text</Label>
                <Input
                  id="headerText"
                  value={embedConfig.headerText}
                  onChange={(e) => 
                    setEmbedConfig(prev => ({ ...prev, headerText: e.target.value }))
                  }
                  placeholder="Chat with our team"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="welcomeMessage">Welcome Message</Label>
              <Textarea
                id="welcomeMessage"
                value={embedConfig.welcomeMessage}
                onChange={(e) => 
                  setEmbedConfig(prev => ({ ...prev, welcomeMessage: e.target.value }))
                }
                placeholder="Hello! How can I help you today?"
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSaveConfig}
              disabled={loading}
              className="bg-pink-500 hover:bg-pink-600"
            >
              <Settings className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
            
            <Button
              onClick={handleLoadConfig}
              variant="outline"
            >
              <Eye className="h-4 w-4 mr-2" />
              Load Saved
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Embed Code Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-pink-500" />
            Embed Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea
              value={embedCode}
              readOnly
              className="font-mono text-sm h-32 resize-none"
              placeholder="Embed code will be generated here..."
            />
            <Button
              onClick={handleCopyCode}
              size="sm"
              className="absolute top-2 right-2"
              variant="outline"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <Globe className="h-3 w-3 mr-1" />
              Widget Preview
            </Badge>
            <span>•</span>
            <span>The widget will appear as a floating chat button on your website</span>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-pink-500" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="text-sm text-gray-600 mb-2">Widget Preview (simplified):</div>
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{ 
                backgroundColor: embedConfig.primaryColor,
                background: `linear-gradient(135deg, ${embedConfig.primaryColor}, ${embedConfig.secondaryColor})`
              }}
            >
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Position: {embedConfig.position.replace('-', ' ')}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 