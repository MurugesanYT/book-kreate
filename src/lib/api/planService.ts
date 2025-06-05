import { BookData } from './types';
import { toast } from 'sonner';

// Define available plans with corrected features and realistic support
export const PLANS = {
  Free: {
    books: 2,
    chapters: 5,
    exportFormats: ['txt'],
    price: '$0',
    aiGeneration: 'basic',
    templates: 0,
    exclusiveFeatures: [],
    support: 'Community forum'
  },
  Basic: {
    books: 10,
    chapters: 10,
    exportFormats: ['txt', 'pdf', 'html'],
    price: '$5',
    aiGeneration: 'standard',
    templates: 5,
    exclusiveFeatures: ['basic-analytics', 'chapter-suggestions'],
    support: 'Email support'
  },
  Pro: {
    books: 30,
    chapters: 40,
    exportFormats: ['pdf', 'epub', 'docx', 'html', 'markdown', 'txt'],
    price: '$19',
    aiGeneration: 'advanced',
    templates: 25,
    exclusiveFeatures: ['advanced-analytics', 'ai-character-development', 'plot-analysis', 'style-enhancement'],
    support: 'Priority email support'
  },
  Ultimate: {
    books: Infinity,
    chapters: Infinity,
    exportFormats: ['pdf', 'epub', 'mobi', 'docx', 'txt', 'html', 'markdown', 'rtf', 'azw3', 'fb2', 'latex', 'odt'],
    price: '$49',
    aiGeneration: 'premium',
    templates: 75,
    exclusiveFeatures: [
      'premium-ai-generation', 
      'advanced-plot-generation', 
      'character-arc-analysis',
      'world-building-assistant',
      'advanced-style-analysis',
      'market-trend-analysis',
      'collaborative-editing',
      'white-label-export',
      'api-access'
    ],
    support: 'Priority support with faster response'
  }
};

export type PlanKey = keyof typeof PLANS;

// Get user's current plan
export const getUserPlan = (): PlanKey => {
  const storedPlan = localStorage.getItem('userPlan');
  if (!storedPlan || !PLANS[storedPlan as PlanKey]) {
    // Default to Free plan if no valid plan is found
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

// Check if user can create a new book
export const canCreateBook = (currentBooks: BookData[]): boolean => {
  const plan = getUserPlan();
  const maxBooks = PLANS[plan].books;
  
  if (maxBooks === Infinity) return true;
  
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
  
  if (maxChapters === Infinity) return true;
  
  if ((book.chapters?.length || 0) >= maxChapters) {
    toast.error(`Your ${plan} plan allows a maximum of ${maxChapters} chapters per book. Please upgrade to add more.`);
    return false;
  }
  
  return true;
};

// Check if user can create multiple chapters at once
export const canCreateMultipleChapters = (book: BookData, requestedCount: number): boolean => {
  const plan = getUserPlan();
  const maxChapters = PLANS[plan].chapters;
  const currentChapters = book.chapters?.length || 0;
  
  if (maxChapters === Infinity) return true;
  
  if (currentChapters + requestedCount > maxChapters) {
    const availableSlots = maxChapters - currentChapters;
    toast.error(`Your ${plan} plan allows a maximum of ${maxChapters} chapters per book. You can only add ${availableSlots} more chapter(s).`);
    return false;
  }
  
  return true;
};

// Get maximum chapters that can be created at once
export const getMaxChaptersCanCreate = (book: BookData): number => {
  const plan = getUserPlan();
  const maxChapters = PLANS[plan].chapters;
  const currentChapters = book.chapters?.length || 0;
  
  if (maxChapters === Infinity) return 20; // Reasonable limit for UI
  
  return Math.max(0, maxChapters - currentChapters);
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

// Check if user has access to a specific feature
export const hasFeatureAccess = (feature: string): boolean => {
  const plan = getUserPlan();
  const planData = PLANS[plan];
  
  // Check if feature is in exclusive features list
  return planData.exclusiveFeatures.includes(feature);
};

// Get AI generation tier for current user
export const getAIGenerationTier = (): string => {
  const plan = getUserPlan();
  return PLANS[plan].aiGeneration;
};

// Get available templates count for current user
export const getAvailableTemplates = (): number => {
  const plan = getUserPlan();
  return PLANS[plan].templates;
};

// Check if user can access premium AI features
export const canUsePremiumAI = (): boolean => {
  const plan = getUserPlan();
  return plan === 'Ultimate';
};

// Generate a book plan based on book details
export const generateBookPlan = async (book: BookData): Promise<any[]> => {
  try {
    const aiTier = getAIGenerationTier();
    
    // Generate tasks based on AI tier
    let defaultTasks = [
      {
        id: 'task-1',
        title: 'Plan book structure',
        description: `Create an outline for "${book.title}"`,
        status: 'pending',
        type: 'planning'
      },
      {
        id: 'task-2',
        title: 'Write introduction',
        description: `Write the opening chapter for "${book.title}"`,
        status: 'pending',
        type: 'writing'
      }
    ];
    
    // Add more sophisticated tasks for higher tiers
    if (aiTier === 'advanced' || aiTier === 'premium') {
      defaultTasks.push(
        {
          id: 'task-3',
          title: 'Character development',
          description: 'Create detailed character profiles and arcs',
          status: 'pending',
          type: 'character'
        },
        {
          id: 'task-4',
          title: 'Plot analysis',
          description: 'Analyze story structure and plot points',
          status: 'pending',
          type: 'analysis'
        }
      );
    }
    
    if (aiTier === 'premium') {
      defaultTasks.push(
        {
          id: 'task-5',
          title: 'World building',
          description: 'Develop comprehensive world and setting details',
          status: 'pending',
          type: 'worldbuilding'
        },
        {
          id: 'task-6',
          title: 'Market analysis',
          description: 'Analyze target audience and market trends',
          status: 'pending',
          type: 'market'
        }
      );
    }
    
    return defaultTasks;
  } catch (error) {
    console.error("Error generating book plan:", error);
    toast.error("Failed to generate book plan");
    return [];
  }
};
