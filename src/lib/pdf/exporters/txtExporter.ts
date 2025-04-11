
import { BaseExporter, ExportResult } from "./baseExporter";
import { Book, TXTExportOptions } from "@/lib/api/types";

export class TXTExporter extends BaseExporter<TXTExportOptions> {
  export(book: Book): ExportResult {
    try {
      if (!this.validateBook(book)) {
        return this.getDefaultResult('TXT');
      }
      
      console.log("Exporting to TXT format:", book.title);
      
      // Generate plain text content
      let content = `${book.title}\n\nBy: ${book.author || 'Unknown'}\n\n`;
      content += `Description: ${book.description || ''}\n\n`;
      
      if (book.chapters && book.chapters.length > 0) {
        book.chapters.forEach((chapter, index) => {
          content += `CHAPTER ${index + 1}: ${chapter.title}\n\n`;
          content += `${chapter.content}\n\n`;
        });
      }
      
      return {
        success: true,
        message: "Book exported to TXT successfully!",
        content
      };
    } catch (error) {
      console.error("Error exporting to TXT:", error);
      return {
        success: false,
        message: `Failed to export to TXT: ${(error as Error).message || 'Unknown error'}`
      };
    }
  }
}
