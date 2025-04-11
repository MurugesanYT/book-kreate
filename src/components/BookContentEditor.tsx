import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import { Download, Save, Settings, PenTool, Image, LayoutTemplate, Sparkles, BookOpen, FileText, Headphones } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { PDFExportOptions, ExportFormat, Book } from '@/lib/api/types';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [exportQuality, setExportQuality] = useState<'standard' | 'high'>('high');
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [pdfOptions, setPdfOptions] = useState<PDFExportOptions>({
    showPageNumbers: true,
    includeMargins: true,
    fontFamily: book.fontFamily || 'helvetica',
    fontSize: 12,
    headerFooter: true,
    coverPage: true,
    colorScheme: 'elegant',
    pageSize: 'a4' as 'a4' | 'letter' | 'legal' | 'a5',
    orientation: 'portrait',
    decorativeElements: true,
    chapterDividers: true,
    dropCaps: false,
    textAlignment: 'justified' as 'justified' | 'left' | 'center',
    lineSpacing: 'normal' as 'normal' | 'relaxed' | 'compact',
    pageMargins: 'normal' as 'normal' | 'wide' | 'narrow',
    paperTextureEffect: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const [formattingTab, setFormattingTab] = useState<string>('content');
  const [previewTheme, setPreviewTheme] = useState<string>(pdfOptions.colorScheme);

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

  const colorSchemes = {
    default: { bg: '#ffffff', text: '#000000', heading: '#000000', accent: '#4a90e2', borderColor: '#dddddd' },
    elegant: { bg: '#f9f9f9', text: '#333333', heading: '#222222', accent: '#8e44ad', borderColor: '#d4c5e5' },
    modern: { bg: '#ffffff', text: '#2c3e50', heading: '#16a085', accent: '#3498db', borderColor: '#b3e5fc' },
    classic: { bg: '#fff8e1', text: '#3e2723', heading: '#5d4037', accent: '#795548', borderColor: '#d7ccc8' },
    vibrant: { bg: '#ffffff', text: '#333333', heading: '#e74c3c', accent: '#f39c12', borderColor: '#fbd7b5' },
    minimalist: { bg: '#fcfcfc', text: '#202020', heading: '#404040', accent: '#808080', borderColor: '#e0e0e0' },
    artistic: { bg: '#fffaf0', text: '#2d3436', heading: '#6c5ce7', accent: '#fd79a8', borderColor: '#ffeaa7' },
    scholarly: { bg: '#f5f5f5', text: '#333333', heading: '#1e3a8a', accent: '#6b7280', borderColor: '#cbd5e1' },
    romantic: { bg: '#fff0f3', text: '#4a281f', heading: '#c71f37', accent: '#ff758f', borderColor: '#ffd8e2' },
    fantasy: { bg: '#f0f8ff', text: '#333652', heading: '#2a6b96', accent: '#c06c84', borderColor: '#d8e2dc' }
  };

  const fontFamilies = [
    { value: 'helvetica', label: 'Helvetica (Sans-serif)' },
    { value: 'times', label: 'Times (Serif)' },
    { value: 'courier', label: 'Courier (Monospace)' },
    { value: 'georgia', label: 'Georgia (Elegant Serif)' }
  ];

  const exportFormats = [
    { value: 'pdf', label: 'PDF Document', icon: <FileText size={16} /> },
    { value: 'epub', label: 'EPUB eBook', icon: <BookOpen size={16} /> },
    { value: 'mobi', label: 'MOBI (Kindle)', icon: <BookOpen size={16} /> },
    { value: 'docx', label: 'Word Document', icon: <FileText size={16} /> },
    { value: 'html', label: 'HTML Website', icon: <FileText size={16} /> },
    { value: 'markdown', label: 'Markdown', icon: <FileText size={16} /> },
    { value: 'txt', label: 'Plain Text', icon: <FileText size={16} /> },
    { value: 'rtf', label: 'Rich Text Format', icon: <FileText size={16} /> },
    { value: 'azw3', label: 'Kindle AZW3', icon: <BookOpen size={16} /> },
    { value: 'fb2', label: 'FictionBook', icon: <BookOpen size={16} /> },
    { value: 'cbz', label: 'Comic Book Archive', icon: <Image size={16} /> },
    { value: 'latex', label: 'LaTeX', icon: <FileText size={16} /> },
    { value: 'odt', label: 'OpenDocument', icon: <FileText size={16} /> },
    { value: 'pages', label: 'Apple Pages', icon: <FileText size={16} /> },
    { value: 'xml', label: 'XML', icon: <FileText size={16} /> },
    { value: 'json', label: 'JSON', icon: <FileText size={16} /> },
  ];

  const getDecorations = (theme: string, doc: jsPDF, pageWidth: number, pageHeight: number, margin: number) => {
    const colorScheme = colorSchemes[theme as keyof typeof colorSchemes] || colorSchemes.default;
    
    switch(theme) {
      case 'elegant':
        doc.setDrawColor(colorScheme.accent);
        doc.setLineWidth(0.5);
        
        doc.line(margin, margin + 5, margin + 5, margin);
        doc.line(margin, margin + 15, margin + 15, margin);
        
        doc.line(pageWidth - margin, margin + 5, pageWidth - margin - 5, margin);
        doc.line(pageWidth - margin, margin + 15, pageWidth - margin - 15, margin);
        
        doc.line(margin, pageHeight - margin - 5, margin + 5, pageHeight - margin);
        doc.line(margin, pageHeight - margin - 15, margin + 15, pageHeight - margin);
        
        doc.line(pageWidth - margin, pageHeight - margin - 5, pageWidth - margin - 5, pageHeight - margin);
        doc.line(pageWidth - margin, pageHeight - margin - 15, pageWidth - margin - 15, pageHeight - margin);
        break;
        
      case 'artistic':
        doc.setDrawColor(colorScheme.accent);
        doc.setFillColor(colorScheme.borderColor);
        doc.setLineWidth(0.3);
        
        for (let i = 0; i < 8; i++) {
          const x = i < 4 ? margin + (i * 2) : pageWidth - margin - ((i - 4) * 2);
          const y = i < 2 || (i > 3 && i < 6) ? margin + 5 : pageHeight - margin - 5;
          const size = 2 + Math.random() * 4;
          doc.circle(x, y, size, 'FD');
        }
        break;
        
      case 'fantasy':
        doc.setDrawColor(colorScheme.accent);
        doc.setLineWidth(0.5);
        
        for (let x = margin; x < pageWidth - margin; x += 10) {
          const yOffset = Math.sin((x - margin) / 20) * 3;
          doc.line(x, margin + yOffset, x + 5, margin + yOffset);
          doc.line(x, pageHeight - margin + yOffset, x + 5, pageHeight - margin + yOffset);
        }
        break;
        
      case 'scholarly':
        doc.setDrawColor(colorScheme.heading);
        doc.setLineWidth(0.7);
        doc.rect(margin, margin, pageWidth - (margin * 2), pageHeight - (margin * 2), 'S');
        
        const cornerSize = 10;
        doc.setFillColor(colorScheme.accent);
        doc.rect(margin, margin, cornerSize, cornerSize, 'F');
        doc.rect(pageWidth - margin - cornerSize, margin, cornerSize, cornerSize, 'F');
        doc.rect(margin, pageHeight - margin - cornerSize, cornerSize, cornerSize, 'F');
        doc.rect(pageWidth - margin - cornerSize, pageHeight - margin - cornerSize, cornerSize, cornerSize, 'F');
        break;
        
      case 'romantic':
        doc.setDrawColor(colorScheme.accent);
        doc.setLineWidth(0.4);
        
        const curveSize = 15;
        
        doc.lines([[curveSize, 0], [0, -curveSize]], margin + curveSize, margin + curveSize, [0.5, 0.5]);
        
        doc.lines([[0, -curveSize], [-curveSize, 0]], pageWidth - margin - curveSize, margin + curveSize, [0.5, 0.5]);
        
        doc.lines([[0, curveSize], [curveSize, 0]], margin + curveSize, pageHeight - margin - curveSize, [0.5, 0.5]);
        
        doc.lines([[-curveSize, 0], [0, curveSize]], pageWidth - margin - curveSize, pageHeight - margin - curveSize, [0.5, 0.5]);
        break;
        
      default:
        if (pdfOptions.decorativeElements) {
          doc.setDrawColor(colorScheme.accent);
          doc.setLineWidth(0.5);
          doc.rect(margin, margin, pageWidth - (margin * 2), pageHeight - (margin * 2), 'S');
        }
    }
  };

  const lightenColor = (color: string, factor: number) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    
    const newR = Math.min(255, Math.round(r + (255 - r) * factor));
    const newG = Math.min(255, Math.round(g + (255 - g) * factor));
    const newB = Math.min(255, Math.round(b + (255 - b) * factor));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  const createChapterDivider = (doc: jsPDF, pageWidth: number, colorScheme: any) => {
    if (!pdfOptions.chapterDividers) return;
    
    doc.setDrawColor(colorScheme.accent);
    doc.setLineWidth(0.5);
    
    const margin = pdfOptions.includeMargins ? 20 : 10;
    const contentWidth = pageWidth - (margin * 2);
    
    switch(pdfOptions.colorScheme) {
      case 'elegant':
        const centerX = pageWidth / 2;
        doc.line(centerX - contentWidth/4, 25, centerX + contentWidth/4, 25);
        doc.circle(centerX, 25, 2, 'F');
        doc.circle(centerX - contentWidth/4, 25, 1, 'F');
        doc.circle(centerX + contentWidth/4, 25, 1, 'F');
        break;
        
      case 'fantasy':
        const divPoints = 7;
        const divWidth = contentWidth * 0.7;
        const startX = (pageWidth - divWidth) / 2;
        
        doc.line(startX, 25, startX + divWidth, 25);
        
        for (let i = 0; i < divPoints; i++) {
          const x = startX + (divWidth * i / (divPoints - 1));
          if (i % 2 === 0) {
            doc.circle(x, 25, 1.5, 'F');
          } else {
            doc.rect(x - 1, 23, 2, 4, 'F');
          }
        }
        break;
        
      case 'artistic':
        doc.setLineWidth(1);
        doc.setLineCap('round');
        doc.setLineJoin('round');
        
        const segments = 12;
        const segLength = contentWidth * 0.8 / segments;
        const startXArt = (pageWidth - contentWidth * 0.8) / 2;
        
        for (let i = 0; i < segments; i++) {
          const x1 = startXArt + i * segLength;
          const x2 = x1 + segLength;
          const y1 = 25 + (Math.random() - 0.5) * 2;
          const y2 = 25 + (Math.random() - 0.5) * 2;
          doc.line(x1, y1, x2, y2);
        }
        break;
        
      default:
        if (pdfOptions.decorativeElements) {
          doc.setDrawColor(colorScheme.accent);
          doc.setLineWidth(0.5);
          doc.line(pageWidth / 2 - contentWidth / 4, 25, pageWidth / 2 + contentWidth / 4, 25);
        }
    }
  };

  const applyPaperTexture = (doc: jsPDF, pageWidth: number, pageHeight: number, colorScheme: any) => {
    if (!pdfOptions.paperTextureEffect) return;
    
    const originalColor = colorScheme.text;
    const veryLightColor = lightenColor(originalColor, 0.99);
    doc.setFillColor(veryLightColor);
    
    const dotSpacing = 2;
    for (let x = 0; x < pageWidth; x += dotSpacing) {
      for (let y = 0; y < pageHeight; y += dotSpacing) {
        if (Math.random() > 0.85) {
          const size = 0.1 + Math.random() * 0.2;
          doc.circle(x, y, size, 'F');
        }
      }
    }
    
    doc.setFillColor(colorScheme.text);
  };

  const applyDropCaps = (doc: jsPDF, text: string, x: number, y: number, colorScheme: any): { restOfText: string; dropCapWidth: number; lineHeight: number; } | null => {
    if (!pdfOptions.dropCaps || !text || text.length === 0) return null;
    
    const firstChar = text.charAt(0);
    const restOfText = text.substring(1);
    
    doc.setFont(pdfOptions.fontFamily, 'bold');
    doc.setFontSize(pdfOptions.fontSize * 3);
    doc.setTextColor(colorScheme.heading);
    doc.text(firstChar, x, y);
    
    const dropCapWidth = doc.getTextWidth(firstChar) + 2;
    
    doc.setFont(pdfOptions.fontFamily, 'normal');
    doc.setFontSize(pdfOptions.fontSize);
    doc.setTextColor(colorScheme.text);
    
    return { 
      restOfText, 
      dropCapWidth,
      lineHeight: pdfOptions.fontSize * 3 * 0.25
    };
  };

  const handleExport = () => {
    switch (selectedFormat) {
      case 'pdf':
        exportToPdf();
        break;
      case 'epub':
      case 'mobi':
      case 'docx':
      case 'html':
      case 'markdown':
      case 'txt':
      case 'rtf':
      case 'azw3':
      case 'fb2':
      case 'cbz':
      case 'latex':
      case 'odt':
      case 'pages':
      case 'xml':
      case 'json':
        simulateExport(selectedFormat);
        break;
      default:
        toast.error(`Export format ${selectedFormat} not supported yet`);
    }
  };

  const simulateExport = (format: ExportFormat) => {
    setIsExporting(true);
    toast.loading(`Creating your ${format.toUpperCase()} file...`);
    
    // Use the exportBook function from pdfExporter
    import('@/lib/pdf/pdfExporter').then(({ exportBook }) => {
      // Create a Book object with all required properties
      const bookData: import('@/lib/api/types').Book = {
        id: 'temp-id',
        title: editedBook.title,
        author: '',
        content: editedBook.chapters?.map(ch => ch.content) || [],
        description: editedBook.description,
        coverImage: editedBook.coverImageUrl,
        chapters: editedBook.chapters?.map((ch, idx) => ({
          id: `chapter-${idx}`,
          title: ch.title,
          content: ch.content,
          order: idx
        })) || [],
        genre: editedBook.genre,
        published: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // For formats other than PDF, we use different options
      const options = format === 'pdf' ? pdfOptions : {
        fontFamily: pdfOptions.fontFamily,
        fontSize: pdfOptions.fontSize,
        colorScheme: pdfOptions.colorScheme
      };
      
      // Export the book
      const result = exportBook(bookData, format, options);
      
      setTimeout(() => {
        setIsExporting(false);
        
        if (result.success) {
          toast.success(`Book exported to ${format.toUpperCase()} successfully!`);
          
          // Create download for formats that return content directly
          if (result.content) {
            const element = document.createElement('a');
            const fileType = format === 'json' ? 'application/json' : 
                            format === 'txt' ? 'text/plain' : 
                            format === 'markdown' ? 'text/markdown' : 'text/plain';
            
            const blob = new Blob([result.content], { type: fileType });
            element.href = URL.createObjectURL(blob);
            element.download = `${editedBook.title || 'untitled-book'}.${format}`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          } else {
            // For other formats without direct content, simulate download
            const element = document.createElement('a');
            element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent('Your book content would be here.'));
            element.setAttribute('download', `${editedBook.title || 'untitled-book'}.${format}`);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }
        } else {
          toast.error(`Failed to export to ${format.toUpperCase()}: ${result.message}`);
        }
      }, 1000);
    }).catch(err => {
      console.error('Export error:', err);
      setIsExporting(false);
      toast.error(`Failed to export ${format.toUpperCase()}. Please try again.`);
    });
  };

  const exportToPdf = () => {
    try {
      setIsExporting(true);
      toast.loading('Creating your beautifully formatted PDF...');
      
      const colorScheme = colorSchemes[pdfOptions.colorScheme as keyof typeof colorSchemes] || colorSchemes.default;
      
      const doc = new jsPDF({
        orientation: pdfOptions.orientation,
        unit: 'mm',
        format: pdfOptions.pageSize as 'a4' | 'letter' | 'legal' | 'a5',
      });
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      let margin;
      switch(pdfOptions.pageMargins as 'normal' | 'wide' | 'narrow') {
        case 'wide': margin = 25; break;
        case 'narrow': margin = 15; break;
        default: margin = 20;
      }
      
      if (!pdfOptions.includeMargins) {
        margin = 10;
      }
      
      const contentWidth = pageWidth - (margin * 2);
      
      const fontFamily = pdfOptions.fontFamily || 'helvetica';
      doc.setFont(fontFamily);
      
      const baseFontSize = pdfOptions.fontSize || 12;
      
      let lineHeight;
      switch(pdfOptions.lineSpacing as 'normal' | 'relaxed' | 'compact') {
        case 'compact': lineHeight = 1.2; break;
        case 'relaxed': lineHeight = 1.8; break;
        default: lineHeight = 1.5;
      }
      
      doc.setFillColor(colorScheme.bg);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      applyPaperTexture(doc, pageWidth, pageHeight, colorScheme);
      
      if (pdfOptions.decorativeElements) {
        getDecorations(pdfOptions.colorScheme, doc, pageWidth, pageHeight, margin);
      }
      
      doc.setTextColor(colorScheme.heading);
      doc.setFontSize(baseFontSize * 3);
      doc.setFont(fontFamily, 'bold');
      
      doc.setDrawColor(colorScheme.accent);
      doc.setLineWidth(1);
      
      if (pdfOptions.colorScheme === 'elegant' || pdfOptions.colorScheme === 'artistic') {
        doc.line(margin, 60, pageWidth / 2 - 20, 55);
        doc.line(pageWidth / 2 + 20, 55, pageWidth - margin, 60);
        doc.line(margin, pageHeight - 60, pageWidth / 2 - 20, pageHeight - 55);
        doc.line(pageWidth / 2 + 20, pageHeight - 55, pageWidth - margin, pageHeight - 60);
      } else {
        doc.line(margin, 50, pageWidth - margin, 50);
        doc.line(margin, pageHeight - 50, pageWidth - margin, pageHeight - 50);
      }
      
      if (pdfOptions.colorScheme === 'vibrant' || pdfOptions.colorScheme === 'fantasy') {
        doc.setTextColor('#00000022');
        doc.text(editedBook.title || 'Untitled Book', pageWidth / 2 + 1, 82, { align: 'center' });
        doc.setTextColor(colorScheme.heading);
      }
      
      doc.text(editedBook.title || 'Untitled Book', pageWidth / 2, 80, { align: 'center' });
      
      doc.setTextColor(colorScheme.accent);
      doc.setFontSize(baseFontSize * 1.5);
      doc.setFont(fontFamily, 'italic');
      
      if (pdfOptions.colorScheme === 'modern' || pdfOptions.colorScheme === 'minimalist') {
        const genreText = editedBook.genre || 'No Genre';
        const genreWidth = doc.getTextWidth(genreText) + 10;
        doc.roundedRect(pageWidth / 2 - genreWidth / 2, 95, genreWidth, 12, 2, 2, 'F');
        doc.setTextColor('#ffffff');
        doc.text(genreText, pageWidth / 2, 103, { align: 'center' });
      } else {
        doc.text(editedBook.genre || 'No Genre', pageWidth / 2, 100, { align: 'center' });
      }
      
      if (editedBook.description) {
        const descLines = doc.splitTextToSize(editedBook.description, contentWidth);
        const textAlign = pdfOptions.textAlignment as 'left' | 'justified' | 'center';
        doc.text(descLines, pdfOptions.textAlignment === 'center' ? pageWidth / 2 : margin, 130, { 
          align: textAlign === 'justified' ? 'justify' : textAlign
        });
      }
      
      if (editedBook.coverPage && editedBook.coverPage) {
        doc.addPage();
        
        doc.setFillColor(colorScheme.bg);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        
        applyPaperTexture(doc, pageWidth, pageHeight, colorScheme);
        
        if (pdfOptions.decorativeElements) {
          getDecorations(pdfOptions.colorScheme, doc, pageWidth, pageHeight, margin);
        }
        
        if (pdfOptions.headerFooter) {
          doc.setFont(fontFamily, 'italic');
          doc.setFontSize(baseFontSize * 0.8);
          doc.setTextColor(colorScheme.accent);
          doc.text(editedBook.title, margin, 10);
          
          doc.text('Cover Page', pageWidth - margin, pageHeight - 10, { align: 'right' });
        }
        
        doc.setFont(fontFamily, 'bold');
        doc.setFontSize(baseFontSize * 1.8);
        doc.setTextColor(colorScheme.heading);
        
        createChapterDivider(doc, pageWidth, colorScheme);
        doc.text("Cover Page", pageWidth / 2, 30, { align: 'center' });
        
        const coverLines = doc.splitTextToSize(editedBook.coverPage, contentWidth);
        
        const textAlign = pdfOptions.textAlignment as 'left' | 'justified' | 'center';
        doc.text(coverLines, pdfOptions.textAlignment === 'center' ? pageWidth / 2 : margin, 50, { 
          align: textAlign === 'justified' ? 'justify' : textAlign 
        });
      }
      
      if (editedBook.chapters && editedBook.chapters.length > 0) {
        editedBook.chapters.forEach((chapter, index) => {
          doc.addPage();
          
          doc.setFillColor(colorScheme.bg);
          doc.rect(0, 0, pageWidth, pageHeight, 'F');
          
          applyPaperTexture(doc, pageWidth, pageHeight, colorScheme);
          
          if (pdfOptions.decorativeElements) {
            getDecorations(pdfOptions.colorScheme, doc, pageWidth, pageHeight, margin);
          }
          
          if (pdfOptions.headerFooter) {
            doc.setFont(fontFamily, 'italic');
            doc.setFontSize(baseFontSize * 0.8);
            doc.setTextColor(colorScheme.accent);
            
            if (pdfOptions.colorScheme === 'elegant' || pdfOptions.colorScheme === 'scholarly') {
              doc.text(editedBook.title, pageWidth / 2, 10, { align: 'center' });
            } else {
              doc.text(editedBook.title, margin, 10);
            }
            
            if (pdfOptions.showPageNumbers) {
              const pageText = `Page ${index + 3}`;
              
              if (pdfOptions.colorScheme === 'classic' || pdfOptions.colorScheme === 'scholarly') {
                doc.text(pageText, pageWidth / 2, pageHeight - 10, { align: 'center' });
              } else {
                doc.text(pageText, pageWidth - margin, pageHeight - 10, { align: 'right' });
              }
            }
          }
          
          createChapterDivider(doc, pageWidth, colorScheme);
          
          doc.setFont(fontFamily, 'bold');
          doc.setFontSize(baseFontSize * 1.8);
          doc.setTextColor(colorScheme.heading);
          
          if (pdfOptions.colorScheme === 'modern' || pdfOptions.colorScheme === 'vibrant') {
            doc.text(`Chapter ${index + 1}: ${chapter.title}`, margin, 22);
          } else {
            doc.text(`Chapter ${index + 1}: ${chapter.title}`, pageWidth / 2, 22, { align: 'center' });
          }
          
          if (chapter.content) {
            doc.setFont(fontFamily, 'normal');
            doc.setFontSize(baseFontSize);
            doc.setTextColor(colorScheme.text);
            
            const paragraphs = chapter.content.split('\n\n');
            let yPosition = 40;
            let isFirstParagraph = true;
            
            paragraphs.forEach(paragraph => {
              if (yPosition + 30 > pageHeight - margin) {
                doc.addPage();
                
                doc.setFillColor(colorScheme.bg);
                doc.rect(0, 0, pageWidth, pageHeight, 'F');
                applyPaperTexture(doc, pageWidth, pageHeight, colorScheme);
                
                if (pdfOptions.decorativeElements) {
                  getDecorations(pdfOptions.colorScheme, doc, pageWidth, pageHeight, margin);
                }
                
                if (pdfOptions.headerFooter) {
                  doc.setFont(fontFamily, 'italic');
                  doc.setFontSize(baseFontSize * 0.8);
                  doc.setTextColor(colorScheme.accent);
                  doc.text(editedBook.title, margin, 10);
                  
                  if (pdfOptions.showPageNumbers) {
                    doc.text(`Page ${index + 3}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
                  }
                }
                
                yPosition = margin + 10;
                isFirstParagraph = false;
              }
              
              if (paragraph.startsWith('# ')) {
                doc.setFont(fontFamily, 'bold');
                doc.setFontSize(baseFontSize * 1.6);
                doc.setTextColor(colorScheme.heading);
                const headingText = paragraph.substring(2);
                const headingLines = doc.splitTextToSize(headingText, contentWidth);
                
                if (pdfOptions.textAlignment === 'center') {
                  doc.text(headingLines, pageWidth / 2, yPosition, { align: 'center' });
                } else {
                  doc.text(headingLines, margin, yPosition);
                }
                
                yPosition += 10 * (headingLines.length);
                isFirstParagraph = false;
              } 
              else if (paragraph.startsWith('## ')) {
                doc.setFont(fontFamily, 'bold');
                doc.setFontSize(baseFontSize * 1.3);
                doc.setTextColor(colorScheme.heading);
                const headingText = paragraph.substring(3);
                const headingLines = doc.splitTextToSize(headingText, contentWidth);
                
                if (pdfOptions.textAlignment === 'center') {
                  doc.text(headingLines, pageWidth / 2, yPosition, { align: 'center' });
                } else {
