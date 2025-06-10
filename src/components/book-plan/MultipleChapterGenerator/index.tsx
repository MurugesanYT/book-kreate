
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Users, Sparkles, AlertCircle, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { canAddChapter, getUserPlan } from '@/lib/api/planService';
import { generateWithGemini } from '@/lib/api/geminiService';
import { MultipleChapterGeneratorProps, GenerationConfig, GenerationProgress as ProgressType } from './types';
import GenerationConfig from './GenerationConfig';
import GenerationProgress from './GenerationProgress';
import FeatureHighlights from './FeatureHighlights';

const MultipleChapterGenerator: React.FC<MultipleChapterGeneratorProps> = ({ book, onAddChapters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<GenerationConfig>({
    numberOfChapters: 3,
    chapterLength: 'medium',
    customPrompt: '',
    generationStyle: 'sequential'
  });
  const [progress, setProgress] = useState<ProgressType>({
    isGenerating: false,
    progress: 0,
    currentChapter: 0,
    totalChapters: 0
  });
  
  const userPlan = getUserPlan();
  const maxChapters = userPlan === 'Ultimate' ? 10 : userPlan === 'Pro' ? 6 : 3;

  const handleGenerateChapters = async () => {
    if (!canAddChapter(book)) {
      toast.error(`Your ${userPlan} plan limits the number of chapters. Please upgrade to add more.`);
      setIsOpen(false);
      return;
    }

    try {
      setProgress({
        isGenerating: true,
        progress: 0,
        currentChapter: 0,
        totalChapters: config.numberOfChapters
      });
      
      const chapters = [];
      const existingChapters = book.chapters || [];
      
      // Create context from existing book content
      const bookContext = `
        Book Title: ${book.title}
        Genre: ${book.category || 'Fiction'}
        Description: ${book.description || 'A compelling story'}
        ${book.characterList ? `Characters: ${book.characterList}` : ''}
        
        Existing Chapters: ${existingChapters.length}
        ${existingChapters.slice(-2).map((ch: any, idx: number) => 
          `Chapter ${existingChapters.length - 1 + idx}: ${ch.title}\n${ch.content?.substring(0, 300) || ''}...`
        ).join('\n\n')}
      `;

      for (let i = 0; i < config.numberOfChapters; i++) {
        setProgress(prev => ({
          ...prev,
          currentChapter: i + 1,
          progress: ((i + 1) / config.numberOfChapters) * 100
        }));
        
        try {
          // Generate chapter title
          const titlePrompt = `Based on this book context:\n${bookContext}\n\nGenerate a compelling chapter title for Chapter ${existingChapters.length + i + 1}. ${config.customPrompt ? `Additional guidance: ${config.customPrompt}` : ''}\n\nReturn only the chapter title, nothing else.`;
          
          const chapterTitle = await generateWithGemini(titlePrompt, 100);
          
          // Generate chapter content
          const contentPrompt = `Write Chapter ${existingChapters.length + i + 1}: "${chapterTitle.trim()}" for this book:

${bookContext}

Chapter Requirements:
- Length: ${config.chapterLength} (${config.chapterLength === 'short' ? '800-1200' : config.chapterLength === 'medium' ? '1500-2500' : '2500-4000'} words)
- Style: ${config.generationStyle === 'sequential' ? 'Continue the story naturally from previous chapters' : 'Create an engaging standalone chapter that fits the overall narrative'}
- Tone: Match the book's established tone and genre
${config.customPrompt ? `- Special Instructions: ${config.customPrompt}` : ''}

Write engaging, well-structured content with proper dialogue, character development, and scene description. Make it compelling and true to the book's style.

Return only the chapter content, no title or extra formatting.`;

          const chapterContent = await generateWithGemini(contentPrompt, config.chapterLength === 'short' ? 3000 : config.chapterLength === 'medium' ? 6000 : 10000);
          
          const newChapter = {
            id: uuidv4(),
            title: chapterTitle.trim(),
            description: `AI-generated ${config.chapterLength} chapter using ${config.generationStyle} style`,
            type: 'chapter',
            status: 'completed',
            content: chapterContent,
            timestamp: new Date().toISOString(),
          };
          
          chapters.push(newChapter);
          
          // Add small delay between generations to prevent rate limiting
          if (i < config.numberOfChapters - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          
        } catch (chapterError) {
          console.error(`Error generating chapter ${i + 1}:`, chapterError);
          
          // Create fallback chapter
          const fallbackChapter = {
            id: uuidv4(),
            title: `Chapter ${existingChapters.length + i + 1}: Continuing the Journey`,
            description: `Fallback chapter - please regenerate`,
            type: 'chapter',
            status: 'draft',
            content: `This chapter was intended to continue the story of "${book.title}". Please regenerate this chapter for better content.`,
            timestamp: new Date().toISOString(),
          };
          
          chapters.push(fallbackChapter);
        }
      }
      
      onAddChapters(chapters);
      setProgress(prev => ({ ...prev, progress: 100 }));
      
      toast.success(`Successfully generated ${chapters.length} chapters!`);
      setIsOpen(false);
      
    } catch (error) {
      console.error('Error in bulk generation:', error);
      toast.error('Failed to generate chapters. Please try again.');
    } finally {
      setProgress({
        isGenerating: false,
        progress: 0,
        currentChapter: 0,
        totalChapters: 0
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 md:py-3 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-sm md:text-base">
          <Users className="h-4 w-4 md:h-5 md:w-5 mr-2" />
          Generate Multiple Chapters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[600px] bg-white/95 backdrop-blur-lg rounded-2xl md:rounded-3xl border border-green-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg md:rounded-xl flex items-center justify-center">
              <Users className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            AI Bulk Chapter Generator
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 md:space-y-8 py-4 md:py-6">
          {!canAddChapter(book) && (
            <Alert variant="destructive" className="rounded-xl md:rounded-2xl border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Chapter limit reached</AlertTitle>
              <AlertDescription>
                Your {userPlan} plan allows a maximum number of chapters. Please upgrade to add more chapters.
              </AlertDescription>
            </Alert>
          )}
          
          <GenerationProgress progress={progress} />
          
          {!progress.isGenerating && (
            <>
              <GenerationConfig 
                config={config}
                onConfigChange={setConfig}
                maxChapters={maxChapters}
              />
              <FeatureHighlights />
            </>
          )}
        </div>
        
        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={progress.isGenerating}
            className="rounded-lg md:rounded-xl border-2 text-sm md:text-base"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleGenerateChapters} 
            disabled={progress.isGenerating || !canAddChapter(book)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
          >
            {progress.isGenerating ? (
              <>
                <Zap className="h-3 w-3 md:h-4 md:w-4 mr-2 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                Generate {config.numberOfChapters} Chapter{config.numberOfChapters > 1 ? 's' : ''}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MultipleChapterGenerator;
