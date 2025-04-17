
import { useState } from 'react';
import { toast } from 'sonner';
import { ExportFormat, Book } from '@/lib/api/types';

export const useExport = () => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (book: Book) => {
    setIsExporting(true);
    toast.loading(`Creating your ${selectedFormat.toUpperCase()} file...`);
    
    // Import the exportBook function
    import('@/lib/pdf/pdfExporter').then(({ exportBook }) => {
      // Create a Book object with all required properties
      const bookData: Book = {
        id: book.id || 'temp-id',
        title: book.title,
        author: book.author || '',
        content: book.chapters?.map(ch => ch.content) || [],
        description: book.description || '',
        coverImage: book.coverImage || '',
        coverPage: book.coverPage,
        creditsPage: book.creditsPage,
        chapters: book.chapters?.map((ch, idx) => ({
          id: ch.id || `chapter-${idx}`,
          title: ch.title,
          content: ch.content,
          order: idx
        })) || [],
        genre: book.genre || '',
        published: book.published || false,
        createdAt: book.createdAt || new Date().toISOString(),
        updatedAt: book.updatedAt || new Date().toISOString()
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
            
            element.download = `${book.title || 'untitled-book'}.${selectedFormat}`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          } else {
            // For other formats without direct content, simulate download
            const element = document.createElement('a');
            element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent('Your book content would be here.'));
            element.setAttribute('download', `${book.title || 'untitled-book'}.${selectedFormat}`);
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

  return {
    selectedFormat,
    setSelectedFormat,
    isExporting,
    handleExport
  };
};
