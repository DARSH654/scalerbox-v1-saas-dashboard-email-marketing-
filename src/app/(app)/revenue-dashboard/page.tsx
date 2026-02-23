
'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar, Sun, TrendingUp, ArrowUp, ArrowDown, Users, UserMinus, UserCheck, BarChart2, DollarSign, CheckCircle, AlertTriangle, RefreshCw, Zap, AlertCircle as AlertCircleIcon, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Area, AreaChart, PieChart, Pie, Cell, Sector, Legend, LineChart, Line } from 'recharts';
import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ChurnTrendChart = dynamic(
  () => import('@/components/churn-trend-chart').then(mod => mod.ChurnTrendChart),
  {
    ssr: false,
    loading: () => <div className="h-full bg-card rounded-xl animate-pulse" />
  }
);


const coreRevenueStats = [
  {
    title: 'Monthly Recurring Revenue',
    value: '$45,800',
    change: '+12.5%',
    changeType: 'positive',
    icon: DollarSign,
  },
  {
    title: 'Annual Recurring Revenue',
    value: '$549,600',
    change: '+15.2%',
    changeType: 'positive',
    icon: Calendar,
  },
  {
    title: 'Revenue Accrued Monthly',
    value: '$52,300',
    change: '+8.3%',
    changeType: 'positive',
    icon: TrendingUp,
  },
  {
    title: 'Revenue Generated Today',
    value: '$1,850',
    change: '-5.2%',
    changeType: 'negative',
    icon: Sun,
  },
];

const data = {
  mrrTrend: [
    { month: 'July', value: 38200 },
    { month: 'August', value: 39800 },
    { month: 'September', value: 41200 },
    { month: 'October', value: 42900 },
    { month: 'November', value: 44100 },
    { month: 'December', value: 45800 }
  ],
  paymentHealth: [
    { name: 'Successful', value: 156 },
    { name: 'Failed', value: 12 },
    { name: 'Refunded', value: 5 },
  ],
  subscriptionTrends: [
    { month: 'July', new: 22, canceled: 10 },
    { month: 'August', new: 25, canceled: 8 },
    { month: 'September', new: 28, canceled: 7 },
    { month: 'October', new: 30, canceled: 6 },
    { month: 'November', new: 26, canceled: 9 },
    { month: 'December', new: 24, canceled: 8 },
  ],
  churnHistory: [
    { month: 'July', revenue: 5.8, customer: 4.9 },
    { month: 'August', revenue: 5.2, customer: 4.5 },
    { month: 'September', revenue: 4.9, customer: 4.2 },
    { month: 'October', revenue: 4.6, customer: 3.9 },
    { month: 'November', revenue: 4.4, customer: 3.7 },
    { month: 'December', revenue: 4.2, customer: 3.5 }
  ],
  insights: [
    { type: 'success', message: 'MRR increased by 12.5% this month! 🎉' },
    { type: 'warning', message: 'Failed payments up by 23% - check payment methods' },
    { type: 'info', message: 'Customer LTV growing steadily at $1,530' }
  ],
};

const subscriberFlowStats = [
  {
    title: "New Subscriptions",
    value: "24",
    change: "+18%",
    changeType: "positive", // Negative change in cancellations is good
    icon: UserMinus
  },
  {
    title: "Canceled Subs",
    value: "8",
    change: "-12.5%",
    changeType: "positive", // Negative change in cancellations is good
    icon: UserMinus
  },
];

const revenueByProviderData = [
  { name: 'Stripe', value: 73.6, amount: '$38.5k', color: '#3B82F6' },
  { name: 'PayPal', value: 8.2, amount: '$4.3k', color: '#10B981' },
  { name: 'Braintree', value: 4.1, amount: '$2.1k', color: '#8B5CF6' },
  { name: 'Chargebee', value: 3.5, amount: '$1.8k', color: '#F59E0B' },
  { name: 'Recurly', value: 2.8, amount: '$1.5k', color: '#EC4899' },
  { name: 'Adyen', value: 2.2, amount: '$1.1k', color: '#14B8A6' },
  { name: '2Checkout', value: 1.5, amount: '$0.8k', color: '#EF4444' },
  { name: 'Square', value: 1.2, amount: '$0.6k', color: '#6366F1' },
  { name: 'Authorize.Net', value: 0.9, amount: '$0.5k', color: '#A855F7' },
  { name: 'Worldpay', value: 0.6, amount: '$0.3k', color: '#F97316' },
  { name: 'Razorpay', value: 0.5, amount: '$0.26k', color: '#22C55E' },
  { name: 'PayU', value: 0.4, amount: '$0.2k', color: '#06B6D4' },
  { name: 'CCAvenue', value: 0.3, amount: '$0.15k', color: '#D946EF' },
  { name: 'Instamojo', value: 0.2, amount: '$0.1k', color: '#84CC16' },
  { name: 'Amazon Pay', value: 0.0, amount: '$0k', color: '#FBBF24' },
  { name: 'GoCardless', value: 0.0, amount: '$0k', color: '#0EA5E9' },
  { name: 'Flutterwave', value: 0.0, amount: '$0k', color: '#F43F5E' },
  { name: 'Trustly', value: 0.0, amount: '$0k', color: '#7C3AED' },
  { name: 'Hiveage', value: 0.0, amount: '$0k', color: '#059669' },
  { name: 'Payoneer', value: 0.0, amount: '$0k', color: '#DC2626' },
];

function PaymentProviderLegend() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const itemsPerPage = 2;
  const totalItems = revenueByProviderData.length;

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

  const visibleItems = revenueByProviderData.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <button
        onClick={handlePrev}
        disabled={!canGoPrev}
        className={cn(
          "w-6 h-6 rounded-full border border-border flex items-center justify-center transition-colors",
          canGoPrev ? "hover:bg-muted cursor-pointer" : "opacity-40 cursor-not-allowed"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div className="flex gap-4">
        {visibleItems.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-extrabold">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className={cn(
          "w-6 h-6 rounded-full border border-border flex items-center justify-center transition-colors",
          canGoNext ? "hover:bg-muted cursor-pointer" : "opacity-40 cursor-not-allowed"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

const customerValueStats = [
  {
    title: "Net Revenue Change",
    value: "$3,200",
    change: "+7.5%",
    changeType: 'positive',
    icon: DollarSign,
    sparklineData: [2800, 2900, 3000, 2950, 3100, 3200]
  },
  {
    title: "Avg Revenue Per User",
    value: "$127.5",
    change: "+5.2%",
    changeType: 'positive',
    icon: UserCheck,
    sparklineData: [115, 118, 120, 122, 125, 127.5]
  },
  {
    title: "Customer Lifetime Value",
    value: "$1,530",
    change: "+8.7%",
    changeType: 'positive',
    icon: BarChart2,
    sparklineData: [1350, 1400, 1420, 1480, 1500, 1530]
  }
];

const COLORS = {
  successful: '#22c55e', // Green-500
  failed: '#eab308',     // Yellow-500
  refunded: '#ef4444',   // Red-500
};



const ChartCard = ({ title, children, className = '' }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-card text-card-foreground rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow h-full", className)}>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);


const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="text-2xl font-bold">
        {payload.value}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="hsl(var(--muted-foreground))" className="text-sm">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4} // Slightly expand on hover
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const renderProviderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="text-2xl font-bold">
        {`${payload.value}%`}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="hsl(var(--muted-foreground))" className="text-sm">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};


export default function RevenueDashboardPage() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [providerActiveIndex, setProviderActiveIndex] = React.useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onProviderPieEnter = (_: any, index: number) => {
    setProviderActiveIndex(index);
  };

  const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Revenue &amp; Money Dashboard</h2>
          <p className="text-muted-foreground">
            An overview of your core revenue metrics.
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
        {coreRevenueStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span>{stat.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  className={cn(
                    'flex items-center gap-1',
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {stat.changeType === 'positive' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {stat.change}
                </span>
                <span>vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <ChartCard title="MRR Trend">
            <ResponsiveContainer width="100%" height={340}>
              <AreaChart data={data.mrrTrend}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--foreground))', fontWeight: 'normal' }}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--foreground))', fontWeight: 'normal' }} tickFormatter={(value) => `$${(value / 1000)}k`} />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                          <div className="font-medium text-foreground mb-1">{label}</div>
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                            <span className="text-foreground font-medium">MRR:</span>
                            <span className="font-extrabold text-foreground">
                              ${payload[0].value?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorMrr)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <ChartCard title="Revenue by Payment Provider">
            <div className="flex flex-col items-center justify-center pt-0">
              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueByProviderData}
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {revenueByProviderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                              <span className="font-extrabold">{payload[0].value}%</span>
                              <span className="ml-1 font-medium text-muted-foreground">{payload[0].name}</span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <PaymentProviderLegend />
            </div>
          </ChartCard>
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {customerValueStats.map(stat => (
            <Card key={stat.title} className="cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={cn('flex items-center gap-1', stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600')}>
                        {stat.changeType === 'positive' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {stat.change}
                      </span>
                      <span>vs last period</span>
                    </div>
                  </div>
                  <div className="w-24 h-14">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stat.sparklineData.map((value, index) => ({ value, index }))}>
                        <defs>
                          <linearGradient id={`sparkGradient-${stat.title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
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
                                  <span className="font-extrabold">${payload[0].value?.toLocaleString()}</span>
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
                          fill={`url(#sparkGradient-${stat.title.replace(/\s+/g, '')})`}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="col-span-12 lg:col-span-8">
          <ChartCard title="Subscription Trends">
            <ResponsiveContainer width="100%" height={380}>
              <AreaChart data={data.subscriptionTrends}>
                <defs>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCanceled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                          <div className="font-medium text-foreground mb-1">{label}</div>
                          <div className="space-y-1">
                            {payload.map((entry, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: entry.name === 'New Subscriptions' ? '#22c55e' : 'hsl(var(--destructive))' }}
                                />
                                <span className="text-xs text-muted-foreground">{entry.name}:</span>
                                <span
                                  className="font-extrabold text-foreground"
                                >
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
                <Area type="monotone" dataKey="new" name="New Subscriptions" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" />
                <Area type="monotone" dataKey="canceled" name="Canceled Subs" stroke="hsl(var(--destructive))" strokeWidth={3} fillOpacity={1} fill="url(#colorCanceled)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <ChartCard title="Payment Health">
            <div className="flex flex-col xl:grid xl:grid-cols-2 gap-4 h-full">
              <div className="col-span-1 h-[220px] xl:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.paymentHealth}
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {data.paymentHealth.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                              <span className="font-medium">{payload[0].name}:</span>
                              {' '}
                              <span className="font-extrabold">
                                {payload[0].value?.toLocaleString()} {Number(payload[0].value) === 1 ? 'payment' : 'payments'}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-1 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 xl:-translate-y-[27px]">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="text-sm font-semibold">Successful</p>
                    <p className="text-lg font-bold">156 <span className="text-xs font-normal text-muted-foreground">(92.9%)</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 xl:-translate-y-[27px]">
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                  <div>
                    <p className="text-sm font-semibold">Failed Payments</p>
                    <p className="text-lg font-bold">12 <span className="text-xs font-normal text-muted-foreground">($2,400)</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 xl:-translate-y-[27px]">
                  <RefreshCw className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold">Refunds Issued</p>
                    <p className="text-lg font-bold">5 <span className="text-xs font-normal text-muted-foreground">($890)</span></p>
                  </div>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <ChartCard title="Churn Trends">
            <div className="w-full h-[280px]">
              <ChurnTrendChart data={data.churnHistory} />
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
