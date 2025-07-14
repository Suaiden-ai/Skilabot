import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { WhatsAppConnection } from "./types";
import React from "react";

interface KnowledgeBaseWhatsappProps {
  whatsappConnection: WhatsAppConnection | null;
  handleConnectWhatsapp: () => void;
  setStep: (step: string) => void;
  showQrModal: boolean;
  setShowQrModal: (v: boolean) => void;
  qrCodeUrl: string | null;
  qrLoading: boolean;
  qrError: string | null;
}

export const KnowledgeBaseWhatsapp: React.FC<KnowledgeBaseWhatsappProps> = ({
  whatsappConnection,
  handleConnectWhatsapp,
  setStep,
  showQrModal,
  setShowQrModal,
  qrCodeUrl,
  qrLoading,
  qrError
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Connect to WhatsApp Business</CardTitle>
      <CardDescription>
        Follow the instructions below to connect your AI Agent to WhatsApp Business.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {whatsappConnection?.connection_status === 'connected' ? (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Your WhatsApp is already connected! You can proceed to build the AI AGENT.
          </AlertDescription>
        </Alert>
      ) : (
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>
            Click the button below to start integration with WhatsApp Business.
          </li>
          <li>
            Scan the QR Code that will appear with your WhatsApp Business app.
          </li>
          <li>
            After connecting, your AI Agent will be configured automatically!
          </li>
        </ol>
      )}
      <div className="flex gap-3">
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={handleConnectWhatsapp}
          disabled={whatsappConnection?.connection_status === 'connected'}
        >
          {whatsappConnection?.connection_status === 'connected' 
            ? 'WhatsApp Connected' 
            : 'Start WhatsApp Integration'
          }
        </Button>
        {whatsappConnection?.connection_status === 'connected' && (
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setStep('building')}
          >
            Build AI AGENT
          </Button>
        )}
      </div>
      <Button variant="outline" onClick={() => setStep("chatbot")}>Back to Chatbot</Button>
      {/* Modal de QR Code pode ser extraído para QrCodeDialog */}
    </CardContent>
  </Card>
);

export default KnowledgeBaseWhatsapp; 