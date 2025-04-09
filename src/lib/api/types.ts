
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

// PDF Export types
export interface PDFExportOptions {
  showPageNumbers: boolean;
  includeMargins: boolean; 
  fontFamily: string;
  fontSize: number;
  headerFooter: boolean;
  coverPage: boolean;
  colorScheme: 'default' | 'elegant' | 'modern' | 'classic' | 'vibrant';
  pageSize: 'a4' | 'letter' | 'legal';
  orientation: 'portrait' | 'landscape';
}
