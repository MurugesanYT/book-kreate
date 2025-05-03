
import { BasePreviewProps } from './BasePreview';

export const generateEbookPreview = (props: BasePreviewProps): string => {
  const { book, options = {} } = props;
  
  const fontFamily = options?.fontFamily || 'serif';
  const fontSize = options?.fontSize || 12;
  const textAlign = options?.styling?.textAlign || 'left';
  const lineHeight = options?.styling?.lineHeight || '1.5';
  const includeTableOfContents = options?.includeTableOfContents !== false;
  
  let preview = `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}px; text-align: ${textAlign}; line-height: ${lineHeight}; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border: 1px solid #eee; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
        <h1 style="font-size: ${fontSize * 1.5}px; margin-bottom: 10px;">${book.title}</h1>
        <p style="font-size: ${fontSize}px; color: #666;">By ${book.author || 'Unknown'}</p>
      </div>`;
  
  // Table of Contents
  if (includeTableOfContents && book.chapters && book.chapters.length > 0) {
    preview += `
      <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
        <h2 style="font-size: ${fontSize * 1.2}px; margin-bottom: 15px;">Table of Contents</h2>
        <ul style="list-style-type: none; padding: 0;">`;
    
    book.chapters.forEach((chapter: any, index: number) => {
      preview += `
          <li style="margin-bottom: 8px;">
            <a href="#chapter-${index + 1}" style="color: #0066cc; text-decoration: none;">Chapter ${index + 1}: ${chapter.title}</a>
          </li>`;
    });
    
    preview += `
        </ul>
      </div>`;
  }
  
  // Sample chapter content
  if (book.chapters && book.chapters.length > 0) {
    const chapter = book.chapters[0];
    preview += `
      <div id="chapter-1">
        <h2 style="font-size: ${fontSize * 1.2}px; margin-bottom: 20px;">Chapter 1: ${chapter.title}</h2>`;
    
    const paragraphs = chapter.content.split('\n\n');
    for (let i = 0; i < Math.min(paragraphs.length, 5); i++) {
      preview += `
        <p style="margin-bottom: 15px;">${paragraphs[i]}</p>`;
    }
    
    preview += `
      </div>`;
  }
  
  // Device frame and indicators
  preview += `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; display: flex; justify-content: space-between; color: #999; font-size: ${fontSize * 0.8}px;">
        <span>Location 1-254</span>
        <span>Page 1 of 328</span>
      </div>
    </div>`;
  
  return preview;
};
