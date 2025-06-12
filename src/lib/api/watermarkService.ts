
import { getUserPlan } from './planService';

export const shouldShowWatermark = (): boolean => {
  const plan = getUserPlan();
  return plan === 'Free' || plan === 'Basic';
};

export const getWatermarkText = (): string => {
  return "Created with Book Kreate - www.bookkreate.com";
};

export const addWatermarkToContent = (content: string): string => {
  if (!shouldShowWatermark()) {
    return content;
  }
  
  const watermark = `\n\n---\n${getWatermarkText()}\n---`;
  return content + watermark;
};

export const addWatermarkToHTML = (htmlContent: string): string => {
  if (!shouldShowWatermark()) {
    return htmlContent;
  }
  
  const watermark = `
    <div style="position: fixed; bottom: 10px; right: 10px; 
                background: rgba(0,0,0,0.1); padding: 5px 10px; 
                font-size: 10px; color: #666; border-radius: 3px;">
      Created with Book Kreate
    </div>
  `;
  
  return htmlContent.replace('</body>', watermark + '</body>');
};

export const addWatermarkToPDF = (options: any): any => {
  if (!shouldShowWatermark()) {
    return options;
  }
  
  return {
    ...options,
    watermark: {
      text: 'Created with Book Kreate',
      opacity: 0.1,
      fontSize: 8,
      position: 'bottom-right'
    }
  };
};
