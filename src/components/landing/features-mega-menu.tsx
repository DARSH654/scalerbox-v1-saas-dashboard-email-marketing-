"use client";

import React, { useState } from "react";
import {
    BookOpen,
    BarChart2,
    MessageSquare,
    Users,
    RefreshCw,
    CalendarClock,
    Globe,
    LayoutDashboard,
    TrendingUp,
    DollarSign,
    FileText,
    Sparkles,
    Edit,
    BookText,
    Share2,
    ShieldCheck,
    Zap,
    Bot,
    Layers,
    FileUp,
    Activity,
    PieChart,
    Search,
    Link as LinkIcon,
    Image as ImageIcon,
    RotateCcw,
    Lock,
    Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define the content structure
export const categories = [
    {
        id: "blog",
        label: "Blog Automation",
        icon: BookOpen,
        description: "Automate and scale your content engine.",
    },
    {
        id: "analytics",
        label: "SaaS Analytics",
        icon: BarChart2,
        description: "Unified command center for your growth.",
    },
    {
        id: "chat",
        label: "Multi AI Chat",
        icon: MessageSquare,
        description: "Access 50+ AI models at once.",
    },
    {
        id: "team",
        label: "Team Collaboration",
        icon: Users,
        description: "Work together with roles and shared spaces.",
    },
];

export type ItemColor = "blue" | "purple" | "green" | "orange" | "pink" | "indigo" | "cyan" | "red" | "yellow" | "violet" | "amber" | "rose" | "sky" | "slate" | "emerald" | "teal" | "fuchsia" | "lime";

export interface ContentItem {
    icon: any;
    title: string;
    description: string;
    color: ItemColor;
}

export const contentMap: Record<string, { title: string; items: ContentItem[] }> = {
    blog: {
        title: "Blog Automation",
        items: [
            {
                icon: Globe,
                title: "Multiple Integrations",
                description: "Connect WordPress, Ghost, Medium, and more.",
                color: "blue",
            },
            {
                icon: RefreshCw,
                title: "Integration Ecosystem",
                description: "Seamlessly connect with your entire tech stack.",
                color: "purple",
            },
            {
                icon: Layers,
                title: "Multiple Blog Sites",
                description: "Manage and publish to unlimited sites at once.",
                color: "pink",
            },
            {
                icon: CalendarClock,
                title: "Bulk Scheduling",
                description: "Schedule weeks of content in a single click.",
                color: "green",
            },
            {
                icon: Search,
                title: "SEO Optimization",
                description: "Auto-generate meta tags, titles, and keyword-rich content.",
                color: "orange",
            },
            {
                icon: LinkIcon,
                title: "Auto-Interlinking",
                description: "Smartly link relevant posts to boost site authority.",
                color: "cyan",
            },
            {
                icon: ImageIcon,
                title: "Image Generation",
                description: "Create unique, AI-generated featured images for every post.",
                color: "violet",
            },
            {
                icon: RotateCcw,
                title: "Content Refresh",
                description: "Automatically update old posts to keep them fresh and relevant.",
                color: "red",
            },
        ],
    },
    analytics: {
        title: "Unified Analytics Command Center",
        items: [
            {
                icon: LayoutDashboard,
                title: "Overview Dashboard",
                description: "Bird's-eye view of your entire product portfolio.",
                color: "indigo",
            },
            {
                icon: DollarSign,
                title: "Revenue Dashboard",
                description: "Track MRR, ARR, and churn in real-time.",
                color: "emerald",
            },
            {
                icon: TrendingUp,
                title: "Growth Dashboard",
                description: "Deep dive into user acquisition and retention.",
                color: "cyan",
            },
            {
                icon: Package,
                title: "Product Dashboard",
                description: "Analyze product metrics and feature usage.",
                color: "blue",
            },
            {
                icon: Users,
                title: "Customer Dashboard",
                description: "360° view of customer activity and health scores.",
                color: "pink",
            },
            {
                icon: Activity,
                title: "Real-Time Activity",
                description: "Monitor live user interactions and events.",
                color: "amber",
            },
            {
                icon: PieChart,
                title: "Churn Analysis",
                description: "Understand why users leave and how to keep them.",
                color: "red",
            }
        ],
    },
    chat: {
        title: "Access 50+ AI Models at Once",
        items: [
            {
                icon: Bot,
                title: "Unified Chat Interface",
                description: "Access GPT-4o, Claude, and Gemini in one chat.",
                color: "violet",
            },
            {
                icon: Zap,
                title: "Goodbye Rate Limits",
                description: "Uninterrupted access to top-tier models.",
                color: "yellow",
            },
            {
                icon: Users,
                title: "Create Multiple Personas",
                description: "Custom AI agents for Marketing, Coding, etc.",
                color: "fuchsia",
            },
            {
                icon: FileText,
                title: "Document Editor",
                description: "Write and export articles directly from chat.",
                color: "rose",
            },
            {
                icon: Sparkles,
                title: "Prompt Enhancer",
                description: "Turn vague ideas into structured prompts.",
                color: "orange",
            },
            {
                icon: Edit,
                title: "Real-Time Edits",
                description: "Edit inputs and outputs on the fly.",
                color: "teal",
            },
            {
                icon: BookText,
                title: "Prompt Library",
                description: "Save and reuse your best prompts instantly.",
                color: "lime",
            },
        ],
    },
    team: {
        title: "Team Collaboration",
        items: [
            {
                icon: Share2,
                title: "Instant Team Invitation",
                description: "Onboard members with a single link.",
                color: "sky",
            },
            {
                icon: LinkIcon,
                title: "Exception Rules",
                description: "Define granular exception rules to ensure precise AI outputs, carefully handling edge cases and maintaining strict control over generated responses for maximum accuracy.",
                color: "emerald",
            },
            {
                icon: Globe,
                title: "Shared Team Context",
                description: "Define global instructions to ensure consistent brand voice across all team chats.",
                color: "blue",
            },
            {
                icon: ShieldCheck,
                title: "Role-Based Workspace",
                description: "Granular permissions for admins and viewers.",
                color: "slate",
            },
            {
                icon: Lock,
                title: "Personal Private Space",
                description: "Keep personal projects separate from team view.",
                color: "pink",
            },
            {
                icon: BookOpen,
                title: "Shared Prompt Library",
                description: "Standardize optimal prompts across your team.",
                color: "orange",
            },
            {
                icon: BarChart2,
                title: "Team Usage Analytics",
                description: "Track token usage and costs per member.",
                color: "teal",
            },
        ],
    },
};

// Maps color names to specific tailwind class strings
export const colorClasses: Record<ItemColor, string> = {
    blue: "bg-blue-500/10 text-blue-500",
    purple: "bg-purple-500/10 text-purple-500",
    green: "bg-green-500/10 text-green-500",
    orange: "bg-orange-500/10 text-orange-500",
    pink: "bg-pink-500/10 text-pink-500",
    indigo: "bg-indigo-500/10 text-indigo-500",
    cyan: "bg-cyan-500/10 text-cyan-500",
    red: "bg-red-500/10 text-red-500",
    yellow: "bg-yellow-500/10 text-yellow-500",
    violet: "bg-violet-500/10 text-violet-500",
    amber: "bg-amber-500/10 text-amber-500",
    rose: "bg-rose-500/10 text-rose-500",
    sky: "bg-sky-500/10 text-sky-500",
    slate: "bg-slate-500/10 text-slate-500",
    emerald: "bg-emerald-500/10 text-emerald-500",
    teal: "bg-teal-500/10 text-teal-500",
    fuchsia: "bg-fuchsia-500/10 text-fuchsia-500",
    lime: "bg-lime-500/10 text-lime-500",
};


export function FeaturesMegaMenu() {
    const [activeCategory, setActiveCategory] = useState<keyof typeof contentMap>("blog");

    return (
        <div className="flex w-[900px] min-h-[450px] bg-background/95 backdrop-blur-3xl rounded-2xl border border-white/20 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 overflow-hidden">
            {/* Sidebar - Categories */}
            <div className="w-[280px] bg-muted/30 border-r border-white/10 flex flex-col p-4 space-y-2">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.id as keyof typeof contentMap)}
                        className={cn(
                            "group flex items-start gap-4 p-3 rounded-xl transition-all duration-200 cursor-pointer",
                            activeCategory === cat.id
                                ? "bg-gradient-to-r from-blue-500/10 to-purple-600/10"
                                : "hover:bg-white/5"
                        )}
                    >
                        <div
                            className={cn(
                                "p-2 rounded-lg transition-colors",
                                activeCategory === cat.id
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                    : "bg-muted text-muted-foreground group-hover:bg-white/10 group-hover:text-foreground"
                            )}
                        >
                            <cat.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h4
                                className={cn(
                                    "text-sm font-semibold mb-1 transition-colors",
                                    activeCategory === cat.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                )}
                            >
                                {cat.label}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">
                                {cat.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Area - Right Side */}
            <div className="flex-1 bg-background/50 flex flex-col">
                <div className="p-8 pt-6 grid grid-cols-2 gap-4 auto-rows-min overflow-y-auto pr-2 custom-scrollbar pb-4">
                    {contentMap[activeCategory].items.map((item, index) => (
                        <div
                            key={index}
                            className="flex gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all group/item cursor-pointer"
                        >
                            <div className={cn(
                                "flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200",
                                colorClasses[item.color]
                            )}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h5 className="text-sm font-semibold text-foreground mb-1 transition-colors">
                                    {item.title}
                                </h5>
                                <p className="text-[10px] text-muted-foreground leading-tight">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
