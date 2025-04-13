
import { BaseExporter, ExportResult } from "./baseExporter";
import { Book, EPUBExportOptions } from "@/lib/api/types";

export class EPUBExporter extends BaseExporter<EPUBExportOptions> {
  export(book: Book): ExportResult {
    try {
      if (!this.validateBook(book)) {
        return this.getDefaultResult('EPUB');
      }
      
      console.log("Exporting to EPUB format:", book.title);
      
      // Generate a text representation of what would be in the EPUB file
      let content = `EPUB E-BOOK\n\n`;
      
      // Add metadata
      content += `Title: ${book.title}\n`;
      content += `Author: ${this.options.metadata.author || book.author || 'Anonymous'}\n`;
      content += `Language: ${this.options.metadata.language}\n`;
      if (this.options.metadata.publisher) {
        content += `Publisher: ${this.options.metadata.publisher}\n`;
      }
      if (this.options.metadata.rights) {
        content += `Rights: ${this.options.metadata.rights}\n`;
      }
      content += `\n`;
      
      // Add CSS styling information
      content += `Styling:\n`;
      content += `Font Family: ${this.options.styling.fontFamily}\n`;
      content += `Font Size: ${this.options.styling.fontSize}\n`;
      content += `Line Height: ${this.options.styling.lineHeight}\n`;
      content += `Text Alignment: ${this.options.styling.textAlign}\n\n`;
      
      // Add table of contents if requested
      if (this.options.includeTableOfContents) {
        content += `TABLE OF CONTENTS\n`;
        if (book.chapters && book.chapters.length > 0) {
          book.chapters.forEach((chapter, index) => {
            content += `Chapter ${index + 1}: ${chapter.title}\n`;
          });
          content += `\n\n`;
        }
      }
      
      // Add chapters
      if (book.chapters && book.chapters.length > 0) {
        book.chapters.forEach((chapter, index) => {
          content += `CHAPTER ${index + 1}: ${chapter.title}\n\n`;
          content += `${chapter.content}\n\n`;
        });
      } else if (book.content && book.content.length > 0) {
        // If no chapters but content is available
        content += book.content.join('\n\n');
      }
      
      // Add cover image information if requested
      if (this.options.coverImage && book.coverImage) {
        content += `\n[Cover Image: ${book.coverImage}]\n`;
      }
      
      return {
        success: true,
        message: "Book exported to EPUB successfully!",
        content: content
      };
    } catch (error) {
      console.error("Error exporting to EPUB:", error);
      return {
        success: false,
        message: `Failed to export to EPUB: ${(error as Error).message || 'Unknown error'}`
      };
    }
  }
}
