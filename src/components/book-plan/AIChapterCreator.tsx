
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Wand, Book, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { canAddChapter, getUserPlan } from '@/lib/api/planService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';

interface AIChapterCreatorProps {
  book: any;
  onAddChapter: (newChapter: any) => void;
}

const AIChapterCreator: React.FC<AIChapterCreatorProps> = ({ book, onAddChapter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMode, setGenerationMode] = useState<'full-auto' | 'guided' | 'from-prompt'>('full-auto');
  const [options, setOptions] = useState({
    respectTone: true,
    respectStyle: true,
    useBookContext: true,
    chapterLength: 'medium', // short, medium, long
    chapterPurpose: 'progress-story', // introduce-character, progress-story, create-conflict, resolve-conflict
    promptGuidance: '',
  });
  
  const userPlan = getUserPlan();
  const totalChapters = book.chapters?.length || 0;
  
  const handleModeChange = (mode: 'full-auto' | 'guided' | 'from-prompt') => {
    setGenerationMode(mode);
  };
  
  const handleOptionChange = (option: string, value: any) => {
    setOptions({
      ...options,
      [option]: value
    });
  };

  const handleGenerateChapter = async () => {
    // First check if user can add more chapters based on their plan
    if (!canAddChapter(book)) {
      toast.error(`Your ${userPlan} plan limits the number of chapters. Please upgrade to add more.`);
      setIsOpen(false);
      return;
    }
    
    try {
      setIsGenerating(true);
      toast.loading('Generating chapter with AI...');
      
      // Simulate a delay for the generation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate title based on existing content
      let chapterTitle = '';
      let chapterDescription = '';
      
      // Auto-generate chapter title based on the book context
      if (totalChapters === 0) {
        chapterTitle = `Chapter 1: The Beginning`;
      } else {
        chapterTitle = `Chapter ${totalChapters + 1}: ${generateSimpleTitle()}`;
      }
      
      // Create chapter description based on options
      if (generationMode === 'from-prompt' && options.promptGuidance.trim()) {
        chapterDescription = options.promptGuidance;
      } else {
        chapterDescription = `AI-generated chapter with ${options.chapterLength} length, focusing on ${options.chapterPurpose.replace('-', ' ')}.`;
      }
      
      // Generate a simulated content (in a real app, this would come from the AI)
      const generatedContent = generateSimpleContent();
      
      const newChapter = {
        id: uuidv4(),
        title: chapterTitle,
        description: chapterDescription,
        type: 'chapter',
        status: 'completed', // Mark as completed since we've auto-generated the content
        content: generatedContent,
      };
      
      onAddChapter(newChapter);
      toast.success(`Chapter "${chapterTitle}" generated successfully!`);
      
      setIsOpen(false);
    } catch (error) {
      console.error("Error generating chapter:", error);
      toast.error("Failed to generate chapter. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Simple title generation function for demo purposes
  const generateSimpleTitle = () => {
    const firstWords = ["Awakening", "Journey", "Discovery", "Mystery", "Secret", "Return", "Shadows", "Encounter", "Revelation", "Dark", "Light", "Beginning", "End"];
    const secondWords = ["Dawn", "Night", "Truth", "Path", "Hope", "Despair", "Future", "Past", "Destiny", "Fate", "Plan", "Dream", "Nightmare"];
    
    return `${firstWords[Math.floor(Math.random() * firstWords.length)]} of ${secondWords[Math.floor(Math.random() * secondWords.length)]}`;
  };
  
  // Simple content generation function for demo purposes
  const generateSimpleContent = () => {
    return `
The morning sun cast long shadows through the windows as Alex stared at the empty page in front of them. It had been three days since the incident, and the words still wouldn't come. How could they describe what had happened when they barely understood it themselves?

A notification pinged on their phone. Another message from Sam, probably asking for an update on the manuscript. Alex ignored it. What could they possibly say? "Sorry, can't write because I may have discovered something impossible"? That wouldn't go over well.

The coffee had gone cold hours ago, but Alex took a sip anyway, grimacing at the bitter taste. The apartment felt too quiet, too empty since everything had changed. They needed to clear their head, to make sense of what they'd seen.

Decision made, Alex grabbed their coat and headed for the door. The fresh air might help, and maybe, just maybe, they'd find the words they needed along the way. As they stepped outside, they couldn't shake the feeling that they were being watched, that whatever they had discovered was now hunting them.

The streets were busier than expected for this time of day. People hurried past, wrapped up in their own worlds, unaware of how fragile reality had become. Alex envied their ignorance. Three days ago, they would have been just like them – concerned with deadlines and dinner plans rather than questioning the very nature of existence.

The park was quieter, and Alex found a bench partially hidden by overgrown bushes. Perfect for someone who wanted to be alone with their thoughts. They pulled out the small notebook they always carried and began to write, not the manuscript that was due, but an account of what had happened. Perhaps by documenting it, they could make sense of it all.

Two hours later, the notebook was filled with frantic scribbles, diagrams, and questions without answers. But one thing was becoming clear – Alex couldn't keep this to themselves much longer. They needed help, someone who might believe them, someone who wouldn't immediately suggest psychiatric evaluation.

There was only one person they could think of, though reaching out would mean breaking a promise made long ago. As they dialed the number, Alex hoped it was the right choice. Because if what they'd discovered was true, everything was about to change.
    `;
  };
  
  const isPremiumFeature = (feature: 'guided' | 'prompt') => {
    if (feature === 'guided') {
      return userPlan === 'Basic';
    }
    if (feature === 'prompt') {
      return userPlan === 'Basic' || userPlan === 'Pro';
    }
    return false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 mt-2">
          <Wand className="h-4 w-4" />
          Auto-Generate Chapter
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
          
          <div className="space-y-2">
            <Label>Generation Mode</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                type="button" 
                variant={generationMode === "full-auto" ? "default" : "outline"}
                className="w-full"
                onClick={() => handleModeChange("full-auto")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Auto
              </Button>
              <Button 
                type="button" 
                variant={generationMode === "guided" ? "default" : "outline"}
                className="w-full"
                onClick={() => handleModeChange("guided")}
                disabled={isPremiumFeature('guided')}
              >
                <Book className="h-4 w-4 mr-2" />
                Guided
                {isPremiumFeature('guided') && (
                  <Badge variant="outline" className="ml-1 text-[0.6rem]">Pro</Badge>
                )}
              </Button>
              <Button 
                type="button" 
                variant={generationMode === "from-prompt" ? "default" : "outline"}
                className="w-full"
                onClick={() => handleModeChange("from-prompt")}
                disabled={isPremiumFeature('prompt')}
              >
                <Wand className="h-4 w-4 mr-2" />
                Prompt
                {isPremiumFeature('prompt') && (
                  <Badge variant="outline" className="ml-1 text-[0.6rem]">Ultimate</Badge>
                )}
              </Button>
            </div>
          </div>
          
          {generationMode === 'full-auto' && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Auto Generation</CardTitle>
                <CardDescription>AI will automatically create a suitable next chapter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="respectTone">Respect Book Tone</Label>
                  <Switch 
                    id="respectTone" 
                    checked={options.respectTone}
                    onCheckedChange={(checked) => handleOptionChange('respectTone', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="respectStyle">Match Writing Style</Label>
                  <Switch 
                    id="respectStyle" 
                    checked={options.respectStyle}
                    onCheckedChange={(checked) => handleOptionChange('respectStyle', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="useBookContext">Use Book Context</Label>
                  <Switch 
                    id="useBookContext" 
                    checked={options.useBookContext}
                    onCheckedChange={(checked) => handleOptionChange('useBookContext', checked)}
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 pt-3">
                <p className="text-xs text-muted-foreground">
                  AI will analyze your book's existing content and generate a coherent next chapter.
                </p>
              </CardFooter>
            </Card>
          )}
          
          {generationMode === 'guided' && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Guided Generation</CardTitle>
                <CardDescription>Provide guidance on what you want in this chapter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="chapterLength">Chapter Length</Label>
                  <Select
                    value={options.chapterLength}
                    onValueChange={(value) => handleOptionChange('chapterLength', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (~1,500 words)</SelectItem>
                      <SelectItem value="medium">Medium (~3,000 words)</SelectItem>
                      <SelectItem value="long">Long (~5,000 words)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="chapterPurpose">Chapter Purpose</Label>
                  <Select
                    value={options.chapterPurpose}
                    onValueChange={(value) => handleOptionChange('chapterPurpose', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="introduce-character">Introduce a Character</SelectItem>
                      <SelectItem value="progress-story">Progress the Story</SelectItem>
                      <SelectItem value="create-conflict">Create Conflict</SelectItem>
                      <SelectItem value="resolve-conflict">Resolve Conflict</SelectItem>
                      <SelectItem value="build-world">World Building</SelectItem>
                      <SelectItem value="character-development">Character Development</SelectItem>
                      <SelectItem value="plot-twist">Plot Twist</SelectItem>
                      <SelectItem value="climax">Climactic Scene</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 pt-3">
                <p className="text-xs text-muted-foreground">
                  The AI will use your guidance along with the existing context to create a chapter that fits your needs.
                </p>
              </CardFooter>
            </Card>
          )}
          
          {generationMode === 'from-prompt' && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Prompt-Based Generation</CardTitle>
                <CardDescription>Provide specific instructions for the AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1.5">
                  <Label htmlFor="promptGuidance">Your Prompt</Label>
                  <Textarea
                    id="promptGuidance"
                    placeholder="Write a chapter where the protagonist discovers a hidden truth about their past that changes everything..."
                    value={options.promptGuidance}
                    onChange={(e) => handleOptionChange('promptGuidance', e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 pt-3">
                <p className="text-xs text-muted-foreground">
                  Complete creative control with your own prompt. The AI will generate content based on your specific instructions.
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleGenerateChapter} 
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
  );
};

export default AIChapterCreator;
