"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
    ChevronDown,
    Menu,
    Users,
    Zap,
    Globe,
    ShieldCheck,
    Target,
    Lightbulb,
    Rocket,
    Heart,
    Cpu,
    BookOpen,
    Quote,
    ArrowRight,
    ArrowUpRight,
    Sun,
    Moon,
    CheckCircle2,
    Code2,
    Fingerprint,
    Infinity,
    Sparkles,
    Layers,
    Share2,
    Lock,
    MapPin,
    ChevronLeft,
    ChevronRight
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
import { ContactFormDialog } from '@/components/contact-form-dialog';
import { WaitlistDialog } from '@/components/roadmap/waitlist-dialog';



const teamMembers = [
    {
        name: "Alex Sterling",
        role: "Founder & CEO @ Scalerbox",
        bio: "Previously scaled three SaaS products to $10M ARR. Believes in strict minimalism and maximum power.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Sarah Chen",
        role: "CTO @ Scalerbox",
        bio: "Ex-Google DeepMind researcher. Specialist in LLM routing architecture and secure data pipelines.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Marcus Thorne",
        role: "Head of Product @ Scalerbox",
        bio: "Obsessed with UX. If a feature takes more than 2 clicks, he deletes it.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Elena Rodriguez",
        role: "Head of Marketing @ Scalerbox",
        bio: "Storyteller at heart. specific about brand voice and narrative consistency across all channels.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "David Kim",
        role: "Lead Engineer @ Scalerbox",
        bio: "Full-stack wizard. Ensures Scalerbox runs with 99.99% uptime and <100ms latency.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "James Wilson",
        role: "Lead Engineer @ Scalerbox",
        bio: "Scalable systems expert. Architecting low-latency infrastructure for real-time AI processing.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Michael Chang",
        role: "Lead Engineer @ Scalerbox",
        bio: "AI infrastructure specialist. Optimizing large-scale model inference and distributed training pipelines.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Olivia James",
        role: "Design Lead @ Scalerbox",
        bio: "Pixel perfectionist. Crafts visually stunning and intuitive interfaces for complex workflows.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Sophia Benoit",
        role: "Design Lead @ Scalerbox",
        bio: "Creative visionary. Bringing brand identity to life through immersive motion design.",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800"
    }
];



export default function AboutPage() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
    const [isWaitlistDialogOpen, setIsWaitlistDialogOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [showThemeToggle, setShowThemeToggle] = useState(false);
    const [isNearFooter, setIsNearFooter] = useState(false);
    const footerRef = useRef<HTMLDivElement>(null);
    const [isAtTop, setIsAtTop] = useState(true);
    const lastScrollY = useRef(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [teamScrollPosition, setTeamScrollPosition] = useState(0);
    const teamContainerRef = useRef<HTMLDivElement>(null);

    const scrollTeam = (direction: 'left' | 'right') => {
        if (teamContainerRef.current) {
            const container = teamContainerRef.current;
            const scrollAmount = container.clientWidth / 3; // Scroll one card width (approx)
            const newScrollPosition = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        }
    };

    const officeImages = [
        "https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/about_us/the_og_offce_image_.png",
        "https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/about_us/office_location_2_.0.png",
        "https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/about_us/offic_image_4.0.png",
        "https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/about_us/office_5.0.png"
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % officeImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + officeImages.length) % officeImages.length);

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

    if (!mounted) return null;

    return (
        <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
            {/* SVG Gradient Definition */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Navigation Bar - Consistent with Roadmap */}
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
                            Blogs
                        </Link>
                        <Link href="/roadmap" className="text-sm font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all">
                            Roadmap
                        </Link>
                        <Link href="/scalerboxreviews" className="text-sm font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all">
                            Reviews
                        </Link>
                    </nav>
                    <div className="flex items-center gap-2">
                        <StarBorder className="rounded-full" color="#8b5cf6" speed="6s">
                            <GlareHover width="auto" height="auto" background="transparent" borderRadius="9999px" borderColor="transparent" glareColor="rgba(255, 255, 255, 0.3)">
                                <Button variant="default" className="hidden lg:flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-none text-white hover:opacity-90" onClick={() => setIsContactDialogOpen(true)}>
                                    Contact Us
                                </Button>
                            </GlareHover>
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
                                    <Link href="/scalerboxreviews" className="text-lg font-semibold">Reviews</Link>
                                    <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white" onClick={() => { setIsContactDialogOpen(true); setIsMenuOpen(false); }}>Contact Us</Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </header>
            </div>

            <main className="flex-1 pt-32 pb-20">
                <div className="container max-w-6xl mx-auto px-4 md:px-6">

                    {/* Hero Section */}
                    <ScrollReveal>
                        <div className="flex flex-col items-center text-center mb-24">
                            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 mb-8 antialiased">
                                <Sparkles className="h-4 w-4 text-white" />
                                The Scalerbox Vision
                            </div>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 font-serif">
                                Architecting the <br /> Unified Intelligence Layer <br /> for Modern Enterprise
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl leading-relaxed">
                                We are building the operating system for the next generation of entrepreneurs. A single, unified interface for intelligence, creation, and growth.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* About Scalerbox Visionary Section */}
                    <div className="w-full max-w-7xl mx-auto mb-24">
                        <ScrollReveal>
                            <div className="relative pl-8 md:pl-12 border-l-2 border-border/50 group">
                                <div className="absolute top-0 -left-[9px] w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-none shadow-[0_0_15px_rgba(147,51,234,0.5)]" />
                                <div className="mb-8">
                                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">About Scalerbox</h2>
                                </div>
                                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground text-lg md:text-xl leading-loose space-y-8">
                                    <p>
                                        Scalerbox was born from a simple yet profound realization: the modern entrepreneurial journey is needlessly complex. Founders and teams are drowning in a sea of disparate tools, each promising efficiency but collectively creating fragmentation. We asked: What if there was a single, intelligent layer that unified every critical aspect of building and scaling a business?
                                    </p>
                                    <p>
                                        This question led to the creation of Scalerbox, a comprehensive <strong>Management & Growth Operating System</strong> designed specifically for software founders, modern entrepreneurs, and mid-sized businesses. It is the bridge between chaotic fragmentation and streamlined execution.
                                    </p>
                                    <p>
                                        Our platform serves as the central nervous system of your enterprise, orchestrating complex project management workflows, automating marketing outreach, and providing deep, actionable insights into your growth metrics. We believe true scalability comes from simplicity and integration. By bringing management, creation, and analysis under one roof, we empower you to move faster, break fewer things, and focus purely on what matters: delivering value to the world.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Office Carousel Section */}
                    <div className="mb-32">
                        <ScrollReveal>
                            <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                                {/* Slider Container */}
                                <div
                                    className="flex h-full transition-transform duration-700 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {officeImages.map((src, index) => (
                                        <div key={index} className="relative min-w-full h-full">
                                            <Image
                                                src={src}
                                                alt="Scalerbox Office"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Static Text Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12 pointer-events-none">
                                    <div className="text-white">
                                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-sm font-semibold border border-white/20 mb-4">
                                            <MapPin className="h-4 w-4" />
                                            San Francisco, CA
                                        </div>
                                        <h3 className="text-3xl font-bold">Where the Magic Happens</h3>
                                    </div>
                                </div>

                                {/* Navigation Controls */}
                                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                                        className="rounded-full w-12 h-12 bg-black/30 backdrop-blur-md border border-white/20 text-white hover:text-white hover:bg-black/50 hover:border-white/40 hover:scale-110 pointer-events-auto"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                                        className="rounded-full w-12 h-12 bg-black/30 backdrop-blur-md border border-white/20 text-white hover:text-white hover:bg-black/50 hover:border-white/40 hover:scale-110 pointer-events-auto"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Team Section */}
                    <div className="mb-32">
                        <ScrollReveal>
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-2">Meet the People Behind Scalerbox</h2>
                                <p className="text-muted-foreground text-lg">A distributed team of engineers, designers, and dreamers.</p>
                            </div>

                            <div className="relative group/team-slider">
                                {/* Navigation Buttons */}
                                <button
                                    onClick={() => scrollTeam('left')}
                                    className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white shadow-lg opacity-0 group-hover/team-slider:opacity-100 transition-opacity disabled:opacity-0 hover:bg-black/50 hover:border-white/40 hover:scale-110 hover:text-white"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={() => scrollTeam('right')}
                                    className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white shadow-lg opacity-0 group-hover/team-slider:opacity-100 transition-opacity disabled:opacity-0 hover:bg-black/50 hover:border-white/40 hover:scale-110 hover:text-white"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>

                                {/* Scrollable Container */}
                                <div
                                    ref={teamContainerRef}
                                    className="flex overflow-x-auto gap-8 pb-8 px-4 snap-x snap-mandatory scrollbar-hide -mx-4 md:mx-0"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {teamMembers.map((member, i) => (
                                        <div key={i} className="min-w-[300px] md:min-w-[350px] snap-center group relative flex-shrink-0">
                                            <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden mb-6 border border-border/50">
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                                    <p className="text-white/90 text-sm leading-relaxed">{member.bio}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                                                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-md shadow-purple-500/20">
                                                    {member.role}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Bottom CTA */}
                    <div className="relative rounded-[3rem] overflow-hidden mb-12">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                        <div className="relative z-10 p-12 md:p-24 text-center text-white">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                                Join the Future of Work
                                <Rocket className="h-12 w-12 text-white" />
                            </h2>
                            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                                Ready to scale your operations with unified intelligence? Join thousands of high-growth teams on Scalerbox (Private Beta).
                            </p>
                            <StarBorder className="mx-auto rounded-full" color="#ffffff" speed="6s">
                                <GlareHover width="auto" height="auto" background="transparent" borderRadius="9999px" borderColor="transparent" glareColor="rgba(255, 255, 255, 0.3)">
                                    <Button size="lg" variant="secondary" className="group rounded-full px-8 py-6 text-lg font-bold bg-white text-purple-600 hover:bg-white/90" onClick={() => setIsWaitlistDialogOpen(true)}>
                                        Join Waitlist Now
                                        <ArrowUpRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={3} />
                                    </Button>
                                </GlareHover>
                            </StarBorder>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <div ref={footerRef}>
                <Footer />
            </div>

            <ContactFormDialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} />
            <WaitlistDialog open={isWaitlistDialogOpen} onOpenChange={setIsWaitlistDialogOpen} />

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
