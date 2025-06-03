
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Wand, Sparkles, AlertCircle, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { canAddChapter } from '@/lib/api/planService';
import { useAIChapterGeneration } from '@/hooks/useAIChapterGeneration';
import GenerationModeSelector from './generation/GenerationModeSelector';
import AutoGenerationOptions from './generation/AutoGenerationOptions';
import GuidedGenerationOptions from './generation/GuidedGenerationOptions';
import PromptGenerationOptions from './generation/PromptGenerationOptions';

interface AIChapterCreatorProps {
  book: any;
  onAddChapter: (newChapter: any) => void;
}

const AIChapterCreator: React.FC<AIChapterCreatorProps> = ({ book, onAddChapter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isGenerating,
    generationMode,
    setGenerationMode,
    options,
    setOptions,
    userPlan,
    handleGenerateChapter,
    handleQuickGenerateChapter
  } = useAIChapterGeneration(book, onAddChapter);

  const handleOptionChange = (option: string, value: any) => {
    setOptions({
      ...options,
      [option]: value
    });
  };

  const handleGenerateAndClose = async () => {
    const success = await handleGenerateChapter();
    if (success) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Quick generate button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="gap-2" 
              onClick={handleQuickGenerateChapter}
              disabled={!canAddChapter(book)}
            >
              <Zap className="h-4 w-4" />
              Quick AI Chapter
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Instantly generate a new chapter with AI with one click</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* Custom options dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Wand className="h-4 w-4" />
            Custom AI Chapter
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI Chapter Generator
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {!canAddChapter(book) && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Chapter limit reached</AlertTitle>
                <AlertDescription>
                  Your {userPlan} plan allows a maximum of {userPlan === 'Basic' ? '5' : '12'} chapters. 
                  Please upgrade to add more chapters.
                </AlertDescription>
              </Alert>
            )}
            
            <GenerationModeSelector
              generationMode={generationMode}
              onModeChange={setGenerationMode}
              userPlan={userPlan}
            />
            
            {generationMode === 'full-auto' && (
              <AutoGenerationOptions
                options={options}
                onOptionChange={handleOptionChange}
              />
            )}
            
            {generationMode === 'guided' && (
              <GuidedGenerationOptions
                options={options}
                onOptionChange={handleOptionChange}
              />
            )}
            
            {generationMode === 'from-prompt' && (
              <PromptGenerationOptions
                options={options}
                onOptionChange={handleOptionChange}
              />
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleGenerateAndClose} 
              disabled={isGenerating || (generationMode === 'from-prompt' && !options.promptGuidance.trim()) || !canAddChapter(book)}
            >
              {isGenerating ? (
                <>
                  <Wand className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Chapter
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIChapterCreator;
