// Custom hooks for KnowledgeBase
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AIConfiguration, WhatsAppConnection, ChatMessage } from "./types";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Cache
const CONFIG_CACHE_KEY = 'skilabot_ai_config';
const CONFIG_CACHE_DURATION = 5 * 60 * 1000;

export function useKnowledgeBaseConfig() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [config, setConfig] = useState<AIConfiguration>({
    id: '',
    ai_name: 'AI Assistant',
    company_name: '',
    personality: 'Friendly',
    agent_type: '',
    custom_prompt: '',
    has_tested: false
  });
  const [loading, setLoading] = useState(false);
  const [hasCompletedTest, setHasCompletedTest] = useState(false);

  // Function to save config to cache
  const saveConfigToCache = (configData: AIConfiguration) => {
    try {
      localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify({
        data: configData,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Error saving config to cache:', error);
    }
  };

  // Function to get config from cache
  const getConfigFromCache = (): AIConfiguration | null => {
    try {
      const cached = localStorage.getItem(CONFIG_CACHE_KEY);
      if (!cached) return null;
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CONFIG_CACHE_DURATION) {
        localStorage.removeItem(CONFIG_CACHE_KEY);
        return null;
      }
      return data;
    } catch (error) {
      console.warn('Error retrieving config from cache:', error);
      return null;
    }
  };

  const loadConfiguration = async () => {
    if (!user) return;
    // Try to load from cache first
    const cachedConfig = getConfigFromCache();
    if (cachedConfig) {
      setConfig(cachedConfig);
      setHasCompletedTest(cachedConfig.has_tested || false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_configurations')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) {
        toast({
          title: "Error",
          description: "Error loading configuration",
          variant: "destructive",
        });
        return;
      }
      const configData = data ? {
        id: data.id,
        ai_name: data.ai_name || 'AI Assistant',
        company_name: data.company_name || '',
        personality: data.personality || 'Friendly',
        agent_type: data.agent_type || '',
        custom_prompt: data.custom_prompt || '',
        has_tested: data.has_tested || false
      } : {
        id: '',
        ai_name: 'AI Assistant',
        company_name: '',
        personality: 'Friendly',
        agent_type: '',
        custom_prompt: '',
        has_tested: false
      };
      setConfig(configData);
      setHasCompletedTest(configData.has_tested);
      saveConfigToCache(configData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unexpected error loading configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markConfigurationAsTested = async (configId: string) => {
    if (!user || !configId) return;
    try {
      const { error } = await supabase
        .from('ai_configurations')
        .update({ has_tested: true })
        .eq('id', configId);
      if (!error) {
        setConfig(prev => ({ ...prev, has_tested: true }));
        setHasCompletedTest(true);
      }
    } catch (error) {
      // just log
    }
  };

  return { config, setConfig, loading, hasCompletedTest, setHasCompletedTest, loadConfiguration, markConfigurationAsTested };
}

export function useWhatsappConnection(configId: string) {
  const { user } = useAuth();
  const [whatsappConnection, setWhatsappConnection] = useState<WhatsAppConnection | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);

  const checkWhatsAppConnection = async () => {
    if (!user || !configId) return;
    setIsCheckingConnection(true);
    try {
      const { data, error } = await supabase
        .from('whatsapp_connections')
        .select('*')
        .eq('user_id', user.id)
        .eq('ai_configuration_id', configId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!error && data) {
        const validStatus = ['connecting', 'connected', 'disconnected', 'error'];
        const connectionStatus = validStatus.includes(data.connection_status)
          ? data.connection_status as 'connecting' | 'connected' | 'disconnected' | 'error'
          : 'error';
        setWhatsappConnection({
          id: data.id,
          connection_status: connectionStatus,
          connected_at: data.connected_at,
          phone_number: data.phone_number
        });
      }
    } catch (error) {
      // just log
    } finally {
      setIsCheckingConnection(false);
    }
  };

  return { whatsappConnection, isCheckingConnection, checkWhatsAppConnection };
}

export function useKnowledgeBaseChat(finalPrompt: string, config: AIConfiguration, conversationId: string, promptHistoryId: string | null, hasCompletedTest: boolean, setHasCompletedTest: (v: boolean) => void) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [testMessageCount, setTestMessageCount] = useState(0);

  const sendToN8NChatbot = async (message: string): Promise<{ response: string; jsonRobo?: any }> => {
    if (!finalPrompt || !user || !config.id) {
      throw new Error('Final prompt, user or configuration not found');
    }
    try {
      const chatResponse = await fetch('https://nwh.suaiden.com/webhook/ed86c932-40d5-4421-9ecb-f84bf49d37fe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_message: message,
          final_prompt: finalPrompt,
          conversation_id: conversationId,
          user_id: user.id,
          ai_configuration_id: config.id,
          timestamp: new Date().toISOString(),
          webhook_type: 'chat_response'
        }),
      });
      if (!chatResponse.ok) {
        throw new Error('Error sending message to chatbot');
      }
      const data = await chatResponse.json();
      return { response: data.response || data.output, jsonRobo: data.jsonRobo };
    } catch (error) {
      throw error;
    }
  };

  const storeJsonRobo = async (jsonRobo: any) => {
    if (!user || !config.id) return;
    try {
      await supabase
        .from('prompt_history')
        .insert({
          user_id: user.id,
          ai_configuration_id: config.id,
          json_robo: jsonRobo,
          created_at: new Date().toISOString(),
          final_prompt: finalPrompt
        });
    } catch (error) {
      // just log
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsChatLoading(true);
    setTestMessageCount(prev => prev + 1);
    try {
      const { response, jsonRobo } = await sendToN8NChatbot(userMessage.text);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      if (jsonRobo) {
        await storeJsonRobo(jsonRobo);
      }
      if (!hasCompletedTest) {
        setHasCompletedTest(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error sending message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChatLoading(false);
    }
  };

  return {
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    handleSendMessage,
    isChatLoading,
    testMessageCount,
    setTestMessageCount
  };
} 