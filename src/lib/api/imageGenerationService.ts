
import { toast } from "sonner";

const GEMINI_API_KEY = "AIzaSyDJ9lykUQGKZ5EB0P5GcsKjfjVbKlfoZVE";
const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL_NAME = "gemini-2.0-flash-preview-image-generation";

export interface ImageGenerationOptions {
  bookTitle: string;
  bookDescription: string;
  characterList?: string[];
  bookType: string;
  category: string;
  imageType: 'cover' | 'credit' | 'tableOfContents' | 'characterList';
}

export const generateBookImage = async (options: ImageGenerationOptions): Promise<string | null> => {
  try {
    console.log("Generating image for:", options.imageType, "of book:", options.bookTitle);
    
    let prompt = "";
    
    switch (options.imageType) {
      case 'cover':
        prompt = `Create a professional book cover for "${options.bookTitle}", a ${options.bookType} in the ${options.category} genre. ${options.bookDescription}. Make it visually appealing with modern typography and relevant imagery that captures the essence of the story.`;
        break;
      case 'credit':
        prompt = `Create an elegant credits page design for the book "${options.bookTitle}". Include space for author information, publisher details, and copyright information. Use a clean, professional layout with subtle decorative elements.`;
        break;
      case 'tableOfContents':
        prompt = `Design a beautiful table of contents page for "${options.bookTitle}". Create an organized, readable layout with elegant typography and subtle decorative elements that match the ${options.category} genre theme.`;
        break;
      case 'characterList':
        prompt = `Create a character reference page for "${options.bookTitle}" featuring ${options.characterList?.length || 0} characters. Design it as an illustrated character guide with space for character descriptions and portraits, matching the ${options.category} style.`;
        break;
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
              role: "user",
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
            responseMimeType: "text/plain",
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Image generation failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType;
          return `data:${mimeType};base64,${base64Data}`;
        }
      }
    }

    throw new Error("No image data received from API");
  } catch (error) {
    console.error("Error generating image:", error);
    toast.error(`Failed to generate ${options.imageType} image`);
    return null;
  }
};

export const generateAllBookImages = async (options: Omit<ImageGenerationOptions, 'imageType'>) => {
  const images = {
    cover: null as string | null,
    credit: null as string | null,
    tableOfContents: null as string | null,
    characterList: null as string | null,
  };

  try {
    // Generate all images
    const [cover, credit, tableOfContents, characterList] = await Promise.all([
      generateBookImage({ ...options, imageType: 'cover' }),
      generateBookImage({ ...options, imageType: 'credit' }),
      generateBookImage({ ...options, imageType: 'tableOfContents' }),
      generateBookImage({ ...options, imageType: 'characterList' }),
    ]);

    images.cover = cover;
    images.credit = credit;
    images.tableOfContents = tableOfContents;
    images.characterList = characterList;

    return images;
  } catch (error) {
    console.error("Error generating book images:", error);
    toast.error("Failed to generate some book images");
    return images;
  }
};
