
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BookContentEditor from '@/components/BookContentEditor';

interface BookContentSectionProps {
  book: any;
  onSave: (updatedBook: any) => void;
}

const BookContentSection: React.FC<BookContentSectionProps> = ({ book, onSave }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Content Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <BookContentEditor book={book} onSave={onSave} />
      </CardContent>
    </Card>
  );
};

export default BookContentSection;
