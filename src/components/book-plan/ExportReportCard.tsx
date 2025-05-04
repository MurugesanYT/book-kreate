
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileExport, Download, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ExportReportCardProps {
  book: any;
}

const ExportReportCard: React.FC<ExportReportCardProps> = ({ book }) => {
  const [exportingFormat, setExportingFormat] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState<string | null>(null);

  const formats = [
    { id: 'pdf', name: 'PDF Document', icon: 'pdf' },
    { id: 'epub', name: 'EPUB Ebook', icon: 'epub' },
    { id: 'docx', name: 'Word Document', icon: 'docx' }
  ];
  
  const handleExport = (format: string) => {
    setExportingFormat(format);
    setExportProgress(0);
    setExportComplete(null);
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setExportComplete(format);
          setExportingFormat(null);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  // Calculate basic statistics
  const totalChapters = book.chapters?.length || 0;
  const totalWords = book.chapters?.reduce((sum: number, chapter: any) => 
    sum + (chapter.content ? chapter.content.split(/\s+/).length : 0)
  , 0) || 0;
  const estimatedPages = Math.ceil(totalWords / 250); // Approximate page count (250 words per page)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileExport className="h-5 w-5" />
          Export Report
        </CardTitle>
        <CardDescription>
          Generate and download your book in different formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold">{totalChapters}</div>
              <div className="text-xs text-muted-foreground">Chapters</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold">{totalWords.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Words</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold">{estimatedPages}</div>
              <div className="text-xs text-muted-foreground">Est. Pages</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3">
              <div className="text-2xl font-bold">{Math.round(totalWords / 180)}</div>
              <div className="text-xs text-muted-foreground">Reading Time (min)</div>
            </div>
          </div>
          
          <div className="grid gap-2 mt-2">
            {formats.map(format => (
              <div key={format.id} className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold uppercase">
                    {format.icon}
                  </div>
                  <span>{format.name}</span>
                </div>
                
                {exportingFormat === format.id ? (
                  <div className="w-24">
                    <Progress value={exportProgress} className="h-2" />
                  </div>
                ) : exportComplete === format.id ? (
                  <Button size="sm" variant="outline" className="gap-1">
                    <CheckCircle className="h-3 w-3" /> Done
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="gap-1"
                    onClick={() => handleExport(format.id)}
                    disabled={exportingFormat !== null}
                  >
                    <Download className="h-3 w-3" /> Export
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportReportCard;
