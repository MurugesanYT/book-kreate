
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContentSection from './ContentSection';

interface PageCardProps {
  title: string;
  content: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  onContentChange: (content: string) => void;
}

const PageCard: React.FC<PageCardProps> = ({
  title,
  content,
  activeTab,
  onTabChange,
  onContentChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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

export default PageCard;
