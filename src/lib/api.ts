
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
