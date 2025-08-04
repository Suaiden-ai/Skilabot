import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle, Loader2, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { AgentWithConnection } from "../../hooks/useAgents";

interface WhatsAppQRModalProps {
  showQrModal: boolean;
  onClose: () => void;
  qrCodeData: string;
  qrCodeLoading: boolean;
  connectionStatus: 'initializing' | 'connecting' | 'open' | 'connected' | 'failed' | 'error' | null;
  onRefreshQrCode: () => void;
}

export const WhatsAppQRModal = ({
  showQrModal,
  onClose,
  qrCodeData,
  qrCodeLoading,
  connectionStatus,
  onRefreshQrCode
}: WhatsAppQRModalProps) => {
  return (
    <Dialog open={showQrModal} onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect WhatsApp</DialogTitle>
          <DialogDescription>
            Scan the QR Code with your WhatsApp to connect your Agent.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            {(() => {
              if (connectionStatus === 'connected') {
                return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Connected!</Badge>;
              }
              if (connectionStatus === 'open') {
                return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Loader2 className="w-3 h-3 mr-1 animate-spin" />QR Code scanned, connecting...</Badge>;
              }
              if (qrCodeLoading) {
                return <Badge className="bg-blue-100 text-blue-800 border-blue-200"><Loader2 className="w-3 h-3 mr-1 animate-spin" />Awaiting connection...</Badge>;
              }
              return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Waiting for scan</Badge>;
            })()}
          </div>

          <div className="flex flex-col items-center space-y-4">
            {qrCodeLoading ? (
              <div className="flex flex-col items-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm text-gray-600">Generating QR Code...</p>
              </div>
            ) : qrCodeData ? (
              <div className="space-y-4">
                <div className="flex justify-center p-4 bg-white rounded-lg border">
                  <img src={qrCodeData} alt="QR Code" style={{ width: 200, height: 200 }} />
                </div>
                {connectionStatus === 'connected' && (
                  <div className="text-center space-y-2">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                    <p className="text-sm text-green-600 font-medium">WhatsApp connected successfully!</p>
                    <p className="text-xs text-gray-500">Redirecting...</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col space-y-2">
            <Button
              onClick={onRefreshQrCode}
              disabled={qrCodeLoading || connectionStatus === 'connected'}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {qrCodeLoading ? "Generating..." : "Refresh QR Code"}
            </Button>
            
            <Button 
              onClick={onClose}
              variant="ghost" 
              className="w-full"
              disabled={connectionStatus === 'connected'}
            >
              {connectionStatus === 'connected' ? 'Finalizing...' : 'Cancel'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 