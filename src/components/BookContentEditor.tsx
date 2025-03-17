import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import { Download, Save, Settings } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [pdfOptions, setPdfOptions] = useState({
    showPageNumbers: true,
    includeMargins: true,
    fontFamily: 'helvetica',
    fontSize: 12,
    advancedSettings: false
  });
  const [isExporting, setIsExporting] = useState(false);

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
      setIsExporting(true);
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = pdfOptions.includeMargins ? 20 : 10;
      const contentWidth = pageWidth - (margin * 2);
      
      const fontFamily = pdfOptions.fontFamily || 'helvetica';
      doc.setFont(fontFamily);
      
      const baseFontSize = pdfOptions.fontSize || 12;
      
      doc.setFontSize(baseFontSize * 2);
      doc.text(editedBook.title || 'Untitled Book', pageWidth / 2, 60, { align: 'center' });
      
      doc.setFontSize(baseFontSize * 1.2);
      doc.text(editedBook.genre || 'No Genre', pageWidth / 2, 75, { align: 'center' });
      
      if (editedBook.description) {
        doc.setFontSize(baseFontSize);
        const descLines = doc.splitTextToSize(editedBook.description, contentWidth);
        doc.text(descLines, pageWidth / 2, 100, { align: 'center' });
      }
      
      if (editedBook.coverPage) {
        doc.addPage();
        doc.setFontSize(baseFontSize * 1.5);
        doc.text("Cover Page", pageWidth / 2, 30, { align: 'center' });
        
        doc.setFontSize(baseFontSize);
        const coverLines = doc.splitTextToSize(editedBook.coverPage, contentWidth);
        doc.text(coverLines, margin, 50);
      }
      
      if (editedBook.chapters && editedBook.chapters.length > 0) {
        editedBook.chapters.forEach((chapter, index) => {
          doc.addPage();
          
          if (pdfOptions.showPageNumbers) {
            doc.setFontSize(baseFontSize * 0.8);
            doc.text(`${index + 2}`, pageWidth - margin, pageHeight - margin/2);
          }
          
          doc.setFontSize(baseFontSize * 1.5);
          doc.text(`Chapter ${index + 1}: ${chapter.title}`, margin, 30);
          
          if (chapter.content) {
            doc.setFontSize(baseFontSize);
            const contentLines = doc.splitTextToSize(chapter.content, contentWidth);
            doc.text(contentLines, margin, 45);
          }
        });
      }
      
      if (editedBook.creditsPage) {
        doc.addPage();
        doc.setFontSize(baseFontSize * 1.5);
        doc.text("Credits", pageWidth / 2, 30, { align: 'center' });
        
        doc.setFontSize(baseFontSize);
        const creditsLines = doc.splitTextToSize(editedBook.creditsPage, contentWidth);
        doc.text(creditsLines, margin, 50);
      }
      
      doc.setProperties({
        title: editedBook.title || 'Untitled Book',
        subject: editedBook.description || 'Book exported from Book-Kreate',
        creator: 'Book-Kreate',
        author: 'Book-Kreate User'
      });
      
      doc.save(`${(editedBook.title || 'book').replace(/\s+/g, '_')}.pdf`);
      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
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
              <CardTitle className="flex items-center gap-2">PDF Export Options <Settings size={18} /></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                
                <Collapsible 
                  open={pdfOptions.advancedSettings}
                  onOpenChange={(open) => setPdfOptions({...pdfOptions, advancedSettings: open})}
                  className="w-full space-y-2"
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Advanced Options
                      <span className={`transition-transform duration-200 ${
                        pdfOptions.advancedSettings ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="page-numbers" 
                        checked={pdfOptions.showPageNumbers}
                        onCheckedChange={(checked) => 
                          setPdfOptions({...pdfOptions, showPageNumbers: !!checked})
                        }
                      />
                      <label htmlFor="page-numbers" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Show page numbers
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="margins" 
                        checked={pdfOptions.includeMargins}
                        onCheckedChange={(checked) => 
                          setPdfOptions({...pdfOptions, includeMargins: !!checked})
                        }
                      />
                      <label htmlFor="margins" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Include wider margins
                      </label>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Font Family:</label>
                      <select 
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        value={pdfOptions.fontFamily}
                        onChange={(e) => setPdfOptions({...pdfOptions, fontFamily: e.target.value})}
                      >
                        <option value="helvetica">Helvetica</option>
                        <option value="times">Times</option>
                        <option value="courier">Courier</option>
                      </select>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Base Font Size:</label>
                      <select 
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        value={pdfOptions.fontSize}
                        onChange={(e) => setPdfOptions({...pdfOptions, fontSize: Number(e.target.value)})}
                      >
                        <option value="10">Small (10pt)</option>
                        <option value="12">Medium (12pt)</option>
                        <option value="14">Large (14pt)</option>
                      </select>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button onClick={handleSave} variant="outline">
                <Save size={16} className="mr-2" />
                Save
              </Button>
              <Button 
                onClick={exportToPdf} 
                variant="secondary" 
                className="flex items-center gap-2"
                disabled={isExporting}
              >
                {isExporting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Export as PDF
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookContentEditor;
