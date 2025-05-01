
import React from 'react';
import ContentSection from '@/components/book-editor/ContentSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AIChapterEditor from '@/components/book-editor/AIChapterEditor';

interface ChapterCardProps {
  index: number;
  title: string;
  content: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  onContentChange: (content: string) => void;
  chapterId?: string;
  bookId?: string;
  book?: any;
  allChapters?: any[];
}

const ChapterCard: React.FC<ChapterCardProps> = ({ 
  index, 
  title, 
  content, 
  activeTab, 
  onTabChange, 
  onContentChange,
  chapterId = `chapter-${index}`,
  bookId = '',
  book = null,
  allChapters = []
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          Chapter {index + 1}: {title}
        </CardTitle>
        
        {book && (
          <AIChapterEditor 
            bookId={bookId}
            chapter={{
              id: chapterId,
              title,
              content
            }}
            allChapters={allChapters}
            book={book}
            onSave={(_, updatedContent) => onContentChange(updatedContent)}
          />
        )}
      </CardHeader>
      <CardContent>
        <ContentSection
          title={title}
          content={content}
          activeTab={activeTab}
          onTabChange={onTabChange}
          onContentChange={onContentChange}
        />
      </CardContent>
    </Card>
  );
};

export default ChapterCard;
