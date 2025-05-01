
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookData } from '@/lib/api/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BookAnalyticsSectionProps {
  book: any;
  tasks: any[];
}

const BookAnalyticsSection: React.FC<BookAnalyticsSectionProps> = ({ book, tasks }) => {
  // Calculate basic statistics
  const totalChapters = book.chapters?.length || 0;
  const completedChapters = (book.chapters || []).filter((ch: any) => ch.content && ch.content.length > 100).length;
  const chaptersProgress = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const tasksProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  // Calculate word count statistics
  const wordCounts = book.chapters?.map((chapter: any) => {
    const content = chapter.content || '';
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    return {
      title: chapter.title,
      words: wordCount,
    };
  }) || [];
  
  const totalWords = wordCounts.reduce((sum, chapter) => sum + chapter.words, 0);
  const averageWordsPerChapter = totalChapters > 0 ? totalWords / totalChapters : 0;
  
  // Reading time estimation (average reading speed: 200-250 words per minute)
  const readingTimeMinutes = Math.ceil(totalWords / 225);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Word Count</CardTitle>
            <CardDescription>Total words in your book</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalWords.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">
              ~{readingTimeMinutes} min read time
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Chapters</CardTitle>
            <CardDescription>Chapter completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedChapters}/{totalChapters}</div>
            <div className="space-y-2 mt-2">
              <Progress value={chaptersProgress} className="h-2" />
              <p className="text-xs text-right text-muted-foreground">{Math.round(chaptersProgress)}% complete</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tasks</CardTitle>
            <CardDescription>Task completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedTasks}/{totalTasks}</div>
            <div className="space-y-2 mt-2">
              <Progress value={tasksProgress} className="h-2" />
              <p className="text-xs text-right text-muted-foreground">{Math.round(tasksProgress)}% complete</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Chapter Length Distribution</CardTitle>
          <CardDescription>Word count per chapter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {wordCounts.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wordCounts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="words" fill="#8884d8" name="Words" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No chapter content available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Book Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Chapters</span>
                <span className="font-semibold">{totalChapters}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Words Per Chapter</span>
                <span className="font-semibold">{Math.round(averageWordsPerChapter).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Estimated Pages</span>
                <span className="font-semibold">{Math.ceil(totalWords / 250)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Book Type</span>
                <span className="font-semibold">{book.type || 'Novel'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Genre</span>
                <span className="font-semibold">{book.category || 'Fiction'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Task Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length > 0 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completed Tasks</span>
                    <span className="font-medium">{completedTasks}</span>
                  </div>
                  <Progress value={completedTasks / totalTasks * 100} className="h-1.5" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>In Progress</span>
                    <span className="font-medium">{tasks.filter(t => t.status === 'inProgress').length}</span>
                  </div>
                  <Progress value={tasks.filter(t => t.status === 'inProgress').length / totalTasks * 100} className="h-1.5" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Pending Tasks</span>
                    <span className="font-medium">{tasks.filter(t => t.status === 'pending').length}</span>
                  </div>
                  <Progress value={tasks.filter(t => t.status === 'pending').length / totalTasks * 100} className="h-1.5" />
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Task Types:</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Chapters</span>
                      <span>{tasks.filter(t => t.type === 'chapter').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Character Lists</span>
                      <span>{tasks.filter(t => t.type === 'characters').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cover Pages</span>
                      <span>{tasks.filter(t => t.type === 'cover').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credits Pages</span>
                      <span>{tasks.filter(t => t.type === 'credits').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                No tasks created yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookAnalyticsSection;
