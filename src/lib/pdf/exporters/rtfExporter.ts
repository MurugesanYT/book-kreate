
import { BaseExporter, ExportResult } from "./baseExporter";
import { Book, RTFExportOptions } from "@/lib/api/types";

export class RTFExporter extends BaseExporter<RTFExportOptions> {
  export(book: Book): ExportResult {
    try {
      if (!this.validateBook(book)) {
        return this.getDefaultResult('RTF');
      }
      
      console.log("Exporting to RTF format:", book.title);
      
      // Create a simple RTF document header
      let rtfContent = `{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang1033
{\\fonttbl{\\f0\\${this.getRTFFontFamily(this.options.styling.fontFamily)}\\fprq2\\fcharset0 ${this.options.styling.fontFamily};}}
{\\colortbl;\\red0\\green0\\blue0;}
{\\info{\\title ${book.title}}{\\author ${book.author || 'Anonymous'}}}
\\viewkind4\\uc1\\pard\\tx720\\tx1440\\tx2160\\tx2880\\tx3600\\tx4320\\f0\\fs${this.options.styling.fontSize * 2} 
`;

      // Add title page
      rtfContent += `\\pard\\qc\\b\\fs${this.options.styling.fontSize * 3} ${this.escapeRTF(book.title)}\\par
\\fs${this.options.styling.fontSize * 2} By ${this.escapeRTF(book.author || 'Anonymous')}\\b0\\par
\\pard\\par\\par
`;

      // Add table of contents if requested
      if (this.options.includeTableOfContents && book.chapters && book.chapters.length > 0) {
        rtfContent += `\\pard\\qc\\b\\fs${this.options.styling.fontSize * 2.5} TABLE OF CONTENTS\\b0\\par\\pard\\par
`;
        
        book.chapters.forEach((chapter, index) => {
          rtfContent += `\\pard Chapter ${index + 1}: ${this.escapeRTF(chapter.title)}\\par
`;
        });
        
        rtfContent += `\\par\\par
`;
      }
      
      // Add chapters
      if (book.chapters && book.chapters.length > 0) {
        book.chapters.forEach((chapter, index) => {
          rtfContent += `\\page\\pard\\qc\\b\\fs${this.options.styling.fontSize * 2.5} CHAPTER ${index + 1}\\par
${this.escapeRTF(chapter.title)}\\b0\\par\\pard\\par
`;
          
          const paragraphs = chapter.content.split('\n');
          paragraphs.forEach(paragraph => {
            if (paragraph.trim()) {
              rtfContent += `\\pard\\sl${Math.round(this.options.styling.lineSpacing * 240)} ${this.escapeRTF(paragraph)}\\par
`;
            }
          });
          
          rtfContent += `\\par
`;
        });
      } else if (book.content && book.content.length > 0) {
        // If no chapters but content is available
        book.content.forEach(content => {
          const paragraphs = content.split('\n');
          paragraphs.forEach(paragraph => {
            if (paragraph.trim()) {
              rtfContent += `\\pard\\sl${Math.round(this.options.styling.lineSpacing * 240)} ${this.escapeRTF(paragraph)}\\par
`;
            }
          });
        });
      }
      
      // Close the RTF document
      rtfContent += `}`;
      
      return {
        success: true,
        message: "Book exported to RTF successfully!",
        content: rtfContent
      };
    } catch (error) {
      console.error("Error exporting to RTF:", error);
      return {
        success: false,
        message: `Failed to export to RTF: ${(error as Error).message || 'Unknown error'}`
      };
    }
  }
  
  private getRTFFontFamily(fontFamily: string): string {
    // Map common font names to RTF font family groups
    const fontMap: {[key: string]: string} = {
      'arial': 'fswiss',
      'helvetica': 'fswiss',
      'times': 'froman',
      'times new roman': 'froman',
      'courier': 'fmodern',
      'courier new': 'fmodern',
      'symbol': 'ftech',
      'wingdings': 'fdecor'
    };
    
    return fontMap[fontFamily.toLowerCase()] || 'fnil';
  }
  
  private escapeRTF(text: string): string {
    if (!text) return '';
    
    return text
      .replace(/\\/g, '\\\\')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/\n/g, '\\par ')
      .replace(/\t/g, '\\tab ')
      .replace(/\r/g, '')
      .replace(/'/g, '\\\'92')
      .replace(/"/g, '\\\'94')
      .replace(/>/g, '\\\'3E')
      .replace(/</g, '\\\'3C');
  }
}
