
import { toast } from "sonner";
import { generateWithGemini } from "./geminiService";

// Fallback titles based on book type and category
const FALLBACK_TITLES: Record<string, Record<string, string[]>> = {
  "Fantasy": {
    "Urban Fantasy": ["City of Shadows", "Mystic Streets", "The Hidden Realm", "Urban Magic"],
    "High Fantasy": ["The Last Kingdom", "Realm of Dragons", "Crown of Destiny", "The Ancient Quest"],
    "Magical Realism": ["The Whispering Woods", "Enchanted Dreams", "Magic in the Mundane"]
  },
  "Children's Story": {
    "Bedtime Stories": ["The Sleepy Adventure", "Dreamland Tales", "Goodnight Magic"],
    "Educational": ["Learning with Friends", "The Curious Explorer", "Adventures in Learning"],
    "Animal Stories": ["The Brave Little Animal", "Forest Friends", "Woodland Adventures"]
  },
  "Novel": {
    "Contemporary": ["Life's Journey", "Modern Hearts", "The New Chapter"],
    "Historical": ["Tales from the Past", "Echoes of History", "The Time Traveler"]
  },
  "Science Fiction": {
    "Space Opera": ["Stars Beyond", "Galactic Journey", "The Final Frontier"],
    "Dystopian": ["The Last Hope", "Future Shadows", "Tomorrow's World"]
  }
};

// Function to get a random fallback title
const getFallbackTitle = (type: string, category: string): string => {
  const typeCategories = FALLBACK_TITLES[type];
  if (typeCategories && typeCategories[category]) {
    const titles = typeCategories[category];
    return titles[Math.floor(Math.random() * titles.length)];
  }
  
  // Generic fallbacks by type
  const genericFallbacks: Record<string, string> = {
    "Fantasy": "The Magical Journey",
    "Children's Story": "A Wonderful Tale",
    "Novel": "The Story Unfolds",
    "Science Fiction": "Beyond Tomorrow",
    "Mystery": "The Hidden Truth",
    "Horror": "Dark Secrets",
    "Romance": "Hearts Entwined",
    "Adventure": "The Great Quest"
  };
  
  return genericFallbacks[type] || "My Amazing Book";
};

// Function to generate a book title if not provided
export const generateBookTitle = async (description: string, type: string, category: string): Promise<string> => {
  try {
    console.log("Generating book title for:", { description, type, category });
    
    const prompt = `Generate a creative and engaging title for a ${type} book in the ${category} category with the following description: "${description}". The title should be catchy, relevant to the content, and not include any quotation marks. Return ONLY the title text, nothing else.`;
    
    // Try to generate with AI first
    const title = await generateWithGemini(prompt, 100);
    
    // Clean the title more thoroughly
    let cleanedTitle = title.trim()
      .replace(/["']/g, '') // Remove any quotes
      .replace(/^Title:?\s*/i, '') // Remove "Title:" prefix if present
      .replace(/^\d+\.\s*/, '') // Remove numbering if present
      .replace(/[\n\r]/g, ' ') // Replace newlines with spaces
      .trim();
    
    // If still empty or too short, use fallback
    if (!cleanedTitle || cleanedTitle.length < 3) {
      throw new Error("Generated title was too short or invalid");
    }
    
    console.log("Generated title:", cleanedTitle);
    toast.success("Title generated successfully!");
    
    return cleanedTitle;
  } catch (error) {
    console.error("Error generating book title:", error);
    
    // Use intelligent fallback title
    const fallbackTitle = getFallbackTitle(type, category);
    
    console.log("Using fallback title:", fallbackTitle);
    toast.success("Using a curated title for your book!");
    
    return fallbackTitle;
  }
};
