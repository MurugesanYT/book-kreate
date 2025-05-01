import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExportFormat } from '@/lib/api/types';

interface VisualPreviewEditorProps {
  format: ExportFormat;
  book: any;
  options?: any;
  content?: string;
  onContentChange?: (content: string) => void;
  onOptionsChange?: (options: any) => void;
  previewInNewTab?: boolean;
}

const VisualPreviewEditor: React.FC<VisualPreviewEditorProps> = ({ 
  format, 
  book, 
  options, 
  content,
  onContentChange,
  onOptionsChange,
  previewInNewTab = false
}) => {
  const [previewContent, setPreviewContent] = useState<string>('');
  const [previewWindow, setPreviewWindow] = useState<Window | null>(null);

  // Generate preview content based on format and options
  useEffect(() => {
    const generatePreview = () => {
      let preview = '';
      
      switch (format) {
        case 'pdf':
          preview = generatePDFPreview(book, options);
          break;
        case 'epub':
        case 'mobi':
        case 'azw3':
          preview = generateEbookPreview(book, options);
          break;
        case 'html':
          preview = generateHTMLPreview(book, options);
          break;
        case 'docx':
          preview = generateDocxPreview(book, options);
          break;
        case 'markdown':
          preview = generateMarkdownPreview(book, options);
          break;
        case 'txt':
          preview = generateTxtPreview(book, options);
          break;
        case 'rtf':
          preview = generateRichTextPreview(book, options);
          break;
        case 'latex':
          preview = generateLaTeXPreview(book, options);
          break;
        case 'odt':
          preview = generateODTPreview(book, options);
          break;
        case 'pages':
          preview = generatePagesPreview(book, options);
          break;
        case 'fb2':
          preview = generateFB2Preview(book, options);
          break;
        case 'cbz':
          preview = generateCBZPreview(book, options);
          break;
        default:
          preview = `<div class="p-6">
            <h2 class="text-xl font-bold mb-2">${book.title}</h2>
            <p class="text-gray-600">By ${book.author || 'Unknown'}</p>
            <div class="mt-4">Preview not available for ${format} format</div>
          </div>`;
      }
      
      setPreviewContent(preview);
      
      // Send content to preview window if it exists
      if (previewInNewTab && previewWindow && !previewWindow.closed) {
        previewWindow.postMessage(preview, '*');
      }
    };
    
    generatePreview();
  }, [format, book, options, previewInNewTab, previewWindow]);
  
  // Listen for messages from preview window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'ready' && previewInNewTab) {
        // Store the reference to the window that sent the message
        setPreviewWindow(event.source as Window);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [previewInNewTab]);
  
  // Generate PDF preview
  const generatePDFPreview = (book: any, options?: any) => {
    const fontFamily = options?.fontFamily || 'Georgia';
    const fontSize = options?.fontSize || 12;
    const textAlignment = options?.textAlignment || 'left';
    const lineSpacing = convertLineSpacing(options?.lineSpacing || 'normal');
    const colorScheme = options?.colorScheme || 'default';
    const showPageNumbers = options?.showPageNumbers !== false;
    const dropCaps = options?.dropCaps || false;
    const decorativeElements = options?.decorativeElements !== false;
    
    // Apply color scheme
    let bgColor = '#fff';
    let textColor = '#000';
    let borderColor = '#eee';
    
    switch (colorScheme) {
      case 'sepia':
        bgColor = '#f7f2e9';
        textColor = '#5a4a39';
        borderColor = '#e0d6c7';
        break;
      case 'night':
        bgColor = '#1a1a1a';
        textColor = '#e6e6e6';
        borderColor = '#333';
        break;
      case 'contrast':
        bgColor = '#fff';
        textColor = '#000';
        borderColor = '#000';
        break;
      case 'classic':
        bgColor = '#fbfbf8';
        textColor = '#333333';
        borderColor = '#d1d1c2';
        break;
      case 'modern':
        bgColor = '#ffffff';
        textColor = '#202124';
        borderColor = '#e0e0e0';
        break;
    }
    
    let preview = `
      <div style="font-family: ${fontFamily}; font-size: ${fontSize}px; text-align: ${textAlignment}; line-height: ${lineSpacing}; background-color: ${bgColor}; color: ${textColor}; padding: 40px 50px; min-height: 1056px; max-width: 816px; margin: 0 auto; position: relative; border: 1px solid ${borderColor}; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">`;
    
    // Add header if enabled
    if (options?.headerFooter) {
      preview += `
        <div style="position: absolute; top: 20px; left: 0; right: 0; text-align: center; font-size: ${fontSize * 0.8}px; color: ${textColor}; opacity: 0.7;">
          ${book.title}
        </div>`;
    }
    
    // Add page number if enabled
    if (showPageNumbers) {
      preview += `
        <div style="position: absolute; bottom: 20px; left: 0; right: 0; text-align: center; font-size: ${fontSize * 0.8}px; color: ${textColor}; opacity: 0.7;">
          1
        </div>`;
    }
    
    // Add title
    preview += `
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: ${fontSize * 2}px; margin-bottom: 10px;">${book.title}</h1>
        <p style="font-size: ${fontSize * 1.2}px;">By ${book.author || 'Unknown'}</p>
      </div>`;
    
    // Add chapter sample
    if (book.chapters && book.chapters.length > 0) {
      const chapter = book.chapters[0];
      
      // Add decorative element before chapter if enabled
      if (decorativeElements) {
        preview += `
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="display: inline-block; width: 150px; height: 1px; background-color: ${textColor}; opacity: 0.5;"></div>
            <div style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${textColor}; margin: 0 10px; vertical-align: middle; opacity: 0.5;"></div>
            <div style="display: inline-block; width: 150px; height: 1px; background-color: ${textColor}; opacity: 0.5;"></div>
          </div>`;
      }
      
      preview += `
        <h2 style="font-size: ${fontSize * 1.5}px; margin-bottom: 20px; text-align: center;">${chapter.title}</h2>`;
      
      // Process chapter content
      const paragraphs = chapter.content.split('\n\n');
      if (paragraphs.length > 0) {
        // Apply drop caps to first paragraph if enabled
        if (dropCaps && paragraphs[0].length > 0) {
          const firstChar = paragraphs[0].charAt(0);
          const restOfParagraph = paragraphs[0].substring(1);
          
          preview += `
            <p style="margin-bottom: 20px; text-indent: 20px;">
              <span style="float: left; font-size: ${fontSize * 3}px; line-height: 0.8; margin-right: 5px;">${firstChar}</span>${restOfParagraph}
            </p>`;
          
          // Add the rest of the paragraphs
          for (let i = 1; i < Math.min(paragraphs.length, 5); i++) {
            preview += `
              <p style="margin-bottom: 20px; text-indent: 20px;">${paragraphs[i]}</p>`;
          }
        } else {
          // No drop caps, add all paragraphs normally
          for (let i = 0; i < Math.min(paragraphs.length, 5); i++) {
            preview += `
              <p style="margin-bottom: 20px; text-indent: 20px;">${paragraphs[i]}</p>`;
          }
        }
      }
    } else {
      // No chapters, show placeholder text
      preview += `
        <p style="margin-bottom: 20px; text-indent: 20px; font-style: italic;">
          This is a preview of how your book will look when exported to PDF. 
          The actual PDF will contain all your chapters and content.
        </p>`;
    }
    
    // Close the container
    preview += '</div>';
    
    return preview;
  };
  
  // Generate E-book preview (EPUB, MOBI, AZW3)
  const generateEbookPreview = (book: any, options?: any) => {
    const fontFamily = options?.fontFamily || 'serif';
    const fontSize = options?.fontSize || 12;
    const textAlign = options?.styling?.textAlign || 'left';
    const lineHeight = options?.styling?.lineHeight || '1.5';
    const includeTableOfContents = options?.includeTableOfContents !== false;
    
    let preview = `
      <div style="font-family: ${fontFamily}; font-size: ${fontSize}px; text-align: ${textAlign}; line-height: ${lineHeight}; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border: 1px solid #eee; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
          <h1 style="font-size: ${fontSize * 1.5}px; margin-bottom: 10px;">${book.title}</h1>
          <p style="font-size: ${fontSize}px; color: #666;">By ${book.author || 'Unknown'}</p>
        </div>`;
    
    // Table of Contents
    if (includeTableOfContents && book.chapters && book.chapters.length > 0) {
      preview += `
        <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
          <h2 style="font-size: ${fontSize * 1.2}px; margin-bottom: 15px;">Table of Contents</h2>
          <ul style="list-style-type: none; padding: 0;">`;
      
      book.chapters.forEach((chapter: any, index: number) => {
        preview += `
            <li style="margin-bottom: 8px;">
              <a href="#chapter-${index + 1}" style="color: #0066cc; text-decoration: none;">Chapter ${index + 1}: ${chapter.title}</a>
            </li>`;
      });
      
      preview += `
          </ul>
        </div>`;
    }
    
    // Sample chapter content
    if (book.chapters && book.chapters.length > 0) {
      const chapter = book.chapters[0];
      preview += `
        <div id="chapter-1">
          <h2 style="font-size: ${fontSize * 1.2}px; margin-bottom: 20px;">Chapter 1: ${chapter.title}</h2>`;
      
      const paragraphs = chapter.content.split('\n\n');
      for (let i = 0; i < Math.min(paragraphs.length, 5); i++) {
        preview += `
          <p style="margin-bottom: 15px;">${paragraphs[i]}</p>`;
      }
      
      preview += `
        </div>`;
    }
    
    // Device frame and indicators
    preview += `
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; display: flex; justify-content: space-between; color: #999; font-size: ${fontSize * 0.8}px;">
          <span>Location 1-254</span>
          <span>Page 1 of 328</span>
        </div>
      </div>`;
    
    return preview;
  };
  
  // Generate HTML preview
  const generateHTMLPreview = (book: any, options?: any) => {
    const fontFamily = options?.fontFamily || 'serif';
    const fontSize = options?.fontSize || 16;
    const theme = options?.theme || 'light';
    const layout = options?.layout || 'book';
    const includeTableOfContents = options?.includeTableOfContents !== false;
    const chapterNavigation = options?.chapterNavigation !== false;
    
    // Theme colors
    let bgColor = '#ffffff';
    let textColor = '#333333';
    let accentColor = '#0066cc';
    let borderColor = '#eee';
    
    switch (theme) {
      case 'dark':
        bgColor = '#1a1a1a';
        textColor = '#e6e6e6';
        accentColor = '#7ba9e0';
        borderColor = '#333';
        break;
      case 'sepia':
        bgColor = '#f7f2e9';
        textColor = '#5a4a39';
        accentColor = '#9b6c3a';
        borderColor = '#e0d6c7';
        break;
      case 'contrast':
        bgColor = '#ffffff';
        textColor = '#000000';
        accentColor = '#0000ff';
        borderColor = '#000000';
        break;
    }
    
    // Layout styles
    let maxWidth = '800px';
    let padding = '40px';
    let titleStyle = 'text-align: center; margin-bottom: 30px;';
    
    switch (layout) {
      case 'article':
        maxWidth = '700px';
        padding = '30px';
        titleStyle = 'text-align: left; margin-bottom: 20px;';
        break;
      case 'manuscript':
        maxWidth = '650px';
        padding = '50px';
        titleStyle = 'text-align: left; margin-bottom: 30px;';
        break;
      case 'blog':
        maxWidth = '800px';
        padding = '20px';
        titleStyle = 'text-align: left; margin-bottom: 15px;';
        break;
    }
    
    let preview = `
      <div style="font-family: ${fontFamily}; font-size: ${fontSize}px; line-height: 1.6; color: ${textColor}; background-color: ${bgColor}; max-width: ${maxWidth}; margin: 0 auto; padding: ${padding}; border: 1px solid ${borderColor};">
        <header style="${titleStyle}">
          <h1 style="margin-bottom: 10px; color: ${textColor};">${book.title}</h1>
          <p style="color: ${textColor}; opacity: 0.8;">By ${book.author || 'Unknown'}</p>
        </header>`;
    
    // Table of Contents
    if (includeTableOfContents && book.chapters && book.chapters.length > 0) {
      preview += `
        <nav style="margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid ${borderColor};">
          <h2 style="margin-bottom: 15px; font-size: ${fontSize * 1.2}px;">Contents</h2>
          <ul style="list-style-type: none; padding-left: 0;">`;
      
      book.chapters.forEach((chapter: any, index: number) => {
        preview += `
            <li style="margin-bottom: 8px;">
              <a href="#chapter-${index + 1}" style="color: ${accentColor}; text-decoration: none;">
                ${chapter.title}
              </a>
            </li>`;
      });
      
      preview += `
          </ul>
        </nav>`;
    }
    
    // Sample chapter content
    if (book.chapters && book.chapters.length > 0) {
      const chapter = book.chapters[0];
      
      preview += `
        <article id="chapter-1" style="margin-bottom: 40px;">
          <h2 style="font-size: ${fontSize * 1.4}px; margin-bottom: 20px; color: ${textColor};">${chapter.title}</h2>`;
      
      const paragraphs = chapter.content.split('\n\n');
      for (let i = 0; i < Math.min(paragraphs.length, 5); i++) {
        preview += `
          <p style="margin-bottom: 20px;">${paragraphs[i]}</p>`;
      }
      
      preview += `
        </article>`;
      
      // Chapter navigation
      if (chapterNavigation && book.chapters.length > 1) {
        preview += `
          <nav style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid ${borderColor};">
            <div></div>
            <a href="#chapter-2" style="color: ${accentColor}; text-decoration: none;">
              Next: Chapter 2 - ${book.chapters[1]?.title || 'Next Chapter'} →
            </a>
          </nav>`;
      }
    }
    
    // Close container
    preview += '</div>';
    
    return preview;
  };
  
  // Generate DOCX preview
  const generateDocxPreview = (book: any, options?: any) => {
    return `
      <div style="font-family: 'Times New Roman', serif; padding: 40px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 24px; margin-bottom: 10px;">${book.title}</h1>
          <p>By ${book.author || 'Unknown'}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 18px; margin-bottom: 15px;">Chapter 1: ${book.chapters?.[0]?.title || 'Introduction'}</h2>
          <p style="line-height: 1.6; margin-bottom: 15px;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to DOCX format.'}</p>
          <p style="line-height: 1.6;">The actual DOCX file will contain all of your book content, properly formatted according to your selected options.</p>
        </div>
        
        <div style="color: #777; font-size: 12px; margin-top: 40px; text-align: center;">
          Word document preview
        </div>
      </div>`;
  };
  
  // Generate Markdown preview
  const generateMarkdownPreview = (book: any, options?: any) => {
    return `
      <div style="font-family: monospace; white-space: pre-wrap; padding: 30px; background-color: #f7f7f7; border: 1px solid #ddd; max-width: 800px; margin: 0 auto; font-size: 14px; line-height: 1.5;">
        <pre style="margin: 0;"># ${book.title}

*By ${book.author || 'Unknown'}*

## ${book.chapters?.[0]?.title || 'Chapter 1'}

${book.chapters?.[0]?.content?.substring(0, 200) || 'This is a preview of how your book will look in Markdown format.'} ...

---

> Markdown preview - actual export will contain the full content of your book.
</pre>
      </div>`;
  };
  
  // Generate TXT preview
  const generateTxtPreview = (book: any, options?: any) => {
    return `
      <div style="font-family: monospace; white-space: pre-wrap; padding: 30px; background-color: #f7f7f7; border: 1px solid #ddd; max-width: 800px; margin: 0 auto; font-size: 14px; line-height: 1.5;">
        <pre style="margin: 0;">${book.title.toUpperCase()}
by ${book.author || 'Unknown'}

${book.chapters?.[0]?.title?.toUpperCase() || 'CHAPTER 1'}

${book.chapters?.[0]?.content?.substring(0, 200) || 'This is a preview of how your book will look in plain text format.'} ...

-----------------------------------------------
Plain text preview - actual export will contain the full content of your book.</pre>
      </div>`;
  };
  
  // Generate Rich Text preview
  const generateRichTextPreview = (book: any, options?: any) => {
    return `
      <div style="font-family: 'Times New Roman', serif; padding: 40px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 24px; margin-bottom: 5px;">${book.title}</h1>
          <p><em>By ${book.author || 'Unknown'}</em></p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 18px; margin-bottom: 15px;">${book.chapters?.[0]?.title || 'Chapter 1'}</h2>
          <p style="line-height: 1.5; margin-bottom: 15px; text-indent: 20px;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to RTF format.'}</p>
          <p style="line-height: 1.5; text-indent: 20px;">The actual RTF file will contain all of your book content, properly formatted with rich text.</p>
        </div>
        
        <div style="color: #777; font-size: 12px; margin-top: 40px; text-align: center; font-style: italic;">
          Rich Text Format preview
        </div>
      </div>`;
  };
  
  // Generate LaTeX preview
  const generateLaTeXPreview = (book: any, options?: any) => {
    return `
      <div style="font-family: 'Latin Modern Roman', serif; padding: 40px; background-color: #f9f9f9; border: 1px solid #ddd; max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 24px; margin-bottom: 10px; font-weight: normal;">${book.title}</h1>
          <p>By ${book.author || 'Unknown'}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 18px; margin-bottom: 20px; font-weight: normal;">Chapter 1: ${book.chapters?.[0]?.title || 'Introduction'}</h2>
          <p style="line-height: 1.6; margin-bottom: 15px; text-align: justify;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to LaTeX format.'}</p>
          <p style="line-height: 1.6; text-align: justify;">The actual LaTeX file will contain all of your book content, ready for academic publishing.</p>
        </div>
        
        <div style="color: #777; font-size: 12px; margin-top: 40px; text-align: center;">
          LaTeX document preview
        </div>
      </div>`;
  };
  
  // Generate ODT preview
  const generateODTPreview = (book: any, options?: any) => {
    return `
      <div style="font-family: 'Liberation Serif', serif; padding: 40px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 24px; margin-bottom: 10px;">${book.title}</h1>
          <p>By ${book.author || 'Unknown'}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 18px; margin-bottom: 15px;">Chapter 1: ${book.chapters?.[0]?.title || 'Introduction'}</h2>
          <p style="line-height: 1.6; margin-bottom: 15px;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to ODT format.'}</p>
          <p style="line-height: 1.6;">The actual ODT file will contain all of your book content, properly formatted for LibreOffice or OpenOffice.</p>
        </div>
        
        <div style="color: #777; font-size: 12px; margin-top: 40px; text-align: center;">
          OpenDocument Text preview
        </div>
      </div>`;
  };
  
  // Generate Pages preview
  const generatePagesPreview = (book: any, options?: any) => {
    return `
      <div style="font-family: 'Helvetica', sans-serif; padding: 40px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 28px; margin-bottom: 5px; font-weight: 300;">${book.title}</h1>
          <p style="color: #666;">By ${book.author || 'Unknown'}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; margin-bottom: 20px; font-weight: 500; color: #333;">Chapter 1: ${book.chapters?.[0]?.title || 'Introduction'}</h2>
          <p style="line-height: 1.6; margin-bottom: 15px; color: #333;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to Apple Pages format.'}</p>
          <p style="line-height: 1.6; color: #333;">The actual Pages file will contain all of your book content, formatted for Apple Pages.</p>
        </div>
        
        <div style="color: #999; font-size: 12px; margin-top: 40px; text-align: center; font-weight: 300;">
          Apple Pages preview
        </div>
      </div>`;
  };
  
  // Generate FB2 preview
  const generateFB2Preview = (book: any, options?: any) => {
    return `
      <div style="font-family: 'Georgia', serif; padding: 30px; background-color: #f9f9f9; border: 1px solid #ddd; max-width: 700px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 22px; margin-bottom: 8px;">${book.title}</h1>
          <p style="color: #666;">By ${book.author || 'Unknown'}</p>
        </div>
        
        <div style="margin-bottom: 30px; padding: 20px; background-color: #fff; border: 1px solid #eee;">
          <h2 style="font-size: 18px; margin-bottom: 15px;">${book.chapters?.[0]?.title || 'Chapter 1'}</h2>
          <p style="line-height: 1.6; margin-bottom: 15px;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to FB2 format.'}</p>
          <p style="line-height: 1.6;">The actual FB2 file will contain all of your book content, formatted for e-readers that support the Fiction Book format.</p>
        </div>
        
        <div style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
          FictionBook (FB2) preview
        </div>
      </div>`;
  };
  
  // Generate CBZ preview
  const generateCBZPreview = (book: any, options?: any) => {
    return `
      <div style="font-family: 'Comic Sans MS', cursive; padding: 20px; background-color: #f0f0f0; border: 1px solid #ddd; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 20px; background-color: #fff; padding: 15px; border: 1px solid #ccc;">
          <h1 style="font-size: 22px; margin-bottom: 5px; color: #333;">${book.title}</h1>
          <p style="color: #666;">By ${book.author || 'Unknown'}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #ccc; margin-bottom: 20px;">
          <div style="text-align: center; margin-bottom: 15px;">
            <h2 style="font-size: 18px; margin-bottom: 0;">${book.chapters?.[0]?.title || 'Page 1'}</h2>
          </div>
          <p style="line-height: 1.5; background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 14px;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to CBZ format.'}</p>
        </div>
        
        <div style="color: #666; font-size: 12px; margin-top: 20px; text-align: center; background-color: #fff; padding: 10px; border: 1px solid #ccc;">
          Comic Book Archive (CBZ) preview - Page 1 of ${book.chapters?.length || 1}
        </div>
      </div>`;
  };
  
  // Helper functions for styling
  const convertLineSpacing = (spacing: string): string => {
    switch (spacing) {
      case 'single': return '1.0';
      case 'double': return '2.0';
      case 'relaxed': return '1.5';
      case 'normal':
      default:
        return '1.15';
    }
  };
  
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {previewInNewTab ? (
          <div className="text-center p-8">
            <p className="text-gray-500 mb-2">Preview opened in a new tab</p>
            <p className="text-sm text-gray-400">
