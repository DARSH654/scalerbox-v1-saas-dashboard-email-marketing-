'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Plus,
    ArrowRight,
    Mail,
    CheckCircle,
    Send,
    Megaphone
} from 'lucide-react';

export default function CampaignsPage() {
    return (
        <div className="flex bg-background min-h-screen font-sans text-foreground">
            <main className="flex-1 overflow-y-auto relative z-0 focus:outline-none flex items-center justify-center p-8">
                <div className="max-w-md w-full text-center">
                    {/* Gradient Definition for Icons */}
                    <svg width="0" height="0" className="absolute">
                        <defs>
                            <linearGradient id="blue-purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#2563eb" />
                                <stop offset="100%" stopColor="#9333ea" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="group relative w-64 h-64 mx-auto mb-8 cursor-pointer transition-all duration-300 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 dark:group-hover:bg-primary/10 rounded-full blur-xl transition-all duration-300 scale-110"></div>

                        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-full scale-125 animate-pulse group-hover:animate-none"></div>
                        <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full scale-100 transition-transform duration-300 group-hover:scale-105"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <div className="w-32 h-24 bg-card rounded-lg shadow-xl border border-border relative overflow-hidden z-10 flex items-center justify-center transition-colors duration-300 group-hover:border-primary/30">
                                    <Mail
                                        className="w-16 h-16 transition-transform duration-300 group-hover:scale-110"
                                        style={{ stroke: "url(#blue-purple-gradient)" }}
                                    />
                                </div>
                                <div className="absolute -top-6 -right-6 bg-card p-2 rounded-lg shadow-lg border border-border rotate-12 z-20 transition-transform duration-300 group-hover:rotate-[20deg] group-hover:translate-x-1 group-hover:-translate-y-1">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="absolute -bottom-4 -left-6 bg-card p-2 rounded-lg shadow-lg border border-border -rotate-12 z-20 transition-transform duration-300 group-hover:-rotate-[20deg] group-hover:-translate-x-1 group-hover:translate-y-1">
                                    <Send className="w-5 h-5 text-primary" />
                                </div>
                                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-foreground mb-1">No campaigns created yet</h2>
                    <p className="text-muted-foreground text-lg mb-2 max-w-sm mx-auto leading-relaxed">
                        Ready to engage your audience? Create your first email campaign and start tracking your success today.
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        <Link href="/email-marketing/campaigns/new">
                            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-medium py-6 px-8 text-lg rounded-full shadow-lg shadow-primary/25 transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 border-0">
                                <Plus className="w-5 h-5" />
                                Create Campaign
                            </Button>
                        </Link>
                        <Link href="/createacampaignguide" className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-80 flex items-center gap-1 group transition-all">
                            Learn how to create a campaign
                            <ArrowRight className="w-3 h-3 text-purple-600 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
