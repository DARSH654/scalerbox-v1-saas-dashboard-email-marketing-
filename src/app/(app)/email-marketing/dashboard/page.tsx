'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListFilter, ArrowUp, ArrowDown, Mail, MousePointerClick, Ban, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const stats = [
    {
        title: 'Sent Emails',
        value: '12,345',
        change: '+5.2%',
        changeType: 'positive',
        icon: Mail,
    },
    {
        title: 'Open Rate',
        value: '24.8%',
        change: '-1.5%',
        changeType: 'negative',
        icon: Eye,
    },
    {
        title: 'Click Rate',
        value: '3.2%',
        change: '+0.8%',
        changeType: 'positive',
        icon: MousePointerClick,
    },
    {
        title: 'Bounce Rate',
        value: '0.8%',
        change: '-0.2%',
        changeType: 'positive', // Lower bounce rate is positive
        icon: Ban,
    },
];

const emailTrendData = [
    { name: 'Mon', sent: 1500 },
    { name: 'Tue', sent: 2300 },
    { name: 'Wed', sent: 3200 },
    { name: 'Thu', sent: 2800 },
    { name: 'Fri', sent: 1900 },
    { name: 'Sat', sent: 800 },
    { name: 'Sun', sent: 600 },
];

const openRateData = [
    { name: 'Jan', value: 22 },
    { name: 'Feb', value: 24 },
    { name: 'Mar', value: 21 },
    { name: 'Apr', value: 25 },
    { name: 'May', value: 24.8 },
];

const campaignPerformance = [
    { name: 'Welcome Series', openRate: 45, clickRate: 12, sent: 5000 },
    { name: 'Monthly Newsletter', openRate: 28, clickRate: 4, sent: 12000 },
    { name: 'Product Update', openRate: 35, clickRate: 8, sent: 8000 },
    { name: 'Re-engagement', openRate: 15, clickRate: 2, sent: 3000 },
    { name: 'Holiday Promo', openRate: 30, clickRate: 6, sent: 10000 },
];

export default function EmailDashboardPage() {
    return (
        <div className="flex-1 space-y-8 p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Email Dashboard</h2>
                    <p className="text-muted-foreground">Manage your campaigns and subscribers</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="default" className="bg-[#374151] hover:bg-[#4b5563] text-white border-0" size="sm">Last 7 Days</Button>
                    <Button variant="ghost" size="sm">Last 30 Days</Button>
                    <Button variant="outline" size="sm">
                        <ListFilter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                                <span className={cn(
                                    "flex items-center mr-1",
                                    stat.changeType === 'positive' ? "text-emerald-500" : "text-rose-500"
                                )}>
                                    {stat.changeType === 'positive' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                                    {stat.change}
                                </span>
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Email Trend Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Email Volume Trend</CardTitle>
                        <CardDescription>Daily sent emails over the last week</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={emailTrendData}>
                                    <defs>
                                        <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--popover-foreground))', borderRadius: 'var(--radius)' }}
                                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                                    />
                                    <Area type="monotone" dataKey="sent" stroke="#6366f1" fillOpacity={1} fill="url(#colorSent)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Open Rate Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Open Rate Trend</CardTitle>
                        <CardDescription>Monthly open rate percentage</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={openRateData}>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--popover-foreground))', borderRadius: 'var(--radius)' }}
                                    />
                                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Campaign Performance */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Campaign Performance</CardTitle>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">View All</Button>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={campaignPerformance} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                                <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} width={150} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--popover-foreground))', borderRadius: 'var(--radius)' }}
                                />
                                <Legend wrapperStyle={{ color: 'hsl(var(--muted-foreground))' }} />
                                <Bar dataKey="openRate" name="Open Rate (%)" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                                <Bar dataKey="clickRate" name="Click Rate (%)" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

