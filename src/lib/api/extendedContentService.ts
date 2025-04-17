
import { toast } from "sonner";
import { generateWithGemini } from "./geminiService";
import { BookData, BookItemType } from "./types";
import { allBookTemplates } from "../bookTemplates";

// Generate book content with previous content as context
export const generateBookChapterWithContext = async (
  book: BookData,
  chapterTitle: string,
  chapterDescription?: string,
  previousChapters: { title: string; content: string }[] = []
): Promise<string> => {
  try {
    console.log(`Generating chapter "${chapterTitle}" with context from ${previousChapters.length} previous chapters`);
    
    // Create context from previous chapters
    let previousContext = "";
    if (previousChapters.length > 0) {
      previousContext = "Here are the previous chapters to maintain story continuity:\n\n";
      previousChapters.forEach((chapter, index) => {
        // Limit the amount of context to avoid token limits
        if (index >= Math.max(0, previousChapters.length - 3)) {
          previousContext += `Chapter: ${chapter.title}\n`;
          previousContext += `${chapter.content.substring(0, 1000)}...\n\n`;
        }
      });
    }
    
    // Check if a template is being used
    const templateId = book.template as string | undefined;
    const template = templateId ? allBookTemplates.find(t => t.id === templateId) : undefined;
    
    // Build the prompt with context
    let prompt = `Write a detailed chapter titled "${chapterTitle}" for a ${book.type} book titled "${book.title}" in the ${book.category} category. 
    ${chapterDescription ? `This chapter should cover: ${chapterDescription}.` : ''} 
    The book overall is about: ${book.description}.`;
    
    // If using a template, find the matching chapter structure
    if (template) {
      const chapterStructureItem = template.structure.find(item => item.title === chapterTitle);
      if (chapterStructureItem) {
        prompt += ` According to the book structure, this chapter should focus on: ${chapterStructureItem.description}.`;
      }
    }
    
    // Add previous context if available
    if (previousContext) {
      prompt += `\n\nFor continuity, please consider the following content from previous chapters:\n${previousContext}`;
    }
    
    prompt += `\nMake it engaging, appropriate for the ${book.type} genre, and at least 500 words in length. Format the response as plain text with proper paragraphs. No markdown formatting.`;
    
    // Generate content with increased token limit to accommodate context
    const content = await generateWithGemini(prompt, 6000);
    console.log(`Generated chapter content successfully!`);
    toast.success(`${chapterTitle} content generated successfully!`);
    return content;
  } catch (error) {
    console.error(`Error generating chapter content:`, error);
    toast.error(`Failed to generate chapter content. Please try again.`);
    
    // Return basic fallback content
    return `${chapterTitle}\n\nThis chapter was meant to cover: ${chapterDescription || "various aspects of the book"}.\n\nPlease try regenerating this content.`;
  }
};

// Generate character list for the book
export const generateCharacterList = async (book: BookData): Promise<string> => {
  try {
    console.log(`Generating character list for "${book.title}"`);
    
    let prompt = `Create a detailed character list for a ${book.type} book titled "${book.title}" in the ${book.category} category. 
    The book is about: ${book.description}.`;
    
    if (book.chapters && book.chapters.length > 0) {
      // Add chapter titles to provide context
      prompt += `\n\nThe book contains the following chapters:`;
      book.chapters.forEach((chapter, index) => {
        if (chapter.title) {
          prompt += `\n- Chapter ${index + 1}: ${chapter.title}`;
        }
      });
      
      // Add excerpt from a couple of chapters for context
      if (book.chapters.length > 0 && book.chapters[0].content) {
        prompt += `\n\nHere is a sample from the first chapter to help identify characters:\n`;
        prompt += book.chapters[0].content.substring(0, 500) + "...";
      }
      
      // Add a later chapter excerpt if available
      if (book.chapters.length > 2 && book.chapters[2].content) {
        prompt += `\n\nHere is a sample from a later chapter:\n`;
        prompt += book.chapters[2].content.substring(0, 500) + "...";
      }
    }
    
    prompt += `\n\nFor each character, provide:
    1. Character name
    2. Role in the story (protagonist, antagonist, supporting character, etc.)
    3. Brief physical description
    4. Personality traits
    5. Background/history
    6. Motivations
    7. Relationships with other characters
    
    Format the list with clear sections for each character. Identify at least 5-8 key characters that appear or are mentioned in the book.`;
    
    const content = await generateWithGemini(prompt, 4000);
    console.log(`Generated character list successfully!`);
    toast.success(`Character list generated successfully!`);
    return content;
  } catch (error) {
    console.error(`Error generating character list:`, error);
    toast.error(`Failed to generate character list. Please try again.`);
    
    return `Character List\n\nUnable to generate a character list at this time. Please try again later.`;
  }
};

// Generate improved book description
export const generateImprovedDescription = async (book: BookData): Promise<string> => {
  try {
    console.log(`Generating improved description for "${book.title}"`);
    
    let prompt = `Create an engaging and marketable book description for a ${book.type} book titled "${book.title}" in the ${book.category} category. 
    The current description is: "${book.description}".
    
    If there are chapters available, here are some chapter titles to help:`;
    
    if (book.chapters && book.chapters.length > 0) {
      book.chapters.forEach((chapter, index) => {
        if (chapter.title) {
          prompt += `\n- Chapter ${index + 1}: ${chapter.title}`;
        }
      });
    }
    
    prompt += `\n\nThe improved description should:
    1. Hook the reader in the first sentence
    2. Introduce the main conflict or premise
    3. Hint at what makes this book unique
    4. Create intrigue without revealing too much
    5. Be approximately 150-200 words
    6. Match the tone and style of the ${book.type} genre
    7. Use vivid language and avoid clichés
    
    Please provide only the improved description text without any additional commentary.`;
    
    const content = await generateWithGemini(prompt, 2000);
    console.log(`Generated improved description successfully!`);
    toast.success(`Book description improved successfully!`);
    return content;
  } catch (error) {
    console.error(`Error generating improved description:`, error);
    toast.error(`Failed to improve description. Please try again.`);
    
    return book.description || `A captivating ${book.type} book in the ${book.category} category.`;
  }
};
