
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookTemplate, Template, getTemplatesByTier } from '@/lib/templates/advancedTemplates';
import { getUserPlan } from '@/lib/api/planService';
import { Book } from '@/lib/api/types';
import { Sparkles, BookOpen, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface BookTemplatesDialogProps {
  onSelectTemplate: (template: BookTemplate) => void;
}

const BookTemplatesDialog: React.FC<BookTemplatesDialogProps> = ({ onSelectTemplate }) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const userPlan = getUserPlan();
  const availableTemplates = getTemplatesByTier(userPlan);

  const categories = ['all', 'Fantasy', 'Science Fiction', 'Romance', 'Mystery', 'Horror', 'Thriller', 'Literary Fiction', 'Historical Fiction'];

  const filteredTemplates = selectedCategory === 'all' 
    ? availableTemplates 
    : availableTemplates.filter(template => template.genre === selectedCategory);

  const handleSelectTemplate = (template: BookTemplate) => {
    onSelectTemplate(template);
    setOpen(false);
    toast.success(`Template "${template.title}" selected!`);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Basic': return 'bg-blue-100 text-blue-800';
      case 'Pro': return 'bg-purple-100 text-purple-800';
      case 'Ultimate': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (userPlan === 'Free') {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Book Templates
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Book Templates - Upgrade Required
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Book templates are available starting from the Basic plan. Upgrade to access professionally crafted book structures.
            </p>
            <Button>Upgrade Plan</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <BookOpen className="h-4 w-4" />
          Book Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Book Templates
            <Badge variant="secondary">{userPlan} Plan</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-4 h-[600px]">
          {/* Category Sidebar */}
          <div className="w-48 space-y-2">
            <h3 className="font-semibold text-sm">Categories</h3>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <ScrollArea className="flex-1">
            <div className="grid gap-4 pr-4">
              {filteredTemplates.map(template => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription className="mt-1">{template.description}</CardDescription>
                      </div>
                      <Badge className={getTierColor(template.tier)}>{template.tier}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{template.genre}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {template.chapters.length} chapters
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Chapter Structure:</h4>
                        <div className="space-y-1">
                          {template.chapters.slice(0, 3).map((chapter, index) => (
                            <div key={index} className="text-sm text-muted-foreground">
                              {index + 1}. {chapter.title}
                            </div>
                          ))}
                          {template.chapters.length > 3 && (
                            <div className="text-sm text-muted-foreground">
                              ... and {template.chapters.length - 3} more chapters
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {template.features.slice(0, 3).map(feature => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {template.features.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{template.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button 
                        className="w-full mt-4"
                        onClick={() => handleSelectTemplate(template)}
                      >
                        Use This Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookTemplatesDialog;
