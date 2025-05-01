
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
    body { font-family: ${this.options?.fontFamily || 'Arial, sans-serif'}; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    h2 { color: #555; margin-top: 30px; }
    .author { font-style: italic; color: #777; }
    .chapter { margin-top: 40px; }
    .toc { margin: 30px 0; }
    .toc-item { margin: 5px 0; }
    .character-list { margin-top: 40px; background-color: #f9f9f9; padding: 20px; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>${book.title}</h1>
  <p class="author">By: ${book.author || 'Unknown'}</p>
  <p><strong>Genre:</strong> ${book.genre || 'Unknown'}</p>
  
  <div class="description">
    <h2>Description</h2>
    <p>${book.description || ''}</p>
  </div>`;
      
      // Add table of contents
      if (book.tableOfContents) {
        content += `
  <div class="toc">
    <h2>Table of Contents</h2>
    <div>${book.tableOfContents.replace(/\n/g, '<br>')}</div>
  </div>`;
      } else if (book.chapters && book.chapters.length > 0) {
        content += `
  <div class="toc">
    <h2>Table of Contents</h2>
    <ul>`;
        book.chapters.forEach((chapter, index) => {
          content += `
      <li class="toc-item"><a href="#chapter-${index + 1}">${chapter.title}</a></li>`;
        });
        content += `
    </ul>
  </div>`;
      }
      
      // Add chapters
      if (book.chapters && book.chapters.length > 0) {
        content += `
  <div class="content">`;
        book.chapters.forEach((chapter, index) => {
          content += `
    <div class="chapter" id="chapter-${index + 1}">
      <h2>Chapter ${index + 1}: ${chapter.title}</h2>
      <div>${chapter.content.replace(/\n/g, '<br>')}</div>
    </div>`;
        });
        content += `
  </div>`;
      }
      
      // Add character list
      if (book.characterList) {
        content += `
  <div class="character-list">
    <h2>Character List</h2>
    <div>${book.characterList.replace(/\n/g, '<br>')}</div>
  </div>`;
      }
      
      content += `
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
