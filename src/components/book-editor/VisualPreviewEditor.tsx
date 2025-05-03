
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExportFormat } from '@/lib/api/types';
import { getAllowedExportFormats, getUserPlan } from '@/lib/api/planService';
import { generatePreviewContent, PreviewGenerationProps } from './previews/PreviewFactory';

interface VisualPreviewEditorProps {
  format: ExportFormat;
  book: any;
  options?: any;
  content?: string;
  onContentChange?: (content: string) => void;
  onOptionsChange?: (options: any) => void;
  previewInNewTab?: boolean;
}

const VisualPreviewEditor: React.FC<VisualPreviewEditorProps> = ({ 
  format, 
  book, 
  options, 
  content,
  onContentChange,
  onOptionsChange,
  previewInNewTab = false
}) => {
  const [previewContent, setPreviewContent] = useState<string>('');
  const [previewWindow, setPreviewWindow] = useState<Window | null>(null);
  const [isFormatAllowed, setIsFormatAllowed] = useState<boolean>(true);
  
  // Check if the format is allowed based on user's plan
  useEffect(() => {
    const allowedFormats = getAllowedExportFormats();
    setIsFormatAllowed(allowedFormats.includes(format));
  }, [format]);

  // Generate preview content based on format and options
  useEffect(() => {
    const previewProps: PreviewGenerationProps = {
      format,
      isFormatAllowed,
      book,
      options,
      previewWindow,
      previewInNewTab
    };
    
    const preview = generatePreviewContent(previewProps);
    setPreviewContent(preview);
  }, [format, book, options, previewInNewTab, previewWindow, isFormatAllowed]);
  
  // Listen for messages from preview window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'ready' && previewInNewTab) {
        // Store the reference to the window that sent the message
        setPreviewWindow(event.source as Window);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [previewInNewTab]);
  
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {previewInNewTab ? (
          <div className="text-center p-8">
            <p className="text-gray-500 mb-2">Preview opened in a new tab</p>
            <p className="text-sm text-gray-400">
              Check your browser for the preview window
            </p>
          </div>
        ) : (
          <div 
            className="preview-container" 
            dangerouslySetInnerHTML={{ __html: previewContent }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default VisualPreviewEditor;
