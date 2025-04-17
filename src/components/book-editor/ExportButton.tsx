
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  onClick: () => void;
  isExporting: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick, isExporting }) => {
  return (
    <Button 
      onClick={onClick} 
      disabled={isExporting}
      variant="outline"
    >
      <Download className="h-4 w-4 mr-2" />
      Export
    </Button>
  );
};

export default ExportButton;
