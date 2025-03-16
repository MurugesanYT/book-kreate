
import { toast } from "sonner";
import { generateWithGemini } from "./geminiService";
import { BookData, PlanItem, BookItemType } from "./types";

// Function to generate a book plan with descriptive chapter titles
export const generateBookPlan = async (book: BookData): Promise<PlanItem[]> => {
  try {
    const prompt = `Create a detailed chapter plan for a ${book.type} book titled "${book.title}" in the ${book.category} category. The book is about: ${book.description}.

    Provide a JSON array with 5-7 chapters. Each chapter should have a "title" field with a compelling chapter title and a "description" field with a brief (25-30 word) summary of what the chapter will cover. Format exactly as:
    [
      {"title": "Chapter Title 1", "description": "Brief description of chapter 1 content..."},
      {"title": "Chapter Title 2", "description": "Brief description of chapter 2 content..."},
      ... and so on
    ]
    
    Only return the valid JSON array, nothing else.`;
    
    console.log("Generating book plan with prompt:", prompt.substring(0, 150) + "...");
    const planText = await generateWithGemini(prompt, 1000);
    
    console.log("Raw plan text received:", planText);
    
    // Extract just the JSON part in case there's any extra text
    const jsonMatch = planText.match(/\[\s*\{.*\}\s*\]/s);
    if (!jsonMatch) {
      console.error("Failed to extract valid JSON from response:", planText);
      
      // Try a more direct approach - attempt to parse the entire response as JSON
      try {
        const chapterPlan = JSON.parse(planText);
        if (Array.isArray(chapterPlan)) {
          console.log("Successfully parsed JSON array directly");
          
          // Create a complete plan with cover and credits
          return createCompletePlan(book, chapterPlan);
        }
      } catch (parseError) {
        console.error("Could not parse entire response as JSON either:", parseError);
      }
      
      throw new Error("Failed to generate valid chapter plan");
    }
    
    try {
      const chapterPlan = JSON.parse(jsonMatch[0]);
      console.log("Generated chapter plan:", chapterPlan);
      
      return createCompletePlan(book, chapterPlan);
    } catch (error) {
      console.error("Error parsing AI response as JSON:", error);
      throw new Error("Generated plan was not in valid JSON format");
    }
  } catch (error) {
    console.error("Error generating book plan:", error);
    toast.error("Failed to generate a custom book plan. Using default plan instead.");
    
    // Return default plan if generation fails
    return createDefaultPlan(book);
  }
};

// Helper function to create a complete plan with cover and credits
const createCompletePlan = (book: BookData, chapterPlan: any[]): PlanItem[] => {
  const timestamp = Date.now();
  return [
    {
      id: `item_${timestamp}_cover`,
      title: 'Cover Page',
      type: 'cover' as BookItemType,
      status: 'pending' as const
    },
    ...chapterPlan.map((chapter: any, index: number) => ({
      id: `item_${timestamp}_${index+1}`,
      title: chapter.title || `Chapter ${index+1}`,
      description: chapter.description || `Content for ${chapter.title || `Chapter ${index+1}`}`,
      type: 'chapter' as BookItemType,
      status: 'pending' as const
    })),
    {
      id: `item_${timestamp}_credits`,
      title: 'Credits Page',
      type: 'credits' as BookItemType,
      status: 'pending' as const
    }
  ];
};

// Create a default plan if generation fails - now includes book title and info
const createDefaultPlan = (book: BookData): PlanItem[] => {
  const timestamp = Date.now();
  const defaultPlanItems: PlanItem[] = [
    {
      id: `item_${timestamp}_cover`,
      title: 'Cover Page',
      type: 'cover' as BookItemType,
      status: 'pending' as const
    }
  ];
  
  for (let i = 1; i <= 5; i++) {
    defaultPlanItems.push({
      id: `item_${timestamp}_${i}`,
      title: `Chapter ${i}: The Journey Continues`,
      description: `Default content for Chapter ${i} of "${book.title}"`,
      type: 'chapter' as BookItemType,
      status: 'pending' as const
    });
  }
  
  defaultPlanItems.push({
    id: `item_${timestamp}_credits`,
    title: 'Credits Page',
    type: 'credits' as BookItemType,
    status: 'pending' as const
  });
  
  return defaultPlanItems;
};
