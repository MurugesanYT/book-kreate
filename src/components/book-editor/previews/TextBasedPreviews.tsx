
import { BasePreviewProps } from './BasePreview';

// DOCX Preview
export const generateDocxPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: 'Times New Roman', serif; padding: 40px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 24px; margin-bottom: 10px;">${book.title}</h1>
        <p>By ${book.author || 'Unknown'}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 18px; margin-bottom: 15px;">Chapter 1: ${book.chapters?.[0]?.title || 'Introduction'}</h2>
        <p style="line-height: 1.6; margin-bottom: 15px;">${book.chapters?.[0]?.content?.split('\n')[0] || 'This is a preview of how your book will look when exported to DOCX format.'}</p>
        <p style="line-height: 1.6;">The actual DOCX file will contain all of your book content, properly formatted according to your selected options.</p>
      </div>
      
      <div style="color: #777; font-size: 12px; margin-top: 40px; text-align: center;">
        Word document preview
      </div>
    </div>`;
};

// Markdown Preview
export const generateMarkdownPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: monospace; white-space: pre-wrap; padding: 30px; background-color: #f7f7f7; border: 1px solid #ddd; max-width: 800px; margin: 0 auto; font-size: 14px; line-height: 1.5;">
      <pre style="margin: 0;"># ${book.title}

*By ${book.author || 'Unknown'}*

## ${book.chapters?.[0]?.title || 'Chapter 1'}

${book.chapters?.[0]?.content?.substring(0, 200) || 'This is a preview of how your book will look in Markdown format.'} ...

---

> Markdown preview - actual export will contain the full content of your book.
</pre>
    </div>`;
};

// TXT Preview
export const generateTxtPreview = (props: BasePreviewProps): string => {
  const { book } = props;
  
  return `
    <div style="font-family: monospace; white-space: pre-wrap; padding: 30px; background-color: #f7f7f7; border: 1px solid #ddd; max-width: 800px; margin: 0 auto; font-size: 14px; line-height: 1.5;">
      <pre style="margin: 0;">${book.title.toUpperCase()}
by ${book.author || 'Unknown'}

${book.chapters?.[0]?.title?.toUpperCase() || 'CHAPTER 1'}

${book.chapters?.[0]?.content?.substring(0, 200) || 'This is a preview of how your book will look in plain text format.'} ...

-----------------------------------------------
Plain text preview - actual export will contain the full content of your book.</pre>
    </div>`;
};
