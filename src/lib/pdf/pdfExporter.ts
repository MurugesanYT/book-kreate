
import { PDFExportOptions, ThemeOption, ThemeColors } from "@/lib/api/types";
import { Book } from "@/lib/api/types";

// Remove the import for beautificationService

// Create a collection of theme options
export const getAllThemeOptions = (): ThemeOption[] => {
  return [
    {
      id: 'elegant',
      name: 'Elegant',
      colors: {
        primary: '#333333',
        background: '#f9f9f9',
        accent: '#8e44ad'
      }
    },
    {
      id: 'modern',
      name: 'Modern',
      colors: {
        primary: '#2c3e50',
        background: '#ffffff',
        accent: '#3498db'
      }
    },
    {
      id: 'classic',
      name: 'Classic',
      colors: {
        primary: '#3e2723',
        background: '#fff8e1',
        accent: '#795548'
      }
    },
    {
      id: 'vibrant',
      name: 'Vibrant',
      colors: {
        primary: '#333333',
        background: '#ffffff',
        accent: '#e74c3c'
      }
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      colors: {
        primary: '#202020',
        background: '#fcfcfc',
        accent: '#808080'
      }
    },
    {
      id: 'artistic',
      name: 'Artistic',
      colors: {
        primary: '#2d3436',
        background: '#fffaf0',
        accent: '#6c5ce7'
      }
    },
    {
      id: 'scholarly',
      name: 'Scholarly',
      colors: {
        primary: '#333333',
        background: '#f5f5f5',
        accent: '#1e3a8a'
      }
    },
    {
      id: 'romantic',
      name: 'Romantic',
      colors: {
        primary: '#4a281f',
        background: '#fff0f3',
        accent: '#c71f37'
      }
    },
    {
      id: 'fantasy',
      name: 'Fantasy',
      colors: {
        primary: '#333652',
        background: '#f0f8ff',
        accent: '#2a6b96'
      }
    },
    {
      id: 'tech',
      name: 'Tech',
      colors: {
        primary: '#333333',
        background: '#f0f0f0',
        accent: '#00adb5'
      }
    },
    // Add more themes as needed
  ];
};

// Function to get a specific theme by ID
export const getThemeById = (themeId: string): ThemeOption => {
  const allThemes = getAllThemeOptions();
  const theme = allThemes.find(t => t.id === themeId);
  
  if (!theme) {
    // Return default theme if requested theme is not found
    return allThemes[0];
  }
  
  return theme;
};

// Export PDF with theme options
export const exportBookToPDF = (book: Book, options: PDFExportOptions) => {
  // PDF export logic would be implemented here
  console.log('Exporting book with options:', options);
  console.log('Book data:', book);
  
  // This would normally return the PDF data or file path
  return {
    success: true,
    message: 'PDF exported successfully'
  };
};
