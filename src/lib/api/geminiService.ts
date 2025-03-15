
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
