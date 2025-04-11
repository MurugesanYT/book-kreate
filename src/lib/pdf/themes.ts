
import { ThemeOption } from "@/lib/api/types";

// Collection of all theme options
export const getAllThemeOptions = (): ThemeOption[] => {
  return [
    // Professional themes
    { id: 'elegant', name: 'Elegant', colors: { primary: '#8e44ad', background: '#f9f9f9', accent: '#d4c5e5' } },
    { id: 'modern', name: 'Modern', colors: { primary: '#2c3e50', background: '#ffffff', accent: '#3498db' } },
    { id: 'classic', name: 'Classic', colors: { primary: '#3e2723', background: '#fff8e1', accent: '#795548' } },
    { id: 'minimalist', name: 'Minimalist', colors: { primary: '#202020', background: '#fcfcfc', accent: '#808080' } },
    { id: 'professional', name: 'Professional', colors: { primary: '#2c3e50', background: '#ecf0f1', accent: '#3498db' } },
    { id: 'corporate', name: 'Corporate', colors: { primary: '#34495e', background: '#f5f5f5', accent: '#2980b9' } },
    { id: 'business', name: 'Business', colors: { primary: '#2f3640', background: '#f5f6fa', accent: '#273c75' } },
    { id: 'academy', name: 'Academic', colors: { primary: '#192a56', background: '#f1f2f6', accent: '#273c75' } },
    { id: 'scientific', name: 'Scientific', colors: { primary: '#2f3542', background: '#f1f2f6', accent: '#ff9f43' } },
    { id: 'executive', name: 'Executive', colors: { primary: '#2c2c54', background: '#f7f1e3', accent: '#40407a' } },
    
    // Nature themes
    { id: 'forest', name: 'Forest', colors: { primary: '#1e3a1e', background: '#f0f7f0', accent: '#27ae60' } },
    { id: 'ocean', name: 'Ocean', colors: { primary: '#1a5276', background: '#eaf4fb', accent: '#3498db' } },
    { id: 'autumn', name: 'Autumn', colors: { primary: '#784212', background: '#fcf3cf', accent: '#d35400' } },
    { id: 'spring', name: 'Spring', colors: { primary: '#196f3d', background: '#ebf5fb', accent: '#58d68d' } },
    { id: 'desert', name: 'Desert', colors: { primary: '#7e5109', background: '#fef5e7', accent: '#d4ac0d' } },
    { id: 'mountain', name: 'Mountain', colors: { primary: '#4d5656', background: '#f4f6f6', accent: '#5d6d7e' } },
    { id: 'lavender', name: 'Lavender Fields', colors: { primary: '#5b3256', background: '#f4ecf7', accent: '#8e44ad' } },
    { id: 'cherry', name: 'Cherry Blossom', colors: { primary: '#943126', background: '#fdedec', accent: '#e6b0aa' } },
    { id: 'evergreen', name: 'Evergreen', colors: { primary: '#145a32', background: '#e9f7ef', accent: '#27ae60' } },
    { id: 'sunset', name: 'Sunset', colors: { primary: '#6e2c00', background: '#fdebd0', accent: '#e67e22' } },
    
    // Seasonal themes
    { id: 'winter', name: 'Winter Frost', colors: { primary: '#21618c', background: '#ebf5fb', accent: '#85c1e9' } },
    { id: 'summer', name: 'Summer Breeze', colors: { primary: '#1e8449', background: '#e9f7ef', accent: '#58d68d' } },
    { id: 'autumn2', name: 'Autumn Leaves', colors: { primary: '#873600', background: '#fef5e7', accent: '#e67e22' } },
    { id: 'spring2', name: 'Spring Bloom', colors: { primary: '#1abc9c', background: '#e8f8f5', accent: '#48c9b0' } },
    { id: 'winter2', name: 'Winter Night', colors: { primary: '#283747', background: '#eaecee', accent: '#5d6d7e' } },
    { id: 'summer2', name: 'Summer Heat', colors: { primary: '#c0392b', background: '#fadbd8', accent: '#e74c3c' } },
    { id: 'autumn3', name: 'Autumn Rust', colors: { primary: '#9a7d0a', background: '#fef9e7', accent: '#f4d03f' } },
    { id: 'spring3', name: 'Spring Garden', colors: { primary: '#196f3d', background: '#e9f7ef', accent: '#7dcea0' } },
    { id: 'winter3', name: 'Winter Holiday', colors: { primary: '#a93226', background: '#f9ebea', accent: '#cb4335' } },
    { id: 'summer3', name: 'Summer Beach', colors: { primary: '#1a5276', background: '#ebf5fb', accent: '#3498db' } },
    
    // Cultural themes
    { id: 'nordic', name: 'Nordic', colors: { primary: '#2c3e50', background: '#ecf0f1', accent: '#34495e' } },
    { id: 'moroccan', name: 'Moroccan', colors: { primary: '#943126', background: '#fef9e7', accent: '#f1c40f' } },
    { id: 'japanese', name: 'Japanese', colors: { primary: '#1b2631', background: '#f0f3f4', accent: '#cb4335' } },
    { id: 'greek', name: 'Greek', colors: { primary: '#1b4f72', background: '#ebf5fb', accent: '#3498db' } },
    { id: 'indian', name: 'Indian', colors: { primary: '#6e2c00', background: '#f9e79f', accent: '#d4ac0d' } },
    { id: 'scandinavian', name: 'Scandinavian', colors: { primary: '#424949', background: '#f8f9f9', accent: '#7f8c8d' } },
    { id: 'rustic', name: 'Rustic', colors: { primary: '#784212', background: '#f6ddcc', accent: '#d35400' } },
    { id: 'italian', name: 'Italian', colors: { primary: '#1e8449', background: '#eafaf1', accent: '#7dcea0' } },
    { id: 'chinese', name: 'Chinese', colors: { primary: '#b03a2e', background: '#fdedec', accent: '#e74c3c' } },
    { id: 'french', name: 'French', colors: { primary: '#1b2631', background: '#f0f3f4', accent: '#2e86c1' } },
    
    // Literary themes
    { id: 'mystery', name: 'Mystery', colors: { primary: '#1c2833', background: '#eaecee', accent: '#566573' } },
    { id: 'scifi', name: 'Sci-Fi', colors: { primary: '#1a5276', background: '#eaf2f8', accent: '#2980b9' } },
    { id: 'romance', name: 'Romance', colors: { primary: '#943126', background: '#fadbd8', accent: '#e74c3c' } },
    { id: 'horror', name: 'Horror', colors: { primary: '#17202a', background: '#ebedef', accent: '#566573' } },
    { id: 'biography', name: 'Biography', colors: { primary: '#424949', background: '#f2f4f4', accent: '#7f8c8d' } },
    { id: 'historical', name: 'Historical', colors: { primary: '#6e2c00', background: '#fae5d3', accent: '#d35400' } },
    { id: 'mythology', name: 'Mythology', colors: { primary: '#7d6608', background: '#fcf3cf', accent: '#d4ac0d' } },
    { id: 'adventure', name: 'Adventure', colors: { primary: '#1b4f72', background: '#ebf5fb', accent: '#3498db' } },
    { id: 'fantasy', name: 'Fantasy', colors: { primary: '#4a235a', background: '#f4ecf7', accent: '#8e44ad' } },
    { id: 'poetry', name: 'Poetry', colors: { primary: '#1e8449', background: '#e9f7ef', accent: '#58d68d' } },
    
    // Color themes
    { id: 'emerald', name: 'Emerald', colors: { primary: '#145a32', background: '#e9f7ef', accent: '#27ae60' } },
    { id: 'ruby', name: 'Ruby', colors: { primary: '#922b21', background: '#fdedec', accent: '#e74c3c' } },
    { id: 'sapphire', name: 'Sapphire', colors: { primary: '#1b4f72', background: '#ebf5fb', accent: '#3498db' } },
    { id: 'amber', name: 'Amber', colors: { primary: '#9a7d0a', background: '#fef9e7', accent: '#f1c40f' } },
    { id: 'jade', name: 'Jade', colors: { primary: '#0e6655', background: '#e8f8f5', accent: '#1abc9c' } },
    { id: 'amethyst', name: 'Amethyst', colors: { primary: '#5b3256', background: '#f5eef8', accent: '#a569bd' } },
    { id: 'coral', name: 'Coral', colors: { primary: '#a93226', background: '#fdedec', accent: '#e74c3c' } },
    { id: 'turquoise', name: 'Turquoise', colors: { primary: '#117864', background: '#e8f8f5', accent: '#1abc9c' } },
    { id: 'obsidian', name: 'Obsidian', colors: { primary: '#17202a', background: '#eaecee', accent: '#566573' } },
    { id: 'gold', name: 'Gold', colors: { primary: '#7d6608', background: '#fef9e7', accent: '#f1c40f' } },
    
    // Time Period themes
    { id: 'retro', name: 'Retro', colors: { primary: '#784212', background: '#fae5d3', accent: '#d35400' } },
    { id: 'vintage', name: 'Vintage', colors: { primary: '#7e5109', background: '#fef5e7', accent: '#d4ac0d' } },
    { id: 'medieval', name: 'Medieval', colors: { primary: '#6e2c00', background: '#fdebd0', accent: '#e67e22' } },
    { id: 'victorian', name: 'Victorian', colors: { primary: '#4a235a', background: '#f5eef8', accent: '#a569bd' } },
    { id: 'artdeco', name: 'Art Deco', colors: { primary: '#1c2833', background: '#eaecee', accent: '#b7950b' } },
    { id: 'futuristic', name: 'Futuristic', colors: { primary: '#2c3e50', background: '#ecf0f1', accent: '#3498db' } },
    { id: 'renaissance', name: 'Renaissance', colors: { primary: '#6e2c00', background: '#fae5d3', accent: '#a04000' } },
    { id: 'baroque', name: 'Baroque', colors: { primary: '#784212', background: '#fef5e7', accent: '#d4ac0d' } },
    { id: 'industrial', name: 'Industrial', colors: { primary: '#424949', background: '#f2f4f4', accent: '#7f8c8d' } },
    { id: 'midcentury', name: 'Mid-Century', colors: { primary: '#117a65', background: '#e8f8f5', accent: '#16a085' } },
    
    // Abstract themes
    { id: 'serenity', name: 'Serenity', colors: { primary: '#2471a3', background: '#ebf5fb', accent: '#73c6b6' } },
    { id: 'harmony', name: 'Harmony', colors: { primary: '#186a3b', background: '#e9f7ef', accent: '#138d75' } },
    { id: 'vitality', name: 'Vitality', colors: { primary: '#a93226', background: '#fdedec', accent: '#239b56' } },
    { id: 'tranquil', name: 'Tranquility', colors: { primary: '#1b4f72', background: '#ebf5fb', accent: '#1abc9c' } },
    { id: 'mystical', name: 'Mystical', colors: { primary: '#4a235a', background: '#f5eef8', accent: '#9b59b6' } },
    { id: 'clarity', name: 'Clarity', colors: { primary: '#424949', background: '#fdfefe', accent: '#85c1e9' } },
    { id: 'wisdom', name: 'Wisdom', colors: { primary: '#154360', background: '#ebf5fb', accent: '#2980b9' } },
    { id: 'balance', name: 'Balance', colors: { primary: '#0e6655', background: '#e8f8f5', accent: '#7e5109' } },
    { id: 'simplicity', name: 'Simplicity', colors: { primary: '#212f3d', background: '#fbfcfc', accent: '#566573' } },
    { id: 'intuition', name: 'Intuition', colors: { primary: '#633974', background: '#f4ecf7', accent: '#2471a3' } },
    
    // Modern design themes
    { id: 'flatdesign', name: 'Flat Design', colors: { primary: '#16a085', background: '#ffffff', accent: '#e74c3c' } },
    { id: 'materialdesign', name: 'Material Design', colors: { primary: '#3f51b5', background: '#ffffff', accent: '#ff4081' } },
    { id: 'neumorphic', name: 'Neumorphic', colors: { primary: '#37474f', background: '#eceff1', accent: '#78909c' } },
    { id: 'glassmorphism', name: 'Glassmorphism', colors: { primary: '#0288d1', background: '#e1f5fe', accent: '#26c6da' } },
    { id: 'darkmode', name: 'Dark Mode', colors: { primary: '#f5f5f5', background: '#212121', accent: '#03dac6' } },
    { id: 'lightmode', name: 'Light Mode', colors: { primary: '#212121', background: '#fafafa', accent: '#6200ee' } },
    { id: 'monochrome', name: 'Monochrome', colors: { primary: '#212121', background: '#f5f5f5', accent: '#757575' } },
    { id: 'pastel', name: 'Pastel', colors: { primary: '#607d8b', background: '#f5f5f5', accent: '#81c784' } },
    { id: 'gradient', name: 'Gradient', colors: { primary: '#1a237e', background: '#e8eaf6', accent: '#7c4dff' } },
    { id: 'brutalist', name: 'Brutalist', colors: { primary: '#000000', background: '#ffffff', accent: '#ff0000' } },
  ];
};

// Get a specific theme by ID
export const getThemeById = (themeId: string): ThemeOption => {
  const allThemes = getAllThemeOptions();
  return allThemes.find(theme => theme.id === themeId) || allThemes[0];
};

// Get theme options by category
export const getThemesByCategory = (category: string): ThemeOption[] => {
  const allThemes = getAllThemeOptions();
  
  switch(category.toLowerCase()) {
    case 'professional':
      return allThemes.filter(theme => 
        ['elegant', 'modern', 'classic', 'minimalist', 'professional', 'corporate', 'business', 'academy', 'scientific', 'executive'].includes(theme.id)
      );
    case 'nature':
      return allThemes.filter(theme => 
        ['forest', 'ocean', 'autumn', 'spring', 'desert', 'mountain', 'lavender', 'cherry', 'evergreen', 'sunset'].includes(theme.id)
      );
    case 'seasonal':
      return allThemes.filter(theme => 
        ['winter', 'summer', 'autumn2', 'spring2', 'winter2', 'summer2', 'autumn3', 'spring3', 'winter3', 'summer3'].includes(theme.id)
      );
    case 'cultural':
      return allThemes.filter(theme => 
        ['nordic', 'moroccan', 'japanese', 'greek', 'indian', 'scandinavian', 'rustic', 'italian', 'chinese', 'french'].includes(theme.id)
      );
    case 'literary':
      return allThemes.filter(theme => 
        ['mystery', 'scifi', 'romance', 'horror', 'biography', 'historical', 'mythology', 'adventure', 'fantasy', 'poetry'].includes(theme.id)
      );
    case 'color':
      return allThemes.filter(theme => 
        ['emerald', 'ruby', 'sapphire', 'amber', 'jade', 'amethyst', 'coral', 'turquoise', 'obsidian', 'gold'].includes(theme.id)
      );
    case 'time period':
      return allThemes.filter(theme => 
        ['retro', 'vintage', 'medieval', 'victorian', 'artdeco', 'futuristic', 'renaissance', 'baroque', 'industrial', 'midcentury'].includes(theme.id)
      );
    case 'abstract':
      return allThemes.filter(theme => 
        ['serenity', 'harmony', 'vitality', 'tranquil', 'mystical', 'clarity', 'wisdom', 'balance', 'simplicity', 'intuition'].includes(theme.id)
      );
    case 'modern':
      return allThemes.filter(theme => 
        ['flatdesign', 'materialdesign', 'neumorphic', 'glassmorphism', 'darkmode', 'lightmode', 'monochrome', 'pastel', 'gradient', 'brutalist'].includes(theme.id)
      );
    default:
      return allThemes;
  }
};
