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
You are a world-class book designer tasked with creating a distinctive, memorable, and cohesive visual identity for this book that will wow readers and showcase the content in its best light. Your design should:

1. Perfectly capture the mood, tone, and essence of the content - if it's a thriller, create tension; if romance, evoke emotion; if technical, ensure clarity
2. Feel professionally crafted and worthy of a bestseller
3. Prioritize exceptional readability while adding sophisticated visual appeal
4. Include subtle but distinctive design elements that complement the content's themes
5. Feel timeless yet contemporary, avoiding trendy design that will quickly look dated

Be extraordinarily specific and detailed with your recommendations. For example, instead of "use decorative dividers," specify "employ elegant botanical line drawings of cypress trees in a rich sepia tone that echoes the Mediterranean setting of the narrative."

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

Your recommendations should reflect a deep understanding of the book's category (${book.category}) and demonstrate professional book design expertise. Provide only the JSON response without additional text.
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
      elegant: "#2D3748,#F7FAFC,#805AD5",
      modern: "#1A202C,#FFFFFF,#3182CE",
      classic: "#333333,#F8F5E9,#8B4513",
      vibrant: "#2D3748,#FFFFFF,#E53E3E",
      minimalist: "#1A202C,#F7FAFC,#718096",
      artistic: "#44337A,#FFF5F7,#B83280",
      scholarly: "#1A365D,#EDF2F7,#2C5282",
      romantic: "#702459,#FFF5F7,#B83280",
      fantasy: "#44337A,#FEFCBF,#6B46C1"
    };
    
    return schemes[preferredScheme] || "#333333,#F8F8F8,#E0E0E0";
  }
  
  // Category-specific color schemes
  const categorySchemes: Record<string, string> = {
    fiction: "#333333,#F8F8F8,#6B46C1", // Purple accent for fiction
    "non-fiction": "#2D3748,#F7FAFC,#3182CE", // Blue accent for non-fiction
    technical: "#1A202C,#FFFFFF,#38B2AC", // Teal accent for technical
    children: "#2D3748,#FFFAF0,#F6AD55", // Orange accent for children's books
    poetry: "#553C9A,#FAF5FF,#805AD5", // Lavender for poetry
    romance: "#702459,#FFF5F7,#D53F8C", // Pink for romance
    mystery: "#1A365D,#EDF2F7,#2B6CB0", // Dark blue for mystery
    "sci-fi": "#1A202C,#F0FFF4,#38A169", // Green for sci-fi
    fantasy: "#44337A,#FFFBEB,#D69E2E", // Gold accent for fantasy
    horror: "#1A202C,#F7FAFC,#E53E3E", // Red accent for horror
    thriller: "#2A4365,#F7FAFC,#DD6B20", // Orange accent for thriller
    historical: "#5F370E,#FFFAF0,#B7791F", // Brown accent for historical
    biography: "#2D3748,#F7FAFC,#4299E1", // Blue accent for biography
    academic: "#1A365D,#EDF2F7,#2C5282", // Navy blue for academic
  };
  
  return categorySchemes[category.toLowerCase()] || "#333333,#F8F8F8,#E0E0E0";
};

/**
 * Get font recommendations based on book category
 */
const getCategoryFontRecommendation = (category: string): string => {
  const categoryFonts: Record<string, string> = {
    fiction: "Crimson Text, Georgia, serif",
    "non-fiction": "Source Sans Pro, Helvetica, sans-serif",
    technical: "IBM Plex Sans, Arial, sans-serif",
    children: "Comic Sans MS, Verdana, sans-serif",
    poetry: "Baskerville, Garamond, serif",
    romance: "Libre Baskerville, Georgia, serif",
    mystery: "Lora, Times New Roman, serif",
    "sci-fi": "Space Mono, Courier New, monospace",
    fantasy: "Cinzel, Georgia, serif",
    horror: "Playfair Display, Times New Roman, serif",
    thriller: "Roboto Slab, Georgia, serif",
    historical: "Libre Caslon Text, Georgia, serif",
    biography: "Merriweather, Georgia, serif",
    academic: "Roboto, Arial, sans-serif",
  };
  
  return categoryFonts[category.toLowerCase()] || "Georgia, serif";
};

/**
 * Get enhanced default decorative elements based on book category
 */
const getDefaultDecorativeElements = (category: string): BeautificationResult['decorativeElements'] => {
  const elements: Record<string, BeautificationResult['decorativeElements']> = {
    fiction: {
      headerStyle: "Book title in small caps with an elegant thin underline in accent color",
      footerStyle: "Page number centered within a delicate ornamental frame with small flourishes on either side",
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
    
    technical: {
      headerStyle: "Monospaced chapter name with a technical icon relevant to the subject matter",
      footerStyle: "Page number with section reference in a clean information hierarchy",
      chapterDividers: [
        "A pattern inspired by code syntax with brackets, dots and slashes",
        "A clean horizontal line with chapter number in a circular node",
        "A minimal pattern suggesting binary or hexadecimal sequences",
        "A schematic-inspired divider with connected nodes"
      ],
      dropCapStyle: "A monospaced initial letter in a light rectangular background with rounded corners",
      pageDecorations: [
        "Code snippet styling with syntax highlighting for code blocks",
        "Margin indicators for notes, warnings, and tips",
        "Small diagrams that complement the technical content"
      ],
      backgroundTexture: "Subtle graph paper or blueprint texture in very light blue"
    },
    
    children: {
      headerStyle: "Playful rounded font with small themed illustration relevant to the chapter",
      footerStyle: "Page number inside a fun shape like a star, cloud, or animal footprint",
      chapterDividers: [
        "A row of small playful icons like stars, hearts, or animals relevant to the story",
        "A colorful wavy line with gradient colors from the book's palette",
        "Character illustration or silhouette from the story",
        "Playful dashed line with small themed symbols at intervals"
      ],
      dropCapStyle: "A colorful bubble letter with playful 3D effect or character interaction",
      pageDecorations: [
        "Colorful illustrated borders on chapter opening pages",
        "Small spot illustrations in margins that relate to nearby text",
        "Character expressions or reactions in margins at emotional moments",
        "Playful corner elements that create a framing effect"
      ],
      backgroundTexture: "Very subtle polka dots, stars, or themed pattern that relates to the story"
    },
    
    poetry: {
      headerStyle: "Elegant italic title with delicate flourishes",
      footerStyle: "Simple centered page number with small calligraphic ornament",
      chapterDividers: [
        "A single elegant curved line with small flourish at one end",
        "A small symbolic representation related to the poem's theme",
        "A delicate nature-inspired divider like a vine or branch",
        "A minimalist symbol that captures the emotional essence of the collection"
      ],
      dropCapStyle: "A flowing calligraphic initial letter with artistic flourishes",
      pageDecorations: [
        "Subtle botanical or nature illustrations in margins",
        "Delicate line work framing special poems",
        "Gentle watercolor-style washes in very light tints",
        "Small symbolic elements that echo the poem's imagery"
      ],
      backgroundTexture: "Textured paper or parchment effect with subtle warmth"
    },
    
    romance: {
      headerStyle: "Elegant script font with subtle heart or floral motif",
      footerStyle: "Page number within a delicate ornamental frame",
      chapterDividers: [
        "Intertwined floral pattern with subtle color gradient",
        "Delicate heart-inspired design that's sophisticated rather than cliché",
        "Flowing ribbon or scroll design in accent color",
        "Ornamental swirl that suggests connection and emotion"
      ],
      dropCapStyle: "Flowing script initial letter with decorative flourishes in a warm color",
      pageDecorations: [
        "Subtle corner embellishments on chapter opening pages",
        "Delicate floral or nature motifs in margins",
        "Small symbolic elements at emotional high points",
        "Light watercolor-style washes behind chapter titles"
      ],
      backgroundTexture: "Very subtle texture suggesting fine linen or handmade paper"
    },
    
    mystery: {
      headerStyle: "Sharp serif font with a small magnifying glass or key icon",
      footerStyle: "Page number with small mysterious symbol or footprint",
      chapterDividers: [
        "Faded or broken line suggesting something hidden or incomplete",
        "Pattern of small clue-related symbols (keys, locks, footprints)",
        "Ink splatter or fingerprint-inspired design in very light opacity",
        "Morse code or cryptic symbol pattern that relates to the story"
      ],
      dropCapStyle: "Initial letter with subtle shadow and mysterious symbol integrated",
      pageDecorations: [
        "Subtle watermark-like symbols in page corners",
        "Faded typewriter font for chapter numbers",
        "Light texture suggesting old paper or documents",
        "Small mysterious symbols in margins at key plot points"
      ],
      backgroundTexture: "Very subtle aged paper texture or light fog effect"
    }
  };
  
  // Return category-specific elements or fiction defaults
  return elements[category.toLowerCase()] || elements.fiction;
};

/**
 * Get enhanced default beautification settings based on book category
 */
const getEnhancedDefaultBeautification = (
  category: string,
  colorScheme: string = 'default'
): BeautificationResult => {
  // Get category-specific color scheme
  const colors = getCategoryColorScheme(category, colorScheme);
  
  // Get category-specific font recommendation
  const fontRecommendation = getCategoryFontRecommendation(category);
  
  // Get category-specific decorative elements
  const decorativeElements = getDefaultDecorativeElements(category);
  
  // Map category to appropriate default styles
  const categoryDefaults: Record<string, Partial<BeautificationResult>> = {
    fiction: {
      layoutRecommendation: {
        margins: "1 inch (2.54 cm) on all sides",
        lineSpacing: "1.5",
        pageBreakStrategy: "Start new chapters on odd-numbered pages",
      },
    },
    
    "non-fiction": {
      layoutRecommendation: {
        margins: "1.25 inches (3.2 cm) on left and right, 1 inch (2.54 cm) on top and bottom",
        lineSpacing: "1.15",
        pageBreakStrategy: "Include section breaks with visual indicator",
      },
    },
    
    technical: {
      layoutRecommendation: {
        margins: "1 inch (2.54 cm) on all sides",
        lineSpacing: "1.2",
        pageBreakStrategy: "Keep code blocks intact, avoid breaking in middle",
      },
    },
    
    children: {
      layoutRecommendation: {
        margins: "0.75 inches (1.9 cm) on all sides",
        lineSpacing: "1.8",
        pageBreakStrategy: "Keep illustrations with relevant text",
      },
    },
    
    poetry: {
      layoutRecommendation: {
        margins: "1.5 inches (3.8 cm) on left and right, 1 inch (2.54 cm) on top and bottom",
        lineSpacing: "1.5",
        pageBreakStrategy: "Try to keep poems on single pages where possible",
      },
    },
  };
  
  // Use category defaults or fiction defaults if category not found
  const categoryDefault = categoryDefaults[category.toLowerCase()] || categoryDefaults.fiction;
  
  // Enhanced CSS styles based on category
  const cssStyles = `
    body { 
      font-family: ${fontRecommendation}; 
      line-height: ${categoryDefault.layoutRecommendation?.lineSpacing || "1.5"}; 
    }
    h1, h2, h3 { 
      color: ${colors.split(',')[0]}; 
      margin-bottom: 1.5rem; 
    }
    .chapter { 
      page-break-before: always; 
      margin-top: 3rem; 
    }
    .drop-cap:first-letter { 
      float: left; 
      font-size: 3.5em; 
      line-height: 0.8; 
      margin-right: 0.2em; 
      color: ${colors.split(',')[2]}; 
    }
  `;
  
  // Return comprehensive beautification settings
  return {
    cssStyles,
    fontRecommendation,
    colorScheme: colors,
    decorativeElements,
    layoutRecommendation: categoryDefault.layoutRecommendation || {
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
