
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GenerationProgress as ProgressType } from './types';

interface GenerationProgressProps {
  progress: ProgressType;
}

const GenerationProgress: React.FC<GenerationProgressProps> = ({ progress }) => {
  if (!progress.isGenerating) return null;

  return (
    <Card className="border-green-200 bg-green-50/50 rounded-xl md:rounded-2xl">
      <CardContent className="pt-4 md:pt-6">
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm font-medium text-green-800">
              Generating Chapter {progress.currentChapter} of {progress.totalChapters}
            </span>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 text-xs">
              {Math.round(progress.progress)}%
            </Badge>
          </div>
          <Progress value={progress.progress} className="h-2 md:h-3 bg-green-100" />
          <p className="text-xs md:text-sm text-green-700">
            Please wait while our AI crafts your chapters with care and creativity...
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerationProgress;
