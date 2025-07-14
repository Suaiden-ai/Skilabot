import { useState } from "react";
import { MessageCircle, Send, Bot, User, Sparkles, Shield, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const ChatbotSection = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm the sales assistant for the dealership. How can I help you find the ideal vehicle?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const WEBHOOK_URL = "https://n8n.murphbots.com/webhook/ed86c932-40d5-4421-9ecb-f84bf49d37fe";

  const sendToN8N = async (message: string): Promise<string> => {
    console.log('Enviando mensagem para N8N:', message);
    console.log('URL do webhook:', WEBHOOK_URL);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          timestamp: new Date().toISOString(),
          source: 'dealerships-chatbot'
        }),
      });

      console.log('Resposta do N8N - Status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados recebidos do N8N:', data);

      if (data.output) {
        return data.output;
      } else if (data.response) {
        return data.response;
      } else {
        throw new Error('Resposta do N8N não contém output nem response');
      }
    } catch (error) {
      console.error('Erro ao enviar para N8N:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendToN8N(currentMessage);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      toast({
        title: "Message Sent",
        description: "Your message was sent successfully!",
      });
    } catch (error) {
      console.error('Erro completo:', error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, an error occurred while processing your message. Please try again.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Unable to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const features = [
    {
      icon: Clock,
      title: "Instant Test Drive Scheduling",
      description: "Book appointments automatically with our intelligent calendar integration"
    },
    {
      icon: Sparkles,
      title: "Vehicle Inventory Search",
      description: "Real-time consultation of available vehicles and specifications"
    },
    {
      icon: Shield,
      title: "Financing Simulation",
      description: "Instant calculations and personalized financing options"
    },
    {
      icon: Zap,
      title: "Smart Lead Follow-up",
      description: "Automated nurturing sequences that convert prospects into customers"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.2),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/90">Powered by Advanced AI</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-6">
            Experience Our
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Intelligent Assistant
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover how our cutting-edge AI transforms customer interactions, automates sales processes, and delivers exceptional results for automotive dealerships
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Premium Features */}
          <div className="space-y-8">
            <div className="grid gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Premium Chatbot Interface */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Premium Sales Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-sm text-white/90">Online & Ready to Help</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-96 p-6 overflow-y-auto bg-gradient-to-b from-slate-50 to-white">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-3 max-w-xs ${message.isUser ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          message.isUser 
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                            : 'bg-gradient-to-br from-slate-200 to-slate-300'
                        }`}>
                          {message.isUser ? (
                            <User className="w-5 h-5 text-white" />
                          ) : (
                            <Bot className="w-5 h-5 text-slate-600" />
                          )}
                        </div>
                        <div
                          className={`px-4 py-3 rounded-2xl text-sm shadow-lg ${
                            message.isUser
                              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-sm'
                              : 'bg-white text-slate-800 rounded-bl-sm border border-slate-200'
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-slate-600" />
                        </div>
                        <div className="bg-white text-slate-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-lg border border-slate-200">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white/50 backdrop-blur-sm border-t border-white/20">
                <div className="flex gap-3">
                  <Input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="flex-1 bg-white/80 backdrop-blur-sm border-white/30 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
