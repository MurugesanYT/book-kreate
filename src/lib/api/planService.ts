import { toast } from 'sonner';
import { PLANS, type PlanKey } from './plans/planDefinitions';
import { 
  canCreateBook as validateBookCreation,
  canAddChapter as validateChapterAddition,
  canCreateMultipleChapters as validateMultipleChapters,
  getMaxChaptersCanCreate as getMaxChapters,
  canExportInFormat as validateExportFormat,
  getAllowedExportFormats as getExportFormats,
  hasFeatureAccess as checkFeatureAccess,
  getAIGenerationTier as getAITier,
  getAvailableTemplates as getTemplateCount,
  canUsePremiumAI as checkPremiumAI
} from './plans/planValidators';
import { generateBookPlan as createBookPlan } from './plans/planBookGenerator';
import { BookData } from './types';

// Export plans for external use
export { PLANS };
export type { PlanKey } from './plans/planDefinitions';

// Get user's current plan
export const getUserPlan = (): PlanKey => {
  const storedPlan = localStorage.getItem('userPlan');
  if (!storedPlan || !PLANS[storedPlan as PlanKey]) {
    localStorage.setItem('userPlan', 'Free');
    return 'Free';
  }
  return storedPlan as PlanKey;
};

// Set user's plan
export const setUserPlan = (plan: PlanKey): void => {
  if (PLANS[plan]) {
    localStorage.setItem('userPlan', plan);
    toast.success(`Successfully switched to ${plan} plan`);
  } else {
    toast.error('Invalid plan selected');
  }
};

// Validation functions using current user plan
export const canCreateBook = (currentBooks: BookData[]): boolean => {
  const plan = getUserPlan();
  return validateBookCreation(currentBooks, plan);
};

export const canAddChapter = (book: BookData): boolean => {
  const plan = getUserPlan();
  return validateChapterAddition(book, plan);
};

export const canCreateMultipleChapters = (book: BookData, requestedCount: number): boolean => {
  const plan = getUserPlan();
  return validateMultipleChapters(book, requestedCount, plan);
};

export const getMaxChaptersCanCreate = (book: BookData): number => {
  const plan = getUserPlan();
  return getMaxChapters(book, plan);
};

export const canExportInFormat = (format: string): boolean => {
  const plan = getUserPlan();
  return validateExportFormat(format, plan);
};

export const getAllowedExportFormats = (): string[] => {
  const plan = getUserPlan();
  return getExportFormats(plan);
};

export const hasFeatureAccess = (feature: string): boolean => {
  const plan = getUserPlan();
  return checkFeatureAccess(feature, plan);
};

export const getAIGenerationTier = (): string => {
  const plan = getUserPlan();
  return getAITier(plan);
};

export const getAvailableTemplates = (): number => {
  const plan = getUserPlan();
  return getTemplateCount(plan);
};

export const canUsePremiumAI = (): boolean => {
  const plan = getUserPlan();
  return checkPremiumAI(plan);
};

export const generateBookPlan = async (book: BookData): Promise<any[]> => {
  const plan = getUserPlan();
  return createBookPlan(book, plan);
};
