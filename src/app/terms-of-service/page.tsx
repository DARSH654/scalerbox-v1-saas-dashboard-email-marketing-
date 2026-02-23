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
    CreditCard,
    AlertTriangle,
    Ban,
    Scale,
    Server,
    Terminal
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
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'definitions', title: '2. Definitions' },
    { id: 'access', title: '3. Account & Access' },
    { id: 'billing', title: '4. Billing & Subscriptions' },
    { id: 'conduct', title: '5. Acceptable Use Policy' },
    { id: 'intellectual-property', title: '6. Intellectual Property' },
    { id: 'ai-disclaimer', title: '7. AI-Specific Terms' },
    { id: 'integrations', title: '8. Third-Party Services' },
    { id: 'termination', title: '9. Termination' },
    { id: 'warranties', title: '10. Disclaimer of Warranties' },
    { id: 'liability', title: '11. Limitation of Liability' },
    { id: 'indemnification', title: '12. Indemnification' },
    { id: 'dispute', title: '13. Dispute Resolution' },
    { id: 'contact', title: '14. Contact Information' },
];

export default function TermsOfServicePage() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('acceptance');
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
                                Contact Legal Team
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
                                    <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white" onClick={() => { setIsContactDialogOpen(true); setIsMenuOpen(false); }}>Contact Legal Team</Button>
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
                                <FileText className="h-4 w-4 text-white" />
                                Scalerbox Legal Hub
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-2 font-serif">
                                Terms of Service
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                                Please read these Terms carefully as they govern your use of the Scalerbox platform. These terms constitute a legally binding agreement between you and Scalerbox.
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
                                        Have a specific question about these terms? Our legal team is here to assist.
                                    </p>
                                    <Button className="w-full rounded-full text-sm font-bold h-11 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:opacity-90 transition-all shadow-lg shadow-purple-500/20" onClick={() => {
                                        setShowSuccess(false);
                                        setIsContactDialogOpen(true);
                                    }}>
                                        Contact Legal Team
                                    </Button>
                                </div>
                            </div>
                        </aside>

                        {/* Comprehensive Policy Sections */}
                        <div className="flex-1 max-w-4xl space-y-24">

                            <section id="acceptance" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                            <FileText className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">1. Acceptance of Terms</h2>
                                    </div>
                                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed antialiased">
                                        <p>
                                            These Terms of Service ("Terms") constitute a binding legal agreement between you (whether personally or on behalf of an entity) ("User", "you", or "your") and Scalerbox Inc. ("Scalerbox", "we", "us", or "our"), concerning your access to and use of our AI-powered platform, website, and related services (collectively, the "Service").
                                        </p>
                                        <p>
                                            By accessing, registering for, or using the Service, you expressly acknowledge that you have read, understood, and agreed to be bound by these Terms, as well as our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>. These Terms apply to all visitors, users, and others who satisfy the criteria to access the Service.
                                        </p>
                                        <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-[2rem] my-8">
                                            <h4 className="flex items-center gap-2 font-bold text-red-500 mb-2">
                                                <AlertTriangle className="h-5 w-5" />
                                                Critical Notice: Arbitration & Class Action Waiver
                                            </h4>
                                            <p className="text-sm text-muted-foreground m-0">
                                                Please note that Section 13 contains an arbitration clause and class action waiver. By agreeing to these Terms, you agree to resolve all disputes through binding individual arbitration, which means that you waive any right to have those disputes decided by a judge or jury, and that you waive your right to participate in class actions, class arbitrations, or representative actions.
                                            </p>
                                        </div>
                                        <p>
                                            If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity and its affiliates to these terms and conditions. If you do not have such authority, or if you do not agree with these terms and conditions, you must not accept this agreement and may not use the Service.
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
                                            { term: "Account", def: "A unique account created for you to access the Service or parts of the Service." },
                                            { term: "Content", def: "Text, code, images, and other materials generated, uploaded, or transmitted by you through the Service." },
                                            { term: "AI Models", def: "The underlying artificial intelligence technologies (including but not limited to GPT-4, Claude 3, DeepSeek) integrated into the Service." },
                                            { term: "Subscription", def: "The paid plan granting access to specific features, usage limits, and support tiers governed by the billing cycle." },
                                            { term: "Authorized User", def: "Any individual who accesses the Service through your Account, including employees, contractors, or agents." },
                                            { term: "Intellectual Property", def: "Patents, copyrights, trademarks, trade secrets, and any other proprietary rights." }
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

                            <section id="access" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                            <KeyRound className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">3. Account & Access</h2>
                                    </div>
                                    <div className="space-y-12">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                                <span className="text-emerald-500">3.1</span> Eligibility & Registration
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed mb-6">
                                                You must be at least 18 years old to use the Service. By registering, you warrant that all information provided is accurate, current, and complete. You are solely responsible for maintaining the confidentiality of your login credentials.
                                            </p>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="p-8 bg-card rounded-[2rem] border border-border/50">
                                                <h4 className="font-bold flex items-center gap-3 mb-4">
                                                    <Users className="h-5 w-5 text-emerald-500" />
                                                    Team Accounts
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    If you create an account on behalf of a team, you are responsible for all actions taken by authorized users invited to your workspace. You must ensure that all team members comply with these Terms.
                                                </p>
                                            </div>
                                            <div className="p-8 bg-card rounded-[2rem] border border-border/50">
                                                <h4 className="font-bold flex items-center gap-3 mb-4">
                                                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                                    Security Breaches
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    You must notify us immediately of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to comply with this section.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="billing" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                            <CreditCard className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">4. Billing & Subscriptions</h2>
                                    </div>
                                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                                        <p>Access to premium features of Scalerbox requires a paid subscription. We utilize third-party payment processors (e.g., Stripe) to bill you through a payment account linked to your Account.</p>

                                        <div className="grid md:grid-cols-2 gap-8 my-10">
                                            <div className="space-y-4">
                                                <h4 className="flex items-center gap-2 text-foreground font-bold">
                                                    <Clock className="h-5 w-5 text-orange-500" />
                                                    Billing Cycles
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    Service fees will be billed automatically at the start of your monthly or annual billing cycle. If a payment fails, we may suspend access to the Service until legitimate payment is received.
                                                </p>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="flex items-center gap-2 text-foreground font-bold">
                                                    <ArrowRight className="h-5 w-5 text-orange-500" />
                                                    Upgrades & Downgrades
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    You may upgrade or downgrade your plan at any time. Upgrades take effect immediately with pro-rated billing. Downgrades take effect at the end of the current billing cycle.
                                                </p>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="flex items-center gap-2 text-foreground font-bold">
                                                    <Ban className="h-5 w-5 text-orange-500" />
                                                    Cancellations
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    You can cancel your subscription at any time via the billing portal. Cancellation stops future auto-renewals but does not refund the current period.
                                                </p>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="flex items-center gap-2 text-foreground font-bold">
                                                    <Scale className="h-5 w-5 text-orange-500" />
                                                    Refund Policy
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    We offer a 7-day money-back guarantee for new subscriptions. Beyond this window, refunds are granted only at our sole discretion or where required by law.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="conduct" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-red-500/10 flex items-center justify-center text-red-600 shadow-inner">
                                            <ShieldAlert className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">5. Acceptable Use Policy</h2>
                                    </div>
                                    <div className="space-y-8">
                                        <p className="text-lg text-muted-foreground">
                                            We prioritize safety and legality. You agree not to use the Service to:
                                        </p>
                                        <div className="space-y-4">
                                            {[
                                                "Generate or disseminate hate speech, harassment, or violent content.",
                                                "Create sexually explicit material or child sexual abuse material (CSAM).",
                                                "Engage in fraudulent activities, phishing, or social engineering.",
                                                "Reverse engineer, decompile, or attempt to extract source code from the Service.",
                                                "Use the API to develop a competing AI product or service (model scraping).",
                                                "Overload our infrastructure via DDoS attacks or excessive automated requests.",
                                                "Violate the intellectual property rights of Scalerbox or any third party."
                                            ].map((rule, i) => (
                                                <div key={i} className="flex gap-4 items-start p-4 bg-muted/30 rounded-2xl">
                                                    <Ban className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                                    <p className="text-sm text-muted-foreground m-0">{rule}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-muted-foreground italic mt-4">
                                            Violation of this Acceptable Use Policy may result in immediate account termination without refund.
                                        </p>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="intellectual-property" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-purple-500/10 flex items-center justify-center text-purple-600 shadow-inner">
                                            <Zap className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">6. Intellectual Property</h2>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8 my-8">
                                        <div className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 p-8 rounded-[2rem] border border-purple-500/10">
                                            <h3 className="text-xl font-bold mb-4">Your Content Ownership</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                You retain full ownership of all inputs you provide and all outputs generated by the AI on your behalf. Scalerbox claims no ownership rights over your generated blog posts, code, or images. You grant us a limited, non-exclusive license solely to host and display this content as needed to provide the Service to you.
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-8 rounded-[2rem] border border-blue-500/10">
                                            <h3 className="text-xl font-bold mb-4">Our Platform Rights</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                The Service, including its "look and feel," source code, algorithms, and interface design, is the exclusive property of Scalerbox Inc. and its licensors. You may not copy, modify, or distribute any part of our platform without explicit written permission.
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="ai-disclaimer" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-cyan-500/10 flex items-center justify-center text-cyan-600 shadow-inner">
                                            <Terminal className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">7. AI-Specific Terms</h2>
                                    </div>
                                    <div className="space-y-8 text-muted-foreground leading-relaxed">
                                        <p>
                                            The Service utilizes advanced large language models (LLMs). By using the Service, you understand and acknowledge the following inherent limitations of AI technology:
                                        </p>
                                        <div className="space-y-6">
                                            <div className="p-8 bg-card rounded-[2.5rem] border border-border/50">
                                                <h4 className="font-bold mb-2 flex items-center gap-3">
                                                    <AlertTriangle className="h-5 w-5 text-cyan-500" />
                                                    Accuracy Not Guaranteed
                                                </h4>
                                                <p className="text-sm text-muted-foreground m-0">
                                                    AI models may occasionally hallucinate or generate incorrect information ("hallucinations"). You should always verify important facts, especially for medical, legal, or financial use cases. Scalerbox is not liable for errors in AI-generated content.
                                                </p>
                                            </div>
                                            <div className="p-8 bg-card rounded-[2.5rem] border border-border/50">
                                                <h4 className="font-bold mb-2 flex items-center gap-3">
                                                    <Scale className="h-5 w-5 text-cyan-500" />
                                                    No Professional Advice
                                                </h4>
                                                <p className="text-sm text-muted-foreground m-0">
                                                    Output generated by the Service does not constitute professional advice. You should consult with a qualified professional before making decisions based on AI outputs.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="integrations" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-indigo-500/10 flex items-center justify-center text-indigo-600 shadow-inner">
                                            <Globe className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">8. Third-Party Services</h2>
                                    </div>
                                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                                        <p>
                                            The Service integrates with third-party platforms (e.g., WordPress, Shopify, LinkedIn). These integrations are provided "as is." Scalerbox is not responsible for the availability, security, or functionality of these third-party services. Activating an integration sends your data to that third party, and such data becomes subject to their separate privacy policies and terms.
                                        </p>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="termination" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-red-500/10 flex items-center justify-center text-red-600 shadow-inner">
                                            <Ban className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">9. Termination</h2>
                                    </div>
                                    <div className="p-8 bg-card rounded-[2.5rem] border border-border/50">
                                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                                        </p>
                                        <p className="text-sm text-muted-foreground leading-relaxed m-0">
                                            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or delete your account from the dashboard. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                                        </p>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="warranties" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-amber-500/10 flex items-center justify-center text-amber-600 shadow-inner">
                                            <ShieldAlert className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">10. Disclaimer of Warranties</h2>
                                    </div>
                                    <div className="uppercase tracking-widest text-xs font-bold text-muted-foreground mb-4">Read Carefully</div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. SCALERBOX MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE SERVICE OR THE INFORMATION, CONTENT, MATERIALS, OR PRODUCTS INCLUDED ON THE SERVICE. TO THE FULL EXTENT PERMISSIBLE BY APPLICABLE LAW, SCALERBOX DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                                    </p>
                                </ScrollReveal>
                            </section>

                            <section id="liability" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-slate-500/10 flex items-center justify-center text-slate-600 shadow-inner">
                                            <Scale className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">11. Limitation of Liability</h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        IN NO EVENT SHALL SCALERBOX, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (III) ANY CONTENT OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE) OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
                                    </p>
                                </ScrollReveal>
                            </section>

                            <section id="dispute" className="scroll-mt-32">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center text-blue-600 shadow-inner">
                                            <Gavel className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">13. Dispute Resolution</h2>
                                    </div>
                                    <div className="space-y-6 text-muted-foreground">
                                        <p>
                                            <strong>Governing Law:</strong> These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
                                        </p>
                                        <p>
                                            <strong>Arbitration:</strong> Any dispute, controversy, or claim arising out of or relating to these Terms, including the formation, interpretation, breach, or termination thereof, including whether the claims asserted are arbitrable, will be referred to and finally determined by arbitration in accordance with the JAMS International Arbitration Rules. The tribunal will consist of one arbitrator. The place of arbitration shall be San Francisco, California.
                                        </p>
                                    </div>
                                </ScrollReveal>
                            </section>

                            <section id="contact" className="scroll-mt-32 pb-10">
                                <ScrollReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-[1.5rem] bg-slate-500/10 flex items-center justify-center text-slate-600 shadow-inner">
                                            <Mail className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight m-0">14. Contact Information</h2>
                                    </div>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                                        If you have any questions about these Terms, please contact our legal department:
                                    </p>

                                    <div className="grid md:grid-cols-1 gap-8">
                                        <div className="p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                            <div className="relative z-10 space-y-6">
                                                <h4 className="text-2xl font-bold mb-8">Legal Department</h4>
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                                            <Mail className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-white/50 uppercase font-bold tracking-widest m-0 mb-1">General Inquiries</p>
                                                            <p className="text-lg font-medium m-0">legal@scalerbox.com</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                                            <MapPin className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-white/50 uppercase font-bold tracking-widest m-0 mb-1">HQ Address</p>
                                                            <p className="text-sm leading-snug m-0">123 Scale Ave, Suite 500,<br />San Francisco, CA 94105</p>
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
                                <DialogTitle className="text-2xl font-bold text-foreground mb-0">Contact Legal Team</DialogTitle>
                                <DialogDescription className="text-muted-foreground pt-0 mt-0">
                                    Send us your inquiry regarding terms of service or intellectual property.
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
                                        placeholder="Describe your legal question..."
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
                                    Thank you for your inquiry. Our legal team will review it and respond shortly.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                className="rounded-full px-8 py-5 h-auto text-sm font-bold border-primary/20 hover:bg-primary/5"
                                onClick={() => setIsContactDialogOpen(false)}
                            >
                                Back to Terms
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
