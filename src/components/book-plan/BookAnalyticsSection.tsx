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
  
  // Prepare chart data
  const wordCountData = chapterStats.map((chapter, index) => ({
    chapter: chapter.title.length > 15 ? `${chapter.title.substring(0, 15)}...` : chapter.title,
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Chapters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{book.chapters?.length || 0}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Word Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{totalWords.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reading Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">
                {readingTimeMinutes >= 60 
                  ? `${Math.floor(readingTimeMinutes / 60)} hr ${readingTimeMinutes % 60} min` 
                  : `${readingTimeMinutes} min`}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ChartBar className="h-4 w-4 text-muted-foreground mr-2" />
              <Badge className={`${sentimentInfo.color} hover:${sentimentInfo.color} font-normal`}>
                {sentimentInfo.label}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="wordcount" className="w-full">
        <TabsList className="w-full max-w-lg mx-auto mb-6">
          <TabsTrigger value="wordcount" className="flex-1">Word Count</TabsTrigger>
          <TabsTrigger value="sentiment" className="flex-1">Sentiment</TabsTrigger>
          <TabsTrigger value="progress" className="flex-1">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="wordcount">
          <Card>
            <CardHeader>
              <CardTitle>Word Count by Chapter</CardTitle>
            </CardHeader>
            <CardContent>
              {wordCountData.length > 0 ? (
                <div className="h-[300px]">
                  <BarChart
                    data={wordCountData}
                    index="chapter"
                    categories={['words']}
                    colors={['purple']}
                    valueFormatter={(value) => `${value.toLocaleString()} words`}
                    yAxisWidth={60}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <p className="text-muted-foreground">No chapter data available</p>
                    <p className="text-sm text-muted-foreground">Add chapters to see word count analytics</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sentiment">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analysis by Chapter</CardTitle>
            </CardHeader>
            <CardContent>
              {wordCountData.length > 0 ? (
                <div className="h-[300px]">
                  <LineChart
                    data={wordCountData}
                    index="chapter"
                    categories={['sentiment']}
                    colors={['teal']}
                    valueFormatter={(value) => `${value}`}
                    yAxisWidth={60}
                    showLegend={false}
                    startEndOnly={false}
                    showYAxis={true}
                    showXAxis={true}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <p className="text-muted-foreground">No sentiment data available</p>
                    <p className="text-sm text-muted-foreground">Add chapters to see sentiment analysis</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Task Completion</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[300px] w-[300px]">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CharacterMentionsCard book={book} />
        <ExportReportCard book={book} />
      </div>
    </div>
  );
};

export default BookAnalyticsSection;
