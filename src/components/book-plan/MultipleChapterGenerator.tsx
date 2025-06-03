
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Users, Sparkles, AlertCircle, BookOpen, Zap, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { canAddChapter, getUserPlan } from '@/lib/api/planService';
import { generateWithGemini } from '@/lib/api/geminiService';

interface MultipleChapterGeneratorProps {
  book: any;
  onAddChapters: (chapters: any[]) => void;
}

const MultipleChapterGenerator: React.FC<MultipleChapterGeneratorProps> = ({ book, onAddChapters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [numberOfChapters, setNumberOfChapters] = useState(3);
  const [chapterLength, setChapterLength] = useState('medium');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generationStyle, setGenerationStyle] = useState('sequential');
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);
  
  const userPlan = getUserPlan();
  const maxChapters = userPlan === 'Ultimate' ? 10 : userPlan === 'Pro' ? 6 : 3;

  const handleGenerateChapters = async () => {
    if (!canAddChapter(book)) {
      toast.error(`Your ${userPlan} plan limits the number of chapters. Please upgrade to add more.`);
      setIsOpen(false);
      return;
    }

    try {
      setIsGenerating(true);
      setProgress(0);
      setCurrentChapter(0);
      
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

      for (let i = 0; i < numberOfChapters; i++) {
        setCurrentChapter(i + 1);
        setProgress(((i + 1) / numberOfChapters) * 100);
        
        try {
          // Generate chapter title
          const titlePrompt = `Based on this book context:\n${bookContext}\n\nGenerate a compelling chapter title for Chapter ${existingChapters.length + i + 1}. ${customPrompt ? `Additional guidance: ${customPrompt}` : ''}\n\nReturn only the chapter title, nothing else.`;
          
          const chapterTitle = await generateWithGemini(titlePrompt, 100);
          
          // Generate chapter content
          const contentPrompt = `Write Chapter ${existingChapters.length + i + 1}: "${chapterTitle.trim()}" for this book:

${bookContext}

Chapter Requirements:
- Length: ${chapterLength} (${chapterLength === 'short' ? '800-1200' : chapterLength === 'medium' ? '1500-2500' : '2500-4000'} words)
- Style: ${generationStyle === 'sequential' ? 'Continue the story naturally from previous chapters' : 'Create an engaging standalone chapter that fits the overall narrative'}
- Tone: Match the book's established tone and genre
${customPrompt ? `- Special Instructions: ${customPrompt}` : ''}

Write engaging, well-structured content with proper dialogue, character development, and scene description. Make it compelling and true to the book's style.

Return only the chapter content, no title or extra formatting.`;

          const chapterContent = await generateWithGemini(contentPrompt, chapterLength === 'short' ? 3000 : chapterLength === 'medium' ? 6000 : 10000);
          
          const newChapter = {
            id: uuidv4(),
            title: chapterTitle.trim(),
            description: `AI-generated ${chapterLength} chapter using ${generationStyle} style`,
            type: 'chapter',
            status: 'completed',
            content: chapterContent,
            timestamp: new Date().toISOString(),
          };
          
          chapters.push(newChapter);
          
          // Add small delay between generations to prevent rate limiting
          if (i < numberOfChapters - 1) {
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
      setProgress(100);
      
      toast.success(`Successfully generated ${chapters.length} chapters!`);
      setIsOpen(false);
      
    } catch (error) {
      console.error('Error in bulk generation:', error);
      toast.error('Failed to generate chapters. Please try again.');
    } finally {
      setIsGenerating(false);
      setProgress(0);
      setCurrentChapter(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold">
          <Users className="h-5 w-5 mr-2" />
          Generate Multiple Chapters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-lg rounded-3xl border border-green-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            AI Bulk Chapter Generator
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-6">
          {!canAddChapter(book) && (
            <Alert variant="destructive" className="rounded-2xl border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Chapter limit reached</AlertTitle>
              <AlertDescription>
                Your {userPlan} plan allows a maximum number of chapters. Please upgrade to add more chapters.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Generation Progress */}
          {isGenerating && (
            <Card className="border-green-200 bg-green-50/50 rounded-2xl">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">
                      Generating Chapter {currentChapter} of {numberOfChapters}
                    </span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                      {Math.round(progress)}%
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-3 bg-green-100" />
                  <p className="text-sm text-green-700">
                    Please wait while our AI crafts your chapters with care and creativity...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Configuration Options */}
          {!isGenerating && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="numberOfChapters" className="text-base font-semibold">Number of Chapters</Label>
                  <Select
                    value={numberOfChapters.toString()}
                    onValueChange={(value) => setNumberOfChapters(parseInt(value))}
                  >
                    <SelectTrigger className="rounded-xl border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {Array.from({ length: maxChapters }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} Chapter{num > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="chapterLength" className="text-base font-semibold">Chapter Length</Label>
                  <Select value={chapterLength} onValueChange={setChapterLength}>
                    <SelectTrigger className="rounded-xl border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="short">Short (~1,000 words)</SelectItem>
                      <SelectItem value="medium">Medium (~2,000 words)</SelectItem>
                      <SelectItem value="long">Long (~3,500 words)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="generationStyle" className="text-base font-semibold">Generation Style</Label>
                <Select value={generationStyle} onValueChange={setGenerationStyle}>
                  <SelectTrigger className="rounded-xl border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="sequential">Sequential Story Progression</SelectItem>
                    <SelectItem value="thematic">Thematic Chapters</SelectItem>
                    <SelectItem value="character-focused">Character Development Focused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="customPrompt" className="text-base font-semibold">
                  Custom Instructions <span className="text-sm font-normal text-slate-500">(Optional)</span>
                </Label>
                <Textarea
                  id="customPrompt"
                  placeholder="Provide specific guidance for the AI about themes, plot points, or character development you want to include..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="min-h-[120px] rounded-xl border-2"
                />
              </div>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-800">Time Efficient</p>
                  <p className="text-xs text-blue-600">Generate hours of content in minutes</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-2xl border border-purple-200">
                  <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-purple-800">Context Aware</p>
                  <p className="text-xs text-purple-600">Maintains story continuity</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-800">Customizable</p>
                  <p className="text-xs text-green-600">Follows your specific guidelines</p>
                </div>
              </div>
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={isGenerating}
            className="rounded-xl border-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleGenerateChapters} 
            disabled={isGenerating || !canAddChapter(book)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {isGenerating ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate {numberOfChapters} Chapter{numberOfChapters > 1 ? 's' : ''}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MultipleChapterGenerator;
