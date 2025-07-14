
import React from 'react';
import { Loader2, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProgressFeedbackProps {
  status: 'loading' | 'success' | 'error' | 'waiting';
  title: string;
  description: string;
  progress?: number;
  estimatedTime?: string;
}

export const ProgressFeedback: React.FC<ProgressFeedbackProps> = ({
  status,
  title,
  description,
  progress,
  estimatedTime
}) => {
  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'waiting':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getAlertVariant = () => {
    switch (status) {
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Alert variant={getAlertVariant()}>
      {getIcon()}
      <div className="ml-2 space-y-2 flex-1">
        <AlertDescription className="font-medium">
          {title}
        </AlertDescription>
        <AlertDescription className="text-sm">
          {description}
        </AlertDescription>
        
        {progress !== undefined && status === 'loading' && (
          <div className="space-y-1">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{progress}% concluído</span>
              {estimatedTime && <span>~{estimatedTime}</span>}
            </div>
          </div>
        )}
      </div>
    </Alert>
  );
};
