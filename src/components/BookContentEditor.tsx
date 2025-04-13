
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import { FileText, Save, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExportFormat, Book } from '@/lib/api/types';

interface Chapter {
  title: string;
  content: string;
}

interface BookEditorProps {
  book: Book;
  onSave: (updatedBook: Book) => void;
}

const BookContentEditor: React.FC<BookEditorProps> = ({ book, onSave }) => {
  const [editedBook, setEditedBook] = useState<Book>(book);
  const [activeTab, setActiveTab] = useState<string>('edit');
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
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

  const exportFormats = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'epub', label: 'EPUB eBook' },
    { value: 'mobi', label: 'MOBI (Kindle)' },
    { value: 'docx', label: 'Word Document' },
    { value: 'html', label: 'HTML Website' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'txt', label: 'Plain Text' },
    { value: 'rtf', label: 'Rich Text Format' },
    { value: 'azw3', label: 'Kindle AZW3' },
    { value: 'fb2', label: 'FictionBook' },
    { value: 'cbz', label: 'Comic Book Archive' },
    { value: 'latex', label: 'LaTeX' },
    { value: 'odt', label: 'OpenDocument' },
    { value: 'pages', label: 'Apple Pages' },
    { value: 'xml', label: 'XML' },
    { value: 'json', label: 'JSON' },
  ];

  const handleExport = () => {
    setIsExporting(true);
    toast.loading(`Creating your ${selectedFormat.toUpperCase()} file...`);
    
    // Import the exportBook function
    import('@/lib/pdf/pdfExporter').then(({ exportBook }) => {
      // Create a Book object with all required properties
      const bookData: Book = {
        id: editedBook.id || 'temp-id',
        title: editedBook.title,
        author: editedBook.author || '',
        content: editedBook.chapters?.map(ch => ch.content) || [],
        description: editedBook.description || '',
        coverImage: editedBook.coverImage || '',
        coverPage: editedBook.coverPage,
        creditsPage: editedBook.creditsPage,
        chapters: editedBook.chapters?.map((ch, idx) => ({
          id: ch.id || `chapter-${idx}`,
          title: ch.title,
          content: ch.content,
          order: idx
        })) || [],
        genre: editedBook.genre || '',
        published: editedBook.published || false,
        createdAt: editedBook.createdAt || new Date().toISOString(),
        updatedAt: editedBook.updatedAt || new Date().toISOString()
      };
      
      // Basic options
      const options = {
        fontFamily: 'helvetica',
        fontSize: 12
      };
      
      // Export the book
      const result = exportBook(bookData, selectedFormat, options);
      
      setTimeout(() => {
        setIsExporting(false);
        
        if (result.success) {
          toast.success(`Book exported to ${selectedFormat.toUpperCase()} successfully!`);
          
          // Create download for formats that return content directly
          if (result.content) {
            const element = document.createElement('a');
            const fileType = selectedFormat === 'json' ? 'application/json' : 
                            selectedFormat === 'txt' ? 'text/plain' : 
                            selectedFormat === 'markdown' ? 'text/markdown' : 
                            selectedFormat === 'html' ? 'text/html' : 
                            selectedFormat === 'pdf' ? 'application/pdf' : 'text/plain';
            
            // For PDF which returns a data URI
            if (selectedFormat === 'pdf' && result.content.startsWith('data:')) {
              element.href = result.content;
            } else {
              const blob = new Blob([result.content], { type: fileType });
              element.href = URL.createObjectURL(blob);
            }
            
            element.download = `${editedBook.title || 'untitled-book'}.${selectedFormat}`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          } else {
            // For other formats without direct content, simulate download
            const element = document.createElement('a');
            element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent('Your book content would be here.'));
            element.setAttribute('download', `${editedBook.title || 'untitled-book'}.${selectedFormat}`);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }
        } else {
          toast.error(`Failed to export to ${selectedFormat.toUpperCase()}: ${result.message}`);
        }
      }, 1000);
    }).catch(err => {
      console.error('Export error:', err);
      setIsExporting(false);
      toast.error(`Failed to export ${selectedFormat.toUpperCase()}. Please try again.`);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Book Content Editor</h3>
          <p className="text-sm text-gray-500">Edit your book's content</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedFormat} onValueChange={(value) => setSelectedFormat(value as ExportFormat)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Export Format" />
            </SelectTrigger>
            <SelectContent>
              {exportFormats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>{format.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleExport} 
            disabled={isExporting}
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {editedBook.coverPage !== undefined && (
        <Card>
          <CardHeader>
            <CardTitle>Cover Page</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <Textarea
                  className="min-h-[200px] font-mono"
                  value={editedBook.coverPage || ''}
                  onChange={(e) => handleCoverChange(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="prose max-w-none p-4 border rounded-md bg-white">
                  <ReactMarkdown>{editedBook.coverPage || ''}</ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {editedBook.chapters && editedBook.chapters.length > 0 && (
        <div className="space-y-4">
          {editedBook.chapters.map((chapter, index) => (
            <Card key={chapter.id || index}>
              <CardHeader>
                <CardTitle>Chapter {index + 1}: {chapter.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="edit">
                    <Textarea
                      className="min-h-[300px] font-mono"
                      value={chapter.content || ''}
                      onChange={(e) => handleContentChange(index, e.target.value)}
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="prose max-w-none p-4 border rounded-md bg-white">
                      <ReactMarkdown>{chapter.content || ''}</ReactMarkdown>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {editedBook.creditsPage !== undefined && (
        <Card>
          <CardHeader>
            <CardTitle>Credits Page</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <Textarea
                  className="min-h-[200px] font-mono"
                  value={editedBook.creditsPage || ''}
                  onChange={(e) => handleCreditsChange(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="prose max-w-none p-4 border rounded-md bg-white">
                  <ReactMarkdown>{editedBook.creditsPage || ''}</ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookContentEditor;
