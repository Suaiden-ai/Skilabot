import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface ProcessStepperProps {
  currentStep: string;
  steps: Step[];
}

export const ProcessStepper: React.FC<ProcessStepperProps> = ({ currentStep, steps }) => {
  const getStepStatus = (stepId: string) => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    const stepIndex = steps.findIndex(step => step.id === stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center space-y-2 flex-1">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  {
                    "bg-green-500 border-green-500 text-white": status === 'completed',
                    "bg-blue-500 border-blue-500 text-white": status === 'current',
                    "bg-gray-100 border-gray-300 text-gray-400": status === 'upcoming'
                  }
                )}>
                  {status === 'completed' ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="text-center">
                  <div className={cn(
                    "text-sm font-medium",
                    {
                      "text-green-600": status === 'completed',
                      "text-blue-600": status === 'current',
                      "text-gray-400": status === 'upcoming'
                    }
                  )}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 max-w-20">
                    {step.description}
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <ArrowRight className={cn(
                  "h-4 w-4 mx-2",
                  {
                    "text-green-500": getStepStatus(steps[index + 1].id) === 'completed',
                    "text-gray-300": getStepStatus(steps[index + 1].id) !== 'completed'
                  }
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessStepper;
