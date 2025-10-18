import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

interface Article {
  id: number;
  title: string;
  date: string;
  keywords: string[];
  wordCount: number;
}

const mockArticles: Article[] = [
  { id: 1, title: 'Новые технологии в веб-разработке', date: '2025-01-15', keywords: ['React', 'TypeScript', 'Vite'], wordCount: 1250 },
  { id: 2, title: 'Основы машинного обучения', date: '2025-01-20', keywords: ['ML', 'Python', 'AI'], wordCount: 2100 },
  { id: 3, title: 'Дизайн-системы и компоненты', date: '2025-02-03', keywords: ['UI/UX', 'Design', 'Components'], wordCount: 1680 },
  { id: 4, title: 'PostgreSQL оптимизация запросов', date: '2025-02-10', keywords: ['Database', 'SQL', 'Performance'], wordCount: 1920 },
  { id: 5, title: 'Cloud Functions и серверлесс', date: '2025-02-18', keywords: ['Cloud', 'Serverless', 'Backend'], wordCount: 1540 },
  { id: 6, title: 'Безопасность веб-приложений', date: '2025-03-05', keywords: ['Security', 'Auth', 'HTTPS'], wordCount: 2340 },
  { id: 7, title: 'Микросервисная архитектура', date: '2025-03-12', keywords: ['Microservices', 'Architecture', 'API'], wordCount: 2850 },
  { id: 8, title: 'GraphQL vs REST API', date: '2025-03-20', keywords: ['GraphQL', 'REST', 'API'], wordCount: 1780 },
  { id: 9, title: 'Контейнеризация с Docker', date: '2025-04-02', keywords: ['Docker', 'DevOps', 'Containers'], wordCount: 2120 },
  { id: 10, title: 'CI/CD практики', date: '2025-04-15', keywords: ['CI/CD', 'GitHub', 'Automation'], wordCount: 1450 },
  { id: 11, title: 'Тестирование фронтенда', date: '2025-05-01', keywords: ['Testing', 'Jest', 'React'], wordCount: 1890 },
  { id: 12, title: 'WebAssembly введение', date: '2025-05-18', keywords: ['WebAssembly', 'Performance', 'Browser'], wordCount: 2240 },
  { id: 13, title: 'Tailwind CSS продвинутые техники', date: '2025-06-05', keywords: ['Tailwind', 'CSS', 'Styling'], wordCount: 1620 },
  { id: 14, title: 'Next.js App Router', date: '2025-06-22', keywords: ['Next.js', 'React', 'SSR'], wordCount: 2450 },
  { id: 15, title: 'State менеджмент в 2025', date: '2025-07-10', keywords: ['State', 'Redux', 'Zustand'], wordCount: 1980 },
  { id: 16, title: 'Оптимизация производительности React', date: '2025-07-28', keywords: ['React', 'Performance', 'Optimization'], wordCount: 2330 },
  { id: 17, title: 'Accessibility в веб-разработке', date: '2025-08-14', keywords: ['A11y', 'Accessibility', 'WCAG'], wordCount: 1740 },
  { id: 18, title: 'Edge Computing концепции', date: '2025-08-30', keywords: ['Edge', 'CDN', 'Performance'], wordCount: 2050 },
  { id: 19, title: 'Serverless Databases обзор', date: '2025-09-16', keywords: ['Database', 'Serverless', 'Cloud'], wordCount: 1850 },
  { id: 20, title: 'Web3 и децентрализация', date: '2025-10-01', keywords: ['Web3', 'Blockchain', 'DApps'], wordCount: 2680 },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const totalArticles = mockArticles.length;
  const avgWordCount = Math.round(mockArticles.reduce((sum, a) => sum + a.wordCount, 0) / totalArticles);
  const totalWords = mockArticles.reduce((sum, a) => sum + a.wordCount, 0);

  const allKeywords = mockArticles.flatMap(a => a.keywords);
  const keywordCounts = allKeywords.reduce((acc, kw) => {
    acc[kw] = (acc[kw] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topKeywords = Object.entries(keywordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([keyword, count]) => ({ keyword, count }));

  const monthlyData = mockArticles.reduce((acc, article) => {
    const month = article.date.substring(0, 7);
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.articles += 1;
      existing.words += article.wordCount;
    } else {
      acc.push({ month, articles: 1, words: article.wordCount });
    }
    return acc;
  }, [] as Array<{ month: string; articles: number; words: number }>).sort((a, b) => a.month.localeCompare(b.month));

  const wordCountRanges = [
    { range: '< 1500', count: mockArticles.filter(a => a.wordCount < 1500).length },
    { range: '1500-2000', count: mockArticles.filter(a => a.wordCount >= 1500 && a.wordCount < 2000).length },
    { range: '2000-2500', count: mockArticles.filter(a => a.wordCount >= 2000 && a.wordCount < 2500).length },
    { range: '> 2500', count: mockArticles.filter(a => a.wordCount >= 2500).length },
  ];

  const COLORS = ['#8B5CF6', '#0EA5E9', '#F97316', '#D946EF'];

  const filteredArticles = mockArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const calendarData = mockArticles.reduce((acc, article) => {
    const date = article.date;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            Аналитика статей mscexb.ru
          </h1>
          <p className="text-slate-400">Интерактивный дашборд с детальной статистикой публикаций</p>
        </header>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-900/50 border border-slate-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-violet-600">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="publications" className="data-[state=active]:bg-violet-600">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Публикации
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-violet-600">
              <Icon name="Calendar" size={16} className="mr-2" />
              Календарь
            </TabsTrigger>
            <TabsTrigger value="keywords" className="data-[state=active]:bg-violet-600">
              <Icon name="Tag" size={16} className="mr-2" />
              Ключевые слова
            </TabsTrigger>
            <TabsTrigger value="detailed" className="data-[state=active]:bg-violet-600">
              <Icon name="FileText" size={16} className="mr-2" />
              Детали
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-violet-600 to-violet-700 border-0 hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-violet-100">Всего статей</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{totalArticles}</div>
                    <Icon name="FileText" size={32} className="text-violet-200 opacity-60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-blue-100">Всего слов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{totalWords.toLocaleString()}</div>
                    <Icon name="Type" size={32} className="text-blue-200 opacity-60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-600 to-orange-700 border-0 hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-orange-100">Средняя длина</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{avgWordCount}</div>
                    <Icon name="BarChart3" size={32} className="text-orange-200 opacity-60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-600 to-pink-700 border-0 hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-pink-100">Уникальных тем</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{Object.keys(keywordCounts).length}</div>
                    <Icon name="Tags" size={32} className="text-pink-200 opacity-60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} />
                    Динамика публикаций по месяцам
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="colorArticles" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                        labelStyle={{ color: '#e2e8f0' }}
                      />
                      <Area type="monotone" dataKey="articles" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorArticles)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" size={20} />
                    Распределение по объёму
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={wordCountRanges}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ range, count }) => `${range}: ${count}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {wordCountRanges.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="publications" className="animate-fade-in">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart2" size={20} />
                  Количество слов по месяцам
                </CardTitle>
                <CardDescription>Общий объём контента в каждом месяце</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend />
                    <Bar dataKey="words" fill="#0EA5E9" name="Количество слов" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="animate-fade-in">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CalendarDays" size={20} />
                  Календарь публикаций
                </CardTitle>
                <CardDescription>Активность публикаций по датам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(calendarData).sort().map(([date, count]) => (
                    <div key={date} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <Icon name="Calendar" size={16} className="text-violet-400" />
                        <span className="font-mono text-sm">{date}</span>
                      </div>
                      <Badge variant="secondary" className="bg-violet-600">
                        {count} {count === 1 ? 'статья' : 'статьи'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords" className="animate-fade-in">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Hash" size={20} />
                  Топ-10 ключевых слов
                </CardTitle>
                <CardDescription>Самые популярные темы статей</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={topKeywords} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis type="category" dataKey="keyword" stroke="#94a3b8" width={120} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    />
                    <Bar dataKey="count" fill="#F97316" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6 animate-fade-in">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Search" size={20} />
                  Детальная таблица статей
                </CardTitle>
                <CardDescription>Поиск и фильтрация по всем статьям</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Поиск по названию или ключевым словам..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="rounded-lg border border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-800/50 hover:bg-slate-800/50">
                        <TableHead className="text-slate-300">Название</TableHead>
                        <TableHead className="text-slate-300">Дата</TableHead>
                        <TableHead className="text-slate-300">Слов</TableHead>
                        <TableHead className="text-slate-300">Ключевые слова</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredArticles.map((article) => (
                        <TableRow key={article.id} className="border-slate-800 hover:bg-slate-800/30">
                          <TableCell className="font-medium">{article.title}</TableCell>
                          <TableCell className="font-mono text-sm text-slate-400">{article.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-blue-500 text-blue-400">
                              {article.wordCount}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {article.keywords.map((kw, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-violet-900/50 text-violet-300">
                                  {kw}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
