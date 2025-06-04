
export const analyzeSentiment = (content: string): { score: number; mood: string } => {
  if (!content) return { score: 0, mood: 'neutral' };
  
  const positiveWords = ['happy', 'joy', 'love', 'triumph', 'success', 'good', 'excellent', 'wonderful', 'beautiful', 'great', 'fantastic', 'amazing', 'pleasure', 'delight'];
  const negativeWords = ['sad', 'anger', 'hate', 'despair', 'failure', 'bad', 'terrible', 'awful', 'horrible', 'dreadful', 'miserable', 'gloomy', 'painful', 'tragic'];
  
  const lowerContent = content.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerContent.match(regex);
    if (matches) positiveScore += matches.length;
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerContent.match(regex);
    if (matches) negativeScore += matches.length;
  });
  
  const sentimentScore = Math.min(Math.max(((positiveScore - negativeScore) / Math.max(positiveScore + negativeScore, 1)) * 100, -100), 100);
  
  let mood = 'neutral';
  if (sentimentScore > 50) mood = 'very positive';
  else if (sentimentScore > 20) mood = 'positive';
  else if (sentimentScore > 0) mood = 'slightly positive';
  else if (sentimentScore === 0) mood = 'neutral';
  else if (sentimentScore > -20) mood = 'slightly negative';
  else if (sentimentScore > -50) mood = 'negative';
  else mood = 'very negative';
  
  return { score: Math.round(sentimentScore), mood };
};

export const extractCharacters = (content: string): string[] => {
  if (!content) return [];
  
  // Common name patterns
  const nameRegex = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g;
  const potentialNames = content.match(nameRegex) || [];
  
  // Filter out common words that might be capitalized but aren't names
  const commonWords = ['The', 'A', 'An', 'This', 'That', 'These', 'Those', 'I', 'You', 'He', 'She', 'They', 'We', 'It', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Count occurrences of each name and filter out those with less than 2 occurrences
  const nameCounts: Record<string, number> = {};
  potentialNames.forEach(name => {
    if (!commonWords.includes(name)) {
      nameCounts[name] = (nameCounts[name] || 0) + 1;
    }
  });
  
  // Return names that occur at least twice
  return Object.entries(nameCounts)
    .filter(([_, count]) => count >= 2)
    .map(([name]) => name)
    .slice(0, 10); // Limit to top 10 most mentioned names
};

export const analyzeContent = (content: string) => {
  const sentiment = analyzeSentiment(content);
  const characters = extractCharacters(content);
  const words = content.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200); // Average reading time in minutes (200 wpm)
  
  return {
    sentiment,
    characters,
    wordCount: words,
    readingTime
  };
};
