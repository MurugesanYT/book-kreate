
import { BaseExporter, ExportResult } from "./baseExporter";
import { Book, ODTExportOptions } from "@/lib/api/types";

export class ODTExporter extends BaseExporter<ODTExportOptions> {
  export(book: Book): ExportResult {
    try {
      if (!this.validateBook(book)) {
        return this.getDefaultResult('ODT');
      }
      
      console.log("Exporting to ODT format:", book.title);
      
      // Generate a text representation of what would be in the ODT file
      let content = `OPENDOCUMENT TEXT FILE\n\n`;
      
      // Add title page
      content += `Title: ${book.title}\n`;
      content += `Author: ${this.options.metadata.author || book.author || 'Anonymous'}\n`;
      if (this.options.metadata.subject) {
        content += `Subject: ${this.options.metadata.subject}\n`;
      }
      if (this.options.metadata.keywords && this.options.metadata.keywords.length > 0) {
        content += `Keywords: ${this.options.metadata.keywords.join(', ')}\n`;
      }
      content += `\n`;
      
      // Add document styling information
      content += `Document Styling:\n`;
      content += `Page Style: ${this.options.pageStyle}\n`;
      content += `Font Family: ${this.options.fontFamily}\n`;
      content += `Font Size: ${this.options.fontSize}pt\n`;
      content += `Line Spacing: ${this.options.lineSpacing}\n`;
      content += `Margins: ${this.options.margins}\n`;
      content += `Header/Footer: ${this.options.headerFooter ? 'Enabled' : 'Disabled'}\n`;
      content += `Heading Style: ${this.options.styles.headings}\n`;
      content += `Paragraph Style: ${this.options.styles.paragraphs}\n`;
      content += `Compatibility Mode: ${this.options.compatibility}\n\n`;
      
      // Add table of contents if requested
      if (this.options.includeTableOfContents) {
        content += `TABLE OF CONTENTS\n`;
        if (book.chapters && book.chapters.length > 0) {
          book.chapters.forEach((chapter, index) => {
            content += `Chapter ${index + 1}: ${chapter.title}............................Page ${index + 1}\n`;
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
      
      // Include cover page information if requested
      if (this.options.includeCoverPage && book.coverImage) {
        content += `\n[Cover Page Image: ${book.coverImage}]\n`;
      }
      
      return {
        success: true,
        message: "Book exported to ODT successfully!",
        content: content
      };
    } catch (error) {
      console.error("Error exporting to ODT:", error);
      return {
        success: false,
        message: `Failed to export to ODT: ${(error as Error).message || 'Unknown error'}`
      };
    }
  }
}
