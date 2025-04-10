import { generateWithGemini } from '@/lib/api/geminiService';
import { PDFExportOptions, BookData } from '@/lib/api/types';
import { toast } from 'sonner';

/**
 * Service for generating AI-powered PDF beautification instructions based on book content
 */
export interface BeautificationResult {
  cssStyles: string;
  fontRecommendation: string;
  colorScheme: string;
  decorativeElements: {
    headerStyle?: string;
    footerStyle?: string;
    chapterDividers?: string[];
    dropCapStyle?: string;
    pageDecorations?: string[];
    backgroundTexture?: string;
  };
  layoutRecommendation: {
    margins: string;
    lineSpacing: string;
    pageBreakStrategy: string;
  };
}

/**
 * Generate custom PDF beautification settings based on book content and metadata
 */
export const generateBookBeautification = async (
  book: BookData,
  bookContent: string,
  options: PDFExportOptions
): Promise<BeautificationResult> => {
  try {
    console.log("Generating AI-powered PDF beautification for book:", book.title);
    
    // Extract a sample of the book content to analyze (to keep prompt size manageable)
    const contentSample = extractContentSample(bookContent);
    
    // Create a prompt for Gemini that explains what we need
    const prompt = createBeautificationPrompt(book, contentSample, options);
    
    // Generate beautification recommendations with Gemini
    console.log("Sending beautification prompt to Gemini...");
    const geminiResponse = await generateWithGemini(prompt, 2048);
    
    // Parse the structured response from Gemini
    const parsedResponse = parseGeminiResponse(geminiResponse);
    
    console.log("Successfully generated beautification settings:", parsedResponse);
    return parsedResponse;
  } catch (error) {
    console.error("Failed to generate PDF beautification:", error);
    toast.error("Failed to generate custom beautification. Using default styling instead.");
    
    // Return default beautification settings if AI generation fails
    return getDefaultBeautification(book.category, options.colorScheme);
  }
};

/**
 * Extract a representative sample of the book content for analysis
 */
const extractContentSample = (content: string): string => {
  // Get multiple samples from different parts of the book
  const totalLength = content.length;
  const sampleSize = 500; // Characters per sample
  
  if (totalLength <= sampleSize * 3) {
    return content; // Return whole content if it's small enough
  }
  
  // Get beginning, middle and end samples
  const beginning = content.substring(0, sampleSize);
  const middle = content.substring(Math.floor(totalLength / 2) - sampleSize / 2, Math.floor(totalLength / 2) + sampleSize / 2);
  const end = content.substring(totalLength - sampleSize);
  
  return `${beginning}\n\n[...]\n\n${middle}\n\n[...]\n\n${end}`;
};

/**
 * Create a detailed prompt for Gemini to generate beautification settings
 */
const createBeautificationPrompt = (book: BookData, contentSample: string, options: PDFExportOptions): string => {
  return `
I need PDF beautification recommendations for a book with the following details:

BOOK METADATA:
- Title: "${book.title}"
- Category: "${book.category}"
- Type: "${book.type}"
- Description: "${book.description}"

USER PREFERENCES:
- Color scheme preference: "${options.colorScheme}"
- Page size: "${options.pageSize}"
- Orientation: "${options.orientation}"
- Font family: "${options.fontFamily}"
- Text alignment: "${options.textAlignment}"
- Include decorative elements: ${options.decorativeElements}
- Include chapter dividers: ${options.chapterDividers}
- Include drop caps: ${options.dropCaps}
- Line spacing: "${options.lineSpacing}"

CONTENT SAMPLE:
"""
${contentSample}
"""

Based on this information, provide beautification recommendations in the following JSON format:
{
  "cssStyles": "CSS styles that would work well for this content",
  "fontRecommendation": "Font family or combinations that complement the content",
  "colorScheme": "Color palette recommendation (provide hex codes for primary, secondary, accent colors)",
  "decorativeElements": {
    "headerStyle": "Description of header style",
    "footerStyle": "Description of footer style", 
    "chapterDividers": ["Array of 2-3 divider styles descriptions"],
    "dropCapStyle": "Description of drop cap style",
    "pageDecorations": ["Array of 2-3 subtle decoration elements"],
    "backgroundTexture": "Description of subtle background texture if appropriate"
  },
  "layoutRecommendation": {
    "margins": "Margin recommendations",
    "lineSpacing": "Line spacing recommendation",
    "pageBreakStrategy": "Strategy for page breaks"
  }
}

The recommendations should be appropriate for the book category (${book.category}) and match the tone and style of the content. Provide only the JSON response without additional text.
`;
};

/**
 * Parse the Gemini response into structured beautification settings
 */
const parseGeminiResponse = (response: string): BeautificationResult => {
  try {
    // Extract the JSON part from the response (in case Gemini added extra text)
    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}') + 1;
    
    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      const jsonStr = response.substring(jsonStart, jsonEnd);
      return JSON.parse(jsonStr);
    }
    
    throw new Error("Could not extract valid JSON from the response");
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    console.log("Raw response:", response);
    throw new Error("Failed to parse AI beautification response");
  }
};

/**
 * Get default beautification settings based on book category
 */
const getDefaultBeautification = (
  category: string,
  colorScheme: string = 'default'
): BeautificationResult => {
  // Map category to appropriate default styles
  const defaults: {[key: string]: Partial<BeautificationResult>} = {
    fiction: {
      fontRecommendation: "Georgia, serif",
      colorScheme: "#333333,#f8f8f8,#e0e0e0",
      decorativeElements: {
        chapterDividers: ["Simple centered asterisk (***)", "Thin horizontal line"],
        dropCapStyle: "Simple larger first character, 3 lines tall",
      },
      layoutRecommendation: {
        margins: "1 inch (2.54 cm) on all sides",
        lineSpacing: "1.5",
        pageBreakStrategy: "Start new chapters on odd-numbered pages",
      },
    },
    
    "non-fiction": {
      fontRecommendation: "Palatino, serif",
      colorScheme: "#222222,#f5f5f5,#dddddd",
      decorativeElements: {
        chapterDividers: ["Numbered chapter headings with underline"],
        dropCapStyle: "Clean square drop cap, 2 lines tall",
      },
      layoutRecommendation: {
        margins: "1.25 inches (3.2 cm) on left and right, 1 inch (2.54 cm) on top and bottom",
        lineSpacing: "1.15",
        pageBreakStrategy: "Include section breaks with visual indicator",
      },
    },
    
    technical: {
      fontRecommendation: "Source Sans Pro, sans-serif",
      colorScheme: "#1a1a1a,#ffffff,#f0f0f0",
      decorativeElements: {
        chapterDividers: ["Simple numbered sections"],
        dropCapStyle: "No drop caps",
      },
      layoutRecommendation: {
        margins: "1 inch (2.54 cm) on all sides",
        lineSpacing: "1.2",
        pageBreakStrategy: "Keep code blocks intact, avoid breaking in middle",
      },
    },
    
    children: {
      fontRecommendation: "Comic Sans MS, cursive",
      colorScheme: "#333333,#fffef0,#ffd700",
      decorativeElements: {
        chapterDividers: ["Playful illustrated dividers", "Star or small illustration"],
        dropCapStyle: "Rounded colorful drop cap, 3 lines tall",
      },
      layoutRecommendation: {
        margins: "0.75 inches (1.9 cm) on all sides",
        lineSpacing: "1.8",
        pageBreakStrategy: "Keep illustrations with relevant text",
      },
    },
    
    poetry: {
      fontRecommendation: "Baskerville, serif",
      colorScheme: "#2d2d2d,#fbfbfb,#e6e6e6",
      decorativeElements: {
        chapterDividers: ["Simple centered flower or leaf ornament"],
        dropCapStyle: "Elegant italic drop cap, 2 lines tall",
      },
      layoutRecommendation: {
        margins: "1.5 inches (3.8 cm) on left and right, 1 inch (2.54 cm) on top and bottom",
        lineSpacing: "1.5",
        pageBreakStrategy: "Try to keep poems on single pages where possible",
      },
    },
  };
  
  // Use category defaults or fiction defaults if category not found
  const categoryDefaults = defaults[category.toLowerCase()] || defaults.fiction;
  
  // Merge with base defaults
  return {
    cssStyles: `body { font-family: ${categoryDefaults.fontRecommendation || "Georgia, serif"}; }`,
    fontRecommendation: categoryDefaults.fontRecommendation || "Georgia, serif",
    colorScheme: categoryDefaults.colorScheme || "#333333,#f8f8f8,#e0e0e0",
    decorativeElements: categoryDefaults.decorativeElements || {
      headerStyle: "Simple page number and title",
      footerStyle: "Simple page number",
      chapterDividers: ["Simple horizontal line"],
      dropCapStyle: "Simple larger first character, 2 lines tall",
      pageDecorations: [],
      backgroundTexture: "None",
    },
    layoutRecommendation: categoryDefaults.layoutRecommendation || {
      margins: "1 inch (2.54 cm) on all sides",
      lineSpacing: "1.5",
      pageBreakStrategy: "Start new chapters on new pages",
    },
  };
};

/**
 * Apply the beautification settings to a document or element
 * This is a placeholder function that would be implemented when integrating with PDF renderer
 */
export const applyBeautificationToDocument = (
  doc: any,
  beautification: BeautificationResult,
  options: PDFExportOptions
): void => {
  // This function would be implemented to apply the beautification settings
  // to the jsPDF document or other rendering target
  console.log("Applying beautification settings to document", { beautification, options });
  
  // The implementation would depend on the specific PDF library being used
}
