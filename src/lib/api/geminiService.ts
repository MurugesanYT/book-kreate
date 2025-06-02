
import { toast } from "sonner";

// API key is stored here and not exposed in the frontend
const GEMINI_API_KEY = "AIzaSyDJ9lykUQGKZ5EB0P5GcsKjfjVbKlfoZVE";

// Base URL for the Gemini API
const API_BASE_URL = "https://generativelanguage.googleapis.com/v1/models";
const MODEL_NAME = "gemini-2.0-flash-001";

// Function to call the Gemini API with improved error handling and retries
export const generateWithGemini = async (prompt: string, maxTokens = 1024): Promise<string> => {
  const maxRetries = 2; // Reduced retries to avoid long waits
  let retries = 0;
  let lastError: Error | null = null;

  console.log("Starting API call to Gemini with prompt:", prompt.substring(0, 100) + "...");

  while (retries <= maxRetries) {
    try {
      console.log(`Generating content with Gemini (attempt ${retries + 1})`);
      
      // Add exponential backoff delay between retries
      if (retries > 0) {
        const delay = Math.min(1000 * Math.pow(2, retries), 5000); // Max 5 seconds
        console.log(`Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
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
        const errorMessage = data.error?.message || `API returned ${response.status}`;
        
        // Handle specific error codes
        if (response.status === 503) {
          console.log(`Gemini API overloaded (attempt ${retries + 1}), will retry...`);
          throw new Error("The AI service is temporarily overloaded. Retrying...");
        } else if (response.status === 429) {
          console.log(`Rate limited (attempt ${retries + 1}), will retry...`);
          throw new Error("Rate limit exceeded. Retrying...");
        } else {
          console.error(`API error (attempt ${retries + 1}):`, errorMessage);
          throw new Error(errorMessage);
        }
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
        throw new Error("No response generated from AI");
      }
      
      // Check if the response was blocked
      if (data.candidates[0].finishReason === "SAFETY") {
        throw new Error("Content was blocked for safety reasons. Please try a different prompt.");
      }
      
      // Extract the text content
      const textContent = data.candidates[0]?.content?.parts?.[0]?.text;
      
      if (!textContent) {
        throw new Error("No text content in AI response");
      }

      console.log("Successfully generated content with Gemini, length:", textContent.length);
      return textContent;
    } catch (error) {
      console.error(`Error generating content (attempt ${retries + 1}):`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      retries++;
      
      if (retries > maxRetries) {
        console.error("All retries failed for Gemini API call, giving up.");
        
        // Show user-friendly error message based on the type of error
        if (lastError.message.includes("overloaded") || lastError.message.includes("503")) {
          toast.error("AI service is temporarily overloaded. Using fallback approach.");
        } else if (lastError.message.includes("rate limit") || lastError.message.includes("429")) {
          toast.error("Too many requests. Please wait a moment and try again.");
        } else {
          toast.error("AI generation failed. Using fallback content.");
        }
        
        throw lastError;
      }
    }
  }
  
  // This should never happen due to the throw in the retry loop, but TypeScript needs it
  throw lastError || new Error("Unknown error generating content");
};
