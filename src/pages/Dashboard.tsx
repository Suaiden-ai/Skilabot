
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { supabase } from "@/integrations/supabase/client";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useNavigate } from "react-router-dom";
import { 
  Bot, 
  MessageSquare, 
  Smartphone, 
  BarChart3, 
  Users, 
  Target, 
  Plus,
  Settings,
  Activity,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {
  usePageTitle("Dashboard | Skilabot");
  const { profile, user } = useAuth();
  const { planLimits, isLoading: loadingLimits } = usePlanLimits();
  const [usage, setUsage] = useState({ agents: 0, connections: 0 });
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        if (profile?.id) {
          const [agentsResult, connectionsResult] = await Promise.all([
            supabase
              .from('ai_configurations')
              .select('id, ai_name, company_name, agent_type, created_at')
              .eq('user_id', profile.id),
            supabase
              .from('whatsapp_connections')
              .select('id, instance_name, status, created_at')
              .eq('user_id', profile.id)
          ]);

          const usageData = {
            agents: agentsResult.data?.length || 0,
            connections: connectionsResult.data?.length || 0,
          };
          setUsage(usageData);
          setAgents(agentsResult.data || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (user?.id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user?.id, profile?.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getPlanColor = (plan: string) => {
    switch (plan?.toLowerCase()) {
      case 'basic':
        return 'bg-blue-100 text-blue-800';
      case 'intermediate':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {profile?.name || 'User'}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your Skilabot account and agents.
        </p>
      </div>

      {/* Plan Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Plan Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Badge className={getPlanColor(profile?.plan || '')}>
                {profile?.plan || 'No Plan'} Plan
              </Badge>
              <p className="text-sm text-gray-600 mt-1">
                {planLimits ? `${usage.agents}/${planLimits.max_agents} Agents • ${usage.connections}/${planLimits.max_whatsapp_connections} Connections` : 'Loading limits...'}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard/settings')}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Manage Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.agents}</div>
            <p className="text-xs text-muted-foreground">
              {planLimits ? `${Math.round((usage.agents / planLimits.max_agents) * 100)}% of limit` : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WhatsApp Connections</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.connections}</div>
            <p className="text-xs text-muted-foreground">
              {planLimits ? `${Math.round((usage.connections / planLimits.max_whatsapp_connections) * 100)}% of limit` : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant={profile?.status === 'active' ? 'default' : 'destructive'}>
                {profile?.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {profile?.status === 'active' ? 'All services available' : 'Account suspended'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {profile?.created_at ? `${Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24))} days ago` : ''}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Agents */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Recent Agents
            </CardTitle>
            <Button 
              onClick={() => navigate('/create-agent')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Agent
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {agents.length === 0 ? (
            <div className="text-center py-8">
              <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No agents yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first AI agent to get started with Skilabot.
              </p>
              <Button onClick={() => navigate('/create-agent')}>
                Create Your First Agent
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {agents.slice(0, 3).map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Bot className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{agent.ai_name}</h4>
                      <p className="text-sm text-gray-600">{agent.company_name}</p>
                      <p className="text-xs text-gray-500">
                        Created {new Date(agent.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{agent.agent_type}</Badge>
                </div>
              ))}
              {agents.length > 3 && (
                <div className="text-center pt-4">
                  <Button variant="outline" onClick={() => navigate('/agents')}>
                    View All Agents ({agents.length})
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => navigate('/create-agent')}
            >
              <Plus className="h-6 w-6" />
              <span>Create New Agent</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => navigate('/agents')}
            >
              <Bot className="h-6 w-6" />
              <span>Manage Agents</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => navigate('/dashboard-kanban')}
            >
              <BarChart3 className="h-6 w-6" />
              <span>Kanban</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
