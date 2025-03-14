
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, BookOpen, Play, Check, Pencil, Loader2, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface Credit {
  role: string;
  name: string;
}

interface BookData {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  credits: Credit[];
  needsGeneratedTitle: boolean;
  timestamp: string;
}

interface PlanItem {
  id: string;
  title: string;
  type: 'cover' | 'chapter' | 'credits';
  status: 'pending' | 'ongoing' | 'completed';
  content?: string;
}

const BookPlanPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();
  
  const [book, setBook] = useState<BookData | null>(null);
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  
  useEffect(() => {
    // Load book data from localStorage
    const loadBookData = () => {
      try {
        const books = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
        const foundBook = books.find((b: BookData) => b.id === bookId);
        
        if (foundBook) {
          setBook(foundBook);
          
          // Check if plan already exists
          const existingPlan = JSON.parse(localStorage.getItem(`bookPlan_${bookId}`) || 'null');
          
          if (existingPlan) {
            setPlanItems(existingPlan);
          } else {
            // Generate initial plan
            generateInitialPlan(foundBook);
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
  
  const generateInitialPlan = (bookData: BookData) => {
    // In a real app, this would be an API call to the AI service
    // For now, we'll simulate a plan generation
    
    const newPlan: PlanItem[] = [
      {
        id: `item_${Date.now()}_cover`,
        title: 'Cover Page',
        type: 'cover',
        status: 'pending'
      }
    ];
    
    // Generate 5 chapters
    for (let i = 1; i <= 5; i++) {
      newPlan.push({
        id: `item_${Date.now()}_${i}`,
        title: `Chapter ${i}`,
        type: 'chapter',
        status: 'pending'
      });
    }
    
    // Add credits page
    newPlan.push({
      id: `item_${Date.now()}_credits`,
      title: 'Credits Page',
      type: 'credits',
      status: 'pending'
    });
    
    setPlanItems(newPlan);
    
    // Save to localStorage
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
      // Update item status to ongoing
      const updatedItems = planItems.map(item => 
        item.id === itemId ? { ...item, status: 'ongoing' as const } : item
      );
      setPlanItems(updatedItems);
      localStorage.setItem(`bookPlan_${bookId}`, JSON.stringify(updatedItems));
      
      // Simulate AI generation (in a real app, this would be an API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let generatedContent = '';
      
      if (item.type === 'cover') {
        generatedContent = `# ${book?.title || 'Untitled Book'}\n\n`;
        generatedContent += `*An extraordinary journey of imagination*\n\n`;
        generatedContent += `By ${book?.credits.find(c => c.role === 'Author')?.name || currentUser?.displayName || 'Anonymous'}`;
      } else if (item.type === 'chapter') {
        generatedContent = `# ${item.title}\n\n`;
        generatedContent += `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n`;
        generatedContent += `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n`;
        generatedContent += `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;
      } else if (item.type === 'credits') {
        generatedContent = `# Credits\n\n`;
        book?.credits.forEach(credit => {
          generatedContent += `**${credit.role}**: ${credit.name}\n\n`;
        });
        generatedContent += `\n*Thank you for reading!*\n\n`;
        generatedContent += `© ${new Date().getFullYear()} All Rights Reserved`;
      }
      
      // Update item with generated content and mark as completed
      const completedItems = planItems.map(item => 
        item.id === itemId 
          ? { ...item, status: 'completed' as const, content: generatedContent } 
          : item
      );
      
      setPlanItems(completedItems);
      localStorage.setItem(`bookPlan_${bookId}`, JSON.stringify(completedItems));
      toast.success(`${item.title} content generated successfully!`);
      
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
      
      // Revert to pending status
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
  
  // Filter plan items by status
  const pendingItems = planItems.filter(item => item.status === 'pending');
  const ongoingItems = planItems.filter(item => item.status === 'ongoing');
  const completedItems = planItems.filter(item => item.status === 'completed');
  
  // Check if all items are completed
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
            {/* Pending Plans Section */}
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
                      className="border border-slate-200 rounded-md p-3 flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium text-book-darkText">{item.title}</span>
                        <p className="text-sm text-slate-500">{item.type}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => handleGenerateContent(item.id)}
                        disabled={isGenerating}
                      >
                        <Play size={14} className="mr-1" />
                        Generate
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Ongoing Plans Section */}
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
                        <span className="font-medium text-book-darkText">{item.title}</span>
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
            
            {/* Completed Plans Section */}
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
                      className="border border-slate-200 rounded-md p-3 flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium text-book-darkText">{item.title}</span>
                        <p className="text-sm text-slate-500">{item.type}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-book-purple hover:bg-book-purple/10"
                        onClick={() => {
                          // Show content in the output section
                          document.getElementById('output-section')?.scrollIntoView({ behavior: 'smooth' });
                          
                          // Highlight the selected content
                          const outputEl = document.getElementById('output-content');
                          if (outputEl) {
                            outputEl.innerHTML = (item.content || '').replace(/\n/g, '<br>');
                            outputEl.setAttribute('data-item-id', item.id);
                          }
                        }}
                      >
                        <Pencil size={14} className="mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Output Section */}
        <div id="output-section" className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-book-darkText">
            Book Content Preview
          </h2>
          
          {completedItems.length === 0 ? (
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
              <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700">No content generated yet</h3>
              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                Generate content for your book chapters using the "Generate" button in the Pending Tasks section.
              </p>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg p-4 min-h-[300px]">
              <div 
                id="output-content"
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: (completedItems[0]?.content || '').replace(/\n/g, '<br>') 
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
