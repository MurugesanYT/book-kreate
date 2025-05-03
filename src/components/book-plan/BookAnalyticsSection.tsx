
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookData } from '@/lib/api/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { BadgeCheck, BarChart2, BookOpen, Clock, Download, FileText, PieChart as PieChartIcon, ScrollText, Target, CalendarIcon, TrendingUp, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getUserPlan } from '@/lib/api/planService';

interface BookAnalyticsSectionProps {
  book: any;
  tasks: any[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const BookAnalyticsSection: React.FC<BookAnalyticsSectionProps> = ({ book, tasks }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');
  const [viewTab, setViewTab] = useState<'overview' | 'content' | 'progress' | 'detailed'>('overview');
  const userPlan = getUserPlan();
  
  // Calculate basic statistics
  const totalChapters = book.chapters?.length || 0;
  const completedChapters = (book.chapters || []).filter((ch: any) => ch.content && ch.content.length > 100).length;
  const chaptersProgress = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
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
  const readingTimeFormatted = readingTimeMinutes < 60 
    ? `${readingTimeMinutes} min` 
    : `${Math.floor(readingTimeMinutes / 60)} hr ${readingTimeMinutes % 60} min`;

  // Target word count progress
  const targetWords = book.generalSettings?.targetWordCount || 60000;
  const wordCountProgress = Math.min(100, (totalWords / targetWords) * 100);

  // Mock data for historical progress
  const generateMockProgressData = (days: number) => {
    const data = [];
    const now = new Date();
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - (days - i - 1));
      const wordCount = Math.floor(totalWords * (i / days) + Math.random() * 300 - 150);
      data.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        words: Math.max(0, wordCount)
      });
    }
    return data;
  };

  const progressData = timeRange === 'week' 
    ? generateMockProgressData(7) 
    : timeRange === 'month' 
      ? generateMockProgressData(30) 
      : generateMockProgressData(60);

  // Content type breakdown
  const contentTypeData = [
    { name: 'Chapters', value: book.chapters?.length || 0 },
    { name: 'Character Lists', value: book.characterList ? 1 : 0 },
    { name: 'Cover Page', value: book.coverPage ? 1 : 0 },
    { name: 'Credits', value: book.creditsPage ? 1 : 0 },
    { name: 'TOC', value: book.tableOfContents ? 1 : 0 }
  ].filter(item => item.value > 0);

  // Task type breakdown
  const taskTypeData = [
    { name: 'Chapter', value: tasks.filter(t => t.type === 'chapter').length },
    { name: 'Character', value: tasks.filter(t => t.type === 'characters').length },
    { name: 'Cover', value: tasks.filter(t => t.type === 'cover').length },
    { name: 'Credits', value: tasks.filter(t => t.type === 'credits').length },
    { name: 'Planning', value: tasks.filter(t => t.type === 'planning').length },
    { name: 'Other', value: tasks.filter(t => !['chapter', 'characters', 'cover', 'credits', 'planning'].includes(t.type)).length }
  ].filter(item => item.value > 0);

  // Mock sentiment analysis data
  const sentimentData = [
    { name: 'Positive', value: 42 },
    { name: 'Neutral', value: 35 },
    { name: 'Negative', value: 23 }
  ];

  // Mock reading complexity data (Flesch-Kincaid grade levels)
  const readabilityScores = book.chapters?.map((chapter: any, index: number) => ({
    name: `Ch ${index + 1}`,
    score: Math.min(12, Math.max(3, 8 + Math.sin(index) * 3.5))
  })) || [];

  // Weekly writing statistics
  const weeklyWritingStats = [
    { day: 'Mon', words: 1245, hours: 2.5 },
    { day: 'Tue', words: 890, hours: 1.8 },
    { day: 'Wed', words: 1520, hours: 3.2 },
    { day: 'Thu', words: 760, hours: 1.5 },
    { day: 'Fri', words: 1050, hours: 2.1 },
    { day: 'Sat', words: 1800, hours: 3.6 },
    { day: 'Sun', words: 650, hours: 1.3 }
  ];

  // Character frequency data
  const characterFrequency = book.characterList?.split(/[,.\n]/)
    .map((part: string) => part.trim())
    .filter((name: string) => name.length > 3)
    .slice(0, 6)
    .map((name: string, index: number) => ({
      name: name,
      appearances: Math.floor(Math.random() * 40) + 10
    })) || [];

  const isPremiumFeature = (feature: 'detailed' | 'export' | 'character-analysis' | 'style-analysis') => {
    if (feature === 'detailed' || feature === 'export') {
      return userPlan === 'Basic';
    }
    if (feature === 'character-analysis' || feature === 'style-analysis') {
      return userPlan === 'Basic' || userPlan === 'Pro';
    }
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Book Analytics</h2>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as 'week' | 'month' | 'all')}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" disabled={isPremiumFeature('export')}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
            {isPremiumFeature('export') && (
              <Badge variant="outline" className="ml-2 text-xs">Pro+</Badge>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={viewTab} onValueChange={(value) => setViewTab(value as 'overview' | 'content' | 'progress' | 'detailed')}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Progress</span>
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-2" disabled={isPremiumFeature('detailed')}>
            <ScrollText className="h-4 w-4" />
            <span className="hidden sm:inline">Detailed</span>
            {isPremiumFeature('detailed') && (
              <Badge variant="outline" className="ml-1 text-xs">Pro+</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  Word Count
                </CardTitle>
                <CardDescription>Total words in your book</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalWords.toLocaleString()}</div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-muted-foreground">
                    ~{readingTimeFormatted} read time
                  </p>
                  <Badge variant="outline">{book.type || 'Novel'}</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-green-500" />
                  Chapters
                </CardTitle>
                <CardDescription>Chapter completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completedChapters}/{totalChapters}</div>
                <div className="space-y-2 mt-2">
                  <Progress value={chaptersProgress} className="h-2" />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">{Math.round(chaptersProgress)}% complete</p>
                    <p className="text-xs text-muted-foreground">{Math.round(averageWordsPerChapter)} words/chapter</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-500" />
                  Tasks
                </CardTitle>
                <CardDescription>Task completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completedTasks}/{totalTasks}</div>
                <div className="space-y-2 mt-2">
                  <Progress value={tasksProgress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Pending: {pendingTasks}</span>
                    <span>In Progress: {inProgressTasks}</span>
                    <span>Completed: {completedTasks}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                Writing Progress
              </CardTitle>
              <CardDescription>Word count over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="words" stroke="#8884d8" fillOpacity={1} fill="url(#colorWords)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-3">
              <span>
                <Target className="h-4 w-4 inline mr-1" />
                Target: {targetWords.toLocaleString()} words
              </span>
              <span>
                <BadgeCheck className="h-4 w-4 inline mr-1" />
                Current: {(wordCountProgress).toFixed(1)}% complete
              </span>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Breakdown</CardTitle>
                <CardDescription>Types of content in your book</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {contentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>Types of tasks in your project</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#82ca9d"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {taskTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Chapter Length Distribution</CardTitle>
                <CardDescription>Word count per chapter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {wordCounts.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={wordCounts} margin={{ top: 5, right: 20, bottom: 50, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="title" angle={-45} textAnchor="end" height={70} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="words" name="Word Count" fill="#8884d8" />
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-amber-500" />
                  Reading Level Analysis
                </CardTitle>
                <CardDescription>Readability by chapter (Flesch-Kincaid)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={readabilityScores}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 12]} ticks={[0, 3, 6, 9, 12]} />
                      <Tooltip formatter={(value) => [`Grade ${value}`, 'Reading Level']} />
                      <Line type="monotone" dataKey="score" stroke="#ff7300" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <div className="grid grid-cols-2">
                    <div>1-3: Elementary</div>
                    <div>4-6: Middle School</div>
                    <div>7-9: High School</div>
                    <div>10-12: College</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center ${isPremiumFeature('style-analysis') ? "text-gray-400" : ""}`}>
                  <PieChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                  Sentiment Analysis
                  {isPremiumFeature('style-analysis') && (
                    <Badge variant="outline" className="ml-2">Pro+</Badge>
                  )}
                </CardTitle>
                <CardDescription className={isPremiumFeature('style-analysis') ? "text-gray-400" : ""}>
                  Emotional tone throughout the book
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isPremiumFeature('style-analysis') ? (
                  <div className="h-[250px] w-full flex flex-col items-center justify-center">
                    <p className="text-muted-foreground text-center mb-3">
                      Upgrade to Pro or Ultimate plan to access advanced style analysis
                    </p>
                    <Button variant="outline" size="sm">
                      Upgrade Plan
                    </Button>
                  </div>
                ) : (
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          <Cell key="cell-0" fill="#4CAF50" />
                          <Cell key="cell-1" fill="#2196F3" />
                          <Cell key="cell-2" fill="#F44336" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className={`${isPremiumFeature('character-analysis') ? "opacity-75" : ""}`}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-500" />
                Character Mentions
                {isPremiumFeature('character-analysis') && (
                  <Badge variant="outline" className="ml-2">Ultimate</Badge>
                )}
              </CardTitle>
              <CardDescription>Frequency of character appearances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                {isPremiumFeature('character-analysis') ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <p className="text-muted-foreground text-center mb-3">
                      Upgrade to Ultimate plan to access character analysis
                    </p>
                    <Button variant="outline" size="sm">
                      Upgrade Plan
                    </Button>
                  </div>
                ) : characterFrequency.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={characterFrequency}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="appearances" name="Appearances" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    No character data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Target Progress</CardTitle>
                <CardDescription>Word count vs target goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{totalWords.toLocaleString()} / {targetWords.toLocaleString()} words</span>
                    <span className="text-sm font-medium">{wordCountProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={wordCountProgress} className="h-3" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Daily Average</p>
                    <p className="text-2xl font-medium">
                      {Math.round(totalWords / Math.max(1, (progressData.length || 30))).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">words/day</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Writing Days</p>
                    <p className="text-2xl font-medium">{Math.round(progressData.length * 0.7)}</p>
                    <p className="text-xs text-muted-foreground">days</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Completion</p>
                    <p className="text-2xl font-medium">
                      {Math.ceil((targetWords - totalWords) / Math.max(1, Math.round(totalWords / Math.max(1, (progressData.length || 30)))))}
                    </p>
                    <p className="text-xs text-muted-foreground">days left</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Progress</CardTitle>
                <CardDescription>Task completion by type</CardDescription>
              </CardHeader>
              <CardContent>
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
                      <span className="font-medium">{inProgressTasks}</span>
                    </div>
                    <Progress value={inProgressTasks / totalTasks * 100} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pending Tasks</span>
                      <span className="font-medium">{pendingTasks}</span>
                    </div>
                    <Progress value={pendingTasks / totalTasks * 100} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Weekly Writing Statistics</CardTitle>
              <CardDescription>Words written per day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyWritingStats} margin={{ right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="words" name="Words" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="hours" name="Hours" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Book Statistics</CardTitle>
              <CardDescription>Key metrics for your book</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
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
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Read Time</span>
                    <span className="font-semibold">{readingTimeFormatted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Reading Level</span>
                    <span className="font-semibold">{book.generalSettings?.readingLevel || 'Adult'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Words Per Page</span>
                    <span className="font-semibold">~250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Status</span>
                    <span className="font-semibold capitalize">{book.generalSettings?.publicationStatus || 'Draft'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Updated</span>
                    <span className="font-semibold">
                      <CalendarIcon className="h-3.5 w-3.5 inline mr-1" />
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed">
          <ScrollArea className="h-[600px] pr-4">
            {isPremiumFeature('detailed') ? (
              <div className="flex flex-col items-center justify-center h-64">
                <h3 className="text-xl font-medium mb-3">Pro Feature</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Detailed analytics are available with our Pro or Ultimate plans. Upgrade to access style analysis, 
                  character relationship mapping, and advanced writing metrics.
                </p>
                <Button>Upgrade Plan</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Advanced analytics content would go here */}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookAnalyticsSection;
