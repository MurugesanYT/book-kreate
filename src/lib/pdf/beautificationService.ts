
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
    const geminiResponse = await generateWithGemini(prompt, 4096);
    
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
  const sampleSize = 800; // Increased sample size for better context
  
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
I need exceptional PDF beautification recommendations for a book with the following details:

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
Create a visually stunning, professional design that feels custom-made for this specific book. The design should:
1. Reflect the mood, tone, and essence of the book content
2. Feel cohesive and thoughtfully crafted
3. Enhance readability while adding visual appeal
4. Include subtle but memorable visual elements that complement the content
5. Feel appropriate for the book's genre and target audience

Be creative and specific with your recommendations. For example, instead of just "Simple centered asterisk", describe "An elegant floral asterisk motif in a deep burgundy shade that echoes the book's romantic themes."

Based on this information, provide exceptionally detailed beautification recommendations in the following JSON format:
{
  "cssStyles": "Detailed CSS styles that would work well for this content",
  "fontRecommendation": "Specific font family or combinations that perfectly complement the content's tone and style",
  "colorScheme": "Sophisticated color palette recommendation with precise hex codes for primary, secondary, accent colors",
  "decorativeElements": {
    "headerStyle": "Detailed description of header style with specific design elements",
    "footerStyle": "Detailed description of footer style with specific design elements", 
    "chapterDividers": ["Array of 3-4 unique and specific divider styles that match the book's theme"],
    "dropCapStyle": "Detailed description of drop cap style with specific styling suggestions",
    "pageDecorations": ["Array of 3-4 subtle decoration elements with specific placement and styling"],
    "backgroundTexture": "Description of subtle background texture or pattern if appropriate"
  },
  "layoutRecommendation": {
    "margins": "Precise margin recommendations in inches/cm",
    "lineSpacing": "Exact line spacing recommendation with rationale",
    "pageBreakStrategy": "Thoughtful strategy for page breaks and content flow"
  }
}

The recommendations should perfectly match the book's category (${book.category}) and reflect the unique style and tone of the content. Provide only the JSON response without additional text.
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
      headerStyle: "Book title in small caps with a thin underline",
      footerStyle: "Page number centered with small decorative flourishes on either side",
      chapterDividers: [
        "An elegant swirl pattern in light gray",
        "Three small diamond shapes arranged horizontally",
        "A thin gradient line that fades at both ends"
      ],
      dropCapStyle: "Large serif initial letter spanning 3 lines with subtle shadow",
      pageDecorations: [
        "Subtle corner flourishes on first page of each chapter",
        "Small ornamental symbol at end of chapters"
      ],
      backgroundTexture: "Very subtle paper texture"
    },
    
    "non-fiction": {
      headerStyle: "Section name and chapter number in sans-serif font",
      footerStyle: "Page number with book title in small text",
      chapterDividers: [
        "Clean horizontal line with small square at center",
        "Gradient bar from primary to accent color",
        "Minimal triple-dot divider in accent color"
      ],
      dropCapStyle: "Clean sans-serif initial letter spanning 2 lines with accent color",
      pageDecorations: [
        "Subtle section icons in page margins",
        "Small key points highlighted in margin notes"
      ],
      backgroundTexture: "Clean white with subtle grid pattern"
    },
    
    technical: {
      headerStyle: "Chapter name with small technical icon",
      footerStyle: "Page number with section reference",
      chapterDividers: [
        "Code-inspired pattern with brackets and dots",
        "Clean horizontal line with section number",
        "Binary or hex pattern in light gray"
      ],
      dropCapStyle: "Monospace initial letter in a light box background",
      pageDecorations: [
        "Code snippet styling for code blocks",
        "Technical diagrams with consistent styling"
      ],
      backgroundTexture: "Graph paper or blueprint subtle texture"
    },
    
    children: {
      headerStyle: "Playful rounded font with small illustration",
      footerStyle: "Page number inside a fun shape (star, cloud, etc.)",
      chapterDividers: [
        "Row of small playful icons (stars, hearts, animals)",
        "Wavy colorful line",
        "Character illustration relevant to chapter"
      ],
      dropCapStyle: "Colorful bubble letter with playful design",
      pageDecorations: [
        "Colorful illustrated borders on chapter pages",
        "Small spot illustrations in margins",
        "Character reactions or emotions in margins"
      ],
      backgroundTexture: "Very subtle polka dots or playful pattern"
    },
    
    poetry: {
      headerStyle: "Minimalist italic title",
      footerStyle: "Simple centered page number with small flourish",
      chapterDividers: [
        "Single elegant line with small flourish",
        "Small symbolic representation of poem theme",
        "Delicate floral or nature-inspired divider"
      ],
      dropCapStyle: "Elegant calligraphic initial letter",
      pageDecorations: [
        "Subtle botanical illustrations in margins",
        "Delicate line work framing special poems"
      ],
      backgroundTexture: "Textured paper or parchment effect"
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
