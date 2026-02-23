"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
    ChevronDown,
    Menu,
    ShieldCheck,
    Lock,
    KeyRound,
    Database,
    BookLock,
    Eye,
    Globe,
    Activity,
    Users,
    MessageSquare,
    Zap,
    Layers,
    ArrowRight,
    Sun,
    Moon,
    FileText,
    Mail,
    Phone,
    MapPin,
    Search,
    CheckCircle2,
    Briefcase,
    ShieldAlert,
    Gavel,
    StickyNote,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { FeaturesMegaMenu } from '@/components/landing/features-mega-menu';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import StarBorder from "@/components/ui/star-border";
import GlareHover from '@/components/GlareHover.jsx';
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'definitions', title: '2. Definitions' },
    { id: 'information-collection', title: '3. Information Collection' },
    { id: 'usage', title: '4. How We Use Information' },
    { id: 'ai-data', title: '5. AI & Data Processing' },
    { id: 'integrations', title: '6. Third-Party Integrations' },
    { id: 'analytics', title: '7. Analytics & Performance' },
    { id: 'team', title: '8. Team Collaboration' },
    { id: 'security', title: '9. Security Infrastructure' },
    { id: 'retention', title: '10. Data Retention' },
    { id: 'rights', title: '11. Your Data Rights' },
    { id: 'compliance', title: '12. Global Compliance' },
    { id: 'contact', title: '13. Contact Information' },
];

export default function PrivacyPolicyPage() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('introduction');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [contactForm, setContactForm] = useState({ name: '', email: '', query: '' });
    const [showThemeToggle, setShowThemeToggle] = useState(false);
    const [isNearFooter, setIsNearFooter] = useState(false);
    const footerRef = useRef<HTMLDivElement>(null);

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isFormValid = contactForm.name.trim() !== '' &&
        isValidEmail(contactForm.email) &&
        contactForm.query.trim() !== '' &&
        contactForm.name.length <= 50 &&
        contactForm.query.length <= 500;

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsAtTop(currentScrollY < 100);

            if (currentScrollY > lastScrollY.current + 10) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current - 10) {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;

            const sectionElements = sections.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + 200;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const el = sectionElements[i];
                if (el && scrollPosition >= el.offsetTop) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // IntersectionObserver for footer detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsNearFooter(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.1, // Trigger when 10% of footer is visible
            }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    if (!mounted) return null;

    return (
        <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
            {/* Header SVG Definition */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Navigation Bar */}
            <div className={`fixed top-6 left-0 right-0 z-50 w-full flex justify-center px-4 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-32'}`}>
                <header className="w-full max-w-5xl h-16 flex items-center justify-between shadow-lg bg-background/80 backdrop-blur-xl rounded-full px-6 border border-white/20 transition-all hover:shadow-2xl hover:border-primary/20">
                    <Link href="/" className="flex items-center justify-center font-bold text-lg" prefetch={false}>
                        <Image src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png" alt="Scalerbox Logo" width={40} height={40} className="" />
                        Scalerbox
                    </Link>
                    <nav className="hidden lg:flex items-center gap-1">
                        <div className="relative group">
                            <div className="text-sm font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all flex items-center gap-1 cursor-pointer">
                                Features
                                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                            </div>
                            <div className="absolute top-full -left-20 mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-left z-50 translate-y-2 group-hover:translate-y-0">
                                <FeaturesMegaMenu />
                            </div>
                        </div>
                        <Link href="/scalerboxblogs" className="text-sm font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all">
                            Scalerbox Blogs
                        </Link>
                        <Link href="/roadmap" className="text-sm font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all">
                            Roadmap
                        </Link>
                        <Link href="/about" className="text-sm font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all">
                            About Scalerbox
                        </Link>
                    </nav>
                    <div className="flex items-center gap-2">
                        <StarBorder className="rounded-full" color="#8b5cf6" speed="6s">
                            <Button variant="default" className="hidden lg:flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-none text-white hover:opacity-90" onClick={() => setIsContactDialogOpen(true)}>
                                Contact Privacy Team
                            </Button>
                        </StarBorder>
                        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="lg:hidden rounded-full">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="top" className="w-full h-fit py-10 px-6">
                                <div className="grid gap-6 text-center">
                                    <Link href="/#features" className="text-lg font-semibold">Features</Link>
                                    <Link href="/scalerboxblogs" className="text-lg font-semibold">Blogs</Link>
                                    <Link href="/roadmap" className="text-lg font-semibold">Roadmap</Link>
                                    <Link href="/about" className="text-lg font-semibold">About</Link>
                                    <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white" onClick={() => { setIsContactDialogOpen(true); setIsMenuOpen(false); }}>Contact Privacy Team</Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </header>
            </div>

            {/* Main Content */}
            <main className="flex-1 pt-32 pb-20">
                <div className="container max-w-7xl mx-auto px-4 md:px-6">

                    {/* Page Header */}
                    <div className="flex flex-col items-center text-center mb-20">
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 mb-6 antialiased">
                                <ShieldCheck className="h-4 w-4 text-white" />
                                Scalerbox Trust & Security
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-2 font-serif">
                                Privacy Policy
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                                Our commitment to your data privacy is absolute. This document outlines how Scalerbox handles information across our AI-powered ecosystem, ensuring transparency, security, and full user sovereignty.
                            </p>
                            <div className="flex items-center gap-4 mt-8 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Last Updated: Jan 2, 2026</span>
                                <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                                <span className="flex items-center gap-1"><Gavel className="h-4 w-4" /> Version 2.4</span>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 relative">
                        {/* Progressive Navigation Sidebar */}
                        <aside className="hidden lg:block w-72 shrink-0">
                            <div className="sticky top-28 space-y-8">
                                <div className="p-6 bg-card/50 backdrop-blur-sm rounded-[2.5rem] border border-border/50 shadow-2xl">
                                    <h3 className="font-bold text-lg mb-4 px-2 tracking-tight">Navigation</h3>
                                    <nav className="space-y-1">
                                        {sections.map((section) => (
                                            <button
                                                key={section.id}
                                                onClick={() => scrollToSection(section.id)}
                                                className={cn(
                                                    "w-full text-left px-4 py-2.5 rounded-2xl text-sm transition-all duration-200 flex items-center gap-3 group",
                                                    activeSection === section.id
                                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 font-medium"
                                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                )}
                                            >
                                                {section.title.split('. ')[1]}
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-[2.5rem] border border-primary/20">
                                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                        <Mail className="h-4 w-4" style={{ stroke: "url(#primaryGradient)" }} />
                                        Legal Concierge
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                                        Have a specific question about our data handling? Our privacy team is here to assist.
                                    </p>
                                    <Button className="w-full rounded-full text-sm font-bold h-11 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:opacity-90 transition-all shadow-lg shadow-purple-500/20" onClick={() => {
                                        setShowSuccess(false);
                                        setIsContactDialogOpen(true);
                                    }}>
                                        Contact Privacy Team
                                    </Button>
                                </div>
                            </div>
                        </aside>

                        {/* Comprehensive Policy Sections */}
                        <div className="flex-1 max-w-4xl space-y-24">

                            <section id="introduction" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                            <ShieldCheck className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">1. Introduction</h2>
                                    </div>
                                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed antialiased">
                                        <p>
                                            Welcome to Scalerbox. Your privacy is not just a policy for us; it is the core foundation upon which our software is built. This Comprehensive Privacy Policy ("Policy") governs the manner in which Scalerbox ("we", "us", "our") collects, uses, maintains, and discloses information collected from users (each, a "User") of the Scalerbox platform, including our website, mobile applications, and browser extensions (collectively, the "Platform").
                                        </p>
                                        <p>
                                            In an era where Artificial Intelligence is transforming how we work and create, data sovereignty has never been more critical. Scalerbox is designed as a secure "wrapper" around the world's most powerful AI models, providing entrepreneurs with a unified command center that respects their intellectual property and private communications.
                                        </p>
                                        <div className="grid md:grid-cols-3 gap-4 my-10 not-prose">
                                            {[
                                                { icon: Lock, title: "Zero Training", desc: "Your data never fuels AI development." },
                                                { icon: KeyRound, title: "Vault Security", desc: "Military-grade encryption for all tokens." },
                                                { icon: Eye, title: "Full Transparency", desc: "Real-time logs of all data transmissions." }
                                            ].map((item, i) => (
                                                <div key={i} className="p-6 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-[2rem] border border-primary/20 flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
                                                    <item.icon className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                                    <h4 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-sm mb-1">{item.title}</h4>
                                                    <p className="text-xs leading-tight text-muted-foreground">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <p>
                                            By accessing or using our Platform, you acknowledge that you have read, understood, and agreed to the practices described in this Policy. If you do not agree with any part of this Policy, you must refrain from using our services.
                                        </p>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="definitions" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                            <BookLock className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">2. Definitions</h2>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6 mt-8">
                                        {[
                                            { term: "User Data", def: "Any information you upload, input, or generate within the Platform, including prompts, documents, and blog drafts." },
                                            { term: "AI Providers", def: "Third-party entities like OpenAI, Anthropic, or DeepSeek through which AI requests are processed." },
                                            { term: "Service", def: "The full suite of Scalerbox features, including Multi-AI Chat, Blog Automation, and Analytics." },
                                            { term: "Metadata", def: "Non-identifiable technical data such as log files, browser versions, and interaction timestamps." },
                                            { term: "PII", def: "Personally Identifiable Information, such as your email, name, and billing details." },
                                            { term: "Encrypted Token", def: "A secure digital key used to communicate with integrated third-party platforms like WordPress or Shopify." }
                                        ].map((item, i) => (
                                            <div key={i} className="p-6 border border-border/60 rounded-[2.5rem] hover:bg-accent/30 transition-all group overflow-hidden">
                                                <div className="inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
                                                    {item.term}
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed m-0">{item.def}</p>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="information-collection" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                            <Layers className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">3. Information Collection</h2>
                                    </div>
                                    <div className="space-y-12">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                                <span className="text-emerald-500">3.1</span> Direct Information
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                We collect information that you voluntarily provide when creating an account, subscribing to a plan, or communicating with our support team. This includes:
                                            </p>
                                            <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 mt-6">
                                                {[
                                                    "Legal name and primary email address",
                                                    "Business branding and industry details",
                                                    "Billing address and payment instrument metadata",
                                                    "Support tickets and feedback submissions"
                                                ].map((li, i) => (
                                                    <li key={i} className="flex gap-3 bg-muted/40 p-4 rounded-2xl text-sm font-medium">
                                                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> {li}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                                <span className="text-emerald-500">3.2</span> AI Context & Content
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed mb-6">
                                                To facilitate the core functionality of Scalerbox, we process and store the content you interact with. This data is the most sensitive part of our ecosystem:
                                            </p>
                                            <Card className="rounded-[2.5rem] border-border/50 bg-emerald-500/[0.02] overflow-hidden">
                                                <CardContent className="p-8">
                                                    <div className="space-y-6">
                                                        <div className="flex gap-4">
                                                            <MessageSquare className="h-6 w-6 text-emerald-500 shrink-0 mt-1" />
                                                            <div>
                                                                <h5 className="font-bold mb-1">Prompt History</h5>
                                                                <p className="text-sm text-muted-foreground">Detailed logs of your interactions with AI models to power features like Branching, History Search, and Chat Persistence.</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <StickyNote className="h-6 w-6 text-emerald-500 shrink-0 mt-1" />
                                                            <div>
                                                                <h5 className="font-bold mb-1">Document Drafts</h5>
                                                                <p className="text-sm text-muted-foreground">In-progress and completed blog posts, articles, and marketing copy generated or edited within the Scalerbox Editor.</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <Users className="h-6 w-6 text-emerald-500 shrink-0 mt-1" />
                                                            <div>
                                                                <h5 className="font-bold mb-1">Personas & Instructions</h5>
                                                                <p className="text-sm text-muted-foreground">The specific 'Global Instructions' and 'Brand Voice' definitions used to tailor AI outputs to your business needs.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                                <span className="text-emerald-500">3.3</span> Indirect & Technical Data
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Like most modern SaaS platforms, we automatically collect technical information during your visit. This is used solely for security monitoring and platform optimization:
                                            </p>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                                                {["IP Address", "Browser Type", "OS Details", "Geographic Data", "Session Length", "Error Logs", "API Latency", "Device ID"].map((item, i) => (
                                                    <div key={i} className="text-center py-4 bg-muted/20 border border-border/40 rounded-2xl text-[10px] uppercase font-bold tracking-tighter text-muted-foreground">
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="usage" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-orange-500/10 flex items-center justify-center text-orange-600 shadow-inner">
                                            <Zap className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">4. How We Use Information</h2>
                                    </div>
                                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                                        <p>Scalerbox utilizes your information through a combination of automated processing and, in rare support scenarios, manual review. Our primary goal is to deliver a seamless, high-performance experience without ever compromising your privacy.</p>

                                        <div className="grid md:grid-cols-2 gap-8 my-10">
                                            <div className="space-y-4">
                                                <h4 className="flex items-center gap-2 text-foreground font-bold">
                                                    <Briefcase className="h-5 w-5 text-orange-500" />
                                                    Service Fulfillment
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    We process data to generate AI responses, sync with your blog sites (WordPress/Webflow), and aggregate your SaaS metrics. This includes routing prompts to LLM providers and fetching analytics from payment gateways.
                                                </p>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="flex items-center gap-2 text-foreground font-bold">
                                                    <ShieldAlert className="h-5 w-5 text-orange-500" />
                                                    Integrity & Security
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    We use log data to detect fraudulent activity, prevent system abuse (such as bot attacks), and ensure the security of your account and the broader Platform ecosystem.
                                                </p>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="flex items-center gap-2 text-foreground font-bold">
                                                    <Activity className="h-5 w-5 text-orange-500" />
                                                    Platform Innovation
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    By analyzing anonymized interaction patterns, we determine which features (like specific AI models or blog templates) are most valuable to our users, allowing us to prioritize our roadmap accordingly.
                                                </p>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="flex items-center gap-2 text-foreground font-bold">
                                                    <Mail className="h-5 w-5 text-orange-500" />
                                                    Strategic Communication
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    We notify you about critical security updates, new feature launches, and account-related transactions (e.g., invoice summaries or subscription changes).
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="ai-data" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-blue-600/10 flex items-center justify-center text-blue-700 shadow-inner">
                                            <MessageSquare className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">5. AI & Data Processing</h2>
                                    </div>

                                    <div className="p-10 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent rounded-[3rem] border border-blue-500/20 shadow-2xl relative overflow-hidden">
                                        <div className="relative z-10">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-600 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
                                                Enterprise-Grade AI Security
                                            </div>
                                            <h3 className="text-2xl font-bold mb-6">The "Immutable Privacy" Standard</h3>
                                            <div className="space-y-8 text-muted-foreground">
                                                <div className="flex gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/5">
                                                        <Eye className="h-6 w-6 text-blue-500" />
                                                    </div>
                                                    <div>
                                                        <h5 className="text-foreground font-bold mb-2">Non-Training Agreement</h5>
                                                        <p className="text-sm leading-relaxed">
                                                            We interact with AI providers through their **Enterprise/API tiers**. These agreements explicitly state that data submitted via these channels is **not** used to train the providers' public or private foundational models. Your strategic insights remain yours exclusively.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/5">
                                                        <Lock className="h-6 w-6 text-purple-500" />
                                                    </div>
                                                    <div>
                                                        <h5 className="text-foreground font-bold mb-2">Zero Data Persistence</h5>
                                                        <p className="text-sm leading-relaxed">
                                                            We utilize "Zero Persistence" configurations where supported. This means that while the AI provider processes your request to generate an answer, they do not store the prompt text once the response has been delivered.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/5">
                                                        <Globe className="h-6 w-6 text-teal-500" />
                                                    </div>
                                                    <div>
                                                        <h5 className="text-foreground font-bold mb-2">Global Model Routing</h5>
                                                        <p className="text-sm leading-relaxed">
                                                            Whether you are using GPT-4o, Claude 3.5, Gemini 1.5, or DeepSeek, every request is encrypted in transit using TLS 1.3 and is subject to the same rigorous protection standards.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="integrations" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-cyan-500/10 flex items-center justify-center text-cyan-600 shadow-inner">
                                            <Layers className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">6. Third-Party Integrations</h2>
                                    </div>
                                    <div className="space-y-10">
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            Scalerbox connects to your existing toolchain to automate content publishing and growth tracking. Each connection is governed by strict security protocols:
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="p-8 bg-card rounded-[2rem] border border-border/50">
                                                <h4 className="font-bold flex items-center gap-3 mb-4">
                                                    <Globe className="h-5 w-5 text-cyan-500" />
                                                    CMS Ecosystem
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    When you link **WordPress, Webflow, Shopify, or Ghost**, Scalerbox stores your API credentials in an isolated, encrypted vault. We only access these credentials to execute publishing or drafting commands initiated by you or your automated schedules.
                                                </p>
                                            </div>
                                            <div className="p-8 bg-card rounded-[2rem] border border-border/50">
                                                <h4 className="font-bold flex items-center gap-3 mb-4">
                                                    <Users className="h-5 w-5 text-cyan-500" />
                                                    Social & Media
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    For **X (Twitter) and LinkedIn** integrations, we utilize official OAuth 2.0 flows. This means we never see your actual password; we only receive a temporary, restricted token that you can revoke at any time from the provider's own settings.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-8 bg-orange-500/5 rounded-[2rem] border border-orange-500/20">
                                            <h4 className="font-bold text-orange-600 mb-2">Note on Integrations:</h4>
                                            <p className="text-sm text-muted-foreground m-0">
                                                Scalerbox is not responsible for the privacy practices of third-party platforms. We encourage you to review the privacy policies of any service you connect to our Platform to understand how they handle your data on their end.
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="analytics" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-indigo-500/10 flex items-center justify-center text-indigo-600 shadow-inner">
                                            <Activity className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">7. Analytics & Performance</h2>
                                    </div>
                                    <div className="space-y-8">
                                        <p className="text-lg text-muted-foreground">
                                            Our **Unified Analytics Command Center** aggregates growth data from multiple sources to give you a bird's-eye view of your business.
                                        </p>
                                        <div className="space-y-6">
                                            <div className="flex gap-5 p-6 border-b border-border/60">
                                                <CheckCircle2 className="h-6 w-6 text-indigo-500 shrink-0" />
                                                <div>
                                                    <h5 className="font-bold mb-1">Financial Data (Stripe, PayPal, Braintree, Chargebee, Recurly, Adyen, Square and 6 more)</h5>
                                                    <p className="text-sm text-muted-foreground">We pull high-level metrics like MRR, Churn Rate, and LTV. Scalerbox **never** stores customer credit card numbers, CVVs, or bank account details locally. All financial transactions are handled by the payment processors themselves.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-5 p-6 border-b border-border/60">
                                                <CheckCircle2 className="h-6 w-6 text-indigo-500 shrink-0" />
                                                <div>
                                                    <h5 className="font-bold mb-1">Growth Tracking (Google Analytics/Search Console)</h5>
                                                    <p className="text-sm text-muted-foreground">We aggregate traffic and conversion data to display alongside your content performance. This data is updated periodically via read-only API access.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-5 p-6">
                                                <CheckCircle2 className="h-6 w-6 text-indigo-500 shrink-0" />
                                                <div>
                                                    <h5 className="font-bold mb-1">Internal Usage Metrics</h5>
                                                    <p className="text-sm text-muted-foreground">We track Platform performance using our own custom event-tracking snippet. This helps us identify slow API response times or UI elements that cause confusion, allowing us to maintain the "Efficient Workflow" promise.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="team" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-pink-500/10 flex items-center justify-center text-pink-600 shadow-inner">
                                            <Users className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">8. Team Collaboration</h2>
                                    </div>
                                    <div className="space-y-8 text-muted-foreground leading-relaxed">
                                        <p>Scalerbox provides robust collaboration tools for teams of all sizes. When you use these features, additional privacy dynamics come into play:</p>
                                        <div className="grid sm:grid-cols-2 gap-8">
                                            {[
                                                { title: "Shared Workspaces", text: "Administrators can see which team members are active and view usage statistics. However, specific chat contents can be restricted using 'Private Space' settings." },
                                                { title: "Role-Based Access (RBAC)", text: "You define who can see what. Viewers can read documents, Contributors can draft, and Admins can manage billing and API keys." },
                                                { title: "Collaboration Audit Logs", text: "Certain activities (like deleting a blog site or changing a persona) are logged to ensure accountability within your team." },
                                                { title: "Member Offboarding", text: "When you remove a team member, their access to all shared assets is instantly revoked. You can choose whether to keep or delete their historical contributions." }
                                            ].map((card, i) => (
                                                <div key={i} className="p-7 bg-pink-500/5 rounded-[2rem] border border-pink-500/10">
                                                    <h5 className="text-foreground font-bold mb-3">{card.title}</h5>
                                                    <p className="text-sm leading-relaxed m-0">{card.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="security" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center text-blue-600 shadow-inner">
                                            <Lock className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">9. Security Infrastructure</h2>
                                    </div>
                                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                                        <p>We treat your data like our own. Our infrastructure is built on the same stacks used by leading global financial institutions.</p>

                                        <div className="grid grid-cols-1 gap-4 my-10">
                                            {[
                                                { title: "Point-to-Point Encryption", desc: "All data moving between your device and our servers uses TLS 1.3. Once on our servers, data is encrypted at rest using AES-256." },
                                                { title: "Isolated Key Management", desc: "Third-party tokens (WordPress, Shopify) are stored in a separate, hardware-secured vault that is never exposed to the primary web application servers." },
                                                { title: "Distributed Hosting", desc: "We utilize Amazon Web Services (AWS) across multiple regions to ensure high availability and localized data residency where possible." },
                                                { title: "Penetration Testing", desc: "We conduct bi-weekly automated security scans and quarterly manual audits by independent security firms to identify potential vulnerabilities." }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-6 p-6 rounded-[2rem] bg-accent/50 group hover:bg-accent transition-colors duration-300">
                                                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 border border-border group-hover:scale-110 transition-transform shadow-lg">
                                                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-xs">0{i + 1}</span>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold mb-1">{item.title}</h5>
                                                        <p className="text-sm text-muted-foreground m-0 leading-relaxed">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="retention" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                            <Database className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">10. Data Retention</h2>
                                    </div>
                                    <div className="space-y-8">
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            We follow a "Just-Enough" retention philosophy. We keep your data only as long as it is necessary to provide the Scalerbox service or as required by law.
                                        </p>
                                        <div className="border border-border/60 rounded-[2.5rem] divide-y divide-border/60 overflow-hidden">
                                            <div className="p-6 flex justify-between items-center">
                                                <span className="font-bold">Active Content</span>
                                                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full italic">Indefinitely while account is active</span>
                                            </div>
                                            <div className="p-6 flex justify-between items-center">
                                                <span className="font-bold">Deleted Account Content</span>
                                                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full italic">Permanent purge within 60 days</span>
                                            </div>
                                            <div className="p-6 flex justify-between items-center">
                                                <span className="font-bold">Transaction/Legal Records</span>
                                                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full italic">7 Years (Global Audit Standard)</span>
                                            </div>
                                            <div className="p-6 flex justify-between items-center">
                                                <span className="font-bold">Backup Snapshots</span>
                                                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full italic">90 Day Rolling Lifecycle</span>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="rights" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-violet-700 shadow-inner">
                                            <Users className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">11. Your Data Rights</h2>
                                    </div>
                                    <div className="space-y-10">
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            Regardless of your location, we believe you should have control over your data. You have the following irrevocable rights:
                                        </p>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {[
                                                { title: "Right to Access", desc: "Download a full JSON/Markdown export of all your chats and blog drafts." },
                                                { title: "Right to Rectification", desc: "Update your profile and business details instantly in Settings." },
                                                { title: "Right to Erasure", desc: "The 'Nuclear Option': Request permanent deletion of all your data." },
                                                { title: "Right to Portability", desc: "Move your custom personas and prompt libraries to other services." },
                                                { title: "Right to Restriction", desc: "Temporarily pause data processing without deleting your account." },
                                                { title: "Right to Object", desc: "Opt-out of any processing based on legitimate interests." }
                                            ].map((right, i) => (
                                                <div key={i} className="group p-6 bg-violet-600/[0.03] border border-violet-600/10 rounded-[2rem] hover:bg-violet-600/5 hover:border-blue-500/30 transition-all duration-300">
                                                    <h6 className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent m-0 mb-1 group-hover:scale-105 transition-transform origin-left">{right.title}</h6>
                                                    <p className="text-xs text-muted-foreground m-0 leading-relaxed">{right.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="compliance" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-amber-500/10 flex items-center justify-center text-amber-600 shadow-inner">
                                            <Globe className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">12. Global Compliance</h2>
                                    </div>
                                    <div className="space-y-8">
                                        <p className="text-lg text-muted-foreground mb-10">
                                            Scalerbox is designed to meet and exceed global regulations:
                                        </p>
                                        <div className="space-y-6">
                                            <div className="p-8 bg-card rounded-[2.5rem] border border-border/50">
                                                <h4 className="font-bold mb-4 flex items-center gap-3">
                                                    <CheckCircle2 className="h-6 w-6 text-amber-500" />
                                                    GDPR & UK GDPR
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed m-0">
                                                    For our EU and UK users, we act as the **Data Processor** for your User Data and the **Data Controller** for your account information. We use Standard Contractual Clauses (SCCs) to protect data transfers to our US-based infrastructure.
                                                </p>
                                            </div>
                                            <div className="p-8 bg-card rounded-[2.5rem] border border-border/50">
                                                <h4 className="font-bold mb-4 flex items-center gap-3">
                                                    <CheckCircle2 className="h-6 w-6 text-amber-500" />
                                                    CCPA / CPRA
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed m-0">
                                                    We provide California residents with the right to opt-out of the "sale" of their personal information. Note that **Scalerbox does not sell your information** to third parties for monetary gain or advertising purposes.
                                                </p>
                                            </div>
                                            <div className="p-8 bg-card rounded-[2.5rem] border border-border/50">
                                                <h4 className="font-bold mb-4 flex items-center gap-3">
                                                    <ShieldCheck className="h-6 w-6 text-amber-500" />
                                                    SOC 2 Type II
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed m-0">
                                                    We undergo regular third-party audits to verify that our security controls meet the rigorous standards for security, availability, and confidentiality.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="contact" className="scroll-mt-32 pb-10">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-slate-500/10 flex items-center justify-center text-slate-600 shadow-inner">
                                            <Mail className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">13. Contact Information</h2>
                                    </div>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                                        If you have inquiries about this Policy or wish to exercise your data rights, please reach out through one of the following channels:
                                    </p>

                                    <div className="grid md:grid-cols-1 gap-8">
                                        <div className="p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                            <div className="relative z-10 space-y-6">
                                                <h4 className="text-2xl font-bold mb-8">Get in Touch</h4>
                                                <div className="flex flex-col md:flex-row gap-6">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                                            <Mail className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-white/50 uppercase font-bold tracking-widest m-0 mb-1">Privacy Email</p>
                                                            <p className="text-lg font-medium m-0">privacy@scalerbox.com</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                                            <MapPin className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-white/50 uppercase font-bold tracking-widest m-0 mb-1">HQ Address</p>
                                                            <p className="text-sm leading-snug m-0">123 Scale Ave, Suite 500,<br />San Francisco, CA 94105, USA</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                        </div>
                    </div>
                </div>
            </main>

            <div ref={footerRef}>
                <Footer />
            </div>

            <Dialog open={isContactDialogOpen} onOpenChange={(open) => {
                setIsContactDialogOpen(open);
                if (!open) {
                    setTimeout(() => {
                        setShowSuccess(false);
                        setContactForm({ name: '', email: '', query: '' });
                    }, 300);
                }
            }}>
                <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] border-primary/20 bg-background/95 backdrop-blur-xl transition-all duration-500">
                    {!showSuccess ? (
                        <>
                            <DialogHeader className="space-y-0 text-left">
                                <DialogTitle className="text-2xl font-bold text-foreground mb-0">Contact Privacy Team</DialogTitle>
                                <DialogDescription className="text-muted-foreground pt-0 mt-0">
                                    Send us your inquiry regarding data privacy or security.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-5 py-6">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center px-1">
                                        <Label htmlFor="name" className="text-xs font-bold">Full Name <span className="text-destructive">*</span></Label>
                                        <span className="text-[10px] text-muted-foreground">{contactForm.name.length}/50</span>
                                    </div>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        required
                                        maxLength={50}
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                                        className="rounded-2xl bg-muted/50 border-border/50 focus:ring-primary/20 h-11"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-xs font-bold pl-1">Email Address <span className="text-destructive">*</span></Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                                        className={cn(
                                            "rounded-2xl bg-muted/50 border-border/50 focus:ring-primary/20 h-11",
                                            contactForm.email && !isValidEmail(contactForm.email) && "border-destructive/50 focus:ring-destructive/20"
                                        )}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center px-1">
                                        <Label htmlFor="query" className="text-xs font-bold">Your Inquiry <span className="text-destructive">*</span></Label>
                                        <span className="text-[10px] text-muted-foreground">{contactForm.query.length}/500</span>
                                    </div>
                                    <Textarea
                                        id="query"
                                        placeholder="Describe your question or data request..."
                                        required
                                        maxLength={500}
                                        value={contactForm.query}
                                        onChange={(e) => setContactForm(prev => ({ ...prev, query: e.target.value }))}
                                        className="rounded-2xl bg-muted/50 border-border/50 focus:ring-primary/20 min-h-[100px] resize-none"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    disabled={!isFormValid}
                                    className="w-full rounded-full py-4 h-11 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-all font-bold shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => setShowSuccess(true)}
                                >
                                    Send Inquiry
                                </Button>
                            </DialogFooter>
                        </>
                    ) : (
                        <div className="py-12 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-foreground">Inquiry Sent!</h3>
                                <p className="text-muted-foreground leading-relaxed px-4">
                                    Thank you for asking. We will get back soon with your query.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                className="rounded-full px-8 py-5 h-auto text-sm font-bold border-primary/20 hover:bg-primary/5"
                                onClick={() => setIsContactDialogOpen(false)}
                            >
                                Back to Policy
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Floating Controls (Bottom Right) */}
            <div
                className="fixed bottom-0 right-0 w-48 h-32 z-50 flex items-end justify-end p-6 gap-3"
                onMouseEnter={() => setShowThemeToggle(true)}
                onMouseLeave={() => setShowThemeToggle(false)}
            >
                {/* Scroll to Top */}
                <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full h-12 w-12 bg-background/80 backdrop-blur-sm shadow-xl border-border hover:scale-110 transition-all duration-500 transform ${isNearFooter ? 'translate-x-32 opacity-0 pointer-events-none' : (isAtTop ? 'translate-x-[110px] opacity-0 pointer-events-none' : (showThemeToggle || isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[60px] opacity-100'))}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <ChevronDown className="h-6 w-6 rotate-180" />
                    <span className="sr-only">Scroll to top</span>
                </Button>

                {/* Theme Toggle */}
                <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full h-12 w-12 bg-background/80 backdrop-blur-sm shadow-xl border-border hover:scale-110 transition-all duration-500 transform ${showThemeToggle || isAtTop || isVisible ? (isNearFooter ? 'translate-x-24 opacity-0' : 'translate-x-0 opacity-100') : 'translate-x-24 opacity-0'}`}
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                >
                    {resolvedTheme === 'dark' ? (
                        <Sun className="h-6 w-6 text-white" />
                    ) : (
                        <Moon className="h-6 w-6 text-slate-900" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        </div>
    );
}
