
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram, Youtube, Monitor, Sun, Moon } from 'lucide-react';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Footer() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <footer className="mx-4 md:mx-6 mb-4 md:mb-6 pt-12 md:pt-16 pb-6 md:pb-8 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 rounded-[3rem] shadow-2xl dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.25)] relative z-10 w-auto">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-6">
                            <Image
                                src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png"
                                alt="Scalerbox Logo"
                                width={50}
                                height={50}
                                className="mr-0 flex-shrink-0"
                            />
                            <div className="flex flex-col justify-center min-w-[200px]">
                                <span className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1">Scalerbox</span>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-tight">
                                    Automate your marketing <br /> with Scalerbox.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center ml-[20px]">
                            <div className="flex gap-4">
                                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    {/* X (formerly Twitter) icon */}
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </Link>
                                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><Instagram className="h-5 w-5" /></Link>
                                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><Youtube className="h-5 w-5" /></Link>
                                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></Link>
                            </div>
                            {/* Theme Toggle */}
                            {mounted && (
                                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-full border border-slate-200 dark:border-slate-800 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setTheme("system")}
                                        className={cn(
                                            "p-1.5 rounded-full transition-colors cursor-pointer",
                                            theme === "system" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                        )}
                                        title="System Theme"
                                    >
                                        <Monitor className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTheme("light")}
                                        className={cn(
                                            "p-1.5 rounded-full transition-colors cursor-pointer",
                                            theme === "light" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                        )}
                                        title="Light Mode"
                                    >
                                        <Sun className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTheme("dark")}
                                        className={cn(
                                            "p-1.5 rounded-full transition-colors cursor-pointer",
                                            theme === "dark" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                        )}
                                        title="Dark Mode"
                                    >
                                        <Moon className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-1 pl-5">
                        <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Features</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/#automate-blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog Automation</Link></li>
                            <li><Link href="/#unified-dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">SaaS Analytics</Link></li>
                            <li><Link href="/#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Multi AI Chat</Link></li>
                            <li><Link href="/#enterprise" className="hover:text-slate-900 dark:hover:text-white transition-colors">Team Collaboration</Link></li>
                            <li><Link href="/#privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Data Security</Link></li>
                        </ul>
                    </div>

                    <div className="pl-5">
                        <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Integrations</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="https://wordpress.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">WordPress</Link></li>
                            <li><Link href="https://webflow.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">Webflow</Link></li>
                            <li><Link href="https://stripe.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">Stripe</Link></li>
                            <li><Link href="https://www.paypal.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">PayPal</Link></li>
                            <li><Link href="https://razorpay.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">Razorpay</Link></li>
                        </ul>
                    </div>

                    <div className="pl-5">
                        <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Resources</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/scalerboxblogs" target="_blank" className="hover:text-slate-900 dark:hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>Blogs</Link></li>
                            <li><Link href="/about" target="_blank" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/scalerboxreviews" target="_blank" className="hover:text-slate-900 dark:hover:text-white transition-colors">Reviews</Link></li>
                            <li><Link href="/roadmap" target="_blank" className="hover:text-slate-900 dark:hover:text-white transition-colors">Roadmap</Link></li>
                        </ul>
                    </div>

                    <div className="pl-5">
                        <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Legal</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/privacy-policy" target="_blank" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" target="_blank" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/cookie-policy" target="_blank" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center text-center gap-4 relative">
                    <p className="text-base font-medium text-slate-500 dark:text-slate-400">Copyright © 2026 Scalerbox. All rights reserved.</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
                        We’ll Build The Audience. The Ultimate Growth & Management OS for Modern Entrepreneurs.
                    </p>


                </div>
            </div>
        </footer>
    );
}
