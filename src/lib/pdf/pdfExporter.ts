
import { Book, ExportFormat } from "@/lib/api/types";
import { PDFExporter } from "./exporters/pdfExporter";
import { EPUBExporter } from "./exporters/epubExporter";
import { MOBIExporter } from "./exporters/mobiExporter";
import { DOCXExporter } from "./exporters/docxExporter";
import { TXTExporter } from "./exporters/txtExporter";
import { MarkdownExporter } from "./exporters/markdownExporter";
import { HTMLExporter } from "./exporters/htmlExporter";
import { RTFExporter } from "./exporters/rtfExporter";
import { AZW3Exporter } from "./exporters/azw3Exporter";
import { FB2Exporter } from "./exporters/fb2Exporter";
import { CBZExporter } from "./exporters/cbzExporter";
import { LaTeXExporter } from "./exporters/latexExporter";
import { ODTExporter } from "./exporters/odtExporter";
import { PagesExporter } from "./exporters/pagesExporter";
import { XMLExporter } from "./exporters/xmlExporter";
import { JSONExporter } from "./exporters/jsonExporter";

// Function to export a book in various formats
export const exportBook = (
  book: Book,
  format: ExportFormat,
  options: any
): { success: boolean; message: string; content?: string } => {
  try {
    console.log(`Exporting book in ${format} format`, book, options);
    
    // Basic options without beautification
    const basicOptions = {
      fontFamily: options.fontFamily || 'helvetica',
      fontSize: options.fontSize || 12
    };
    
    switch (format) {
      case 'pdf':
        return new PDFExporter(basicOptions).export(book);
      case 'epub':
        return new EPUBExporter(basicOptions).export(book);
      case 'mobi':
        return new MOBIExporter(basicOptions).export(book);
      case 'docx':
        return new DOCXExporter(basicOptions).export(book);
      case 'txt':
        return new TXTExporter(basicOptions).export(book);
      case 'markdown':
        return new MarkdownExporter(basicOptions).export(book);
      case 'html':
        return new HTMLExporter(basicOptions).export(book);
      case 'rtf':
        return new RTFExporter(basicOptions).export(book);
      case 'azw3':
        return new AZW3Exporter(basicOptions).export(book);
      case 'fb2':
        return new FB2Exporter(basicOptions).export(book);
      case 'cbz':
        return new CBZExporter(basicOptions).export(book);
      case 'latex':
        return new LaTeXExporter(basicOptions).export(book);
      case 'odt':
        return new ODTExporter(basicOptions).export(book);
      case 'pages':
        return new PagesExporter(basicOptions).export(book);
      case 'xml':
        return new XMLExporter(basicOptions).export(book);
      case 'json':
        return new JSONExporter(basicOptions).export(book);
      default:
        return { 
          success: false, 
          message: `Unsupported export format: ${format}`
        };
    }
  } catch (error) {
    console.error(`Error exporting book to ${format}:`, error);
    return { 
      success: false, 
      message: `Failed to export book to ${format}: ${(error as Error).message || 'Unknown error'}`
    };
  }
};
