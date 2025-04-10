import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import { Download, Save, Settings, PenTool, Image, LayoutTemplate, Sparkles } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { PDFExportOptions } from '@/lib/api/types';
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
          doc.rect(margin, margin, pageWidth - (margin * 2), pageHeight - (margin * 2), 'S');
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
      
      let margin;
      switch(pdfOptions.pageMargins) {
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
      switch(pdfOptions.lineSpacing) {
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
        doc.setFontSize(baseFontSize);
        doc.setFont(fontFamily, 'normal');
        doc.setTextColor(colorScheme.text);
        
        const descLines = doc.splitTextToSize(editedBook.description, contentWidth);
        const textAlign = pdfOptions.textAlignment as any;
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
        
        const textAlign = pdfOptions.textAlignment as any;
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
                  
                  doc.setTextColor(colorScheme.heading);
                } else {
                  doc.roundedRect(margin + 5, yPosition - 5, contentWidth - 10, 10 * quoteLines.length + 10, 2, 2, 'FD');
                  doc.setTextColor(colorScheme.text);
                }
                
                if (pdfOptions.textAlignment === 'center') {
                  doc.text(quoteLines, pageWidth / 2, yPosition + 5, { align: 'center' });
                } else {
                  doc.text(quoteLines, margin + 15, yPosition + 5);
                }
                
                yPosition += 10 * (quoteLines.length + 1);
                isFirstParagraph = false;
              }
              else {
                doc.setFont(fontFamily, 'normal');
                doc.setFontSize(baseFontSize);
                doc.setTextColor(colorScheme.text);
                
                let xOffset = 0;
                let processedText = paragraph;
                
                if (isFirstParagraph && pdfOptions.dropCaps && paragraph.length > 0) {
                  const dropCapsResult = applyDropCaps(doc, paragraph, margin, yPosition, colorScheme);
                  if (dropCapsResult) {
                    processedText = dropCapsResult.restOfText;
                    xOffset = dropCapsResult.dropCapWidth;
                    
                    const firstLineText = processedText.substring(0, 50);
                    const contentLines = doc.splitTextToSize(firstLineText, contentWidth - xOffset);
                    
                    if (pdfOptions.textAlignment === 'center') {
                      doc.text(contentLines, pageWidth / 2, yPosition, { align: 'center' });
                    } else if (pdfOptions.textAlignment === 'justified') {
                      doc.text(contentLines, margin + xOffset, yPosition, { align: 'justify', maxWidth: contentWidth - xOffset });
                    } else {
                      doc.text(contentLines, margin + xOffset, yPosition);
                    }
                    
                    const linesAdded = contentLines.length;
                    yPosition += linesAdded * (baseFontSize * 0.5);
                    
                    processedText = processedText.substring(firstLineText.length);
                  }
                }
                
                const contentLines = doc.splitTextToSize(processedText, contentWidth);
                
                const lineHeightMultiplier = lineHeight;
                
                if (pdfOptions.textAlignment === 'center') {
                  doc.text(contentLines, pageWidth / 2, yPosition, { align: 'center' });
                } else if (pdfOptions.textAlignment === 'justified') {
                  doc.text(contentLines, margin, yPosition, { align: 'justify', maxWidth: contentWidth });
                } else {
                  doc.text(contentLines, margin, yPosition);
                }
                
                yPosition += lineHeightMultiplier * (7 * contentLines.length);
                
                yPosition += 3;
                isFirstParagraph = false;
              }
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
        
        doc.setDrawColor(colorScheme.accent);
        doc.setLineWidth(1);
        
        if (pdfOptions.colorScheme === 'elegant' || pdfOptions.colorScheme === 'artistic') {
          const centerX = pageWidth / 2;
          doc.line(centerX - 30, 40, centerX + 30, 40);
          doc.circle(centerX, 40, 3, 'F');
          
          doc.line(centerX - 30, pageHeight - 40, centerX + 30, pageHeight - 40);
          doc.circle(centerX, pageHeight - 40, 3, 'F');
        } else {
          doc.line(margin, 40, pageWidth - margin, 40);
          doc.line(margin, pageHeight - 40, pageWidth - margin, pageHeight - 40);
        }
        
        doc.setFont(fontFamily, 'bold');
        doc.setFontSize(baseFontSize * 1.8);
        doc.setTextColor(colorScheme.heading);
        doc.text("Credits", pageWidth / 2, 30, { align: 'center' });
        
        doc.setFont(fontFamily, 'normal');
        doc.setFontSize(baseFontSize);
        doc.setTextColor(colorScheme.text);
        
        const creditsLines = doc.splitTextToSize(editedBook.creditsPage, contentWidth);
        
        if (pdfOptions.textAlignment === 'center') {
          doc.text(creditsLines, pageWidth / 2, 60, { align: 'center' });
        } else if (pdfOptions.textAlignment === 'justified') {
          doc.text(creditsLines, margin, 60, { align: 'justify', maxWidth: contentWidth });
        } else {
          doc.text(creditsLines, margin, 60);
        }
      }
      
      doc.setProperties({
        title: editedBook.title || 'Untitled Book',
        subject: editedBook.description || 'Book exported from Book-Kreate',
        creator: 'Book-Kreate',
        author: 'Book-Kreate User',
        keywords: `book, ${editedBook.genre}, ${editedBook.title}`
      });
      
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
                  <CardTitle className="flex items-center gap-2">
                    PDF Export Settings 
                    <Settings size={18} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-medium mb-2 block">Theme</Label>
                        <Select 
                          value={pdfOptions.colorScheme}
                          onValueChange={(value) => {
                            setPdfOptions({...pdfOptions, colorScheme: value as any});
                            setPreviewTheme(value);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(colorSchemes).map((scheme) => (
                              <SelectItem key={scheme} value={scheme}>
                                <span className="capitalize">{scheme}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="font-medium mb-2 block">Font Family</Label>
                        <Select 
                          value={pdfOptions.fontFamily}
                          onValueChange={(value) => setPdfOptions({...pdfOptions, fontFamily: value})}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select font" />
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
                        <Label className="font-medium mb-2 block">Page Size</Label>
                        <Select 
                          value={pdfOptions.pageSize}
                          onValueChange={(value) => setPdfOptions({...pdfOptions, pageSize: value as any})}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select page size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a4">A4</SelectItem>
                            <SelectItem value="letter">Letter</SelectItem>
                            <SelectItem value="legal">Legal</SelectItem>
                            <SelectItem value="a5">A5 (Smaller)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="font-medium mb-2 block">Orientation</Label>
                        <Select 
                          value={pdfOptions.orientation}
                          onValueChange={(value) => setPdfOptions({...pdfOptions, orientation: value as any})}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select orientation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="portrait">Portrait</SelectItem>
                            <SelectItem value="landscape">Landscape</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="font-medium mb-2 block">Font Size</Label>
                        <Select 
                          value={String(pdfOptions.fontSize)}
                          onValueChange={(value) => setPdfOptions({...pdfOptions, fontSize: Number(value)})}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select font size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">Small (10pt)</SelectItem>
                            <SelectItem value="12">Medium (12pt)</SelectItem>
                            <SelectItem value="14">Large (14pt)</SelectItem>
                            <SelectItem value="16">Extra Large (16pt)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="font-medium mb-2 block">Text Alignment</Label>
                        <Select 
                          value={pdfOptions.textAlignment}
                          onValueChange={(value) => setPdfOptions({...pdfOptions, textAlignment: value as any})}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select text alignment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="justified">Justified</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="font-medium mb-2 block">Line Spacing</Label>
                        <Select 
                          value={pdfOptions.lineSpacing}
                          onValueChange={(value) => setPdfOptions({...pdfOptions, lineSpacing: value as any})}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select line spacing" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compact">Compact</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="relaxed">Relaxed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="font-medium mb-2 block">Page Margins</Label>
                        <Select 
                          value={pdfOptions.pageMargins}
                          onValueChange={(value) => setPdfOptions({...pdfOptions, pageMargins: value as any})}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select margins" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="narrow">Narrow</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="wide">Wide</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="decorative-elements" 
                          checked={pdfOptions.decorativeElements}
                          onCheckedChange={(checked) => 
                            setPdfOptions({...pdfOptions, decorativeElements: !!checked})
                          }
                        />
                        <Label htmlFor="decorative-elements" className="font-medium cursor-pointer">
                          Add decorative elements
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="chapter-dividers" 
                          checked={pdfOptions.chapterDividers}
                          onCheckedChange={(checked) => 
                            setPdfOptions({...pdfOptions, chapterDividers: !!checked})
                          }
                        />
                        <Label htmlFor="chapter-dividers" className="font-medium cursor-pointer">
                          Add chapter dividers
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="drop-caps" 
                          checked={pdfOptions.dropCaps}
                          onCheckedChange={(checked) => 
                            setPdfOptions({...pdfOptions, dropCaps: !!checked})
                          }
                        />
                        <Label htmlFor="drop-caps" className="font-medium cursor-pointer">
                          Add drop caps to paragraphs
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="paper-texture" 
                          checked={pdfOptions.paperTextureEffect}
                          onCheckedChange={(checked) => 
                            setPdfOptions({...pdfOptions, paperTextureEffect: !!checked})
                          }
                        />
                        <Label htmlFor="paper-texture" className="font-medium cursor-pointer">
                          Apply paper texture effect
                        </Label>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
                      <h3 className="text-sm font-semibold flex items-center gap-1 text-blue-700 mb-2">
                        <Sparkles size={16} />
                        Theme Preview Hint
                      </h3>
                      <p className="text-sm text-blue-600">
                        Switch to the Preview tab to see how your chosen formatting and theme will look before exporting to PDF.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <Card className={`p-6 ${previewTheme === 'artistic' ? 'bg-amber-50' : 
                                 previewTheme === 'fantasy' ? 'bg-blue-50' : 
                                 previewTheme === 'romantic' ? 'bg-pink-50' : 
                                 previewTheme === 'scholarly' ? 'bg-slate-50' : 
                                 previewTheme === 'elegant' ? 'bg-purple-50' : ''}`}>
            <div className={`text-center mb-10 ${
              previewTheme === 'modern' ? 'font-sans' : 
              previewTheme === 'classic' ? 'font-serif' : 
              previewTheme === 'elegant' ? 'font-serif' : 
              'font-sans'
            }`}>
              <h1 className={`text-3xl font-bold mb-2 ${
                previewTheme === 'vibrant' ? 'text-red-600' :
                previewTheme === 'elegant' ? 'text-purple-800' :
                previewTheme === 'modern' ? 'text-teal-600' :
                previewTheme === 'fantasy' ? 'text-blue-700' :
                ''
              }`}>{editedBook.title}</h1>
              
              <p className={`text-lg italic ${
                previewTheme === 'vibrant' ? 'text-amber-600' :
                previewTheme === 'elegant' ? 'text-purple-600' :
                previewTheme === 'modern' ? 'text-teal-500' :
                previewTheme === 'fantasy' ? 'text-blue-500' :
                ''
              }`}>{editedBook.genre}</p>
              
              <p className="mt-4 text-slate-600">{editedBook.description}</p>
              
              {editedBook.coverPage && (
                <div className={`mt-8 ${
                  previewTheme === 'artistic' ? 'p-6 bg-white rounded-lg shadow-md' :
                  previewTheme === 'scholarly' ? 'p-6 border-l-4 border-blue-700' : 
                  previewTheme === 'fantasy' ? 'p-6 bg-white border border-blue-200 rounded-lg' :
                  ''
                }`}>
                  <ReactMarkdown>{editedBook.coverPage}</ReactMarkdown>
                </div>
              )}
            </div>
            
            {editedBook.chapters.map((chapter, index) => (
              <div key={index} className="mb-10">
                <h2 className={`text-2xl font-semibold mb-4 ${
                  previewTheme === 'vibrant' ? 'text-red-600 border-b border-red-200 pb-2' :
                  previewTheme === 'elegant' ? 'text-purple-800 font-serif' :
                  previewTheme === 'modern' ? 'text-teal-600 border-b border-teal-200 pb-2' :
                  previewTheme === 'fantasy' ? 'text-blue-700' :
                  previewTheme === 'romantic' ? 'text-pink-700' :
                  ''
                }`}>Chapter {index + 1}: {chapter.title}</h2>
                
                <div className={
                  pdfOptions.textAlignment === 'justified' ? 'text-justify' : 
                  pdfOptions.textAlignment === 'center' ? 'text-center' : 
                  'text-left'
                }>
                  <ReactMarkdown>{chapter.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            
            {editedBook.creditsPage && (
              <div className={`mt-10 pt-10 border-t ${
                previewTheme === 'scholarly' ? 'border-slate-300' :
                previewTheme === 'elegant' ? 'border-purple-200' :
                previewTheme === 'vibrant' ? 'border-amber-200' :
                'border-slate-200'
              }`}>
                <h2 className={`text-2xl font-semibold mb-4 text-center ${
                  previewTheme === 'vibrant' ? 'text-red-600' :
                  previewTheme === 'elegant' ? 'text-purple-800' :
                  previewTheme === 'modern' ? 'text-teal-600' :
                  ''
                }`}>Credits</h2>
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
                  <p className="text-sm text-slate-600">Your book will be exported with the selected theme and formatting options</p>
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
