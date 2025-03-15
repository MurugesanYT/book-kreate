
import { toast } from "sonner";
import { generateWithGemini } from "./geminiService";

// Function to generate a book title if not provided
export const generateBookTitle = async (description: string, type: string, category: string): Promise<string> => {
  try {
    console.log("Generating book title for:", { description, type, category });
    
    const prompt = `Generate a creative and engaging title for a ${type} book in the ${category} category with the following description: "${description}". The title should be catchy, relevant to the content, and not include any quotation marks. Return ONLY the title text, nothing else.`;
    
    // Increase max tokens to ensure we get a complete title
    const title = await generateWithGemini(prompt, 100);
    
    // Clean the title more thoroughly
    let cleanedTitle = title.trim()
      .replace(/["']/g, '') // Remove any quotes
      .replace(/^Title:?\s*/i, '') // Remove "Title:" prefix if present
      .replace(/^\d+\.\s*/, '') // Remove numbering if present
      .replace(/[\n\r]/g, ' ') // Replace newlines with spaces
      .trim();
    
    // If still empty or too short, generate a fallback
    if (!cleanedTitle || cleanedTitle.length < 3) {
      throw new Error("Generated title was too short or invalid");
    }
    
    console.log("Generated title:", cleanedTitle);
    toast.success("Title generated successfully!");
    
    return cleanedTitle;
  } catch (error) {
    console.error("Error generating book title:", error);
    
    // Try one more time with a simpler prompt
    try {
      const simplePrompt = `Create a short, catchy title for a ${type} book about: ${description}. Return ONLY the title text.`;
      const backupTitle = await generateWithGemini(simplePrompt, 50);
      const cleanedBackupTitle = backupTitle.trim().replace(/["']/g, '');
      
      if (cleanedBackupTitle && cleanedBackupTitle.length > 3) {
        console.log("Generated backup title:", cleanedBackupTitle);
        toast.success("Title generated successfully!");
        return cleanedBackupTitle;
      }
    } catch (backupError) {
      console.error("Backup title generation also failed:", backupError);
    }
    
    // Use a more descriptive fallback title based on the book type
    const fallbackTitle = type === "Children's Story" 
      ? "My Magical Story" 
      : type === "Novel" 
        ? "The Journey" 
        : type === "Fantasy" 
          ? "Realm of Wonder" 
          : type === "Science Fiction" 
            ? "Beyond the Stars" 
            : "My Book";
    
    toast.error("Failed to generate book title. Using generic title instead.");
    return fallbackTitle;
  }
};
