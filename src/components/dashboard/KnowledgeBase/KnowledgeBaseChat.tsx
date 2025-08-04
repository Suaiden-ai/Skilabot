import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, User, Send, Sparkles } from "lucide-react";
import { AIConfiguration, ChatMessage } from "./types";
import React, { useEffect, useRef } from "react";

interface KnowledgeBaseChatProps {
  config: AIConfiguration;
  messages: ChatMessage[];
  inputMessage: string;
  setInputMessage: (v: string) => void;
  handleSendMessage: () => void;
  isChatLoading: boolean;
  testMessageCount: number;
  hasCompletedTest: boolean;
  setStep: (step: string) => void;
  conversationId: string;
}

export const KnowledgeBaseChat: React.FC<KnowledgeBaseChatProps> = ({
  config,
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isChatLoading,
  testMessageCount,
  hasCompletedTest,
  setStep,
  conversationId
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatLoading]);

  // Enviar mensagem inicial quando o chatbot for aberto
  useEffect(() => {
    if (messages.length === 0 && !isChatLoading) {
      // Aguardar um pouco para garantir que o componente está pronto
      const timer = setTimeout(() => {
        const welcomeMessage: ChatMessage = {
          id: Date.now().toString(),
          text: `Hello! I'm ${config.ai_name} from ${config.company_name}. How can I help you today?`,
          isUser: false,
          timestamp: new Date()
        };
        
        // Simular o envio da mensagem inicial
        const event = new CustomEvent('addInitialMessage', { 
          detail: { message: welcomeMessage } 
        });
        window.dispatchEvent(event);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [messages.length, isChatLoading, config.ai_name, config.company_name]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col max-h-full">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-white min-h-0">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 scroll-smooth max-h-[calc(100vh-200px)]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`flex items-start gap-3 max-w-xs ${message.isUser ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                  message.isUser 
                    ? 'bg-gradient-to-br from-pink-500 to-orange-500' 
                    : 'bg-gradient-to-br from-gray-200 to-gray-300'
                }`}>
                  {message.isUser ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl text-sm shadow-sm ${
                    message.isUser
                      ? 'bg-gradient-to-br from-pink-500 to-orange-500 text-white'
                      : 'bg-white text-gray-800 border border-gray-100'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500">Typing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Elemento invisível para scroll automático */}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Area */}
        <div className="p-6 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex gap-3">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 rounded-2xl border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              disabled={isChatLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isChatLoading}
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-2xl px-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Footer */}
        <div className="text-center py-2 border-t border-gray-100 bg-white flex-shrink-0">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <Sparkles size={12} className="text-pink-400" />
            Powered by <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">Skilabot</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseChat; 