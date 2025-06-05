
import { getUserPlan, hasFeatureAccess } from '../api/planService';
import { Book } from '../api/types';

export interface AIFeature {
  id: string;
  name: string;
  description: string;
  tier: 'Basic' | 'Pro' | 'Ultimate';
  category: 'analysis' | 'generation' | 'enhancement' | 'planning';
}

export const AI_FEATURES: AIFeature[] = [
  // Basic Tier Features
  {
    id: 'basic-grammar-check',
    name: 'Grammar Check',
    description: 'Basic grammar and spelling correction',
    tier: 'Basic',
    category: 'enhancement'
  },
  {
    id: 'basic-chapter-suggestions',
    name: 'Chapter Suggestions',
    description: 'Simple chapter outline suggestions',
    tier: 'Basic',
    category: 'planning'
  },
  {
    id: 'basic-character-names',
    name: 'Character Name Generator',
    description: 'Generate character names by genre',
    tier: 'Basic',
    category: 'generation'
  },

  // Pro Tier Features
  {
    id: 'pro-plot-analysis',
    name: 'Plot Structure Analysis',
    description: 'Analyze plot structure and suggest improvements',
    tier: 'Pro',
    category: 'analysis'
  },
  {
    id: 'pro-character-development',
    name: 'Character Arc Development',
    description: 'Deep character development and arc analysis',
    tier: 'Pro',
    category: 'analysis'
  },
  {
    id: 'pro-style-enhancement',
    name: 'Style Enhancement',
    description: 'Improve writing style and voice consistency',
    tier: 'Pro',
    category: 'enhancement'
  },
  {
    id: 'pro-dialogue-improvement',
    name: 'Dialogue Enhancement',
    description: 'Improve dialogue realism and character voice',
    tier: 'Pro',
    category: 'enhancement'
  },
  {
    id: 'pro-pacing-analysis',
    name: 'Pacing Analysis',
    description: 'Analyze and improve story pacing',
    tier: 'Pro',
    category: 'analysis'
  },

  // Ultimate Tier Features
  {
    id: 'ultimate-world-building',
    name: 'Advanced World Building',
    description: 'Comprehensive world creation with consistency checking',
    tier: 'Ultimate',
    category: 'generation'
  },
  {
    id: 'ultimate-market-analysis',
    name: 'Market Trend Analysis',
    description: 'Analyze current market trends and reader preferences',
    tier: 'Ultimate',
    category: 'analysis'
  },
  {
    id: 'ultimate-genre-blending',
    name: 'Genre Blending Assistant',
    description: 'Help create unique genre combinations',
    tier: 'Ultimate',
    category: 'planning'
  },
  {
    id: 'ultimate-cultural-consultant',
    name: 'Cultural Consultant',
    description: 'Ensure cultural accuracy and sensitivity',
    tier: 'Ultimate',
    category: 'analysis'
  },
  {
    id: 'ultimate-sequel-planning',
    name: 'Series Planning',
    description: 'Plan multi-book series with complex storylines',
    tier: 'Ultimate',
    category: 'planning'
  },
  {
    id: 'ultimate-character-psychology',
    name: 'Character Psychology Deep Dive',
    description: 'Psychological analysis of character motivations',
    tier: 'Ultimate',
    category: 'analysis'
  },
  {
    id: 'ultimate-historical-accuracy',
    name: 'Historical Accuracy Checker',
    description: 'Verify historical details and context',
    tier: 'Ultimate',
    category: 'analysis'
  },
  {
    id: 'ultimate-scientific-consultant',
    name: 'Scientific Consultant',
    description: 'Ensure scientific accuracy in sci-fi works',
    tier: 'Ultimate',
    category: 'analysis'
  },
  {
    id: 'ultimate-emotional-impact',
    name: 'Emotional Impact Optimizer',
    description: 'Maximize emotional resonance with readers',
    tier: 'Ultimate',
    category: 'enhancement'
  },
  {
    id: 'ultimate-narrative-innovation',
    name: 'Narrative Innovation',
    description: 'Explore experimental narrative techniques',
    tier: 'Ultimate',
    category: 'enhancement'
  }
];

export const getAvailableFeatures = (): AIFeature[] => {
  const userPlan = getUserPlan();
  
  return AI_FEATURES.filter(feature => {
    switch (userPlan) {
      case 'Free':
        return false; // No AI features for free tier
      case 'Basic':
        return feature.tier === 'Basic';
      case 'Pro':
        return feature.tier === 'Basic' || feature.tier === 'Pro';
      case 'Ultimate':
        return true; // All features available
      default:
        return false;
    }
  });
};

export const canUseFeature = (featureId: string): boolean => {
  const feature = AI_FEATURES.find(f => f.id === featureId);
  if (!feature) return false;
  
  const userPlan = getUserPlan();
  
  switch (userPlan) {
    case 'Free':
      return false;
    case 'Basic':
      return feature.tier === 'Basic';
    case 'Pro':
      return feature.tier === 'Basic' || feature.tier === 'Pro';
    case 'Ultimate':
      return true;
    default:
      return false;
  }
};

// Premium AI Generation Functions
export const generateAdvancedCharacterProfile = async (characterName: string, book: Book): Promise<string> => {
  if (!canUseFeature('ultimate-character-psychology')) {
    throw new Error('This feature requires Ultimate plan');
  }
  
  // Simulate advanced character generation
  return `ADVANCED CHARACTER PROFILE: ${characterName}
  
PSYCHOLOGICAL PROFILE:
- Core Motivation: [AI-generated deep psychological drive]
- Unconscious Desires: [Hidden wants that drive behavior]
- Defense Mechanisms: [How they protect themselves emotionally]
- Cognitive Biases: [Mental shortcuts that influence decisions]
- Attachment Style: [How they form relationships]

BACKSTORY INTEGRATION:
- Formative Events: [Key experiences that shaped personality]
- Family Dynamics: [How family relationships influence behavior]
- Trauma Integration: [How past wounds affect current actions]
- Cultural Influences: [How background shapes worldview]

CHARACTER ARC BLUEPRINT:
- Starting Point: [Initial emotional/psychological state]
- Growth Challenges: [Specific obstacles for development]
- Transformation Moments: [Key scenes for character change]
- End State: [Final emotional/psychological growth]`;
};

export const analyzeMarketTrends = async (genre: string): Promise<string> => {
  if (!canUseFeature('ultimate-market-analysis')) {
    throw new Error('This feature requires Ultimate plan');
  }
  
  // Simulate market analysis
  return `MARKET TREND ANALYSIS: ${genre}

CURRENT TRENDS:
- Rising demand for diverse protagonists (+25% in last year)
- Climate fiction gaining popularity (+40% growth)
- Shorter chapters preferred by 73% of readers
- Audio-first writing style increasing

READER DEMOGRAPHICS:
- Primary audience: 25-45 years old
- Gender split: 65% female, 35% male
- Reading preferences: Character-driven plots (78%)
- Average book length: 80,000-100,000 words

COMPETITIVE LANDSCAPE:
- Top performing titles in genre
- Successful plot elements
- Common pricing strategies
- Marketing channel effectiveness

RECOMMENDATIONS:
- Focus on diverse character representation
- Integrate environmental themes
- Structure for audio consumption
- Target 85,000 word count for optimal engagement`;
};

export const generateWorldBuildingGuide = async (book: Book): Promise<string> => {
  if (!canUseFeature('ultimate-world-building')) {
    throw new Error('This feature requires Ultimate plan');
  }
  
  return `COMPREHENSIVE WORLD BUILDING GUIDE: ${book.title}

PHYSICAL WORLD:
- Geography and Climate Systems
- Natural Resources and Ecosystems
- Astronomical Features (moons, suns, etc.)
- Geological History and Formations

CIVILIZATIONS:
- Cultural Groups and Their Origins
- Social Hierarchies and Class Systems
- Educational and Knowledge Systems
- Art, Music, and Cultural Expression

POLITICAL SYSTEMS:
- Government Structures
- Legal Systems and Justice
- International Relations
- Power Distribution and Conflicts

ECONOMIC SYSTEMS:
- Currency and Trade
- Resource Distribution
- Economic Classes
- Technology and Industry

BELIEF SYSTEMS:
- Religions and Mythologies
- Philosophical Schools
- Superstitions and Folk Beliefs
- Moral and Ethical Frameworks

CONSISTENCY RULES:
- Magic/Technology Limitations
- Natural Laws and Physics
- Cultural Logic and Reasoning
- Historical Timeline Integrity`;
};
