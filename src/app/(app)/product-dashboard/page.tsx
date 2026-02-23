'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, SlidersHorizontal, ArrowUp, Users } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const activeUsersData = {
    dau: [
        { value: 1200 }, { value: 1350 }, { value: 1280 }, { value: 1400 },
        { value: 1380 }, { value: 1520 }, { value: 1600 }
    ],
    wau: [
        { value: 8500 }, { value: 8800 }, { value: 9200 }, { value: 9100 },
        { value: 9500 }, { value: 9800 }, { value: 10200 }
    ],
    mau: [
        { value: 35000 }, { value: 36500 }, { value: 37200 }, { value: 38000 },
        { value: 39500 }, { value: 41000 }, { value: 42500 }
    ]
};

const generateFeatureData = () => {
    const featureNames = [
        'Dashboard View', 'User Profile', 'Export Data', 'Dark Mode', 'Notifications',
        'Search Function', 'Advanced Filters', 'Bulk Actions', 'Custom Reports', 'API Access',
        'Email Integration', 'Calendar Sync', 'File Upload', 'Team Collaboration', 'Video Chat',
        'Screen Sharing', 'Document Editor', 'Template Library', 'Automation Rules', 'Webhooks',
        'Two-Factor Auth', 'SSO Login', 'Password Manager', 'Activity Logs', 'Audit Trail',
        'Data Backup', 'Version Control', 'Comments', 'Mentions', 'Reactions',
        'Mobile App', 'Desktop App', 'Browser Extension', 'Keyboard Shortcuts', 'Quick Actions',
        'Drag and Drop', 'Bulk Import', 'CSV Export', 'PDF Generation', 'Print Layout',
        'Custom Fields', 'Tags', 'Labels', 'Categories', 'Favorites'
    ];

    return featureNames.map((name, index) => ({
        feature: name,
        adoption: Math.floor(Math.random() * 90) + 10,
        users: Math.floor(Math.random() * 5000) + 100,
        color: `hsl(${(index * 137.5) % 360}, 70%, 50%)` // Unique color per feature
    })).sort((a, b) => b.adoption - a.adoption);
};


const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 2
    }).format(num);
};

export default function ProductDashboardPage() {
    const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
    const [featureData] = useState(generateFeatureData());

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Product Dashboard</h2>
                    <p className="text-muted-foreground">
                        Overview of product usage and engagement
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="hidden sm:flex items-center rounded-full border border-border p-1 gap-1">
                        <Button
                            variant={timePeriod === 'weekly' ? 'secondary' : 'ghost'}
                            className="rounded-full px-4"
                            onClick={() => setTimePeriod('weekly')}
                        >
                            Weekly
                        </Button>
                        <Button
                            variant={timePeriod === 'monthly' ? 'secondary' : 'ghost'}
                            className="rounded-full px-4"
                            onClick={() => setTimePeriod('monthly')}
                        >
                            Monthly
                        </Button>
                        <Button
                            variant={timePeriod === 'yearly' ? 'secondary' : 'ghost'}
                            className="rounded-full px-4"
                            onClick={() => setTimePeriod('yearly')}
                        >
                            Yearly
                        </Button>
                    </div>
                    <Button variant="outline" className="hidden sm:flex items-center gap-2 rounded-full px-6 h-12">
                        <Link href="/integrations">Integration</Link>
                    </Button>
                    <Button variant="outline" className="hidden sm:flex items-center gap-2 rounded-full px-6 h-12">
                        <SlidersHorizontal className="h-4 w-4" />
                        <span>Filter</span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Daily Active Users (DAU) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            Daily Active Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">{formatNumber(1226000)}</div>
                            <div className="h-[60px] w-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={activeUsersData.dau}>
                                        <defs>
                                            <linearGradient id="dauGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <RechartsTooltip
                                            cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '3 3' }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border">
                                                            <span className="font-bold">{payload[0].value?.toLocaleString()} users</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#3B82F6"
                                            strokeWidth={2}
                                            fill="url(#dauGradient)"
                                            activeDot={{ r: 4, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Weekly Active Users (WAU) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            Weekly Active Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">{formatNumber(1022200)}</div>
                            <div className="h-[60px] w-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={activeUsersData.wau}>
                                        <defs>
                                            <linearGradient id="wauGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <RechartsTooltip
                                            cursor={{ stroke: '#10B981', strokeWidth: 1, strokeDasharray: '3 3' }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border">
                                                            <span className="font-bold">{payload[0].value?.toLocaleString()} users</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#10B981"
                                            strokeWidth={2}
                                            fill="url(#wauGradient)"
                                            activeDot={{ r: 4, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Monthly Active Users (MAU) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            Monthly Active Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">{formatNumber(422500)}</div>
                            <div className="h-[60px] w-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={activeUsersData.mau}>
                                        <defs>
                                            <linearGradient id="mauGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <RechartsTooltip
                                            cursor={{ stroke: '#8B5CF6', strokeWidth: 1, strokeDasharray: '3 3' }}
                                            position={{ x: -60, y: -40 }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border">
                                                            <span className="font-bold">{payload[0].value?.toLocaleString()} users</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#8B5CF6"
                                            strokeWidth={2}
                                            fill="url(#mauGradient)"
                                            activeDot={{ r: 4, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Top Features Used
                        </CardTitle>
                        <CardDescription>Most used features by event count</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: 'Dashboard View', value: 12500, width: '100%' },
                                { name: 'Create Report', value: 8200, width: '65%' },
                                { name: 'Export CSV', value: 6800, width: '54%' },
                                { name: 'Share Link', value: 4300, width: '34%' },
                                { name: 'API Call', value: 2900, width: '23%' },
                                { name: 'User Settings', value: 2400, width: '19%' },
                                { name: 'Notifications', value: 2100, width: '17%' },
                                { name: 'Filter Data', value: 1800, width: '14%' },
                                { name: 'Search', value: 1500, width: '12%' },
                                { name: 'Team Invite', value: 1200, width: '10%' },
                            ].map((item, index) => (
                                <div key={item.name} className="flex items-center gap-3">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-muted-foreground">#{index + 1}</span>
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                            <span className="font-bold">{item.value.toLocaleString()}</span>
                                        </div>
                                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                                                style={{ width: item.width }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Feature Adoption */}
                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Feature Adoption
                        </CardTitle>
                        <CardDescription>% of users using each feature</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">


                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="h-96 border border-border rounded-lg p-4 bg-muted/30 flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={featureData.slice(0, 15)}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={80}
                                                outerRadius={130}
                                                paddingAngle={2}
                                                dataKey="adoption"
                                            >
                                                {featureData.slice(0, 15).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        const data = payload[0].payload;
                                                        return (
                                                            <div className="bg-popover text-popover-foreground p-4 border-2 border-purple-500/50 rounded-lg shadow-xl z-50">
                                                                <p className="font-bold text-base text-foreground mb-2">{data.feature}</p>
                                                                <p className="text-purple-600 dark:text-purple-400 font-bold text-2xl mb-1">
                                                                    {data.adoption}%
                                                                </p>
                                                                <p className="text-xs text-muted-foreground mt-1">{data.users.toLocaleString()} users</p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Feature List */}
                                <div className="space-y-2 overflow-y-auto h-96 border border-border rounded-lg p-4 bg-muted/30 custom-scrollbar">
                                    {featureData.slice(0, 15).map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center p-3 bg-card rounded-lg hover:shadow-md transition-shadow border border-border">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <span className="font-semibold text-sm block text-foreground">{item.feature}</span>
                                                </div>
                                            </div>
                                            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{item.adoption}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* User Engagement Overview */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>User Engagement Overview</CardTitle>
                    <CardDescription>Key interaction metrics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 4. Events per User */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-muted-foreground">Events per User</h3>
                                <div className="text-2xl font-bold">128</div>
                            </div>
                            <div className="h-[80px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[
                                        { value: 110 }, { value: 115 }, { value: 125 }, { value: 120 },
                                        { value: 130 }, { value: 128 }, { value: 135 }
                                    ]}>
                                        <defs>
                                            <linearGradient id="eventsGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#eventsGradient)" dot={false} />
                                        <RechartsTooltip content={({ active, payload }) => { if (active && payload?.length) { return (<div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border"><span className="font-bold">{payload[0].value} events</span></div>); } return null; }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-muted-foreground">+5% from last week</p>
                        </div>

                        {/* 5. Session Duration */}
                        <div className="space-y-4 border-l border-border pl-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-muted-foreground">Avg Session Duration</h3>
                                <div className="text-2xl font-bold">24m</div>
                            </div>
                            <div className="h-[80px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[
                                        { value: 20 }, { value: 22 }, { value: 21 }, { value: 24 },
                                        { value: 23 }, { value: 25 }, { value: 26 }
                                    ]}>
                                        <defs>
                                            <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fill="url(#sessionGradient)" dot={false} />
                                        <RechartsTooltip content={({ active, payload }) => { if (active && payload?.length) { return (<div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border"><span className="font-bold">{payload[0].value} minutes</span></div>); } return null; }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-muted-foreground">+12% from last week</p>
                        </div>

                        {/* 6. Sessions per User */}
                        <div className="space-y-4 border-l border-border pl-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-muted-foreground">Sessions per User</h3>
                                <div className="text-2xl font-bold">5.8</div>
                            </div>
                            <div className="h-[80px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[
                                        { value: 4 }, { value: 4.5 }, { value: 5 }, { value: 4.8 },
                                        { value: 5.2 }, { value: 5.5 }, { value: 5.8 }
                                    ]}>
                                        <defs>
                                            <linearGradient id="sessionsPerUserGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fill="url(#sessionsPerUserGradient)" dot={false} />
                                        <RechartsTooltip content={({ active, payload }) => { if (active && payload?.length) { return (<div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border"><span className="font-bold">{payload[0].value} sessions</span></div>); } return null; }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-muted-foreground">Returning frequently</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {/* Onboarding Efficiency */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Onboarding Efficiency</CardTitle>
                    <CardDescription>Speed and success of user activation</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 7. Activation Rate */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-muted-foreground">Activation Rate</h3>
                                <div className="text-2xl font-bold">42%</div>
                            </div>
                            <div className="flex justify-center h-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[{ name: 'Activated', value: 42 }, { name: 'Drop-off', value: 58 }]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            <Cell fill="#10B981" />
                                            <Cell fill="#e2e8f0" />
                                        </Pie>
                                        <RechartsTooltip content={({ active, payload }) => { if (active && payload?.length) { return (<div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border"><span className="font-bold">{payload[0].name}: {payload[0].value}%</span></div>); } return null; }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-center text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">42%</span> of signups reach "Aha Moment"
                            </div>
                        </div>

                        {/* 8. Time to First Value */}
                        <div className="space-y-4 border-l border-border pl-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-muted-foreground">Time to First Value (TTFV)</h3>
                                <div className="text-2xl font-bold">24h</div>
                            </div>
                            <div className="h-[180px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={[
                                        { time: '<1h', users: 15 },
                                        { time: '1-6h', users: 30 },
                                        { time: '6-24h', users: 25 },
                                        { time: '24-48h', users: 15 },
                                        { time: '48h+', users: 15 },
                                    ]}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis hide />
                                        <RechartsTooltip cursor={{ fill: 'hsl(var(--muted))' }} content={({ active, payload, label }) => { if (active && payload?.length) { return (<div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border"><span className="font-bold">{label}: {payload[0].value}% users</span></div>); } return null; }} />
                                        <Bar dataKey="users" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-muted-foreground">Median time from signup to activation</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {/* Product Friction Points */}
            <Card className="mt-8 border-red-200">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <CardTitle>Product Friction Points</CardTitle>
                    </div>
                    <CardDescription>High drop-off areas and user frustration signals</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {/* 9. Feature Drop-off (60%) */}
                        <div className="md:col-span-3 space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground">Highest Feature Abandonment</h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        layout="vertical"
                                        data={[
                                            { feature: 'Advanced Export', dropoff: 65 },
                                            { feature: 'Team Invite', dropoff: 48 },
                                            { feature: 'Custom Reports', dropoff: 42 },
                                            { feature: 'API Setup', dropoff: 35 },
                                        ]}
                                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                                        <XAxis type="number" hide />
                                        <YAxis
                                            dataKey="feature"
                                            type="category"
                                            stroke="hsl(var(--muted-foreground))"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            width={100}
                                        />
                                        <RechartsTooltip
                                            cursor={{ fill: 'hsl(var(--muted))' }}
                                            content={({ active, payload }) => {
                                                if (active && payload?.length) {
                                                    return (
                                                        <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border">
                                                            <span className="font-bold">{payload[0].payload.feature}: {payload[0].value}% drop-off</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Bar dataKey="dropoff" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={25} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-muted-foreground">Top features where users start but don't complete the action.</p>
                        </div>

                        {/* 10. Rage Clicks (40%) */}
                        <div className="md:col-span-2 space-y-6 flex flex-col justify-center border-l border-border pl-8">
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground">Rage Clicks & Errors</h3>
                                <div className="mt-2 text-5xl font-bold tracking-tighter text-red-600">342</div>
                                <div className="mt-1 text-sm font-medium text-red-600">Events this week</div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm p-3 bg-red-50 rounded-md border border-red-100">
                                    <span className="font-medium text-red-900">Checkout Page</span>
                                    <span className="font-bold text-red-700">156 clicks</span>
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-orange-50 rounded-md border border-orange-100">
                                    <span className="font-medium text-orange-900">Settings Save</span>
                                    <span className="font-bold text-orange-700">89 clicks</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {/* Product Quality Signals */}
            <Card className="mt-8 border-purple-200">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                        <CardTitle>Product Quality Signals</CardTitle>
                    </div>
                    <CardDescription>User loyalty and engagement depth</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 12. Stickiness (DAU/MAU) */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-muted-foreground">Stickiness Ratio (DAU/MAU)</h3>
                                <div className="text-2xl font-bold">24%</div>
                            </div>
                            <div className="flex justify-center h-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[{ name: 'Active', value: 24 }, { name: 'Inactive', value: 76 }]}
                                            cx="50%"
                                            cy="50%"
                                            startAngle={180}
                                            endAngle={0}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={0}
                                            dataKey="value"
                                        >
                                            <Cell fill="#8B5CF6" />
                                            <Cell fill="#e2e8f0" />
                                        </Pie>
                                        <RechartsTooltip content={({ active, payload }) => { if (active && payload?.length) { return (<div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border"><span className="font-bold">{payload[0].name}: {payload[0].value}%</span></div>); } return null; }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-center -mt-10">
                                <p className="text-sm text-muted-foreground">Industry Benchmark: 20%</p>
                                <p className="text-xs text-green-600 font-medium">✨ Outperforming</p>
                            </div>
                        </div>

                        {/* 11. Power Users */}
                        <div className="flex flex-col justify-center space-y-4 border-l border-border pl-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-muted-foreground">Power Users (Top 10%)</h3>
                                <div className="p-2 bg-purple-100 text-purple-700 rounded-full">
                                    <span className="text-xs font-bold">Elite</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-5xl font-bold tracking-tighter">845</div>
                                <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded w-fit">
                                    <ArrowUp className="h-4 w-4" />
                                    <span>+15% this month</span>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                These users generate 40% of all events. Consider adding to beta program.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
