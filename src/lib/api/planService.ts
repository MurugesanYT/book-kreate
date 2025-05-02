
import { BookData } from './types';
import { toast } from 'sonner';

// Define available plans
export const PLANS = {
  Basic: {
    books: 3,
    chapters: 5,
    exportFormats: ['pdf'],
    price: '$5'
  },
  Pro: {
    books: 10,
    chapters: 12,
    exportFormats: ['pdf', 'epub', 'docx', 'html', 'markdown'],
    price: '$19'
  },
  Ultimate: {
    books: Infinity,
    chapters: Infinity,
    exportFormats: ['pdf', 'epub', 'mobi', 'docx', 'txt', 'html', 'markdown', 'rtf', 'azw3', 'fb2', 'latex', 'odt'],
    price: '$49'
  }
};

type PlanKey = keyof typeof PLANS;

// Get user's current plan
export const getUserPlan = (): PlanKey => {
  const storedPlan = localStorage.getItem('userPlan');
  if (!storedPlan || !PLANS[storedPlan as PlanKey]) {
    // Default to Basic plan if no valid plan is found
    localStorage.setItem('userPlan', 'Basic');
    return 'Basic';
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

// Check if user can create a new book
export const canCreateBook = (currentBooks: BookData[]): boolean => {
  const plan = getUserPlan();
  const maxBooks = PLANS[plan].books;
  
  if (currentBooks.length >= maxBooks) {
    toast.error(`Your ${plan} plan allows a maximum of ${maxBooks} books. Please upgrade to create more.`);
    return false;
  }
  
  return true;
};

// Check if user can add a new chapter to a book
export const canAddChapter = (book: BookData): boolean => {
  const plan = getUserPlan();
  const maxChapters = PLANS[plan].chapters;
  
  if ((book.chapters?.length || 0) >= maxChapters) {
    toast.error(`Your ${plan} plan allows a maximum of ${maxChapters} chapters per book. Please upgrade to add more.`);
    return false;
  }
  
  return true;
};

// Check if user can export in a specific format
export const canExportInFormat = (format: string): boolean => {
  const plan = getUserPlan();
  const allowedFormats = PLANS[plan].exportFormats;
  
  if (!allowedFormats.includes(format)) {
    toast.error(`Your ${plan} plan doesn't allow exporting to ${format} format. Please upgrade for more export options.`);
    return false;
  }
  
  return true;
};

// Get allowed export formats
export const getAllowedExportFormats = (): string[] => {
  const plan = getUserPlan();
  return PLANS[plan].exportFormats;
};
