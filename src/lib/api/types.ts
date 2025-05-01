// Common types used across API services

export type BookItemType = 'cover' | 'chapter' | 'credits';

// Add ThemeColors interface
export interface ThemeColors {
  primary: string;
  background: string;
  accent: string;
}

// Add ThemeOption interface
export interface ThemeOption {
  id: string;
  name: string;
  colors: ThemeColors;
}

// Add Book interface
export interface Book {
  id: string;
  title: string;
  author?: string;
  content: string[];
  description?: string;
  coverImage?: string;
  coverPage?: string;  // Added for cover page content
  creditsPage?: string; // Added for credits page content
  tableOfContents?: string; // Added for table of contents
  characterList?: string; // Added for character list
  chapters?: Chapter[];
  genre?: string;
  published?: boolean;
  publishedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Credit {
  role: string;
  name: string;
}

// Update BaseExporterOptions to be a common base type for all exporters
export interface BaseExporterOptions {
  fontFamily?: string;
  fontSize?: number;
}

export interface BookData {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  coverPage?: string;
  chapters?: any[];
  creditsPage?: string;
  template?: string;
  credits?: {
    role: string;
    name: string;
  }[];
  genre?: string;
  status: "draft" | "published";
  coverImage?: string;
  publishedDate?: string;
  characterList?: string; // Added missing property
  tableOfContents?: string; // Added missing property
  createdAt: string;
  updatedAt: string;
}

export interface ChapterItem {
  title: string;
  description: string;
}

export interface PlanItem {
  id: string;
  title: string;
  type: BookItemType;
  status: 'pending' | 'ongoing' | 'completed';
  description?: string;
  content?: string;
}

// Export Formats
export type ExportFormat = 'pdf' | 'epub' | 'mobi' | 'docx' | 'txt' | 'html' | 'markdown' | 'rtf' | 'azw3' | 'fb2' | 'cbz' | 'audio' | 'latex' | 'odt' | 'pages' | 'xml' | 'json';

// Update all export option interfaces to extend BaseExporterOptions
export interface PDFExportOptions extends BaseExporterOptions {
  showPageNumbers: boolean;
  includeMargins: boolean;
  headerFooter: boolean;
  coverPage: boolean;
  colorScheme: string;
  pageSize: "a4" | "letter" | "legal" | "a5";
  orientation: "portrait" | "landscape";
  decorativeElements: boolean;
  chapterDividers: boolean;
  dropCaps: boolean;
  textAlignment: "left" | "justified" | "center";
  lineSpacing: "normal" | "relaxed" | "compact";
  pageMargins: "normal" | "wide" | "narrow";
  paperTextureEffect: boolean;
}

export interface EPUBExportOptions extends BaseExporterOptions {
  includeTableOfContents: boolean;
  coverImage: boolean;
  metadata: {
    author: string;
    publisher?: string;
    language: string;
    rights?: string;
    identifier?: string;
  };
  styling: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    textAlign: 'left' | 'justified' | 'center';
  };
  enhancedNavigation?: boolean;
  embedFonts?: boolean;
  generateCSS?: boolean;
  chapterPageBreaks?: boolean;
  customStyling?: boolean;
  interactiveElements?: boolean;
  accessibility?: {
    aria: boolean;
    imageAlt: boolean;
    semanticMarkup: boolean;
  };
}

export interface DOCXExportOptions extends BaseExporterOptions {
  includeTableOfContents: boolean;
  includeHeaderFooter: boolean;
  styling: {
    fontFamily: string;
    fontSize: number;
    lineSpacing: number;
  };
  pageSize: "a4" | "letter" | "legal";
  margins: "normal" | "narrow" | "moderate" | "wide";
  orientation: "portrait" | "landscape";
  trackChanges?: boolean;
  documentProtection?: boolean;
  watermark?: string;
  styleSet?: "modern" | "classic" | "elegant" | "minimal";
  highlightedSections?: boolean;
  autoHyphenation?: boolean;
  footnotesEndnotes?: boolean;
}

export interface HTMLExportOptions extends BaseExporterOptions {
  responsive: boolean;
  includeCSS: boolean;
  darkModeSupport?: boolean;
  htmlVersion?: "html5" | "xhtml";
  includeFonts?: boolean;
  interactiveElements?: boolean;
  printOptimized?: boolean;
}

export interface TXTExportOptions extends BaseExporterOptions {
  encoding: "utf8" | "ascii";
  lineBreaks: "lf" | "crlf";
  includeMetadata?: boolean;
  preserveFormatting?: boolean;
  wrapWidth?: number;
}

export interface MarkdownExportOptions extends BaseExporterOptions {
  format: "standard" | "github" | "commonmark";
  includeMetadata: boolean;
  tableSupport?: boolean;
  frontMatter?: boolean;
  codeHighlighting?: boolean;
  footnotes?: boolean;
  includeTableOfContents?: boolean;
}

export interface RTFExportOptions extends BaseExporterOptions {
  includeTableOfContents: boolean;
  includeHeaderFooter: boolean;
  styling: {
    fontFamily: string;
    fontSize: number;
    lineSpacing: number;
  };
  pageSize: "a4" | "letter" | "legal";
  margins: "normal" | "narrow" | "moderate" | "wide";
  embedImages: boolean;
  colorSupport: "full" | "limited" | "none";
  specialCharacters: boolean;
}

export interface AZW3ExportOptions extends BaseExporterOptions {
  includeTableOfContents: boolean;
  coverImage: boolean;
  metadata: {
    author: string;
    publisher?: string;
    language: string;
    rights?: string;
    identifier?: string;
  };
  formatting: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
  };
  enhancedTypesetting: boolean;
  kindlePreviewer: boolean;
  pageNumbering: boolean;
}

export interface FB2ExportOptions extends BaseExporterOptions {
  includeTableOfContents: boolean;
  coverImage: boolean;
  metadata: {
    author: string;
    publisher?: string;
    language: string;
    genre?: string;
    year?: string;
  };
  includeAnnotation: boolean;
  includeSections: boolean;
  xhtmlSupport: boolean;
}

export interface CBZExportOptions extends BaseExporterOptions {
  coverImage: boolean;
  imageQuality: "low" | "medium" | "high";
  pageSize: "standard" | "wide" | "tall";
  pageNumbering: boolean;
  metadata: {
    title: string;
    author: string;
    publisher?: string;
    year?: string;
  };
  compressionLevel: "low" | "medium" | "high";
}

export interface LaTeXExportOptions extends BaseExporterOptions {
  documentClass: "book" | "article" | "report" | "memoir";
  fontSize: number; // Changed from string to number to match BaseExporterOptions
  paperSize: "a4paper" | "letterpaper" | "a5paper";
  twoSided: boolean;
  includeTableOfContents: boolean;
  includeIndex: boolean;
  includeBibliography: boolean;
  template: "basic" | "academic" | "thesis" | "novel" | "technical";
  customPreamble?: string;
  mathSupport: boolean;
  chapterStyle: "default" | "elegant" | "artistic";
  bibliographyStyle?: "plain" | "abbrv" | "alpha" | "apalike";
  fontPackage: "default" | "times" | "palatino" | "bookman" | "charter";
}

export interface ODTExportOptions extends BaseExporterOptions {
  includeTableOfContents: boolean;
  includeCoverPage: boolean;
  pageStyle: "standard" | "professional" | "creative";
  fontFamily: string;
  fontSize: number;
  lineSpacing: number;
  margins: "normal" | "narrow" | "wide";
  headerFooter: boolean;
  metadata: {
    author: string;
    subject?: string;
    keywords?: string[];
  };
  styles: {
    headings: "default" | "numbered" | "decorated";
    paragraphs: "default" | "indented" | "spaced";
  };
  includeImages: boolean;
  compatibility: "libreoffice" | "msoffice" | "standard";
}

export interface PagesExportOptions extends BaseExporterOptions {
  template: "blank" | "book" | "essay" | "report" | "novel";
  fontFamily: string;
  fontSize: number;
  pageSize: "a4" | "us-letter";
  orientation: "portrait" | "landscape";
  includeTableOfContents: boolean;
  headerFooter: boolean;
  columnLayout: "single" | "double" | "triple";
  lineSpacing: number;
  includePageNumbers: boolean;
  includeImages: boolean;
  coverPage: boolean;
  appleCompatibilityLevel: "latest" | "high-sierra" | "catalina";
}

export interface XMLExportOptions extends BaseExporterOptions {
  documentType: "book" | "article" | "manuscript";
  schema: "docbook" | "tei" | "custom";
  version: "5.0" | "4.5";
  includeMetadata: boolean;
  prettyPrint: boolean;
  encoding: "utf-8" | "iso-8859-1";
  dtdLocation?: string;
  validateOnExport: boolean;
  includeChapters: boolean;
  includeSections: boolean;
  stylesheet?: string;
  outputFormat: "xml" | "html" | "xhtml";
}

export interface JSONExportOptions extends BaseExporterOptions {
  structure: "flat" | "nested" | "hierarchical";
  includeMetadata: boolean;
  includeContent: boolean;
  includeFormatting: boolean;
  prettyPrint: boolean;
  indentation: number;
  splitByChapter: boolean;
  includeImages: boolean;
  imageHandling: "base64" | "urls" | "none";
  schema: "standard" | "custom";
  includeStatistics: boolean;
}
