import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Plus, Trash2, Sparkles, Wand2 } from 'lucide-react';
import { generateBookTitle } from '@/lib/api';
import { createBook } from '@/lib/api/bookService';
import { useAuth } from '@/contexts/AuthContext';

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
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bookType, setBookType] = useState('');
  const [bookCategory, setBookCategory] = useState('');
  const [credits, setCredits] = useState<Credit[]>([
    { role: 'Author', name: currentUser?.displayName || '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  
  // Get categories based on selected book type
  const getCategories = () => {
    return BOOK_CATEGORIES[bookType] || DEFAULT_CATEGORIES;
  };

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
    
    if (!currentUser) {
      toast.error("You must be logged in to create a book.");
      navigate('/auth');
      return;
    }
    
    setIsSubmitting(true);
    toast.loading("Creating your book plan...");
    
    try {
      // If title is not provided, generate one using AI
      let bookTitle = title;
      if (!title) {
        try {
          console.log("Calling generateBookTitle on submit with:", { description, bookType, bookCategory });
          bookTitle = await generateBookTitle(description, bookType, bookCategory);
          console.log("Generated title on submit:", bookTitle);
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
        validCredits.push({ role: 'Author', name: currentUser.displayName || 'Anonymous' });
      }
      
      // Prepare book data
      const bookData = {
        title: bookTitle,
        description,
        type: bookType,
        category: bookCategory,
        credits: validCredits,
        needsGeneratedTitle: !title,
        userId: currentUser.uid,
        timestamp: new Date().toISOString(),
        chapters: []
      };
      
      // Save book to Firebase
      const bookId = await createBook(bookData);
      
      toast.dismiss();
      toast.success("Book details saved successfully!");
      
      // Navigate to the book planning page
      navigate(`/book/plan/${bookId}`);
    } catch (error) {
      console.error("Error saving book:", error);
      toast.dismiss();
      toast.error("Failed to save book details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-end mb-1.5">
            <Label htmlFor="title" className="text-book-darkText font-medium">Book Title (Optional)</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={handleGenerateTitle}
              disabled={isGeneratingTitle || !description || !bookType || !bookCategory}
              className="text-xs gap-1.5 hover:bg-book-purple/10 hover:text-book-purple border-book-purple/30"
            >
              {isGeneratingTitle ? (
                <>
                  <div className="h-3 w-3 border-t-2 border-current rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 size={14} />
                  Generate Title
                </>
              )}
            </Button>
          </div>
          <Input
            id="title"
            placeholder="Leave blank for AI to generate"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white border-slate-300 focus-visible:ring-book-purple"
          />
          <p className="text-sm text-slate-500 mt-1.5">
            You can generate a title based on your description, or let AI create one when you submit
          </p>
        </div>
        
        <div>
          <Label htmlFor="description" className="text-book-darkText font-medium mb-1.5 block">
            Book Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your book idea in detail. The more specific, the better the result!"
            className="h-32 bg-white border-slate-300 focus-visible:ring-book-purple resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="bookType" className="text-book-darkText font-medium mb-1.5 block">
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
              <SelectTrigger id="bookType" className="bg-white border-slate-300 focus:ring-book-purple">
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
            <Label htmlFor="bookCategory" className="text-book-darkText font-medium mb-1.5 block">
              Book Category <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={bookCategory} 
              onValueChange={setBookCategory}
              disabled={!bookType}
              required
            >
              <SelectTrigger id="bookCategory" className="bg-white border-slate-300 focus:ring-book-purple">
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
              className="hover:bg-book-purple/10 hover:text-book-purple border-book-purple/30"
            >
              <Plus size={14} className="mr-1" />
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
                  className="flex-1 bg-white border-slate-300 focus-visible:ring-book-purple"
                />
                <Input
                  placeholder="Name"
                  value={credit.name}
                  onChange={(e) => handleUpdateCredit(index, 'name', e.target.value)}
                  className="flex-1 bg-white border-slate-300 focus-visible:ring-book-purple"
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
      
      <Button 
        type="submit" 
        className="w-full py-6 bg-gradient-to-r from-book-purple to-book-purple/90 hover:opacity-90 shadow-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 border-t-2 border-white rounded-full animate-spin"></div>
            <span>Creating Book Plan...</span>
          </div>
        ) : (
          <>
            <Sparkles className="mr-2" />
            Create Book Plan
          </>
        )}
      </Button>
    </form>
  );
};

export default BookDetailsForm;
