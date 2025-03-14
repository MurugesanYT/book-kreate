
import { toast } from "sonner";

// API key is stored here and not exposed in the frontend
const GEMINI_API_KEY = "AIzaSyDJ9lykUQGKZ5EB0P5GcsKjfjVbKlfoZVE";

// Base URL for the Gemini API
const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL_NAME = "gemini-pro";

// Function to call the Gemini API 
export const generateWithGemini = async (prompt: string, maxTokens = 1024): Promise<string> => {
  try {
    console.log("Generating content with prompt:", prompt);
    
    const response = await fetch(
      `${API_BASE_URL}/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: 0.7,
            topP: 0.95,
            topK: 40,
          },
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to generate content");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating content:", error);
    toast.error("Failed to generate content. Please try again.");
    throw error;
  }
};

// Function to generate a book title if not provided
export const generateBookTitle = async (description: string, type: string, category: string): Promise<string> => {
  try {
    const prompt = `Generate a creative and engaging title for a ${type} book in the ${category} category with the following description: "${description}". The title should be catchy, relevant to the content, and not include any quotation marks. Return only the title text, nothing else.`;
    
    const title = await generateWithGemini(prompt, 50);
    return title.trim().replace(/["']/g, ''); // Remove any quotes that might be in the response
  } catch (error) {
    console.error("Error generating book title:", error);
    toast.error("Failed to generate book title. Using generic title instead.");
    return "My Book"; // Fallback title
  }
};

// Function to generate a book plan
export const generateBookPlan = async (book: any): Promise<any[]> => {
  try {
    const prompt = `Create a detailed chapter plan for a ${book.type} book titled "${book.title}" in the ${book.category} category. The book is about: ${book.description}.

    Provide a JSON array with 5-7 chapters. Each chapter should have a "title" field with a compelling chapter title. Format exactly as:
    [
      {"title": "Chapter 1 Title"},
      {"title": "Chapter 2 Title"},
      ... and so on
    ]
    
    Only return the valid JSON array, nothing else.`;
    
    const planText = await generateWithGemini(prompt, 300);
    
    // Extract just the JSON part in case there's any extra text
    const jsonMatch = planText.match(/\[\s*\{.*\}\s*\]/s);
    if (!jsonMatch) {
      throw new Error("Failed to generate valid chapter plan");
    }
    
    const chapterPlan = JSON.parse(jsonMatch[0]);
    
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

// Function to generate book content based on type
export const generateBookContent = async (
  book: any, 
  itemType: 'cover' | 'chapter' | 'credits', 
  itemTitle: string
): Promise<string> => {
  let prompt = "";
  
  if (itemType === 'cover') {
    prompt = `Create a cover page for a ${book.type} book titled "${book.title}" in the ${book.category} category. This book is about: ${book.description}. Format the response using markdown.`;
  } else if (itemType === 'chapter') {
    prompt = `Write a chapter titled "${itemTitle}" for a ${book.type} book titled "${book.title}" in the ${book.category} category. The book is about: ${book.description}. Make it engaging and appropriate for the target audience. Format the response using markdown.`;
  } else if (itemType === 'credits') {
    // Create a credits list prompt including the book's contributors
    const creditsList = book.credits
      .map((credit: any) => `${credit.role}: ${credit.name}`)
      .join(", ");
    
    prompt = `Create a credits page for a ${book.type} book titled "${book.title}". Include the following contributors: ${creditsList}. Format it nicely with markdown.`;
  }
  
  return generateWithGemini(prompt);
};
