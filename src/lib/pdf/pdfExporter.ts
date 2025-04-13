
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
import { ThemeOption } from "@/lib/api/types";
import themes, { getAllThemeOptions } from "./themes";

// Re-export the getAllThemeOptions function
export { getAllThemeOptions } from "./themes";

// Function to create default options for exporters
const createDefaultPDFOptions = (fontFamily: string, fontSize: number) => ({
  showPageNumbers: true,
  includeMargins: true,
  fontFamily,
  fontSize,
  headerFooter: false,
  coverPage: true,
  colorScheme: "classic",
  pageSize: "a4" as const,
  orientation: "portrait" as const,
  decorativeElements: false,
  chapterDividers: true,
  dropCaps: false,
  textAlignment: "left" as const,
  lineSpacing: "normal" as const,
  pageMargins: "normal" as const,
  paperTextureEffect: false
});

const createDefaultEPUBOptions = (fontFamily: string, fontSize: number) => ({
  includeTableOfContents: true,
  coverImage: true,
  fontFamily,
  fontSize,
  metadata: {
    author: "Unknown",
    language: "en"
  },
  styling: {
    fontFamily: fontFamily,
    fontSize: `${fontSize}pt`,
    lineHeight: "1.5",
    textAlign: "left" as const
  }
});

const createDefaultDOCXOptions = (fontFamily: string, fontSize: number) => ({
  includeTableOfContents: true,
  includeHeaderFooter: false,
  fontFamily,
  fontSize,
  styling: {
    fontFamily: fontFamily,
    fontSize: fontSize,
    lineSpacing: 1.15
  },
  pageSize: "a4" as const,
  margins: "normal" as const,
  orientation: "portrait" as const
});

const createDefaultTXTOptions = (fontFamily: string, fontSize: number) => ({
  encoding: "utf8" as const,
  lineBreaks: "lf" as const,
  fontFamily,
  fontSize
});

const createDefaultMarkdownOptions = (fontFamily: string, fontSize: number) => ({
  format: "standard" as const,
  includeMetadata: true,
  fontFamily,
  fontSize
});

const createDefaultHTMLOptions = (fontFamily: string, fontSize: number) => ({
  responsive: true,
  includeCSS: true,
  fontFamily,
  fontSize
});

const createDefaultRTFOptions = (fontFamily: string, fontSize: number) => ({
  includeTableOfContents: true,
  includeHeaderFooter: false,
  fontFamily,
  fontSize,
  styling: {
    fontFamily: fontFamily,
    fontSize: fontSize,
    lineSpacing: 1.15
  },
  pageSize: "a4" as const,
  margins: "normal" as const,
  embedImages: true,
  colorSupport: "full" as const,
  specialCharacters: true
});

const createDefaultAZW3Options = (fontFamily: string, fontSize: number) => ({
  includeTableOfContents: true,
  coverImage: true,
  fontFamily,
  fontSize,
  metadata: {
    author: "Unknown",
    language: "en"
  },
  formatting: {
    fontFamily: fontFamily,
    fontSize: `${fontSize}pt`,
    lineHeight: "1.5"
  },
  enhancedTypesetting: true,
  kindlePreviewer: false,
  pageNumbering: true
});

const createDefaultFB2Options = (fontFamily: string, fontSize: number) => ({
  includeTableOfContents: true,
  coverImage: true,
  fontFamily,
  fontSize,
  metadata: {
    author: "Unknown",
    language: "en",
    genre: "fiction"
  },
  includeAnnotation: true,
  includeSections: true,
  xhtmlSupport: true
});

const createDefaultCBZOptions = (fontFamily: string, fontSize: number) => ({
  coverImage: true,
  imageQuality: "medium" as const,
  pageSize: "standard" as const,
  pageNumbering: true,
  fontFamily,
  fontSize,
  metadata: {
    title: "Book",
    author: "Unknown"
  },
  compressionLevel: "medium" as const
});

const createDefaultLaTeXOptions = (fontFamily: string, fontSize: number) => ({
  documentClass: "book" as const,
  fontSize: fontSize,
  paperSize: "a4paper" as const,
  twoSided: false,
  includeTableOfContents: true,
  includeIndex: false,
  includeBibliography: false,
  template: "novel" as const,
  mathSupport: false,
  chapterStyle: "default" as const,
  fontPackage: "default" as const,
  fontFamily
});

const createDefaultODTOptions = (fontFamily: string, fontSize: number) => ({
  includeTableOfContents: true,
  includeCoverPage: true,
  pageStyle: "standard" as const,
  fontFamily,
  fontSize,
  lineSpacing: 1.15,
  margins: "normal" as const,
  headerFooter: false,
  metadata: {
    author: "Unknown"
  },
  styles: {
    headings: "default" as const,
    paragraphs: "default" as const
  },
  includeImages: true,
  compatibility: "standard" as const
});

const createDefaultPagesOptions = (fontFamily: string, fontSize: number) => ({
  template: "book" as const,
  fontFamily,
  fontSize,
  pageSize: "a4" as const,
  orientation: "portrait" as const,
  includeTableOfContents: true,
  headerFooter: false,
  columnLayout: "single" as const,
  lineSpacing: 1.15,
  includePageNumbers: true,
  includeImages: true,
  coverPage: true,
  appleCompatibilityLevel: "latest" as const
});

const createDefaultXMLOptions = (fontFamily: string, fontSize: number) => ({
  documentType: "book" as const,
  schema: "docbook" as const,
  version: "5.0" as const,
  includeMetadata: true,
  prettyPrint: true,
  encoding: "utf-8" as const,
  validateOnExport: false,
  includeChapters: true,
  includeSections: true,
  outputFormat: "xml" as const,
  fontFamily,
  fontSize
});

const createDefaultJSONOptions = (fontFamily: string, fontSize: number) => ({
  structure: "nested" as const,
  includeMetadata: true,
  includeContent: true,
  includeFormatting: true,
  prettyPrint: true,
  indentation: 2,
  splitByChapter: false,
  includeImages: true,
  imageHandling: "urls" as const,
  schema: "standard" as const,
  includeStatistics: false,
  fontFamily,
  fontSize
});

// Function to export a book in various formats
export const exportBook = (
  book: Book,
  format: ExportFormat,
  options: any
): { success: boolean; message: string; content?: string } => {
  try {
    console.log(`Exporting book in ${format} format`, book, options);
    
    // Get basic options
    const fontFamily = options.fontFamily || 'helvetica';
    const fontSize = options.fontSize || 12;
    
    switch (format) {
      case 'pdf':
        return new PDFExporter(createDefaultPDFOptions(fontFamily, fontSize)).export(book);
      case 'epub':
        return new EPUBExporter(createDefaultEPUBOptions(fontFamily, fontSize)).export(book);
      case 'mobi':
        return new MOBIExporter(createDefaultEPUBOptions(fontFamily, fontSize)).export(book);
      case 'docx':
        return new DOCXExporter(createDefaultDOCXOptions(fontFamily, fontSize)).export(book);
      case 'txt':
        return new TXTExporter(createDefaultTXTOptions(fontFamily, fontSize)).export(book);
      case 'markdown':
        return new MarkdownExporter(createDefaultMarkdownOptions(fontFamily, fontSize)).export(book);
      case 'html':
        return new HTMLExporter(createDefaultHTMLOptions(fontFamily, fontSize)).export(book);
      case 'rtf':
        return new RTFExporter(createDefaultRTFOptions(fontFamily, fontSize)).export(book);
      case 'azw3':
        return new AZW3Exporter(createDefaultAZW3Options(fontFamily, fontSize)).export(book);
      case 'fb2':
        return new FB2Exporter(createDefaultFB2Options(fontFamily, fontSize)).export(book);
      case 'cbz':
        return new CBZExporter(createDefaultCBZOptions(fontFamily, fontSize)).export(book);
      case 'latex':
        return new LaTeXExporter(createDefaultLaTeXOptions(fontFamily, fontSize)).export(book);
      case 'odt':
        return new ODTExporter(createDefaultODTOptions(fontFamily, fontSize)).export(book);
      case 'pages':
        return new PagesExporter(createDefaultPagesOptions(fontFamily, fontSize)).export(book);
      case 'xml':
        return new XMLExporter(createDefaultXMLOptions(fontFamily, fontSize)).export(book);
      case 'json':
        return new JSONExporter(createDefaultJSONOptions(fontFamily, fontSize)).export(book);
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
