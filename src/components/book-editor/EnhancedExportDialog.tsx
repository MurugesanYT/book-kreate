import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Eye, ZoomIn } from 'lucide-react';
import ExportFormatSelector from '@/components/book-editor/ExportFormatSelector';
import { Book, ExportFormat } from '@/lib/api/types';
import ExportFormatPreview from './ExportFormatPreview';
import ExportProgress from './ExportProgress';
import { toast } from 'sonner';

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
  const [exportOptions, setExportOptions] = useState<any>({});
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [exportStatus, setExportStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
  const [processingStage, setProcessingStage] = useState<string>('');
  const [previewInNewTab, setPreviewInNewTab] = useState(false);
  
  // Reset progress when format changes
  useEffect(() => {
    if (isExporting) {
      // Simulate export progress
      const timer = setInterval(() => {
        setExportProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            setExportStatus('completed');
            return 100;
          }
          
          // Update processing stage based on progress
          if (prevProgress < 25) {
            setProcessingStage('Preparing content...');
          } else if (prevProgress < 50) {
            setProcessingStage(`Formatting ${selectedFormat.toUpperCase()} structure...`);
          } else if (prevProgress < 75) {
            setProcessingStage('Applying style options...');
          } else {
            setProcessingStage('Finalizing export...');
          }
          
          return prevProgress + 5;
        });
      }, 200);
      
      return () => clearInterval(timer);
    } else {
      setExportProgress(0);
      setExportStatus('idle');
    }
  }, [isExporting, selectedFormat]);

  // Reset progress and status when format changes
  useEffect(() => {
    setExportProgress(0);
    setExportStatus('idle');
  }, [selectedFormat]);

  const handleExport = () => {
    setExportStatus('processing');
    setExportProgress(0);
    
    // Start the export process
    onExport();
    
    // We'll keep the dialog open to show progress
    toast.success(`Starting ${selectedFormat.toUpperCase()} export...`);
  };

  // Handle export options change from the preview component
  const handleOptionsChange = (options: any) => {
    setExportOptions(options);
  };

  // Create a custom export handler that uses the selected options
  const handleCustomExport = () => {
    console.log("Exporting with custom options:", exportOptions);
    handleExport();
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
              onClick={handleCustomExport}
              disabled={isExporting || exportStatus === 'processing'}
            >
              <Download className="h-4 w-4 mr-2" />
              Export {selectedFormat.toUpperCase()}
            </Button>
          </div>
          
          {(isExporting || exportStatus === 'processing' || exportStatus === 'completed') && (
            <ExportProgress 
              progress={exportProgress} 
              status={exportStatus} 
              format={selectedFormat}
              processingStage={processingStage}
            />
          )}
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'preview' | 'options')}>
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="pt-4">
              <ExportFormatPreview
                format={selectedFormat}
                book={book}
                options={exportOptions}
                onOptionsChange={handleOptionsChange}
              />
            </TabsContent>
            
            <TabsContent value="options" className="pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Export Options</h3>
                <p className="text-sm text-gray-500">
                  Configure your {selectedFormat.toUpperCase()} export options.
                  Customize the appearance and behavior of your {selectedFormat.toUpperCase()} export.
                </p>
                
                <ExportFormatPreview
                  format={selectedFormat}
                  book={book}
                  options={exportOptions}
                  onOptionsChange={handleOptionsChange}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedExportDialog;
