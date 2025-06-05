
import { toast } from 'sonner';
import { PLANS, PlanKey } from './planDefinitions';
import { BookData } from '../types';

// Check if user can create a new book
export const canCreateBook = (currentBooks: BookData[], planKey: PlanKey): boolean => {
  const maxBooks = PLANS[planKey].books;
  
  if (maxBooks === Infinity) return true;
  
  if (currentBooks.length >= maxBooks) {
    toast.error(`Your ${planKey} plan allows a maximum of ${maxBooks} books. Please upgrade to create more.`);
    return false;
  }
  
  return true;
};

// Check if user can add a new chapter to a book
export const canAddChapter = (book: BookData, planKey: PlanKey): boolean => {
  const maxChapters = PLANS[planKey].chapters;
  
  if (maxChapters === Infinity) return true;
  
  if ((book.chapters?.length || 0) >= maxChapters) {
    toast.error(`Your ${planKey} plan allows a maximum of ${maxChapters} chapters per book. Please upgrade to add more.`);
    return false;
  }
  
  return true;
};

// Check if user can create multiple chapters at once
export const canCreateMultipleChapters = (book: BookData, requestedCount: number, planKey: PlanKey): boolean => {
  const maxChapters = PLANS[planKey].chapters;
  const currentChapters = book.chapters?.length || 0;
  
  if (maxChapters === Infinity) return true;
  
  if (currentChapters + requestedCount > maxChapters) {
    const availableSlots = maxChapters - currentChapters;
    toast.error(`Your ${planKey} plan allows a maximum of ${maxChapters} chapters per book. You can only add ${availableSlots} more chapter(s).`);
    return false;
  }
  
  return true;
};

// Get maximum chapters that can be created at once
export const getMaxChaptersCanCreate = (book: BookData, planKey: PlanKey): number => {
  const maxChapters = PLANS[planKey].chapters;
  const currentChapters = book.chapters?.length || 0;
  
  if (maxChapters === Infinity) return 20; // Reasonable limit for UI
  
  return Math.max(0, maxChapters - currentChapters);
};

// Check if user can export in a specific format
export const canExportInFormat = (format: string, planKey: PlanKey): boolean => {
  const allowedFormats = PLANS[planKey].exportFormats;
  
  if (!allowedFormats.includes(format)) {
    toast.error(`Your ${planKey} plan doesn't allow exporting to ${format} format. Please upgrade for more export options.`);
    return false;
  }
  
  return true;
};

// Get allowed export formats
export const getAllowedExportFormats = (planKey: PlanKey): string[] => {
  return PLANS[planKey].exportFormats;
};

// Check if user has access to a specific feature
export const hasFeatureAccess = (feature: string, planKey: PlanKey): boolean => {
  const planData = PLANS[planKey];
  return planData.exclusiveFeatures.includes(feature);
};

// Get AI generation tier for current user
export const getAIGenerationTier = (planKey: PlanKey): string => {
  return PLANS[planKey].aiGeneration;
};

// Get available templates count for current user
export const getAvailableTemplates = (planKey: PlanKey): number => {
  return PLANS[planKey].templates;
};

// Check if user can access premium AI features
export const canUsePremiumAI = (planKey: PlanKey): boolean => {
  return planKey === 'Ultimate';
};
