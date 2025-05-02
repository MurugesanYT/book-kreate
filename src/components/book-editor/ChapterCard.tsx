
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import AIChapterEditor from './AIChapterEditor';

interface ChapterCardProps {
  index: number;
  title: string;
  content: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  onContentChange: (content: string) => void;
  chapterId: string;
  bookId: string;
  book: any;
  allChapters: {
    id: string;
    title: string;
    content: string;
  }[];
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  index,
  title,
  content,
  activeTab,
  onTabChange,
  onContentChange,
  chapterId,
  bookId,
  book,
  allChapters,
}) => {
  const handleEditorSave = (chapterId: string, updatedContent: string) => {
    onContentChange(updatedContent);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-2 text-gray-500" />
          <span className="font-medium">
            {index + 1}. {title}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <AIChapterEditor
            bookId={bookId}
            chapter={{ id: chapterId, title, content }}
            allChapters={allChapters}
            book={book}
            onSave={handleEditorSave}
          />
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => onTabChange(value)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <Textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="min-h-[200px] font-mono"
            />
          </TabsContent>
          <TabsContent value="preview">
            <div className="border rounded-md p-4 min-h-[200px] prose max-w-none overflow-auto">
              {content.split('\n').map((line, i) => (
                <p key={i}>{line || <br />}</p>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChapterCard;
