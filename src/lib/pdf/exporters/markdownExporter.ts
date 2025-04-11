
import { BaseExporter, ExportResult } from "./baseExporter";
import { Book, MarkdownExportOptions } from "@/lib/api/types";

export class MarkdownExporter extends BaseExporter<MarkdownExportOptions> {
  export(book: Book): ExportResult {
    try {
      if (!this.validateBook(book)) {
        return this.getDefaultResult('Markdown');
      }
      
      console.log("Exporting to Markdown format:", book.title);
      
      // Generate Markdown content
      let content = `# ${book.title}\n\n`;
      content += `*By: ${book.author || 'Unknown'}*\n\n`;
      content += `**Genre:** ${book.genre || 'Unknown'}\n\n`;
      content += `## Description\n\n${book.description || ''}\n\n`;
      
      if (book.chapters && book.chapters.length > 0) {
        book.chapters.forEach((chapter, index) => {
          content += `## Chapter ${index + 1}: ${chapter.title}\n\n`;
          content += `${chapter.content}\n\n`;
        });
      }
      
      return {
        success: true,
        message: "Book exported to Markdown successfully!",
        content
      };
    } catch (error) {
      console.error("Error exporting to Markdown:", error);
      return {
        success: false,
        message: `Failed to export to Markdown: ${(error as Error).message || 'Unknown error'}`
      };
    }
  }
}
