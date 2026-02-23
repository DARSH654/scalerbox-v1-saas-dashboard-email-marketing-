
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChurnData {
  month: string;
  revenue: number;
  customer: number;
}

interface Props {
  data: ChurnData[];
}

export function ChurnTrendChart({ data }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[240px] flex items-center justify-center text-muted-foreground">
        Loading chart...
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
        <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-popover text-popover-foreground text-sm px-4 py-3 rounded-lg shadow-lg border min-w-[200px]">
                  <div className="font-medium text-foreground mb-2">{label}</div>
                  <div className="space-y-2">
                    {payload.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-muted-foreground">{entry.name}:</span>
                        </div>
                        <span className="font-extrabold text-foreground">
                          {entry.value}%
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
        <Line type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={3} name="Revenue Churn %" />
        <Line type="monotone" dataKey="customer" stroke="#f59e0b" strokeWidth={3} name="Customer Churn %" />
      </LineChart>
    </ResponsiveContainer>
  );
}
