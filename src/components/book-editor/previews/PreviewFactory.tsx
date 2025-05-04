
import { BasePreviewProps, generateUpgradeBanner, sendPreviewToWindow } from './BasePreview';
import { generatePDFPreview } from './PDFPreview';
import { generateEbookPreview } from './EbookPreview';
import { generateHTMLPreview } from './HTMLPreview';
import { 
  generateDocxPreview, 
  generateMarkdownPreview, 
  generateTxtPreview 
} from './TextBasedPreviews';
import { 
  generateRichTextPreview, 
  generateLaTeXPreview, 
  generateODTPreview,
  generatePagesPreview,
  generateFB2Preview,
  generateCBZPreview
} from './SpecializedPreviews';
import { ExportFormat } from '@/lib/api/types';
import { getUserPlan } from '@/lib/api/planService';

export interface PreviewGenerationProps {
  format: ExportFormat;
  isFormatAllowed: boolean;
  book: any;
  options?: any;
  previewWindow: Window | null;
  previewInNewTab?: boolean;
  darkMode?: boolean;
}

export const generatePreviewContent = (props: PreviewGenerationProps): string => {
  const { format, isFormatAllowed, book, options, previewWindow, previewInNewTab, darkMode } = props;
  
  if (!isFormatAllowed) {
    const currentPlan = getUserPlan();
    const upgradeBanner = generateUpgradeBanner(format, currentPlan);
    
    // Send content to preview window if it exists
    if (previewInNewTab && previewWindow) {
      sendPreviewToWindow(previewWindow, upgradeBanner);
    }
    
    return upgradeBanner;
  }
  
  const baseProps: BasePreviewProps = { book, options, previewWindow, darkMode };
  let preview = '';
  
  switch (format) {
    case 'pdf':
      preview = generatePDFPreview(baseProps);
      break;
    case 'epub':
    case 'mobi':
    case 'azw3':
      preview = generateEbookPreview(baseProps);
      break;
    case 'html':
      preview = generateHTMLPreview(baseProps);
      break;
    case 'docx':
      preview = generateDocxPreview(baseProps);
      break;
    case 'markdown':
      preview = generateMarkdownPreview(baseProps);
      break;
    case 'txt':
      preview = generateTxtPreview(baseProps);
      break;
    case 'rtf':
      preview = generateRichTextPreview(baseProps);
      break;
    case 'latex':
      preview = generateLaTeXPreview(baseProps);
      break;
    case 'odt':
      preview = generateODTPreview(baseProps);
      break;
    case 'pages':
      preview = generatePagesPreview(baseProps);
      break;
    case 'fb2':
      preview = generateFB2Preview(baseProps);
      break;
    case 'cbz':
      preview = generateCBZPreview(baseProps);
      break;
    default:
      preview = `<div class="p-6">
        <h2 class="text-xl font-bold mb-2">${book.title}</h2>
        <p class="text-gray-600">By ${book.author || 'Unknown'}</p>
        <div class="mt-4">Preview not available for ${format} format</div>
      </div>`;
  }
  
  // Send content to preview window if it exists
  if (previewInNewTab && previewWindow) {
    sendPreviewToWindow(previewWindow, preview);
  }
  
  return preview;
};
