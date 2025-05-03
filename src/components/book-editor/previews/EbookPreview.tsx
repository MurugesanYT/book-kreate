
import { BasePreviewProps } from './BasePreview';

export const generateEbookPreview = (props: BasePreviewProps): string => {
  const { book, options = {}, darkMode = false } = props;
  
  const fontFamily = options?.fontFamily || 'serif';
  const fontSize = options?.fontSize || 12;
  const textAlign = options?.styling?.textAlign || 'left';
  const lineHeight = options?.styling?.lineHeight || '1.5';
  const includeTableOfContents = options?.includeTableOfContents !== false;
  const chapterLayout = options?.styling?.chapterLayout || 'standard';

  // Dark mode settings
  const backgroundColor = darkMode ? '#121212' : '#fff';
  const textColor = darkMode ? '#e0e0e0' : '#333';
  const headerColor = darkMode ? '#ffffff' : '#111';
  const borderColor = darkMode ? '#333' : '#eee';
  const linkColor = darkMode ? '#88c0ff' : '#0066cc';
  
  let preview = `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}px; text-align: ${textAlign}; line-height: ${lineHeight}; max-width: 600px; margin: 0 auto; padding: 20px; background-color: ${backgroundColor}; border: 1px solid ${borderColor}; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); color: ${textColor};">
      <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid ${borderColor};">
        <h1 style="font-size: ${fontSize * 1.8}px; margin-bottom: 10px; color: ${headerColor};">${book.title}</h1>
        <p style="font-size: ${fontSize}px; color: ${darkMode ? '#aaa' : '#666'};">By ${book.author || 'Unknown'}</p>
      </div>`;
  
  // Styling based on chapter layout
  const chapterStyles = getChapterStyles(chapterLayout, fontSize, headerColor, textColor, darkMode);
  
  // Table of Contents
  if (includeTableOfContents && book.chapters && book.chapters.length > 0) {
    preview += `
      <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid ${borderColor};">
        <h2 style="font-size: ${fontSize * 1.4}px; margin-bottom: 15px; color: ${headerColor};">Table of Contents</h2>
        <ul style="list-style-type: none; padding: 0;">`;
    
    book.chapters.forEach((chapter: any, index: number) => {
      preview += `
          <li style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px dotted ${borderColor};">
            <a href="#chapter-${index + 1}" style="color: ${linkColor}; text-decoration: none; display: flex; justify-content: space-between;">
              <span>Chapter ${index + 1}: ${chapter.title}</span>
              <span style="color: ${darkMode ? '#777' : '#999'};">Page ${index + 1}</span>
            </a>
          </li>`;
    });
    
    preview += `
        </ul>
      </div>`;
  }
  
  // Sample chapter content with selected layout
  if (book.chapters && book.chapters.length > 0) {
    const chapter = book.chapters[0];
    preview += `
      <div id="chapter-1" style="page-break-before: always;">
        ${chapterStyles.headerOpen}Chapter 1: ${chapter.title}${chapterStyles.headerClose}`;
    
    const paragraphs = chapter.content?.split('\n\n') || ["No content available"];
    for (let i = 0; i < Math.min(paragraphs.length, 5); i++) {
      // Apply special first paragraph styling for drop cap layout
      if (i === 0 && chapterLayout === 'drop-cap') {
        const firstLetter = paragraphs[i].charAt(0);
        const restOfParagraph = paragraphs[i].slice(1);
        preview += `
          <p>${chapterStyles.firstLetterOpen}${firstLetter}${chapterStyles.firstLetterClose}${restOfParagraph}</p>`;
      } else {
        preview += `
          <p style="margin-bottom: 15px; text-align: ${textAlign};">${paragraphs[i]}</p>`;
      }
    }
    
    preview += `
      </div>`;
  }
  
  // Device frame and indicators
  preview += `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid ${borderColor}; display: flex; justify-content: space-between; color: ${darkMode ? '#777' : '#999'}; font-size: ${fontSize * 0.8}px;">
        <span>Location 1-254</span>
        <span>Page 1 of 328</span>
      </div>
    </div>`;
  
  return preview;
};

// Helper function to get chapter styling based on selected layout
function getChapterStyles(layout: string, fontSize: number, headerColor: string, textColor: string, darkMode: boolean): {
  headerOpen: string;
  headerClose: string;
  firstLetterOpen: string;
  firstLetterClose: string;
} {
  const borderColor = darkMode ? '#333' : '#eee';
  
  switch (layout) {
    case 'centered':
      return {
        headerOpen: `<h2 style="font-size: ${fontSize * 1.6}px; margin: 30px 0; text-align: center; color: ${headerColor};">`,
        headerClose: `</h2>`,
        firstLetterOpen: ``,
        firstLetterClose: ``
      };
    case 'drop-cap':
      return {
        headerOpen: `<h2 style="font-size: ${fontSize * 1.4}px; margin-bottom: 25px; color: ${headerColor};">`,
        headerClose: `</h2>`,
        firstLetterOpen: `<span style="float: left; font-size: ${fontSize * 3}px; line-height: ${fontSize * 2.5}px; padding: 0 5px 0 0; color: ${darkMode ? '#fff' : '#000'}; font-family: serif; font-weight: bold;">`,
        firstLetterClose: `</span>`
      };
    case 'ornamental':
      return {
        headerOpen: `<div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; position: relative; padding: 0 30px;">
            <div style="border-top: 1px solid ${borderColor}; width: 100px; position: absolute; left: -70px; top: 50%;"></div>
            <h2 style="font-size: ${fontSize * 1.5}px; margin: 0; display: inline-block; color: ${headerColor};">`,
        headerClose: `</h2>
            <div style="border-top: 1px solid ${borderColor}; width: 100px; position: absolute; right: -70px; top: 50%;"></div>
          </div>
        </div>`,
        firstLetterOpen: ``,
        firstLetterClose: ``
      };
    case 'standard':
    default:
      return {
        headerOpen: `<h2 style="font-size: ${fontSize * 1.4}px; margin-bottom: 20px; color: ${headerColor};">`,
        headerClose: `</h2>`,
        firstLetterOpen: ``,
        firstLetterClose: ``
      };
  }
}
