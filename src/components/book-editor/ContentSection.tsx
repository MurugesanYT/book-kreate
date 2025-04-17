
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface ContentSectionProps {
  title: string;
  content: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  onContentChange: (content: string) => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  content,
  activeTab,
  onTabChange,
  onContentChange,
}) => {
  return (
    <div>
      <Tabs defaultValue="edit" value={activeTab} onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <Textarea
            className="min-h-[300px] font-mono"
            value={content || ''}
            onChange={(e) => onContentChange(e.target.value)}
          />
        </TabsContent>
        <TabsContent value="preview">
          <div className="prose max-w-none p-4 border rounded-md bg-white">
            <ReactMarkdown>{content || ''}</ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentSection;
