
// Common types used across API services

export type BookItemType = 'cover' | 'chapter' | 'credits';

export interface Credit {
  role: string;
  name: string;
}

export interface BookData {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  credits: Credit[];
  needsGeneratedTitle?: boolean;
  timestamp: string;
  template?: string | null;
  coverImageUrl?: string;
  fontFamily?: string;
  colorScheme?: string;
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
export type ExportFormat = 'pdf' | 'epub' | 'mobi' | 'docx' | 'txt' | 'html' | 'markdown' | 'rtf' | 'azw3' | 'fb2' | 'cbz' | 'audio';

// PDF Export types
export interface PDFExportOptions {
  showPageNumbers: boolean;
  includeMargins: boolean; 
  fontFamily: string;
  fontSize: number;
  headerFooter: boolean;
  coverPage: boolean;
  colorScheme: 'default' | 'elegant' | 'modern' | 'classic' | 'vibrant' | 'minimalist' | 'artistic' | 'scholarly' | 'romantic' | 'fantasy' | 'custom';
  pageSize: 'a4' | 'letter' | 'legal' | 'a5';
  orientation: 'portrait' | 'landscape';
  decorativeElements: boolean;
  chapterDividers: boolean;
  dropCaps: boolean;
  textAlignment: 'left' | 'justified' | 'center';
  lineSpacing: 'normal' | 'relaxed' | 'compact';
  pageMargins: 'normal' | 'wide' | 'narrow';
  paperTextureEffect: boolean;
  customTheme?: string;
}

// EPUB Export options
export interface EPUBExportOptions {
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

// DOCX Export options
export interface DOCXExportOptions {
  includeTableOfContents: boolean;
  includeHeaderFooter: boolean;
  styling: {
    fontFamily: string;
    fontSize: number;
    lineSpacing: number;
  };
  pageSize: 'a4' | 'letter' | 'legal';
  margins: 'normal' | 'narrow' | 'moderate' | 'wide';
  orientation: 'portrait' | 'landscape';
  trackChanges?: boolean;
  documentProtection?: boolean;
  watermark?: string;
  styleSet?: 'modern' | 'classic' | 'elegant' | 'minimal';
  highlightedSections?: boolean;
  autoHyphenation?: boolean;
  footnotesEndnotes?: boolean;
}

// Additional export options
export interface HTMLExportOptions {
  responsive: boolean;
  includeCSS: boolean;
  darkModeSupport?: boolean;
  htmlVersion?: 'html5' | 'xhtml';
  includeFonts?: boolean;
  interactiveElements?: boolean;
  printOptimized?: boolean;
}

export interface TXTExportOptions {
  encoding: 'utf8' | 'ascii';
  lineBreaks: 'lf' | 'crlf';
  includeMetadata?: boolean;
  preserveFormatting?: boolean;
  wrapWidth?: number;
}

export interface MarkdownExportOptions {
  format: 'standard' | 'github' | 'commonmark';
  includeMetadata: boolean;
  tableSupport?: boolean;
  frontMatter?: boolean;
  codeHighlighting?: boolean;
  footnotes?: boolean;
  includeTableOfContents?: boolean;
}

// New export options for additional formats
export interface RTFExportOptions {
  includeTableOfContents: boolean;
  includeHeaderFooter: boolean;
  styling: {
    fontFamily: string;
    fontSize: number;
    lineSpacing: number;
  };
  pageSize: 'a4' | 'letter' | 'legal';
  margins: 'normal' | 'narrow' | 'moderate' | 'wide';
  embedImages: boolean;
  colorSupport: 'full' | 'limited' | 'none';
  specialCharacters: boolean;
}

export interface AZW3ExportOptions {
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

export interface FB2ExportOptions {
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

export interface CBZExportOptions {
  coverImage: boolean;
  imageQuality: 'low' | 'medium' | 'high';
  pageSize: 'standard' | 'wide' | 'tall';
  pageNumbering: boolean;
  metadata: {
    title: string;
    author: string;
    publisher?: string;
    year?: string;
  };
  compressionLevel: 'low' | 'medium' | 'high';
}

export interface AudioExportOptions {
  voiceType: 'male' | 'female' | 'neutral';
  audioQuality: 'standard' | 'high';
  fileFormat: 'mp3' | 'wav' | 'ogg' | 'flac';
  sampleRate: '44.1kHz' | '48kHz' | '96kHz';
  includeChapterMarkers: boolean;
  normalizeAudio: boolean;
  speedControl: boolean;
  bitRate: '128kbps' | '192kbps' | '256kbps' | '320kbps';
}

// PDF Beautification types
export interface BeautificationOptions {
  useAI: boolean;
  theme: 'auto' | 'custom';
  enhancedGeneration: boolean;
  customSettings?: Record<string, any>;
}
