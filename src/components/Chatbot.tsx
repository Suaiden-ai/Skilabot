import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, RefreshCw, ThumbsUp, ThumbsDown, Bot, Sparkles } from 'lucide-react';

interface ChatbotProps {
  agentId?: string;
  agentName?: string;
  companyName?: string;
  agentType?: string;
  personality?: string;
  customPrompt?: string | null;
  isTestMode?: boolean;
  onClose?: () => void;
}

const Chatbot = ({ 
  agentId,
  agentName = "Sarah from Skilabot",
  companyName,
  agentType,
  personality,
  customPrompt,
  isTestMode = false,
  onClose
}: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(isTestMode ? true : false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: isTestMode 
        ? `Hi, I'm ${agentName} from ${companyName}! 👋 How can I help you today?` 
        : "Hi, I'm Sarah from Skilabot! 👋 How can I help you today?", 
      isBot: true, 
      timestamp: new Date() 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      const userMessage = {
        id: messages.length + 1,
        text: inputMessage,
        isBot: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      const currentMessage = inputMessage;
      setInputMessage('');
      setIsLoading(true);

      try {
        // Chamar o webhook com informações do agent se estiver em modo de teste
        const webhookData = isTestMode ? {
          message: currentMessage,
          timestamp: new Date().toISOString(),
          source: 'skilabot-chatbot-test',
          agentId,
          agentName,
          companyName,
          agentType,
          personality,
          customPrompt
        } : {
          message: currentMessage,
          timestamp: new Date().toISOString(),
          source: 'skilabot-chatbot'
        };

        const response = await fetch(`${import.meta.env.VITE_N8N_BASE_URL}/webhook-test/chatbotsupport`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Adicionar resposta do webhook
        const botResponse = {
          id: messages.length + 2,
          text: data.response || data.output || "Thank you for your message! Our team will get back to you soon.",
          isBot: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        
        // Resposta de fallback em caso de erro
        const errorResponse = {
          id: messages.length + 2,
          text: "Sorry, there was an error processing your message. Please try again in a moment.",
          isBot: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleClose = () => {
    if (isTestMode && onClose) {
      onClose();
    } else {
      setIsOpen(false);
    }
  };

  // Se estiver em modo de teste, renderizar apenas a interface do chat sem header
  if (isTestMode) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full h-full flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message, index) => (
            <div key={message.id} className="animate-fade-in">
              <div
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[320px] px-5 py-4 rounded-2xl shadow-sm ${
                    message.isBot
                      ? 'bg-white text-gray-800 border border-gray-100'
                      : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
              {/* Botões de feedback apenas para mensagens do bot */}
              {message.isBot && index === messages.length - 1 && (
                <div className="flex justify-start mt-3 ml-2">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-green-500 transition-colors rounded-full hover:bg-green-50">
                      <ThumbsUp size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50">
                      <ThumbsDown size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white text-gray-800 px-5 py-4 rounded-2xl border border-gray-100 shadow-sm">
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
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm transition-all duration-200"
                disabled={isLoading}
              />
              {isLoading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-3 rounded-2xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <Sparkles size={12} className="text-pink-400" />
              Powered by <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">Skilabot</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botão do Chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img 
            src="/avatars/sarah-skila.png" 
            alt="Sarah from Skilabot" 
            className="w-full h-full rounded-full object-cover relative z-10"
            onError={(e) => {
              // Fallback para ícone se imagem não carregar
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <MessageCircle size={28} className="hidden text-white relative z-10" />
        </button>
      )}

      {/* Interface do Chat */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-[400px] h-[600px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 via-orange-500 to-pink-600 text-white p-6 rounded-t-3xl flex justify-between items-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-orange-400/20"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <img 
                src="/avatars/sarah-skila.png" 
                alt="Sarah from Skilabot" 
                className="w-12 h-12 rounded-full object-cover border-2 border-white/30 shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Bot size={24} className="hidden text-white" />
              <div>
                <h3 className="font-bold text-white text-xl">Sarah from Skilabot</h3>
                <p className="text-white/90 text-sm font-medium">AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <button className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                <RefreshCw size={18} />
              </button>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message, index) => (
              <div key={message.id} className="animate-fade-in">
                <div
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[280px] px-5 py-4 rounded-2xl shadow-sm ${
                      message.isBot
                        ? 'bg-white text-gray-800 border border-gray-100'
                        : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
                {/* Botões de feedback apenas para mensagens do bot */}
                {message.isBot && index === messages.length - 1 && (
                  <div className="flex justify-start mt-3 ml-2">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-green-500 transition-colors rounded-full hover:bg-green-50">
                        <ThumbsUp size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50">
                        <ThumbsDown size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white text-gray-800 px-5 py-4 rounded-2xl border border-gray-100 shadow-sm">
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
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm transition-all duration-200"
                  disabled={isLoading}
                />
                {isLoading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-4 rounded-2xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
            
            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <Sparkles size={12} className="text-pink-400" />
                Powered by <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">Skilabot</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
