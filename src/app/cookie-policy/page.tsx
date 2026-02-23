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
    Clock,
    Cookie
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
    { id: 'what-are-cookies', title: '2. What Are Cookies' },
    { id: 'how-we-use', title: '3. How We Use Cookies' },
    { id: 'types', title: '4. Types of Cookies' },
    { id: 'third-party', title: '5. Third-Party Cookies' },
    { id: 'management', title: '6. Managing Cookies' },
    { id: 'contact', title: '7. Contact Information' },
];

export default function CookiePolicyPage() {
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
                <header className="w-full max-w-3xl h-16 flex items-center justify-between shadow-lg bg-background/80 backdrop-blur-xl rounded-full px-6 border border-white/20 transition-all hover:shadow-2xl hover:border-primary/20">
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
                                <Cookie className="h-4 w-4 text-white" />
                                Scalerbox Transparency
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 pb-2 font-serif">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Cookie</span> Policy
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                                We believe in being transparent about how we use your data. This policy provides detailed information about how and when we use cookies on Scalerbox.
                            </p>
                            <div className="flex items-center gap-4 mt-8 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Last Updated: Jan 2, 2026</span>
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
                                            This Cookie Policy explains how Scalerbox ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website or use our AI platforms. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                                        </p>
                                        <p>
                                            In some cases, we may use cookies to collect personal information, or that becomes personal information if we combine it with other information. For more details on this, please consult our <Link href="/privacy-policy" className="text-primary hover:underline underline-offset-4">Privacy Policy</Link>.
                                        </p>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="what-are-cookies" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                            <Cookie className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">2. What Are Cookies</h2>
                                    </div>
                                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed antialiased">
                                        <p>
                                            Cookies are small text files that are downloaded to your computer, tablet, or mobile device when you visit a website or application. They are used to retrieve information about your browsing history and to save your preferences and login information.
                                        </p>
                                        <p>
                                            At Scalerbox, we use cookies not just for functionality, but as a critical part of our security infrastructure. They allow us to differentiate between human users and automated bots, maintain your secure session across different AI model contexts, and ensure that your private workspace remains inaccessible to unauthorized entities.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4 mt-8">
                                            <div className="p-6 bg-card border border-border/50 rounded-3xl">
                                                <h4 className="font-bold flex items-center gap-2 mb-2"><Clock className="h-5 w-5 text-amber-500" /> Session Cookies</h4>
                                                <p className="text-sm">Temporary cookies that expire once you close your browser. Used for active chat sessions.</p>
                                            </div>
                                            <div className="p-6 bg-card border border-border/50 rounded-3xl">
                                                <h4 className="font-bold flex items-center gap-2 mb-2"><Database className="h-5 w-5 text-amber-500" /> Persistent Cookies</h4>
                                                <p className="text-sm">Remain on your device for a set period. Used for "Remember Me" and theme preferences.</p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="how-we-use" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                            <Activity className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">3. How We Use Cookies</h2>
                                    </div>
                                    <div className="space-y-8 text-muted-foreground leading-relaxed">
                                        <p>
                                            We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry-standard options for disabling cookies without completely disabling the functionality and features they add to this site.
                                        </p>
                                        <ul className="space-y-4">
                                            <li className="flex gap-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors">
                                                <ShieldCheck className="h-6 w-6 text-blue-500 shrink-0 mt-1" />
                                                <div>
                                                    <strong className="text-foreground block mb-1">Essential Authentication</strong>
                                                    We use cookies to verify your account and determine when you are logged in, so we can make it easier for you to access the Scalerbox platform and show you the appropriate experience and features.
                                                </div>
                                            </li>
                                            <li className="flex gap-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors">
                                                <Zap className="h-6 w-6 text-blue-500 shrink-0 mt-1" />
                                                <div>
                                                    <strong className="text-foreground block mb-1">Performance & Load Balancing</strong>
                                                    These cookies help us route traffic between servers to ensure that the AI response times are optimized and that the service remains available even during high traffic periods.
                                                </div>
                                            </li>
                                            <li className="flex gap-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors">
                                                <Eye className="h-6 w-6 text-blue-500 shrink-0 mt-1" />
                                                <div>
                                                    <strong className="text-foreground block mb-1">Feature Preferences</strong>
                                                    To provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it. For example, remembering if you prefer Dark Mode or Light Mode.
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="types" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                            <Layers className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">4. Types of Cookies</h2>
                                    </div>
                                    <div className="space-y-6">
                                        <p className="text-lg text-muted-foreground mb-6">
                                            We categorize our cookies into four strictly defined tiers. You have the right to opt-out of non-essential tiers, though this may degrade your experience.
                                        </p>

                                        {[
                                            {
                                                name: "Strictly Necessary",
                                                desc: "These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site. Cookies that allow web shops to hold your items in your cart while you are shopping online are an example of strictly necessary cookies.",
                                                mandatory: true
                                            },
                                            {
                                                name: "Preferences",
                                                desc: "Also known as 'functionality cookies,' these cookies allow a website to remember choices you have made in the past, like what language you prefer, what region you would like weather reports for, or what your user name and password are so you can automatically log in.",
                                                mandatory: false
                                            },
                                            {
                                                name: "Statistics",
                                                desc: "Also known as 'performance cookies,' these cookies collect information about how you use a website, like which pages you visited and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized.",
                                                mandatory: false
                                            },
                                            {
                                                name: "Marketing",
                                                desc: "These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad. These cookies can share that information with other organizations or advertisers.",
                                                mandatory: false
                                            }
                                        ].map((type, i) => (
                                            <div key={i} className="p-8 rounded-[2.5rem] border border-border/60 bg-card/30 hover:bg-card transition-colors">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-xl font-bold flex items-center gap-3">
                                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm">{i + 1}</span>
                                                        {type.name}
                                                    </h3>
                                                    {type.mandatory ? (
                                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-600 px-3 py-1 rounded-full">Mandatory</span>
                                                    ) : (
                                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full">Optional</span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed m-0">{type.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="third-party" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                            <Globe className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">5. Third-Party Cookies</h2>
                                    </div>
                                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground">
                                        <p>
                                            In some special cases, we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
                                        </p>
                                        <ul className="space-y-6 mt-8">
                                            <li className="flex gap-4 items-start group">
                                                <div className="mt-2.5 h-2 w-2 rounded-full bg-pink-500 ring-4 ring-pink-500/20 shrink-0 transition-transform group-hover:scale-125" />
                                                <div className="space-y-1">
                                                    <strong className="text-foreground font-semibold text-base block">Google Analytics</strong>
                                                    <p className="text-muted-foreground leading-relaxed m-0">
                                                        This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="flex gap-4 items-start group">
                                                <div className="mt-2.5 h-2 w-2 rounded-full bg-pink-500 ring-4 ring-pink-500/20 shrink-0 transition-transform group-hover:scale-125" />
                                                <div className="space-y-1">
                                                    <strong className="text-foreground font-semibold text-base block">Stripe & Payment Processing</strong>
                                                    <p className="text-muted-foreground leading-relaxed m-0">
                                                        Our payment partners set cookies to prevent fraud and manage the checkout session securely. These are essential for the operation of the billing portal and cannot be disabled if you wish to purchase a subscription.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="flex gap-4 items-start group">
                                                <div className="mt-2.5 h-2 w-2 rounded-full bg-pink-500 ring-4 ring-pink-500/20 shrink-0 transition-transform group-hover:scale-125" />
                                                <div className="space-y-1">
                                                    <strong className="text-foreground font-semibold text-base block">AI Model Providers (OpenAI/Anthropic)</strong>
                                                    <p className="text-muted-foreground leading-relaxed m-0">
                                                        When you interact with advanced AI models, temporary tokens may be stored to manage the rate limiting and context window of your conversation. These are strictly functional and do not track you across other sites.
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="management" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-inner">
                                            <Gavel className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">6. Managing Cookies</h2>
                                    </div>
                                    <div className="bg-emerald-500/5 p-8 rounded-[3rem] border border-emerald-500/10">
                                        <p className="text-lg text-muted-foreground mb-8">
                                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject.
                                        </p>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-1 rounded-2xl hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all">
                                                <span className="font-bold">Chrome Browser</span>
                                                <span className="text-xs text-muted-foreground font-normal">Settings &gt; Privacy and security</span>
                                            </Button>
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-1 rounded-2xl hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all">
                                                <span className="font-bold">Safari (macOS/iOS)</span>
                                                <span className="text-xs text-muted-foreground font-normal">Preferences &gt; Privacy</span>
                                            </Button>
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-1 rounded-2xl hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all">
                                                <span className="font-bold">Firefox</span>
                                                <span className="text-xs text-muted-foreground font-normal">Options &gt; Privacy & Security</span>
                                            </Button>
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-start gap-1 rounded-2xl hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all">
                                                <span className="font-bold">Microsoft Edge</span>
                                                <span className="text-xs text-muted-foreground font-normal">Settings &gt; Cookies and site permissions</span>
                                            </Button>
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
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">7. Contact Information</h2>
                                    </div>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                                        If you have any questions about our use of cookies, please contact us:
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

            <div ref={footerRef}>
                <Footer />
            </div>
        </div>
    );
}
