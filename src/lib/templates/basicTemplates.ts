
import { BookTemplate } from './templateTypes';

export const BASIC_TEMPLATES: BookTemplate[] = [
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
  }
];
