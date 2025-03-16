
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import { Download, Save } from 'lucide-react';

interface Chapter {
  title: string;
  content: string;
}

interface Book {
  title: string;
  genre: string;
  description: string;
  coverPage?: string;
  chapters: Chapter[];
  creditsPage?: string;
}

interface BookContentEditorProps {
  book: Book;
  onSave: (updatedBook: Book) => void;
}

const BookContentEditor: React.FC<BookContentEditorProps> = ({ book, onSave }) => {
  const [editedBook, setEditedBook] = useState<Book>(book);
  const [activeTab, setActiveTab] = useState<string>('edit');
  const [exportQuality, setExportQuality] = useState<'standard' | 'high'>('standard');

  // Update local state when props change (e.g., when content is generated)
  React.useEffect(() => {
    setEditedBook(book);
  }, [book]);

  const handleContentChange = (index: number, newContent: string) => {
    const updatedChapters = [...editedBook.chapters];
    updatedChapters[index] = { ...updatedChapters[index], content: newContent };
    
    setEditedBook({
      ...editedBook,
      chapters: updatedChapters
    });
  };

  const handleCoverChange = (newContent: string) => {
    setEditedBook({
      ...editedBook,
      coverPage: newContent
    });
  };

  const handleCreditsChange = (newContent: string) => {
    setEditedBook({
      ...editedBook,
      creditsPage: newContent
    });
  };

  const handleSave = () => {
    onSave(editedBook);
    toast.success('Book content saved successfully');
  };

  const exportToPdf = () => {
    try {
      // Create new PDF with better settings
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });
      
      // Define better typography and layout
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      
      // Add title page with improved layout
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text(editedBook.title, pageWidth / 2, 60, { align: 'center' });
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'italic');
      doc.text(editedBook.genre, pageWidth / 2, 75, { align: 'center' });
      
      // Add description
      if (editedBook.description) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(editedBook.description, contentWidth);
        doc.text(descLines, pageWidth / 2, 100, { align: 'center' });
      }
      
      // Add cover content
      if (editedBook.coverPage) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const coverText = editedBook.coverPage.split('\n');
        let yPos = 140;
        coverText.forEach(line => {
          if (line.trim()) {
            // Check for markdown headers to adjust font
            if (line.startsWith('# ')) {
              doc.setFontSize(18);
              doc.setFont('helvetica', 'bold');
              doc.text(line.replace('# ', ''), margin, yPos);
            } else if (line.startsWith('## ')) {
              doc.setFontSize(16);
              doc.setFont('helvetica', 'bold');
              doc.text(line.replace('## ', ''), margin, yPos);
            } else if (line.startsWith('### ')) {
              doc.setFontSize(14);
              doc.setFont('helvetica', 'bold');
              doc.text(line.replace('### ', ''), margin, yPos);
            } else {
              doc.setFontSize(12);
              doc.setFont('helvetica', 'normal');
              
              // For regular text, wrap to fit page width
              const wrappedText = doc.splitTextToSize(line, contentWidth);
              doc.text(wrappedText, margin, yPos);
              yPos += 6 * wrappedText.length;
              return;
            }
            yPos += 8;
          } else {
            yPos += 4; // Add spacing for empty lines
          }
        });
      }
      
      // Add chapters with better formatting
      editedBook.chapters.forEach((chapter, index) => {
        doc.addPage();
        
        // Chapter heading
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text(`Chapter ${index + 1}: ${chapter.title}`, margin, 30);
        
        // Chapter content with better text processing
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        
        // Process content with better line handling
        const contentLines = chapter.content.split('\n');
        let yPos = 45;
        let isInList = false;
        
        contentLines.forEach(line => {
          // Reset font for each line
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(12);
          
          // Skip empty lines but add spacing
          if (!line.trim()) {
            yPos += 4;
            return;
          }
          
          // Handle markdown headers
          if (line.startsWith('# ')) {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(line.replace('# ', ''), margin, yPos);
            yPos += 8;
            return;
          } else if (line.startsWith('## ')) {
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text(line.replace('## ', ''), margin, yPos);
            yPos += 7;
            return;
          } else if (line.startsWith('### ')) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(line.replace('### ', ''), margin, yPos);
            yPos += 6;
            return;
          }
          
          // Handle list items
          if (line.match(/^[\*\-\+]\s/)) {
            const listText = line.replace(/^[\*\-\+]\s/, '• ');
            const wrappedText = doc.splitTextToSize(listText, contentWidth - 5);
            doc.text(wrappedText, margin + 5, yPos);
            yPos += 6 * wrappedText.length;
            isInList = true;
            return;
          } else if (isInList) {
            // Add extra space after lists
            yPos += 2;
            isInList = false;
          }
          
          // Handle regular text with proper wrapping
          const wrappedText = doc.splitTextToSize(line, contentWidth);
          
          // Check if we need a new page
          if (yPos + (wrappedText.length * 6) > 270) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.text(wrappedText, margin, yPos);
          yPos += 6 * wrappedText.length;
        });
      });
      
      // Add credits page with better formatting
      if (editedBook.creditsPage) {
        doc.addPage();
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text("Credits", pageWidth / 2, 30, { align: 'center' });
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        
        const creditsText = editedBook.creditsPage.split('\n');
        let yPos = 50;
        
        creditsText.forEach(line => {
          if (!line.trim()) {
            yPos += 4;
            return;
          }
          
          // Process credit lines
          if (line.startsWith('# ')) {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(line.replace('# ', ''), pageWidth / 2, yPos, { align: 'center' });
          } else if (line.startsWith('## ')) {
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text(line.replace('## ', ''), pageWidth / 2, yPos, { align: 'center' });
          } else if (line.startsWith('- **')) {
            // Format credit entries nicely
            const cleanLine = line.replace(/\*\*/g, '').replace('- ', '');
            doc.setFont('helvetica', 'normal');
            doc.text(cleanLine, pageWidth / 2, yPos, { align: 'center' });
          } else {
            doc.setFont('helvetica', 'normal');
            const wrappedText = doc.splitTextToSize(line, contentWidth);
            doc.text(wrappedText, margin, yPos);
            yPos += (wrappedText.length - 1) * 6;
          }
          
          yPos += 6;
        });
      }
      
      // Set PDF properties
      doc.setProperties({
        title: editedBook.title,
        subject: editedBook.description,
        creator: 'Book-Kreate',
        author: 'Book-Kreate User'
      });
      
      // Apply quality settings
      if (exportQuality === 'high') {
        doc.setProperties({
          compress: false
        });
      }
      
      // Save the PDF
      doc.save(`${editedBook.title.replace(/\s+/g, '_')}.pdf`);
      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF');
    }
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cover Page</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={editedBook.coverPage || ''} 
                onChange={(e) => handleCoverChange(e.target.value)}
                placeholder="Enter cover page content"
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>
          
          {editedBook.chapters.map((chapter, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Chapter {index + 1}: {chapter.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={chapter.content} 
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  placeholder={`Enter content for Chapter ${index + 1}`}
                  className="min-h-[200px]"
                />
              </CardContent>
            </Card>
          ))}
          
          <Card>
            <CardHeader>
              <CardTitle>Credits Page</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={editedBook.creditsPage || ''} 
                onChange={(e) => handleCreditsChange(e.target.value)}
                placeholder="Enter credits page content"
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save size={16} />
              Save
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <Card className="p-6">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-2">{editedBook.title}</h1>
              <p className="text-lg italic">{editedBook.genre}</p>
              <p className="mt-4 text-slate-600">{editedBook.description}</p>
              {editedBook.coverPage && (
                <div className="mt-8">
                  <ReactMarkdown>{editedBook.coverPage}</ReactMarkdown>
                </div>
              )}
            </div>
            
            {editedBook.chapters.map((chapter, index) => (
              <div key={index} className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Chapter {index + 1}: {chapter.title}</h2>
                <ReactMarkdown>{chapter.content}</ReactMarkdown>
              </div>
            ))}
            
            {editedBook.creditsPage && (
              <div className="mt-10 pt-10 border-t">
                <h2 className="text-2xl font-semibold mb-4 text-center">Credits</h2>
                <ReactMarkdown>{editedBook.creditsPage}</ReactMarkdown>
              </div>
            )}
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>PDF Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <label className="font-medium">PDF Quality:</label>
                <select 
                  className="px-3 py-2 border rounded-md"
                  value={exportQuality}
                  onChange={(e) => setExportQuality(e.target.value as 'standard' | 'high')}
                >
                  <option value="standard">Standard</option>
                  <option value="high">High Quality</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button onClick={handleSave} variant="outline">
                <Save size={16} className="mr-2" />
                Save
              </Button>
              <Button onClick={exportToPdf} variant="secondary" className="flex items-center gap-2">
                <Download size={16} />
                Export as PDF
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookContentEditor;
