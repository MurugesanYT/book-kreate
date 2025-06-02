
export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  bookId: string;
  createdAt: string;
  updatedAt: string;
  order?: number;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  genre: string;
  targetAudience: string;
  chapters?: Chapter[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  status?: 'draft' | 'published' | 'archived';
  tasks?: any[];
  coverPage?: string;
  creditsPage?: string;
  characterList?: string;
  tableOfContents?: string;
  author?: string;
  coverImage?: string;
  published?: boolean;
  publishedDate?: string;
}

// Add missing type aliases
export type BookData = Book;
export type BookItemType = 'chapter' | 'coverPage' | 'tableOfContents' | 'characterList' | 'creditsPage';

// Export format types
export type ExportFormat = 'pdf' | 'epub' | 'docx' | 'txt' | 'html' | 'markdown' | 'json' | 'rtf' | 'odt' | 'latex' | 'xml' | 'fb2' | 'mobi' | 'azw3' | 'cbz' | 'pages';

export interface BaseExporterOptions {
  title?: string;
  author?: string;
  theme?: string;
  includeTableOfContents?: boolean;
}

export interface PDFExportOptions extends BaseExporterOptions {
  pageSize?: 'A4' | 'Letter' | 'Legal';
  margins?: { top: number; right: number; bottom: number; left: number };
  fontSize?: number;
  fontFamily?: string;
}

export interface EPUBExportOptions extends BaseExporterOptions {
  cover?: string;
  language?: string;
  publisher?: string;
}

export interface HTMLExportOptions extends BaseExporterOptions {
  css?: string;
  template?: string;
}

export interface DOCXExportOptions extends BaseExporterOptions {
  template?: string;
}

export interface AZW3ExportOptions extends BaseExporterOptions {
  compression?: 'none' | 'low' | 'medium' | 'high';
}

export interface FB2ExportOptions extends BaseExporterOptions {
  language?: string;
  sequence?: string;
}

export interface CBZExportOptions extends BaseExporterOptions {
  imageQuality?: number;
}
