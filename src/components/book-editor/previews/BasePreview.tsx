
import React from 'react';

export interface BasePreviewProps {
  book: any;
  options?: any;
  previewWindow?: Window | null;
  previewInNewTab?: boolean;
}

export const sendPreviewToWindow = (previewWindow: Window | null, content: string) => {
  if (previewWindow && !previewWindow.closed) {
    previewWindow.postMessage(content, '*');
  }
};

export const convertLineSpacing = (spacing: string): string => {
  switch (spacing) {
    case 'single': return '1.0';
    case 'double': return '2.0';
    case 'relaxed': return '1.5';
    case 'normal':
    default:
      return '1.15';
  }
};

export const generateUpgradeBanner = (format: string, currentPlan: string) => {
  return `
    <div style="padding: 20px; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; text-align: center; margin-bottom: 20px;">
      <h3 style="margin-bottom: 10px; color: #6c757d;">Format Not Available</h3>
      <p style="margin-bottom: 15px; color: #6c757d;">
        The ${format.toUpperCase()} format is not available in your ${currentPlan} plan. 
        Please upgrade to unlock more export formats.
      </p>
      <a href="/account/plan" style="display: inline-block; padding: 8px 16px; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 4px;">
        Upgrade Plan
      </a>
    </div>
  `;
};

// Create a BasePreview component that can be extended by other previews
const BasePreview: React.FC<BasePreviewProps> = ({ book, options }) => {
  return (
    <div className="book-preview">
      <h1>{book.title}</h1>
      <p>By {book.author || 'Unknown'}</p>
      <p>This is a base preview. Please use a specific format preview component.</p>
    </div>
  );
};

export default BasePreview;
