'use client';

import React from 'react';
import Link from 'next/link';
import {
    Users,
    Palette,
    PenTool,
    Settings,
    Send,
    CheckCircle2,
    ChevronRight,
    ArrowRight,
    Mail,
    LayoutTemplate
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CreateCampaignGuidePage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-20 font-sans selection:bg-primary/20">
            {/* Header / Hero */}
            <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="container max-w-5xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Mail className="h-4 w-4" />
                        Campaign Success Guide
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-2 font-serif animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                        How to Create a Campaign
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        A step-by-step guide to designing, targeting, and launching high-converting email campaigns with Scalerbox.
                    </p>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>

            {/* Guide Content */}
            <div className="container max-w-4xl mx-auto px-4 space-y-16 md:space-y-24">

                {/* Step 1: Audience */}
                <section className="relative group">
                    <div className="hidden md:block absolute -left-16 top-0 text-9xl font-serif font-bold text-foreground/5 select-none -z-10">1</div>
                    <div className="grid md:grid-cols-[1fr,1.5fr] gap-8 md:gap-12 items-start">
                        <div className="space-y-4 md:sticky md:top-24">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                <Users className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight">Define Your Audience</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The foundation of a successful campaign is sending the right message to the right people.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <Card className="border-border/50 shadow-sm overflow-hidden">
                                <CardContent className="p-6 md:p-8">
                                    <h3 className="font-semibold text-lg mb-4">Select or Create a Segment</h3>
                                    <p className="text-muted-foreground text-sm mb-6">
                                        Navigate to the <strong>Audience</strong> tab. You can select an entire list or create a <strong>Smart Segment</strong> based on user behavior (e.g., "Opened last 3 emails" or "Purchased in last 30 days").
                                    </p>
                                    <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                                        <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            Active Subscribers (2,450)
                                        </div>
                                        <div className="h-px bg-border/50 my-3" />
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                                            Churned Users (120)
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Step 2: Template */}
                <section className="relative group">
                    <div className="hidden md:block absolute -left-16 top-0 text-9xl font-serif font-bold text-foreground/5 select-none -z-10">2</div>
                    <div className="grid md:grid-cols-[1fr,1.5fr] gap-8 md:gap-12 items-start">
                        <div className="space-y-4 md:sticky md:top-24">
                            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <LayoutTemplate className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight">Choose a Template</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Don't start from scratch. Use our conversion-optimized templates or code your own.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-6 bg-card border border-border/50 rounded-2xl hover:border-primary/50 transition-colors cursor-default">
                                    <div className="mb-4 aspect-video bg-muted rounded-lg flex items-center justify-center">
                                        <Palette className="w-8 h-8 text-muted-foreground/50" />
                                    </div>
                                    <h4 className="font-semibold mb-1">Visual Builder</h4>
                                    <p className="text-xs text-muted-foreground">Drag-and-drop interface for beautiful, responsive emails.</p>
                                </div>
                                <div className="p-6 bg-card border border-border/50 rounded-2xl hover:border-primary/50 transition-colors cursor-default">
                                    <div className="mb-4 aspect-video bg-muted rounded-lg flex items-center justify-center">
                                        <code className="text-muted-foreground/50 font-mono text-sm">{'<html>'}</code>
                                    </div>
                                    <h4 className="font-semibold mb-1">HTML Editor</h4>
                                    <p className="text-xs text-muted-foreground">Full control for advanced developers and custom designs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Step 3: Design */}
                <section className="relative group">
                    <div className="hidden md:block absolute -left-16 top-0 text-9xl font-serif font-bold text-foreground/5 select-none -z-10">3</div>
                    <div className="grid md:grid-cols-[1fr,1.5fr] gap-8 md:gap-12 items-start">
                        <div className="space-y-4 md:sticky md:top-24">
                            <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                                <PenTool className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight">Craft Your Content</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Write compelling copy and add engaging visuals.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <ul className="space-y-4">
                                <li className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                    <div>
                                        <span className="font-semibold block mb-1">Personalization</span>
                                        <span className="text-sm text-muted-foreground">Use merge tags like <code>{`{{first_name}}`}</code> to make every email feel 1-on-1.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                    <div>
                                        <span className="font-semibold block mb-1">Clear CTA</span>
                                        <span className="text-sm text-muted-foreground">Ensure your call-to-action button is visible and uses action-oriented text.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                    <div>
                                        <span className="font-semibold block mb-1">Mobile Optimized</span>
                                        <span className="text-sm text-muted-foreground">Preview your email on mobile devices within the editor to ensure readability.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Step 4: Settings & Send */}
                <section className="relative group">
                    <div className="hidden md:block absolute -left-16 top-0 text-9xl font-serif font-bold text-foreground/5 select-none -z-10">4</div>
                    <div className="grid md:grid-cols-[1fr,1.5fr] gap-8 md:gap-12 items-start">
                        <div className="space-y-4 md:sticky md:top-24">
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                                <Settings className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight">Configure & Launch</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Final touches before blast off.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <Card className="border-border/50 shadow-sm">
                                <CardContent className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Subject Line</label>
                                        <div className="p-2 bg-muted/50 rounded border border-border text-sm text-muted-foreground">
                                            Unlock 20% off your next purchase inside! 🎁
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Preview Text</label>
                                        <div className="p-2 bg-muted/50 rounded border border-border text-sm text-muted-foreground">
                                            This offer expires in 24 hours...
                                        </div>
                                    </div>
                                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                                        <Button className="w-full sm:w-auto" variant="outline">
                                            Send Test Email
                                        </Button>
                                        <Button className="w-full sm:w-auto gap-2 bg-primary">
                                            <Send className="w-4 h-4" />
                                            Schedule Campaign
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

            </div>

            {/* Footer CTA */}
            <div className="mt-24 border-t border-border/50">
                <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to create your first campaign?</h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Apply what you've learned and start engaging with your audience today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="h-12 px-8 rounded-full text-base gap-2" asChild>
                            <Link href="/email-marketing/campaigns">
                                Go to Campaigns <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="ghost" className="h-12 px-8 rounded-full text-base" asChild>
                            <Link href="/email-marketing/domains">
                                Verify Domain First
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
