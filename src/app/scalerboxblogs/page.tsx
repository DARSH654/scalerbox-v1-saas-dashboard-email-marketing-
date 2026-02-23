
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowRight, Calendar, PawPrint, ChevronsUpDown, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { blogPosts, type BlogPost } from "@/lib/blog-data";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Footer } from "@/components/footer";
import { GlobalLoader } from '@/components/ui/global-loader';

function BlogList() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const [showThemeToggle, setShowThemeToggle] = useState(false);
    const [isNearFooter, setIsNearFooter] = useState(false);
    const lastScrollY = useRef(0);
    const footerRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeFilter = searchParams.get('filter') || 'All Posts';

    const categories = ["All Posts", ...Array.from(new Set(blogPosts.map((post: BlogPost) => post.category)))];

    // Safety check in case blogPosts is empty or undefined
    const safeBlogPosts = blogPosts || [];
    const filteredPosts = activeFilter === "All Posts"
        ? safeBlogPosts
        : safeBlogPosts.filter((post: BlogPost) => post.category === activeFilter);

    const handleFilterChange = (newFilter: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('filter', newFilter);
        router.push(`${pathname}?${params.toString()}`);
    }

    const handlePostClick = () => {
        sessionStorage.setItem('blogScrollPosition', window.scrollY.toString());
    };

    useEffect(() => {
        setMounted(true);
        const savedScrollPosition = sessionStorage.getItem('blogScrollPosition');
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
            sessionStorage.removeItem('blogScrollPosition');
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsAtTop(currentScrollY < 100);

            // Hide on scroll down (if moved more than 10px to avoid jitter)
            if (currentScrollY > lastScrollY.current + 10) {
                setIsVisible(false);
            }
            // Show on scroll up
            else if (currentScrollY < lastScrollY.current - 10) {
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
        <div className="flex flex-col min-h-screen bg-background">
            <div className="pb-20 flex-grow">
                <div className="py-12 text-center">
                    <h1 className="text-5xl font-bold text-foreground font-serif">
                        Scalerbox <span className="text-primary animated-gradient-text">Blog</span>
                    </h1>
                    <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
                        Your go-to source for business growth tips, AI-powered insights, and making scaling simpler.
                    </p>
                    <div className="mt-8 flex justify-center flex-wrap gap-2 px-4">
                        {categories.map(category => (
                            <Button
                                key={category}
                                variant={activeFilter === category ? "default" : "outline"}
                                onClick={() => handleFilterChange(category)}
                                className={cn(
                                    "rounded-full transition-all duration-300",
                                    activeFilter === category
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-md hover:opacity-90"
                                        : "hover:border-primary/50"
                                )}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="max-w-6xl mx-auto py-8 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post: BlogPost) => (
                            <Link href={`/scalerboxblogs/${post.slug}`} key={post.id} onClick={handlePostClick}>
                                <Card className="flex flex-col overflow-hidden group bg-card hover:shadow-lg transition-shadow duration-300 h-full">
                                    <CardHeader className="p-0 relative">
                                        <div className="relative w-full h-48 bg-primary/10 overflow-hidden">
                                            {post.coverImage && (
                                                <>
                                                    <Image
                                                        src={post.coverImage}
                                                        alt={post.headerTitle}
                                                        fill
                                                        className="object-cover transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-black/10" />
                                                </>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 flex-grow flex flex-col">
                                        <div className="flex-grow">
                                            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-sm">
                                                {post.category}
                                            </Badge>
                                            <CardTitle className="text-xl mb-4 font-bold transition-all duration-300 group-hover:scale-[1.02] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                                                {post.formattedTitle ? (
                                                    <span dangerouslySetInnerHTML={{ __html: post.formattedTitle }} />
                                                ) : (
                                                    post.title
                                                )}
                                            </CardTitle>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-6">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={post.authorImage} />
                                                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-semibold">{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>{post.date}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div ref={footerRef}>
                <Footer />
            </div>
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

export default function BlogPage() {
    return (
        <Suspense fallback={<GlobalLoader size={64} />}>
            <BlogList />
        </Suspense>
    );
}
