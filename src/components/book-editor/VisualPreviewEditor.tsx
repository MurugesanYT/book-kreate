
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ExportFormat } from '@/lib/api/types';
import { getAllowedExportFormats, getUserPlan } from '@/lib/api/planService';
import { generatePreviewContent, PreviewGenerationProps } from './previews/PreviewFactory';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, ExternalLink, Download, Check, Settings, Sparkles, ZoomIn, ZoomOut, RotateCw, Book, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { generateEbookPreview } from './previews/EbookPreview';

interface VisualPreviewEditorProps {
  format: ExportFormat;
  book: any;
  options?: any;
  content?: string;
  onContentChange?: (content: string) => void;
  onOptionsChange?: (options: any) => void;
  previewInNewTab?: boolean;
}

const VisualPreviewEditor: React.FC<VisualPreviewEditorProps> = ({ 
  format, 
  book, 
  options = {}, 
  content,
  onContentChange,
  onOptionsChange,
  previewInNewTab = false
}) => {
  const [previewContent, setPreviewContent] = useState<string>('');
  const [previewWindow, setPreviewWindow] = useState<Window | null>(null);
  const [isFormatAllowed, setIsFormatAllowed] = useState<boolean>(true);
  const [previewMode, setPreviewMode] = useState<'visual' | 'device' | 'settings'>('visual');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile' | 'ereader' | 'print'>('desktop');
  const [showGuides, setShowGuides] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const userPlan = getUserPlan();
  
  // Check if the format is allowed based on user's plan
  useEffect(() => {
    const allowedFormats = getAllowedExportFormats();
    setIsFormatAllowed(allowedFormats.includes(format));
  }, [format]);

  // Generate preview content based on format and options
  useEffect(() => {
    const previewProps: PreviewGenerationProps = {
      format,
      isFormatAllowed,
      book,
      options,
      previewWindow,
      previewInNewTab,
      darkMode,
    };
    
    const preview = generatePreviewContent(previewProps);
    setPreviewContent(preview);
  }, [format, book, options, previewInNewTab, previewWindow, isFormatAllowed, darkMode]);
  
  // Listen for messages from preview window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'ready' && previewInNewTab) {
        // Store the reference to the window that sent the message
        setPreviewWindow(event.source as Window);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [previewInNewTab]);

  // Simulate refreshing state
  const refreshPreview = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Re-generate the preview with current settings
      const previewProps: PreviewGenerationProps = {
        format,
        isFormatAllowed,
        book,
        options,
        previewWindow,
        previewInNewTab,
        darkMode,
      };
      
      const preview = generatePreviewContent(previewProps);
      setPreviewContent(preview);
      setIsRefreshing(false);
    }, 800);
  };

  // Update options from settings panel
  const updateOptions = (key: string, value: any) => {
    const updatedOptions = {
      ...options,
      [key]: value
    };
    
    if (onOptionsChange) {
      onOptionsChange(updatedOptions);
    }
  };

  // Update nested options from settings panel
  const updateNestedOptions = (parentKey: string, key: string, value: any) => {
    const updatedOptions = {
      ...options,
      [parentKey]: {
        ...(options[parentKey] || {}),
        [key]: value
      }
    };
    
    if (onOptionsChange) {
      onOptionsChange(updatedOptions);
    }
  };

  const getDeviceFrame = () => {
    switch(deviceType) {
      case 'tablet':
        return {
          width: '768px',
          height: '1024px',
          transform: `scale(${zoomLevel/100})`,
          borderRadius: '20px',
          border: '16px solid #e2e2e2',
        };
      case 'mobile':
        return {
          width: '375px',
          height: '667px',
          transform: `scale(${zoomLevel/100})`,
          borderRadius: '36px',
          border: '16px solid #121212',
        };
      case 'ereader':
        return {
          width: '600px',
          height: '800px',
          transform: `scale(${zoomLevel/100})`,
          borderRadius: '2px',
          border: '20px solid #e6e6e6',
          background: '#f7f7f7',
        };
      case 'print':
        return {
          width: '595px',  // A4 size at 72dpi
          height: '842px',
          transform: `scale(${zoomLevel/100})`,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
          border: '1px solid #ddd',
          background: 'white',
        };
      case 'desktop':
      default:
        return {
          width: '100%',
          maxWidth: '1200px',
          minHeight: '600px',
          transform: `scale(${zoomLevel/100})`,
        };
    }
  };

  const isPremiumFeature = (feature: 'device-preview' | 'dark-mode' | 'custom-styling') => {
    if (feature === 'device-preview' || feature === 'dark-mode') {
      return userPlan === 'Basic';
    }
    if (feature === 'custom-styling') {
      return userPlan === 'Basic' || userPlan === 'Pro';
    }
    return false;
  };

  const renderPreviewContent = () => {
    if (!isFormatAllowed) {
      return (
        <div className="p-10 text-center">
          <div className="inline-block p-3 rounded-full bg-amber-100 mb-5">
            <Book className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Format Not Available</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            The {format.toUpperCase()} format is not available in your {userPlan} plan. Upgrade to unlock more export formats.
          </p>
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade Plan
          </Button>
        </div>
      );
    }

    if (previewInNewTab) {
      return (
        <div className="text-center p-12">
          <div className="inline-block p-3 rounded-full bg-blue-100 mb-5">
            <ExternalLink className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xl font-semibold mb-2">Preview opened in a new tab</p>
          <p className="text-gray-500 mb-6">
            Check your browser for the preview window
          </p>
          <Button variant="outline" size="sm" onClick={() => window.open('', 'preview_window', 'width=800,height=600')}>
            <Eye className="mr-2 h-4 w-4" />
            Reopen Preview Window
          </Button>
        </div>
      );
    }

    return (
      <div 
        className={`preview-container origin-top transition-all duration-200 ${darkMode ? 'dark-preview' : ''}`}
        style={getDeviceFrame()}
      >
        {showGuides && deviceType !== 'desktop' && (
          <div className="guides-overlay absolute inset-0 pointer-events-none">
            <div className="horizontal-center absolute top-0 bottom-0 left-1/2 w-px bg-blue-400 opacity-30"></div>
            <div className="vertical-center absolute left-0 right-0 top-1/2 h-px bg-blue-400 opacity-30"></div>
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: previewContent }} />
      </div>
    );
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Preview: {format.toUpperCase()}</CardTitle>
            <CardDescription>
              Preview how your book will appear in {format.toUpperCase()} format
            </CardDescription>
          </div>
          <Tabs value={previewMode} onValueChange={(val) => setPreviewMode(val as 'visual' | 'device' | 'settings')} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="visual" className="text-xs">
                <Eye className="h-3.5 w-3.5 mr-1" />
                Preview
              </TabsTrigger>
              <TabsTrigger 
                value="device" 
                className="text-xs" 
                disabled={isPremiumFeature('device-preview')}
              >
                <BookOpen className="h-3.5 w-3.5 mr-1" />
                Device
                {isPremiumFeature('device-preview') && (
                  <Badge variant="outline" className="ml-1 text-[0.6rem]">Pro+</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs">
                <Settings className="h-3.5 w-3.5 mr-1" />
                Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      {previewMode === 'device' && (
        <div className="px-6">
          <div className="flex items-center justify-between border rounded-md p-2 mb-3 bg-slate-50">
            <div className="flex items-center space-x-2">
              <Button 
                variant={deviceType === 'desktop' ? "default" : "outline"} 
                size="sm" 
                onClick={() => setDeviceType('desktop')}
                className="h-8 text-xs"
              >
                Desktop
              </Button>
              <Button 
                variant={deviceType === 'tablet' ? "default" : "outline"} 
                size="sm" 
                onClick={() => setDeviceType('tablet')}
                className="h-8 text-xs"
                disabled={isPremiumFeature('device-preview')}
              >
                Tablet
              </Button>
              <Button 
                variant={deviceType === 'mobile' ? "default" : "outline"} 
                size="sm" 
                onClick={() => setDeviceType('mobile')}
                className="h-8 text-xs"
                disabled={isPremiumFeature('device-preview')}
              >
                Mobile
              </Button>
              <Button 
                variant={deviceType === 'ereader' ? "default" : "outline"} 
                size="sm" 
                onClick={() => setDeviceType('ereader')}
                className="h-8 text-xs"
                disabled={isPremiumFeature('device-preview')}
              >
                E-Reader
              </Button>
              <Button 
                variant={deviceType === 'print' ? "default" : "outline"} 
                size="sm" 
                onClick={() => setDeviceType('print')}
                className="h-8 text-xs"
                disabled={isPremiumFeature('device-preview')}
              >
                Print
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowGuides(!showGuides)}
                      className={showGuides ? "bg-slate-200" : ""}
                      disabled={deviceType === 'desktop'}
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M14 0H1C0.447715 0 0 0.447715 0 1V14C0 14.5523 0.447715 15 1 15H14C14.5523 15 15 14.5523 15 14V1C15 0.447715 14.5523 0 14 0ZM14 1V4H1V1H14ZM1 14V5H4V14H1ZM5 14V5H14V14H5Z" fill="currentColor" />
                      </svg>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle alignment guides</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      )}

      {previewMode === 'settings' && (
        <div className="px-6 py-2">
          <div className="border rounded-md p-3 mb-3 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="grid gap-1.5">
                <Label htmlFor="zoom">Zoom Level: {zoomLevel}%</Label>
                <Slider
                  id="zoom"
                  min={25}
                  max={150}
                  step={5}
                  value={[zoomLevel]}
                  onValueChange={(values) => setZoomLevel(values[0])}
                  className="w-[180px]"
                />
              </div>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setZoomLevel(Math.max(25, zoomLevel - 10))}
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zoom out</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setZoomLevel(100)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Reset zoom</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zoom in</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="dark-mode" className="cursor-pointer">Dark Mode Preview</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline">Pro+</Badge>
                    </TooltipTrigger>
                    <TooltipContent>Available with Pro or Ultimate plans</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
                disabled={isPremiumFeature('dark-mode')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="new-tab" className="cursor-pointer">Open in New Tab</Label>
              </div>
              <Switch
                id="new-tab"
                checked={previewInNewTab}
                onCheckedChange={(value) => {
                  // This would need to be lifted up to parent component
                  // For demo purposes we'll just show a notification
                  alert("This setting would need to be controlled by the parent component");
                }}
              />
            </div>
          </div>

          {format === 'pdf' || format === 'epub' || format === 'docx' && (
            <>
              <Separator className="my-3" />
              
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Format-Specific Settings</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fontSize" className="text-xs">Font Size (pt)</Label>
                    <div className="flex items-center mt-1">
                      <input 
                        type="number"
                        id="fontSize"
                        className="w-full rounded-md border border-input px-3 py-1 text-sm"
                        min={8}
                        max={24}
                        value={options.fontSize || 12}
                        onChange={(e) => updateOptions('fontSize', parseInt(e.target.value) || 12)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="lineSpacing" className="text-xs">Line Spacing</Label>
                    <div className="flex items-center mt-1">
                      <select
                        id="lineSpacing"
                        className="w-full rounded-md border border-input px-3 py-1 text-sm"
                        value={options.lineSpacing || 1.5}
                        onChange={(e) => updateOptions('lineSpacing', parseFloat(e.target.value))}
                      >
                        <option value="1.0">Single</option>
                        <option value="1.15">1.15</option>
                        <option value="1.5">1.5</option>
                        <option value="2.0">Double</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeTableOfContents" className="text-xs">Include Table of Contents</Label>
                  <Switch
                    id="includeTableOfContents"
                    checked={options.includeTableOfContents !== false}
                    onCheckedChange={(value) => updateOptions('includeTableOfContents', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="includePageNumbers" className="text-xs">Include Page Numbers</Label>
                  <Switch
                    id="includePageNumbers"
                    checked={options.includePageNumbers !== false}
                    onCheckedChange={(value) => updateOptions('includePageNumbers', value)}
                  />
                </div>

                {format === 'epub' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="chapterLayout" className="text-xs">Chapter Layout</Label>
                      <div className="flex items-center mt-1">
                        <select
                          id="chapterLayout"
                          className="w-full rounded-md border border-input px-3 py-1 text-sm"
                          value={(options.styling && options.styling.chapterLayout) || 'standard'}
                          onChange={(e) => updateNestedOptions('styling', 'chapterLayout', e.target.value)}
                          disabled={isPremiumFeature('custom-styling')}
                        >
                          <option value="standard">Standard</option>
                          <option value="centered">Centered</option>
                          <option value="drop-cap">Drop Cap</option>
                          <option value="ornamental">Ornamental</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="fontFamily" className="text-xs">Font Family</Label>
                      <div className="flex items-center mt-1">
                        <select
                          id="fontFamily"
                          className="w-full rounded-md border border-input px-3 py-1 text-sm"
                          value={options.fontFamily || 'serif'}
                          onChange={(e) => updateOptions('fontFamily', e.target.value)}
                          disabled={isPremiumFeature('custom-styling')}
                        >
                          <option value="serif">Serif</option>
                          <option value="sans-serif">Sans Serif</option>
                          <option value="monospace">Monospace</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
      
      <CardContent className={`relative ${previewMode === 'settings' ? 'pt-0' : 'pt-2'}`}>
        <div className={`flex justify-center items-center min-h-[400px] overflow-auto ${deviceType !== 'desktop' ? 'bg-slate-100 rounded-lg p-8' : ''}`}>
          {isRefreshing ? (
            <div className="text-center">
              <RotateCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Refreshing preview...</p>
            </div>
          ) : (
            renderPreviewContent()
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-3 pb-2">
        <div className="text-xs text-muted-foreground">
          Previewing book: <span className="font-medium">{book.title}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={refreshPreview}>
            <RotateCw className="h-3.5 w-3.5 mr-1" />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="h-3.5 w-3.5 mr-1" />
            Export {format.toUpperCase()}
          </Button>
        </div>
      </CardFooter>

      <style jsx global>{`
        .preview-container.dark-preview {
          background-color: #121212;
          color: #e0e0e0;
        }
        .preview-container.dark-preview h1,
        .preview-container.dark-preview h2,
        .preview-container.dark-preview h3 {
          color: #ffffff;
        }
      `}</style>
    </Card>
  );
};

export default VisualPreviewEditor;
