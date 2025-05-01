
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExportFormat, PDFExportOptions, EPUBExportOptions } from '@/lib/api/types';
import VisualPreviewEditor from './VisualPreviewEditor';

interface ExportFormatPreviewProps {
  format: ExportFormat;
  book: any;
  options?: any;
}

const ExportFormatPreview: React.FC<ExportFormatPreviewProps> = ({ format, book, options }) => {
  // Default PDF options
  const defaultPdfOptions: PDFExportOptions = {
    showPageNumbers: true,
    includeMargins: true,
    headerFooter: true,
    coverPage: true,
    colorScheme: "default",
    pageSize: "a4",
    orientation: "portrait",
    decorativeElements: true,
    chapterDividers: true,
    dropCaps: false,
    textAlignment: "left",
    lineSpacing: "normal",
    pageMargins: "normal",
    paperTextureEffect: true,
    fontFamily: 'Georgia',
    fontSize: 12
  };
  
  // Default EPUB options
  const defaultEpubOptions: EPUBExportOptions = {
    includeTableOfContents: true,
    coverImage: true,
    metadata: {
      author: book.author || 'Unknown',
      language: 'en',
    },
    styling: {
      fontFamily: 'serif',
      fontSize: '1em',
      lineHeight: '1.5',
      textAlign: 'left',
    },
    fontFamily: 'serif',
    fontSize: 12
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Format Preview: {format.toUpperCase()}</h3>
      </div>
      
      <VisualPreviewEditor 
        format={format}
        book={book}
        options={options || format === 'pdf' ? defaultPdfOptions : format.includes('epub') ? defaultEpubOptions : undefined}
      />
    </div>
  );
};

export default ExportFormatPreview;
