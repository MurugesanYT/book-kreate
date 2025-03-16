
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

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
      const doc = new jsPDF();
      
      // Add title page
      doc.setFontSize(24);
      doc.text(editedBook.title, 105, 30, { align: 'center' });
      doc.setFontSize(16);
      doc.text(editedBook.genre, 105, 40, { align: 'center' });
      
      if (editedBook.coverPage) {
        doc.setFontSize(12);
        const coverText = editedBook.coverPage.split('\n');
        let yPos = 60;
        coverText.forEach(line => {
          if (line.trim()) {
            doc.text(line, 20, yPos);
            yPos += 6;
          }
        });
      }
      
      // Add chapters
      editedBook.chapters.forEach((chapter, index) => {
        doc.addPage();
        doc.setFontSize(18);
        doc.text(`Chapter ${index + 1}: ${chapter.title}`, 20, 20);
        
        doc.setFontSize(12);
        const contentLines = chapter.content.split('\n');
        let yPos = 30;
        contentLines.forEach(line => {
          if (line.trim()) {
            // Check if we need a new page
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            doc.text(line, 20, yPos);
            yPos += 6;
          }
        });
      });
      
      // Add credits page
      if (editedBook.creditsPage) {
        doc.addPage();
        doc.setFontSize(18);
        doc.text("Credits", 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        const creditsText = editedBook.creditsPage.split('\n');
        let yPos = 40;
        creditsText.forEach(line => {
          if (line.trim()) {
            doc.text(line, 20, yPos);
            yPos += 6;
          }
        });
      }
      
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
            <Button onClick={handleSave}>Save</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <Card className="p-6">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-2">{editedBook.title}</h1>
              <p className="text-lg italic">{editedBook.genre}</p>
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
          
          <div className="flex justify-end space-x-2">
            <Button onClick={exportToPdf} variant="secondary">Export as PDF</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookContentEditor;
