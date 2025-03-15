
import { toast } from "sonner";
import { generateWithGemini } from "./geminiService";

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
