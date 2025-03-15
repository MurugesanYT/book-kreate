
import { toast } from "sonner";
import { generateWithGemini } from "./geminiService";
import { BookData, PlanItem } from "./types";

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
    const planText = await generateWithGemini(prompt, 500);
    
    // Extract just the JSON part in case there's any extra text
    const jsonMatch = planText.match(/\[\s*\{.*\}\s*\]/s);
    if (!jsonMatch) {
      console.error("Failed to extract valid JSON from response:", planText);
      throw new Error("Failed to generate valid chapter plan");
    }
    
    const chapterPlan = JSON.parse(jsonMatch[0]);
    console.log("Generated chapter plan:", chapterPlan);
    
    // Create a complete plan with cover and credits
    const completePlan = [
      {
        id: `item_${Date.now()}_cover`,
        title: 'Cover Page',
        type: 'cover' as const,
        status: 'pending' as const
      },
      ...chapterPlan.map((chapter: any, index: number) => ({
        id: `item_${Date.now()}_${index+1}`,
        title: chapter.title,
        description: chapter.description || `Content for ${chapter.title}`,
        type: 'chapter' as const,
        status: 'pending' as const
      })),
      {
        id: `item_${Date.now()}_credits`,
        title: 'Credits Page',
        type: 'credits' as const,
        status: 'pending' as const
      }
    ];
    
    return completePlan;
  } catch (error) {
    console.error("Error generating book plan:", error);
    toast.error("Failed to generate a custom book plan. Using default plan instead.");
    
    // Return default plan if generation fails
    const defaultPlan = [
      {
        id: `item_${Date.now()}_cover`,
        title: 'Cover Page',
        type: 'cover' as const,
        status: 'pending' as const
      }
    ];
    
    for (let i = 1; i <= 5; i++) {
      defaultPlan.push({
        id: `item_${Date.now()}_${i}`,
        title: `Chapter ${i}`,
        description: `Default content for Chapter ${i}`,
        type: 'chapter' as const,
        status: 'pending' as const
      });
    }
    
    defaultPlan.push({
      id: `item_${Date.now()}_credits`,
      title: 'Credits Page',
      type: 'credits' as const,
      status: 'pending' as const
    });
    
    return defaultPlan;
  }
};
