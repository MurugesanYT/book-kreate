
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, PieChart, BarChart } from '@/components/ui/charts';
import { Badge } from '@/components/ui/badge';
import { ChartBar, BookOpen, Clock, FileText } from 'lucide-react';
import CharacterMentionsCard from './CharacterMentionsCard';
import ExportReportCard from './ExportReportCard';
import { analyzeSentiment } from '@/hooks/useAIChapterEdit';

interface BookAnalyticsSectionProps {
  book: any;
  tasks?: any[];
}

const BookAnalyticsSection: React.FC<BookAnalyticsSectionProps> = ({ book, tasks = [] }) => {
  const completedTasks = tasks?.filter(task => task.status === 'completed').length || 0;
  const totalTasks = tasks?.length || 0;
  
  // Calculate word count per chapter
  const chapterStats = book.chapters?.map((chapter: any) => {
    const content = chapter.content || '';
    const wordCount = content.split(/\s+/).length;
    const sentiment = analyzeSentiment(content);
    return {
      title: chapter.title,
      wordCount,
      sentiment: sentiment.score
    };
  }) || [];
  
  // Count total words
  const totalWords = chapterStats.reduce((sum, chapter) => sum + chapter.wordCount, 0);
  
  // Calculate average sentiment
  const averageSentiment = chapterStats.length > 0
    ? Math.round(chapterStats.reduce((sum, chapter) => sum + chapter.sentiment, 0) / chapterStats.length)
    : 0;
  
  const getSentimentLabel = (score: number) => {
    if (score > 50) return { label: 'Very Positive', color: 'bg-green-500' };
    if (score > 20) return { label: 'Positive', color: 'bg-green-400' };
    if (score > 0) return { label: 'Slightly Positive', color: 'bg-green-300' };
    if (score === 0) return { label: 'Neutral', color: 'bg-gray-400' };
    if (score > -20) return { label: 'Slightly Negative', color: 'bg-amber-300' };
    if (score > -50) return { label: 'Negative', color: 'bg-amber-400' };
    return { label: 'Very Negative', color: 'bg-amber-500' };
  };
  
  const sentimentInfo = getSentimentLabel(averageSentiment);
  
  // Prepare chart data with responsive titles
  const wordCountData = chapterStats.map((chapter, index) => ({
    chapter: chapter.title.length > 10 ? `${chapter.title.substring(0, 8)}...` : chapter.title,
    words: chapter.wordCount,
    sentiment: chapter.sentiment
  }));
  
  // Generate reading time approximation (average reading speed: 200-250 words per minute)
  const readingTimeMinutes = Math.ceil(totalWords / 200);
  
  // Create task breakdown data
  const taskStatusData = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: totalTasks - completedTasks }
  ];
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <Card className="p-2 sm:p-4">
          <CardHeader className="pb-1 sm:pb-2 p-2 sm:p-4">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Chapters</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 pt-0">
            <div className="flex items-center">
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1 sm:mr-2" />
              <div className="text-lg sm:text-2xl font-bold">{book.chapters?.length || 0}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-2 sm:p-4">
          <CardHeader className="pb-1 sm:pb-2 p-2 sm:p-4">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Word Count</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 pt-0">
            <div className="flex items-center">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1 sm:mr-2" />
              <div className="text-sm sm:text-2xl font-bold">{totalWords.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-2 sm:p-4">
          <CardHeader className="pb-1 sm:pb-2 p-2 sm:p-4">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Reading Time</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 pt-0">
            <div className="flex items-center">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1 sm:mr-2" />
              <div className="text-xs sm:text-2xl font-bold">
                {readingTimeMinutes >= 60 
                  ? `${Math.floor(readingTimeMinutes / 60)}h ${readingTimeMinutes % 60}m` 
                  : `${readingTimeMinutes}min`}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-2 sm:p-4">
          <CardHeader className="pb-1 sm:pb-2 p-2 sm:p-4">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Sentiment</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 pt-0">
            <div className="flex items-center">
              <ChartBar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1 sm:mr-2" />
              <Badge className={`${sentimentInfo.color} hover:${sentimentInfo.color} font-normal text-xs`}>
                {sentimentInfo.label}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="wordcount" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4 sm:mb-6">
          <TabsTrigger value="wordcount" className="text-xs sm:text-sm">Words</TabsTrigger>
          <TabsTrigger value="sentiment" className="text-xs sm:text-sm">Sentiment</TabsTrigger>
          <TabsTrigger value="progress" className="text-xs sm:text-sm">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="wordcount">
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Word Count by Chapter</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              {wordCountData.length > 0 ? (
                <div className="h-[200px] sm:h-[300px]">
                  <BarChart
                    data={wordCountData}
                    index="chapter"
                    categories={['words']}
                    colors={['purple']}
                    valueFormatter={(value) => `${value.toLocaleString()} words`}
                    yAxisWidth={40}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px] sm:h-[300px] border-2 border-dashed rounded-lg">
                  <div className="text-center p-4">
                    <p className="text-muted-foreground text-sm">No chapter data available</p>
                    <p className="text-xs text-muted-foreground">Add chapters to see analytics</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sentiment">
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Sentiment Analysis by Chapter</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              {wordCountData.length > 0 ? (
                <div className="h-[200px] sm:h-[300px]">
                  <LineChart
                    data={wordCountData}
                    index="chapter"
                    categories={['sentiment']}
                    colors={['teal']}
                    valueFormatter={(value) => `${value}`}
                    yAxisWidth={40}
                    showLegend={false}
                    startEndOnly={false}
                    showYAxis={true}
                    showXAxis={true}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px] sm:h-[300px] border-2 border-dashed rounded-lg">
                  <div className="text-center p-4">
                    <p className="text-muted-foreground text-sm">No sentiment data available</p>
                    <p className="text-xs text-muted-foreground">Add chapters to see analysis</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress">
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Task Completion</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center p-3 sm:p-6">
              <div className="h-[200px] w-[200px] sm:h-[300px] sm:w-[300px]">
                <PieChart
                  data={taskStatusData}
                  index="name"
                  categories={['value']}
                  colors={['green', 'amber']}
                  valueFormatter={(value) => `${value} tasks`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <CharacterMentionsCard book={book} />
        <ExportReportCard book={book} />
      </div>
    </div>
  );
};

export default BookAnalyticsSection;
