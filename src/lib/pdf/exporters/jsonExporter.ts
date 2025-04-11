
import { BaseExporter, ExportResult } from "./baseExporter";
import { Book, JSONExportOptions } from "@/lib/api/types";

export class JSONExporter extends BaseExporter<JSONExportOptions> {
  export(book: Book): ExportResult {
    try {
      if (!this.validateBook(book)) {
        return this.getDefaultResult('JSON');
      }
      
      console.log("Exporting to JSON format:", book.title);
      
      // Generate JSON content
      const content = JSON.stringify(book, null, 2);
      
      return {
        success: true,
        message: "Book exported to JSON successfully!",
        content
      };
    } catch (error) {
      console.error("Error exporting to JSON:", error);
      return {
        success: false,
        message: `Failed to export to JSON: ${(error as Error).message || 'Unknown error'}`
      };
    }
  }
}
