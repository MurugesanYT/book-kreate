
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
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Check, Sparkles, HelpCircle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getUserPlan } from '@/lib/api/planService';

interface BookSettingsSectionProps {
  book: any;
  onSave: (updatedBook: any) => void;
}

const BookSettingsSection: React.FC<BookSettingsSectionProps> = ({ book, onSave }) => {
  const userPlan = getUserPlan();
  
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
      pageSize: 'a4',
      margins: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
      },
      headerFooter: {
        showHeader: true,
        showFooter: true,
        headerText: '{title}',
        footerText: 'Page {pageNumber}',
      },
      chapterNumbering: true,
      chapterStartNewPage: true,
      textAlignment: 'justify',
      paragraphIndent: 0.5,
      hyphenation: true,
      coverImageLayout: 'centered',
      textColor: '#000000',
      backgroundColor: '#ffffff',
      headerColor: '#333333',
      useSmallCaps: false,
      useTwoColumns: false,
      watermarkText: '',
      paperQuality: 'standard',
      printBleedMarks: false,
    },
    aiSettings: book.aiSettings || {
      writingStyle: 'balanced',
      detailLevel: 'medium',
      characterFocus: 'balanced',
      creativityLevel: 0.7,
      tonality: 'neutral',
      pacing: 'moderate',
      narrativeVoice: 'third-person',
      genreAdherence: 'flexible',
      languageFormality: 'standard',
      sentenceComplexity: 'varied',
      vocabularyLevel: 'intermediate',
      useDialogue: 'balanced',
      emotionalImpact: 'moderate',
      sensoryDescription: 'moderate',
      worldBuildingDetail: 'moderate',
      thematicEmphasis: 'subtle',
      characterDevelopment: 'gradual',
      plotComplexity: 'moderate',
      audienceAge: 'adult',
      useMetaphors: 'occasional',
      conflictIntensity: 'moderate',
      humorLevel: 'subtle',
      includeCliffhangers: 'sometimes',
      chapterLength: 'medium',
      seriesContemplation: false,
      allowExplicitContent: false,
      includeFlashbacks: 'occasionally',
      timelineStructure: 'linear',
    },
    generalSettings: book.generalSettings || {
      targetWordCount: 60000,
      deadlineDate: null,
      language: 'English',
      readingLevel: 'adult',
      includeGlossary: false,
      includeIndex: false,
      includeImages: false,
      enableAutoSave: true,
      autoSaveInterval: 5,
      collaborators: [],
      visibility: 'private',
      allowComments: false,
      copyrightYear: new Date().getFullYear(),
      copyrightHolder: book.author || '',
      isbn: '',
      publicationStatus: 'draft',
      revisionVersion: '1.0',
      keywordTags: [],
      seriesName: '',
      seriesPosition: 1,
      enableBackup: true,
      backupFrequency: 'daily',
      useBeta: false,
    }
  });
  
  const bookTypes = ['Novel', 'Short Story', 'Poetry', 'Non-fiction', 'Memoir', 'Graphic Novel', 'Children\'s Book', 
                     'Young Adult Fiction', 'Novella', 'Anthology', 'Essay Collection', 'Academic', 'Biography', 
                     'Self-help', 'Tutorial', 'Technical Manual', 'Cookbook', 'Travel Guide', 'Journal', 'Screenplay'];
  
  const bookGenres = [
    'Action/Adventure', 'Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance', 'Horror', 
    'Historical Fiction', 'Western', 'Literary Fiction', 'Young Adult', 'Children\'s', 'Biography', 
    'Self-help', 'Business', 'Memoir', 'Poetry', 'Drama', 'Comedy', 'Crime', 'Dystopian', 'Paranormal', 
    'Urban Fantasy', 'Steampunk', 'Epic Fantasy', 'Contemporary', 'Magical Realism', 'Cyberpunk', 
    'Superhero', 'Gothic', 'Satire', 'Fairy Tale', 'Mythology', 'Folklore', 'Political', 'Military', 
    'Alternative History', 'Space Opera', 'Post-Apocalyptic', 'Time Travel'
  ];
  
  const fontFamilies = [
    'Times New Roman', 'Arial', 'Helvetica', 'Georgia', 'Garamond', 'Verdana', 'Tahoma', 
    'Trebuchet MS', 'Courier New', 'Bookman Old Style', 'Century Gothic', 'Palatino', 'Baskerville', 
    'Calibri', 'Cambria', 'Caslon', 'Futura', 'Minion Pro', 'Didot', 'Merriweather', 'Montserrat', 
    'Open Sans', 'Roboto', 'Lato', 'Playfair Display', 'Source Sans Pro', 'Fira Sans', 'Ubuntu', 
    'Raleway', 'Josefin Sans'
  ];

  const pageSizes = [
    'a4', 'a5', 'letter', 'legal', 'b5', '6x9', '5x8', '7x10', 'custom'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 
    'Japanese', 'Chinese', 'Korean', 'Arabic', 'Hindi', 'Dutch', 'Swedish', 'Polish', 
    'Turkish', 'Greek', 'Norwegian', 'Finnish', 'Danish'
  ];

  const readingLevels = [
    'children', 'middle-grade', 'young-adult', 'adult', 'academic'
  ];

  const backupFrequencies = [
    'hourly', 'daily', 'weekly', 'monthly', 'on-save'
  ];

  const timelineStructures = [
    'linear', 'non-linear', 'parallel', 'circular', 'frame-story', 'fragmented'
  ];
  
  const handleGeneralChange = (field: string, value: any) => {
    setEditedBook({
      ...editedBook,
      [field]: value
    });
  };
  
  const handleGeneralSettingChange = (field: string, value: any) => {
    setEditedBook({
      ...editedBook,
      generalSettings: {
        ...editedBook.generalSettings,
        [field]: value
      }
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

  const handleExportNestedSettingChange = (parentField: string, field: string, value: any) => {
    setEditedBook({
      ...editedBook,
      exportSettings: {
        ...editedBook.exportSettings,
        [parentField]: {
          ...editedBook.exportSettings[parentField],
          [field]: value
        }
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

  const SettingTooltip = ({ children, content }: { children: React.ReactNode, content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center">
            {children}
            <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const isPremiumFeature = (feature: 'glossary' | 'index' | 'images' | 'collaborators' | 'comments' | 'customization' | 'backup' | 'beta') => {
    if (feature === 'glossary' || feature === 'index' || feature === 'comments') {
      return userPlan === 'Basic';
    }
    if (feature === 'images' || feature === 'collaborators' || feature === 'customization' || feature === 'backup') {
      return userPlan === 'Basic' || userPlan === 'Pro';
    }
    if (feature === 'beta') {
      return userPlan !== 'Ultimate';
    }
    return false;
  };

  const FeatureLabel = ({ feature, label }: { feature: 'glossary' | 'index' | 'images' | 'collaborators' | 'comments' | 'customization' | 'backup' | 'beta', label: string }) => (
    <div className="flex items-center">
      {label}
      {isPremiumFeature(feature) && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded">
                <Sparkles className="h-3 w-3 mr-1" />
                Premium
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Available with Pro or Ultimate plans</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-3 mb-6 w-[400px] mx-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="export">Export Settings</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
        </TabsList>
      
        <TabsContent value="general">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
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

              <Card>
                <CardHeader>
                  <CardTitle>Project Settings</CardTitle>
                  <CardDescription>Configure project-specific settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <SettingTooltip content="Set a target word count for your book to track progress">
                        <Label htmlFor="targetWordCount">Target Word Count</Label>
                      </SettingTooltip>
                      <Input 
                        id="targetWordCount"
                        type="number" 
                        value={editedBook.generalSettings.targetWordCount} 
                        onChange={(e) => handleGeneralSettingChange('targetWordCount', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select 
                        value={editedBook.generalSettings.language || 'English'}
                        onValueChange={(value) => handleGeneralSettingChange('language', value)}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language} value={language}>{language}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="readingLevel">Reading Level</Label>
                      <Select 
                        value={editedBook.generalSettings.readingLevel || 'adult'}
                        onValueChange={(value) => handleGeneralSettingChange('readingLevel', value)}
                      >
                        <SelectTrigger id="readingLevel">
                          <SelectValue placeholder="Select reading level" />
                        </SelectTrigger>
                        <SelectContent>
                          {readingLevels.map((level) => (
                            <SelectItem key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="publicationStatus">Publication Status</Label>
                      <Select 
                        value={editedBook.generalSettings.publicationStatus || 'draft'}
                        onValueChange={(value) => handleGeneralSettingChange('publicationStatus', value)}
                      >
                        <SelectTrigger id="publicationStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="in-review">In Review</SelectItem>
                          <SelectItem value="final-draft">Final Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <SettingTooltip content="Name of the series this book belongs to, if applicable">
                        <Label htmlFor="seriesName">Series Name</Label>
                      </SettingTooltip>
                      <Input 
                        id="seriesName"
                        value={editedBook.generalSettings.seriesName} 
                        onChange={(e) => handleGeneralSettingChange('seriesName', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <SettingTooltip content="Position of this book in the series (e.g., 1 for first book)">
                        <Label htmlFor="seriesPosition">Series Position</Label>
                      </SettingTooltip>
                      <Input 
                        id="seriesPosition"
                        type="number" 
                        min="1"
                        value={editedBook.generalSettings.seriesPosition} 
                        onChange={(e) => handleGeneralSettingChange('seriesPosition', parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="isbn">ISBN</Label>
                      <Input 
                        id="isbn"
                        value={editedBook.generalSettings.isbn} 
                        onChange={(e) => handleGeneralSettingChange('isbn', e.target.value)}
                        placeholder="Optional"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="copyrightYear">Copyright Year</Label>
                      <Input 
                        id="copyrightYear"
                        type="number" 
                        value={editedBook.generalSettings.copyrightYear} 
                        onChange={(e) => handleGeneralSettingChange('copyrightYear', parseInt(e.target.value) || new Date().getFullYear())}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Configure additional book features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FeatureLabel feature="glossary" label="Include Glossary" />
                      <Switch 
                        id="includeGlossary"
                        checked={editedBook.generalSettings.includeGlossary}
                        onCheckedChange={(value) => handleGeneralSettingChange('includeGlossary', value)}
                        disabled={isPremiumFeature('glossary')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <FeatureLabel feature="index" label="Include Index" />
                      <Switch 
                        id="includeIndex"
                        checked={editedBook.generalSettings.includeIndex}
                        onCheckedChange={(value) => handleGeneralSettingChange('includeIndex', value)}
                        disabled={isPremiumFeature('index')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <FeatureLabel feature="images" label="Include Images" />
                      <Switch 
                        id="includeImages"
                        checked={editedBook.generalSettings.includeImages}
                        onCheckedChange={(value) => handleGeneralSettingChange('includeImages', value)}
                        disabled={isPremiumFeature('images')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <SettingTooltip content="Save your work automatically at regular intervals">
                        <Label htmlFor="enableAutoSave">Enable Auto-Save</Label>
                      </SettingTooltip>
                      <Switch 
                        id="enableAutoSave"
                        checked={editedBook.generalSettings.enableAutoSave}
                        onCheckedChange={(value) => handleGeneralSettingChange('enableAutoSave', value)}
                      />
                    </div>

                    {editedBook.generalSettings.enableAutoSave && (
                      <div className="space-y-2 pl-6">
                        <Label htmlFor="autoSaveInterval">Auto-Save Interval (minutes)</Label>
                        <Input 
                          id="autoSaveInterval"
                          type="number" 
                          min="1"
                          max="60"
                          value={editedBook.generalSettings.autoSaveInterval} 
                          onChange={(e) => handleGeneralSettingChange('autoSaveInterval', parseInt(e.target.value) || 5)}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <FeatureLabel feature="backup" label="Enable Backups" />
                      <Switch 
                        id="enableBackup"
                        checked={editedBook.generalSettings.enableBackup}
                        onCheckedChange={(value) => handleGeneralSettingChange('enableBackup', value)}
                        disabled={isPremiumFeature('backup')}
                      />
                    </div>

                    {editedBook.generalSettings.enableBackup && (
                      <div className="space-y-2 pl-6">
                        <Label htmlFor="backupFrequency">Backup Frequency</Label>
                        <Select 
                          value={editedBook.generalSettings.backupFrequency || 'daily'}
                          onValueChange={(value) => handleGeneralSettingChange('backupFrequency', value)}
                          disabled={isPremiumFeature('backup')}
                        >
                          <SelectTrigger id="backupFrequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            {backupFrequencies.map((frequency) => (
                              <SelectItem key={frequency} value={frequency}>{frequency.charAt(0).toUpperCase() + frequency.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <FeatureLabel feature="beta" label="Use Beta Features" />
                      <Switch 
                        id="useBeta"
                        checked={editedBook.generalSettings.useBeta}
                        onCheckedChange={(value) => handleGeneralSettingChange('useBeta', value)}
                        disabled={isPremiumFeature('beta')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="export">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
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

                      <div className="space-y-2">
                        <Label htmlFor="pageSize">Page Size</Label>
                        <Select 
                          value={editedBook.exportSettings.pageSize}
                          onValueChange={(value) => handleExportSettingChange('pageSize', value)}
                        >
                          <SelectTrigger id="pageSize">
                            <SelectValue placeholder="Select page size" />
                          </SelectTrigger>
                          <SelectContent>
                            {pageSizes.map((size) => (
                              <SelectItem key={size} value={size}>{size.toUpperCase()}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <SettingTooltip content="Controls how text is aligned in paragraphs">
                          <Label htmlFor="textAlignment">Text Alignment</Label>
                        </SettingTooltip>
                        <Select 
                          value={editedBook.exportSettings.textAlignment}
                          onValueChange={(value) => handleExportSettingChange('textAlignment', value)}
                        >
                          <SelectTrigger id="textAlignment">
                            <SelectValue placeholder="Select text alignment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                            <SelectItem value="justify">Justify</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <SettingTooltip content="Amount of indent at the start of each paragraph (in inches)">
                          <Label htmlFor="paragraphIndent">Paragraph Indent (inches)</Label>
                        </SettingTooltip>
                        <Input 
                          id="paragraphIndent"
                          type="number"
                          min="0"
                          max="2"
                          step="0.1"
                          value={editedBook.exportSettings.paragraphIndent} 
                          onChange={(e) => handleExportSettingChange('paragraphIndent', parseFloat(e.target.value) || 0.5)}
                        />
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

                      <div className="flex items-center justify-between">
                        <SettingTooltip content="Start each chapter on a new page">
                          <Label htmlFor="chapterStartNewPage">Start Chapters on New Page</Label>
                        </SettingTooltip>
                        <Switch 
                          id="chapterStartNewPage"
                          checked={editedBook.exportSettings.chapterStartNewPage}
                          onCheckedChange={(value) => handleExportSettingChange('chapterStartNewPage', value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <SettingTooltip content="Include chapter numbers (e.g., Chapter 1, Chapter 2)">
                          <Label htmlFor="chapterNumbering">Include Chapter Numbers</Label>
                        </SettingTooltip>
                        <Switch 
                          id="chapterNumbering"
                          checked={editedBook.exportSettings.chapterNumbering}
                          onCheckedChange={(value) => handleExportSettingChange('chapterNumbering', value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <SettingTooltip content="Enable automatic hyphenation for better text flow">
                          <Label htmlFor="hyphenation">Enable Hyphenation</Label>
                        </SettingTooltip>
                        <Switch 
                          id="hyphenation"
                          checked={editedBook.exportSettings.hyphenation}
                          onCheckedChange={(value) => handleExportSettingChange('hyphenation', value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <FeatureLabel feature="customization" label="Use Small Caps for Chapter Titles" />
                        <Switch 
                          id="useSmallCaps"
                          checked={editedBook.exportSettings.useSmallCaps}
                          onCheckedChange={(value) => handleExportSettingChange('useSmallCaps', value)}
                          disabled={isPremiumFeature('customization')}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <FeatureLabel feature="customization" label="Use Two-Column Layout" />
                        <Switch 
                          id="useTwoColumns"
                          checked={editedBook.exportSettings.useTwoColumns}
                          onCheckedChange={(value) => handleExportSettingChange('useTwoColumns', value)}
                          disabled={isPremiumFeature('customization')}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Export Settings</CardTitle>
                  <CardDescription>Fine-tune the appearance of your exported book</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Page Margins (inches)</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="marginTop" className="text-xs">Top</Label>
                            <Input 
                              id="marginTop"
                              type="number" 
                              min="0"
                              max="3"
                              step="0.1"
                              value={editedBook.exportSettings.margins.top} 
                              onChange={(e) => handleExportNestedSettingChange('margins', 'top', parseFloat(e.target.value) || 1)}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="marginRight" className="text-xs">Right</Label>
                            <Input 
                              id="marginRight"
                              type="number" 
                              min="0"
                              max="3"
                              step="0.1"
                              value={editedBook.exportSettings.margins.right} 
                              onChange={(e) => handleExportNestedSettingChange('margins', 'right', parseFloat(e.target.value) || 1)}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="marginBottom" className="text-xs">Bottom</Label>
                            <Input 
                              id="marginBottom"
                              type="number" 
                              min="0"
                              max="3"
                              step="0.1"
                              value={editedBook.exportSettings.margins.bottom} 
                              onChange={(e) => handleExportNestedSettingChange('margins', 'bottom', parseFloat(e.target.value) || 1)}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="marginLeft" className="text-xs">Left</Label>
                            <Input 
                              id="marginLeft"
                              type="number" 
                              min="0"
                              max="3"
                              step="0.1"
                              value={editedBook.exportSettings.margins.left} 
                              onChange={(e) => handleExportNestedSettingChange('margins', 'left', parseFloat(e.target.value) || 1)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="coverImageLayout">Cover Image Layout</Label>
                        <Select 
                          value={editedBook.exportSettings.coverImageLayout}
                          onValueChange={(value) => handleExportSettingChange('coverImageLayout', value)}
                        >
                          <SelectTrigger id="coverImageLayout">
                            <SelectValue placeholder="Cover image layout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="centered">Centered</SelectItem>
                            <SelectItem value="full-bleed">Full Bleed</SelectItem>
                            <SelectItem value="framed">Framed</SelectItem>
                            <SelectItem value="offset">Offset</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <SettingTooltip content="For print publishing, adds bleed marks to the document">
                          <Label htmlFor="printBleedMarks">Print Bleed Marks</Label>
                        </SettingTooltip>
                        <Switch 
                          id="printBleedMarks"
                          checked={editedBook.exportSettings.printBleedMarks}
                          onCheckedChange={(value) => handleExportSettingChange('printBleedMarks', value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="paperQuality">Paper Quality</Label>
                        <Select 
                          value={editedBook.exportSettings.paperQuality}
                          onValueChange={(value) => handleExportSettingChange('paperQuality', value)}
                        >
                          <SelectTrigger id="paperQuality">
                            <SelectValue placeholder="Paper quality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="archival">Archival</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="watermarkText">Watermark Text</Label>
                        <Input 
                          id="watermarkText"
                          placeholder="Optional"
                          value={editedBook.exportSettings.watermarkText} 
                          onChange={(e) => handleExportSettingChange('watermarkText', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Header & Footer</Label>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="showHeader">Show Header</Label>
                          <Switch 
                            id="showHeader"
                            checked={editedBook.exportSettings.headerFooter.showHeader}
                            onCheckedChange={(value) => handleExportNestedSettingChange('headerFooter', 'showHeader', value)}
                          />
                        </div>

                        {editedBook.exportSettings.headerFooter.showHeader && (
                          <div className="space-y-2 mb-4">
                            <Label htmlFor="headerText" className="text-xs">Header Text</Label>
                            <Input 
                              id="headerText"
                              value={editedBook.exportSettings.headerFooter.headerText} 
                              onChange={(e) => handleExportNestedSettingChange('headerFooter', 'headerText', e.target.value)}
                              placeholder="Use {title}, {chapter}, {author}, {page} as variables"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="showFooter">Show Footer</Label>
                          <Switch 
                            id="showFooter"
                            checked={editedBook.exportSettings.headerFooter.showFooter}
                            onCheckedChange={(value) => handleExportNestedSettingChange('headerFooter', 'showFooter', value)}
                          />
                        </div>

                        {editedBook.exportSettings.headerFooter.showFooter && (
                          <div className="space-y-2">
                            <Label htmlFor="footerText" className="text-xs">Footer Text</Label>
                            <Input 
                              id="footerText"
                              value={editedBook.exportSettings.headerFooter.footerText} 
                              onChange={(e) => handleExportNestedSettingChange('headerFooter', 'footerText', e.target.value)}
                              placeholder="Use {title}, {chapter}, {author}, {pageNumber} as variables"
                            />
                          </div>
                        )}
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-4">
                        <Label className="mb-2 block">Colors</Label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="textColor" className="text-xs">Text Color</Label>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-6 h-6 border border-gray-300 rounded" 
                                style={{ backgroundColor: editedBook.exportSettings.textColor }}
                              />
                              <Input 
                                id="textColor"
                                type="text" 
                                value={editedBook.exportSettings.textColor} 
                                onChange={(e) => handleExportSettingChange('textColor', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="backgroundColor" className="text-xs">Background Color</Label>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-6 h-6 border border-gray-300 rounded" 
                                style={{ backgroundColor: editedBook.exportSettings.backgroundColor }}
                              />
                              <Input 
                                id="backgroundColor"
                                type="text" 
                                value={editedBook.exportSettings.backgroundColor} 
                                onChange={(e) => handleExportSettingChange('backgroundColor', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="headerColor" className="text-xs">Header Color</Label>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-6 h-6 border border-gray-300 rounded" 
                                style={{ backgroundColor: editedBook.exportSettings.headerColor }}
                              />
                              <Input 
                                id="headerColor"
                                type="text" 
                                value={editedBook.exportSettings.headerColor} 
                                onChange={(e) => handleExportSettingChange('headerColor', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="ai">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
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
                      <Slider 
                        min={0.1}
                        max={1}
                        step={0.05}
                        value={[editedBook.aiSettings.creativityLevel]}
                        onValueChange={(value) => handleAISettingChange('creativityLevel', value[0])}
                        className="w-full"
                      />
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <SettingTooltip content="Controls the overall tone and mood of the writing">
                          <Label>Tonality</Label>
                        </SettingTooltip>
                        <span className="text-sm text-muted-foreground">{editedBook.aiSettings.tonality}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        {['dark', 'serious', 'neutral', 'lighthearted', 'humorous'].map((tone) => (
                          <Button 
                            key={tone}
                            type="button"
                            variant={editedBook.aiSettings.tonality === tone ? "default" : "outline"}
                            onClick={() => handleAISettingChange('tonality', tone)}
                            className="capitalize text-xs"
                          >
                            {tone}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <SettingTooltip content="Controls how quickly events unfold in the story">
                          <Label>Pacing</Label>
                        </SettingTooltip>
                        <span className="text-sm text-muted-foreground">{editedBook.aiSettings.pacing}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {['slow', 'moderate', 'fast'].map((pace) => (
                          <Button 
                            key={pace}
                            type="button"
                            variant={editedBook.aiSettings.pacing === pace ? "default" : "outline"}
                            onClick={() => handleAISettingChange('pacing', pace)}
                            className="capitalize"
                          >
                            {pace}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <SettingTooltip content="Point of view from which the story is told">
                          <Label>Narrative Voice</Label>
                        </SettingTooltip>
                        <span className="text-sm text-muted-foreground">{editedBook.aiSettings.narrativeVoice.replace('-', ' ')}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {['first-person', 'second-person', 'third-person'].map((voice) => (
                          <Button 
                            key={voice}
                            type="button"
                            variant={editedBook.aiSettings.narrativeVoice === voice ? "default" : "outline"}
                            onClick={() => handleAISettingChange('narrativeVoice', voice)}
                            className="capitalize"
                          >
                            {voice.replace('-', ' ')}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <SettingTooltip content="How closely the AI should adhere to genre conventions">
                          <Label>Genre Adherence</Label>
                        </SettingTooltip>
                        <span className="text-sm text-muted-foreground">{editedBook.aiSettings.genreAdherence}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {['strict', 'flexible', 'experimental'].map((adherence) => (
                          <Button 
                            key={adherence}
                            type="button"
                            variant={editedBook.aiSettings.genreAdherence === adherence ? "default" : "outline"}
                            onClick={() => handleAISettingChange('genreAdherence', adherence)}
                            className="capitalize"
                          >
                            {adherence}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="languageFormality">Language Formality</Label>
                          <Select 
                            value={editedBook.aiSettings.languageFormality}
                            onValueChange={(value) => handleAISettingChange('languageFormality', value)}
                          >
                            <SelectTrigger id="languageFormality">
                              <SelectValue placeholder="Language formality" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="formal">Formal</SelectItem>
                              <SelectItem value="academic">Academic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sentenceComplexity">Sentence Complexity</Label>
                          <Select 
                            value={editedBook.aiSettings.sentenceComplexity}
                            onValueChange={(value) => handleAISettingChange('sentenceComplexity', value)}
                          >
                            <SelectTrigger id="sentenceComplexity">
                              <SelectValue placeholder="Sentence complexity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="simple">Simple</SelectItem>
                              <SelectItem value="varied">Varied</SelectItem>
                              <SelectItem value="complex">Complex</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="vocabularyLevel">Vocabulary Level</Label>
                          <Select 
                            value={editedBook.aiSettings.vocabularyLevel}
                            onValueChange={(value) => handleAISettingChange('vocabularyLevel', value)}
                          >
                            <SelectTrigger id="vocabularyLevel">
                              <SelectValue placeholder="Vocabulary level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="simple">Simple</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="useDialogue">Dialogue Usage</Label>
                          <Select 
                            value={editedBook.aiSettings.useDialogue}
                            onValueChange={(value) => handleAISettingChange('useDialogue', value)}
                          >
                            <SelectTrigger id="useDialogue">
                              <SelectValue placeholder="Dialogue usage" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="minimal">Minimal</SelectItem>
                              <SelectItem value="balanced">Balanced</SelectItem>
                              <SelectItem value="heavy">Heavy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="useMetaphors">Use of Metaphors & Similes</Label>
                          <Select 
                            value={editedBook.aiSettings.useMetaphors}
                            onValueChange={(value) => handleAISettingChange('useMetaphors', value)}
                          >
                            <SelectTrigger id="useMetaphors">
                              <SelectValue placeholder="Use of metaphors" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="minimal">Minimal</SelectItem>
                              <SelectItem value="occasional">Occasional</SelectItem>
                              <SelectItem value="frequent">Frequent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <SettingTooltip content="Target audience age range">
                            <Label htmlFor="audienceAge">Target Audience Age</Label>
                          </SettingTooltip>
                          <Select 
                            value={editedBook.aiSettings.audienceAge}
                            onValueChange={(value) => handleAISettingChange('audienceAge', value)}
                          >
                            <SelectTrigger id="audienceAge">
                              <SelectValue placeholder="Target audience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="children">Children</SelectItem>
                              <SelectItem value="middle-grade">Middle Grade</SelectItem>
                              <SelectItem value="young-adult">Young Adult</SelectItem>
                              <SelectItem value="adult">Adult</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="emotionalImpact">Emotional Impact</Label>
                          <Select 
                            value={editedBook.aiSettings.emotionalImpact}
                            onValueChange={(value) => handleAISettingChange('emotionalImpact', value)}
                          >
                            <SelectTrigger id="emotionalImpact">
                              <SelectValue placeholder="Emotional impact" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="subtle">Subtle</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="intense">Intense</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sensoryDescription">Sensory Description</Label>
                          <Select 
                            value={editedBook.aiSettings.sensoryDescription}
                            onValueChange={(value) => handleAISettingChange('sensoryDescription', value)}
                          >
                            <SelectTrigger id="sensoryDescription">
                              <SelectValue placeholder="Sensory description" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="minimal">Minimal</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="vivid">Vivid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="worldBuildingDetail">World-Building Detail</Label>
                          <Select 
                            value={editedBook.aiSettings.worldBuildingDetail}
                            onValueChange={(value) => handleAISettingChange('worldBuildingDetail', value)}
                          >
                            <SelectTrigger id="worldBuildingDetail">
                              <SelectValue placeholder="World-building detail" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="minimal">Minimal</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="expansive">Expansive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="plotComplexity">Plot Complexity</Label>
                          <Select 
                            value={editedBook.aiSettings.plotComplexity}
                            onValueChange={(value) => handleAISettingChange('plotComplexity', value)}
                          >
                            <SelectTrigger id="plotComplexity">
                              <SelectValue placeholder="Plot complexity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="simple">Simple</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="complex">Complex</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="includeCliffhangers">Include Cliffhangers</Label>
                          <Select 
                            value={editedBook.aiSettings.includeCliffhangers}
                            onValueChange={(value) => handleAISettingChange('includeCliffhangers', value)}
                          >
                            <SelectTrigger id="includeCliffhangers">
                              <SelectValue placeholder="Include cliffhangers" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="never">Never</SelectItem>
                              <SelectItem value="sometimes">Sometimes</SelectItem>
                              <SelectItem value="often">Often</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timelineStructure">Timeline Structure</Label>
                          <Select 
                            value={editedBook.aiSettings.timelineStructure}
                            onValueChange={(value) => handleAISettingChange('timelineStructure', value)}
                          >
                            <SelectTrigger id="timelineStructure">
                              <SelectValue placeholder="Timeline structure" />
                            </SelectTrigger>
                            <SelectContent>
                              {timelineStructures.map((structure) => (
                                <SelectItem key={structure} value={structure}>{structure.replace('-', ' ').charAt(0).toUpperCase() + structure.replace('-', ' ').slice(1)}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="mb-4 block text-lg font-semibold">Content Controls</Label>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <SettingTooltip content="Consider this book as part of a series with sequel potential">
                              <Label htmlFor="seriesContemplation">Series Contemplation</Label>
                            </SettingTooltip>
                            <Switch 
                              id="seriesContemplation"
                              checked={editedBook.aiSettings.seriesContemplation}
                              onCheckedChange={(value) => handleAISettingChange('seriesContemplation', value)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <SettingTooltip content="Allow explicit/mature content in generated text">
                              <Label htmlFor="allowExplicitContent">Allow Explicit Content</Label>
                            </SettingTooltip>
                            <Switch 
                              id="allowExplicitContent"
                              checked={editedBook.aiSettings.allowExplicitContent}
                              onCheckedChange={(value) => handleAISettingChange('allowExplicitContent', value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="includeFlashbacks">Include Flashbacks</Label>
                            <Select 
                              value={editedBook.aiSettings.includeFlashbacks}
                              onValueChange={(value) => handleAISettingChange('includeFlashbacks', value)}
                            >
                              <SelectTrigger id="includeFlashbacks">
                                <SelectValue placeholder="Include flashbacks" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="never">Never</SelectItem>
                                <SelectItem value="occasionally">Occasionally</SelectItem>
                                <SelectItem value="frequently">Frequently</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="conflictIntensity">Conflict Intensity</Label>
                            <Select 
                              value={editedBook.aiSettings.conflictIntensity}
                              onValueChange={(value) => handleAISettingChange('conflictIntensity', value)}
                            >
                              <SelectTrigger id="conflictIntensity">
                                <SelectValue placeholder="Conflict intensity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mild">Mild</SelectItem>
                                <SelectItem value="moderate">Moderate</SelectItem>
                                <SelectItem value="intense">Intense</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="humorLevel">Humor Level</Label>
                            <Select 
                              value={editedBook.aiSettings.humorLevel}
                              onValueChange={(value) => handleAISettingChange('humorLevel', value)}
                            >
                              <SelectTrigger id="humorLevel">
                                <SelectValue placeholder="Humor level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="subtle">Subtle</SelectItem>
                                <SelectItem value="moderate">Moderate</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="mb-4 block text-lg font-semibold">Structure Preferences</Label>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="chapterLength">Chapter Length</Label>
                            <Select 
                              value={editedBook.aiSettings.chapterLength}
                              onValueChange={(value) => handleAISettingChange('chapterLength', value)}
                            >
                              <SelectTrigger id="chapterLength">
                                <SelectValue placeholder="Chapter length" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="short">Short (~1,500 words)</SelectItem>
                                <SelectItem value="medium">Medium (~3,000 words)</SelectItem>
                                <SelectItem value="long">Long (~5,000 words)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="thematicEmphasis">Thematic Emphasis</Label>
                            <Select 
                              value={editedBook.aiSettings.thematicEmphasis}
                              onValueChange={(value) => handleAISettingChange('thematicEmphasis', value)}
                            >
                              <SelectTrigger id="thematicEmphasis">
                                <SelectValue placeholder="Thematic emphasis" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="subtle">Subtle</SelectItem>
                                <SelectItem value="moderate">Moderate</SelectItem>
                                <SelectItem value="overt">Overt</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="characterDevelopment">Character Development</Label>
                            <Select 
                              value={editedBook.aiSettings.characterDevelopment}
                              onValueChange={(value) => handleAISettingChange('characterDevelopment', value)}
                            >
                              <SelectTrigger id="characterDevelopment">
                                <SelectValue placeholder="Character development" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="subtle">Subtle</SelectItem>
                                <SelectItem value="gradual">Gradual</SelectItem>
                                <SelectItem value="significant">Significant</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
};

export default BookSettingsSection;
