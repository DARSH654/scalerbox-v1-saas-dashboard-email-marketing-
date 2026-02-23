'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowUp, Users, UserPlus, TrendingUp, Activity, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, ComposedChart } from 'recharts';




const userStats = [
    {
        title: 'Total Users',
        value: '5,800',
        change: '+38% from last month',
        changeType: 'positive',
        icon: Users,
        sparklineData: [3200, 3800, 4200, 4800, 5200, 5800]
    },
    {
        title: 'New Users',
        value: '1,600',
        change: '+420 from last period',
        changeType: 'positive',
        icon: UserPlus,
        sparklineData: [800, 1000, 1200, 1300, 1450, 1600]
    },
    {
        title: 'Active Users',
        value: '4,560',
        description: 'DAU: 2,340',
        changeType: 'positive',
        icon: Activity,
        sparklineData: [2400, 2900, 3400, 3900, 4200, 4560]
    },
    {
        title: 'Growth Rate',
        value: '38.1%',
        description: 'Month over month',
        changeType: 'positive',
        icon: TrendingUp,
        sparklineData: [22, 28, 32, 35, 37, 38.1]
    },
];

const monthNames: { [key: string]: string } = {
    'Jan': 'January',
    'Feb': 'February',
    'Mar': 'March',
    'Apr': 'April',
    'May': 'May',
    'Jun': 'June',
    'Jul': 'July',
    'Aug': 'August',
    'Sep': 'September',
    'Oct': 'October',
    'Nov': 'November',
    'Dec': 'December'
};

const userGrowthData = [
    { month: 'Jan', users: 1200, active: 890, paid: 145 },
    { month: 'Feb', users: 1850, active: 1340, paid: 198 },
    { month: 'Mar', users: 2400, active: 1820, paid: 267 },
    { month: 'Apr', users: 3100, active: 2380, paid: 342 },
    { month: 'May', users: 4200, active: 3240, paid: 445 },
    { month: 'Jun', users: 5800, active: 4560, paid: 612 }
];

const topDevicesData = [
    { name: 'Desktop', value: 2800, color: '#3B82F6' },
    { name: 'Mobile', value: 2200, color: '#10B981' },
    { name: 'Tablet', value: 800, color: '#8B5CF6' },
];

const funnelData = [
    { stage: 'Visitors → Signups', from: 12500, to: 5800, rate: 46.4, label: 'Conversion %' },
    { stage: 'Signups → Active Users', from: 5800, to: 4560, rate: 78.6, label: 'Activation rate' },
    { stage: 'Active → Paying Users', from: 4560, to: 612, rate: 13.4, label: 'Monetization rate' },
];

const retentionData = [
    { month: 'Jan', reactivated: 120, churned: 180 },
    { month: 'Feb', reactivated: 145, churned: 160 },
    { month: 'Mar', reactivated: 180, churned: 140 },
    { month: 'Apr', reactivated: 210, churned: 120 },
    { month: 'May', reactivated: 250, churned: 100 },
    { month: 'Jun', reactivated: 280, churned: 85 },
];

const trafficSourcesData = [
    { name: 'Google', value: 4200, color: '#3B82F6' },
    { name: 'Direct', value: 2800, color: '#10B981' },
    { name: 'Social', value: 1900, color: '#8B5CF6' },
    { name: 'Referral', value: 1100, color: '#F59E0B' },
    { name: 'dadgssfdghsdgddhhdhd', value: 8000, color: '#EC4899' },
];

function TrafficSourcesLegend() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 1;
    const totalItems = trafficSourcesData.length;

    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex + itemsPerPage < totalItems;

    const handlePrev = () => {
        if (canGoPrev) {
            setCurrentIndex((prev) => Math.max(0, prev - itemsPerPage));
        }
    };

    const handleNext = () => {
        if (canGoNext) {
            setCurrentIndex((prev) => Math.min(totalItems - itemsPerPage, prev + itemsPerPage));
        }
    };

    const visibleItems = trafficSourcesData.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <div className="flex items-center justify-center gap-3 mt-[13px] w-full">
            <button
                onClick={handlePrev}
                disabled={!canGoPrev}
                className={cn(
                    "w-6 h-6 rounded-full border border-border flex items-center justify-center transition-colors flex-shrink-0",
                    canGoPrev ? "hover:bg-muted cursor-pointer" : "opacity-40 cursor-not-allowed"
                )}
            >
                <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2 flex-wrap justify-center overflow-hidden">
                {visibleItems.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2 min-w-0">
                        <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm truncate max-w-[100px] sm:max-w-none" title={entry.name}>
                            {entry.name.length > 10 ? `${entry.name.slice(0, 10)}...` : entry.name}
                        </span>
                        <span className="text-sm font-extrabold flex-shrink-0">:</span>
                        <span className="text-sm font-extrabold flex-shrink-0">
                            {entry.value.toLocaleString()} {entry.value === 1 ? 'user' : 'users'}
                        </span>
                    </div>
                ))}
            </div>
            <button
                onClick={handleNext}
                disabled={!canGoNext}
                className={cn(
                    "w-6 h-6 rounded-full border border-border flex items-center justify-center transition-colors flex-shrink-0",
                    canGoNext ? "hover:bg-muted cursor-pointer" : "opacity-40 cursor-not-allowed"
                )}
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}

export default function UserDashboardPage() {
    const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Users &amp; Growth Dashboard</h2>
                    <p className="text-muted-foreground">
                        Real-time analytics and growth metrics
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {userStats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                                {stat.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className={cn("text-xs text-muted-foreground", stat.change && "flex items-center gap-1")}>
                                        {stat.change && (
                                            <span
                                                className={cn(
                                                    'flex items-center gap-1',
                                                    stat.changeType === 'positive'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                )}
                                            >
                                                {stat.changeType === 'positive' && <ArrowUp className="h-3 w-3" />}
                                                {stat.change}
                                            </span>
                                        )}
                                        {stat.description}
                                    </p>
                                </div>
                                {stat.sparklineData && (
                                    <div className="w-24 h-14">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={stat.sparklineData.map((value, index) => ({ value, index }))}>
                                                <defs>
                                                    <linearGradient id={`userSparkGradient-${stat.title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor={stat.changeType === 'positive' ? '#22c55e' : '#ef4444'} stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor={stat.changeType === 'positive' ? '#22c55e' : '#ef4444'} stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <RechartsTooltip
                                                    cursor={{
                                                        stroke: stat.changeType === 'positive' ? '#22c55e' : '#ef4444',
                                                        strokeWidth: 1,
                                                        strokeDasharray: '3 3'
                                                    }}
                                                    position={{ x: -80, y: 40 }}
                                                    content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            return (
                                                                <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                                    <span className="font-medium">
                                                                        {stat.title}:
                                                                    </span>
                                                                    {' '}
                                                                    <span className="font-bold">{payload[0].value?.toLocaleString()}{stat.title.includes('Rate') ? '%' : ' users'}</span>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke={stat.changeType === 'positive' ? '#22c55e' : '#ef4444'}
                                                    strokeWidth={2}
                                                    fill={`url(#userSparkGradient-${stat.title.replace(/\s+/g, '')})`}
                                                    activeDot={{
                                                        r: 4,
                                                        fill: stat.changeType === 'positive' ? '#22c55e' : '#ef4444',
                                                        stroke: '#fff',
                                                        strokeWidth: 2
                                                    }}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>User Growth Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={userGrowthData}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <RechartsTooltip
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                        <div className="font-medium text-foreground mb-1">{monthNames[label] || label}</div>
                                                        <div className="space-y-1">
                                                            {payload.map((entry, index) => (
                                                                <div key={index} className="flex items-center gap-2">
                                                                    <span
                                                                        className="w-2 h-2 rounded-full"
                                                                        style={{ backgroundColor: entry.color }}
                                                                    />
                                                                    <span className="text-xs text-muted-foreground">{entry.name}:</span>
                                                                    <span className="font-extrabold text-foreground">
                                                                        {entry.value?.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="users"
                                        stroke="#3B82F6"
                                        fillOpacity={1}
                                        fill="url(#colorUsers)"
                                        name="Total Users"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="active"
                                        stroke="#10B981"
                                        fillOpacity={1}
                                        fill="url(#colorActive)"
                                        name="Active Users"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="paid"
                                        stroke="#8B5CF6"
                                        strokeWidth={2}
                                        name="Paid Users"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-4">
                    <Card className="h-full">
                        <CardHeader className="pb-2">
                            <CardTitle>Top Devices</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center pt-0">
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie
                                        data={topDevicesData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        innerRadius={70}
                                        outerRadius={110}
                                        paddingAngle={2}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {topDevicesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                        <span className="font-medium">
                                                            {payload[0].name}:
                                                        </span>
                                                        {' '}
                                                        <span className="font-bold">{payload[0].value?.toLocaleString()}</span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-6 mt-4">
                                {topDevicesData.map((entry) => (
                                    <div key={entry.name} className="flex items-center gap-2">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: entry.color }}
                                        />
                                        <span className="text-sm font-medium">{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Conversion Funnel</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-4 mb-4 justify-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3B82F6' }} />
                                    <span className="text-sm">Visitors</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10B981' }} />
                                    <span className="text-sm">Signups</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8B5CF6' }} />
                                    <span className="text-sm">Active Users</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
                                    <span className="text-sm">Paying Users</span>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart
                                    data={[
                                        { month: 'Jan', visitors: 12500, signups: 5800, active: 4560, paying: 612 },
                                        { month: 'Feb', visitors: 13200, signups: 6200, active: 4800, paying: 680 },
                                        { month: 'Mar', visitors: 14100, signups: 6800, active: 5100, paying: 750 },
                                        { month: 'Apr', visitors: 13800, signups: 6500, active: 4950, paying: 720 },
                                        { month: 'May', visitors: 14500, signups: 7100, active: 5300, paying: 810 },
                                        { month: 'Jun', visitors: 15200, signups: 7500, active: 5600, paying: 890 },
                                    ].map(item => ({
                                        ...item,
                                        visitorsSegment: item.visitors - item.signups,
                                        signupsSegment: item.signups - item.active,
                                        activeSegment: item.active - item.paying,
                                        payingSegment: item.paying
                                    }))}
                                    barSize={30}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <RechartsTooltip
                                        cursor={false}
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border">
                                                        <div className="font-medium text-foreground mb-1">{monthNames[label] || label}</div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                                                                <span className="text-xs text-muted-foreground">Visitors:</span>
                                                                <span className="font-extrabold text-foreground">{data.visitors.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                                                                <span className="text-xs text-muted-foreground">Signups:</span>
                                                                <span className="font-extrabold text-foreground">{data.signups.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                                                                <span className="text-xs text-muted-foreground">Active:</span>
                                                                <span className="font-extrabold text-foreground">{data.active.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                                                                <span className="text-xs text-muted-foreground">Paying:</span>
                                                                <span className="font-extrabold text-foreground">{data.paying.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    {/* Stacked from bottom to top: Paying -> Active -> Signups -> Visitors */}
                                    <Bar dataKey="payingSegment" stackId="a" fill="#F59E0B" name="Paying Users" radius={[0, 0, 4, 4]} />
                                    <Bar dataKey="activeSegment" stackId="a" fill="#8B5CF6" name="Active Users" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="signupsSegment" stackId="a" fill="#10B981" name="Signups" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="visitorsSegment" stackId="a" fill="#3B82F6" name="Visitors" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-3">
                    <Card className="flex-1">
                        <CardContent className="pt-4 pb-3 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Signup Rate</p>
                                <p className="text-2xl font-bold text-blue-500">15%</p>
                                <p className="text-xs text-muted-foreground">Visitors → Signups</p>
                            </div>
                            <div className="w-20 h-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[{ v: 10 }, { v: 12 }, { v: 11 }, { v: 14 }, { v: 13 }, { v: 15 }]}>
                                        <defs>
                                            <linearGradient id="signupGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <RechartsTooltip
                                            cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '3 3' }}
                                            position={{ x: -100, y: -40 }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                            <span className="font-medium">Signup Rate:</span>{' '}
                                                            <span className="font-bold">{payload[0].value}%</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={2} fill="url(#signupGradient)" activeDot={{ r: 4, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardContent className="pt-4 pb-3 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Activation Rate</p>
                                <p className="text-2xl font-bold text-green-500">60%</p>
                                <p className="text-xs text-muted-foreground">Signups → Active Users</p>
                            </div>
                            <div className="w-20 h-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[{ v: 52 }, { v: 55 }, { v: 54 }, { v: 58 }, { v: 57 }, { v: 60 }]}>
                                        <defs>
                                            <linearGradient id="activationGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <RechartsTooltip
                                            cursor={{ stroke: '#10B981', strokeWidth: 1, strokeDasharray: '3 3' }}
                                            position={{ x: -100, y: -40 }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                            <span className="font-medium">Activation Rate:</span>{' '}
                                                            <span className="font-bold">{payload[0].value}%</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} fill="url(#activationGradient)" activeDot={{ r: 4, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardContent className="pt-4 pb-3 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Monetization Rate</p>
                                <p className="text-2xl font-bold text-purple-500">20%</p>
                                <p className="text-xs text-muted-foreground">Active → Paying Users</p>
                            </div>
                            <div className="w-20 h-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[{ v: 15 }, { v: 17 }, { v: 16 }, { v: 18 }, { v: 19 }, { v: 20 }]}>
                                        <defs>
                                            <linearGradient id="monetizationGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <RechartsTooltip
                                            cursor={{ stroke: '#8B5CF6', strokeWidth: 1, strokeDasharray: '3 3' }}
                                            position={{ x: -100, y: -40 }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                            <span className="font-medium">Monetization Rate:</span>{' '}
                                                            <span className="font-bold">{payload[0].value}%</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area type="monotone" dataKey="v" stroke="#8B5CF6" strokeWidth={2} fill="url(#monetizationGradient)" activeDot={{ r: 4, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardContent className="pt-4 pb-3 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Overall Conversion</p>
                                <p className="text-2xl font-bold text-amber-500">1.8%</p>
                                <p className="text-xs text-muted-foreground">From visitor to paying customer</p>
                            </div>
                            <div className="w-20 h-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[{ v: 1.2 }, { v: 1.4 }, { v: 1.3 }, { v: 1.5 }, { v: 1.6 }, { v: 1.8 }]}>
                                        <defs>
                                            <linearGradient id="overallGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <RechartsTooltip
                                            cursor={{ stroke: '#F59E0B', strokeWidth: 1, strokeDasharray: '3 3' }}
                                            position={{ x: -100, y: -40 }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                            <span className="font-medium">Overall Conversion:</span>{' '}
                                                            <span className="font-bold">{payload[0].value}%</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area type="monotone" dataKey="v" stroke="#F59E0B" strokeWidth={2} fill="url(#overallGradient)" activeDot={{ r: 4, fill: '#F59E0B', stroke: '#fff', strokeWidth: 2 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>User Retention Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={retentionData}>
                                <defs>
                                    <linearGradient id="colorReactivated" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorChurned" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <RechartsTooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                    <div className="font-medium text-foreground mb-1">{monthNames[label] || label}</div>
                                                    <div className="space-y-1">
                                                        {payload.map((entry, index) => (
                                                            <div key={index} className="flex items-center gap-2">
                                                                <span
                                                                    className="w-2 h-2 rounded-full"
                                                                    style={{ backgroundColor: entry.color }}
                                                                />
                                                                <span className="text-xs text-muted-foreground">{entry.name}:</span>
                                                                <span className="font-extrabold text-foreground">
                                                                    {entry.value?.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="reactivated"
                                    stroke="#10B981"
                                    fillOpacity={1}
                                    fill="url(#colorReactivated)"
                                    name="Reactivated Users"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="churned"
                                    stroke="#3B82F6"
                                    fillOpacity={1}
                                    fill="url(#colorChurned)"
                                    name="Churned Users"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8">
                    <Card className="h-full">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Top Countries</CardTitle>
                                    <CardDescription>Users by country</CardDescription>
                                </div>
                                <div className="flex rounded-lg border">
                                    <div className="text-right px-6 py-2 flex flex-col items-center">
                                        <p className="text-xs text-muted-foreground whitespace-nowrap">Top Country</p>
                                        <p className="text-lg font-bold truncate max-w-[150px]" title="Slovenia">Slovenia</p>
                                    </div>
                                    <div className="text-right border-l px-6 py-2 flex flex-col items-center">
                                        <p className="text-xs text-muted-foreground whitespace-nowrap">Total Countries</p>
                                        <p className="text-lg font-bold">100</p>
                                    </div>
                                    <div className="text-right border-l px-6 py-2 flex flex-col items-center">
                                        <p className="text-xs text-muted-foreground whitespace-nowrap">Avg Per Country</p>
                                        <p className="text-lg font-bold">5,625</p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <AreaChart
                                    data={[
                                        { rank: 1, country: 'Slovenia', users: 10419 },
                                        { rank: 2, country: 'United States', users: 9850 },
                                        { rank: 3, country: 'India', users: 9200 },
                                        { rank: 4, country: 'China', users: 8800 },
                                        { rank: 5, country: 'United Kingdom', users: 8400 },
                                        { rank: 6, country: 'Germany', users: 8100 },
                                        { rank: 7, country: 'Canada', users: 7800 },
                                        { rank: 8, country: 'France', users: 7500 },
                                        { rank: 9, country: 'Australia', users: 7200 },
                                        { rank: 10, country: 'Brazil', users: 6900 },
                                        { rank: 11, country: 'Japan', users: 6700 },
                                        { rank: 12, country: 'Italy', users: 6500 },
                                        { rank: 13, country: 'Spain', users: 6300 },
                                        { rank: 14, country: 'Mexico', users: 6100 },
                                        { rank: 15, country: 'Netherlands', users: 5900 },
                                        { rank: 16, country: 'South Korea', users: 5700 },
                                        { rank: 17, country: 'Russia', users: 5500 },
                                        { rank: 18, country: 'Turkey', users: 5300 },
                                        { rank: 19, country: 'Indonesia', users: 5100 },
                                        { rank: 20, country: 'Poland', users: 4900 },
                                        { rank: 21, country: 'Belgium', users: 4700 },
                                        { rank: 22, country: 'Sweden', users: 4500 },
                                        { rank: 23, country: 'Switzerland', users: 4350 },
                                        { rank: 24, country: 'Austria', users: 4200 },
                                        { rank: 25, country: 'Norway', users: 4050 },
                                        { rank: 26, country: 'Denmark', users: 3900 },
                                        { rank: 27, country: 'Finland', users: 3750 },
                                        { rank: 28, country: 'Ireland', users: 3600 },
                                        { rank: 29, country: 'Portugal', users: 3450 },
                                        { rank: 30, country: 'Greece', users: 3300 },
                                        { rank: 31, country: 'Czech Republic', users: 3150 },
                                        { rank: 32, country: 'Romania', users: 3000 },
                                        { rank: 33, country: 'Hungary', users: 2880 },
                                        { rank: 34, country: 'Thailand', users: 2760 },
                                        { rank: 35, country: 'Malaysia', users: 2640 },
                                        { rank: 36, country: 'Singapore', users: 2520 },
                                        { rank: 37, country: 'Philippines', users: 2400 },
                                        { rank: 38, country: 'Vietnam', users: 2300 },
                                        { rank: 39, country: 'Argentina', users: 2200 },
                                        { rank: 40, country: 'Colombia', users: 2100 },
                                        { rank: 41, country: 'Chile', users: 2000 },
                                        { rank: 42, country: 'Peru', users: 1900 },
                                        { rank: 43, country: 'South Africa', users: 1820 },
                                        { rank: 44, country: 'Egypt', users: 1740 },
                                        { rank: 45, country: 'Nigeria', users: 1660 },
                                        { rank: 46, country: 'Kenya', users: 1580 },
                                        { rank: 47, country: 'Ukraine', users: 1500 },
                                        { rank: 48, country: 'Israel', users: 1440 },
                                        { rank: 49, country: 'UAE', users: 1380 },
                                        { rank: 50, country: 'Saudi Arabia', users: 1320 },
                                        { rank: 51, country: 'Pakistan', users: 1260 },
                                        { rank: 52, country: 'Bangladesh', users: 1200 },
                                        { rank: 53, country: 'Taiwan', users: 1150 },
                                        { rank: 54, country: 'Hong Kong', users: 1100 },
                                        { rank: 55, country: 'New Zealand', users: 1050 },
                                        { rank: 56, country: 'Morocco', users: 1000 },
                                        { rank: 57, country: 'Algeria', users: 960 },
                                        { rank: 58, country: 'Tunisia', users: 920 },
                                        { rank: 59, country: 'Jordan', users: 880 },
                                        { rank: 60, country: 'Lebanon', users: 840 },
                                        { rank: 61, country: 'Kuwait', users: 800 },
                                        { rank: 62, country: 'Qatar', users: 770 },
                                        { rank: 63, country: 'Bahrain', users: 740 },
                                        { rank: 64, country: 'Oman', users: 710 },
                                        { rank: 65, country: 'Ghana', users: 680 },
                                        { rank: 66, country: 'Tanzania', users: 650 },
                                        { rank: 67, country: 'Uganda', users: 620 },
                                        { rank: 68, country: 'Ethiopia', users: 595 },
                                        { rank: 69, country: 'Senegal', users: 570 },
                                        { rank: 70, country: 'Ivory Coast', users: 545 },
                                        { rank: 71, country: 'Cameroon', users: 520 },
                                        { rank: 72, country: 'Zimbabwe', users: 500 },
                                        { rank: 73, country: 'Zambia', users: 480 },
                                        { rank: 74, country: 'Mozambique', users: 460 },
                                        { rank: 75, country: 'Angola', users: 440 },
                                        { rank: 76, country: 'Botswana', users: 420 },
                                        { rank: 77, country: 'Serbia', users: 400 },
                                        { rank: 78, country: 'Croatia', users: 385 },
                                        { rank: 79, country: 'Bosnia', users: 370 },
                                        { rank: 80, country: 'Slovakia', users: 355 },
                                        { rank: 81, country: 'Bulgaria', users: 340 },
                                        { rank: 82, country: 'Lithuania', users: 325 },
                                        { rank: 83, country: 'Latvia', users: 310 },
                                        { rank: 84, country: 'Estonia', users: 295 },
                                        { rank: 85, country: 'Iceland', users: 280 },
                                        { rank: 86, country: 'Luxembourg', users: 270 },
                                        { rank: 87, country: 'Malta', users: 260 },
                                        { rank: 88, country: 'Cyprus', users: 250 },
                                        { rank: 89, country: 'Albania', users: 240 },
                                        { rank: 90, country: 'Macedonia', users: 230 },
                                        { rank: 91, country: 'Montenegro', users: 220 },
                                        { rank: 92, country: 'Moldova', users: 210 },
                                        { rank: 93, country: 'Armenia', users: 200 },
                                        { rank: 94, country: 'Georgia', users: 190 },
                                        { rank: 95, country: 'Azerbaijan', users: 180 },
                                        { rank: 96, country: 'Kazakhstan', users: 170 },
                                        { rank: 97, country: 'Uzbekistan', users: 160 },
                                        { rank: 98, country: 'Turkmenistan', users: 150 },
                                        { rank: 99, country: 'Kyrgyzstan', users: 140 },
                                        { rank: 100, country: 'Mongolia', users: 130 },
                                    ]}
                                    margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                                >
                                    <defs>
                                        <linearGradient id="colorCountryUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="rank"
                                        stroke="hsl(var(--muted-foreground))"
                                    />
                                    <YAxis
                                        stroke="hsl(var(--muted-foreground))"
                                    />
                                    <RechartsTooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                const totalUsers = 562500;
                                                return (
                                                    <div className="bg-popover text-popover-foreground text-sm px-4 py-3 rounded-lg shadow-lg border whitespace-nowrap">
                                                        <p className="font-extrabold text-lg mb-1">#{data.rank} {data.country}</p>
                                                        <p className="text-blue-500 font-extrabold text-xl">
                                                            {data.users.toLocaleString()} users
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {((data.users / totalUsers) * 100).toFixed(2)}% of total
                                                        </p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="users"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorCountryUsers)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-4">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Top Traffic Sources</CardTitle>
                            <CardDescription>Where users come from</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center flex-1 justify-between pb-6">
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie
                                        data={trafficSourcesData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {trafficSourcesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                        <span className="font-medium">
                                                            {payload[0].name}:
                                                        </span>
                                                        {' '}
                                                        <span className="font-bold">{payload[0].value?.toLocaleString()}</span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-auto w-full">
                                <TrafficSourcesLegend />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}
