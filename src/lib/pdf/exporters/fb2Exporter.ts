
import { BaseExporter, ExportResult } from "./baseExporter";
import { Book, FB2ExportOptions } from "@/lib/api/types";

export class FB2Exporter extends BaseExporter<FB2ExportOptions> {
  export(book: Book): ExportResult {
    try {
      if (!this.validateBook(book)) {
        return this.getDefaultResult('FB2');
      }
      
      console.log("Exporting to FB2 format:", book.title);
      
      // Start building the FB2 XML structure
      let content = `<?xml version="1.0" encoding="UTF-8"?>
<FictionBook xmlns="http://www.gribuser.ru/xml/fictionbook/2.0">
  <description>
    <title-info>
      <genre>${this.options.metadata.genre || 'fiction'}</genre>
      <author>
        <first-name>${this.extractFirstName(this.options.metadata.author || book.author || 'Anonymous')}</first-name>
        <last-name>${this.extractLastName(this.options.metadata.author || book.author || 'Anonymous')}</last-name>
      </author>
      <book-title>${book.title}</book-title>
      <lang>${this.options.metadata.language}</lang>
      ${book.coverImage ? `<coverpage><image href="#cover.jpg"/></coverpage>` : ''}
      ${this.options.includeAnnotation && book.description ? `<annotation><p>${book.description}</p></annotation>` : ''}
    </title-info>
    <document-info>
      <author>
        <nickname>Book Kreate</nickname>
      </author>
      <program-used>Book Kreate FB2 Exporter</program-used>
      <date>${new Date().toISOString().split('T')[0]}</date>
      <id>${book.id || 'unknown-id'}</id>
      <version>1.0</version>
    </document-info>
  </description>
  
  <body>
`;
      
      // Add book content
      if (book.chapters && book.chapters.length > 0) {
        if (this.options.includeTableOfContents) {
          content += `    <section>
      <title><p>Table of Contents</p></title>
`;
          
          book.chapters.forEach((chapter, index) => {
            content += `      <p><a href="#chapter${index + 1}">${chapter.title}</a></p>\n`;
          });
          
          content += `    </section>\n\n`;
        }
        
        book.chapters.forEach((chapter, index) => {
          content += `    <section id="chapter${index + 1}">
      <title><p>${chapter.title}</p></title>
${this.formatFB2Content(chapter.content)}
    </section>
`;
        });
      } else if (book.content && book.content.length > 0) {
        content += `    <section>
      <title><p>${book.title}</p></title>
${this.formatFB2Content(book.content.join('\n\n'))}
    </section>
`;
      }
      
      // Close the FB2 structure
      content += `  </body>
</FictionBook>`;
      
      return {
        success: true,
        message: "Book exported to FB2 successfully!",
        content: content
      };
    } catch (error) {
      console.error("Error exporting to FB2:", error);
      return {
        success: false,
        message: `Failed to export to FB2: ${(error as Error).message || 'Unknown error'}`
      };
    }
  }
  
  private extractFirstName(fullName: string): string {
    const parts = fullName.trim().split(' ');
    return parts[0] || '';
  }
  
  private extractLastName(fullName: string): string {
    const parts = fullName.trim().split(' ');
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  }
  
  private formatFB2Content(content: string): string {
    // Basic formatting for FB2 XML
    if (!content) return '';
    
    // Split into paragraphs
    const paragraphs = content.split('\n');
    return paragraphs.map(para => {
      if (para.trim() === '') return '';
      return `      <p>${this.escapeXML(para.trim())}</p>`;
    }).join('\n');
  }
  
  private escapeXML(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
