
import React from 'react';
import { getAllThemeOptions } from '@/lib/pdf/pdfExporter';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface PDFThemePreviewProps {
  selectedTheme: string;
  onThemeSelect: (themeId: string) => void;
}

const PDFThemePreview: React.FC<PDFThemePreviewProps> = ({
  selectedTheme,
  onThemeSelect
}) => {
  const themeOptions = getAllThemeOptions();
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-2">Choose a Theme</h3>
      <p className="text-sm text-gray-500 mb-4">
        Select from over 50 professional themes to match your book's style
      </p>
      
      <ScrollArea className="h-[300px] w-full pr-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themeOptions.map((theme) => (
            <Card 
              key={theme.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedTheme === theme.id 
                  ? 'ring-2 ring-primary ring-offset-2' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => onThemeSelect(theme.id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{theme.name}</span>
                  {selectedTheme === theme.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                      ✓
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col space-y-2">
                  {/* Theme preview */}
                  <div 
                    className="w-full h-24 rounded-md p-2"
                    style={{ backgroundColor: theme.colors.background }}
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div 
                        className="text-sm font-medium" 
                        style={{ color: theme.colors.primary }}
                      >
                        Sample Title
                      </div>
                      <div className="flex justify-between items-end">
                        <div 
                          className="text-xs" 
                          style={{ color: theme.colors.primary }}
                        >
                          Page text preview
                        </div>
                        <div 
                          className="text-xs font-bold" 
                          style={{ color: theme.colors.accent }}
                        >
                          Accent
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Color swatches */}
                  <div className="flex space-x-1">
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: theme.colors.primary }}
                      title="Primary color"
                    />
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-200" 
                      style={{ backgroundColor: theme.colors.background }}
                      title="Background color"
                    />
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: theme.colors.accent }}
                      title="Accent color"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PDFThemePreview;
