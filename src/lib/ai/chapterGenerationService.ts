
import { toast } from "sonner";
import { generateWithGemini } from "../api/geminiService";
import { BookData } from "../api/types";

// New, improved chapter generation service with style consistency and detailed prompting
export const generateChapterContent = async (
  book: BookData,
  chapterTitle: string,
  chapterDescription: string,
  previousChapters: { title: string; content: string }[] = [],
  stylePreferences: {
    tone?: 'formal' | 'casual' | 'poetic' | 'technical' | 'dramatic',
    pacing?: 'fast' | 'medium' | 'slow',
    perspective?: 'first-person' | 'third-person' | 'omniscient'
  } = {}
): Promise<string> => {
  try {
    console.log(`Generating chapter "${chapterTitle}" with enhanced parameters`);
    
    // Create context from previous chapters
    let previousContext = "";
    if (previousChapters.length > 0) {
      previousContext = "Here are excerpts from previous chapters to maintain story continuity:\n\n";
      previousChapters.forEach((chapter, index) => {
        // Focus on the most recent chapters
        if (index >= Math.max(0, previousChapters.length - 2)) {
          previousContext += `Chapter: ${chapter.title}\n`;
          previousContext += `${chapter.content?.substring(0, 800) || 'No content'}...\n\n`;
        }
      });
    }
    
    // Build the prompt with rich context
    let prompt = `Write a compelling chapter titled "${chapterTitle}" for a ${book.type || 'novel'} book titled "${book.title}" `;
    prompt += book.category ? `in the ${book.category} category. ` : ``;
    
    // Add style preferences if provided
    if (stylePreferences.tone) {
      prompt += `Use a ${stylePreferences.tone} tone. `;
    }
    
    if (stylePreferences.pacing) {
      prompt += `Maintain ${stylePreferences.pacing} pacing throughout. `;
    }
    
    if (stylePreferences.perspective) {
      prompt += `Write from a ${stylePreferences.perspective} perspective. `;
    }
    
    // Add chapter description/requirements
    if (chapterDescription) {
      prompt += `This chapter should: ${chapterDescription}. `;
    }
    
    prompt += `The book overall is about: ${book.description || 'A compelling story'}. `;
    
    // Add previous context if available
    if (previousContext) {
      prompt += `\n\nFor continuity, here are excerpts from previous chapters:\n${previousContext}`;
    }
    
    // If there's a character list available, use it for context
    if (book.characterList) {
      prompt += `\n\nHere are the main characters in the story:\n${(book.characterList as string).substring(0, 800)}...\n\n`;
    }
    
    prompt += `\nMake this chapter emotionally engaging and appropriate for the ${book.type || 'novel'} genre. Include rich descriptions, meaningful dialogue, and character development. Write at least 1000 words. Format the output as plain text with proper paragraphs. No markdown formatting.`;
    
    console.log('Using enhanced generation prompt:', prompt.substring(0, 200) + '...');
    
    // Generate content with increased token limit for higher quality
    const content = await generateWithGemini(prompt, 8000);
    console.log(`Generated enhanced chapter content successfully!`);
    toast.success(`${chapterTitle} content generated successfully!`);
    return content;
  } catch (error) {
    console.error(`Error generating chapter content:`, error);
    toast.error(`Failed to generate chapter content. Please try again.`);
    
    // Return basic fallback content
    return `${chapterTitle}\n\nThis chapter was intended to cover: ${chapterDescription || "various aspects of the book"}.\n\nPlease try regenerating this content.`;
  }
};

// Generate chapter outline before full content generation
export const generateChapterOutline = async (
  book: BookData,
  chapterTitle: string,
  chapterDescription: string
): Promise<string> => {
  try {
    console.log(`Generating outline for chapter "${chapterTitle}"`);
    
    const prompt = `Create a brief outline for a chapter titled "${chapterTitle}" in the book "${book.title}". 
    The chapter should cover: ${chapterDescription || "key story elements"}. 
    The book is about: ${book.description || "a compelling narrative"}.
    
    Format the outline as 5-7 bullet points that sketch the key scenes or moments that should appear in this chapter.
    Each bullet point should be 1-2 sentences only. Keep the outline concise but descriptive.`;
    
    const outline = await generateWithGemini(prompt, 2000);
    console.log(`Generated chapter outline successfully!`);
    return outline;
  } catch (error) {
    console.error(`Error generating chapter outline:`, error);
    return `• Introduction to the chapter theme\n• Key events as described\n• Character development\n• Plot advancement\n• Chapter conclusion`;
  }
};

// Analyze existing chapter content to suggest improvements
export const analyzeChapterContent = async (
  chapterTitle: string,
  chapterContent: string
): Promise<{
  strengths: string[];
  improvements: string[];
  suggestedEdits: string[];
}> => {
  try {
    console.log(`Analyzing chapter "${chapterTitle}"`);
    
    const prompt = `Analyze this chapter titled "${chapterTitle}" and provide constructive feedback.
    
    Chapter content: 
    ${chapterContent.substring(0, 3000)}...
    
    Provide three sections in your response:
    1. Strengths: List 3 positive aspects of the writing
    2. Areas for Improvement: List 3 aspects that could be enhanced
    3. Suggested Edits: Provide 3 specific suggestions for improving the text
    
    Format each point as a bullet point. Be specific, constructive, and actionable in your feedback.`;
    
    const analysis = await generateWithGemini(prompt, 2000);
    
    // Parse the result into the desired format
    const sections = analysis.split(/\d\.\s+/);
    
    const strengths = sections[1]?.split(/•|\*/).filter(s => s.trim()) || 
      ["Good narrative flow", "Engaging character interactions", "Vivid descriptions"];
    
    const improvements = sections[2]?.split(/•|\*/).filter(s => s.trim()) || 
      ["Could develop characters more deeply", "Pacing could be improved", "Add more sensory details"];
    
    const suggestedEdits = sections[3]?.split(/•|\*/).filter(s => s.trim()) || 
      ["Add more dialogue to break up long paragraphs", "Include character reactions", "Strengthen the ending"];
    
    return {
      strengths: strengths.map(s => s.trim()),
      improvements: improvements.map(s => s.trim()),
      suggestedEdits: suggestedEdits.map(s => s.trim())
    };
  } catch (error) {
    console.error(`Error analyzing chapter:`, error);
    return {
      strengths: ["Good narrative flow", "Engaging character interactions", "Vivid descriptions"],
      improvements: ["Could develop characters more deeply", "Pacing could be improved", "Add more sensory details"],
      suggestedEdits: ["Add more dialogue", "Include character reactions", "Strengthen the ending"]
    };
  }
};
