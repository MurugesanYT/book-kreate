
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import ExportFormatSelector from '@/components/book-editor/ExportFormatSelector';
import { Book, ExportFormat } from '@/lib/api/types';
import VisualPreviewEditor from './VisualPreviewEditor';

interface EnhancedExportDialogProps {
  book: Book;
  selectedFormat: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
  isExporting: boolean;
  onExport: () => void;
}

const EnhancedExportDialog: React.FC<EnhancedExportDialogProps> = ({
  book,
  selectedFormat,
  onFormatChange,
  isExporting,
  onExport
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'options'>('preview');
  const [previewContent, setPreviewContent] = useState<string>('');
  const [exportOptions, setExportOptions] = useState<any>({});
  
  const handleExport = () => {
    onExport();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Enhanced Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Export Book: {book.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-center">
            <ExportFormatSelector
              selectedFormat={selectedFormat}
              onFormatChange={onFormatChange}
            />
            <Button 
              onClick={handleExport}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              Export {selectedFormat.toUpperCase()}
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'preview' | 'options')}>
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="pt-4">
              <VisualPreviewEditor 
                format={selectedFormat}
                book={book}
                content={previewContent}
                options={exportOptions}
                onContentChange={setPreviewContent}
                onOptionsChange={setExportOptions}
              />
            </TabsContent>
            
            <TabsContent value="options" className="pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Export Options</h3>
                <p className="text-sm text-gray-500">
                  Configure your {selectedFormat.toUpperCase()} export options.
                  Customize the appearance and behavior of your {selectedFormat.toUpperCase()} export.
                </p>
                
                {/* We would add specific format options here */}
                <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
                  Export options for {selectedFormat.toUpperCase()} format will be available soon.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedExportDialog;
