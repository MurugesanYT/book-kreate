
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
export type ExportFormat = 'pdf' | 'epub' | 'mobi' | 'docx' | 'txt' | 'html' | 'markdown';

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
}

// PDF Beautification types
export interface BeautificationOptions {
  useAI: boolean;
  theme: 'auto' | 'custom';
  enhancedGeneration: boolean;
  customSettings?: Record<string, any>;
}
