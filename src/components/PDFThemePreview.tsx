
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { getAllThemeOptions } from '@/lib/pdf/pdfExporter';

interface PDFThemePreviewProps {
  selectedTheme: string;
  onThemeSelect: (themeId: string) => void;
}

const PDFThemePreview: React.FC<PDFThemePreviewProps> = ({
  selectedTheme,
  onThemeSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredThemes, setFilteredThemes] = useState(getAllThemeOptions());
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  
  // Theme categories for filtering
  const themeCategories = [
    'Professional', 
    'Nature', 
    'Seasonal',
    'Cultural',
    'Literary',
    'Color',
    'Time Period',
    'Abstract',
    'Modern',
    'All'
  ];
  
  // Filter themes based on search query and category filters
  useEffect(() => {
    const allThemes = getAllThemeOptions();
    
    let filtered = allThemes;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(theme => 
        theme.name.toLowerCase().includes(query) || 
        theme.id.toLowerCase().includes(query)
      );
    }
    
    // Apply category filters
    if (categoryFilters.length > 0 && !categoryFilters.includes('All')) {
      filtered = filtered.filter(theme => {
        // Map theme IDs to categories based on naming convention
        const themeCategory = 
          theme.id.includes('forest') || theme.id.includes('ocean') || 
          theme.id.includes('autumn') || theme.id.includes('spring') || 
          theme.id.includes('desert') || theme.id.includes('mountain') || 
          theme.id.includes('lavender') || theme.id.includes('cherry') || 
          theme.id.includes('evergreen') || theme.id.includes('sunset') ? 'Nature' :
          
          theme.id.includes('winter') || theme.id.includes('summer') ? 'Seasonal' :
          
          theme.id.includes('nordic') || theme.id.includes('moroccan') || 
          theme.id.includes('japanese') || theme.id.includes('greek') || 
          theme.id.includes('indian') || theme.id.includes('scandinavian') || 
          theme.id.includes('rustic') || theme.id.includes('italian') ? 'Cultural' :
          
          theme.id.includes('mystery') || theme.id.includes('scifi') || 
          theme.id.includes('romance') || theme.id.includes('horror') || 
          theme.id.includes('biography') || theme.id.includes('historical') || 
          theme.id.includes('mythology') || theme.id.includes('adventure') ? 'Literary' :
          
          theme.id.includes('emerald') || theme.id.includes('ruby') || 
          theme.id.includes('sapphire') || theme.id.includes('amber') || 
          theme.id.includes('jade') || theme.id.includes('amethyst') || 
          theme.id.includes('coral') || theme.id.includes('turquoise') ? 'Color' :
          
          theme.id.includes('retro') || theme.id.includes('vintage') || 
          theme.id.includes('medieval') || theme.id.includes('victorian') || 
          theme.id.includes('artdeco') || theme.id.includes('futuristic') || 
          theme.id.includes('renaissance') || theme.id.includes('baroque') ? 'Time Period' :
          
          theme.id.includes('serenity') || theme.id.includes('harmony') || 
          theme.id.includes('vitality') || theme.id.includes('tranquil') || 
          theme.id.includes('mystical') || theme.id.includes('clarity') || 
          theme.id.includes('wisdom') || theme.id.includes('balance') ? 'Abstract' :
          
          theme.id.includes('flatdesign') || theme.id.includes('materialdesign') || 
          theme.id.includes('neumorphic') || theme.id.includes('glassmorphism') || 
          theme.id.includes('darkmode') || theme.id.includes('lightmode') || 
          theme.id.includes('monochrome') || theme.id.includes('pastel') ? 'Modern' : 'Professional';
          
        return categoryFilters.includes(themeCategory);
      });
    }
    
    setFilteredThemes(filtered);
  }, [searchQuery, categoryFilters]);
  
  const handleCategoryFilter = (category: string) => {
    if (category === 'All') {
      setCategoryFilters(['All']);
    } else {
      const newFilters = [...categoryFilters];
      
      // Remove 'All' if it exists when selecting a specific category
      const allIndex = newFilters.indexOf('All');
      if (allIndex > -1) {
        newFilters.splice(allIndex, 1);
      }
      
      // Toggle category
      const index = newFilters.indexOf(category);
      if (index > -1) {
        newFilters.splice(index, 1);
      } else {
        newFilters.push(category);
      }
      
      // If no filters, select 'All'
      if (newFilters.length === 0) {
        newFilters.push('All');
      }
      
      setCategoryFilters(newFilters);
    }
  };
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-2">Choose a Theme</h3>
      <p className="text-sm text-gray-500 mb-4">
        Select a theme to match your book's style
      </p>
      
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search themes..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {themeCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              categoryFilters.includes(category) || (categoryFilters.length === 0 && category === 'All')
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <ScrollArea className="h-[400px] w-full pr-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredThemes.map((theme) => (
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
