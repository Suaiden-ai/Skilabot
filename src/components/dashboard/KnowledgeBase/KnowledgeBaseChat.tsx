import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bot, User, Send, AlertCircle } from "lucide-react";
import { AIConfiguration, ChatMessage } from "./types";
import React from "react";

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
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Não renderizar mensagem inicial automática do bot

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-6 w-6" />
          <span>Test your AI AGENT - {config.ai_name}</span>
        </CardTitle>
        <CardDescription>
          {!hasCompletedTest ? (
            <div className="space-y-2">
              <div>Chat with your custom AI assistant to test its features.</div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Required:</strong> You must send at least 1 message to test the AI AGENT before connecting to WhatsApp.
                  {testMessageCount > 0 && (
                    <span className="text-green-600 ml-2">
                      ✓ Messages sent: {testMessageCount}
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="text-green-600">✓ Test completed! Your AI AGENT was successfully tested.</div>
          )}
          <div className="text-sm text-gray-500 mt-2">Conversation ID: {conversationId}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Chat Area */}
        <div className="border rounded-lg h-96 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-xs ${message.isUser ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
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
                    className={`px-3 py-2 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-gradient-to-br from-pink-500 to-orange-500 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg rounded-bl-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-3">
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isChatLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isChatLoading}
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {/* Back and Connect Buttons */}
        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={() => setStep("form")}>Back to Configuration</Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setStep("whatsapp")}
            disabled={!hasCompletedTest || testMessageCount === 0}
            title={(!hasCompletedTest || testMessageCount === 0) ? "You must test the AI AGENT by sending at least 1 message before connecting to WhatsApp" : ""}
          >
            Connect to WhatsApp Business
            {(!hasCompletedTest || testMessageCount === 0) && <span className="ml-2">🔒</span>}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBaseChat; 