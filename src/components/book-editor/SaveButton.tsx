
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Save className="h-4 w-4 mr-2" />
      Save
    </Button>
  );
};

export default SaveButton;
