
import { BasePreviewProps } from './BasePreview';

// Rich Text (RTF) Preview
export const generateRichTextPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Times New Roman', serif; padding: 30px; background-color: #fff; border: 1px solid #ddd; max-width: 800px; margin: 0 auto; font-size: 14px; line-height: 1.6;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 20px; margin-bottom: 10px;">${book.title}</h1>
        <p>By ${book.author || 'Unknown'}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; margin-bottom: 15px;">${book.chapters?.[0]?.title || 'Chapter 1'}</h2>
        <p>${book.chapters?.[0]?.content?.substring(0, 300) || 'This is a preview of how your book will look in RTF format with rich text formatting.'} ...</p>
      </div>
      
      <div style="color: #777; font-size: 12px; text-align: center; margin-top: 30px;">
        Rich Text Format (RTF) preview - supports advanced formatting
      </div>
    </div>`;
};

// LaTeX Preview
export const generateLaTeXPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Computer Modern', serif; padding: 30px; background-color: #f9f9f9; border: 1px solid #ddd; max-width: 800px; margin: 0 auto; font-size: 12px; line-height: 1.4;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 18px; margin-bottom: 5px;">${book.title}</h1>
        <p style="font-style: italic;">\\textit{${book.author || 'Anonymous'}}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 14px; margin-bottom: 10px;">\\chapter{${book.chapters?.[0]?.title || 'Introduction'}}</h2>
        <p style="text-align: justify;">${book.chapters?.[0]?.content?.substring(0, 250) || 'This is a preview of your book in LaTeX format, perfect for academic and professional publications.'} ...</p>
      </div>
      
      <div style="color: #555; font-size: 10px; text-align: center; margin-top: 20px; font-family: monospace;">
        LaTeX preview - professional typesetting for academic publications
      </div>
    </div>`;
};

// OpenDocument Text (ODT) Preview
export const generateODTPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Liberation Serif', serif; padding: 40px; background-color: #fff; border: 1px solid #ccc; max-width: 800px; margin: 0 auto; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 24px; margin-bottom: 10px;">${book.title}</h1>
        <p style="font-size: 16px;">By ${book.author || 'Unknown'}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 18px; margin-bottom: 15px;">${book.chapters?.[0]?.title || 'Chapter 1'}</h2>
        <p style="line-height: 1.6; text-align: justify;">${book.chapters?.[0]?.content?.substring(0, 300) || 'This is a preview of how your book will appear in OpenDocument Text format, compatible with LibreOffice and OpenOffice.'} ...</p>
      </div>
      
      <div style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
        OpenDocument Text (ODT) preview - open standard document format
      </div>
    </div>`;
};

// Apple Pages Preview
export const generatePagesPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Avenir Next', sans-serif; padding: 40px; background-color: #fff; border: 1px solid #e0e0e0; max-width: 800px; margin: 0 auto; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 28px; font-weight: 300; margin-bottom: 10px; color: #1d1d1f;">${book.title}</h1>
        <p style="font-size: 18px; color: #86868b;">By ${book.author || 'Unknown'}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; font-weight: 500; margin-bottom: 20px; color: #1d1d1f;">${book.chapters?.[0]?.title || 'Chapter 1'}</h2>
        <p style="line-height: 1.7; font-size: 16px; color: #1d1d1f;">${book.chapters?.[0]?.content?.substring(0, 300) || 'This is a preview of how your book will look in Apple Pages format with elegant typography and layout.'} ...</p>
      </div>
      
      <div style="color: #86868b; font-size: 12px; text-align: center; margin-top: 30px;">
        Apple Pages preview - beautiful documents on Mac
      </div>
    </div>`;
};

// FictionBook2 (FB2) Preview
export const generateFB2Preview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Georgia', serif; padding: 30px; background-color: #fafafa; border: 1px solid #ddd; max-width: 800px; margin: 0 auto; font-size: 14px; line-height: 1.5;">
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
        <h1 style="font-size: 22px; margin-bottom: 10px;">${book.title}</h1>
        <p style="font-style: italic;">by ${book.author || 'Anonymous'}</p>
        <p style="font-size: 12px; color: #666; margin-top: 10px;">FictionBook2 Format</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; margin-bottom: 15px; text-align: center;">${book.chapters?.[0]?.title || 'Chapter 1'}</h2>
        <p style="text-align: justify; text-indent: 20px;">${book.chapters?.[0]?.content?.substring(0, 300) || 'This is a preview of your book in FB2 format, popular for e-books in Russia and Eastern Europe.'} ...</p>
      </div>
      
      <div style="color: #666; font-size: 11px; text-align: center; margin-top: 25px;">
        FictionBook2 (FB2) preview - structured e-book format
      </div>
    </div>`;
};

// Comic Book Archive (CBZ) Preview
export const generateCBZPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Comic Sans MS', cursive; padding: 20px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border: 3px solid #333; max-width: 600px; margin: 0 auto; border-radius: 10px; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px;">${book.title}</h1>
        <p style="font-size: 16px;">By ${book.author || 'Unknown'}</p>
      </div>
      
      <div style="background-color: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="font-size: 18px; margin-bottom: 15px; text-align: center;">${book.chapters?.[0]?.title || 'Page 1'}</h2>
        <p style="line-height: 1.4;">${book.chapters?.[0]?.content?.substring(0, 200) || 'This is a preview of your book as a comic book archive (CBZ) with visual storytelling elements.'} ...</p>
      </div>
      
      <div style="text-align: center; font-size: 12px; opacity: 0.8;">
        Comic Book Archive (CBZ) preview - visual storytelling format
      </div>
    </div>`;
};
