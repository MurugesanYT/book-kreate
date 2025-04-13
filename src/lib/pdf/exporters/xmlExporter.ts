
import { BaseExporter, ExportResult } from "./baseExporter";
import { Book, XMLExportOptions } from "@/lib/api/types";

export class XMLExporter extends BaseExporter<XMLExportOptions> {
  export(book: Book): ExportResult {
    try {
      if (!this.validateBook(book)) {
        return this.getDefaultResult('XML');
      }
      
      console.log("Exporting to XML format:", book.title);
      
      // Create XML header and doctype
      let xmlContent = '';
      
      // Add XML declaration
      xmlContent += `<?xml version="1.0" encoding="${this.options.encoding}"?>\n`;
      
      // Add DTD if specified
      if (this.options.dtdLocation) {
        xmlContent += `<!DOCTYPE ${this.options.documentType} SYSTEM "${this.options.dtdLocation}">\n`;
      }
      
      // Begin XML document based on schema
      switch (this.options.schema) {
        case 'docbook':
          xmlContent += this.generateDocbookXML(book);
          break;
        case 'tei':
          xmlContent += this.generateTEIXML(book);
          break;
        default:
          xmlContent += this.generateCustomXML(book);
          break;
      }
      
      return {
        success: true,
        message: "Book exported to XML successfully!",
        content: xmlContent
      };
    } catch (error) {
      console.error("Error exporting to XML:", error);
      return {
        success: false,
        message: `Failed to export to XML: ${(error as Error).message || 'Unknown error'}`
      };
    }
  }
  
  private generateDocbookXML(book: Book): string {
    const indent = this.options.prettyPrint ? '  ' : '';
    let xml = `<book xmlns="http://docbook.org/ns/docbook" version="${this.options.version}">\n`;
    
    // Add book info
    xml += `${indent}<info>\n`;
    xml += `${indent}${indent}<title>${this.escapeXML(book.title)}</title>\n`;
    
    if (book.author) {
      xml += `${indent}${indent}<author>\n`;
      xml += `${indent}${indent}${indent}<personname>${this.escapeXML(book.author)}</personname>\n`;
      xml += `${indent}${indent}</author>\n`;
    }
    
    if (book.description) {
      xml += `${indent}${indent}<abstract>\n`;
      xml += `${indent}${indent}${indent}<para>${this.escapeXML(book.description)}</para>\n`;
      xml += `${indent}${indent}</abstract>\n`;
    }
    
    xml += `${indent}</info>\n\n`;
    
    // Add chapters
    if (book.chapters && book.chapters.length > 0 && this.options.includeChapters) {
      book.chapters.forEach(chapter => {
        xml += `${indent}<chapter>\n`;
        xml += `${indent}${indent}<title>${this.escapeXML(chapter.title)}</title>\n`;
        
        const paragraphs = chapter.content.split('\n');
        paragraphs.forEach(para => {
          if (para.trim()) {
            xml += `${indent}${indent}<para>${this.escapeXML(para)}</para>\n`;
          }
        });
        
        xml += `${indent}</chapter>\n\n`;
      });
    } else if (book.content && book.content.length > 0) {
      xml += `${indent}<chapter>\n`;
      xml += `${indent}${indent}<title>Content</title>\n`;
      
      book.content.forEach(content => {
        const paragraphs = content.split('\n');
        paragraphs.forEach(para => {
          if (para.trim()) {
            xml += `${indent}${indent}<para>${this.escapeXML(para)}</para>\n`;
          }
        });
      });
      
      xml += `${indent}</chapter>\n`;
    }
    
    xml += `</book>`;
    return xml;
  }
  
  private generateTEIXML(book: Book): string {
    const indent = this.options.prettyPrint ? '  ' : '';
    let xml = `<TEI xmlns="http://www.tei-c.org/ns/1.0">\n`;
    
    // Add TEI header
    xml += `${indent}<teiHeader>\n`;
    xml += `${indent}${indent}<fileDesc>\n`;
    xml += `${indent}${indent}${indent}<titleStmt>\n`;
    xml += `${indent}${indent}${indent}${indent}<title>${this.escapeXML(book.title)}</title>\n`;
    
    if (book.author) {
      xml += `${indent}${indent}${indent}${indent}<author>${this.escapeXML(book.author)}</author>\n`;
    }
    
    xml += `${indent}${indent}${indent}</titleStmt>\n`;
    xml += `${indent}${indent}${indent}<publicationStmt>\n`;
    xml += `${indent}${indent}${indent}${indent}<p>Published by Book Kreate</p>\n`;
    xml += `${indent}${indent}${indent}</publicationStmt>\n`;
    xml += `${indent}${indent}${indent}<sourceDesc>\n`;
    xml += `${indent}${indent}${indent}${indent}<p>Created with Book Kreate XML Exporter</p>\n`;
    xml += `${indent}${indent}${indent}</sourceDesc>\n`;
    xml += `${indent}${indent}</fileDesc>\n`;
    xml += `${indent}</teiHeader>\n\n`;
    
    // Add text content
    xml += `${indent}<text>\n`;
    xml += `${indent}${indent}<body>\n`;
    
    // Add chapters
    if (book.chapters && book.chapters.length > 0 && this.options.includeChapters) {
      book.chapters.forEach(chapter => {
        xml += `${indent}${indent}${indent}<div type="chapter">\n`;
        xml += `${indent}${indent}${indent}${indent}<head>${this.escapeXML(chapter.title)}</head>\n`;
        
        const paragraphs = chapter.content.split('\n');
        paragraphs.forEach(para => {
          if (para.trim()) {
            xml += `${indent}${indent}${indent}${indent}<p>${this.escapeXML(para)}</p>\n`;
          }
        });
        
        xml += `${indent}${indent}${indent}</div>\n\n`;
      });
    } else if (book.content && book.content.length > 0) {
      xml += `${indent}${indent}${indent}<div>\n`;
      
      book.content.forEach(content => {
        const paragraphs = content.split('\n');
        paragraphs.forEach(para => {
          if (para.trim()) {
            xml += `${indent}${indent}${indent}${indent}<p>${this.escapeXML(para)}</p>\n`;
          }
        });
      });
      
      xml += `${indent}${indent}${indent}</div>\n`;
    }
    
    xml += `${indent}${indent}</body>\n`;
    xml += `${indent}</text>\n`;
    xml += `</TEI>`;
    
    return xml;
  }
  
  private generateCustomXML(book: Book): string {
    const indent = this.options.prettyPrint ? '  ' : '';
    let xml = `<book>\n`;
    
    // Add metadata
    if (this.options.includeMetadata) {
      xml += `${indent}<metadata>\n`;
      xml += `${indent}${indent}<title>${this.escapeXML(book.title)}</title>\n`;
      
      if (book.author) {
        xml += `${indent}${indent}<author>${this.escapeXML(book.author)}</author>\n`;
      }
      
      if (book.description) {
        xml += `${indent}${indent}<description>${this.escapeXML(book.description)}</description>\n`;
      }
      
      if (book.genre) {
        xml += `${indent}${indent}<genre>${this.escapeXML(book.genre)}</genre>\n`;
      }
      
      xml += `${indent}${indent}<created>${book.createdAt}</created>\n`;
      xml += `${indent}${indent}<updated>${book.updatedAt}</updated>\n`;
      xml += `${indent}</metadata>\n\n`;
    }
    
    // Add content
    xml += `${indent}<content>\n`;
    
    // Add chapters
    if (book.chapters && book.chapters.length > 0 && this.options.includeChapters) {
      book.chapters.forEach((chapter, index) => {
        xml += `${indent}${indent}<chapter id="${index + 1}">\n`;
        xml += `${indent}${indent}${indent}<title>${this.escapeXML(chapter.title)}</title>\n`;
        xml += `${indent}${indent}${indent}<order>${chapter.order}</order>\n`;
        
        if (this.options.includeSections) {
          const paragraphs = chapter.content.split('\n');
          paragraphs.forEach((para, paraIndex) => {
            if (para.trim()) {
              xml += `${indent}${indent}${indent}<paragraph id="${paraIndex + 1}">${this.escapeXML(para)}</paragraph>\n`;
            }
          });
        } else {
          xml += `${indent}${indent}${indent}<text>${this.escapeXML(chapter.content)}</text>\n`;
        }
        
        xml += `${indent}${indent}</chapter>\n\n`;
      });
    } else if (book.content && book.content.length > 0) {
      book.content.forEach((content, index) => {
        xml += `${indent}${indent}<section id="${index + 1}">\n`;
        
        if (this.options.includeSections) {
          const paragraphs = content.split('\n');
          paragraphs.forEach((para, paraIndex) => {
            if (para.trim()) {
              xml += `${indent}${indent}${indent}<paragraph id="${paraIndex + 1}">${this.escapeXML(para)}</paragraph>\n`;
            }
          });
        } else {
          xml += `${indent}${indent}${indent}<text>${this.escapeXML(content)}</text>\n`;
        }
        
        xml += `${indent}${indent}</section>\n\n`;
      });
    }
    
    xml += `${indent}</content>\n`;
    xml += `</book>`;
    
    return xml;
  }
  
  private escapeXML(text: string): string {
    if (!text) return '';
    
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
