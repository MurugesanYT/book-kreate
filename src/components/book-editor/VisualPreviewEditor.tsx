
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Eye, Edit } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Book, ExportFormat } from '@/lib/api/types';
import { PDFExportOptions } from '@/lib/api/types';
import PDFExportFormatPreview from '@/components/PDFExportFormatPreview';
import { toast } from 'sonner';

interface VisualPreviewEditorProps {
  format: ExportFormat;
  book: Book;
  content?: string;
  options?: any;
  onContentChange?: (content: string) => void;
  onOptionsChange?: (options: any) => void;
}

const VisualPreviewEditor: React.FC<VisualPreviewEditorProps> = ({
  format,
  book,
  content,
  options,
  onContentChange,
  onOptionsChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(content || '');
  const [activeView, setActiveView] = useState<'preview' | 'code'>('preview');
  
  useEffect(() => {
    if (content !== undefined) {
      setEditableContent(content);
    }
  }, [content]);
  
  // Sample book content for preview
  const previewBook = {
    title: book.title || 'Book Title',
    author: book.author || 'Author Name',
    chapter: book.chapters && book.chapters.length > 0 
      ? book.chapters[0].title 
      : 'Chapter Title',
    content: book.chapters && book.chapters.length > 0 
      ? book.chapters[0].content.substring(0, 500) + '...' 
      : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  };

  // Default PDF options if none provided
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

  const handleContentSave = () => {
    if (onContentChange) {
      onContentChange(editableContent);
      setIsEditing(false);
      toast.success("Content updated successfully!");
    }
  };
  
  const openPreviewInNewTab = () => {
    // Create a new window with a full preview of the book
    const previewWindow = window.open('', '_blank');
    if (!previewWindow) {
      toast.error("Pop-up blocked. Please allow pop-ups to view the preview.");
      return;
    }
    
    // Customize the preview based on format
    let htmlContent = '';
    
    switch (format) {
      case 'pdf':
        htmlContent = generatePDFPreviewHTML(book, options || defaultPdfOptions);
        break;
      case 'epub':
      case 'mobi':
      case 'azw3':
        htmlContent = generateEbookPreviewHTML(book, format);
        break;
      case 'html':
        htmlContent = generateHTMLPreviewHTML(book);
        break;
      case 'markdown':
      case 'txt':
        htmlContent = generatePlainTextPreviewHTML(book, format);
        break;
      default:
        htmlContent = generateGenericPreviewHTML(book, format);
    }
    
    previewWindow.document.write(htmlContent);
    previewWindow.document.close();
    previewWindow.document.title = `${book.title || 'Book'} - ${format.toUpperCase()} Preview`;
  };
  
  const generatePDFPreviewHTML = (book: Book, pdfOptions: PDFExportOptions): string => {
    const fontFamily = pdfOptions.fontFamily || 'Georgia, serif';
    const fontSize = pdfOptions.fontSize || 12;
    const lineHeight = pdfOptions.lineSpacing === 'relaxed' ? '1.8' : 
                      pdfOptions.lineSpacing === 'compact' ? '1.2' : '1.5';
    const textAlign = pdfOptions.textAlignment === 'justified' ? 'justify' : pdfOptions.textAlignment;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${book.title || 'Book Preview'} - PDF</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap');
          
          body {
            font-family: ${fontFamily};
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
            background-color: ${pdfOptions.paperTextureEffect ? '#f9f7f1' : '#ffffff'};
            ${pdfOptions.paperTextureEffect ? 
              `background-image: url("data:image/png;base64,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");` 
              : ''}
          }
          .title-page {
            text-align: center;
            padding: 60px 0;
          }
          .title-page h1 {
            font-size: 32px;
            margin-bottom: 16px;
          }
          .title-page .author {
            font-size: 20px;
            margin-bottom: 40px;
            font-style: italic;
          }
          .chapter {
            margin-top: 40px;
            page-break-before: always;
          }
          .chapter-title {
            font-size: 24px;
            margin-bottom: 20px;
            ${pdfOptions.chapterDividers ? 'border-bottom: 1px solid #ddd; padding-bottom: 10px;' : ''}
            text-align: ${textAlign};
          }
          .content {
            text-align: ${textAlign};
          }
          p {
            margin-bottom: 16px;
          }
          .drop-cap:first-letter {
            float: left;
            font-size: 60px;
            line-height: 1;
            font-weight: bold;
            margin-right: 8px;
          }
          .page-footer {
            text-align: center;
            margin-top: 40px;
            font-size: 12px;
            color: #666;
          }
          ${pdfOptions.showPageNumbers ? `
          .page-number:after {
            content: counter(page);
            position: absolute;
            bottom: 20px;
            right: 20px;
            font-size: 12px;
          }` : ''}
        </style>
      </head>
      <body>
        <div class="title-page">
          <h1>${book.title || 'Book Title'}</h1>
          <div class="author">by ${book.author || 'Author Name'}</div>
          ${pdfOptions.decorativeElements ? '<div style="width: 100px; height: 1px; background-color: #ccc; margin: 0 auto;"></div>' : ''}
        </div>
        
        ${book.tableOfContents ? `
        <div class="chapter">
          <h2 class="chapter-title">Table of Contents</h2>
          <div class="content">${book.tableOfContents.replace(/\n/g, '<br>')}</div>
        </div>` : ''}
        
        ${book.chapters ? 
          book.chapters.map((chapter, index) => `
            <div class="chapter">
              <h2 class="chapter-title">Chapter ${index + 1}: ${chapter.title}</h2>
              <div class="content ${pdfOptions.dropCaps ? 'drop-cap' : ''}">
                ${chapter.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}
              </div>
            </div>
          `).join('') : ''
        }
        
        ${book.characterList ? `
        <div class="chapter">
          <h2 class="chapter-title">Characters</h2>
          <div class="content">${book.characterList.replace(/\n/g, '<br>')}</div>
        </div>` : ''}
        
        <div class="page-footer">
          ${pdfOptions.headerFooter ? `${book.title} - ${book.author || 'Author'}` : ''}
          <div class="page-number"></div>
        </div>
      </body>
      </html>
    `;
  };
  
  const generateEbookPreviewHTML = (book: Book, format: ExportFormat): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${book.title || 'Book Preview'} - ${format.toUpperCase()}</title>
        <style>
          body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f8f8;
            color: #333;
          }
          .ebook-container {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            padding: 40px;
            margin-bottom: 40px;
          }
          .ebook-info {
            background-color: #f0f0f0;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 40px;
          }
          .format-name {
            text-transform: uppercase;
            color: #666;
            font-size: 14px;
          }
          .title-page {
            text-align: center;
            padding: 20px 0 40px;
          }
          h1 {
            margin-top: 0;
          }
          .toc {
            margin-bottom: 30px;
          }
          .chapter {
            margin-top: 30px;
            border-top: 1px solid #eee;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="ebook-info">
          <h2>${format.toUpperCase()} E-Book Preview</h2>
          <p>This is a preview of how your book would appear in ${format.toUpperCase()} format.</p>
          <p class="format-name">Format: ${format.toUpperCase()}</p>
        </div>
        
        <div class="ebook-container">
          <div class="title-page">
            <h1>${book.title || 'Book Title'}</h1>
            <p>by ${book.author || 'Author Name'}</p>
          </div>
          
          ${book.tableOfContents ? `
          <div class="toc">
            <h2>Table of Contents</h2>
            ${book.tableOfContents.replace(/\n/g, '<br>')}
          </div>` : ''}
          
          ${book.chapters ? 
            book.chapters.map((chapter, index) => `
              <div class="chapter">
                <h2>Chapter ${index + 1}: ${chapter.title}</h2>
                <div>
                  ${chapter.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}
                </div>
              </div>
            `).join('') : ''
          }
          
          ${book.characterList ? `
          <div class="chapter">
            <h2>Characters</h2>
            ${book.characterList.replace(/\n/g, '<br>')}
          </div>` : ''}
        </div>
      </body>
      </html>
    `;
  };
  
  const generateHTMLPreviewHTML = (book: Book): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${book.title || 'Book Preview'} - HTML</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .html-preview {
            border: 1px solid #ddd;
            padding: 20px;
            margin-bottom: 20px;
            background-color: #f9f9f9;
          }
          pre {
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
          }
          code {
            font-family: Consolas, Monaco, "Courier New", monospace;
            font-size: 14px;
            color: #333;
          }
          .preview-title {
            font-weight: bold;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h1>HTML Export Preview: ${book.title || 'Book Title'}</h1>
        <p>This is a preview of how your book would be exported to HTML format:</p>
        
        <div class="html-preview">
          <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;${book.title || 'Book Title'}&lt;/title&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="author" content="${book.author || 'Author'}"&gt;
  &lt;style&gt;
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 { text-align: center; }
    .author { text-align: center; font-style: italic; margin-bottom: 40px; }
    .chapter { margin-top: 30px; }
    .chapter-title { border-bottom: 1px solid #eee; padding-bottom: 10px; }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;${book.title || 'Book Title'}&lt;/h1&gt;
  &lt;div class="author"&gt;by ${book.author || 'Author'}&lt;/div&gt;
  
  ${book.tableOfContents ? `&lt;div class="toc"&gt;
    &lt;h2&gt;Table of Contents&lt;/h2&gt;
    ${book.tableOfContents.split('\n').map(line => `    ${line}`).join('\n')}
  &lt;/div&gt;` : ''}
  
  ${book.chapters && book.chapters.length > 0 ? 
    book.chapters.map((chapter, index) => 
      `  &lt;div class="chapter"&gt;
    &lt;h2 class="chapter-title"&gt;Chapter ${index + 1}: ${chapter.title}&lt;/h2&gt;
    &lt;div class="chapter-content"&gt;
      ${chapter.content.split('\n\n').map(p => `      &lt;p&gt;${p}&lt;/p&gt;`).join('\n')}
    &lt;/div&gt;
  &lt;/div&gt;`
    ).join('\n\n') : '  &lt;!-- No chapters available --&gt;'
  }
  
  ${book.characterList ? `&lt;div class="characters"&gt;
    &lt;h2&gt;Characters&lt;/h2&gt;
    ${book.characterList.split('\n').map(line => `    ${line}`).join('\n')}
  &lt;/div&gt;` : ''}
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
        
        <h2>HTML Preview:</h2>
        <div style="border: 1px solid #ddd; padding: 20px; margin-top: 20px;">
          <h1 style="text-align: center;">${book.title || 'Book Title'}</h1>
          <div style="text-align: center; font-style: italic; margin-bottom: 40px;">by ${book.author || 'Author'}</div>
          
          ${book.tableOfContents ? `
          <div>
            <h2>Table of Contents</h2>
            ${book.tableOfContents.replace(/\n/g, '<br>')}
          </div>` : ''}
          
          ${book.chapters && book.chapters.length > 0 ? 
            book.chapters.map((chapter, index) => `
              <div style="margin-top: 30px;">
                <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Chapter ${index + 1}: ${chapter.title}</h2>
                <div>
                  ${chapter.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}
                </div>
              </div>
            `).join('') : '<p>No chapters available</p>'
          }
          
          ${book.characterList ? `
          <div style="margin-top: 30px;">
            <h2>Characters</h2>
            ${book.characterList.replace(/\n/g, '<br>')}
          </div>` : ''}
        </div>
      </body>
      </html>
    `;
  };
  
  const generatePlainTextPreviewHTML = (book: Book, format: ExportFormat): string => {
    // Create a representation of plain text formats
    const isMarkdown = format === 'markdown';
    
    // Generate the plain text content
    let plainContent = '';
    
    if (isMarkdown) {
      // Markdown format
      plainContent += `# ${book.title || 'Book Title'}\n\n`;
      plainContent += `*By ${book.author || 'Author'}*\n\n`;
      
      if (book.tableOfContents) {
        plainContent += `## Table of Contents\n\n${book.tableOfContents}\n\n`;
      }
      
      if (book.chapters && book.chapters.length > 0) {
        book.chapters.forEach((chapter, index) => {
          plainContent += `## Chapter ${index + 1}: ${chapter.title}\n\n`;
          plainContent += `${chapter.content}\n\n`;
        });
      }
      
      if (book.characterList) {
        plainContent += `## Characters\n\n${book.characterList}\n\n`;
      }
    } else {
      // Plain text format
      plainContent += `${book.title || 'Book Title'}\n`;
      plainContent += `By ${book.author || 'Author'}\n\n`;
      
      if (book.tableOfContents) {
        plainContent += `TABLE OF CONTENTS\n\n${book.tableOfContents}\n\n`;
      }
      
      if (book.chapters && book.chapters.length > 0) {
        book.chapters.forEach((chapter, index) => {
          plainContent += `CHAPTER ${index + 1}: ${chapter.title}\n\n`;
          plainContent += `${chapter.content}\n\n`;
        });
      }
      
      if (book.characterList) {
        plainContent += `CHARACTERS\n\n${book.characterList}\n\n`;
      }
    }
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${book.title || 'Book Preview'} - ${format.toUpperCase()}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          pre {
            background-color: #f5f5f5;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            white-space: pre-wrap;
            font-family: Consolas, Monaco, 'Courier New', monospace;
            font-size: 14px;
            overflow-x: auto;
          }
          h1 { margin-bottom: 30px; }
          .format-label {
            display: inline-block;
            background-color: #eee;
            padding: 3px 8px;
            border-radius: 4px;
            margin-bottom: 20px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <h1>${format.toUpperCase()} Preview: ${book.title || 'Book Title'}</h1>
        <div class="format-label">${format.toUpperCase()} Format</div>
        <pre>${plainContent}</pre>
      </body>
      </html>
    `;
  };
  
  const generateGenericPreviewHTML = (book: Book, format: ExportFormat): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${book.title || 'Book Preview'} - ${format.toUpperCase()}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .preview-container {
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 30px;
            margin-top: 20px;
          }
          .format-badge {
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <h1>${format.toUpperCase()} Export Preview</h1>
        <p>This is a preview of how your book would appear when exported to ${format.toUpperCase()} format.</p>
        
        <div class="preview-container">
          <div class="format-badge">${format.toUpperCase()}</div>
          
          <h1>${book.title || 'Book Title'}</h1>
          <p><em>By ${book.author || 'Author'}</em></p>
          
          <hr />
          
          ${book.tableOfContents ? `
          <h2>Table of Contents</h2>
          <div>${book.tableOfContents.replace(/\n/g, '<br>')}</div>
          <hr />` : ''}
          
          ${book.chapters && book.chapters.length > 0 ? 
            book.chapters.map((chapter, index) => `
              <div>
                <h2>Chapter ${index + 1}: ${chapter.title}</h2>
                <div>
                  ${chapter.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}
                </div>
              </div>
            `).join('<hr />') : '<p>No chapters available</p>'
          }
          
          ${book.characterList ? `
          <hr />
          <h2>Characters</h2>
          <div>${book.characterList.replace(/\n/g, '<br>')}</div>` : ''}
        </div>
      </body>
      </html>
    `;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'preview' | 'code')}>
          <TabsList>
            <TabsTrigger value="preview"><Eye className="h-4 w-4 mr-2" />Preview</TabsTrigger>
            <TabsTrigger value="code"><Edit className="h-4 w-4 mr-2" />Edit</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={openPreviewInNewTab}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview in new tab
          </Button>
          
          {isEditing && (
            <Button 
              size="sm" 
              onClick={handleContentSave}
            >
              Save Changes
            </Button>
          )}
          
          {!isEditing && activeView === 'code' && onContentChange && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(true)}
            >
              Edit Content
            </Button>
          )}
        </div>
      </div>

      <TabsContent value="preview" className="mt-0">
        <Card>
          <CardContent className="p-6">
            {format === 'pdf' && (
              <PDFExportFormatPreview 
                pdfOptions={options || defaultPdfOptions} 
                previewBook={previewBook}
              />
            )}
            
            {(format === 'epub' || format === 'mobi' || format === 'azw3') && (
              <div className="aspect-[3/4] bg-white border rounded-md p-4 flex flex-col">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold">{previewBook.title}</h1>
                  <p className="text-sm text-gray-500 mt-2">by {previewBook.author}</p>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Format: {format.toUpperCase()}</p>
                  <p className="font-semibold mt-4">Chapter Preview:</p>
                  <p className="mt-2">{previewBook.content}</p>
                </div>
              </div>
            )}
            
            {format === 'html' && (
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
            )}
            
            {(format === 'txt' || format === 'markdown') && (
              <div className="bg-gray-50 border rounded-md p-4 font-mono text-sm whitespace-pre-wrap">
                {format === 'markdown' ? (
                  <>
                    # {previewBook.title}<br /><br />
                    *By {previewBook.author}*<br /><br />
                    ## {previewBook.chapter}<br /><br />
                    {previewBook.content}
                  </>
                ) : (
                  <>
                    {previewBook.title}<br />
                    By {previewBook.author}<br /><br />
                    CHAPTER: {previewBook.chapter}<br /><br />
                    {previewBook.content}
                  </>
                )}
              </div>
            )}
            
            {!['pdf', 'epub', 'mobi', 'azw3', 'html', 'txt', 'markdown'].includes(format) && (
              <div className="text-center p-4">
                <p>Preview not available for {format.toUpperCase()} format</p>
                <p className="text-sm text-gray-500 mt-2">You can still export to this format.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="code" className="mt-0">
        <Card>
          <CardContent className="p-6">
            {isEditing ? (
              <Textarea 
                value={editableContent} 
                onChange={(e) => setEditableContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
                placeholder={`Enter ${format.toUpperCase()} content here...`}
              />
            ) : (
              <pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[400px] text-sm">
                {editableContent || content || `No content available for ${format.toUpperCase()} format.`}
              </pre>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default VisualPreviewEditor;
