
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContentSection from './ContentSection';

interface ChapterCardProps {
  index: number;
  title: string;
  content: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  onContentChange: (content: string) => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  index,
  title,
  content,
  activeTab,
  onTabChange,
  onContentChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chapter {index + 1}: {title}</CardTitle>
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
