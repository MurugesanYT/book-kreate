import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, BookOpen, Play, Check, Pencil, Loader2, Trash, Info } from 'lucide-react';
import { toast } from 'sonner';
import { generateBookContent, generateBookPlan, BookData, PlanItem } from '@/lib/api';

const BookPlanPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();
  
  const [book, setBook] = useState<BookData | null>(null);
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PlanItem | null>(null);
  
  useEffect(() => {
    const loadBookData = async () => {
      try {
        const books = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
        const foundBook = books.find((b: BookData) => b.id === bookId);
        
        if (foundBook) {
          setBook(foundBook);
          
          const existingPlan = JSON.parse(localStorage.getItem(`bookPlan_${bookId}`) || 'null');
          
          if (existingPlan) {
            setPlanItems(existingPlan);
            // Set first completed item as selected item if any
            const firstCompleted = existingPlan.find((item: PlanItem) => item.status === 'completed');
            if (firstCompleted) {
              setSelectedItem(firstCompleted);
            }
          } else {
            await generateAIBookPlan(foundBook);
          }
        } else {
          toast.error("Book not found");
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Error loading book data:", error);
        toast.error("Failed to load book data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBookData();
  }, [bookId, navigate]);
  
  const generateAIBookPlan = async (bookData: BookData) => {
    setIsGeneratingPlan(true);
    toast.loading("Generating your book plan with custom chapter titles...");
    
    try {
      const generatedPlan = await generateBookPlan(bookData);
      setPlanItems(generatedPlan);
      localStorage.setItem(`bookPlan_${bookId}`, JSON.stringify(generatedPlan));
      toast.success("Book plan generated successfully with custom chapter titles!");
    } catch (error) {
      console.error("Error generating book plan:", error);
      generateInitialPlan(bookData);
    } finally {
      setIsGeneratingPlan(false);
    }
  };
  
  const generateInitialPlan = (bookData: BookData) => {
    const newPlan: PlanItem[] = [
      {
        id: `item_${Date.now()}_cover`,
        title: 'Cover Page',
        type: 'cover',
        status: 'pending'
      }
    ];
    
    for (let i = 1; i <= 5; i++) {
      newPlan.push({
        id: `item_${Date.now()}_${i}`,
        title: `Chapter ${i}`,
        description: `Default content for Chapter ${i}`,
        type: 'chapter',
        status: 'pending'
      });
    }
    
    newPlan.push({
      id: `item_${Date.now()}_credits`,
      title: 'Credits Page',
        type: 'credits',
        status: 'pending'
      });
    
    setPlanItems(newPlan);
    
    localStorage.setItem(`bookPlan_${bookId}`, JSON.stringify(newPlan));
  };
  
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  const handleGenerateContent = async (itemId: string) => {
    const item = planItems.find(item => item.id === itemId);
    if (!item || item.status === 'completed') return;
    
    setIsGenerating(true);
    setActiveItemId(itemId);
    
    try {
      const updatedItems = planItems.map(item => 
        item.id === itemId ? { ...item, status: 'ongoing' as const } : item
      );
      setPlanItems(updatedItems);
      localStorage.setItem(`bookPlan_${bookId}`, JSON.stringify(updatedItems));
      
      toast.loading(`Generating content for ${item.title}...`);
      
      const generatedContent = await generateBookContent(
        book, 
        item.type, 
        item.title,
        item.description
      );
      
      const completedItems = planItems.map(item => 
        item.id === itemId 
          ? { ...item, status: 'completed' as const, content: generatedContent } 
          : item
      );
      
      setPlanItems(completedItems);
      localStorage.setItem(`bookPlan_${bookId}`, JSON.stringify(completedItems));
      
      // Set the newly completed item as the selected item
      const completedItem = completedItems.find(i => i.id === itemId);
      if (completedItem) {
        setSelectedItem(completedItem);
      }
      
      toast.success(`${item.title} content generated successfully!`);
      
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
      
      const revertedItems = planItems.map(item => 
        item.id === itemId ? { ...item, status: 'pending' as const } : item
      );
      setPlanItems(revertedItems);
      localStorage.setItem(`bookPlan_${bookId}`, JSON.stringify(revertedItems));
      
    } finally {
      setIsGenerating(false);
      setActiveItemId(null);
    }
  };
  
  const handleViewContent = (item: PlanItem) => {
    setSelectedItem(item);
    // Smooth scroll to the content section
    document.getElementById('output-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const pendingItems = planItems.filter(item => item.status === 'pending');
  const ongoingItems = planItems.filter(item => item.status === 'ongoing');
  const completedItems = planItems.filter(item => item.status === 'completed');
  
  const isBookComplete = planItems.length > 0 && planItems.every(item => item.status === 'completed');

  return (
    <div className="min-h-screen bg-book-lightGray">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
              Book-Kreate
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && currentUser.photoURL && (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || "User"} 
                className="w-10 h-10 rounded-full border-2 border-book-purple"
              />
            )}
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="text-book-purple hover:bg-book-purple/10"
            onClick={handleBackToDashboard}
          >
            <ChevronLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
          
          {isLoading ? (
            <div className="mt-4 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-book-purple" />
            </div>
          ) : book ? (
            <>
              <h1 className="text-3xl font-bold text-book-darkText mt-4">
                {book.title || "New Book"}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-book-purple/10 text-book-purple px-3 py-1 rounded-full text-sm">
                  {book.type}
                </span>
                <span className="bg-book-orange/10 text-book-orange px-3 py-1 rounded-full text-sm">
                  {book.category}
                </span>
              </div>
              <p className="text-slate-600 mt-3 max-w-2xl">
                {book.description}
              </p>
            </>
          ) : (
            <div className="mt-4 text-red-500">Book not found</div>
          )}
        </div>
        
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-book-darkText flex items-center">
                <div className="bg-yellow-100 text-yellow-600 p-1 rounded-full mr-2">
                  <BookOpen size={18} />
                </div>
                Pending Tasks
              </h2>
              
              {pendingItems.length === 0 ? (
                <p className="text-slate-500 text-center py-4">
                  No pending tasks
                </p>
              ) : (
                <div className="space-y-3">
                  {pendingItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="border border-slate-200 rounded-md p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium text-book-darkText">{item.title}</span>
                          <p className="text-sm text-slate-500">{item.type}</p>
                          {item.description && item.type === 'chapter' && (
                            <p className="text-xs text-slate-500 mt-1 italic">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-200 hover:bg-green-50 shrink-0 ml-2"
                          onClick={() => handleGenerateContent(item.id)}
                          disabled={isGenerating}
                        >
                          <Play size={14} className="mr-1" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-book-darkText flex items-center">
                <div className="bg-blue-100 text-blue-600 p-1 rounded-full mr-2">
                  <Loader2 size={18} />
                </div>
                In Progress
              </h2>
              
              {ongoingItems.length === 0 ? (
                <p className="text-slate-500 text-center py-4">
                  No tasks in progress
                </p>
              ) : (
                <div className="space-y-3">
                  {ongoingItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="border border-slate-200 rounded-md p-3"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-medium text-book-darkText">{item.title}</span>
                          <p className="text-sm text-slate-500">{item.type}</p>
                        </div>
                        <div className="bg-blue-100 text-blue-600 p-1 rounded-full">
                          <Loader2 size={16} className="animate-spin" />
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">Generating content...</p>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                        <div className="bg-book-purple h-1.5 rounded-full w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-book-darkText flex items-center">
                <div className="bg-green-100 text-green-600 p-1 rounded-full mr-2">
                  <Check size={18} />
                </div>
                Completed
              </h2>
              
              {completedItems.length === 0 ? (
                <p className="text-slate-500 text-center py-4">
                  No completed tasks yet
                </p>
              ) : (
                <div className="space-y-3">
                  {completedItems.map((item) => (
                    <div 
                      key={item.id} 
                      className={`border ${selectedItem?.id === item.id ? 'border-book-purple bg-book-purple/5' : 'border-slate-200'} rounded-md p-3`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium text-book-darkText">{item.title}</span>
                          <p className="text-sm text-slate-500">{item.type}</p>
                          {item.description && item.type === 'chapter' && (
                            <p className="text-xs text-slate-500 mt-1 italic">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant={selectedItem?.id === item.id ? "default" : "ghost"}
                          size="sm"
                          className={selectedItem?.id === item.id 
                            ? "bg-book-purple text-white hover:bg-book-purple/90" 
                            : "text-book-purple hover:bg-book-purple/10"}
                          onClick={() => handleViewContent(item)}
                        >
                          <Pencil size={14} className="mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div id="output-section" className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-book-darkText">
            Book Content Preview
          </h2>
          
          {!selectedItem ? (
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
              <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700">No content selected</h3>
              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                Generate content for your book chapters using the "Generate" button, then click "View" to see it here.
              </p>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-lg font-medium text-book-purple">{selectedItem.title}</h3>
                <span className="bg-book-purple/10 text-book-purple text-xs px-3 py-1 rounded-full">
                  {selectedItem.type}
                </span>
              </div>
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: (selectedItem.content || 'No content available')
                    .replace(/\n/g, '<br>')
                    // Basic markdown support for headers
                    .replace(/# (.*?)(?:<br>|$)/g, '<h1>$1</h1>')
                    .replace(/## (.*?)(?:<br>|$)/g, '<h2>$1</h2>')
                    .replace(/### (.*?)(?:<br>|$)/g, '<h3>$1</h3>')
                    // Basic markdown support for bold and italic
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                }}
              />
            </div>
          )}
          
          {isBookComplete && (
            <div className="mt-6 flex justify-center">
              <Button className="bg-book-purple hover:bg-book-purple/90">
                <BookOpen className="mr-2" />
                Export Complete Book
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookPlanPage;
