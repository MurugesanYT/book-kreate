
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MoreVertical, Edit, Trash2, Store, DollarSign } from 'lucide-react';
import { listBookInMarketplace, removeBookFromMarketplace } from '@/lib/api/marketplaceService';
import { updateBook } from '@/lib/api/bookService';
import { toast } from 'sonner';

interface BookActionsProps {
  bookId: string;
  bookTitle: string;
  isListed?: boolean;
  onRename: (newTitle: string) => void;
  onDelete: () => void;
}

const BookActions: React.FC<BookActionsProps> = ({
  bookId,
  bookTitle,
  isListed = false,
  onRename,
  onDelete
}) => {
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showListDialog, setShowListDialog] = useState(false);
  const [newTitle, setNewTitle] = useState(bookTitle);
  const [price, setPrice] = useState<number>(0);
  const [isFree, setIsFree] = useState(true);

  const handleRename = async () => {
    if (!newTitle.trim()) {
      toast.error('Book title cannot be empty');
      return;
    }

    try {
      await updateBook({ id: bookId, title: newTitle.trim() });
      onRename(newTitle.trim());
      setShowRenameDialog(false);
      toast.success('Book renamed successfully');
    } catch (error) {
      toast.error('Failed to rename book');
    }
  };

  const handleListInMarketplace = async () => {
    try {
      const listingPrice = isFree ? 0 : price;
      await listBookInMarketplace(bookId, listingPrice);
      setShowListDialog(false);
      toast.success('Book listed in marketplace');
    } catch (error) {
      toast.error('Failed to list book');
    }
  };

  const handleRemoveFromMarketplace = async () => {
    try {
      await removeBookFromMarketplace(bookId);
      toast.success('Book removed from marketplace');
    } catch (error) {
      toast.error('Failed to remove book from marketplace');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowRenameDialog(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Rename Book
          </DropdownMenuItem>
          {isListed ? (
            <DropdownMenuItem onClick={handleRemoveFromMarketplace}>
              <Store className="h-4 w-4 mr-2" />
              Remove from Marketplace
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setShowListDialog(true)}>
              <Store className="h-4 w-4 mr-2" />
              List in Marketplace
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={onDelete} className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Book
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Rename Dialog */}
      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Book</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="newTitle">New Book Title</Label>
              <Input
                id="newTitle"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter new book title"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRename}>Save</Button>
              <Button variant="outline" onClick={() => setShowRenameDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* List in Marketplace Dialog */}
      <Dialog open={showListDialog} onOpenChange={setShowListDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>List Book in Marketplace</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFree"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
              />
              <Label htmlFor="isFree">List as free book</Label>
            </div>
            {!isFree && (
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  placeholder="Enter price"
                />
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={handleListInMarketplace}>
                <Store className="h-4 w-4 mr-2" />
                List Book
              </Button>
              <Button variant="outline" onClick={() => setShowListDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookActions;
