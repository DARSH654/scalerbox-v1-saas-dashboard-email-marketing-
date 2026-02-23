
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListFilter, ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const stats = [
  {
    title: 'Total Revenue',
    value: '$200,45.87',
    change: '+2.5%',
    changeType: 'positive',
  },
  {
    title: 'Active Users',
    value: '9,528',
    change: '+9.5%',
    changeType: 'positive',
  },
  {
    title: 'Customer Lifetime Value',
    value: '$849.54',
    change: '-1.6%',
    changeType: 'negative',
  },
  {
    title: 'Customer Acquisition Cost',
    value: '9,528',
    change: '+3.5%',
    changeType: 'positive',
  },
];

const churnData = [
  { name: 'Jan', value: 4.5 },
  { name: 'Feb', value: 4.2 },
  { name: 'Mar', value: 5.1 },
  { name: 'Apr', value: 4.3 },
  { name: 'May', value: 4.26 },
];

const userGrowthData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 2800 },
  { name: 'Mar', value: 3200 },
  { name: 'Apr', value: 3500 },
  { name: 'May', value: 3768 },
];

const conversionFunnelData = [
  { name: 'Jan', "Ad Impression": 85, "Website Session": 65, "App Download": 45, "New Users": 20 },
  { name: 'Feb', "Ad Impression": 100, "Website Session": 90, "App Download": 70, "New Users": 40 },
  { name: 'Mar', "Ad Impression": 100, "Website Session": 75, "App Download": 60, "New Users": 30 },
  { name: 'Apr', "Ad Impression": 95, "Website Session": 85, "App Download": 65, "New Users": 25 },
  { name: 'May', "Ad Impression": 80, "Website Session": 60, "App Download": 40, "New Users": 15 },
  { name: 'Jun', "Ad Impression": 90, "Website Session": 80, "App Download": 55, "New Users": 35 },
  { name: 'Jul', "Ad Impression": 105, "Website Session": 95, "App Download": 75, "New Users": 45 },
  { name: 'Aug', "Ad Impression": 95, "Website Session": 85, "App Download": 65, "New Users": 25 },
];

const dailySalesData = [
  { name: 'Mon', sales: 220 },
  { name: 'Tue', sales: 380 },
  { name: 'Wed', sales: 190 },
  { name: 'Thu', sales: 250 },
  { name: 'Fri', sales: 180 },
  { name: 'Sat', sales: 210 },
  { name: 'Sun', sales: 190 },
];

export default function SaaSDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Overview Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight">Overview</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm">Weekly</Button>
              <Button variant="ghost" size="sm">Monthly</Button>
              <Button variant="ghost" size="sm">Yearly</Button>
              <Button variant="outline" size="sm">
                <ListFilter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div 
                  key={stat.title} 
                  className={cn(
                    "p-6", 
                    index < 3 && "lg:border-r",
                    index < 2 && "md:border-r",
                    index < 2 && "lg:border-b-0 border-b",
                    index === 2 && "md:border-b-0 border-b"
                  )}
                >
                  <p className="text-sm text-muted-foreground mb-3">{stat.title}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <span
                      className={cn(
                        'flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium',
                        stat.changeType === 'positive' 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-red-500/10 text-red-400'
                      )}
                    >
                      {stat.changeType === 'positive' ? <ArrowUp className="h-3 w-3"/> : <ArrowDown className="h-3 w-3"/>}
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Churn Rate */}
              <Card>
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">Churn Rate</CardTitle>
                    <CardDescription className="mt-1">Downgrade to Free plan</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4"/>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">4.26%</div>
                  <p className="text-xs text-muted-foreground mb-4">0.31% than last Week</p>
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={churnData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#ef4444" 
                          strokeWidth={2} 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* User Growth */}
              <Card>
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
                    <CardDescription className="mt-1">New signups website + mobile</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4"/>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">3,768</div>
                  <p className="text-xs text-muted-foreground mb-4">+3.85% than last Week</p>
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conversionFunnelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        tickLine={false} 
                        axisLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <YAxis 
                        tickLine={false} 
                        axisLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--card-foreground))'
                        }}
                      />
                      <Legend 
                        iconType="circle"
                        wrapperStyle={{ color: 'hsl(var(--muted-foreground))' }}
                      />
                      <Bar dataKey="Ad Impression" stackId="a" fill="#a5b4fc" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Website Session" stackId="a" fill="#818cf8" />
                      <Bar dataKey="App Download" stackId="a" fill="#6366f1" />
                      <Bar dataKey="New Users" stackId="a" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Performance */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pb-4">
                <CardTitle className="text-lg font-semibold">Product Performance</CardTitle>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4"/>
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="daily-sales" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="daily-sales" className="text-xs">
                      Daily Sales
                    </TabsTrigger>
                    <TabsTrigger value="online-sales" className="text-xs">
                      Online Sales
                    </TabsTrigger>
                    <TabsTrigger value="new-users" className="text-xs">
                      New Users
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="daily-sales" className="mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg bg-muted">
                        <p className="text-sm text-muted-foreground mb-2">Digital Product</p>
                        <div className="flex items-center justify-center gap-2">
                          <ArrowUp className="h-4 w-4 text-emerald-400"/>
                          <p className="font-bold text-2xl">790</p>
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted">
                        <p className="text-sm text-muted-foreground mb-2">Physical Product</p>
                        <div className="flex items-center justify-center gap-2">
                          <ArrowDown className="h-4 w-4 text-red-400"/>
                          <p className="font-bold text-2xl">572</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Average Daily Sales</p>
                          <p className="text-3xl font-bold">$2,950</p>
                        </div>
                        <span className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium bg-red-500/10 text-red-400">
                          <ArrowDown className="h-3 w-3"/>
                          0.52%
                        </span>
                      </div>
                      <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={dailySalesData}>
                            <XAxis 
                              dataKey="name" 
                              axisLine={false} 
                              tickLine={false} 
                              fontSize={12}
                              tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <Tooltip
                              contentStyle={{
                                background: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                                color: 'hsl(var(--card-foreground))'
                              }}
                            />
                            <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="online-sales" className="mt-6">
                    <div className="text-center text-muted-foreground py-8">
                      Online Sales data coming soon...
                    </div>
                  </TabsContent>
                  <TabsContent value="new-users" className="mt-6">
                    <div className="text-center text-muted-foreground py-8">
                      New Users data coming soon...
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
