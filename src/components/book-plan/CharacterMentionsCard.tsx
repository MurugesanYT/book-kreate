
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { extractCharacters } from '@/hooks/useAIChapterEdit';
import { Badge } from '@/components/ui/badge';
import { UserRound, Users } from 'lucide-react';
import { BarChart } from '@/components/ui/chart';

interface CharacterMentionsCardProps {
  book: any;
}

const CharacterMentionsCard: React.FC<CharacterMentionsCardProps> = ({ book }) => {
  // Get all chapter content
  const allContent = book.chapters?.map((chapter: any) => chapter.content || '').join(' ') || '';
  
  // Extract character mentions and count them
  const characters = extractCharacters(allContent);
  const characterCounts: Record<string, number> = {};
  
  characters.forEach(character => {
    const regex = new RegExp(`\\b${character}\\b`, 'gi');
    const matches = allContent.match(regex);
    characterCounts[character] = matches ? matches.length : 0;
  });
  
  // Sort by mentions count
  const sortedCharacters = Object.entries(characterCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5); // Top 5 characters
  
  const chartData = sortedCharacters.map(([name, count]) => ({
    name,
    mentions: count
  }));
  
  // Count chapters where each character appears
  const chapterAppearances: Record<string, number> = {};
  
  if (book.chapters) {
    characters.forEach(character => {
      chapterAppearances[character] = book.chapters.filter((chapter: any) => 
        chapter.content && new RegExp(`\\b${character}\\b`, 'i').test(chapter.content)
      ).length;
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Character Mentions
        </CardTitle>
        <CardDescription>
          Analysis of character appearances throughout your book
        </CardDescription>
      </CardHeader>
      <CardContent>
        {characters.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No character data available. Add more content to see character analysis.
          </div>
        ) : (
          <>
            <div className="h-64 mb-6">
              <BarChart
                data={chartData}
                index="name"
                categories={['mentions']}
                colors={['purple']}
                valueFormatter={(value) => `${value} mentions`}
                showLegend={false}
                showXAxis={true}
                showYAxis={true}
              />
            </div>
            
            <div className="grid gap-3 mt-4">
              {sortedCharacters.map(([character, count]) => (
                <div key={character} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">{character}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      {count} mentions
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50">
                      {chapterAppearances[character] || 0} chapters
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CharacterMentionsCard;
