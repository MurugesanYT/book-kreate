
import { BasePreviewProps, convertLineSpacing } from './BasePreview';

export const generatePDFPreview = (props: BasePreviewProps): string => {
  const { book, options = {} } = props;
  
  const fontFamily = options?.fontFamily || 'Georgia';
  const fontSize = options?.fontSize || 12;
  const textAlignment = options?.textAlignment || 'left';
  const lineSpacing = convertLineSpacing(options?.lineSpacing || 'normal');
  const colorScheme = options?.colorScheme || 'default';
  const showPageNumbers = options?.showPageNumbers !== false;
  const dropCaps = options?.dropCaps || false;
  const decorativeElements = options?.decorativeElements !== false;
  
  // Apply color scheme
  let bgColor = '#fff';
  let textColor = '#000';
  let borderColor = '#eee';
  
  switch (colorScheme) {
    case 'sepia':
      bgColor = '#f7f2e9';
      textColor = '#5a4a39';
      borderColor = '#e0d6c7';
      break;
    case 'night':
      bgColor = '#1a1a1a';
      textColor = '#e6e6e6';
      borderColor = '#333';
      break;
    case 'contrast':
      bgColor = '#fff';
      textColor = '#000';
      borderColor = '#000';
      break;
    case 'classic':
      bgColor = '#fbfbf8';
      textColor = '#333333';
      borderColor = '#d1d1c2';
      break;
    case 'modern':
      bgColor = '#ffffff';
      textColor = '#202124';
      borderColor = '#e0e0e0';
      break;
  }
  
  let preview = `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}px; text-align: ${textAlignment}; line-height: ${lineSpacing}; background-color: ${bgColor}; color: ${textColor}; padding: 40px 50px; min-height: 1056px; max-width: 816px; margin: 0 auto; position: relative; border: 1px solid ${borderColor}; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">`;
  
  // Add header if enabled
  if (options?.headerFooter) {
    preview += `
      <div style="position: absolute; top: 20px; left: 0; right: 0; text-align: center; font-size: ${fontSize * 0.8}px; color: ${textColor}; opacity: 0.7;">
        ${book.title}
      </div>`;
  }
  
  // Add page number if enabled
  if (showPageNumbers) {
    preview += `
      <div style="position: absolute; bottom: 20px; left: 0; right: 0; text-align: center; font-size: ${fontSize * 0.8}px; color: ${textColor}; opacity: 0.7;">
        1
      </div>`;
  }
  
  // Add title
  preview += `
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="font-size: ${fontSize * 2}px; margin-bottom: 10px;">${book.title}</h1>
      <p style="font-size: ${fontSize * 1.2}px;">By ${book.author || 'Unknown'}</p>
    </div>`;
  
  // Add chapter sample
  if (book.chapters && book.chapters.length > 0) {
    const chapter = book.chapters[0];
    
    // Add decorative element before chapter if enabled
    if (decorativeElements) {
      preview += `
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="display: inline-block; width: 150px; height: 1px; background-color: ${textColor}; opacity: 0.5;"></div>
          <div style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${textColor}; margin: 0 10px; vertical-align: middle; opacity: 0.5;"></div>
          <div style="display: inline-block; width: 150px; height: 1px; background-color: ${textColor}; opacity: 0.5;"></div>
        </div>`;
    }
    
    preview += `
      <h2 style="font-size: ${fontSize * 1.5}px; margin-bottom: 20px; text-align: center;">${chapter.title}</h2>`;
    
    // Process chapter content
    const paragraphs = chapter.content.split('\n\n');
    if (paragraphs.length > 0) {
      // Apply drop caps to first paragraph if enabled
      if (dropCaps && paragraphs[0].length > 0) {
        const firstChar = paragraphs[0].charAt(0);
        const restOfParagraph = paragraphs[0].substring(1);
        
        preview += `
          <p style="margin-bottom: 20px; text-indent: 20px;">
            <span style="float: left; font-size: ${fontSize * 3}px; line-height: 0.8; margin-right: 5px;">${firstChar}</span>${restOfParagraph}
          </p>`;
        
        // Add the rest of the paragraphs
        for (let i = 1; i < Math.min(paragraphs.length, 5); i++) {
          preview += `
            <p style="margin-bottom: 20px; text-indent: 20px;">${paragraphs[i]}</p>`;
        }
      } else {
        // No drop caps, add all paragraphs normally
        for (let i = 0; i < Math.min(paragraphs.length, 5); i++) {
          preview += `
            <p style="margin-bottom: 20px; text-indent: 20px;">${paragraphs[i]}</p>`;
        }
      }
    }
  } else {
    // No chapters, show placeholder text
    preview += `
      <p style="margin-bottom: 20px; text-indent: 20px; font-style: italic;">
        This is a preview of how your book will look when exported to PDF. 
        The actual PDF will contain all your chapters and content.
      </p>`;
  }
  
  // Close the container
  preview += '</div>';
  
  return preview;
};
