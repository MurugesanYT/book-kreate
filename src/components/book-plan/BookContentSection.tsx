
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BookContentEditor from '@/components/BookContentEditor';
import TableOfContentsDialog from './TableOfContentsDialog';

interface BookContentSectionProps {
  book: any;
  onUpdate?: (updatedBook: any) => void;
}

const BookContentSection: React.FC<BookContentSectionProps> = ({ book, onUpdate }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Book Content Editor</CardTitle>
        <TableOfContentsDialog book={book} onSave={onUpdate} />
      </CardHeader>
      <CardContent>
        <BookContentEditor book={book} onSave={onUpdate} />
      </CardContent>
    </Card>
  );
};

export default BookContentSection;
