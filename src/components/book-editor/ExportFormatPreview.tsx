
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExportFormat, PDFExportOptions, EPUBExportOptions } from '@/lib/api/types';
import VisualPreviewEditor from './VisualPreviewEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Eye, ZoomIn } from 'lucide-react';

interface ExportFormatPreviewProps {
  format: ExportFormat;
  book: any;
  options?: any;
  onOptionsChange?: (options: any) => void;
}

const ExportFormatPreview: React.FC<ExportFormatPreviewProps> = ({ 
  format, 
  book, 
  options: initialOptions,
  onOptionsChange 
}) => {
  // Default PDF options
  const defaultPdfOptions: PDFExportOptions = {
    showPageNumbers: true,
    includeMargins: true,
    headerFooter: true,
    coverPage: true,
    colorScheme: "default",
    pageSize: "a4",
    orientation: "portrait",
    decorativeElements: true,
    chapterDividers: true,
    dropCaps: false,
    textAlignment: "left",
    lineSpacing: "normal",
    pageMargins: "normal",
    paperTextureEffect: true,
    fontFamily: 'Georgia',
    fontSize: 12
  };
  
  // Default EPUB options
  const defaultEpubOptions: EPUBExportOptions = {
    includeTableOfContents: true,
    coverImage: true,
    metadata: {
      author: book.author || 'Unknown',
      language: 'en',
    },
    styling: {
      fontFamily: 'serif',
      fontSize: '1em',
      lineHeight: '1.5',
      textAlign: 'left',
    },
    fontFamily: 'serif',
    fontSize: 12
  };

  // Use provided options or defaults
  const [options, setOptions] = useState(
    initialOptions || 
    (format === 'pdf' ? defaultPdfOptions : 
     format.includes('epub') ? defaultEpubOptions : {})
  );

  const [activeTab, setActiveTab] = useState<'preview' | 'customize'>('preview');
  const [previewInNewTab, setPreviewInNewTab] = useState(false);

  // Handle option changes
  const handleOptionChange = (key: string, value: any) => {
    const updatedOptions = { ...options, [key]: value };
    setOptions(updatedOptions);
    if (onOptionsChange) {
      onOptionsChange(updatedOptions);
    }
  };

  // Handle nested option changes
  const handleNestedOptionChange = (parent: string, key: string, value: any) => {
    const updatedOptions = { 
      ...options, 
      [parent]: { 
        ...options[parent], 
        [key]: value 
      } 
    };
    setOptions(updatedOptions);
    if (onOptionsChange) {
      onOptionsChange(updatedOptions);
    }
  };

  // Open preview in new tab
  const handleOpenInNewTab = () => {
    // Create a data URI for the preview content
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${book.title} - ${format.toUpperCase()} Preview</title>
            <style>
              body { font-family: ${options.fontFamily || 'serif'}; margin: 0; padding: 20px; }
              .container { max-width: 800px; margin: 0 auto; }
              h1 { color: #333; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>${book.title} - ${format.toUpperCase()} Preview</h1>
              <div id="preview-content"></div>
            </div>
            <script>
              // Will be populated by the preview component
              window.addEventListener('message', function(event) {
                document.getElementById('preview-content').innerHTML = event.data;
              });
              window.opener.postMessage('ready', '*');
            </script>
          </body>
        </html>
      `);
      previewWindow.document.close();
      setPreviewInNewTab(true);
    }
  };

  // Render different option sets based on format
  const renderFormatOptions = () => {
    switch (format) {
      case 'pdf':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-md font-semibold">Page Layout</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pageSize">Page Size</Label>
                  <Select 
                    value={options.pageSize} 
                    onValueChange={(value) => handleOptionChange('pageSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Page Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4</SelectItem>
                      <SelectItem value="a5">A5</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="6x9">6x9 inches</SelectItem>
                      <SelectItem value="5x8">5x8 inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orientation">Orientation</Label>
                  <Select 
                    value={options.orientation} 
                    onValueChange={(value) => handleOptionChange('orientation', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Orientation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="pageMargins">Page Margins</Label>
                  <Select 
                    value={options.pageMargins} 
                    onValueChange={(value) => handleOptionChange('pageMargins', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Margins" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="narrow">Narrow</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="wide">Wide</SelectItem>
                      <SelectItem value="mirrored">Mirrored</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch 
                    id="showPageNumbers"
                    checked={options.showPageNumbers}
                    onCheckedChange={(checked) => handleOptionChange('showPageNumbers', checked)}
                  />
                  <Label htmlFor="showPageNumbers">Show Page Numbers</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-md font-semibold">Typography</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select 
                    value={options.fontFamily} 
                    onValueChange={(value) => handleOptionChange('fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Font Family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Garamond">Garamond</SelectItem>
                      <SelectItem value="Baskerville">Baskerville</SelectItem>
                      <SelectItem value="Caslon">Caslon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size: {options.fontSize}pt</Label>
                  <Slider 
                    id="fontSize"
                    min={8} 
                    max={16} 
                    step={0.5}
                    defaultValue={[options.fontSize]} 
                    onValueChange={(value) => handleOptionChange('fontSize', value[0])}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="textAlignment">Text Alignment</Label>
                  <Select 
                    value={options.textAlignment} 
                    onValueChange={(value) => handleOptionChange('textAlignment', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Text Alignment" />
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
                  <Label htmlFor="lineSpacing">Line Spacing</Label>
                  <Select 
                    value={options.lineSpacing} 
                    onValueChange={(value) => handleOptionChange('lineSpacing', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Line Spacing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="normal">Normal (1.15)</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                      <SelectItem value="relaxed">Relaxed (1.5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-md font-semibold">Style & Effects</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="headerFooter"
                    checked={options.headerFooter}
                    onCheckedChange={(checked) => handleOptionChange('headerFooter', checked)}
                  />
                  <Label htmlFor="headerFooter">Header & Footer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="decorativeElements"
                    checked={options.decorativeElements}
                    onCheckedChange={(checked) => handleOptionChange('decorativeElements', checked)}
                  />
                  <Label htmlFor="decorativeElements">Decorative Elements</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="chapterDividers"
                    checked={options.chapterDividers}
                    onCheckedChange={(checked) => handleOptionChange('chapterDividers', checked)}
                  />
                  <Label htmlFor="chapterDividers">Chapter Dividers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="dropCaps"
                    checked={options.dropCaps}
                    onCheckedChange={(checked) => handleOptionChange('dropCaps', checked)}
                  />
                  <Label htmlFor="dropCaps">Drop Caps</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="paperTextureEffect"
                    checked={options.paperTextureEffect}
                    onCheckedChange={(checked) => handleOptionChange('paperTextureEffect', checked)}
                  />
                  <Label htmlFor="paperTextureEffect">Paper Texture Effect</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="coverPage"
                    checked={options.coverPage}
                    onCheckedChange={(checked) => handleOptionChange('coverPage', checked)}
                  />
                  <Label htmlFor="coverPage">Include Cover Page</Label>
                </div>
              </div>

              <div className="pt-2">
                <Label htmlFor="colorScheme">Color Scheme</Label>
                <Select 
                  value={options.colorScheme} 
                  onValueChange={(value) => handleOptionChange('colorScheme', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Color Scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="sepia">Sepia</SelectItem>
                    <SelectItem value="night">Night</SelectItem>
                    <SelectItem value="contrast">High Contrast</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      
      case 'epub':
      case 'mobi':  
      case 'azw3':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-md font-semibold">E-book Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="includeTableOfContents"
                    checked={options.includeTableOfContents}
                    onCheckedChange={(checked) => handleOptionChange('includeTableOfContents', checked)}
                  />
                  <Label htmlFor="includeTableOfContents">Table of Contents</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="coverImage"
                    checked={options.coverImage}
                    onCheckedChange={(checked) => handleOptionChange('coverImage', checked)}
                  />
                  <Label htmlFor="coverImage">Cover Image</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-md font-semibold">Typography</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select 
                    value={options.fontFamily} 
                    onValueChange={(value) => handleOptionChange('fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Font Family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="sans-serif">Sans-serif</SelectItem>
                      <SelectItem value="monospace">Monospace</SelectItem>
                      <SelectItem value="bookerly">Bookerly</SelectItem>
                      <SelectItem value="literata">Literata</SelectItem>
                      <SelectItem value="merriweather">Merriweather</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size: {options.fontSize}pt</Label>
                  <Slider 
                    id="fontSize"
                    min={8} 
                    max={16} 
                    step={0.5}
                    defaultValue={[options.fontSize]} 
                    onValueChange={(value) => handleOptionChange('fontSize', value[0])}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="textAlign">Text Alignment</Label>
                  <Select 
                    value={options.styling?.textAlign || 'left'} 
                    onValueChange={(value) => handleNestedOptionChange('styling', 'textAlign', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Text Alignment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="justify">Justify</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lineHeight">Line Height</Label>
                  <Select 
                    value={options.styling?.lineHeight || '1.5'} 
                    onValueChange={(value) => handleNestedOptionChange('styling', 'lineHeight', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Line Height" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.2">Tight (1.2)</SelectItem>
                      <SelectItem value="1.5">Normal (1.5)</SelectItem>
                      <SelectItem value="1.8">Relaxed (1.8)</SelectItem>
                      <SelectItem value="2.0">Loose (2.0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-md font-semibold">Metadata</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={options.metadata?.language || 'en'} 
                    onValueChange={(value) => handleNestedOptionChange('metadata', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {format === 'epub' && (
                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Select 
                      value={options.metadata?.publisher || ''} 
                      onValueChange={(value) => handleNestedOptionChange('metadata', 'publisher', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Publisher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Self-Published</SelectItem>
                        <SelectItem value="Book Kreate Press">Book Kreate Press</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'html':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-md font-semibold">HTML Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="includeStylesheet"
                    checked={options.includeStylesheet !== false}
                    onCheckedChange={(checked) => handleOptionChange('includeStylesheet', checked)}
                  />
                  <Label htmlFor="includeStylesheet">Include Stylesheet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="responsiveDesign"
                    checked={options.responsiveDesign !== false}
                    onCheckedChange={(checked) => handleOptionChange('responsiveDesign', checked)}
                  />
                  <Label htmlFor="responsiveDesign">Responsive Design</Label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select 
                    value={options.theme || 'light'} 
                    onValueChange={(value) => handleOptionChange('theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="sepia">Sepia</SelectItem>
                      <SelectItem value="contrast">High Contrast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="layout">Layout</Label>
                  <Select 
                    value={options.layout || 'book'} 
                    onValueChange={(value) => handleOptionChange('layout', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="book">Book</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="manuscript">Manuscript</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-md font-semibold">Typography</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select 
                    value={options.fontFamily || 'serif'} 
                    onValueChange={(value) => handleOptionChange('fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Font Family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="sans-serif">Sans-serif</SelectItem>
                      <SelectItem value="monospace">Monospace</SelectItem>
                      <SelectItem value="Georgia, serif">Georgia</SelectItem>
                      <SelectItem value="'Times New Roman', Times, serif">Times New Roman</SelectItem>
                      <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                      <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Base Font Size: {options.fontSize || 16}px</Label>
                  <Slider 
                    id="fontSize"
                    min={12} 
                    max={24} 
                    step={1}
                    defaultValue={[options.fontSize || 16]} 
                    onValueChange={(value) => handleOptionChange('fontSize', value[0])}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-md font-semibold">Navigation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="includeTableOfContents"
                    checked={options.includeTableOfContents !== false}
                    onCheckedChange={(checked) => handleOptionChange('includeTableOfContents', checked)}
                  />
                  <Label htmlFor="includeTableOfContents">Table of Contents</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="chapterNavigation"
                    checked={options.chapterNavigation !== false}
                    onCheckedChange={(checked) => handleOptionChange('chapterNavigation', checked)}
                  />
                  <Label htmlFor="chapterNavigation">Chapter Navigation</Label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center p-4 text-gray-500">
            <p>Format-specific options will appear here.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Format Preview: {format.toUpperCase()}</h3>
        <Button variant="outline" size="sm" onClick={handleOpenInNewTab}>
          <Eye className="h-4 w-4 mr-2" />
          Preview in New Tab
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'preview' | 'customize')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="pt-4">
          <VisualPreviewEditor 
            format={format}
            book={book}
            options={options}
            previewInNewTab={previewInNewTab}
          />
        </TabsContent>
        
        <TabsContent value="customize" className="pt-4">
          {renderFormatOptions()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportFormatPreview;
