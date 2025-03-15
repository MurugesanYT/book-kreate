
import { toast } from "sonner";
import { generateWithGemini } from "./geminiService";
import { BookData, BookItemType } from "./types";

// Function to generate book content based on type
export const generateBookContent = async (
  book: BookData, 
  itemType: BookItemType, 
  itemTitle: string,
  itemDescription?: string
): Promise<string> => {
  let prompt = "";
  
  if (itemType === 'cover') {
    prompt = `Create a cover page for a ${book.type} book titled "${book.title}" in the ${book.category} category. This book is about: ${book.description}. Format the response using markdown with a prominent title and any subtitle or author information you can infer.`;
  } else if (itemType === 'chapter') {
    prompt = `Write a chapter titled "${itemTitle}" for a ${book.type} book titled "${book.title}" in the ${book.category} category. 
    ${itemDescription ? `This chapter is about: ${itemDescription}.` : ''} 
    The book overall is about: ${book.description}. 
    Make it engaging, appropriate for the target audience, and at least 500 words in length. Format the response using markdown with proper headings, paragraphs, and any dialogue formatting if needed.`;
  } else if (itemType === 'credits') {
    // Create a credits list prompt including the book's contributors
    const creditsList = book.credits && book.credits.length > 0
      ? book.credits
          .filter((credit: any) => credit.role && credit.name)
          .map((credit: any) => `${credit.role}: ${credit.name}`)
          .join(", ")
      : "Author: Anonymous";
    
    prompt = `Create a credits page for a ${book.type} book titled "${book.title}". Include the following contributors: ${creditsList}. Format it nicely with markdown, including appropriate headings and layout.`;
  }
  
  console.log(`Generating content for ${itemType} "${itemTitle}" with prompt:`, prompt.substring(0, 150) + "...");
  
  try {
    // Increase max tokens for better content generation
    const content = await generateWithGemini(prompt, 3000);
    console.log(`Generated ${itemType} content successfully!`);
    toast.success(`${itemTitle} content generated successfully!`);
    return content;
  } catch (error) {
    console.error(`Error generating ${itemType} content:`, error);
    toast.error(`Failed to generate ${itemType} content. Please try again.`);
    
    // Try one more time with a simpler prompt
    try {
      let simplePrompt = "";
      if (itemType === 'cover') {
        simplePrompt = `Create a simple cover page for "${book.title}".`;
      } else if (itemType === 'chapter') {
        simplePrompt = `Write a brief chapter titled "${itemTitle}" for the book "${book.title}".`;
      } else if (itemType === 'credits') {
        simplePrompt = `Create a simple credits page for "${book.title}".`;
      }
      
      const backupContent = await generateWithGemini(simplePrompt, 1000);
      return backupContent;
    } catch (backupError) {
      console.error(`Backup generation also failed:`, backupError);
      return `# ${itemTitle}\n\nContent generation failed. Please try again.\n\nThis may be due to a temporary issue with the AI service.`;
    }
  }
};
