
import { BasePreviewProps } from './BasePreview';

export const generateHTMLPreview = (props: BasePreviewProps): string => {
  const { book, options = {} } = props;
  
  const fontFamily = options?.fontFamily || 'serif';
  const fontSize = options?.fontSize || 16;
  const theme = options?.theme || 'light';
  const layout = options?.layout || 'book';
  const includeTableOfContents = options?.includeTableOfContents !== false;
  const chapterNavigation = options?.chapterNavigation !== false;
  
  // Theme colors
  let bgColor = '#ffffff';
  let textColor = '#333333';
  let accentColor = '#0066cc';
  let borderColor = '#eee';
  
  switch (theme) {
    case 'dark':
      bgColor = '#1a1a1a';
      textColor = '#e6e6e6';
      accentColor = '#7ba9e0';
      borderColor = '#333';
      break;
    case 'sepia':
      bgColor = '#f7f2e9';
      textColor = '#5a4a39';
      accentColor = '#9b6c3a';
      borderColor = '#e0d6c7';
      break;
    case 'contrast':
      bgColor = '#ffffff';
      textColor = '#000000';
      accentColor = '#0000ff';
      borderColor = '#000000';
      break;
  }
  
  // Layout styles
  let maxWidth = '800px';
  let padding = '40px';
  let titleStyle = 'text-align: center; margin-bottom: 30px;';
  
  switch (layout) {
    case 'article':
      maxWidth = '700px';
      padding = '30px';
      titleStyle = 'text-align: left; margin-bottom: 20px;';
      break;
    case 'manuscript':
      maxWidth = '650px';
      padding = '50px';
      titleStyle = 'text-align: left; margin-bottom: 30px;';
      break;
    case 'blog':
      maxWidth = '800px';
      padding = '20px';
      titleStyle = 'text-align: left; margin-bottom: 15px;';
      break;
  }
  
  let preview = `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}px; line-height: 1.6; color: ${textColor}; background-color: ${bgColor}; max-width: ${maxWidth}; margin: 0 auto; padding: ${padding}; border: 1px solid ${borderColor};">
      <header style="${titleStyle}">
        <h1 style="margin-bottom: 10px; color: ${textColor};">${book.title}</h1>
        <p style="color: ${textColor}; opacity: 0.8;">By ${book.author || 'Unknown'}</p>
      </header>`;
  
  // Table of Contents
  if (includeTableOfContents && book.chapters && book.chapters.length > 0) {
    preview += `
      <nav style="margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid ${borderColor};">
        <h2 style="margin-bottom: 15px; font-size: ${fontSize * 1.2}px;">Contents</h2>
        <ul style="list-style-type: none; padding-left: 0;">`;
    
    book.chapters.forEach((chapter: any, index: number) => {
      preview += `
          <li style="margin-bottom: 8px;">
            <a href="#chapter-${index + 1}" style="color: ${accentColor}; text-decoration: none;">
              ${chapter.title}
            </a>
          </li>`;
    });
    
    preview += `
        </ul>
      </nav>`;
  }
  
  // Sample chapter content
  if (book.chapters && book.chapters.length > 0) {
    const chapter = book.chapters[0];
    
    preview += `
      <article id="chapter-1" style="margin-bottom: 40px;">
        <h2 style="font-size: ${fontSize * 1.4}px; margin-bottom: 20px; color: ${textColor};">${chapter.title}</h2>`;
    
    const paragraphs = chapter.content.split('\n\n');
    for (let i = 0; i < Math.min(paragraphs.length, 5); i++) {
      preview += `
        <p style="margin-bottom: 20px;">${paragraphs[i]}</p>`;
    }
    
    preview += `
      </article>`;
    
    // Chapter navigation
    if (chapterNavigation && book.chapters.length > 1) {
      preview += `
        <nav style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid ${borderColor};">
          <div></div>
          <a href="#chapter-2" style="color: ${accentColor}; text-decoration: none;">
            Next: Chapter 2 - ${book.chapters[1]?.title || 'Next Chapter'} →
          </a>
        </nav>`;
    }
  }
  
  // Close container
  preview += '</div>';
  
  return preview;
};
