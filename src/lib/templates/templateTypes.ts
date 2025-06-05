
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
