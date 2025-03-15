
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
