import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { PencilIcon, Trash2Icon, Play, Smartphone, CheckCircle2, Globe } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { AgentWithConnection } from "../../hooks/useAgents";

interface AgentCardProps {
  agent: AgentWithConnection;
  onEdit: (agent: AgentWithConnection) => void;
  onDelete: (id: string) => void;
  onTest: (agent: AgentWithConnection) => void;
  onConnect: (agent: AgentWithConnection) => void;
  onDisconnect: (agent: AgentWithConnection) => void;
  onEmbed: (agent: AgentWithConnection) => void;
  viewMode: 'grid' | 'list';
}

export const AgentCard = ({ 
  agent, 
  onEdit, 
  onDelete, 
  onTest, 
  onConnect, 
  onDisconnect,
  onEmbed,
  viewMode 
}: AgentCardProps) => {
  const renderConnectionButton = (agent: AgentWithConnection, size: "sm" | "default" = "sm") => {
    if (agent.whatsapp_connected) {
      return (
        <Button
          onClick={() => onDisconnect(agent)}
          size={size}
          variant="outline"
          className={size === "sm" ? "flex-1 border-red-200 text-red-600 hover:bg-red-50" : "flex-1 border-red-200 text-red-600 hover:bg-red-50"}
        >
          <FontAwesomeIcon icon={faWhatsapp} className="mr-1" />
          Disconnect
        </Button>
      );
    } else {
      const buttonClass = agent.has_connection_history 
        ? (size === "sm" ? "flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs" : "bg-blue-500 hover:bg-blue-600 text-white")
        : (size === "sm" ? "flex-1 bg-green-500 hover:bg-green-600 text-white text-xs" : "bg-green-500 hover:bg-green-600 text-white");
      
      return (
        <Button
          onClick={() => onConnect(agent)}
          size={size}
          className={buttonClass}
        >
          <FontAwesomeIcon icon={faWhatsapp} className="mr-1" />
          {agent.has_connection_history ? "Reconnect" : "Connect"}
        </Button>
      );
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="p-2 sm:p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            <div className="relative flex-shrink-0">
              <Avatar className="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-xs sm:text-lg shadow-lg">
                {agent.ai_name?.[0] || "A"}
              </Avatar>
              {agent.whatsapp_connected && (
                <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-1 h-1 sm:w-3 sm:h-3 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                <h3 className="text-sm sm:text-lg font-bold text-gray-800 truncate">{agent.ai_name}</h3>
                {agent.whatsapp_connected ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200 text-xs w-fit">
                    <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-orange-300 text-orange-600 bg-orange-50 text-xs w-fit">
                    <Smartphone className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    Not Connected
                  </Badge>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-600">
                <span className="truncate">{agent.company_name}</span>
                <span className="hidden sm:inline">•</span>
                <span className="capitalize truncate">{agent.agent_type.replace('_', ' ')}</span>
                <span className="hidden sm:inline">•</span>
                <span className="capitalize truncate">{agent.personality}</span>
                                 {agent.sectors && agent.sectors.length > 0 && (
                   <>
                     <span className="hidden sm:inline">•</span>
                     <span className="truncate">
                       {agent.sectors[0]}
                     </span>
                   </>
                 )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
            <Button
              onClick={() => onTest(agent)}
              variant="outline"
              size="sm"
              className="text-purple-600 border-purple-200 hover:bg-purple-50 text-xs"
            >
              <Play className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Test Agent</span>
            </Button>
            
            <Button
              onClick={() => onEmbed(agent)}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs"
            >
              <Globe className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Embed</span>
            </Button>
            
            {renderConnectionButton(agent, "sm")}
            
            <Button
              onClick={() => onEdit(agent)}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <PencilIcon className="w-3 h-3" />
            </Button>
            
            <Button
              onClick={() => onDelete(agent.id)}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
            >
              <Trash2Icon className="w-3 h-3" />
            </Button>
          </div>
        </div>

      </Card>
    );
  }

  return (
    <Card className="p-3 sm:p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0">
      <div className="space-y-2 sm:space-y-4">
        {/* Header Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative flex-shrink-0">
            <Avatar className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-sm sm:text-lg shadow-lg">
              {agent.ai_name?.[0] || "A"}
            </Avatar>
            {agent.whatsapp_connected && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-1 h-1 sm:w-3 sm:h-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
              <h3 className="text-sm sm:text-lg font-bold text-gray-800 truncate">{agent.ai_name}</h3>
              {agent.whatsapp_connected ? (
                <Badge className="bg-green-100 text-green-800 border-green-200 text-xs w-fit">
                  <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="border-orange-300 text-orange-600 bg-orange-50 text-xs w-fit">
                  <Smartphone className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                  Not Connected
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-600 truncate">{agent.company_name}</p>
          </div>
        </div>

        {/* Agent Details */}
        <div className="space-y-1 sm:space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Type:</span>
            <span className="text-gray-800 font-medium capitalize truncate ml-2">{agent.agent_type.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Personality:</span>
            <span className="text-gray-800 font-medium capitalize truncate ml-2">{agent.personality}</span>
          </div>
                     {agent.sectors && agent.sectors.length > 0 && (
             <div className="flex items-center justify-between text-xs">
               <span className="text-gray-500 font-medium">Sector:</span>
               <span className="text-gray-800 font-medium truncate ml-2">
                 {agent.sectors[0]}
               </span>
             </div>
           )}
          {agent.phone_number && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">Phone:</span>
              <span className="text-gray-800 font-medium truncate ml-2">{agent.phone_number}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              onClick={() => onTest(agent)}
              variant="outline"
              size="sm"
              className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 text-xs"
            >
              <Play className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Test Agent</span>
            </Button>
            
            <Button
              onClick={() => onEmbed(agent)}
              variant="outline"
              size="sm"
              className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 text-xs"
            >
              <Globe className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Embed</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {renderConnectionButton(agent, "sm")}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 pt-1 sm:pt-2 border-t border-gray-100">
            <Button
              onClick={() => onEdit(agent)}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
            >
              <PencilIcon className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Edit Agent</span>
            </Button>
            
            <Button
              onClick={() => onDelete(agent.id)}
              variant="outline"
              size="sm"
              className="flex-1 text-red-600 border-red-200 hover:bg-red-50 text-xs"
            >
              <Trash2Icon className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}; 