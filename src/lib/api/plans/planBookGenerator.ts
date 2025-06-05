
import { toast } from 'sonner';
import { BookData } from '../types';
import { getAIGenerationTier } from './planValidators';
import { PlanKey } from './planDefinitions';

// Generate a book plan based on book details
export const generateBookPlan = async (book: BookData, planKey: PlanKey): Promise<any[]> => {
  try {
    const aiTier = getAIGenerationTier(planKey);
    
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
