
import { toast } from "sonner";

// API key is stored here and not exposed in the frontend
const GEMINI_API_KEY = "AIzaSyDJ9lykUQGKZ5EB0P5GcsKjfjVbKlfoZVE";

// Base URL for the Gemini API
const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL_NAME = "gemini-pro";

// Function to call the Gemini API with improved error handling and retries
export const generateWithGemini = async (prompt: string, maxTokens = 1024): Promise<string> => {
  const maxRetries = 2;
  let retries = 0;
  let lastError: Error | null = null;

  while (retries <= maxRetries) {
    try {
      console.log(`Generating content with prompt (attempt ${retries + 1}):`, prompt.substring(0, 100) + "...");
      
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

      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error("Received invalid response format from API");
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error(`Error generating content (attempt ${retries + 1}):`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      retries++;
      
      if (retries > maxRetries) {
        console.error("All retries failed, giving up.");
        toast.error("Failed to generate content. Please try again.");
        throw lastError;
      }
      
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, 1000 * retries));
    }
  }
  
  // This should never happen due to the throw in the retry loop, but TypeScript needs it
  throw lastError || new Error("Unknown error generating content");
};

// Function to generate a book title if not provided
export const generateBookTitle = async (description: string, type: string, category: string): Promise<string> => {
  try {
    console.log("Generating book title for:", { description, type, category });
    
    const prompt = `Generate a creative and engaging title for a ${type} book in the ${category} category with the following description: "${description}". The title should be catchy, relevant to the content, and not include any quotation marks. Return only the title text, nothing else.`;
    
    const title = await generateWithGemini(prompt, 50);
    const cleanedTitle = title.trim().replace(/["']/g, ''); // Remove any quotes that might be in the response
    
    console.log("Generated title:", cleanedTitle);
    toast.success("Title generated successfully!");
    
    return cleanedTitle;
  } catch (error) {
    console.error("Error generating book title:", error);
    toast.error("Failed to generate book title. Using generic title instead.");
    return "My Book"; // Fallback title
  }
};

// Function to generate a book plan with descriptive chapter titles
export const generateBookPlan = async (book: any): Promise<any[]> => {
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

// Function to generate book content based on type
export const generateBookContent = async (
  book: any, 
  itemType: 'cover' | 'chapter' | 'credits', 
  itemTitle: string,
  itemDescription?: string
): Promise<string> => {
  let prompt = "";
  
  if (itemType === 'cover') {
    prompt = `Create a cover page for a ${book.type} book titled "${book.title}" in the ${book.category} category. This book is about: ${book.description}. Format the response using markdown.`;
  } else if (itemType === 'chapter') {
    prompt = `Write a chapter titled "${itemTitle}" for a ${book.type} book titled "${book.title}" in the ${book.category} category. 
    ${itemDescription ? `This chapter is about: ${itemDescription}.` : ''} 
    The book overall is about: ${book.description}. 
    Make it engaging and appropriate for the target audience. Format the response using markdown.`;
  } else if (itemType === 'credits') {
    // Create a credits list prompt including the book's contributors
    const creditsList = book.credits && book.credits.length > 0
      ? book.credits
          .filter((credit: any) => credit.role && credit.name)
          .map((credit: any) => `${credit.role}: ${credit.name}`)
          .join(", ")
      : "Author: Anonymous";
    
    prompt = `Create a credits page for a ${book.type} book titled "${book.title}". Include the following contributors: ${creditsList}. Format it nicely with markdown.`;
  }
  
  console.log(`Generating content for ${itemType} "${itemTitle}" with prompt:`, prompt.substring(0, 150) + "...");
  
  try {
    const content = await generateWithGemini(prompt, 2048);
    console.log(`Generated ${itemType} content successfully!`);
    return content;
  } catch (error) {
    console.error(`Error generating ${itemType} content:`, error);
    return `# ${itemTitle}\n\nContent generation failed. Please try again.`;
  }
};
