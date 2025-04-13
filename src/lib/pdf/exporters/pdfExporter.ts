
import { jsPDF } from "jspdf";
import { BaseExporter, ExportResult } from "./baseExporter";
import { Book, PDFExportOptions } from "@/lib/api/types";

export class PDFExporter extends BaseExporter<PDFExportOptions> {
  export(book: Book): ExportResult {
    try {
      if (!this.validateBook(book)) {
        return this.getDefaultResult('PDF');
      }
      
      console.log("Exporting to PDF format:", book.title);
      
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const fontSize = this.options.fontSize || 12;
      const fontFamily = this.options.fontFamily || 'helvetica';
      
      // Set default font
      doc.setFont(fontFamily);
      doc.setFontSize(fontSize);
      
      // Add title page
      doc.text(book.title, pageWidth / 2, 40, { align: 'center' });
      
      if (book.author) {
        doc.setFontSize(fontSize * 0.8);
        doc.text(`By: ${book.author}`, pageWidth / 2, 50, { align: 'center' });
      }
      
      if (book.description) {
        doc.setFontSize(fontSize * 0.8);
        const descLines = doc.splitTextToSize(book.description, pageWidth - margin * 2);
        doc.text(descLines, pageWidth / 2, 70, { align: 'center' });
      }
      
      // Add cover page if available
      if (book.coverPage) {
        doc.addPage();
        doc.setFontSize(fontSize * 1.2);
        doc.text("Cover Page", pageWidth / 2, 20, { align: 'center' });
        
        doc.setFontSize(fontSize);
        const coverLines = doc.splitTextToSize(book.coverPage, pageWidth - margin * 2);
        doc.text(coverLines, margin, 40);
      }
      
      // Add chapters
      if (book.chapters && book.chapters.length > 0) {
        book.chapters.forEach((chapter, index) => {
          doc.addPage();
          
          // Chapter title
          doc.setFontSize(fontSize * 1.2);
          doc.text(`Chapter ${index + 1}: ${chapter.title}`, margin, 20);
          
          // Chapter content
          doc.setFontSize(fontSize);
          
          if (chapter.content) {
            const paragraphs = chapter.content.split('\n\n');
            let yPosition = 30;
            
            paragraphs.forEach(paragraph => {
              // Check if we need a new page
              if (yPosition > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                yPosition = margin;
              }
              
              const contentLines = doc.splitTextToSize(paragraph, pageWidth - margin * 2);
              doc.text(contentLines, margin, yPosition);
              yPosition += (contentLines.length * fontSize * 0.35) + 5;
            });
          }
        });
      }
      
      // Add credits page if available
      if (book.creditsPage) {
        doc.addPage();
        doc.setFontSize(fontSize * 1.2);
        doc.text("Credits", pageWidth / 2, 20, { align: 'center' });
        
        doc.setFontSize(fontSize);
        const creditsLines = doc.splitTextToSize(book.creditsPage, pageWidth - margin * 2);
        doc.text(creditsLines, margin, 40);
      }
      
      // Get the PDF as base64
      const pdfBase64 = doc.output('datauristring');
      
      return {
        success: true,
        message: "Book exported to PDF successfully!",
        content: pdfBase64
      };
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      return {
        success: false,
        message: `Failed to export to PDF: ${(error as Error).message || 'Unknown error'}`
      };
    }
  }
}
