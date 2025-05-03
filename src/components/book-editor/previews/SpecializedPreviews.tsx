
import { BasePreviewProps } from './BasePreview';

// Rich Text Format Preview
export const generateRichTextPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Times New Roman', serif; padding: 40px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; margin-bottom: 5px;">${book.title}</h1>
        <p><em>By ${book.author || 'Unknown'}</em></p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 18px; margin-bottom: 15px;">${book.chapters?.[0]?.title || 'Chapter 1'}</h2>
        <p style="line-height: 1.5; margin-bottom: 15px; text-indent: 20px;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to RTF format.'}</p>
        <p style="line-height: 1.5; text-indent: 20px;">The actual RTF file will contain all of your book content, properly formatted with rich text.</p>
      </div>
      
      <div style="color: #777; font-size: 12px; margin-top: 40px; text-align: center; font-style: italic;">
        Rich Text Format preview
      </div>
    </div>`;
};

// LaTeX Preview
export const generateLaTeXPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Latin Modern Roman', serif; padding: 40px; background-color: #f9f9f9; border: 1px solid #ddd; max-width: 800px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 24px; margin-bottom: 10px; font-weight: normal;">${book.title}</h1>
        <p>By ${book.author || 'Unknown'}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 18px; margin-bottom: 20px; font-weight: normal;">Chapter 1: ${book.chapters?.[0]?.title || 'Introduction'}</h2>
        <p style="line-height: 1.6; margin-bottom: 15px; text-align: justify;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to LaTeX format.'}</p>
        <p style="line-height: 1.6; text-align: justify;">The actual LaTeX file will contain all of your book content, ready for academic publishing.</p>
      </div>
      
      <div style="color: #777; font-size: 12px; margin-top: 40px; text-align: center;">
        LaTeX document preview
      </div>
    </div>`;
};

// ODT Preview
export const generateODTPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Liberation Serif', serif; padding: 40px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 24px; margin-bottom: 10px;">${book.title}</h1>
        <p>By ${book.author || 'Unknown'}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 18px; margin-bottom: 15px;">Chapter 1: ${book.chapters?.[0]?.title || 'Introduction'}</h2>
        <p style="line-height: 1.6; margin-bottom: 15px;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to ODT format.'}</p>
        <p style="line-height: 1.6;">The actual ODT file will contain all of your book content, properly formatted for LibreOffice or OpenOffice.</p>
      </div>
      
      <div style="color: #777; font-size: 12px; margin-top: 40px; text-align: center;">
        OpenDocument Text preview
      </div>
    </div>`;
};

// Pages Preview
export const generatePagesPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Helvetica', sans-serif; padding: 40px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 28px; margin-bottom: 5px; font-weight: 300;">${book.title}</h1>
        <p style="color: #666;">By ${book.author || 'Unknown'}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; margin-bottom: 20px; font-weight: 500; color: #333;">Chapter 1: ${book.chapters?.[0]?.title || 'Introduction'}</h2>
        <p style="line-height: 1.6; margin-bottom: 15px; color: #333;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to Apple Pages format.'}</p>
        <p style="line-height: 1.6; color: #333;">The actual Pages file will contain all of your book content, formatted for Apple Pages.</p>
      </div>
      
      <div style="color: #999; font-size: 12px; margin-top: 40px; text-align: center; font-weight: 300;">
        Apple Pages preview
      </div>
    </div>`;
};

// FB2 Preview
export const generateFB2Preview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Georgia', serif; padding: 30px; background-color: #f9f9f9; border: 1px solid #ddd; max-width: 700px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 22px; margin-bottom: 8px;">${book.title}</h1>
        <p style="color: #666;">By ${book.author || 'Unknown'}</p>
      </div>
      
      <div style="margin-bottom: 30px; padding: 20px; background-color: #fff; border: 1px solid #eee;">
        <h2 style="font-size: 18px; margin-bottom: 15px;">${book.chapters?.[0]?.title || 'Chapter 1'}</h2>
        <p style="line-height: 1.6; margin-bottom: 15px;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to FB2 format.'}</p>
        <p style="line-height: 1.6;">The actual FB2 file will contain all of your book content, formatted for e-readers that support the Fiction Book format.</p>
      </div>
      
      <div style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
        FictionBook (FB2) preview
      </div>
    </div>`;
};

// CBZ Preview
export const generateCBZPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Comic Sans MS', cursive; padding: 20px; background-color: #f0f0f0; border: 1px solid #ddd; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 20px; background-color: #fff; padding: 15px; border: 1px solid #ccc;">
        <h1 style="font-size: 22px; margin-bottom: 5px; color: #333;">${book.title}</h1>
        <p style="color: #666;">By ${book.author || 'Unknown'}</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border: 1px solid #ccc; margin-bottom: 20px;">
        <div style="text-align: center; margin-bottom: 15px;">
          <h2 style="font-size: 18px; margin-bottom: 0;">${book.chapters?.[0]?.title || 'Page 1'}</h2>
        </div>
        <p style="line-height: 1.5; background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 14px;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to CBZ format.'}</p>
      </div>
      
      <div style="color: #666; font-size: 12px; margin-top: 20px; text-align: center; background-color: #fff; padding: 10px; border: 1px solid #ccc;">
        Comic Book Archive (CBZ) preview - Page 1 of ${book.chapters?.length || 1}
      </div>
    </div>`;
};
