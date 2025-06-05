
import { BookTemplate } from './templateTypes';

export const PRO_TEMPLATES: BookTemplate[] = [
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
  }
];
