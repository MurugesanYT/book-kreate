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
      setIsExporting(true);
      // Create new PDF with better settings
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Define better typography and layout
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = pdfOptions.includeMargins ? 20 : 10;
      const contentWidth = pageWidth - (margin * 2);
      
      // Set font based on quality settings
      const fontFamily = pdfOptions.fontFamily;
      doc.setFont(fontFamily, 'normal');
      
      // Calculate optimal font size based on quality
      const baseFontSize = exportQuality === 'high' ? pdfOptions.fontSize : 12;
      
      // Add title page with improved layout
      doc.setFontSize(baseFontSize * 2.3);
      doc.setFont(fontFamily, 'bold');
      doc.text(editedBook.title, pageWidth / 2, 60, { align: 'center' });
      
      doc.setFontSize(baseFontSize * 1.3);
      doc.setFont(fontFamily, 'italic');
      doc.text(editedBook.genre, pageWidth / 2, 75, { align: 'center' });
      
      // Add description
      if (editedBook.description) {
        doc.setFontSize(baseFontSize);
        doc.setFont(fontFamily, 'normal');
        const descLines = doc.splitTextToSize(editedBook.description, contentWidth);
        doc.text(descLines, pageWidth / 2, 100, { align: 'center' });
      }
      
      // Add cover content
      if (editedBook.coverPage) {
        doc.setFontSize(baseFontSize);
        doc.setFont(fontFamily, 'normal');
        const coverText = editedBook.coverPage.split('\n');
        let yPos = 140;
        coverText.forEach(line => {
          if (line.trim()) {
            // Check for markdown headers to adjust font
            if (line.startsWith('# ')) {
              doc.setFontSize(baseFontSize * 1.5);
              doc.setFont(fontFamily, 'bold');
              doc.text(line.replace('# ', ''), margin, yPos);
            } else if (line.startsWith('## ')) {
              doc.setFontSize(baseFontSize * 1.3);
              doc.setFont(fontFamily, 'bold');
              doc.text(line.replace('## ', ''), margin, yPos);
            } else if (line.startsWith('### ')) {
              doc.setFontSize(baseFontSize * 1.2);
              doc.setFont(fontFamily, 'bold');
              doc.text(line.replace('### ', ''), margin, yPos);
            } else {
              doc.setFontSize(baseFontSize);
              doc.setFont(fontFamily, 'normal');
              
              // For regular text, wrap to fit page width
              const wrappedText = doc.splitTextToSize(line, contentWidth);
              doc.text(wrappedText, margin, yPos);
              yPos += (baseFontSize * 0.5) * wrappedText.length;
              return;
            }
            yPos += baseFontSize * 0.7;
          } else {
            yPos += baseFontSize * 0.3; // Add spacing for empty lines
          }
        });
      }
      
      let pageNumber = 1;
      
      // Add chapters with better formatting
      editedBook.chapters.forEach((chapter, index) => {
        doc.addPage();
        pageNumber++;
        
        // Add page number if enabled
        if (pdfOptions.showPageNumbers) {
          doc.setFontSize(baseFontSize * 0.8);
          doc.setFont(fontFamily, 'normal');
          doc.text(`${pageNumber}`, pageWidth - margin, pageHeight - margin/2);
        }
        
        // Chapter heading
        doc.setFontSize(baseFontSize * 1.7);
        doc.setFont(fontFamily, 'bold');
        doc.text(`Chapter ${index + 1}: ${chapter.title}`, margin, 30);
        
        // Chapter content with better text processing
        doc.setFontSize(baseFontSize);
        doc.setFont(fontFamily, 'normal');
        
        // Process content with better line handling
        const contentLines = chapter.content.split('\n');
        let yPos = 45;
        let isInList = false;
        
        contentLines.forEach(line => {
          // Reset font for each line
          doc.setFont(fontFamily, 'normal');
          doc.setFontSize(baseFontSize);
          
          // Skip empty lines but add spacing
          if (!line.trim()) {
            yPos += baseFontSize * 0.3;
            return;
          }
          
          // Handle markdown headers
          if (line.startsWith('# ')) {
            doc.setFontSize(baseFontSize * 1.5);
            doc.setFont(fontFamily, 'bold');
            doc.text(line.replace('# ', ''), margin, yPos);
            yPos += baseFontSize * 0.7;
            return;
          } else if (line.startsWith('## ')) {
            doc.setFontSize(baseFontSize * 1.3);
            doc.setFont(fontFamily, 'bold');
            doc.text(line.replace('## ', ''), margin, yPos);
            yPos += baseFontSize * 0.6;
            return;
          } else if (line.startsWith('### ')) {
            doc.setFontSize(baseFontSize * 1.2);
            doc.setFont(fontFamily, 'bold');
            doc.text(line.replace('### ', ''), margin, yPos);
            yPos += baseFontSize * 0.5;
            return;
          }
          
          // Handle list items
          if (line.match(/^[\*\-\+]\s/)) {
            const listText = line.replace(/^[\*\-\+]\s/, '• ');
            const wrappedText = doc.splitTextToSize(listText, contentWidth - 5);
            doc.text(wrappedText, margin + 5, yPos);
            yPos += baseFontSize * 0.5 * wrappedText.length;
            isInList = true;
            return;
          } else if (isInList) {
            // Add extra space after lists
            yPos += baseFontSize * 0.2;
            isInList = false;
          }
          
          // Handle regular text with proper wrapping
          const wrappedText = doc.splitTextToSize(line, contentWidth);
          
          // Check if we need a new page
          if (yPos + (wrappedText.length * baseFontSize * 0.5) > pageHeight - margin) {
            doc.addPage();
            pageNumber++;
            yPos = margin;
            
            // Add page number if enabled
            if (pdfOptions.showPageNumbers) {
              doc.setFontSize(baseFontSize * 0.8);
              doc.setFont(fontFamily, 'normal');
              doc.text(`${pageNumber}`, pageWidth - margin, pageHeight - margin/2);
            }
          }
          
          doc.text(wrappedText, margin, yPos);
          yPos += baseFontSize * 0.5 * wrappedText.length;
        });
      });
      
      // Add credits page with better formatting
      if (editedBook.creditsPage) {
        doc.addPage();
        pageNumber++;
        
        // Add page number if enabled
        if (pdfOptions.showPageNumbers) {
          doc.setFontSize(baseFontSize * 0.8);
          doc.setFont(fontFamily, 'normal');
          doc.text(`${pageNumber}`, pageWidth - margin, pageHeight - margin/2);
        }
        
        doc.setFontSize(baseFontSize * 1.8);
        doc.setFont(fontFamily, 'bold');
        doc.text("Credits", pageWidth / 2, 30, { align: 'center' });
        
        doc.setFontSize(baseFontSize);
        doc.setFont(fontFamily, 'normal');
        
        const creditsText = editedBook.creditsPage.split('\n');
        let yPos = 50;
        
        creditsText.forEach(line => {
          if (!line.trim()) {
            yPos += baseFontSize * 0.3;
            return;
          }
          
          // Process credit lines
          if (line.startsWith('# ')) {
            doc.setFontSize(baseFontSize * 1.5);
            doc.setFont(fontFamily, 'bold');
            doc.text(line.replace('# ', ''), pageWidth / 2, yPos, { align: 'center' });
          } else if (line.startsWith('## ')) {
            doc.setFontSize(baseFontSize * 1.3);
            doc.setFont(fontFamily, 'bold');
            doc.text(line.replace('## ', ''), pageWidth / 2, yPos, { align: 'center' });
          } else if (line.startsWith('- **')) {
            // Format credit entries nicely
            const cleanLine = line.replace(/\*\*/g, '').replace('- ', '');
            doc.setFont(fontFamily, 'normal');
            doc.text(cleanLine, pageWidth / 2, yPos, { align: 'center' });
          } else {
            doc.setFont(fontFamily, 'normal');
            const wrappedText = doc.splitTextToSize(line, contentWidth);
            doc.text(wrappedText, margin, yPos);
            yPos += (wrappedText.length - 1) * baseFontSize * 0.5;
          }
          
          yPos += baseFontSize * 0.5;
        });
      }
      
      // Set PDF properties
      doc.setProperties({
        title: editedBook.title,
        subject: editedBook.description,
        creator: 'Book-Kreate',
        author: 'Book-Kreate User'
      });
      
      // Save the PDF
      doc.save(`${editedBook.title.replace(/\s+/g, '_')}.pdf`);
      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF');
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
