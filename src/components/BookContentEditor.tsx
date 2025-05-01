
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
import EnhancedExportDialog from '@/components/book-editor/EnhancedExportDialog';

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
  
  const handleCharactersChange = (newContent: string) => {
    setEditedBook({
      ...editedBook,
      characterList: newContent
    });
  };
  
  const handleTableOfContentsChange = (newContent: string) => {
    setEditedBook({
      ...editedBook,
      tableOfContents: newContent
    });
  };

  const handleSave = () => {
    onSave(editedBook);
    toast.success('Book content saved successfully');
  };

  const handleExportClick = () => {
    handleExport(editedBook);
  };

  // Get all chapters for context in AI editor
  const allChapters = editedBook.chapters?.map(ch => ({
    id: ch.id,
    title: ch.title,
    content: ch.content
  })) || [];

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
          
          <EnhancedExportDialog
            book={editedBook}
            selectedFormat={selectedFormat}
            onFormatChange={setSelectedFormat}
            isExporting={isExporting}
            onExport={handleExportClick}
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

      {editedBook.tableOfContents !== undefined && (
        <PageCard
          title="Table of Contents"
          content={editedBook.tableOfContents || ''}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onContentChange={handleTableOfContentsChange}
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
              chapterId={chapter.id}
              bookId={book.id}
              book={book}
              allChapters={allChapters}
            />
          ))}
        </div>
      )}

      {editedBook.characterList !== undefined && (
        <PageCard
          title="Character List"
          content={editedBook.characterList || ''}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onContentChange={handleCharactersChange}
        />
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
