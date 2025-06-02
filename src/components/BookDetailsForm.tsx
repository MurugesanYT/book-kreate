import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BookOpen, Plus, Trash2, LayoutTemplate, Sparkles } from 'lucide-react';
import { generateBookTitle } from '@/lib/api';
import { createBook } from '@/lib/api/bookService';
import { allBookTemplates, getTemplatesByType, BookTemplate } from '@/lib/bookTemplates';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Book types
const BOOK_TYPES = [
  "Children's Story", "Novel", "Short Story", "Poetry Collection",
  "Educational", "Biography", "Fantasy", "Science Fiction",
  "Mystery", "Horror", "Romance", "Adventure",
  "Historical Fiction", "Self-Help", "Cookbook", "Travel",
  "Memoir", "Fairy Tale", "Graphic Novel", "Drama"
];

// Categories based on book type (simplified for demo)
const BOOK_CATEGORIES: Record<string, string[]> = {
  "Children's Story": ["Bedtime Stories", "Educational", "Funny", "Adventure", "Animal Stories"],
  "Novel": ["Contemporary", "Historical", "Crime", "Romance", "Literary Fiction"],
  "Fantasy": ["High Fantasy", "Urban Fantasy", "Magical Realism", "Paranormal", "Mythological"],
  "Science Fiction": ["Space Opera", "Dystopian", "Post-Apocalyptic", "Time Travel", "Cyberpunk"],
  // Add other categories as needed
};

// Default categories for types not explicitly defined
const DEFAULT_CATEGORIES = [
  "General", "Popular", "Classic", "Contemporary", "Experimental"
];

interface Credit {
  role: string;
  name: string;
}

const BookDetailsForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bookType, setBookType] = useState('');
  const [bookCategory, setBookCategory] = useState('');
  const [credits, setCredits] = useState<Credit[]>([
    { role: 'Author', name: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [activeTab, setActiveTab] = useState("custom");
  const [availableTemplates, setAvailableTemplates] = useState<BookTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<BookTemplate | null>(null);

  // Get categories based on selected book type
  const getCategories = () => {
    return BOOK_CATEGORIES[bookType] || DEFAULT_CATEGORIES;
  };

  // Update available templates when book type changes
  useEffect(() => {
    if (bookType) {
      const templates = getTemplatesByType(bookType);
      setAvailableTemplates(templates);
    } else {
      setAvailableTemplates([]);
    }
  }, [bookType]);

  // Handle adding a new credit
  const handleAddCredit = () => {
    setCredits([...credits, { role: '', name: '' }]);
  };

  // Handle removing a credit
  const handleRemoveCredit = (index: number) => {
    setCredits(credits.filter((_, i) => i !== index));
  };

  // Handle updating a credit
  const handleUpdateCredit = (index: number, field: 'role' | 'name', value: string) => {
    const updatedCredits = [...credits];
    updatedCredits[index][field] = value;
    setCredits(updatedCredits);
  };

  // Handle generating title
  const handleGenerateTitle = async () => {
    if (!description) {
      toast.error("Please provide a description first to generate a title.");
      return;
    }
    
    if (!bookType) {
      toast.error("Please select a book type first.");
      return;
    }
    
    if (!bookCategory) {
      toast.error("Please select a book category first.");
      return;
    }
    
    setIsGeneratingTitle(true);
    
    try {
      toast.loading("Generating a title based on your description...");
      console.log("Calling generateBookTitle with:", { description, bookType, bookCategory });
      const generatedTitle = await generateBookTitle(description, bookType, bookCategory);
      console.log("Generated title:", generatedTitle);
      setTitle(generatedTitle);
      toast.success("Book title generated successfully!");
    } catch (error) {
      console.error("Failed to generate title:", error);
      toast.error("Failed to generate title. Please try again or create your own.");
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  // Handle template selection
  const handleSelectTemplate = (template: BookTemplate) => {
    setSelectedTemplate(template);
    
    // Apply template data
    if (template) {
      setBookType(template.type);
      setBookCategory(template.category);
      setDescription(template.description);
      
      // Optionally set the title
      if (!title) {
        setTitle(template.title);
      }
    }
    
    // Switch to the custom tab after selecting a template
    setActiveTab("custom");
    toast.success(`Template "${template.title}" applied successfully!`);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!description) {
      toast.error("Please provide a description for your book.");
      return;
    }
    
    if (!bookType) {
      toast.error("Please select a book type.");
      return;
    }
    
    if (!bookCategory) {
      toast.error("Please select a book category.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // If title is not provided, generate one using AI
      let bookTitle = title;
      if (!title) {
        toast.loading("Generating a title for your book...");
        try {
          console.log("Calling generateBookTitle on submit with:", { description, bookType, bookCategory });
          bookTitle = await generateBookTitle(description, bookType, bookCategory);
          console.log("Generated title on submit:", bookTitle);
          toast.success("Book title generated!");
        } catch (error) {
          console.error("Failed to generate title on submit:", error);
          toast.error("Could not generate title. Using default title.");
          bookTitle = `${bookType} Story`; // Improved fallback title
        }
      }
      
      // Ensure all credits have both role and name
      const validCredits = credits.filter(credit => credit.role && credit.name);
      
      // If no valid credits, add a default author credit
      if (validCredits.length === 0) {
        validCredits.push({ role: 'Author', name: 'Anonymous' });
      }
      
      // Prepare book data
      const bookData = {
        title: bookTitle,
        description,
        type: bookType,
        category: bookCategory,
        credits: validCredits,
        template: selectedTemplate ? selectedTemplate.id : null,
        content: []
      };
      
      // Create the book using the API
      const createdBook = await createBook(bookData);
      
      toast.success("Book created successfully!");
      
      // Navigate to the book planning page
      navigate(`/book/${createdBook.id}`);
    } catch (error: any) {
      console.error("Error creating book:", error);
      toast.error(error.message || "Failed to create book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="custom" className="flex items-center gap-2">
          <Sparkles size={16} />
          <span>Custom Book</span>
        </TabsTrigger>
        <TabsTrigger value="template" className="flex items-center gap-2">
          <LayoutTemplate size={16} />
          <span>Start from Template</span>
        </TabsTrigger>
      </TabsList>
      
      {/* Show shimmer text during submission */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <TextShimmerWave
              className="[--base-color:#8B5CF6] [--base-gradient-color:#A855F7] text-2xl font-bold mb-4"
              duration={1.5}
              spread={0.8}
              zDistance={15}
              scaleDistance={1.2}
              rotateYDistance={25}
            >
              Creating your book plan...
            </TextShimmerWave>
            <p className="text-slate-600 mt-4">
              Our AI is preparing your personalized book structure
            </p>
          </div>
        </div>
      )}
      
      <TabsContent value="template" className="space-y-6">
        <div className="mb-4">
          <Label htmlFor="templateBookType" className="text-book-darkText font-medium mb-2 block">
            Select Book Type
          </Label>
          <Select 
            value={bookType} 
            onValueChange={(value) => {
              setBookType(value);
              setBookCategory('');
              setSelectedTemplate(null);
            }}
          >
            <SelectTrigger id="templateBookType">
              <SelectValue placeholder="Select book type to see templates" />
            </SelectTrigger>
            <SelectContent>
              {BOOK_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {bookType && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableTemplates.length > 0 ? (
              availableTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{template.title}</CardTitle>
                    <CardDescription>{template.type} - {template.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-2">{template.description}</p>
                    <div className="text-xs text-slate-500">
                      <span className="font-medium">Structure:</span> {template.structure.length} chapters
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSelectTemplate(template)} 
                      variant="secondary" 
                      className="w-full"
                    >
                      Use This Template
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 bg-slate-50 rounded-md">
                <p className="text-slate-500">No templates available for this book type yet.</p>
              </div>
            )}
          </div>
        )}
        
        {!bookType && (
          <div className="text-center py-12 bg-slate-50 rounded-md">
            <LayoutTemplate size={48} className="mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">Select a Book Type</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Choose a book type from the dropdown above to see available templates for your project.
            </p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="custom">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-end mb-1">
                <Label htmlFor="title">Book Title (Optional)</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleGenerateTitle}
                  disabled={isGeneratingTitle || !description || !bookType || !bookCategory}
                  className="text-xs"
                >
                  {isGeneratingTitle ? (
                    <>
                      <div className="h-3 w-3 border-t-2 border-current rounded-full animate-spin mr-1"></div>
                      Generating...
                    </>
                  ) : (
                    <>Generate Title</>
                  )}
                </Button>
              </div>
              <Input
                id="title"
                placeholder="Leave blank for AI to generate"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="text-sm text-slate-500 mt-1">
                You can generate a title based on your description, or let AI create one when you submit
              </p>
            </div>
            
            <div>
              <Label htmlFor="description" className="text-book-darkText font-medium">
                Book Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your book idea in detail. The more specific, the better the result!"
                className="h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bookType" className="text-book-darkText font-medium">
                  Book Type <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={bookType} 
                  onValueChange={(value) => {
                    setBookType(value);
                    setBookCategory('');
                  }}
                  required
                >
                  <SelectTrigger id="bookType">
                    <SelectValue placeholder="Select book type" />
                  </SelectTrigger>
                  <SelectContent>
                    {BOOK_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="bookCategory" className="text-book-darkText font-medium">
                  Book Category <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={bookCategory} 
                  onValueChange={setBookCategory}
                  disabled={!bookType}
                  required
                >
                  <SelectTrigger id="bookCategory">
                    <SelectValue placeholder={bookType ? "Select category" : "Select book type first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {getCategories().map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-book-darkText font-medium">Credits</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleAddCredit}
                >
                  <Plus size={16} className="mr-1" />
                  Add Credit
                </Button>
              </div>
              
              <div className="space-y-3">
                {credits.map((credit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Role (e.g., Author, Illustrator)"
                      value={credit.role}
                      onChange={(e) => handleUpdateCredit(index, 'role', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Name"
                      value={credit.name}
                      onChange={(e) => handleUpdateCredit(index, 'name', e.target.value)}
                      className="flex-1"
                    />
                    {credits.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveCredit(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Add credits for anyone who contributed to your book
              </p>
            </div>
          </div>
          
          {selectedTemplate && (
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <LayoutTemplate size={16} className="text-blue-500 mt-1 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Using Template: {selectedTemplate.title}</h4>
                    <p className="text-xs text-blue-600">Your book will be pre-structured based on this template</p>
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedTemplate(null)}
                  className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 text-xs"
                >
                  Remove Template
                </Button>
              </div>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full py-6 bg-book-purple hover:bg-book-purple/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-t-2 border-white rounded-full animate-spin"></div>
                <span>Creating Book Plan...</span>
              </div>
            ) : (
              <>
                <BookOpen className="mr-2" />
                Create Book Plan
              </>
            )}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default BookDetailsForm;
