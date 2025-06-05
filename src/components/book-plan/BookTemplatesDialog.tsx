
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookTemplate, getTemplatesByTier } from '@/lib/templates/advancedTemplates';
import { getUserPlan } from '@/lib/api/planService';
import { BookOpen, Lock } from 'lucide-react';
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
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Book Templates</span>
            <span className="sm:hidden">Templates</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm sm:max-w-2xl mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
              Book Templates - Upgrade Required
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6 sm:py-8">
            <p className="text-muted-foreground mb-4 text-sm sm:text-base px-2">
              Book templates are available starting from the Basic plan. Upgrade to access professionally crafted book structures.
            </p>
            <Button className="w-full sm:w-auto">Upgrade Plan</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 w-full sm:w-auto">
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Book Templates</span>
          <span className="sm:hidden">Templates</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs sm:max-w-4xl max-h-[90vh] sm:max-h-[80vh] mx-2 sm:mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm sm:text-lg">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Book Templates</span>
            <span className="sm:hidden">Templates</span>
            <Badge variant="secondary" className="text-xs">{userPlan} Plan</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-4 h-[500px] sm:h-[600px]">
          {/* Category Sidebar */}
          <div className="w-full sm:w-48 space-y-2">
            <h3 className="font-semibold text-xs sm:text-sm">Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-xs sm:text-sm p-2 sm:p-3"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <ScrollArea className="flex-1">
            <div className="grid gap-3 sm:gap-4 pr-2 sm:pr-4">
              {filteredTemplates.map(template => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm sm:text-lg truncate">{template.title}</CardTitle>
                        <CardDescription className="mt-1 text-xs sm:text-sm line-clamp-2">{template.description}</CardDescription>
                      </div>
                      <Badge className={`${getTierColor(template.tier)} text-xs ml-2 flex-shrink-0`}>{template.tier}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">{template.genre}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {template.chapters.length} chapters
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 p-3 sm:p-6 sm:pt-0">
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2">Chapter Structure:</h4>
                        <div className="space-y-1">
                          {template.chapters.slice(0, 2).map((chapter, index) => (
                            <div key={index} className="text-xs text-muted-foreground truncate">
                              {index + 1}. {chapter.title}
                            </div>
                          ))}
                          {template.chapters.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              ... and {template.chapters.length - 2} more chapters
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {template.features.slice(0, 2).map(feature => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {template.features.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{template.features.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button 
                        className="w-full mt-3 sm:mt-4 text-xs sm:text-sm"
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
