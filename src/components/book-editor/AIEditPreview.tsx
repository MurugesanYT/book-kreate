
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface AIEditPreviewProps {
  activeTab: 'edit' | 'compare';
  onTabChange: (value: 'edit' | 'compare') => void;
  generatedContent: string;
  onGeneratedContentChange: (content: string) => void;
  originalContent: string;
  onSave: () => void;
}

const AIEditPreview: React.FC<AIEditPreviewProps> = ({
  activeTab,
  onTabChange,
  generatedContent,
  onGeneratedContentChange,
  originalContent,
  onSave
}) => {
  return (
    <div className="space-y-2">
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'edit' | 'compare')}>
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit">
          <Label>Generated Content</Label>
          <Textarea
            value={generatedContent}
            onChange={(e) => onGeneratedContentChange(e.target.value)}
            className="min-h-[300px] font-mono"
          />
        </TabsContent>
        
        <TabsContent value="compare">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Original Content</Label>
              <div className="border rounded-md p-4 min-h-[300px] overflow-y-auto bg-gray-50">
                {originalContent.split('\n').map((line, i) => (
                  <p key={i}>{line || <br />}</p>
                ))}
              </div>
            </div>
            <div>
              <Label>Generated Content</Label>
              <div className="border rounded-md p-4 min-h-[300px] overflow-y-auto bg-gray-50">
                {generatedContent.split('\n').map((line, i) => (
                  <p key={i}>{line || <br />}</p>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={onSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AIEditPreview;
