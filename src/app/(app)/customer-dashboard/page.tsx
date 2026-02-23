'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SlidersHorizontal, Users, UserPlus, UserMinus, ArrowUp, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { AreaChart, Area, ResponsiveContainer, Tooltip as RechartsTooltip, PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { cn } from '@/lib/utils';

// Shared sparkline data structure
const totalCustomersData = [
    { value: 2000 }, { value: 2100 }, { value: 2200 }, { value: 2150 },
    { value: 2300 }, { value: 2350 }, { value: 2420 }
];

const newCustomersData = [
    { value: 120 }, { value: 135 }, { value: 125 }, { value: 140 },
    { value: 145 }, { value: 155 }, { value: 150 }
];

const lostCustomersData = [
    { value: 15 }, { value: 18 }, { value: 12 }, { value: 14 },
    { value: 16 }, { value: 22 }, { value: 21 }
];

interface StatCardProps {
    title: string;
    icon: React.ElementType;
    value: string;
    change?: string;
    changeType?: 'positive' | 'negative';
    description?: string;
    data: { value: number }[];
    color: string;
    unit?: string;
}

function StatCard({ title, icon: Icon, value, change, changeType, description, data, color, unit = '' }: StatCardProps) {
    const isPositive = changeType === 'positive';

    return (
        <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2 gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="h-[60px] w-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id={`gradient-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke={color}
                                    strokeWidth={2}
                                    fill={`url(#gradient-${title.replace(/\s/g, '')})`}
                                />
                                <RechartsTooltip
                                    cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }}
                                    position={{ x: -100, y: -50 }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                    <span className="font-medium">
                                                        {title}:
                                                    </span>
                                                    {' '}
                                                    <span className="font-extrabold">{payload[0].value?.toLocaleString()} {unit}</span>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {description ? (
                    <div className="text-xs text-muted-foreground mt-1">
                        {description}
                    </div>
                ) : (
                    <div className={cn("text-xs flex items-center mt-1",
                        isPositive ? "text-green-600" : "text-red-600"
                    )}>
                        {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        {change} from last month
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function HealthScoreGauge() {
    const targetValue = 88;
    const [animatedValue, setAnimatedValue] = useState(0);
    const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (animatedValue < targetValue) {
                setAnimatedValue(prev => Math.min(prev + 2, targetValue));
            }
        }, 15);
        return () => clearTimeout(timer);
    }, [animatedValue]);

    const getLabel = (val: number) => {
        if (val < 30) return 'Low';
        if (val < 70) return 'Medium';
        return 'Excellent';
    };

    const segmentTooltips: { [key: string]: { range: string; label: string; color: string } } = {
        bad: { range: '0-25 / 100', label: 'Bad', color: '#ef4444' },
        moderate: { range: '25-50 / 100', label: 'Moderate', color: '#f59e0b' },
        good: { range: '50-75 / 100', label: 'Good', color: '#22c55e' },
        excellent: { range: '75-100 / 100', label: 'Excellent', color: '#10b981' },
    };

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle>Overall Health Score</CardTitle>
                <CardDescription>Combined customer health metric</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-between flex-1">
                <div className="w-full flex justify-center items-center relative h-[200px]">
                    {/* Score Display - Left Side */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl lg:text-6xl font-bold text-foreground">{animatedValue}</span>
                            <span className="text-lg lg:text-xl text-muted-foreground">/ 100</span>
                        </div>
                        <span className="text-lg lg:text-xl font-medium text-muted-foreground mt-2">{getLabel(animatedValue)}</span>
                    </div>

                    {/* Gauge Chart - Right Side */}
                    <div
                        className="relative flex justify-center items-center w-full h-full"
                        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                        onMouseLeave={() => setHoveredSegment(null)}
                    >
                        {/* Tooltip */}
                        {hoveredSegment && (
                            <div
                                className="fixed bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap z-50 pointer-events-none"
                                style={{
                                    left: mousePos.x + 15,
                                    top: mousePos.y + 15,
                                }}
                            >
                                <div className="font-medium text-foreground text-left">{segmentTooltips[hoveredSegment].range}</div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: segmentTooltips[hoveredSegment].color }}
                                    ></span>
                                    <span className="font-extrabold text-foreground text-left">{segmentTooltips[hoveredSegment].label}</span>
                                </div>
                            </div>
                        )}

                        {/* SVG Gauge */}
                        <svg viewBox="0 0 320 200" className="w-full h-full max-w-[320px] max-h-[200px] overflow-visible">
                            <defs>
                                <linearGradient id="healthGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                                    <stop offset="50%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                                </linearGradient>
                                <filter id="healthGlow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <filter id="needleShadow">
                                    <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.4" />
                                </filter>
                            </defs>

                            {/* Using fixed coordinates relative to viewBox 0 0 320 200 */}
                            {(() => {
                                const cx = 220; // Shifted right to make room for text on left
                                const cy = 140;
                                const r = 90;
                                const sw = 18;
                                const needleLen = r - 10;
                                const startAngle = Math.PI; // 180 degrees
                                const endAngle = 0; // 0 degrees
                                const totalAngle = Math.PI;
                                const currentAngle = startAngle - (animatedValue / 100) * totalAngle;

                                // Needle rotation: -180 (0%) to 0 (100%)
                                const needleRot = -180 + (animatedValue / 100) * 180;

                                return (
                                    <>
                                        {/* Background arc */}
                                        <path
                                            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                                            fill="none"
                                            stroke="hsl(var(--muted))"
                                            strokeWidth={sw}
                                            strokeLinecap="round"
                                        />

                                        {/* Progress arc */}
                                        <path
                                            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(Math.PI - (animatedValue / 100) * Math.PI)} ${cy - r * Math.sin((animatedValue / 100) * Math.PI)}`}
                                            fill="none"
                                            stroke="url(#healthGaugeGradient)"
                                            strokeWidth={sw}
                                            strokeLinecap="round"
                                            filter="url(#healthGlow)"
                                        />

                                        {/* Hover segments */}
                                        {/* Bad: 0-25% -> 180 to 135 deg */}
                                        <path
                                            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(Math.PI * 0.75)} ${cy - r * Math.sin(Math.PI * 0.25)}`}
                                            fill="none"
                                            stroke="transparent"
                                            strokeWidth={sw + 10}
                                            className="cursor-pointer"
                                            onMouseEnter={() => setHoveredSegment('bad')}
                                            onMouseLeave={() => setHoveredSegment(null)}
                                        />
                                        {/* Moderate: 25-50% -> 135 to 90 deg */}
                                        <path
                                            d={`M ${cx + r * Math.cos(Math.PI * 0.75)} ${cy - r * Math.sin(Math.PI * 0.25)} A ${r} ${r} 0 0 1 ${cx} ${cy - r}`}
                                            fill="none"
                                            stroke="transparent"
                                            strokeWidth={sw + 10}
                                            className="cursor-pointer"
                                            onMouseEnter={() => setHoveredSegment('moderate')}
                                            onMouseLeave={() => setHoveredSegment(null)}
                                        />
                                        {/* Good: 50-75% -> 90 to 45 deg */}
                                        <path
                                            d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(Math.PI * 0.25)} ${cy - r * Math.sin(Math.PI * 0.25)}`}
                                            fill="none"
                                            stroke="transparent"
                                            strokeWidth={sw + 10}
                                            className="cursor-pointer"
                                            onMouseEnter={() => setHoveredSegment('good')}
                                            onMouseLeave={() => setHoveredSegment(null)}
                                        />
                                        {/* Excellent: 75-100% -> 45 to 0 deg */}
                                        <path
                                            d={`M ${cx + r * Math.cos(Math.PI * 0.25)} ${cy - r * Math.sin(Math.PI * 0.25)} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                                            fill="none"
                                            stroke="transparent"
                                            strokeWidth={sw + 10}
                                            className="cursor-pointer"
                                            onMouseEnter={() => setHoveredSegment('excellent')}
                                            onMouseLeave={() => setHoveredSegment(null)}
                                        />

                                        {/* Needle */}
                                        <g transform={`rotate(${needleRot}, ${cx}, ${cy})`} style={{ transition: 'transform 0.03s linear' }}>
                                            <polygon
                                                points={`${cx + needleLen},${cy} ${cx + 12},${cy - 7.5} ${cx + 12},${cy + 7.5}`}
                                                fill="#1e293b"
                                                filter="url(#needleShadow)"
                                            />
                                            <line
                                                x1={cx}
                                                y1={cy}
                                                x2={cx + needleLen - 7.5}
                                                y2={cy}
                                                stroke="#1e293b"
                                                strokeWidth="6"
                                                strokeLinecap="round"
                                            />
                                        </g>
                                        <circle cx={cx} cy={cy} r="15" fill="#1e293b" />
                                        <circle cx={cx} cy={cy} r="7.5" fill="#64748b" />
                                    </>
                                );
                            })()}
                        </svg>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function CustomerDashboardPage() {
    const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
    const [supportView, setSupportView] = useState<'response' | 'resolution'>('response');

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Customer Dashboard</h2>
                    <p className="text-muted-foreground">
                        Overview of customer metrics
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

            <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                    title="Total Paying Customers"
                    icon={Users}
                    value="2,420"
                    change="10%"
                    changeType="positive"
                    data={totalCustomersData}
                    color="#3B82F6"
                    unit="customers"
                />

                <StatCard
                    title="New Customers"
                    icon={UserPlus}
                    value="150"
                    description="New users from last month"
                    data={newCustomersData}
                    color="#10B981"
                    unit="customers"
                />

                <StatCard
                    title="Lost Customers"
                    icon={UserMinus}
                    value="21"
                    description="Churned users from last month"
                    data={lostCustomersData}
                    color="#EF4444"
                    unit="customers"
                />
            </div>

            {/* Health & Satisfaction Section */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* 4. Customer Status Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Status</CardTitle>
                        <CardDescription>Active vs Risk breakdown</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
                        <div className="space-y-4 w-full sm:w-auto">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Healthy</p>
                                    <p className="text-xs text-muted-foreground">1,800 customers</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-blue-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Neutral</p>
                                    <p className="text-xs text-muted-foreground">575 customers</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">At-Risk</p>
                                    <p className="text-xs text-muted-foreground">45 customers</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-[220px] w-[220px] flex-shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Healthy', value: 1800, color: '#22c55e' },
                                            { name: 'Neutral', value: 575, color: '#3B82F6' },
                                            { name: 'At-Risk', value: 45, color: '#EF4444' },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        <Cell fill="#22c55e" />
                                        <Cell fill="#3B82F6" />
                                        <Cell fill="#EF4444" />
                                    </Pie>
                                    <RechartsTooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border">
                                                        <span className="font-bold">{payload[0].name}: {payload[0].value?.toLocaleString()} customers</span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Overall Health Score */}
                <HealthScoreGauge />
            </div>

            {/* 7. Customer Retention Rate */}
            <Card>
                <CardHeader>
                    <CardTitle>Customer Retention Rate</CardTitle>
                    <CardDescription>Percentage of customers retained over the last 12 months</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={[
                                    { month: 'January', retention: 92 },
                                    { month: 'February', retention: 93 },
                                    { month: 'March', retention: 91 },
                                    { month: 'April', retention: 94 },
                                    { month: 'May', retention: 95 },
                                    { month: 'June', retention: 95 },
                                    { month: 'July', retention: 96 },
                                    { month: 'August', retention: 94 },
                                    { month: 'September', retention: 97 },
                                    { month: 'October', retention: 98 },
                                    { month: 'November', retention: 98 },
                                    { month: 'December', retention: 99 },
                                ]}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <defs>
                                    <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis
                                    dataKey="month"
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}%`}
                                    domain={['auto', 'auto']}
                                />
                                <RechartsTooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                    <div className="font-medium text-foreground mb-1">{label}</div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                        <span className="text-foreground font-medium">Retention:</span>
                                                        <span className="font-extrabold text-foreground">
                                                            {payload[0].value}%
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="retention"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    fill="url(#retentionGradient)"
                                    dot={{ r: 4, fill: '#3B82F6' }}
                                    activeDot={{ r: 6 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* 8 & 9. Growth Metrics (Repeat & Expansion) */}
            <div className="grid md:grid-cols-2 gap-4">
                {/* Repeat Customers */}
                <Card>
                    <CardHeader>
                        <CardTitle>Repeat Customers</CardTitle>
                        <CardDescription>Customer who renewed</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="text-2xl font-bold">1,250 Renewed</div>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={[
                                            { name: 'Monday', value: 15 },
                                            { name: 'Tuesday', value: 25 },
                                            { name: 'Wednesday', value: 20 },
                                            { name: 'Thursday', value: 30 },
                                            { name: 'Friday', value: 22 },
                                            { name: 'Saturday', value: 18 },
                                            { name: 'Sunday', value: 10 },
                                        ]}
                                        margin={{ left: 20, right: 20 }}
                                    >
                                        <defs>
                                            <linearGradient id="repeatGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis
                                            dataKey="name"
                                            stroke="hsl(var(--muted-foreground))"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                        <YAxis hide />
                                        <RechartsTooltip cursor={{ stroke: 'hsl(var(--muted))' }} content={({ active, payload, label }) => { if (active && payload?.length) { return (<div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap"><div className="font-medium text-foreground mb-1">{label}</div><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span><span className="text-foreground font-medium">Renewals:</span><span className="font-extrabold text-foreground">{payload[0].value}</span></div></div>); } return null; }} />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#10B981"
                                            fill="url(#repeatGradient)"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }}
                                            activeDot={{ r: 6, fill: '#10B981', stroke: '#ffffff', strokeWidth: 2 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Expansion Customers */}
                <Card>
                    <CardHeader>
                        <CardTitle>Expansion Customers</CardTitle>
                        <CardDescription>Customer who upgraded plan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="text-2xl font-bold">450 Upgraded</div>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={[
                                            { name: 'Monday', value: 45 },
                                            { name: 'Tuesday', value: 52 },
                                            { name: 'Wednesday', value: 38 },
                                            { name: 'Thursday', value: 65 },
                                            { name: 'Friday', value: 48 },
                                            { name: 'Saturday', value: 35 },
                                            { name: 'Sunday', value: 28 },
                                        ]}
                                        margin={{ left: 20, right: 20 }}
                                    >
                                        <defs>
                                            <linearGradient id="expansionGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis
                                            dataKey="name"
                                            stroke="hsl(var(--muted-foreground))"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                        <YAxis hide />
                                        <RechartsTooltip
                                            cursor={{ stroke: 'hsl(var(--muted))' }}
                                            content={({ active, payload, label }) => {
                                                if (active && payload?.length) {
                                                    const total = payload[0].value as number;
                                                    const basicToPro = Math.floor(total * 0.65);
                                                    const proToEnt = total - basicToPro;
                                                    return (
                                                        <div className="bg-popover text-popover-foreground text-sm rounded-lg shadow-lg border whitespace-nowrap overflow-hidden">
                                                            <div className="px-3 py-2">
                                                                <div className="font-medium text-foreground mb-2">{label}</div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                                                                    <span className="text-foreground font-medium">Total Upgrades:</span>
                                                                    <span className="font-extrabold text-foreground">{total}</span>
                                                                </div>
                                                            </div>
                                                            <div className="border-t bg-muted/20 px-3 py-2 space-y-1">
                                                                <div className="text-xs font-semibold text-muted-foreground mb-1">Details</div>
                                                                <div className="text-xs flex justify-between gap-4 items-center">
                                                                    <span className="text-muted-foreground">Basic → Pro:</span>
                                                                    <span className="font-mono font-medium">{basicToPro}</span>
                                                                </div>
                                                                <div className="text-xs flex justify-between gap-4 items-center">
                                                                    <span className="text-muted-foreground">Pro → Enterprise:</span>
                                                                    <span className="font-mono font-medium">{proToEnt}</span>
                                                                </div>
                                                            </div>
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
                                            fill="url(#expansionGradient)"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 0 }}
                                            activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#ffffff', strokeWidth: 2 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Support & Experience Section */}
            <div className="grid gap-4 md:grid-cols-3">
                {/* 10. Open Support Tickets */}
                <Card>
                    <CardHeader>
                        <CardTitle>Open Support Tickets</CardTitle>
                        <CardDescription>Current ticket backlog</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            {/* Logic: if tickets > 9999, show e.g. 10k */}
                            <div className="text-5xl font-bold tracking-tighter">
                                {1000 > 9999 ? `${Math.floor(1000 / 1000)}k` : 1000} Tickets
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 animate-pulse" />
                                <span className="text-sm font-medium text-muted-foreground">Active Tickets (Last 30 Days)</span>
                            </div>
                        </div>
                        <div className="h-[180px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Question', value: 6, color: '#3B82F6' },
                                            { name: 'Problem', value: 4, color: '#F59E0B' },
                                            { name: 'Request', value: 2, color: '#10B981' },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        <Cell fill="#3B82F6" />
                                        <Cell fill="#F59E0B" />
                                        <Cell fill="#10B981" />
                                    </Pie>
                                    <RechartsTooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border">
                                                        <span className="font-bold">{payload[0].name}: {payload[0].value} tickets</span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Custom Legend */}
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <span className="text-sm font-medium text-muted-foreground">Question</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-amber-500" />
                                <span className="text-sm font-medium text-muted-foreground">Problem</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span className="text-sm font-medium text-muted-foreground">Request</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 11 & 12. Support Performance (Response & Resolution) */}
                <Card className="md:col-span-2 transition-all duration-300 ease-in-out">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Support Performance</CardTitle>
                                <CardDescription>Response speed and resolution timestamps</CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSupportView(supportView === 'response' ? 'resolution' : 'response')}
                                className="transition-all"
                            >
                                {supportView === 'response' ? 'Avg Resolution Time' : 'Avg Response Time'}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {supportView === 'response' ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-muted-foreground">Avg Response Time</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-foreground">45m</span>
                                        <span className="text-xs text-green-600 font-medium flex items-center">
                                            <ArrowDown className="h-3 w-3 mr-0.5" /> 12%
                                        </span>
                                    </div>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={[
                                                { day: 'Monday', value: 45 },
                                                { day: 'Tuesday', value: 42 },
                                                { day: 'Wednesday', value: 38 },
                                                { day: 'Thursday', value: 40 },
                                                { day: 'Friday', value: 35 },
                                                { day: 'Saturday', value: 32 },
                                                { day: 'Sunday', value: 30 },
                                            ]}
                                            margin={{ left: 20, right: 20 }}
                                        >
                                            <defs>
                                                <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                            <XAxis
                                                dataKey="day"
                                                stroke="hsl(var(--muted-foreground))"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <YAxis hide />
                                            <RechartsTooltip cursor={{ stroke: 'hsl(var(--muted))' }} content={({ active, payload, label }) => { if (active && payload?.length) { return (<div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap"><div className="font-medium text-foreground mb-1">{label}</div><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span className="text-foreground font-medium">Response Time:</span><span className="font-extrabold text-foreground">{payload[0].value} min</span></div></div>); } return null; }} />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#3B82F6"
                                                strokeWidth={2}
                                                fill="url(#responseGradient)"
                                                dot={{ r: 3, fill: '#3B82F6' }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-muted-foreground">Avg Resolution Time</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-foreground">4.2h</span>
                                        <span className="text-xs text-green-600 font-medium flex items-center">
                                            <ArrowDown className="h-3 w-3 mr-0.5" /> 5%
                                        </span>
                                    </div>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={[
                                                { day: 'Monday', value: 5.5 },
                                                { day: 'Tuesday', value: 5.0 },
                                                { day: 'Wednesday', value: 4.2 },
                                                { day: 'Thursday', value: 4.5 },
                                                { day: 'Friday', value: 4.0 },
                                                { day: 'Saturday', value: 3.8 },
                                                { day: 'Sunday', value: 3.5 },
                                            ]}
                                            margin={{ left: 20, right: 20 }}
                                        >
                                            <defs>
                                                <linearGradient id="resolutionGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                            <XAxis
                                                dataKey="day"
                                                stroke="hsl(var(--muted-foreground))"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <YAxis hide />
                                            <RechartsTooltip cursor={{ stroke: 'hsl(var(--muted))' }} content={({ active, payload, label }) => { if (active && payload?.length) { return (<div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap"><div className="font-medium text-foreground mb-1">{label}</div><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500"></span><span className="text-foreground font-medium">Resolution Time:</span><span className="font-extrabold text-foreground">{payload[0].value} hrs</span></div></div>); } return null; }} />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#8B5CF6"
                                                strokeWidth={2}
                                                fill="url(#resolutionGradient)"
                                                dot={{ r: 3, fill: '#8B5CF6' }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* 15 & 16. Inactive Customers (Full Width) */}
            <Card>
                <CardHeader>
                    <CardTitle>Inactive Customers</CardTitle>
                    <CardDescription>Shows: No activity in last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="text-5xl font-bold tracking-tighter">85 Customers</div>
                                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-medium bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded w-fit">
                                    <ArrowUp className="h-4 w-4" />
                                    <span>+12% vs last week</span>
                                </div>
                            </div>
                        </div>

                        {/* Chart area */}
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={[
                                        { day: 'Monday, January 22, 2024', value: 65 },
                                        { day: 'Tuesday, January 23, 2024', value: 70 },
                                        { day: 'Wednesday, January 24, 2024', value: 68 },
                                        { day: 'Thursday, January 25, 2024', value: 75 },
                                        { day: 'Friday, January 26, 2024', value: 80 },
                                        { day: 'Saturday, January 27, 2024', value: 82 },
                                        { day: 'Sunday, January 28, 2024', value: 85 },
                                    ]}
                                    margin={{ left: 20, right: 20 }}
                                >
                                    <defs>
                                        <linearGradient id="inactiveGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="day"
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <YAxis hide />
                                    <RechartsTooltip
                                        cursor={{ stroke: 'hsl(var(--muted))' }}
                                        content={({ active, payload, label }) => {
                                            if (active && payload?.length) {
                                                return (
                                                    <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                        <div className="font-medium text-foreground mb-1">{label}</div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                                            <span className="text-foreground font-medium">Inactive:</span>
                                                            <span className="font-extrabold text-foreground">{payload[0].value}</span>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#EF4444"
                                        strokeWidth={3}
                                        fill="url(#inactiveGradient)"
                                        fillOpacity={1}
                                        dot={{ r: 4, fill: '#EF4444', strokeWidth: 0 }}
                                        activeDot={{ r: 6, fill: '#EF4444', stroke: '#ffffff', strokeWidth: 2 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Footer Note */}
                        <p className="text-sm text-muted-foreground pt-1 text-center -mt-4">
                            <span className="font-semibold">Note:</span> 85 customers have not logged in for over 30 days. Recommend sending re-engagement campaign.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
