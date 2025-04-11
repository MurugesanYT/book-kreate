
import { Book, ExportFormat, PDFExportOptions, EPUBExportOptions, DOCXExportOptions, MarkdownExportOptions, TXTExportOptions, HTMLExportOptions, RTFExportOptions } from "@/lib/api/types";
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
import { getAllThemeOptions, getThemeById, getThemesByCategory } from "./themes";

// Re-export theme functions
export { getAllThemeOptions, getThemeById, getThemesByCategory };

// Function to export a book in various formats
export const exportBook = (
  book: Book,
  format: ExportFormat,
  options: any
): { success: boolean; message: string; content?: string } => {
  try {
    console.log(`Exporting book in ${format} format`, book, options);
    
    switch (format) {
      case 'pdf':
        return new PDFExporter(options as PDFExportOptions).export(book);
      case 'epub':
        return new EPUBExporter(options as EPUBExportOptions).export(book);
      case 'mobi':
        return new MOBIExporter(options as EPUBExportOptions).export(book);
      case 'docx':
        return new DOCXExporter(options as DOCXExportOptions).export(book);
      case 'txt':
        return new TXTExporter(options as TXTExportOptions).export(book);
      case 'markdown':
        return new MarkdownExporter(options as MarkdownExportOptions).export(book);
      case 'html':
        return new HTMLExporter(options as HTMLExportOptions).export(book);
      case 'rtf':
        return new RTFExporter(options as RTFExportOptions).export(book);
      case 'azw3':
        return new AZW3Exporter(options).export(book);
      case 'fb2':
        return new FB2Exporter(options).export(book);
      case 'cbz':
        return new CBZExporter(options).export(book);
      case 'latex':
        return new LaTeXExporter(options).export(book);
      case 'odt':
        return new ODTExporter(options).export(book);
      case 'pages':
        return new PagesExporter(options).export(book);
      case 'xml':
        return new XMLExporter(options).export(book);
      case 'json':
        return new JSONExporter(options).export(book);
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
