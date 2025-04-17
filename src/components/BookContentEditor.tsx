
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Book, ExportFormat } from '@/lib/api/types';
import ExportFormatSelector from '@/components/book-editor/ExportFormatSelector';
import ChapterCard from '@/components/book-editor/ChapterCard';
import PageCard from '@/components/book-editor/PageCard';
import ExportButton from '@/components/book-editor/ExportButton';
import SaveButton from '@/components/book-editor/SaveButton';
import { useExport } from '@/components/book-editor/useExport';

interface BookEditorProps {
  book: Book;
  onSave: (updatedBook: Book) => void;
}

const BookContentEditor: React.FC<BookEditorProps> = ({ book, onSave }) => {
  const [editedBook, setEditedBook] = useState<Book>(book);
  const [activeTab, setActiveTab] = useState<string>('edit');
  const { selectedFormat, setSelectedFormat, isExporting, handleExport } = useExport();

  useEffect(() => {
    setEditedBook(book);
  }, [book]);

  const handleContentChange = (index: number, newContent: string) => {
    const updatedChapters = [...editedBook.chapters];
    updatedChapters[index] = { ...updatedChapters[index], content: newContent };
    
    setEditedBook({
      ...editedBook,
      chapters: updatedChapters
    });
  };

  const handleCoverChange = (newContent: string) => {
    setEditedBook({
      ...editedBook,
      coverPage: newContent
    });
  };

  const handleCreditsChange = (newContent: string) => {
    setEditedBook({
      ...editedBook,
      creditsPage: newContent
    });
  };

  const handleSave = () => {
    onSave(editedBook);
    toast.success('Book content saved successfully');
  };

  const handleExportClick = () => {
    handleExport(editedBook);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Book Content Editor</h3>
          <p className="text-sm text-gray-500">Edit your book's content</p>
        </div>
        <div className="flex gap-2">
          <ExportFormatSelector 
            selectedFormat={selectedFormat} 
            onFormatChange={setSelectedFormat} 
          />
          
          <ExportButton 
            onClick={handleExportClick} 
            isExporting={isExporting} 
          />
          
          <SaveButton onClick={handleSave} />
        </div>
      </div>

      {editedBook.coverPage !== undefined && (
        <PageCard
          title="Cover Page"
          content={editedBook.coverPage || ''}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onContentChange={handleCoverChange}
        />
      )}

      {editedBook.chapters && editedBook.chapters.length > 0 && (
        <div className="space-y-4">
          {editedBook.chapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.id || index}
              index={index}
              title={chapter.title}
              content={chapter.content || ''}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onContentChange={(content) => handleContentChange(index, content)}
            />
          ))}
        </div>
      )}

      {editedBook.creditsPage !== undefined && (
        <PageCard
          title="Credits Page"
          content={editedBook.creditsPage || ''}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onContentChange={handleCreditsChange}
        />
      )}
    </div>
  );
};

export default BookContentEditor;
