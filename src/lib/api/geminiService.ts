
import { toast } from "sonner";

// API key is stored here and not exposed in the frontend
const GEMINI_API_KEY = "AIzaSyDJ9lykUQGKZ5EB0P5GcsKjfjVbKlfoZVE";

// Base URL for the Gemini API
const API_BASE_URL = "https://generativelanguage.googleapis.com/v1/models";
const MODEL_NAME = "gemini-2.0-flash-001";

// Function to call the Gemini API with improved error handling and retries
export const generateWithGemini = async (prompt: string, maxTokens = 1024): Promise<string> => {
  const maxRetries = 3;
  let retries = 0;
  let lastError: Error | null = null;

  console.log("Starting API call to Gemini with prompt:", prompt.substring(0, 100) + "...");

  while (retries <= maxRetries) {
    try {
      console.log(`Generating content with Gemini (attempt ${retries + 1})`);
      
      // Add a small delay between retries to avoid rate limiting
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000 * retries));
      }
      
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
            safetySettings: [
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: { message: "Failed to parse error response" } }));
        const errorMessage = data.error?.message || `Failed to generate content: ${response.status}`;
        console.error(`API error (attempt ${retries + 1}):`, errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json().catch(() => {
        throw new Error("Failed to parse JSON response");
      });
      
      console.log("Received response from Gemini API", { 
        status: response.status,
        hasData: !!data,
        hasCandidates: data?.candidates?.length > 0
      });
      
      // Check if we have candidates in the response
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No candidates returned from API");
      }
      
      // Check if the response was blocked
      if (data.candidates[0].finishReason === "SAFETY") {
        throw new Error("Content was blocked for safety reasons");
      }
      
      // Extract the text content
      const textContent = data.candidates[0]?.content?.parts?.[0]?.text;
      
      if (!textContent) {
        throw new Error("Received invalid response format from API");
      }

      console.log("Successfully generated content with Gemini, length:", textContent.length);
      return textContent;
    } catch (error) {
      console.error(`Error generating content (attempt ${retries + 1}):`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      retries++;
      
      if (retries > maxRetries) {
        console.error("All retries failed for Gemini API call, giving up.");
        throw lastError;
      }
    }
  }
  
  // This should never happen due to the throw in the retry loop, but TypeScript needs it
  throw lastError || new Error("Unknown error generating content");
};
