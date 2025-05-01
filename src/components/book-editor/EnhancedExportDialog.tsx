
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import ExportFormatSelector from '@/components/book-editor/ExportFormatSelector';
import ExportFormatPreview from '@/components/book-editor/ExportFormatPreview';
import { Book, ExportFormat } from '@/lib/api/types';

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
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Enhanced Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Export Book</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-center">
            <ExportFormatSelector
              selectedFormat={selectedFormat}
              onFormatChange={onFormatChange}
            />
            <Button 
              onClick={() => {
                onExport();
                setOpen(false);
              }}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              Export {selectedFormat.toUpperCase()}
            </Button>
          </div>
          
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="pt-4">
              <ExportFormatPreview
                format={selectedFormat}
                book={book}
              />
            </TabsContent>
            
            <TabsContent value="options" className="pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Export Options</h3>
                <p className="text-sm text-gray-500">
                  Configure your {selectedFormat.toUpperCase()} export options.
                  Additional options will be available soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedExportDialog;
