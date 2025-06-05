
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
