
import { BaseExporter, ExportResult } from "./baseExporter";
import { Book, HTMLExportOptions } from "@/lib/api/types";

export class HTMLExporter extends BaseExporter<HTMLExportOptions> {
  export(book: Book): ExportResult {
    try {
      if (!this.validateBook(book)) {
        return this.getDefaultResult('HTML');
      }
      
      console.log("Exporting to HTML format:", book.title);
      
      // Generate HTML content
      let content = `<!DOCTYPE html>
<html>
<head>
  <title>${book.title}</title>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    h2 { color: #555; margin-top: 30px; }
    .author { font-style: italic; color: #777; }
    .chapter { margin-top: 40px; }
  </style>
</head>
<body>
  <h1>${book.title}</h1>
  <p class="author">By: ${book.author || 'Unknown'}</p>
  <p><strong>Genre:</strong> ${book.genre || 'Unknown'}</p>
  
  <div class="description">
    <h2>Description</h2>
    <p>${book.description || ''}</p>
  </div>
  
  <div class="content">`;
      
      if (book.chapters && book.chapters.length > 0) {
        book.chapters.forEach((chapter, index) => {
          content += `
    <div class="chapter">
      <h2>Chapter ${index + 1}: ${chapter.title}</h2>
      <div>${chapter.content.replace(/\n/g, '<br>')}</div>
    </div>`;
        });
      }
      
      content += `
  </div>
</body>
</html>`;
      
      return {
        success: true,
        message: "Book exported to HTML successfully!",
        content
      };
    } catch (error) {
      console.error("Error exporting to HTML:", error);
      return {
        success: false,
        message: `Failed to export to HTML: ${(error as Error).message || 'Unknown error'}`
      };
    }
  }
}
