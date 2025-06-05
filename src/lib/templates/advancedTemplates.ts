
export interface BookTemplate {
  id: string;
  title: string;
  description: string;
  genre: string;
  tier: 'Basic' | 'Pro' | 'Ultimate';
  chapters: {
    title: string;
    description: string;
    content?: string;
  }[];
  features: string[];
  aiPrompts?: {
    characterDevelopment?: string;
    plotStructure?: string;
    worldBuilding?: string;
  };
}

export const ADVANCED_TEMPLATES: BookTemplate[] = [
  // Basic Tier Templates (5 templates)
  {
    id: 'basic-romance',
    title: 'Romance Novel',
    description: 'Classic romance with meet-cute and happy ending',
    genre: 'Romance',
    tier: 'Basic',
    chapters: [
      { title: 'The Meeting', description: 'First encounter between protagonists' },
      { title: 'Growing Closer', description: 'Building relationship and tension' },
      { title: 'The Conflict', description: 'Major obstacle or misunderstanding' },
      { title: 'Resolution', description: 'Overcoming obstacles' },
      { title: 'Happy Ending', description: 'Romantic conclusion' }
    ],
    features: ['Character arcs', 'Emotional beats', 'Dialogue prompts']
  },
  {
    id: 'basic-mystery',
    title: 'Mystery Novel',
    description: 'Classic whodunit with clues and red herrings',
    genre: 'Mystery',
    tier: 'Basic',
    chapters: [
      { title: 'The Crime', description: 'Discovery of the mystery' },
      { title: 'Initial Investigation', description: 'First clues and suspects' },
      { title: 'Red Herrings', description: 'False leads and misdirection' },
      { title: 'The Breakthrough', description: 'Key evidence uncovered' },
      { title: 'The Solution', description: 'Mystery solved and explained' }
    ],
    features: ['Clue tracking', 'Suspect profiles', 'Plot twists']
  },
  {
    id: 'basic-adventure',
    title: 'Adventure Story',
    description: 'Hero\'s journey with quests and challenges',
    genre: 'Adventure',
    tier: 'Basic',
    chapters: [
      { title: 'The Call', description: 'Hero receives their mission' },
      { title: 'The Journey Begins', description: 'Setting out on the quest' },
      { title: 'Trials and Challenges', description: 'Obstacles to overcome' },
      { title: 'The Ordeal', description: 'Greatest challenge faced' },
      { title: 'The Return', description: 'Hero returns transformed' }
    ],
    features: ['Quest structure', 'Character growth', 'Action sequences']
  },
  {
    id: 'basic-coming-of-age',
    title: 'Coming of Age',
    description: 'Young protagonist\'s journey to maturity',
    genre: 'Literary Fiction',
    tier: 'Basic',
    chapters: [
      { title: 'Innocence', description: 'Character in their comfort zone' },
      { title: 'The Challenge', description: 'First major life challenge' },
      { title: 'Struggle', description: 'Learning and growing' },
      { title: 'Understanding', description: 'Gaining new perspective' },
      { title: 'Maturity', description: 'Character emerges changed' }
    ],
    features: ['Character development', 'Theme exploration', 'Symbolic elements']
  },
  {
    id: 'basic-horror',
    title: 'Horror Story',
    description: 'Suspenseful horror with escalating tension',
    genre: 'Horror',
    tier: 'Basic',
    chapters: [
      { title: 'Normal Life', description: 'Establishing normalcy' },
      { title: 'First Signs', description: 'Something isn\'t right' },
      { title: 'Growing Terror', description: 'Fear escalates' },
      { title: 'The Horror Revealed', description: 'Truth is exposed' },
      { title: 'Confrontation', description: 'Final battle with evil' }
    ],
    features: ['Tension building', 'Atmosphere creation', 'Fear escalation']
  },

  // Pro Tier Templates (25 templates)
  {
    id: 'pro-epic-fantasy',
    title: 'Epic Fantasy Saga',
    description: 'Multi-book fantasy epic with complex world-building',
    genre: 'Fantasy',
    tier: 'Pro',
    chapters: [
      { title: 'The Prophecy', description: 'Ancient prophecy sets events in motion' },
      { title: 'The Chosen One', description: 'Protagonist discovers their destiny' },
      { title: 'Gathering Allies', description: 'Building the fellowship' },
      { title: 'The First Trial', description: 'Testing the group\'s resolve' },
      { title: 'Betrayal', description: 'Unexpected betrayal shakes the group' },
      { title: 'The Dark Lord Rises', description: 'Antagonist reveals their power' },
      { title: 'Preparing for War', description: 'Gathering forces for final battle' },
      { title: 'The Final Battle', description: 'Epic confrontation' }
    ],
    features: ['World-building guide', 'Magic system', 'Political intrigue', 'Multiple POVs'],
    aiPrompts: {
      characterDevelopment: 'Create complex character arcs spanning multiple books',
      plotStructure: 'Design intricate plot with multiple storylines',
      worldBuilding: 'Develop detailed fantasy world with unique cultures'
    }
  },
  {
    id: 'pro-space-opera',
    title: 'Space Opera',
    description: 'Galactic-scale science fiction adventure',
    genre: 'Science Fiction',
    tier: 'Pro',
    chapters: [
      { title: 'The Discovery', description: 'Finding ancient alien technology' },
      { title: 'First Contact', description: 'Meeting alien civilizations' },
      { title: 'Galactic Politics', description: 'Navigating interstellar conflicts' },
      { title: 'The Threat', description: 'Galaxy-ending danger emerges' },
      { title: 'Alliance Building', description: 'Uniting diverse species' },
      { title: 'Space Battles', description: 'Epic fleet confrontations' },
      { title: 'The Sacrifice', description: 'Someone pays the ultimate price' },
      { title: 'New Galaxy', description: 'Establishing new order' }
    ],
    features: ['Technology development', 'Alien cultures', 'Space politics', 'Hard science'],
    aiPrompts: {
      characterDevelopment: 'Create diverse alien characters with unique perspectives',
      plotStructure: 'Design galaxy-spanning plot with political complexity',
      worldBuilding: 'Develop multiple star systems with distinct characteristics'
    }
  },
  // ... (continuing with more Pro templates)
  {
    id: 'pro-psychological-thriller',
    title: 'Psychological Thriller',
    description: 'Mind-bending thriller exploring human psychology',
    genre: 'Thriller',
    tier: 'Pro',
    chapters: [
      { title: 'Perfect Life', description: 'Protagonist\'s seemingly perfect existence' },
      { title: 'Cracks Appear', description: 'Small inconsistencies emerge' },
      { title: 'Questioning Reality', description: 'Doubting what\'s real' },
      { title: 'The Revelation', description: 'Shocking truth revealed' },
      { title: 'Psychological Breakdown', description: 'Mental state deteriorates' },
      { title: 'Fighting Back', description: 'Protagonist takes control' },
      { title: 'The Truth', description: 'Final reality unveiled' }
    ],
    features: ['Unreliable narrator', 'Plot twists', 'Psychological depth', 'Reality questioning'],
    aiPrompts: {
      characterDevelopment: 'Create psychologically complex characters with hidden depths',
      plotStructure: 'Design non-linear narrative with multiple reveals'
    }
  },

  // Ultimate Tier Templates (75+ templates)
  {
    id: 'ultimate-multiverse-saga',
    title: 'Multiverse Saga',
    description: 'Reality-spanning epic across infinite dimensions',
    genre: 'Science Fantasy',
    tier: 'Ultimate',
    chapters: [
      { title: 'Reality Fractures', description: 'First signs of multiverse breakdown' },
      { title: 'Dimensional Travelers', description: 'Meeting alternate selves' },
      { title: 'The Council of Realities', description: 'Governing body of dimensions' },
      { title: 'The Threat Beyond', description: 'Enemy that consumes realities' },
      { title: 'Infinite Possibilities', description: 'Exploring alternate timelines' },
      { title: 'The Convergence', description: 'All realities come together' },
      { title: 'Ultimate Sacrifice', description: 'Someone must become the guardian' },
      { title: 'New Multiverse', description: 'Rebuilding reality itself' }
    ],
    features: [
      'Multiverse mapping', 'Alternate character versions', 'Reality manipulation',
      'Quantum mechanics', 'Philosophical exploration', 'Advanced world-building'
    ],
    aiPrompts: {
      characterDevelopment: 'Create infinite character variations across dimensions',
      plotStructure: 'Design reality-spanning narrative with quantum possibilities',
      worldBuilding: 'Develop infinite worlds with consistent multiversal rules'
    }
  },
  {
    id: 'ultimate-generational-saga',
    title: 'Generational Saga',
    description: 'Family epic spanning centuries and continents',
    genre: 'Historical Fiction',
    tier: 'Ultimate',
    chapters: [
      { title: 'The Founding', description: 'Family origins in old country' },
      { title: 'The Journey', description: 'Immigration to new lands' },
      { title: 'First Generation', description: 'Establishing new life' },
      { title: 'Growing Empire', description: 'Building family fortune' },
      { title: 'The Great War', description: 'Family scattered by conflict' },
      { title: 'Rebuilding', description: 'Post-war reconstruction' },
      { title: 'Modern Challenges', description: 'Contemporary family issues' },
      { title: 'Legacy', description: 'What endures through generations' }
    ],
    features: [
      'Historical research integration', 'Family tree development', 'Cultural evolution',
      'Economic analysis', 'Social change tracking', 'Genealogical accuracy'
    ],
    aiPrompts: {
      characterDevelopment: 'Create multi-generational character evolution',
      plotStructure: 'Design century-spanning narrative with historical accuracy',
      worldBuilding: 'Develop changing world across multiple time periods'
    }
  },
  {
    id: 'ultimate-consciousness-upload',
    title: 'Digital Consciousness',
    description: 'Exploring humanity in the age of mind uploading',
    genre: 'Hard Science Fiction',
    tier: 'Ultimate',
    chapters: [
      { title: 'The Upload', description: 'First successful consciousness transfer' },
      { title: 'Digital Existence', description: 'Learning to live as data' },
      { title: 'The Divide', description: 'Conflict between uploaded and physical humans' },
      { title: 'Virtual Worlds', description: 'Creating new realities' },
      { title: 'The Virus', description: 'Threat to digital consciousness' },
      { title: 'Identity Crisis', description: 'What makes us human?' },
      { title: 'The Merge', description: 'Physical and digital worlds collide' },
      { title: 'Evolution', description: 'Humanity\'s next phase' }
    ],
    features: [
      'Consciousness theory', 'Digital physics', 'Philosophy of mind',
      'Technological singularity', 'Ethics of uploading', 'Virtual reality design'
    ],
    aiPrompts: {
      characterDevelopment: 'Explore consciousness transfer effects on personality',
      plotStructure: 'Design philosophical narrative about human nature',
      worldBuilding: 'Create believable digital worlds and transfer technology'
    }
  }
  // ... (would continue with all 75+ Ultimate templates)
];

export const getTemplatesByTier = (tier: string): BookTemplate[] => {
  return ADVANCED_TEMPLATES.filter(template => {
    switch (tier) {
      case 'Free':
        return false; // No templates for free tier
      case 'Basic':
        return template.tier === 'Basic';
      case 'Pro':
        return template.tier === 'Basic' || template.tier === 'Pro';
      case 'Ultimate':
        return true; // All templates available
      default:
        return false;
    }
  });
};

export const getTemplateById = (id: string): BookTemplate | undefined => {
  return ADVANCED_TEMPLATES.find(template => template.id === id);
};
