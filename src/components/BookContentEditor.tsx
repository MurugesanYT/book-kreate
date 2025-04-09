
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import { Download, Save, Settings, PenTool, Image, LayoutTemplate } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { PDFExportOptions } from '@/lib/api/types';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
  coverImageUrl?: string;
  fontFamily?: string;
  colorScheme?: string;
}

interface BookContentEditorProps {
  book: Book;
  onSave: (updatedBook: Book) => void;
}

const BookContentEditor: React.FC<BookContentEditorProps> = ({ book, onSave }) => {
  const [editedBook, setEditedBook] = useState<Book>(book);
  const [activeTab, setActiveTab] = useState<string>('edit');
  const [exportQuality, setExportQuality] = useState<'standard' | 'high'>('high');
  const [pdfOptions, setPdfOptions] = useState<PDFExportOptions>({
    showPageNumbers: true,
    includeMargins: true,
    fontFamily: book.fontFamily || 'helvetica',
    fontSize: 12,
    headerFooter: true,
    coverPage: true,
    colorScheme: 'elegant',
    pageSize: 'a4',
    orientation: 'portrait'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [formattingTab, setFormattingTab] = useState<string>('content');

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

  const handleStyleChange = (property: keyof Book, value: string) => {
    setEditedBook({
      ...editedBook,
      [property]: value
    });
  };

  const handleSave = () => {
    onSave(editedBook);
    toast.success('Book content saved successfully');
  };

  // Color schemes for PDF export
  const colorSchemes = {
    default: { bg: '#ffffff', text: '#000000', heading: '#000000', accent: '#4a90e2' },
    elegant: { bg: '#f9f9f9', text: '#333333', heading: '#222222', accent: '#8e44ad' },
    modern: { bg: '#ffffff', text: '#2c3e50', heading: '#16a085', accent: '#3498db' },
    classic: { bg: '#fff8e1', text: '#3e2723', heading: '#5d4037', accent: '#795548' },
    vibrant: { bg: '#ffffff', text: '#333333', heading: '#e74c3c', accent: '#f39c12' }
  };

  // Font families for PDF export
  const fontFamilies = [
    { value: 'helvetica', label: 'Helvetica (Sans-serif)' },
    { value: 'times', label: 'Times (Serif)' },
    { value: 'courier', label: 'Courier (Monospace)' }
  ];

  const exportToPdf = () => {
    try {
      setIsExporting(true);
      toast.loading('Creating your beautifully formatted PDF...');
      
      const colorScheme = colorSchemes[pdfOptions.colorScheme as keyof typeof colorSchemes] || colorSchemes.default;
      
      const doc = new jsPDF({
        orientation: pdfOptions.orientation,
        unit: 'mm',
        format: pdfOptions.pageSize,
      });
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = pdfOptions.includeMargins ? 20 : 10;
      const contentWidth = pageWidth - (margin * 2);
      
      // Set font family
      const fontFamily = pdfOptions.fontFamily || 'helvetica';
      doc.setFont(fontFamily);
      
      // Base font size
      const baseFontSize = pdfOptions.fontSize || 12;
      
      // First page - Title Page
      doc.setFillColor(colorScheme.bg);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Add decorative elements
      doc.setDrawColor(colorScheme.accent);
      doc.setLineWidth(1);
      doc.line(margin, 40, pageWidth - margin, 40);
      doc.line(margin, pageHeight - 40, pageWidth - margin, pageHeight - 40);
      
      // Title
      doc.setTextColor(colorScheme.heading);
      doc.setFontSize(baseFontSize * 3);
      doc.setFont(fontFamily, 'bold');
      doc.text(editedBook.title || 'Untitled Book', pageWidth / 2, 80, { align: 'center' });
      
      // Genre
      doc.setTextColor(colorScheme.text);
      doc.setFontSize(baseFontSize * 1.5);
      doc.setFont(fontFamily, 'italic');
      doc.text(editedBook.genre || 'No Genre', pageWidth / 2, 100, { align: 'center' });
      
      // Description
      if (editedBook.description) {
        doc.setFontSize(baseFontSize);
        doc.setFont(fontFamily, 'normal');
        const descLines = doc.splitTextToSize(editedBook.description, contentWidth);
        doc.text(descLines, pageWidth / 2, 130, { align: 'center' });
      }
      
      // Cover page
      if (pdfOptions.coverPage && editedBook.coverPage) {
        doc.addPage();
        
        if (pdfOptions.headerFooter) {
          // Header
          doc.setFont(fontFamily, 'italic');
          doc.setFontSize(baseFontSize * 0.8);
          doc.setTextColor(colorScheme.accent);
          doc.text(editedBook.title, margin, 10);
          
          // Footer
          doc.text('Cover Page', pageWidth - margin, pageHeight - 10, { align: 'right' });
        }
        
        doc.setFont(fontFamily, 'bold');
        doc.setFontSize(baseFontSize * 1.5);
        doc.setTextColor(colorScheme.heading);
        doc.text("Cover Page", pageWidth / 2, 30, { align: 'center' });
        
        doc.setFont(fontFamily, 'normal');
        doc.setFontSize(baseFontSize);
        doc.setTextColor(colorScheme.text);
        const coverLines = doc.splitTextToSize(editedBook.coverPage, contentWidth);
        doc.text(coverLines, margin, 50);
      }
      
      // Chapters
      if (editedBook.chapters && editedBook.chapters.length > 0) {
        editedBook.chapters.forEach((chapter, index) => {
          doc.addPage();
          
          // Background
          doc.setFillColor(colorScheme.bg);
          doc.rect(0, 0, pageWidth, pageHeight, 'F');
          
          if (pdfOptions.headerFooter) {
            // Header
            doc.setFont(fontFamily, 'italic');
            doc.setFontSize(baseFontSize * 0.8);
            doc.setTextColor(colorScheme.accent);
            doc.text(editedBook.title, margin, 10);
            
            // Footer with page number
            if (pdfOptions.showPageNumbers) {
              doc.text(`Page ${index + 3}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
            }
          }
          
          // Chapter title with decorative element
          doc.setDrawColor(colorScheme.accent);
          doc.setLineWidth(0.5);
          doc.line(margin, 25, pageWidth - margin, 25);
          
          doc.setFont(fontFamily, 'bold');
          doc.setFontSize(baseFontSize * 1.8);
          doc.setTextColor(colorScheme.heading);
          doc.text(`Chapter ${index + 1}: ${chapter.title}`, margin, 22);
          
          // Chapter content
          if (chapter.content) {
            doc.setFont(fontFamily, 'normal');
            doc.setFontSize(baseFontSize);
            doc.setTextColor(colorScheme.text);
            
            // Process markdown-like content
            const paragraphs = chapter.content.split('\n\n');
            let yPosition = 40;
            
            paragraphs.forEach(paragraph => {
              // Check if it's a heading (starts with #)
              if (paragraph.startsWith('# ')) {
                doc.setFont(fontFamily, 'bold');
                doc.setFontSize(baseFontSize * 1.6);
                doc.setTextColor(colorScheme.heading);
                const headingText = paragraph.substring(2);
                const headingLines = doc.splitTextToSize(headingText, contentWidth);
                
                doc.text(headingLines, margin, yPosition);
                yPosition += 10 * (headingLines.length);
              } 
              else if (paragraph.startsWith('## ')) {
                doc.setFont(fontFamily, 'bold');
                doc.setFontSize(baseFontSize * 1.3);
                doc.setTextColor(colorScheme.heading);
                const headingText = paragraph.substring(3);
                const headingLines = doc.splitTextToSize(headingText, contentWidth);
                
                doc.text(headingLines, margin, yPosition);
                yPosition += 8 * (headingLines.length);
              }
              else if (paragraph.startsWith('> ')) {
                // Quote
                doc.setFont(fontFamily, 'italic');
                doc.setFontSize(baseFontSize);
                doc.setTextColor(colorScheme.accent);
                
                const quoteText = paragraph.substring(2);
                const quoteLines = doc.splitTextToSize(quoteText, contentWidth - 20);
                
                // Draw quote box
                doc.setDrawColor(colorScheme.accent);
                doc.setFillColor(colorScheme.bg);
                doc.roundedRect(margin + 5, yPosition - 5, contentWidth - 10, 10 * quoteLines.length, 2, 2, 'FD');
                
                doc.text(quoteLines, margin + 10, yPosition);
                yPosition += 10 * (quoteLines.length + 1);
              }
              else {
                // Regular paragraph
                doc.setFont(fontFamily, 'normal');
                doc.setFontSize(baseFontSize);
                doc.setTextColor(colorScheme.text);
                
                const contentLines = doc.splitTextToSize(paragraph, contentWidth);
                
                // Check if we need a new page
                if (yPosition + (contentLines.length * 7) > pageHeight - margin) {
                  doc.addPage();
                  yPosition = margin;
                  
                  // Background
                  doc.setFillColor(colorScheme.bg);
                  doc.rect(0, 0, pageWidth, pageHeight, 'F');
                  
                  if (pdfOptions.headerFooter) {
                    // Header
                    doc.setFont(fontFamily, 'italic');
                    doc.setFontSize(baseFontSize * 0.8);
                    doc.setTextColor(colorScheme.accent);
                    doc.text(editedBook.title, margin, 10);
                    
                    // Footer with page number
                    if (pdfOptions.showPageNumbers) {
                      doc.text(`Page ${index + 3}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
                    }
                  }
                }
                
                doc.text(contentLines, margin, yPosition);
                yPosition += 7 * contentLines.length + 3;
              }
            });
          }
        });
      }
      
      // Credits page
      if (editedBook.creditsPage) {
        doc.addPage();
        
        // Background
        doc.setFillColor(colorScheme.bg);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        
        // Decorative elements
        doc.setDrawColor(colorScheme.accent);
        doc.setLineWidth(1);
        doc.line(margin, 40, pageWidth - margin, 40);
        doc.line(margin, pageHeight - 40, pageWidth - margin, pageHeight - 40);
        
        doc.setFont(fontFamily, 'bold');
        doc.setFontSize(baseFontSize * 1.8);
        doc.setTextColor(colorScheme.heading);
        doc.text("Credits", pageWidth / 2, 30, { align: 'center' });
        
        doc.setFont(fontFamily, 'normal');
        doc.setFontSize(baseFontSize);
        doc.setTextColor(colorScheme.text);
        const creditsLines = doc.splitTextToSize(editedBook.creditsPage, contentWidth);
        doc.text(creditsLines, margin, 60);
      }
      
      // Set document properties
      doc.setProperties({
        title: editedBook.title || 'Untitled Book',
        subject: editedBook.description || 'Book exported from Book-Kreate',
        creator: 'Book-Kreate',
        author: 'Book-Kreate User',
        keywords: `book, ${editedBook.genre}, ${editedBook.title}`
      });
      
      // Save the PDF
      const fileName = `${(editedBook.title || 'book').replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);
      toast.success(`PDF exported successfully as ${fileName}`);
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <PenTool size={16} />
            <span>Edit Content</span>
          </TabsTrigger>
          <TabsTrigger value="format" className="flex items-center gap-2">
            <LayoutTemplate size={16} />
            <span>Formatting</span>
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Image size={16} />
            <span>Preview & Export</span>
          </TabsTrigger>
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
        
        <TabsContent value="format" className="space-y-4">
          <Tabs value={formattingTab} onValueChange={setFormattingTab}>
            <TabsList className="w-full">
              <TabsTrigger value="content">Content Formatting</TabsTrigger>
              <TabsTrigger value="export">Export Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Book Style</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="font-medium mb-2 block">Font Family</Label>
                    <RadioGroup 
                      value={editedBook.fontFamily || 'helvetica'}
                      onValueChange={(value) => handleStyleChange('fontFamily', value)}
                      className="grid grid-cols-1 md:grid-cols-3 gap-3"
                    >
                      {fontFamilies.map(font => (
                        <div key={font.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={font.value} id={`font-${font.value}`} />
                          <Label htmlFor={`font-${font.value}`} className="font-medium cursor-pointer">
                            {font.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label className="font-medium mb-2 block">Color Scheme</Label>
                    <RadioGroup 
                      value={editedBook.colorScheme || 'default'}
                      onValueChange={(value) => handleStyleChange('colorScheme', value)}
                      className="grid grid-cols-1 md:grid-cols-3 gap-3"
                    >
                      {Object.keys(colorSchemes).map((scheme) => (
                        <div 
                          key={scheme} 
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={scheme} id={`scheme-${scheme}`} />
                          <Label 
                            htmlFor={`scheme-${scheme}`} 
                            className="font-medium capitalize cursor-pointer"
                          >
                            {scheme}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label className="font-medium mb-2 block">Formatting Tips</Label>
                    <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-sm space-y-2">
                      <p><span className="font-bold"># Heading 1</span> - Use for major sections</p>
                      <p><span className="font-bold">## Heading 2</span> - Use for subsections</p>
                      <p><span className="font-bold">&gt; Text</span> - Creates a styled quote/callout</p>
                      <p><span className="font-bold">Line break + Line break</span> - Creates a new paragraph</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="export" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">PDF Export Settings <Settings size={18} /></CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-medium mb-2 block">PDF Quality</Label>
                        <select 
                          className="w-full px-3 py-2 border rounded-md"
                          value={exportQuality}
                          onChange={(e) => setExportQuality(e.target.value as 'standard' | 'high')}
                        >
                          <option value="standard">Standard</option>
                          <option value="high">High Quality</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label className="font-medium mb-2 block">Page Size</Label>
                        <select 
                          className="w-full px-3 py-2 border rounded-md"
                          value={pdfOptions.pageSize}
                          onChange={(e) => setPdfOptions({...pdfOptions, pageSize: e.target.value as 'a4' | 'letter' | 'legal'})}
                        >
                          <option value="a4">A4</option>
                          <option value="letter">Letter</option>
                          <option value="legal">Legal</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label className="font-medium mb-2 block">Orientation</Label>
                        <select 
                          className="w-full px-3 py-2 border rounded-md"
                          value={pdfOptions.orientation}
                          onChange={(e) => setPdfOptions({...pdfOptions, orientation: e.target.value as 'portrait' | 'landscape'})}
                        >
                          <option value="portrait">Portrait</option>
                          <option value="landscape">Landscape</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label className="font-medium mb-2 block">Font Size</Label>
                        <select 
                          className="w-full px-3 py-2 border rounded-md"
                          value={pdfOptions.fontSize}
                          onChange={(e) => setPdfOptions({...pdfOptions, fontSize: Number(e.target.value)})}
                        >
                          <option value="10">Small (10pt)</option>
                          <option value="12">Medium (12pt)</option>
                          <option value="14">Large (14pt)</option>
                          <option value="16">Extra Large (16pt)</option>
                        </select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="page-numbers" 
                          checked={pdfOptions.showPageNumbers}
                          onCheckedChange={(checked) => 
                            setPdfOptions({...pdfOptions, showPageNumbers: !!checked})
                          }
                        />
                        <Label htmlFor="page-numbers" className="font-medium cursor-pointer">
                          Show page numbers
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="margins" 
                          checked={pdfOptions.includeMargins}
                          onCheckedChange={(checked) => 
                            setPdfOptions({...pdfOptions, includeMargins: !!checked})
                          }
                        />
                        <Label htmlFor="margins" className="font-medium cursor-pointer">
                          Include wider margins
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="header-footer" 
                          checked={pdfOptions.headerFooter}
                          onCheckedChange={(checked) => 
                            setPdfOptions({...pdfOptions, headerFooter: !!checked})
                          }
                        />
                        <Label htmlFor="header-footer" className="font-medium cursor-pointer">
                          Include header and footer
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="cover-page" 
                          checked={pdfOptions.coverPage}
                          onCheckedChange={(checked) => 
                            setPdfOptions({...pdfOptions, coverPage: !!checked})
                          }
                        />
                        <Label htmlFor="cover-page" className="font-medium cursor-pointer">
                          Include cover page
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-2 bg-slate-50 p-4 rounded-md border border-slate-200 mb-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
                  <Download size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Ready to Export Your Book</h3>
                  <p className="text-sm text-slate-600">Your book will be exported with the current settings</p>
                </div>
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
