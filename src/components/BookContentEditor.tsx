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
import { PDFExportOptions, ExportFormat } from '@/lib/api/types';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [pdfOptions, setPdfOptions] = useState<PDFExportOptions>({
    showPageNumbers: true,
    includeMargins: true,
    fontFamily: book.fontFamily || 'helvetica',
    fontSize: 12,
    headerFooter: true,
    coverPage: true,
    colorScheme: 'elegant',
    pageSize: 'a4',
    orientation: 'portrait',
    decorativeElements: true,
    chapterDividers: true,
    dropCaps: false,
    textAlignment: 'justified',
    lineSpacing: 'normal',
    pageMargins: 'normal',
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
    { value: 'audio', label: 'Audiobook', icon: <Headphones size={16} /> }
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
      case 'audio':
        simulateExport(selectedFormat);
        break;
      default:
        toast.error(`Export format ${selectedFormat} not supported yet`);
    }
  };

  const simulateExport = (format: ExportFormat) => {
    setIsExporting(true);
    toast.loading(`Creating your ${format.toUpperCase()} file...`);
    
    // Simulate processing time
    setTimeout(() => {
      setIsExporting(false);
      toast.success(`Book exported to ${format.toUpperCase()} successfully!`);
      
      // Simulate download by creating a dummy download link
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('Your book content would be here.'));
      element.setAttribute('download', `${editedBook.title || 'untitled-book'}.${format}`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
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
                  doc.text(headingLines, margin, yPosition);
                }
                
                yPosition += 8 * (headingLines.length);
                isFirstParagraph = false;
              }
              else if (paragraph.startsWith('> ')) {
                doc.setFont(fontFamily, 'italic');
                doc.setFontSize(baseFontSize);
                
                const quoteText = paragraph.substring(2);
                const quoteLines = doc.splitTextToSize(quoteText, contentWidth - 20);
                
                doc.setDrawColor(colorScheme.accent);
                doc.setFillColor(colorScheme.bg);
                
                if (pdfOptions.colorScheme === 'elegant' || pdfOptions.colorScheme === 'artistic') {
                  doc.setFillColor(colorScheme.bg);
                  doc.roundedRect(margin + 5, yPosition - 5, contentWidth - 10, 10 * quoteLines.length + 10, 3, 3, 'F');
                  
                  doc.setFillColor(colorScheme.accent);
                  doc.rect(margin + 5, yPosition - 5, 2, 10 * quoteLines.length + 10, 'F');
                  
                  doc.setTextColor(colorScheme.accent);
                } else if (pdfOptions.colorScheme === 'fantasy' || pdfOptions.colorScheme === 'vibrant') {
                  doc.setFillColor(`${colorScheme.accent}15`);
                  doc.roundedRect(margin + 5, yPosition - 5, contentWidth - 10, 10 * quoteLines.length + 10, 3, 3, 'F');
                  
                  doc.setDrawColor(colorScheme.accent);
                  doc.setLineWidth(0.5);
                  
                  const boxWidth = contentWidth - 10;
                  const boxHeight = 10 * quoteLines.length + 10;
                  const cornerSize = 5;
                  
                  doc.line(margin + 5, yPosition - 5 + cornerSize, margin + 5, yPosition - 5);
                  doc.line(margin + 5, yPosition - 5, margin + 5 + cornerSize, yPosition - 5);
                  
                  doc.line(margin + 5 + boxWidth - cornerSize, yPosition - 5, margin + 5 + boxWidth, yPosition - 5);
                  doc.line(margin + 5 + boxWidth, yPosition - 5, margin + 5 + boxWidth, yPosition - 5 + cornerSize);
                  
                  doc.line(margin + 5, yPosition - 5 + boxHeight - cornerSize, margin + 5, yPosition - 5 + boxHeight);
                  doc.line(margin + 5, yPosition - 5 + boxHeight, margin + 5 + cornerSize, yPosition - 5 + boxHeight);
                  
                  doc.line(margin + 5 + boxWidth - cornerSize, yPosition - 5 + boxHeight, margin + 5 + boxWidth, yPosition - 5 + boxHeight);
                  doc.line(margin + 5 + boxWidth, yPosition - 5 + boxHeight, margin + 5 + boxWidth, yPosition - 5 + boxHeight - cornerSize);
                } else {
                  doc.setFillColor(`${colorScheme.bg}e6`);
                  doc.roundedRect(margin + 5, yPosition - 5, contentWidth - 10, 10 * quoteLines.length + 10, 2, 2, 'F');
                  doc.setDrawColor(colorScheme.accent);
                  doc.roundedRect(margin + 5, yPosition - 5, contentWidth - 10, 10 * quoteLines.length + 10, 2, 2, 'S');
                }
                
                doc.text(quoteLines, margin + 15, yPosition);
                yPosition += 10 * quoteLines.length + 5;
              }
              else {
                // Regular paragraph
                if (isFirstParagraph && pdfOptions.dropCaps) {
                  const dropCapsResult = applyDropCaps(doc, paragraph, margin, yPosition, colorScheme);
                  
                  if (dropCapsResult) {
                    const { restOfText, dropCapWidth, lineHeight } = dropCapsResult;
                    const wrappedText = doc.splitTextToSize(restOfText, contentWidth - dropCapWidth);
                    
                    // First 3 lines are next to the drop cap
                    for (let i = 0; i < Math.min(3, wrappedText.length); i++) {
                      doc.text(wrappedText[i], margin + dropCapWidth, yPosition + (i * lineHeight));
                    }
                    
                    // The rest are full width
                    if (wrappedText.length > 3) {
                      for (let i = 3; i < wrappedText.length; i++) {
                        doc.text(wrappedText[i], margin, yPosition + (i * lineHeight));
                      }
                    }
                    
                    yPosition += lineHeight * Math.max(wrappedText.length, 3) + 10;
                  } else {
                    const wrappedText = doc.splitTextToSize(paragraph, contentWidth);
                    
                    if (pdfOptions.textAlignment === 'center') {
                      doc.text(wrappedText, pageWidth / 2, yPosition, { align: 'center' });
                    } else {
                      doc.text(wrappedText, margin, yPosition);
                    }
                    
                    yPosition += 6 * wrappedText.length;
                  }
                } else {
                  const wrappedText = doc.splitTextToSize(paragraph, contentWidth);
                  
                  if (pdfOptions.textAlignment === 'center') {
                    doc.text(wrappedText, pageWidth / 2, yPosition, { align: 'center' });
                  } else {
                    doc.text(wrappedText, margin, yPosition);
                  }
                  
                  yPosition += 6 * wrappedText.length;
                }
                
                isFirstParagraph = false;
              }
              
              yPosition += 6; // Extra spacing between paragraphs
            });
          }
        });
      }
      
      if (editedBook.creditsPage) {
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
          
          doc.text('Credits', pageWidth - margin, pageHeight - 10, { align: 'right' });
        }
        
        doc.setFont(fontFamily, 'bold');
        doc.setFontSize(baseFontSize * 1.8);
        doc.setTextColor(colorScheme.heading);
        doc.text("Credits", pageWidth / 2, 30, { align: 'center' });
        
        doc.setFont(fontFamily, 'normal');
        doc.setFontSize(baseFontSize);
        doc.setTextColor(colorScheme.text);
        
        const creditsLines = doc.splitTextToSize(editedBook.creditsPage, contentWidth);
        const textAlign = pdfOptions.textAlignment as 'left' | 'justified' | 'center';
        doc.text(creditsLines, pdfOptions.textAlignment === 'center' ? pageWidth / 2 : margin, 50, { 
          align: textAlign === 'justified' ? 'justify' : textAlign 
        });
      }
      
      // Simulate PDF creation delay
      setTimeout(() => {
        setIsExporting(false);
        toast.success('PDF export completed successfully!');
        
        // Save the PDF
        doc.save(`${editedBook.title || 'untitled-book'}.pdf`);
      }, 1000);
    } catch (error) {
      console.error('PDF export error:', error);
      setIsExporting(false);
      toast.error('Failed to export PDF. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Content Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 grid grid-cols-3">
              <TabsTrigger value="edit">
                <PenTool size={16} className="mr-2" /> Edit
              </TabsTrigger>
              <TabsTrigger value="format">
                <LayoutTemplate size={16} className="mr-2" /> Format
              </TabsTrigger>
              <TabsTrigger value="preview">
                <BookOpen size={16} className="mr-2" /> Preview
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit" className="space-y-6">
              {editedBook.coverPage && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Cover Page</h3>
                  <Textarea 
                    value={editedBook.coverPage}
                    onChange={(e) => handleCoverChange(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
              )}
              
              {editedBook.chapters && editedBook.chapters.map((chapter, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold">Chapter {index + 1}: {chapter.title}</h3>
                  <Textarea 
                    value={chapter.content}
                    onChange={(e) => handleContentChange(index, e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
              ))}
              
              {editedBook.creditsPage && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Credits</h3>
                  <Textarea 
                    value={editedBook.creditsPage}
                    onChange={(e) => handleCreditsChange(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="format" className="space-y-6">
              <Tabs defaultValue="content" value={formattingTab} onValueChange={setFormattingTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="export">Export Options</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Book Style</h3>
                      <Select 
                        value={editedBook.fontFamily || 'helvetica'} 
                        onValueChange={(value) => handleStyleChange('fontFamily', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontFamilies.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Color Theme</h3>
                      <Select 
                        value={editedBook.colorScheme || 'elegant'} 
                        onValueChange={(value) => handleStyleChange('colorScheme', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select color scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="elegant">Elegant</SelectItem>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="vibrant">Vibrant</SelectItem>
                          <SelectItem value="minimalist">Minimalist</SelectItem>
                          <SelectItem value="artistic">Artistic</SelectItem>
                          <SelectItem value="scholarly">Scholarly</SelectItem>
                          <SelectItem value="romantic">Romantic</SelectItem>
                          <SelectItem value="fantasy">Fantasy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="appearance" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Page Settings</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="pageSize">Page Size</Label>
                          <Select 
                            value={pdfOptions.pageSize} 
                            onValueChange={(value) => setPdfOptions({...pdfOptions, pageSize: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select page size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="a4">A4</SelectItem>
                              <SelectItem value="letter">Letter</SelectItem>
                              <SelectItem value="legal">Legal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="orientation">Orientation</Label>
                          <Select 
                            value={pdfOptions.orientation} 
                            onValueChange={(value: 'portrait' | 'landscape') => setPdfOptions({...pdfOptions, orientation: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select orientation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="portrait">Portrait</SelectItem>
                              <SelectItem value="landscape">Landscape</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="pageMargins">Margins</Label>
                          <Select 
                            value={pdfOptions.pageMargins} 
                            onValueChange={(value) => setPdfOptions({...pdfOptions, pageMargins: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select margin size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="narrow">Narrow</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="wide">Wide</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="lineSpacing">Line Spacing</Label>
                          <Select 
                            value={pdfOptions.lineSpacing} 
                            onValueChange={(value) => setPdfOptions({...pdfOptions, lineSpacing: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select line spacing" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="compact">Compact</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="relaxed">Relaxed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Text Settings</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="fontSize">Font Size</Label>
                          <Select 
                            value={pdfOptions.fontSize.toString()} 
                            onValueChange={(value) => setPdfOptions({...pdfOptions, fontSize: parseInt(value)})}
                          >
                            <SelectTrigger id="fontSize">
                              <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">10</SelectItem>
                              <SelectItem value="11">11</SelectItem>
                              <SelectItem value="12">12</SelectItem>
                              <SelectItem value="14">14</SelectItem>
                              <SelectItem value="16">16</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="textAlignment">Text Alignment</Label>
                          <Select 
                            value={pdfOptions.textAlignment} 
                            onValueChange={(value) => setPdfOptions({...pdfOptions, textAlignment: value})}
                          >
                            <SelectTrigger id="textAlignment">
                              <SelectValue placeholder="Select text alignment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="left">Left</SelectItem>
                              <SelectItem value="center">Center</SelectItem>
                              <SelectItem value="right">Right</SelectItem>
                              <SelectItem value="justified">Justified</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="dropCaps" 
                            checked={pdfOptions.dropCaps}
                            onCheckedChange={(checked) => setPdfOptions({...pdfOptions, dropCaps: checked as boolean})}
                          />
                          <label
                            htmlFor="dropCaps"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Enable drop caps for paragraphs
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Layout Elements</h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="showPageNumbers" 
                            checked={pdfOptions.showPageNumbers}
                            onCheckedChange={(checked) => setPdfOptions({...pdfOptions, showPageNumbers: checked as boolean})}
                          />
                          <label
                            htmlFor="showPageNumbers"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Show page numbers
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="headerFooter" 
                            checked={pdfOptions.headerFooter}
                            onCheckedChange={(checked) => setPdfOptions({...pdfOptions, headerFooter: checked as boolean})}
                          />
                          <label
                            htmlFor="headerFooter"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Include headers and footers
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="chapterDividers" 
                            checked={pdfOptions.chapterDividers}
                            onCheckedChange={(checked) => setPdfOptions({...pdfOptions, chapterDividers: checked as boolean})}
                          />
                          <label
                            htmlFor="chapterDividers"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Add chapter dividers
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="decorativeElements" 
                            checked={pdfOptions.decorativeElements}
                            onCheckedChange={(checked) => setPdfOptions({...pdfOptions, decorativeElements: checked as boolean})}
                          />
                          <label
                            htmlFor="decorativeElements"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Include decorative elements
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="paperTextureEffect" 
                            checked={pdfOptions.paperTextureEffect}
                            onCheckedChange={(checked) => setPdfOptions({...pdfOptions, paperTextureEffect: checked as boolean})}
                          />
                          <label
                            htmlFor="paperTextureEffect"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Add subtle paper texture effect
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="export" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Export Format</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {exportFormats.map((format) => (
                          <div 
                            key={format.value}
                            className={`border rounded-md p-2 cursor-pointer hover:bg-slate-50 transition-colors ${selectedFormat === format.value ? 'border-book-purple bg-book-purple/5' : 'border-slate-200'}`}
                            onClick={() => setSelectedFormat(format.value as ExportFormat)}
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 flex items-center justify-center text-book-purple">
                                {format.icon}
                              </div>
                              <div className="ml-2 text-sm">{format.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Quality Settings</h3>
                      <RadioGroup 
                        defaultValue={exportQuality} 
                        value={exportQuality}
                        onValueChange={(value) => setExportQuality(value as 'standard' | 'high')}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard">Standard quality (smaller file size)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="high" />
                          <Label htmlFor="high">High quality (larger file size)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-6">
              <div className="bg-white p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Preview</h3>
                  <Select 
                    value={previewTheme} 
                    onValueChange={setPreviewTheme}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="elegant">Elegant</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
                      <SelectItem value="scholarly">Scholarly</SelectItem>
                      <SelectItem value="romantic">Romantic</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div 
                  className="prose max-w-none"
                  style={{
                    fontFamily: editedBook.fontFamily || 'helvetica',
                    padding: '1rem',
                    backgroundColor: colorSchemes[previewTheme as keyof typeof colorSchemes]?.bg || '#ffffff',
                    color: colorSchemes[previewTheme as keyof typeof colorSchemes]?.text || '#000000'
                  }}
                >
                  {editedBook.coverPage && (
                    <div className="mb-6 pb-6 border-b">
                      <h2 style={{ color: colorSchemes[previewTheme as keyof typeof colorSchemes]?.heading || '#000000' }}>Cover Page</h2>
                      <ReactMarkdown>{editedBook.coverPage}</ReactMarkdown>
                    </div>
                  )}
                  
                  {editedBook.chapters && editedBook.chapters.map((chapter, index) => (
                    <div key={index} className="mb-6 pb-6 border-b">
                      <h2 style={{ color: colorSchemes[previewTheme as keyof typeof colorSchemes]?.heading || '#000000' }}>
                        Chapter {index + 1}: {chapter.title}
                      </h2>
                      <ReactMarkdown>{chapter.content}</ReactMarkdown>
                    </div>
                  ))}
                  
                  {editedBook.creditsPage && (
                    <div className="mb-6">
                      <h2 style={{ color: colorSchemes[previewTheme as keyof typeof colorSchemes]?.heading || '#000000' }}>Credits</h2>
                      <ReactMarkdown>{editedBook.creditsPage}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Save Changes
          </Button>
          
          <Button 
            onClick={handleExport}
            disabled={isExporting}
            className="bg-book-purple hover:bg-book-purple/90"
          >
            <Download size={16} className="mr-2" />
            {isExporting ? 'Exporting...' : `Export as ${selectedFormat.toUpperCase()}`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookContentEditor;
