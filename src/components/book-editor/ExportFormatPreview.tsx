
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExportFormat, PDFExportOptions, EPUBExportOptions } from '@/lib/api/types';
import PDFExportFormatPreview from '@/components/PDFExportFormatPreview';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit } from 'lucide-react';

interface ExportFormatPreviewProps {
  format: ExportFormat;
  book: any;
  options?: any;
}

const ExportFormatPreview: React.FC<ExportFormatPreviewProps> = ({ format, book, options }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Sample content for preview
  const previewBook = {
    title: book.title || 'Book Title',
    author: book.author || 'Author Name',
    chapter: book.chapters && book.chapters.length > 0 
      ? book.chapters[0].title 
      : 'Chapter Title',
    content: book.chapters && book.chapters.length > 0 
      ? book.chapters[0].content.substring(0, 500) + '...' 
      : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  };

  // Default PDF options
  const defaultPdfOptions: PDFExportOptions = {
    showPageNumbers: true,
    includeMargins: true,
    headerFooter: true,
    coverPage: true,
    colorScheme: "default",
    pageSize: "a4",
    orientation: "portrait",
    decorativeElements: true,
    chapterDividers: true,
    dropCaps: false,
    textAlignment: "left",
    lineSpacing: "normal",
    pageMargins: "normal",
    paperTextureEffect: true,
    fontFamily: 'Georgia',
    fontSize: 12
  };
  
  // Default EPUB options
  const defaultEpubOptions: EPUBExportOptions = {
    includeTableOfContents: true,
    coverImage: true,
    metadata: {
      author: book.author || 'Unknown',
      language: 'en',
    },
    styling: {
      fontFamily: 'serif',
      fontSize: '1em',
      lineHeight: '1.5',
      textAlign: 'left',
    },
    fontFamily: 'serif',
    fontSize: 12
  };
  
  const openPreviewInNewTab = () => {
    // Create a new window with a simple HTML representation of the book
    const previewWindow = window.open('', '_blank');
    if (!previewWindow) return;
    
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${book.title || 'Book Preview'}</title>
        <style>
          body { font-family: ${format === 'pdf' ? 'Georgia' : 'serif'}; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
          h1 { text-align: center; margin-bottom: 1em; }
          .chapter { margin-top: 2em; }
          .chapter-title { margin-bottom: 1em; }
          .author { text-align: center; font-style: italic; margin-bottom: 2em; }
          .toc { margin: 2em 0; }
          .toc-item { margin: 0.5em 0; }
        </style>
      </head>
      <body>
        <h1>${book.title || 'Book Title'}</h1>
        <div class="author">by ${book.author || 'Author'}</div>
        
        ${book.tableOfContents ? `<div class="toc"><h2>Table of Contents</h2>${book.tableOfContents.replace(/\n/g, '<br>')}</div>` : ''}
        
        ${book.chapters && book.chapters.map((chapter: any, index: number) => `
          <div class="chapter">
            <h2 class="chapter-title">Chapter ${index + 1}: ${chapter.title}</h2>
            <div class="chapter-content">${chapter.content.replace(/\n/g, '<br>')}</div>
          </div>
        `).join('')}
        
        ${book.characterList ? `<div class="characters"><h2>Characters</h2>${book.characterList.replace(/\n/g, '<br>')}</div>` : ''}
      </body>
      </html>
    `;
    
    previewWindow.document.write(htmlContent);
    previewWindow.document.close();
  };
  
  const renderPreview = () => {
    switch (format) {
      case 'pdf':
        return (
          <PDFExportFormatPreview 
            pdfOptions={options || defaultPdfOptions} 
            previewBook={previewBook}
          />
        );
      case 'epub':
      case 'mobi':
      case 'azw3':
        return (
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="aspect-[3/4] bg-white border rounded-md p-4 flex flex-col">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold">{previewBook.title}</h1>
                  <p className="text-sm text-gray-500 mt-2">by {previewBook.author}</p>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Chapter Preview:</p>
                  <p className="mt-2">{previewBook.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'html':
        return (
          <Card>
            <CardContent className="p-6">
              <div className="bg-white border rounded-md p-4">
                <div className="font-mono text-xs text-gray-600 mb-4">&lt;html&gt;</div>
                <div className="font-mono text-xs text-gray-600 ml-4 mb-2">&lt;head&gt;...&lt;/head&gt;</div>
                <div className="font-mono text-xs text-gray-600 ml-4 mb-2">&lt;body&gt;</div>
                <div className="ml-8 mb-4">
                  <div className="font-mono text-xs text-gray-600">&lt;h1&gt;{previewBook.title}&lt;/h1&gt;</div>
                  <div className="font-mono text-xs text-gray-600">&lt;p&gt;by {previewBook.author}&lt;/p&gt;</div>
                  <div className="font-mono text-xs text-gray-600">&lt;div class="chapter"&gt;</div>
                  <div className="font-mono text-xs text-gray-600 ml-4">&lt;h2&gt;{previewBook.chapter}&lt;/h2&gt;</div>
                  <div className="font-mono text-xs text-gray-600 ml-4">&lt;p&gt;{previewBook.content.substring(0, 100)}...&lt;/p&gt;</div>
                  <div className="font-mono text-xs text-gray-600">&lt;/div&gt;</div>
                </div>
                <div className="font-mono text-xs text-gray-600 ml-4">&lt;/body&gt;</div>
                <div className="font-mono text-xs text-gray-600">&lt;/html&gt;</div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card>
            <CardContent className="p-6 text-center">
              <p>Preview not available for {format.toUpperCase()} format</p>
              <p className="text-sm text-gray-500 mt-2">You can still export to this format.</p>
            </CardContent>
          </Card>
        );
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Format Preview: {format.toUpperCase()}</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={openPreviewInNewTab}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview in new tab
          </Button>
        </div>
      </div>
      
      {renderPreview()}
    </div>
  );
};

export default ExportFormatPreview;
