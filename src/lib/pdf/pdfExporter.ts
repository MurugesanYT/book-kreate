
import { jsPDF } from "jspdf";
import { BookData, PDFExportOptions } from "../api/types";
import { generateBookBeautification, BeautificationResult } from "./beautificationService";
import { toast } from "sonner";

// Font sizes for different elements
const FONT_SIZES = {
  title: 24,
  subtitle: 18,
  chapterTitle: 20,
  bodyText: 12,
  header: 10,
  footer: 10,
  caption: 10,
};

// Map colorScheme option to actual color values
const COLOR_SCHEMES = {
  default: { primary: "#333333", background: "#ffffff", accent: "#666666" },
  elegant: { primary: "#2D3748", background: "#F7FAFC", accent: "#805AD5" },
  modern: { primary: "#1A202C", background: "#FFFFFF", accent: "#3182CE" },
  classic: { primary: "#333333", background: "#F8F5E9", accent: "#8B4513" },
  vibrant: { primary: "#2D3748", background: "#FFFFFF", accent: "#E53E3E" },
  minimalist: { primary: "#1A202C", background: "#F7FAFC", accent: "#718096" },
  artistic: { primary: "#44337A", background: "#FFF5F7", accent: "#B83280" },
  scholarly: { primary: "#1A365D", background: "#EDF2F7", accent: "#2C5282" },
  romantic: { primary: "#702459", background: "#FFF5F7", accent: "#B83280" },
  fantasy: { primary: "#44337A", background: "#FEFCBF", accent: "#6B46C1" }
};

/**
 * Export a book to PDF with custom beautification
 */
export const exportBookToPDF = async (
  book: BookData,
  chapters: { title: string; content: string }[],
  options: PDFExportOptions = getDefaultExportOptions(),
  coverPage: string = "",
  creditsPage: string = ""
): Promise<string> => {
  try {
    console.log("Starting PDF export with options:", options);
    toast.info("Preparing your book for export...");
    
    // Combine all text for content analysis
    const allContent = chapters
      .map(chapter => `# ${chapter.title}\n\n${chapter.content}`)
      .join('\n\n')
      + (coverPage ? `\n\nCOVER:\n${coverPage}` : '')
      + (creditsPage ? `\n\nCREDITS:\n${creditsPage}` : '');
    
    // Generate AI-powered beautification settings
    const beautification = await generateBookBeautification(book, allContent, options);
    toast.info("Applying custom styling to your book...");
    
    // Create the PDF document
    const doc = new jsPDF({
      orientation: options.orientation,
      unit: "mm",
      format: options.pageSize
    });
    
    // Apply basic settings
    configureDocument(doc, options, beautification);
    
    // Generate the PDF content
    addCoverPage(doc, book, options, coverPage, beautification);
    addTableOfContents(doc, chapters, options, beautification);
    addChapters(doc, chapters, options, beautification);
    if (creditsPage) {
      addCreditsPage(doc, creditsPage, options, beautification);
    }
    
    // Return PDF as base64 string
    const pdfOutput = doc.output('datauristring');
    console.log("PDF export completed successfully");
    toast.success("Book exported successfully!");
    
    return pdfOutput;
  } catch (error) {
    console.error("PDF export failed:", error);
    toast.error("Failed to export book to PDF");
    throw error;
  }
};

/**
 * Configure basic document settings
 */
const configureDocument = (
  doc: jsPDF, 
  options: PDFExportOptions,
  beautification: BeautificationResult
) => {
  // Set font
  const fontFamily = options.fontFamily || beautification.fontRecommendation.split(',')[0] || 'helvetica';
  doc.setFont(fontFamily.toLowerCase().includes('times') ? 'times' : 'helvetica');
  
  // Set text color
  const colors = beautification.colorScheme.split(',');
  const primaryColor = colors[0] || COLOR_SCHEMES[options.colorScheme].primary;
  doc.setTextColor(hexToRgb(primaryColor).r, hexToRgb(primaryColor).g, hexToRgb(primaryColor).b);
  
  // Set font size
  doc.setFontSize(options.fontSize || FONT_SIZES.bodyText);
  
  // Configure margins based on options
  const marginSizes = {
    normal: 20,  // mm
    wide: 30,    // mm
    narrow: 15   // mm
  };
  
  const margin = marginSizes[options.pageMargins || 'normal'];
  
  // Add page numbers if enabled
  if (options.showPageNumbers) {
    // jsPDF doesn't have setFooter method - use regular page events instead
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(FONT_SIZES.footer);
      doc.text(
        `${i} / ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
  }
};

/**
 * Add a stylized cover page to the PDF
 */
const addCoverPage = (
  doc: jsPDF, 
  book: BookData, 
  options: PDFExportOptions = getDefaultExportOptions(),
  coverContent?: string,
  beautification?: BeautificationResult
) => {
  if (!options.coverPage) {
    return;
  }
  
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  
  // Background color or texture if specified
  const colors = beautification.colorScheme.split(',');
  const bgColor = colors[1] || "#ffffff";
  const accentColor = colors[2] || COLOR_SCHEMES[options.colorScheme].accent;
  
  // Add background color with light texture if enabled
  if (options.paperTextureEffect) {
    // Add a light texture effect to the background
    doc.setFillColor(hexToRgb(bgColor).r, hexToRgb(bgColor).g, hexToRgb(bgColor).b);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // We can't use setGlobalAlpha in jsPDF, so we need to use a different approach
    // for textures (like using lighter color patterns)
    const patternColor = lightenColor(hexToRgb(accentColor), 0.95);
    doc.setFillColor(patternColor.r, patternColor.g, patternColor.b);
    
    // Create subtle texture pattern with small squares
    for (let i = 0; i < pageWidth; i += 5) {
      for (let j = 0; j < pageHeight; j += 5) {
        if (Math.random() > 0.92) {
          doc.circle(i, j, 0.3, 'F');
        }
      }
    }
  }
  
  // Title
  doc.setFontSize(FONT_SIZES.title * 1.5);
  doc.setFont(options.fontFamily || 'helvetica', 'bold');
  
  const titleLines = doc.splitTextToSize(book.title, pageWidth - margin * 2);
  doc.text(titleLines, pageWidth / 2, pageHeight / 3, { align: 'center' });
  
  // Author/Credits
  if (book.credits && book.credits.length > 0) {
    const authors = book.credits
      .filter(credit => credit.role.toLowerCase().includes('author'))
      .map(credit => credit.name);
    
    if (authors.length > 0) {
      doc.setFontSize(FONT_SIZES.subtitle);
      doc.setFont(options.fontFamily || 'helvetica', 'normal');
      doc.text(
        `by ${authors.join(', ')}`,
        pageWidth / 2,
        pageHeight / 3 + 30,
        { align: 'center' }
      );
    }
  }
  
  // Decorative element if enabled
  if (options.decorativeElements) {
    const accentRgb = hexToRgb(accentColor);
    doc.setDrawColor(accentRgb.r, accentRgb.g, accentRgb.b);
    doc.setLineWidth(1);
    
    // Draw a decorative line under the title
    doc.line(
      pageWidth / 2 - 40, 
      pageHeight / 3 + 15, 
      pageWidth / 2 + 40, 
      pageHeight / 3 + 15
    );
  }
  
  // Add a new page after the cover
  doc.addPage();
};

/**
 * Add a table of contents to the PDF
 */
const addTableOfContents = (
  doc: jsPDF,
  chapters: { title: string; content: string }[],
  options: PDFExportOptions,
  beautification: BeautificationResult
) => {
  const pageWidth = doc.internal.pageSize.width;
  const margin = 25;
  
  // Title
  doc.setFontSize(FONT_SIZES.subtitle);
  doc.setFont(options.fontFamily || 'helvetica', 'bold');
  doc.text('Table of Contents', pageWidth / 2, 30, { align: 'center' });
  
  // Chapters
  doc.setFontSize(FONT_SIZES.bodyText);
  doc.setFont(options.fontFamily || 'helvetica', 'normal');
  
  let y = 50;
  chapters.forEach((chapter, index) => {
    // Add page number reference (this is a simplification; actual page numbers would depend on content flow)
    const pageNum = index + 1; // Simplified page numbering
    const title = chapter.title;
    
    doc.text(`${index + 1}. ${title}`, margin, y);
    
    // Add dots between title and page number
    const titleWidth = doc.getTextWidth(`${index + 1}. ${title}`);
    const pageNumWidth = doc.getTextWidth(String(pageNum));
    const dotsWidth = pageWidth - margin * 2 - titleWidth - pageNumWidth;
    const dotsCount = Math.floor(dotsWidth / doc.getTextWidth('.'));
    const dots = '.'.repeat(dotsCount);
    
    doc.text(dots, margin + titleWidth, y);
    doc.text(String(pageNum), pageWidth - margin - pageNumWidth, y);
    
    y += 10;
    
    // Add a new page if we're running out of space
    if (y > doc.internal.pageSize.height - margin && index < chapters.length - 1) {
      doc.addPage();
      y = margin;
    }
  });
  
  // Add a new page after the table of contents
  doc.addPage();
};

/**
 * Add chapters to the PDF with appropriate styling
 */
const addChapters = (
  doc: jsPDF,
  chapters: { title: string; content: string }[],
  options: PDFExportOptions,
  beautification: BeautificationResult
) => {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = options.pageMargins === 'wide' ? 30 : options.pageMargins === 'narrow' ? 15 : 20;
  const colors = beautification.colorScheme.split(',');
  const accentColor = colors[2] || COLOR_SCHEMES[options.colorScheme].accent;
  
  chapters.forEach((chapter, chapterIndex) => {
    // Start each chapter on a new page
    if (chapterIndex > 0) {
      doc.addPage();
    }
    
    // Chapter title
    doc.setFontSize(FONT_SIZES.chapterTitle);
    doc.setFont(options.fontFamily || 'helvetica', 'bold');
    doc.text(
      `Chapter ${chapterIndex + 1}`,
      pageWidth / 2,
      margin + 10,
      { align: 'center' }
    );
    
    // Chapter subtitle
    doc.setFontSize(FONT_SIZES.subtitle);
    doc.text(
      chapter.title,
      pageWidth / 2,
      margin + 20,
      { align: 'center' }
    );
    
    // Decorative element between title and content if enabled
    if (options.chapterDividers) {
      const accentRgb = hexToRgb(accentColor);
      doc.setDrawColor(accentRgb.r, accentRgb.g, accentRgb.b);
      doc.setLineWidth(0.5);
      
      // Choose one of the divider styles based on chapter index
      const dividerStyle = chapterIndex % 3;
      
      if (dividerStyle === 0) {
        // Simple line
        doc.line(
          pageWidth / 2 - 30,
          margin + 30,
          pageWidth / 2 + 30,
          margin + 30
        );
      } else if (dividerStyle === 1) {
        // Line with circle in middle
        doc.line(
          pageWidth / 2 - 40,
          margin + 30,
          pageWidth / 2 - 10,
          margin + 30
        );
        doc.circle(pageWidth / 2, margin + 30, 3, 'FD');
        doc.line(
          pageWidth / 2 + 10,
          margin + 30,
          pageWidth / 2 + 40,
          margin + 30
        );
      } else {
        // Three small lines
        doc.line(
          pageWidth / 2 - 20,
          margin + 30,
          pageWidth / 2 - 10,
          margin + 30
        );
        doc.line(
          pageWidth / 2 - 5,
          margin + 30,
          pageWidth / 2 + 5,
          margin + 30
        );
        doc.line(
          pageWidth / 2 + 10,
          margin + 30,
          pageWidth / 2 + 20,
          margin + 30
        );
      }
    }
    
    // Chapter content
    doc.setFontSize(options.fontSize || FONT_SIZES.bodyText);
    doc.setFont(options.fontFamily || 'helvetica', 'normal');
    
    // Calculate line height based on font size and line spacing option
    const fontSize = options.fontSize || FONT_SIZES.bodyText;
    const lineSpacingFactor = 
      options.lineSpacing === 'relaxed' ? 1.8 : 
      options.lineSpacing === 'compact' ? 1.2 : 
      1.5; // normal
    const lineHeight = fontSize * 0.352778 * lineSpacingFactor; // Convert pt to mm
    
    // Split content into paragraphs
    const paragraphs = chapter.content.split('\n\n');
    let y = margin + 50; // Starting position after chapter title
    
    paragraphs.forEach((paragraph, index) => {
      // Skip empty paragraphs
      if (!paragraph.trim()) return;
      
      // Handle drop caps for the first paragraph if enabled
      if (options.dropCaps && index === 0 && paragraph.length > 10) {
        const firstChar = paragraph.charAt(0);
        const restOfParagraph = paragraph.substring(1);
        
        // Draw the drop cap
        doc.setFontSize(fontSize * 3);
        doc.setFont(options.fontFamily || 'helvetica', 'bold');
        doc.text(firstChar, margin, y);
        
        // Calculate the width of the drop cap
        const dropCapWidth = doc.getTextWidth(firstChar);
        
        // Reset font for the rest of the paragraph
        doc.setFontSize(fontSize);
        doc.setFont(options.fontFamily || 'helvetica', 'normal');
        
        // Split the rest of the paragraph into lines with proper indentation
        const maxWidth = pageWidth - (2 * margin) - dropCapWidth;
        const lines = doc.splitTextToSize(restOfParagraph, maxWidth);
        
        // Handle first three lines (next to drop cap)
        const firstLines = lines.slice(0, 3);
        firstLines.forEach((line, lineIndex) => {
          doc.text(line, margin + dropCapWidth, y + (lineIndex * lineHeight));
        });
        
        // Handle remaining lines (full width)
        const remainingLines = lines.slice(3);
        if (remainingLines.length > 0) {
          remainingLines.forEach((line, lineIndex) => {
            doc.text(
              line, 
              margin, 
              y + (3 * lineHeight) + (lineIndex * lineHeight)
            );
          });
          
          // Update y position for the next paragraph
          y += (3 * lineHeight) + (remainingLines.length * lineHeight) + lineHeight/2;
        } else {
          // If there are only lines next to the drop cap
          y += 3 * lineHeight + lineHeight/2;
        }
      } else {
        // Regular paragraph without drop cap
        
        // Split into lines based on available width
        const maxWidth = pageWidth - (2 * margin);
        const lines = doc.splitTextToSize(paragraph, maxWidth);
        
        // Check if we need a new page
        if (y + (lines.length * lineHeight) > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        
        // Add text with proper alignment
        if (options.textAlignment === 'center') {
          lines.forEach((line, lineIndex) => {
            doc.text(line, pageWidth / 2, y + (lineIndex * lineHeight), { align: 'center' });
          });
        } else if (options.textAlignment === 'justified') {
          // jsPDF doesn't support justified text directly
          // For a real implementation, we'd need a custom approach
          lines.forEach((line, lineIndex) => {
            doc.text(line, margin, y + (lineIndex * lineHeight));
          });
        } else {
          // Default left alignment
          lines.forEach((line, lineIndex) => {
            doc.text(line, margin, y + (lineIndex * lineHeight));
          });
        }
        
        // Update y position for the next paragraph
        y += lines.length * lineHeight + lineHeight/2;
        
        // Add a new page if needed before the next paragraph
        if (y > pageHeight - margin && index < paragraphs.length - 1) {
          doc.addPage();
          y = margin;
        }
      }
    });
  });
};

/**
 * Add a credits page to the PDF
 */
const addCreditsPage = (
  doc: jsPDF,
  creditsContent: string,
  options: PDFExportOptions,
  beautification: BeautificationResult
) => {
  doc.addPage();
  
  const pageWidth = doc.internal.pageSize.width;
  const margin = 30;
  
  // Title
  doc.setFontSize(FONT_SIZES.subtitle);
  doc.setFont(options.fontFamily || 'helvetica', 'bold');
  doc.text('Credits', pageWidth / 2, margin + 10, { align: 'center' });
  
  // Content
  doc.setFontSize(options.fontSize || FONT_SIZES.bodyText);
  doc.setFont(options.fontFamily || 'helvetica', 'normal');
  
  const lines = doc.splitTextToSize(creditsContent, pageWidth - (2 * margin));
  
  // Calculate line height
  const fontSize = options.fontSize || FONT_SIZES.bodyText;
  const lineSpacingFactor = 
    options.lineSpacing === 'relaxed' ? 1.8 : 
    options.lineSpacing === 'compact' ? 1.2 : 
    1.5; // normal
  const lineHeight = fontSize * 0.352778 * lineSpacingFactor; // Convert pt to mm
  
  lines.forEach((line, index) => {
    doc.text(line, margin, margin + 30 + (index * lineHeight));
  });
};

/**
 * Convert hex color to RGB
 */
const hexToRgb = (hex: string): { r: number, g: number, b: number } => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  return { r, g, b };
};

/**
 * Lighten a color by a factor
 */
const lightenColor = (color: { r: number, g: number, b: number }, factor: number): { r: number, g: number, b: number } => {
  return {
    r: Math.min(255, Math.round(color.r + (255 - color.r) * factor)),
    g: Math.min(255, Math.round(color.g + (255 - color.g) * factor)),
    b: Math.min(255, Math.round(color.b + (255 - color.b) * factor))
  };
};

/**
 * Get default export options
 */
export const getDefaultExportOptions = (): PDFExportOptions => {
  return {
    showPageNumbers: true,
    includeMargins: true,
    fontFamily: 'helvetica',
    fontSize: 12,
    headerFooter: true,
    coverPage: true,
    colorScheme: 'default',
    pageSize: 'a4',
    orientation: 'portrait',
    decorativeElements: false,
    chapterDividers: true,
    dropCaps: false,
    textAlignment: 'left',
    lineSpacing: 'normal',
    pageMargins: 'normal',
    paperTextureEffect: false,
  };
};
