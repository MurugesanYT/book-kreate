
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

interface BookSettingsSectionProps {
  book: any;
  onSave: (updatedBook: any) => void;
}

const BookSettingsSection: React.FC<BookSettingsSectionProps> = ({ book, onSave }) => {
  const [editedBook, setEditedBook] = useState({
    ...book,
    exportSettings: book.exportSettings || {
      fontSize: 12,
      fontFamily: 'Times New Roman',
      lineSpacing: 1.5,
      includeTableOfContents: true,
      includePageNumbers: true,
      includeCover: true,
      includeCredits: true,
    },
    aiSettings: book.aiSettings || {
      writingStyle: 'balanced',
      detailLevel: 'medium',
      characterFocus: 'balanced',
      creativityLevel: 0.7,
    }
  });
  
  const bookTypes = ['Novel', 'Short Story', 'Poetry', 'Non-fiction', 'Memoir', 'Graphic Novel', 'Children\'s Book'];
  
  const bookGenres = [
    'Action/Adventure', 'Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 
    'Romance', 'Horror', 'Historical Fiction', 'Western', 'Literary Fiction',
    'Young Adult', 'Children\'s', 'Biography', 'Self-help', 'Business',
    'Memoir', 'Poetry', 'Drama', 'Comedy'
  ];
  
  const fontFamilies = [
    'Times New Roman', 'Arial', 'Helvetica', 'Georgia', 'Garamond',
    'Verdana', 'Tahoma', 'Trebuchet MS', 'Courier New', 'Bookman Old Style',
    'Century Gothic', 'Palatino', 'Baskerville', 'Calibri', 'Cambria'
  ];
  
  const handleGeneralChange = (field: string, value: string) => {
    setEditedBook({
      ...editedBook,
      [field]: value
    });
  };
  
  const handleExportSettingChange = (field: string, value: any) => {
    setEditedBook({
      ...editedBook,
      exportSettings: {
        ...editedBook.exportSettings,
        [field]: value
      }
    });
  };
  
  const handleAISettingChange = (field: string, value: any) => {
    setEditedBook({
      ...editedBook,
      aiSettings: {
        ...editedBook.aiSettings,
        [field]: value
      }
    });
  };
  
  const handleSave = () => {
    onSave(editedBook);
    toast.success('Book settings saved successfully');
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-3 mb-6 w-[400px] mx-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="export">Export Settings</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
        </TabsList>
      
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Book Settings</CardTitle>
              <CardDescription>Configure basic book information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input 
                  id="title" 
                  value={editedBook.title} 
                  onChange={(e) => handleGeneralChange('title', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Book Type</Label>
                  <Select 
                    value={editedBook.type || 'Novel'}
                    onValueChange={(value) => handleGeneralChange('type', value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bookTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Genre/Category</Label>
                  <Select 
                    value={editedBook.category || 'Fiction'}
                    onValueChange={(value) => handleGeneralChange('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {bookGenres.map((genre) => (
                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Book Description</Label>
                <Textarea 
                  id="description" 
                  value={editedBook.description || ''} 
                  onChange={(e) => handleGeneralChange('description', e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input 
                  id="author" 
                  value={editedBook.author || ''} 
                  onChange={(e) => handleGeneralChange('author', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export Settings</CardTitle>
              <CardDescription>Configure how your book will appear when exported</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select 
                      value={editedBook.exportSettings.fontFamily}
                      onValueChange={(value) => handleExportSettingChange('fontFamily', value)}
                    >
                      <SelectTrigger id="fontFamily">
                        <SelectValue placeholder="Select font family" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontFamilies.map((font) => (
                          <SelectItem key={font} value={font}>{font}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size (pt)</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="fontSize" 
                        type="number" 
                        min="8"
                        max="24"
                        value={editedBook.exportSettings.fontSize} 
                        onChange={(e) => handleExportSettingChange('fontSize', parseInt(e.target.value) || 12)}
                      />
                      <span className="text-sm text-gray-500">pt</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lineSpacing">Line Spacing</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="lineSpacing" 
                        type="number"
                        min="1"
                        max="3"
                        step="0.1"
                        value={editedBook.exportSettings.lineSpacing} 
                        onChange={(e) => handleExportSettingChange('lineSpacing', parseFloat(e.target.value) || 1.5)}
                      />
                      <span className="text-sm text-gray-500">×</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeTableOfContents">Include Table of Contents</Label>
                    <Switch 
                      id="includeTableOfContents"
                      checked={editedBook.exportSettings.includeTableOfContents}
                      onCheckedChange={(value) => handleExportSettingChange('includeTableOfContents', value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includePageNumbers">Include Page Numbers</Label>
                    <Switch 
                      id="includePageNumbers"
                      checked={editedBook.exportSettings.includePageNumbers}
                      onCheckedChange={(value) => handleExportSettingChange('includePageNumbers', value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeCover">Include Cover Page</Label>
                    <Switch 
                      id="includeCover"
                      checked={editedBook.exportSettings.includeCover}
                      onCheckedChange={(value) => handleExportSettingChange('includeCover', value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeCredits">Include Credits Page</Label>
                    <Switch 
                      id="includeCredits"
                      checked={editedBook.exportSettings.includeCredits}
                      onCheckedChange={(value) => handleExportSettingChange('includeCredits', value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Generation Settings</CardTitle>
              <CardDescription>Configure how AI generates content for your book</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Writing Style</Label>
                    <span className="text-sm text-muted-foreground">{editedBook.aiSettings.writingStyle}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['descriptive', 'balanced', 'concise'].map((style) => (
                      <Button 
                        key={style}
                        type="button"
                        variant={editedBook.aiSettings.writingStyle === style ? "default" : "outline"}
                        onClick={() => handleAISettingChange('writingStyle', style)}
                        className="capitalize"
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Detail Level</Label>
                    <span className="text-sm text-muted-foreground">{editedBook.aiSettings.detailLevel}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['minimal', 'medium', 'rich'].map((level) => (
                      <Button 
                        key={level}
                        type="button"
                        variant={editedBook.aiSettings.detailLevel === level ? "default" : "outline"}
                        onClick={() => handleAISettingChange('detailLevel', level)}
                        className="capitalize"
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Character Focus</Label>
                    <span className="text-sm text-muted-foreground">{editedBook.aiSettings.characterFocus}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['plot-driven', 'balanced', 'character-driven'].map((focus) => (
                      <Button 
                        key={focus}
                        type="button"
                        variant={editedBook.aiSettings.characterFocus === focus ? "default" : "outline"}
                        onClick={() => handleAISettingChange('characterFocus', focus)}
                        className="capitalize"
                      >
                        {focus.replace('-', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Creativity Level: {(editedBook.aiSettings.creativityLevel * 100).toFixed()}%</Label>
                    <span className="text-sm text-muted-foreground">
                      {editedBook.aiSettings.creativityLevel < 0.4 ? 'Factual' : 
                       editedBook.aiSettings.creativityLevel < 0.7 ? 'Balanced' : 'Creative'}
                    </span>
                  </div>
                  <Input 
                    type="range" 
                    min="0.1" 
                    max="1" 
                    step="0.05"
                    value={editedBook.aiSettings.creativityLevel}
                    onChange={(e) => handleAISettingChange('creativityLevel', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
};

export default BookSettingsSection;
