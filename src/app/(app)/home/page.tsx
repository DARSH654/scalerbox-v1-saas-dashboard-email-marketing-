'use client';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  MessageSquarePlus,
  Map,
  History,
  DollarSign,
  Plus,
  PenTool,
  Megaphone
} from 'lucide-react';

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
    });

    return () => {
        subscription.unsubscribe();
    };
  }, []);

  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {userName}! 👋</h2>
      </div>

      {/* QUICK STATS (4 card grid) */}
      <h3 className="text-lg font-medium">Quick Stats</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback</CardTitle>
            <MessageSquarePlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roadmap</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 items</div>
            <p className="text-xs text-muted-foreground">3 completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Changelog</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 updates</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.5k</div>
            <p className="text-xs text-muted-foreground">+15%</p>
          </CardContent>
        </Card>
      </div>

      {/* RECENT ACTIVITY (2-column layout) */}
      <h3 className="text-lg font-medium mt-6">Recent Activity</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {/* Latest Feedback */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>📝 Latest Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm font-medium">• Dark mode support</p>
              <p className="text-xs text-muted-foreground">47 votes · Planned</p>
            </div>
            <div>
              <p className="text-sm font-medium">• Export to CSV</p>
              <p className="text-xs text-muted-foreground">34 votes · Open</p>
            </div>
            <Button variant="link" className="px-0 text-xs">View all →</Button>
          </CardContent>
        </Card>

        {/* Roadmap Progress */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>🚀 Roadmap Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>80%</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">In Progress (3):</p>
              <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                <li>User dashboard</li>
                <li>Email templates</li>
                <li>API v2</li>
              </ul>
            </div>
            <Button variant="link" className="px-0 text-xs">View roadmap →</Button>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>📰 Recent Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm font-medium">• "New feature: Tags"</p>
              <p className="text-xs text-muted-foreground">Published 2 days ago</p>
            </div>
            <div>
              <p className="text-sm font-medium">• "Bug fixes v2.1"</p>
              <p className="text-xs text-muted-foreground">Published 5 days ago</p>
            </div>
            <Button variant="link" className="px-0 text-xs">View all posts →</Button>
          </CardContent>
        </Card>

        {/* SaaS Metrics */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>📊 SaaS Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Revenue:</span>
              <span className="font-medium">$12.5k (+15%)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Active users:</span>
              <span className="font-medium">1,234 (+8%)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Churn rate:</span>
              <span className="font-medium">3.2% (-0.5%)</span>
            </div>
            <Button variant="link" className="px-0 text-xs mt-2">View full overview →</Button>
          </CardContent>
        </Card>
      </div>

      {/* QUICK ACTIONS */}
      <h3 className="text-lg font-medium mt-6">Quick Actions</h3>
      <div className="flex gap-4">
        <Button className="gap-2 rounded-full">
          <Plus className="h-4 w-4" /> Add Feedback
        </Button>
        <Button className="gap-2 rounded-full" variant="outline">
          <PenTool className="h-4 w-4" /> Write Post
        </Button>
        <Button className="gap-2 rounded-full" variant="outline">
          <Megaphone className="h-4 w-4" /> Publish Update
        </Button>
      </div>
    </div>
  );
}
