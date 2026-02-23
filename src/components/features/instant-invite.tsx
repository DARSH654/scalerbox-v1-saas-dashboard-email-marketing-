'use client';

import React from 'react';
import { UserPlus, FileText, X } from 'lucide-react';

export function InstantInvite() {
    return (
        // Removed outer padding and bg-slate-50 to fill parent container
        <div className="w-full h-full relative flex flex-col bg-transparent">
            {/* Main Content Area */}
            <div
                className="flex-1 relative flex items-center justify-center p-6 overflow-hidden"
            >
                <div className="relative w-full h-full flex items-center justify-center transform scale-[0.8] sm:scale-[1.0] md:scale-[1.3] transition-transform duration-500">
                    {/* Live Activity Card - glass-card-high-contrast */}
                    <div className="absolute top-8 right-6 px-5 py-4 rounded-2xl -rotate-2 z-10 shadow-2xl min-w-[240px] bg-white/98 dark:bg-zinc-900/95 border border-white dark:border-white/10 backdrop-blur-[8px]">
                        <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-white/10 pb-2">
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-indigo-600"></div>
                                <span className="text-[10px] font-extrabold text-slate-900 dark:text-white uppercase tracking-widest">Live Activity</span>
                            </div>
                            <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase">Just now</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img alt="User" className="size-8 rounded-full border-2 border-slate-100 dark:border-white/10 shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcyhO33lgb35PrkKcVfjeHcqcl2tzLiMBH1JabWLzTZYrAa8ZKkuC_H-tnEu1vbmGqTm1a1EuZ7W_K4quXV7P30DzVYO1zK6zeDbIwedyZSrLhnjpsSxvdJ6r9opct05-UfcNMIf_-Bv8R9X9yw5BRTGA4zssh2NqGUKsgVV3qXptgZVCQOls3UW0yQ5sRQeg1sPCZ3ryPNhs5RPlTKZVJdL9Q8u--l5VkpbZj5P9xp7uwzNWrqoaec9vNDFZYvL46E12ZQ05MOg" />
                                    <div className="absolute -right-1 -bottom-1 size-3.5 bg-indigo-600 rounded-full flex items-center justify-center border border-white dark:border-zinc-900">
                                        <UserPlus className="w-[10px] h-[10px] text-white" strokeWidth={3} />
                                    </div>
                                </div>
                                <p className="text-[13px] text-slate-900 dark:text-slate-50 font-bold">Alex joined workspace</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img alt="User" className="size-8 rounded-full border-2 border-slate-100 dark:border-white/10 shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSDC4lHRaygajhzwURN09xIip76FfaLZcLVNw5VTzxUs3aL3-dq6PWvfsVh5wMvIkw2x_xlZpY5MgfNbFOEEIkYRLNlHiXav6ckLmKlyi3oG_Zh1Y61fEFi2ip7ejCmDJwrsQCG7EjAxwz-69V6N6XaQGb_K1OJmHPliwoA9_7zqTSskgmcWcBe9oyHjmt-RqAp5lRMM5jcfKBZc6l0xfxRxGmOQO0JChiraZWKUXGpV8TRawpKUf93aK9eef2RyLPnP5HphkcTg" />
                                    <div className="absolute -right-1 -bottom-1 size-3.5 bg-purple-600 rounded-full flex items-center justify-center border border-white dark:border-zinc-900">
                                        <FileText className="w-[10px] h-[10px] text-white" strokeWidth={3} />
                                    </div>
                                </div>
                                <p className="text-[13px] text-slate-900 dark:text-slate-50 font-bold">Emma shared a file</p>
                            </div>
                        </div>
                    </div>

                    {/* Active Members Card - glass-card-high-contrast */}
                    <div className="absolute bottom-10 left-6 p-5 rounded-2xl rotate-3 z-10 shadow-2xl bg-white/98 dark:bg-zinc-900/95 border border-white dark:border-white/10 backdrop-blur-[8px]">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="flex -space-x-3">
                                <div className="relative">
                                    <img alt="Team" className="size-10 rounded-full border-2 border-white dark:border-zinc-900 shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcyhO33lgb35PrkKcVfjeHcqcl2tzLiMBH1JabWLzTZYrAa8ZKkuC_H-tnEu1vbmGqTm1a1EuZ7W_K4quXV7P30DzVYO1zK6zeDbIwedyZSrLhnjpsSxvdJ6r9opct05-UfcNMIf_-Bv8R9X9yw5BRTGA4zssh2NqGUKsgVV3qXptgZVCQOls3UW0yQ5sRQeg1sPCZ3ryPNhs5RPlTKZVJdL9Q8u--l5VkpbZj5P9xp7uwzNWrqoaec9vNDFZYvL46E12ZQ05MOg" />
                                    <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                                </div>
                                <div className="relative">
                                    <img alt="Team" className="size-10 rounded-full border-2 border-white dark:border-zinc-900 shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSDC4lHRaygajhzwURN09xIip76FfaLZcLVNw5VTzxUs3aL3-dq6PWvfsVh5wMvIkw2x_xlZpY5MgfNbFOEEIkYRLNlHiXav6ckLmKlyi3oG_Zh1Y61fEFi2ip7ejCmDJwrsQCG7EjAxwz-69V6N6XaQGb_K1OJmHPliwoA9_7zqTSskgmcWcBe9oyHjmt-RqAp5lRMM5jcfKBZc6l0xfxRxGmOQO0JChiraZWKUXGpV8TRawpKUf93aK9eef2RyLPnP5HphkcTg" />
                                    <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                                </div>
                            </div>
                            <div>
                                <p className="text-[13px] font-extrabold text-slate-900 dark:text-white leading-none">8 Active</p>
                                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold mt-1">Collaborating now</p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full w-[65%]"></div>
                        </div>
                    </div>

                    {/* Invite Members Dialog Card (Main Center) - glass-card-high-contrast */}
                    <div className="relative z-30 w-full max-w-[340px] bg-white/95 dark:bg-zinc-900/90 rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden border border-white dark:border-white/10 backdrop-blur-[12px]">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">Invite Members</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Scale your team productivity</p>
                                </div>
                                <button className="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors" suppressHydrationWarning>
                                    <X className="text-slate-400 text-xl font-light w-5 h-5" strokeWidth={1.5} />
                                </button>
                            </div>

                            <div className="space-y-1">
                                {/* User Row 1 */}
                                <div className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all border border-transparent">
                                    <div className="relative">
                                        <img alt="Sarah Chen" className="size-10 rounded-full object-cover ring-2 ring-white dark:ring-zinc-800 shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcyhO33lgb35PrkKcVfjeHcqcl2tzLiMBH1JabWLzTZYrAa8ZKkuC_H-tnEu1vbmGqTm1a1EuZ7W_K4quXV7P30DzVYO1zK6zeDbIwedyZSrLhnjpsSxvdJ6r9opct05-UfcNMIf_-Bv8R9X9yw5BRTGA4zssh2NqGUKsgVV3qXptgZVCQOls3UW0yQ5sRQeg1sPCZ3ryPNhs5RPlTKZVJdL9Q8u--l5VkpbZj5P9xp7uwzNWrqoaec9vNDFZYvL46E12ZQ05MOg" />
                                        <div className="absolute bottom-0.5 right-0.5 size-2.5 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">Sarah Chen</p>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-none mt-0.5">sarah@studio.com</p>
                                    </div>
                                    <button className="text-[10px] font-bold text-white px-4 py-1.5 rounded-lg shadow-md hover:brightness-110 transition-all active:scale-95" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #a259ff 100%)' }} suppressHydrationWarning>Add</button>
                                </div>

                                {/* User Row 2 */}
                                <div className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all border border-transparent">
                                    <div className="relative">
                                        <img alt="Michael Ross" className="size-10 rounded-full object-cover ring-2 ring-white dark:ring-zinc-800 shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSDC4lHRaygajhzwURN09xIip76FfaLZcLVNw5VTzxUs3aL3-dq6PWvfsVh5wMvIkw2x_xlZpY5MgfNbFOEEIkYRLNlHiXav6ckLmKlyi3oG_Zh1Y61fEFi2ip7ejCmDJwrsQCG7EjAxwz-69V6N6XaQGb_K1OJmHPliwoA9_7zqTSskgmcWcBe9oyHjmt-RqAp5lRMM5jcfKBZc6l0xfxRxGmOQO0JChiraZWKUXGpV8TRawpKUf93aK9eef2RyLPnP5HphkcTg" />
                                        <div className="absolute bottom-0.5 right-0.5 size-2.5 bg-slate-300 border-2 border-white dark:border-zinc-900 rounded-full"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">Michael Ross</p>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-none mt-0.5">m.ross@studio.com</p>
                                    </div>
                                    <button className="text-[10px] font-bold text-white px-4 py-1.5 rounded-lg shadow-md hover:brightness-110 transition-all active:scale-95" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #a259ff 100%)' }} suppressHydrationWarning>Add</button>
                                </div>
                            </div>

                            {/* Invite via Email */}
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/10">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">Invite via email address</label>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2 items-center">
                                        <div className="relative flex-1">
                                            <input className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/20 focus:bg-white dark:focus:bg-black/40 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 text-black dark:text-white" placeholder="jane@company.com" type="email" suppressHydrationWarning />
                                        </div>
                                        <button className="text-white rounded-xl px-5 py-2.5 text-sm font-bold shadow-xl shadow-indigo-200 transition-all active:scale-95 hover:brightness-110 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #a259ff 100%)' }} suppressHydrationWarning>
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50/80 dark:bg-zinc-900/90 backdrop-blur-sm p-4 flex items-center justify-between border-t border-slate-100 dark:border-white/10">
                            <div className="flex -space-x-1.5">
                                <div className="size-7 rounded-full border-2 border-white dark:border-zinc-900 bg-slate-200 overflow-hidden shadow-sm">
                                    <img className="object-cover size-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcyhO33lgb35PrkKcVfjeHcqcl2tzLiMBH1JabWLzTZYrAa8ZKkuC_H-tnEu1vbmGqTm1a1EuZ7W_K4quXV7P30DzVYO1zK6zeDbIwedyZSrLhnjpsSxvdJ6r9opct05-UfcNMIf_-Bv8R9X9yw5BRTGA4zssh2NqGUKsgVV3qXptgZVCQOls3UW0yQ5sRQeg1sPCZ3ryPNhs5RPlTKZVJdL9Q8u--l5VkpbZj5P9xp7uwzNWrqoaec9vNDFZYvL46E12ZQ05MOg" />
                                </div>
                                <div className="size-7 rounded-full border-2 border-white dark:border-zinc-900 bg-slate-200 overflow-hidden shadow-sm">
                                    <img className="object-cover size-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSDC4lHRaygajhzwURN09xIip76FfaLZcLVNw5VTzxUs3aL3-dq6PWvfsVh5wMvIkw2x_xlZpY5MgfNbFOEEIkYRLNlHiXav6ckLmKlyi3oG_Zh1Y61fEFi2ip7ejCmDJwrsQCG7EjAxwz-69V6N6XaQGb_K1OJmHPliwoA9_7zqTSskgmcWcBe9oyHjmt-RqAp5lRMM5jcfKBZc6l0xfxRxGmOQO0JChiraZWKUXGpV8TRawpKUf93aK9eef2RyLPnP5HphkcTg" />
                                </div>
                                <div className="size-7 rounded-full border-2 border-white dark:border-zinc-900 bg-white dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400 shadow-sm">+12</div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="size-1.5 rounded-full bg-green-500"></span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">14 members online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
