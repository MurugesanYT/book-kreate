import { PromptType } from './types';

export const simulateAIGeneration = (chapter: { content: string }, promptType: PromptType, customPrompt: string): string => {
  const originalLines = chapter.content.split('\n');
  let content = '';
  
  if (promptType === 'enhance') {
    // Enhance by adding more descriptive language
    content = originalLines.map(line => {
      if (line.trim().length < 10) return line;
      
      // Add more adjectives and details
      const enhancedLine = line
        .replace(/walked/g, 'strode confidently')
        .replace(/looked/g, 'gazed intently')
        .replace(/said/g, 'expressed')
        .replace(/house/g, 'spacious residence')
        .replace(/car/g, 'sleek vehicle')
        .replace(/night/g, 'moonlit evening')
        .replace(/morning/g, 'golden dawn');
        
      return enhancedLine.length > line.length ? enhancedLine : line + ' The atmosphere was charged with anticipation.';
    }).join('\n');
  } 
  else if (promptType === 'rewrite') {
    // Completely rewrite but keep the general structure
    content = 'The morning light filtered through the curtains as the world outside began to stir. ' + 
      originalLines.join(' ').replace(/\./g, '.\n\n') + 
      '\n\nThe events of the day had changed everything, and nothing would ever be the same again.';
  }
  else if (promptType === 'expand') {
    // Expand with more details and dialogue
    content = originalLines.map(line => {
      if (line.trim().length < 10) return line;
      
      // Add dialogue and inner thoughts
      if (Math.random() > 0.7) {
        return line + '\n\n"I never thought it would come to this," they whispered, voice barely audible over the sound of their racing heart. "But here we are."\n\n';
      }
      
      // Add descriptive expansions
      return line + '\n' + (
        Math.random() > 0.5 
          ? 'The weight of the moment hung in the air, a tangible presence that seemed to slow time itself.'
          : 'Memories flooded back, unbidden and raw, painting the present with echoes of the past.'
      );
    }).join('\n');
  }
  else if (promptType === 'summarize') {
    // Create a shorter version
    const words = originalLines.join(' ').split(' ');
    const summarizedWords = words.filter((_, index) => index % 3 === 0 || index % 3 === 1);
    content = summarizedWords.join(' ').replace(/\. /g, '.\n\n');
  }
  else if (promptType === 'custom') {
    // For custom prompts, modify based on keywords in the prompt
    if (customPrompt.includes('dialogue')) {
      content = originalLines.join('\n') + "\n\n\"What do you think will happen now?\" she asked, breaking the silence.\n\n\"I wish I knew,\" he replied, his voice barely above a whisper. \"But whatever comes next, we'll face it together.\"\n\n\"Promise?\"\n\n\"Promise.\"";
    } else if (customPrompt.includes('setting')) {
      content = 'The landscape stretched before them, a tapestry of colors and textures that seemed to breathe with a life of its own. Mountains rose in the distance, their peaks lost in a crown of clouds, while closer at hand, the valley spread out like a lush green carpet dotted with wildflowers.\n\n' + originalLines.join('\n');
    } else {
      // Generic enhancement
      content = originalLines.join('\n') + '\n\nThe story continued, each moment building upon the last, weaving a narrative that would be remembered long after the final page was turned.';
    }
  } else {
    // Default fallback
    content = chapter.content;
  }
  
  return content;
};
