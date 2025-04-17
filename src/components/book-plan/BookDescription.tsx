
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImproveDescriptionDialog from './ImproveDescriptionDialog';

interface BookDescriptionProps {
  book: any;
  description: string;
  onSave: (updatedBook: any) => void;
}

const BookDescription: React.FC<BookDescriptionProps> = ({ book, description, onSave }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Description</CardTitle>
        <ImproveDescriptionDialog book={book} onSave={onSave} />
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{description}</p>
      </CardContent>
    </Card>
  );
};

export default BookDescription;
