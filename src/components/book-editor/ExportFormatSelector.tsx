
import React from 'react';
import { FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExportFormat } from '@/lib/api/types';

interface ExportFormatSelectorProps {
  selectedFormat: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
}

const exportFormats = [
  { value: 'pdf', label: 'PDF Document' },
  { value: 'epub', label: 'EPUB eBook' },
  { value: 'mobi', label: 'MOBI (Kindle)' },
  { value: 'docx', label: 'Word Document' },
  { value: 'html', label: 'HTML Website' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'txt', label: 'Plain Text' },
  { value: 'rtf', label: 'Rich Text Format' },
  { value: 'azw3', label: 'Kindle AZW3' },
  { value: 'fb2', label: 'FictionBook' },
  { value: 'cbz', label: 'Comic Book Archive' },
  { value: 'latex', label: 'LaTeX' },
  { value: 'odt', label: 'OpenDocument' },
  { value: 'pages', label: 'Apple Pages' },
  { value: 'xml', label: 'XML' },
  { value: 'json', label: 'JSON' },
];

const ExportFormatSelector: React.FC<ExportFormatSelectorProps> = ({ 
  selectedFormat, 
  onFormatChange 
}) => {
  return (
    <Select 
      value={selectedFormat} 
      onValueChange={(value) => onFormatChange(value as ExportFormat)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Export Format" />
      </SelectTrigger>
      <SelectContent>
        {exportFormats.map((format) => (
          <SelectItem key={format.value} value={format.value}>
            <div className="flex items-center gap-2">
              <FileText size={16} />
              <span>{format.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ExportFormatSelector;
