"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
    ChevronDown,
    Menu,
    Star,
    Sparkles,
    Sun,
    Moon,
    ChevronDown as ChevronDownIcon,
    ArrowUpRight,
    Quote,
    Upload,
    Video,
    X,
    CheckCircle,
    Play,
    HelpCircle,
    Check,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { FeaturesMegaMenu } from '@/components/landing/features-mega-menu';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import StarBorder from "@/components/ui/star-border";
import GlareHover from '@/components/GlareHover.jsx';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ContactFormDialog } from '@/components/contact-form-dialog';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase';

// --- Mock Data Generation ---

const REVIEWS_COUNT = 60;
const BETA_PILLS_COUNT = 25;

const reviewTemplates = [
    "Scalerbox has completely transformed how we handle our AI workflows. The integration is seamless and the output quality is unmatched.",
    "The unified dashboard is a game-changer. I no longer have to jump between 10 different tools to manage my team.",
    "Finally, a growth OS that actually understands the needs of modern SaaS founders. Highly recommended!",
    "The automation features have saved us at least 20 hours a week. It's like having an extra pair of hands.",
    "Visualizing our growth metrics has never been easier. The insights we get from Scalerbox are truly actionable.",
    "Best investment we've made this year. The platform is robust, fast, and incredibly intuitive.",
    "The multi-model AI comparison feature is genius. We can always choose the best model for the task at hand.",
    "Scalerbox is the central nervous system of our startup. I can't imagine scaling without it.",
    "Customer support is top-notch, and the product itself is built with such attention to detail.",
    "A must-have for any entrepreneurial team looking to streamline their operations and focus on value."
];

const jobTitles = [
    "SaaS Founder", "Marketing Director", "CTO", "Growth Lead", "Product Manager",
    "Founder", "Co-Founder", "CEO", "Head of Operations", "VP of Engineering",
    "Tech Lead", "Creative Director", "Lead Developer", "Strategy Officer", "Digital Marketer"
];

const companies = [
    "TechFlow", "CloudScale", "InnovateLabs", "NextGen", "DataPeak",
    "OrbitSystems", "FlowChart", "PixelPerfect", "CodeCraft", "StreamLine",
    "GrowthHack", "MarketFit", "Saasify", "AutoPilot", "Visionary",
    "EchoTech", "QuantumSoft", "BlueSky", "RapidScale", "CoreLogic",
    "SmartStack", "BrightWave", "LogicGate", "PrimeBase", "FutureProof",
    "AlphaMode", "BetaBuild", "GammaGraph", "DeltaDrive", "OmegaOps"
];

const names = [
    "Alex Thompson", "Sarah Miller", "Marcus Chen", "Elena Rodriguez", "David Kim",
    "James Wilson", "Michael Chang", "Olivia James", "Sophia Benoit", "Robert Taylor",
    "Emily Davis", "Jordan Lee", "Casey Wright", "Taylor Morgan", "Avery Quinn"
];

const betaPills = [
    "Early Beta User"
];

const reviews = Array.from({ length: REVIEWS_COUNT }).map((_, i) => ({
    id: i + 1,
    name: names[i % names.length] + (i > names.length ? ` ${String.fromCharCode(65 + (i % 26))}.` : ""),
    role: `${jobTitles[Math.floor(Math.random() * jobTitles.length)]} • ${companies[i % companies.length]}`,
    content: reviewTemplates[i % reviewTemplates.length],
    rating: [5.0, 4.9, 4.8, 4.7, 4.6][Math.floor(Math.random() * 5)],
    isBetaUser: i < BETA_PILLS_COUNT,
    betaPillText: betaPills[0], // Only using the one standard pill now
    avatar: `https://i.pravatar.cc/150?u=${i + 100}`,
    delay: (i % 10) * 0.1
}));

// --- Components ---

export default function ReviewsPage() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
    const [showThemeToggle, setShowThemeToggle] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isNearFooter, setIsNearFooter] = useState(false);
    const lastScrollY = useRef(0);
    const footerRef = useRef<HTMLDivElement>(null);

    // Review Dialog State
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
    const [reviewFormData, setReviewFormData] = useState({
        reviewText: '',
        video: null as File | null,
        rating: 5.0,
        socialHandle: '',
        betaInterest: false,
        email: ''
    });
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
    const [socialError, setSocialError] = useState("");
    const [betaEmailError, setBetaEmailError] = useState("");

    // Waitlist Dialog State
    const [isWaitlistDialogOpen, setIsWaitlistDialogOpen] = useState(false);
    const [waitlistEmail, setWaitlistEmail] = useState('');
    const [isWaitlistLoading, setIsWaitlistLoading] = useState(false);
    const [isWaitlistSubmitted, setIsWaitlistSubmitted] = useState(false);
    const [isWaitlistError, setIsWaitlistError] = useState(false);
    const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

    // Fetch Waitlist Count & Check LocalStorage
    useEffect(() => {
        const fetchWaitlist = async () => {
            const { data, error } = await supabase.rpc('get_waitlist_count');
            if (!error && typeof data === 'number') {
                setWaitlistCount(1323 + data);
            }
        };
        fetchWaitlist();

        // Check if user has already joined
        if (localStorage.getItem('scalerbox_waitlist_joined') === 'true') {
            setIsWaitlistSubmitted(true);
        }
    }, []);

    const handleWaitlistSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!waitlistEmail) return;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(waitlistEmail)) {
            setIsWaitlistError(true);
            return;
        }

        setIsWaitlistError(false);
        setIsWaitlistLoading(true);

        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([{ email: waitlistEmail, created_at: new Date().toISOString() }]);

            if (error) {
                if (error.code === '23505') {
                    setIsWaitlistSubmitted(true);
                    setWaitlistEmail('');
                    localStorage.setItem('scalerbox_waitlist_joined', 'true');
                }
            } else {
                setWaitlistCount(prev => (prev !== null ? prev + 1 : 1324));
                setIsWaitlistSubmitted(true);
                setWaitlistEmail('');
                localStorage.setItem('scalerbox_waitlist_joined', 'true');
            }
        } catch (err) {
            console.error('Waitlist error:', err);
            setIsWaitlistSubmitted(true);
        } finally {
            setIsWaitlistLoading(false);
        }
    };

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Review Form Data:", reviewFormData);

        // Reset form
        setReviewFormData({
            reviewText: '',
            video: null,
            rating: 5.0,
            socialHandle: '',
            betaInterest: false,
            email: ''
        });
        setVideoPreviewUrl(null);
        setIsReviewDialogOpen(false);
        setIsReviewSubmitted(true);
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 20 * 1024 * 1024) {
                alert("File size exceeds 20MB limit.");
                return;
            }
            const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
            if (!allowedTypes.includes(file.type)) {
                alert("Invalid file format. Please upload MP4, WebM, or MOV.");
                e.target.value = '';
                return;
            }
            setReviewFormData(prev => ({ ...prev, video: file }));
            setVideoPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removeVideo = () => {
        setReviewFormData(prev => ({ ...prev, video: null }));
        setVideoPreviewUrl(null);
    };

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

            {/* Navigation Bar - Consistent with About Us */}
            <div className={`fixed top-6 left-0 right-0 z-50 w-full flex justify-center px-4 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-32'}`}>
                <header className="w-full max-w-2xl h-16 flex items-center justify-between shadow-lg bg-background/80 backdrop-blur-xl rounded-full px-6 border border-white/20 transition-all hover:shadow-2xl hover:border-primary/20">
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
                    </nav>
                    <div className="flex items-center gap-2">
                        <StarBorder className="rounded-full" color="#8b5cf6" speed="6s">
                            <GlareHover width="auto" height="auto" background="transparent" borderRadius="9999px" borderColor="transparent" glareColor="rgba(255, 255, 255, 0.3)">
                                <Button variant="default" className="hidden lg:flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-none text-white hover:opacity-90" onClick={() => setIsReviewDialogOpen(true)}>
                                    Give Review
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
                                    <Link href="/" className="text-lg font-semibold">Home</Link>
                                    <Link href="/scalerboxblogs" className="text-lg font-semibold">Blogs</Link>
                                    <Link href="/roadmap" className="text-lg font-semibold">Roadmap</Link>
                                    <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white" onClick={() => { setIsReviewDialogOpen(true); setIsMenuOpen(false); }}>Give Review</Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </header>
            </div>

            <main className="flex-1 pt-32 pb-20">
                <div className="container max-w-7xl mx-auto px-4 md:px-6">

                    {/* Hero Section */}
                    <ScrollReveal>
                        <div className="flex flex-col items-center text-center mb-24">
                            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 mb-8 antialiased">
                                <Sparkles className="h-4 w-4 text-white" />
                                Verified Growth
                            </div>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 font-serif">
                                Voices of the <br /> Next-Gen Enterprise
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                                Join 1,000+ founders and teams architecting their future with Scalerbox.
                                Real feedback from the front lines of business evolution.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Reviews Masonry Grid */}
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 w-full mb-24">
                        {reviews.map((review) => (
                            <div key={review.id} className="break-inside-avoid">
                                <ScrollReveal delay={review.delay}>
                                    <Card className="group relative bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-3xl overflow-hidden p-8">
                                        {/* Beta Pill */}
                                        {review.isBetaUser && (
                                            <div className="absolute top-6 right-6">
                                                <Badge className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-primary border-primary/20 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                                                    {review.betaPillText}
                                                </Badge>
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-6">
                                            {/* Rating */}
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-0.5">
                                                    {Array.from({ length: 5 }).map((_, i) => {
                                                        const fillPercentage = Math.max(0, Math.min(100, (review.rating - i) * 100));
                                                        return (
                                                            <div key={i} className="relative inline-block">
                                                                {/* Background star (outline) */}
                                                                <Star className="h-4 w-4 text-yellow-400 fill-transparent" />
                                                                {/* Foreground star (fill) */}
                                                                <div
                                                                    className="absolute top-0 left-0 overflow-hidden h-full"
                                                                    style={{ width: `${fillPercentage}%` }}
                                                                >
                                                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <span className="font-bold text-sm text-muted-foreground pt-0.5">{review.rating.toFixed(1)}</span>
                                            </div>

                                            {/* Content */}
                                            <div className="relative">
                                                <Quote className="absolute -top-4 -left-4 h-12 w-12 text-primary/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                                                <p className="text-lg leading-relaxed text-foreground/90 font-medium italic relative z-10">
                                                    "{review.content}"
                                                </p>
                                            </div>

                                            {/* Author */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                                                        <User className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h4 className="font-bold text-base bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{review.name}</h4>
                                                        <p className="text-xs text-muted-foreground">~ {review.role}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Gloss effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    </Card>
                                </ScrollReveal>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA Section */}
                    <ScrollReveal>
                        <div className="relative rounded-[3rem] overflow-hidden mb-12">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                            <div className="relative z-10 p-12 md:p-24 text-center text-white">
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience the Evolution</h2>
                                <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                                    Join the high-growth teams already scaling with unified intelligence.
                                    Secure your spot in our limited private beta today.
                                </p>
                                <StarBorder className="mx-auto rounded-full" color="#ffffff" speed="6s">
                                    <GlareHover width="auto" height="auto" background="transparent" borderRadius="9999px" borderColor="transparent" glareColor="rgba(255, 255, 255, 0.3)">
                                        <Button
                                            size="lg"
                                            variant="secondary"
                                            className="group rounded-full px-8 py-6 text-lg font-bold bg-white text-purple-600 hover:bg-white/90"
                                            onClick={() => setIsWaitlistDialogOpen(true)}
                                        >
                                            Apply for Beta Access
                                            <ArrowUpRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={3} />
                                        </Button>
                                    </GlareHover>
                                </StarBorder>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </main>

            {/* Footer */}
            <div ref={footerRef}>
                <Footer />
            </div>

            <ContactFormDialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} />

            {/* Waitlist Dialog */}
            <Dialog open={isWaitlistDialogOpen} onOpenChange={setIsWaitlistDialogOpen}>
                <DialogContent className="sm:max-w-[425px] overflow-visible">
                    {!isWaitlistSubmitted ? (
                        <>
                            <div className="flex flex-col items-center text-center gap-2 mb-2">
                                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-2">
                                    <Sparkles className="h-6 w-6 text-primary" />
                                </span>
                                <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                                    Join the Waitlist
                                </DialogTitle>
                                <DialogDescription className="text-center text-base">
                                    Get early access to Scalerbox and shape the future of growth tools.
                                </DialogDescription>
                            </div>

                            <div className="bg-muted/30 p-4 rounded-lg my-2 border border-border/50">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-zinc-200 dark:bg-zinc-800" />
                                        ))}
                                    </div>
                                    <p className="text-xs font-medium text-foreground/80">
                                        Be the first to access new features.
                                    </p>
                                </div>

                                <form onSubmit={handleWaitlistSubmit} className="flex items-center gap-2 w-full mt-2 overflow-visible">
                                    <div className="relative flex-1">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={waitlistEmail}
                                            onChange={(e) => {
                                                setWaitlistEmail(e.target.value);
                                                if (isWaitlistError) setIsWaitlistError(false);
                                            }}
                                            onBlur={() => {
                                                if (waitlistEmail && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(waitlistEmail)) {
                                                    setIsWaitlistError(true);
                                                } else {
                                                    setIsWaitlistError(false);
                                                }
                                            }}
                                            className={cn(
                                                "h-10 transition-all duration-300",
                                                isWaitlistError && "ring-2 ring-red-500 ring-offset-2 border-red-500"
                                            )}
                                            required
                                        />
                                    </div>
                                    <GlareHover width="auto" height="auto" background="transparent" borderRadius="0.5rem" borderColor="transparent" glareColor="rgba(255, 255, 255, 0.3)">
                                        <Button
                                            type="submit"
                                            disabled={isWaitlistLoading}
                                            className="h-10 px-6 font-medium shadow-md hover:opacity-95 transition-all"
                                        >
                                            {isWaitlistLoading ? "Submitting..." : "Submit"}
                                        </Button>
                                    </GlareHover>
                                </form>

                                <div className="flex flex-row items-center justify-center gap-4 pt-2">
                                    <div className="flex -space-x-3">
                                        {[
                                            'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/usr_profile_pic/0RjpHqAWXQWx8PUNVNshJMVB.webp',
                                            'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/usr_profile_pic/73x73.png',
                                            'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/usr_profile_pic/8d424029-abc9-4065-844a-b683fc0ca181_Doug_Head_Orange_1.webp',
                                            'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/usr_profile_pic/XpIHpU4bolYHaDLHK1aynfRO.webp',
                                            'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/usr_profile_pic/aea0d5fe-1c02-4ce2-bcef-0e5a06317cd6_Headshot-Maggie.webp'
                                        ].map((src, i) => (
                                            <div key={i} className="relative w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                                                <Image src={src} alt="User" fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            <span className="text-sm font-semibold ml-1">5.0</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                                            Joined by <span className="font-bold text-foreground">{waitlistCount ? waitlistCount.toLocaleString() : "1,324"}</span> entrepreneurs
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center py-6">
                            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <DialogTitle className="text-2xl font-bold mb-2">You're on the list!</DialogTitle>
                            <p className="text-muted-foreground mb-6">
                                We'll notify you as soon as new spots open up.
                            </p>
                            <Button
                                onClick={() => setIsWaitlistDialogOpen(false)}
                                variant="outline"
                                className="rounded-full px-8"
                            >
                                Close
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Give Review Dialog */}
            <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            Give your review
                        </DialogTitle>
                        <DialogDescription>
                            We'd love to hear your feedback! Share your experience with Scalerbox.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleReviewSubmit} className="mt-2 text-foreground">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Left Column: Inputs */}
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="review-text" className="text-base font-semibold">Your Review</Label>
                                    <Textarea
                                        id="review-text"
                                        placeholder="Share your experience with Scalerbox..."
                                        className="min-h-[120px] max-h-[200px] resize-none"
                                        value={reviewFormData.reviewText}
                                        onChange={(e) => setReviewFormData({ ...reviewFormData, reviewText: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="social-handle" className="text-base font-semibold">Twitter/LinkedIn Handle <span className="text-xs font-normal text-muted-foreground">(Optional)</span></Label>
                                    <Input
                                        id="social-handle"
                                        placeholder="@username or link"
                                        value={reviewFormData.socialHandle}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setReviewFormData({ ...reviewFormData, socialHandle: val });
                                            if (val && !/^(https?:\/\/(www\.)?(twitter\.com|x\.com|linkedin\.com)\/.+|@[\w_]+)$/i.test(val)) {
                                                setSocialError("Please put a valid username or URL");
                                            } else {
                                                setSocialError("");
                                            }
                                        }}
                                        className={socialError ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    />
                                    {socialError && <p className="text-xs text-red-500 font-medium">{socialError}</p>}
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 border p-3 rounded-lg bg-muted/20">
                                        <Checkbox
                                            id="beta-access"
                                            checked={reviewFormData.betaInterest}
                                            onCheckedChange={(checked) => setReviewFormData({ ...reviewFormData, betaInterest: checked as boolean })}
                                        />
                                        <label
                                            htmlFor="beta-access"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            I'm interested in early beta access
                                        </label>
                                    </div>

                                    {reviewFormData.betaInterest && (
                                        <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-1.5">
                                            <Label htmlFor="beta-email" className="text-base font-semibold">Email for Beta Access</Label>
                                            <Input
                                                id="beta-email"
                                                type="email"
                                                placeholder="your@email.com"
                                                className={cn("mt-1.5 transition-all duration-200", betaEmailError ? "border-red-500 focus-visible:ring-red-500" : "")}
                                                required
                                                value={reviewFormData.email}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setReviewFormData({ ...reviewFormData, email: val });
                                                    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                                                        setBetaEmailError("Please enter a valid email address");
                                                    } else {
                                                        setBetaEmailError("");
                                                    }
                                                }}
                                            />
                                            {betaEmailError && <p className="text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{betaEmailError}</p>}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Video + Rating */}
                            <div className="space-y-5 flex flex-col">
                                <div className="space-y-2 flex-grow flex flex-col">
                                    <Label className="text-base font-semibold">Share a video review <span className="text-xs font-normal text-muted-foreground">(Optional)</span></Label>
                                    {!videoPreviewUrl ? (
                                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer relative group flex-grow min-h-[200px]">
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={handleVideoUpload}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <Upload className="h-8 w-8 text-primary" />
                                            </div>
                                            <p className="font-medium text-lg">Click to upload video</p>
                                            <p className="text-sm text-muted-foreground mt-1">Max 20MB</p>
                                        </div>
                                    ) : (
                                        <div className="relative rounded-xl overflow-hidden border border-border bg-black/5 dark:bg-white/5 flex-grow flex items-center justify-center min-h-[200px]">
                                            <video src={videoPreviewUrl} controls className="w-full max-h-[300px] object-contain" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                                onClick={removeVideo}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 pt-2">
                                    <Label className="text-base font-semibold text-foreground">Your Rating</Label>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <div
                                                    key={star}
                                                    className="relative cursor-pointer hover:scale-110 transition-transform"
                                                    onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                                                >
                                                    <Star className={cn("h-8 w-8", star <= reviewFormData.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/20 fill-muted-foreground/20")} />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-xl font-bold text-foreground">{reviewFormData.rating.toFixed(1)}</span>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 py-6 text-lg font-bold">
                                    Submit Review
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Success Dialog */}
            <Dialog open={isReviewSubmitted} onOpenChange={setIsReviewSubmitted}>
                <DialogContent className="sm:max-w-[450px] gap-1 p-5">
                    <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
                        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="text-center space-y-2 text-foreground">
                            <DialogTitle className="text-xl font-semibold">Thank you!</DialogTitle>
                            <p className="text-muted-foreground">Your review has been submitted successfully.</p>
                        </div>
                        <Button onClick={() => setIsReviewSubmitted(false)} variant="outline" className="mt-4">
                            Close
                        </Button>
                    </div>
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
                    <ChevronDownIcon className="h-6 w-6 rotate-180" />
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
