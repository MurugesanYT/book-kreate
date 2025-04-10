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
    const prompt = createEnhancedBeautificationPrompt(book, contentSample, options);
    
    // Generate beautification recommendations with Gemini
    console.log("Sending beautification prompt to Gemini...");
    // Use a larger token limit to get more detailed responses
    const geminiResponse = await generateWithGemini(prompt, 8192);
    
    // Parse the structured response from Gemini
    const parsedResponse = parseGeminiResponse(geminiResponse);
    
    // Post-process and enhance the AI response
    const enhancedResponse = enhanceBeautificationResponse(parsedResponse, book.category, options);
    
    console.log("Successfully generated beautification settings:", enhancedResponse);
    return enhancedResponse;
  } catch (error) {
    console.error("Failed to generate PDF beautification:", error);
    toast.error("Failed to generate custom beautification. Using default styling instead.");
    
    // Return enhanced default beautification settings if AI generation fails
    return getEnhancedDefaultBeautification(book.category, options.colorScheme);
  }
};

/**
 * Extract a representative sample of the book content for analysis
 */
const extractContentSample = (content: string): string => {
  // Get multiple samples from different parts of the book for better analysis
  const totalLength = content.length;
  const sampleSize = 1200; // Increased sample size for better context
  
  if (totalLength <= sampleSize * 3) {
    return content; // Return whole content if it's small enough
  }
  
  // Get beginning, middle and end samples plus an additional sample from the first quarter
  const beginning = content.substring(0, sampleSize);
  const firstQuarter = content.substring(Math.floor(totalLength * 0.25), Math.floor(totalLength * 0.25) + sampleSize);
  const middle = content.substring(Math.floor(totalLength / 2) - sampleSize / 2, Math.floor(totalLength / 2) + sampleSize / 2);
  const end = content.substring(totalLength - sampleSize);
  
  return `${beginning}\n\n[...]\n\n${firstQuarter}\n\n[...]\n\n${middle}\n\n[...]\n\n${end}`;
};

/**
 * Create a detailed prompt for Gemini to generate beautification settings with artistic guidance
 */
const createEnhancedBeautificationPrompt = (book: BookData, contentSample: string, options: PDFExportOptions): string => {
  return `
I need stunning, professional-grade PDF beautification recommendations for a book with the following details:

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

DESIGN MISSION:
You are a world-class book designer with decades of experience in creating stunning, award-winning book layouts. Your design should:

1. Have its own unique visual identity that perfectly matches the book's genre and content
2. Use typography that enhances readability while adding distinctive character
3. Incorporate subtle decorative elements that feel organic to the content
4. Create a cohesive visual system from cover to credits page
5. Utilize a sophisticated color palette with precise emotional resonance
6. Balance white space and content in a way that feels intentional and elegant

Your beautification should feel like it was hand-crafted specifically for this book by a design professional who spent weeks perfecting every detail.

Based on your expert analysis, provide exceptionally detailed beautification recommendations in the following JSON format:
{
  "cssStyles": "Detailed CSS styles that would work well for this content",
  "fontRecommendation": "A perfect font pairing recommendation (header/body) with fallbacks",
  "colorScheme": "A sophisticated color palette with precise hex codes for primary text, background, and accent colors",
  "decorativeElements": {
    "headerStyle": "Detailed description of a distinctive header design with specific elements",
    "footerStyle": "Detailed description of a complementary footer design", 
    "chapterDividers": ["Array of 3-4 unique and visually cohesive divider styles that match the book's aesthetic"],
    "dropCapStyle": "Detailed description of a drop cap style with specific styling that enhances the opening of chapters",
    "pageDecorations": ["Array of 2-3 subtle but distinctive decoration elements with specific placement and styling"],
    "backgroundTexture": "Description of a subtle background texture or pattern if appropriate to the content"
  },
  "layoutRecommendation": {
    "margins": "Precise margin recommendations based on design principles",
    "lineSpacing": "Exact line spacing recommendation with rationale for readability",
    "pageBreakStrategy": "Thoughtful strategy for page breaks that enhances reading experience"
  }
}

Your recommendations should have an unmistakable professional quality that would impress both publishers and readers. Focus on creating a unique visual identity that feels tailored specifically to this book.

Provide only the JSON response without additional text.
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
 * Enhance and enrich the AI-generated beautification result
 */
const enhanceBeautificationResponse = (
  response: BeautificationResult, 
  category: string,
  options: PDFExportOptions
): BeautificationResult => {
  // Ensure all required properties exist
  const enhanced = { ...response };
  
  // If color scheme is missing or invalid, add one based on category
  if (!enhanced.colorScheme || enhanced.colorScheme.split(',').length < 3) {
    const categoryColors = getCategoryColorScheme(category, options.colorScheme);
    enhanced.colorScheme = categoryColors;
  }
  
  // Ensure we have font recommendations
  if (!enhanced.fontRecommendation) {
    enhanced.fontRecommendation = getCategoryFontRecommendation(category);
  }
  
  // Ensure we have decorative elements
  if (!enhanced.decorativeElements) {
    enhanced.decorativeElements = getDefaultDecorativeElements(category);
  } else {
    // Fill in any missing decorative elements
    const defaultElements = getDefaultDecorativeElements(category);
    enhanced.decorativeElements = {
      ...defaultElements,
      ...enhanced.decorativeElements
    };
    
    // Ensure chapter dividers exist and are an array
    if (!enhanced.decorativeElements.chapterDividers || !Array.isArray(enhanced.decorativeElements.chapterDividers)) {
      enhanced.decorativeElements.chapterDividers = defaultElements.chapterDividers;
    }
    
    // Ensure page decorations exist and are an array
    if (!enhanced.decorativeElements.pageDecorations || !Array.isArray(enhanced.decorativeElements.pageDecorations)) {
      enhanced.decorativeElements.pageDecorations = defaultElements.pageDecorations || [];
    }
  }
  
  // Ensure we have layout recommendations
  if (!enhanced.layoutRecommendation) {
    enhanced.layoutRecommendation = {
      margins: "1 inch (2.54 cm) on all sides",
      lineSpacing: "1.5",
      pageBreakStrategy: "Start new chapters on new pages"
    };
  }
  
  return enhanced;
};

/**
 * Get color scheme based on book category and user preference
 */
const getCategoryColorScheme = (category: string, preferredScheme: string): string => {
  // If user selected a specific scheme other than default or custom, prioritize it
  if (preferredScheme !== 'default' && preferredScheme !== 'custom') {
    const schemes: Record<string, string> = {
      elegant: "#2D3748,#F7FAFC,#805AD5", // Dark slate, light background, purple accent
      modern: "#1A202C,#FFFFFF,#3182CE", // Near black, white, blue accent
      classic: "#333333,#F8F5E9,#8B4513", // Dark gray, cream, sienna
      vibrant: "#2D3748,#FFFFFF,#E53E3E", // Dark slate, white, red
      minimalist: "#1A202C,#F7FAFC,#718096", // Near black, light background, slate
      artistic: "#44337A,#FFF5F7,#B83280", // Deep purple, light pink, magenta
      scholarly: "#1A365D,#EDF2F7,#2C5282", // Navy, light blue/gray, blue
      romantic: "#702459,#FFF5F7,#B83280", // Burgundy, light pink, pink
      fantasy: "#44337A,#FEFCBF,#6B46C1" // Deep purple, light yellow, bright purple
    };
    
    return schemes[preferredScheme] || "#333333,#F8F8F8,#E0E0E0";
  }
  
  // Category-specific color schemes - enhanced with more sophisticated palettes
  const categorySchemes: Record<string, string> = {
    fiction: "#2C3E50,#F5F7FA,#9B59B6", // Midnight blue, off-white, amethyst
    "non-fiction": "#34495E,#FFFFFF,#3498DB", // Darker blue, white, lighter blue
    technical: "#1A202C,#F8FAFC,#00BFA5", // Dark gray, off-white, teal
    children: "#4A6572,#FFF9C4,#FF9800", // Slate blue, light yellow, orange
    poetry: "#5E3C58,#F9F5F9,#8E44AD", // Plum, off-white, purple
    romance: "#7D314C,#FFF0F3,#E84393", // Burgundy, light pink, bright pink
    mystery: "#263238,#ECEFF1,#607D8B", // Dark blue-gray, light gray, blue-gray
    "sci-fi": "#0B3954,#E9F5F9,#00BCD4", // Dark blue, light blue, cyan
    fantasy: "#493657,#FFF8E1,#FFB900", // Dark purple, cream, gold
    horror: "#1C1C1C,#F5F5F5,#B71C1C", // Nearly black, off-white, dark red
    thriller: "#252627,#F8F9FA,#FF5252", // Almost black, off-white, bright red
    historical: "#3E2723,#F5F5DC,#A1887F", // Dark brown, beige, light brown
    biography: "#2D4B73,#F8F9FA,#2E86DE", // Navy, off-white, bright blue
    academic: "#002147,#F5F5F5,#3F72AF", // Oxford blue, off-white, royal blue
    adventure: "#155263,#F8F9F9,#FF9A3C", // Teal, off-white, orange
    comedy: "#6C4A4A,#FFFFF0,#E7B10A", // Brown, ivory, mustard
    drama: "#2C3639,#F5F2E7,#A27B5C", // Dark gray, light beige, copper
    "self-help": "#282F44,#FFFFFF,#4D9DE0", // Dark navy, white, sky blue
    travel: "#2C3333,#E7F6F2,#2E8B57", // Dark gray, mint, sea green
    cooking: "#3A4750,#FFFBF5,#D4634B", // Dark slate, cream, terracotta
  };
  
  return categorySchemes[category.toLowerCase()] || "#333333,#F8F8F8,#E0E0E0";
};

/**
 * Get font recommendations based on book category - enhanced with more sophisticated pairings
 */
const getCategoryFontRecommendation = (category: string): string => {
  const categoryFonts: Record<string, string> = {
    fiction: "Merriweather, Georgia, serif", // Elegant serif
    "non-fiction": "Nunito, Helvetica, sans-serif", // Clean sans-serif
    technical: "Roboto Mono, Courier, monospace", // Monospaced for code
    children: "Quicksand, Arial, sans-serif", // Friendly rounded sans
    poetry: "Cormorant Garamond, Baskerville, serif", // Delicate serif
    romance: "Playfair Display, Georgia, serif", // Romantic serif
    mystery: "Crimson Pro, Times New Roman, serif", // Classic serif
    "sci-fi": "Titillium Web, Arial, sans-serif", // Modern, clean sans
    fantasy: "Spectral, Georgia, serif", // Magical serif
    horror: "Libre Baskerville, Georgia, serif", // Spooky serif
    thriller: "Source Sans Pro, Helvetica, sans-serif", // Efficient sans
    historical: "EB Garamond, Palatino, serif", // Historical serif
    biography: "Lora, Georgia, serif", // Readable serif
    academic: "PT Serif, Times New Roman, serif", // Scholarly serif
    adventure: "Montserrat, Arial, sans-serif", // Bold sans
    comedy: "Comfortaa, Verdana, sans-serif", // Playful rounded
    drama: "Bitter, Georgia, serif", // Dramatic serif
    "self-help": "Open Sans, Arial, sans-serif", // Approachable sans
    travel: "Work Sans, Helvetica, sans-serif", // Modern sans
    cooking: "Cardo, Palatino, serif", // Elegant cooking serif
  };
  
  return categoryFonts[category.toLowerCase()] || "Georgia, serif";
};

/**
 * Get enhanced default decorative elements based on book category
 */
const getDefaultDecorativeElements = (category: string): BeautificationResult['decorativeElements'] => {
  const elements: Record<string, BeautificationResult['decorativeElements']> = {
    fiction: {
      headerStyle: "Title in small caps with a thin gradient underline that fades from primary to accent color",
      footerStyle: "Page number enclosed in a subtle ornamental frame with thin flourish lines extending horizontally",
      chapterDividers: [
        "A graceful swirl pattern that begins thin on the left, thickens in the middle, and tapers to the right",
        "Three small diamond shapes arranged horizontally with thin connecting lines between them",
        "A gradient line that transitions from primary to accent color and fades at both ends",
        "A small ornamental motif inspired by classical literature with subtle floral elements"
      ],
      dropCapStyle: "A large serif initial letter spanning 3 lines with a subtle shadow and thin decorative border",
      pageDecorations: [
        "Subtle corner flourishes that appear on the first page of each chapter",
        "Small decorative symbols that relate to the book's themes at the end of chapters",
        "Delicate rule lines above header and below footer"
      ],
      backgroundTexture: "Very subtle antique parchment texture that adds warmth without reducing readability"
    },
    
    "non-fiction": {
      headerStyle: "Clean sans-serif section name and chapter number with a thin horizontal accent line",
      footerStyle: "Page number with book title in small caps, separated by a minimal dot symbol",
      chapterDividers: [
        "A precise horizontal line with a small square at center in the accent color",
        "A sleek gradient bar that transitions smoothly from primary to accent color",
        "A minimal triple-dot divider aligned centrally with even spacing",
        "A geometric pattern of interconnected shapes that suggests organization and structure"
      ],
      dropCapStyle: "A modern sans-serif initial letter in accent color with increased weight",
      pageDecorations: [
        "Subtle margin indicators for key sections",
        "Small geometric shapes as bullet points",
        "Clean margin space for reader notes"
      ],
      backgroundTexture: "Crisp white with an extremely subtle grid pattern that aids eye tracking"
    },
    
    poetry: {
      headerStyle: "Elegant italic title with delicate calligraphic flourishes",
      footerStyle: "Simple centered page number with small botanical ornament",
      chapterDividers: [
        "A single elegant curved line with small flourish at one end",
        "A small symbolic representation related to the poem's theme",
        "A delicate nature-inspired divider like a vine or branch",
        "A minimalist symbol that captures the emotional essence of the collection"
      ],
      dropCapStyle: "A flowing calligraphic initial letter with artistic flourishes in a complementary color",
      pageDecorations: [
        "Subtle botanical or nature illustrations in margins",
        "Delicate line work framing special poems",
        "Gentle watercolor-style washes in very light tints for poem backgrounds"
      ],
      backgroundTexture: "Textured paper effect with subtle warmth that creates a handcrafted feel"
    },
    
    fantasy: {
      headerStyle: "Title in an elegant serif with small mystical symbol as chapter indicator",
      footerStyle: "Page number inside a subtle circular rune or magical emblem",
      chapterDividers: [
        "A symmetrical pattern featuring stylized vines or branches with small star accents",
        "An intricate line of mythical symbols that forms a continuous pattern",
        "A gradient fade with subtle magical sparkle effect at center",
        "A decorative border inspired by ancient manuscripts with mystical runes"
      ],
      dropCapStyle: "An ornate initial letter with illuminated manuscript styling and gold-like accent colors",
      pageDecorations: [
        "Corner elements resembling mythical creatures or symbols",
        "Subtle magical motifs that appear at chapter beginnings",
        "Border elements that suggest a magical realm or ancient text"
      ],
      backgroundTexture: "Very subtle parchment or aged paper texture with barely perceptible magical symbols"
    },
    
    mystery: {
      headerStyle: "Title in a classic serif with a thin shadow effect and small magnifying glass icon",
      footerStyle: "Page number partially obscured by subtle fog or shadow effect",
      chapterDividers: [
        "A series of fading dots that suggest a trail of clues",
        "A broken line pattern that creates a sense of discontinuity",
        "A thin line with small question mark or key symbol at the end",
        "A pattern that resembles partial fingerprints or cryptic symbols"
      ],
      dropCapStyle: "A serif initial letter with a subtle shadow that creates depth and mystery",
      pageDecorations: [
        "Subtle corner elements that resemble fragments of a map or clue",
        "Small investigative symbols (magnifying glass, footprints) as section breaks",
        "Faded text effects that suggest hidden messages between chapters"
      ],
      backgroundTexture: "Very subtle paper texture with occasional faint fingerprint or ink blot effects"
    },
    
    romance: {
      headerStyle: "Title in an elegant script with subtle heart or floral motif accent",
      footerStyle: "Page number within a delicate ornamental frame with curved edges",
      chapterDividers: [
        "Intertwined floral pattern with subtle color gradient effects",
        "Delicate heart-inspired design with flowing lines extending outward",
        "A pattern of small roses or flower petals arranged in a graceful curve",
        "Flowing script-like lines that suggest handwritten love letters"
      ],
      dropCapStyle: "A flowing script initial letter with small heart or floral embellishments",
      pageDecorations: [
        "Delicate corner flourishes with subtle floral or heart motifs",
        "Small romantic symbols at the end of significant passages",
        "Subtle rose or floral border elements that frame emotional scenes"
      ],
      backgroundTexture: "Very subtle textured paper with occasionally visible pressed flower effect"
    }
  };
  
  // For categories we don't have specific elements for, use fiction as default
  return elements[category.toLowerCase()] || elements.fiction;
};

/**
 * Create enhanced default beautification settings if AI generation fails
 */
const getEnhancedDefaultBeautification = (category: string, colorScheme: string): BeautificationResult => {
  return {
    cssStyles: ".book-container { font-family: Georgia, serif; line-height: 1.6; color: #333; }",
    fontRecommendation: getCategoryFontRecommendation(category),
    colorScheme: getCategoryColorScheme(category, colorScheme),
    decorativeElements: getDefaultDecorativeElements(category),
    layoutRecommendation: {
      margins: category.toLowerCase() === 'poetry' ? "1.5 inch (3.81 cm) side margins for emphasis" : "1 inch (2.54 cm) margins on all sides",
      lineSpacing: category.toLowerCase() === 'academic' ? "1.8 for improved readability of complex content" : "1.5 for balanced readability and aesthetics",
      pageBreakStrategy: "Start new chapters on right-facing pages with decorative elements"
    }
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
