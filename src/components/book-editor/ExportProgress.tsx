
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Loader } from 'lucide-react';

export interface ExportProgressProps {
  progress: number;
  status: 'idle' | 'processing' | 'completed' | 'error';
  format: string;
  processingStage?: string;
}

const ExportProgress: React.FC<ExportProgressProps> = ({ 
  progress, 
  status, 
  format,
  processingStage 
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Export Progress - {format.toUpperCase()}</span>
          {status === 'completed' && <Check className="h-5 w-5 text-green-500" />}
          {status === 'processing' && <Loader className="h-5 w-5 text-blue-500 animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {status === 'idle' && 'Ready to export'}
              {status === 'processing' && processingStage ? processingStage : `Processing ${format.toUpperCase()}...`}
              {status === 'completed' && 'Export completed!'}
              {status === 'error' && 'Export failed'}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportProgress;
