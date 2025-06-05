import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LineChart, BookOpen } from 'lucide-react';

interface BookPlanHeaderProps {
  book: any;
  onUpdate?: (updatedBook: any) => void;
}

const BookPlanHeader: React.FC<BookPlanHeaderProps> = ({ book, onUpdate }) => {
  const navigate = useNavigate();
  
  // Calculate sentiment score based on book content if available
  const getSentimentScore = () => {
    if (!book || !book.chapters) return null;
    
    // Count positive and negative words in all chapters
    let positiveScore = 0;
    let negativeScore = 0;
    let totalWords = 0;
    
    const positiveWords = ['happy', 'joy', 'love', 'triumph', 'success', 'good', 'best', 'wonderful', 'excellent'];
    const negativeWords = ['sad', 'anger', 'hate', 'despair', 'failure', 'bad', 'worst', 'terrible', 'awful'];
    
    book.chapters.forEach((chapter: any) => {
      if (!chapter.content) return;
      
      const content = chapter.content.toLowerCase();
      
      // Count positive words
      positiveWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = content.match(regex);
        if (matches) positiveScore += matches.length;
      });
      
      // Count negative words
      negativeWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = content.match(regex);
        if (matches) negativeScore += matches.length;
      });
      
      // Count total words
      totalWords += content.split(/\s+/).length;
    });
    
    if (totalWords === 0) return null;
    
    // Calculate sentiment score (-100 to 100)
    const sentimentRatio = (positiveScore - negativeScore) / (positiveScore + negativeScore + 1);
    const sentimentScore = Math.round(sentimentRatio * 100);
    
    return {
      score: sentimentScore,
      totalWords,
      positiveWords: positiveScore,
      negativeWords: negativeScore
    };
  };
  
  const sentiment = getSentimentScore();
  
  const getSentimentLabel = (score: number) => {
    if (score > 50) return { label: 'Very Positive', color: 'bg-green-500' };
    if (score > 20) return { label: 'Positive', color: 'bg-green-400' };
    if (score > 0) return { label: 'Slightly Positive', color: 'bg-green-300' };
    if (score === 0) return { label: 'Neutral', color: 'bg-gray-400' };
    if (score > -20) return { label: 'Slightly Negative', color: 'bg-amber-300' };
    if (score > -50) return { label: 'Negative', color: 'bg-amber-400' };
    return { label: 'Very Negative', color: 'bg-amber-500' };
  };
  
  const sentimentInfo = sentiment ? getSentimentLabel(sentiment.score) : null;

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{book?.title || 'Book Plan'}</h1>
          {sentiment && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className={`${sentimentInfo?.color} hover:${sentimentInfo?.color} cursor-pointer`}>
                    {sentimentInfo?.label}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="text-sm">
                    <p className="font-semibold">Sentiment Analysis</p>
                    <p>Score: {sentiment.score}</p>
                    <p>Words analyzed: {sentiment.totalWords}</p>
                    <p>Positive words: {sentiment.positiveWords}</p>
                    <p>Negative words: {sentiment.negativeWords}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {book?.genre && <p className="text-slate-500">{book.genre}</p>}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate(`/book/analytics/${book?.id}`)}>
          <LineChart className="h-4 w-4 mr-2" />
          Analytics
        </Button>
        <Button onClick={() => navigate('/dashboard')} variant="outline">
          <BookOpen className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default BookPlanHeader;
