'use client';

import React, { useState } from 'react';
import { Briefcase, Palette, Terminal, Info, Trash2, Sparkles } from 'lucide-react';

const texts: Record<string, string> = {
    professional: "Maintain a formal, authoritative, and helpful tone. Use formal language, industry-standard terminology, and ensure all responses are strictly business-appropriate. Avoid slang or overly casual phrasing. Prioritize clarity and conciseness.",
    creative: "Adopt a creative, expressive, and imaginative brand voice. Use vibrant metaphors and a friendly tone. Feel free to use emojis where appropriate to add personality. The goal is to inspire and engage the user with fresh ideas.",
    technical: "Focus on technical accuracy, precision, and structural clarity. Provide clear code examples where applicable. Avoid fluff and go straight to the solution. Ensure all technical terms are used correctly and explanations are deep and thorough."
};

const defaultText = "Our brand voice is professional yet accessible. We prioritize clarity, accuracy, and efficiency in our communications. Ensure all responses align with our core values of integrity and innovation while maintaining a helpful and proactive stance in every interaction.";

export function SharedTeamContext() {
    const [selectedTone, setSelectedTone] = useState<string | null>(null);
    const [textValue, setTextValue] = useState(defaultText);

    const selectTone = (tone: string) => {
        setSelectedTone(tone);
        setTextValue(texts[tone]);
    };

    const resetDefaults = () => {
        setSelectedTone(null);
        setTextValue(defaultText);
    };

    return (
        <div className="w-full h-full relative flex flex-col font-['Inter',sans-serif]">
            {/* Consolidated Styles to Fix Nested Styled-JSX Error */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(156, 163, 175, 0.5);
                    border-radius: 20px;
                }
                .gradient-toggle {
                    transition: background 0.3s ease;
                }
                input:checked + .gradient-toggle {
                    background: linear-gradient(135deg, #436DDD 0%, #7B4EE8 100%) !important;
                }
                .purple-shadow-card {
                    box-shadow: 0 10px 40px -10px rgba(123, 78, 232, 0.25);
                }
                .purple-shadow-focus:focus-within {
                    box-shadow: 0 8px 30px -5px rgba(123, 78, 232, 0.35);
                    border-color: rgba(123, 78, 232, 0.5);
                }
            `}</style>

            {/* Live Team Syncing Badge - Bottom Left Outside Card */}
            <div className="absolute -bottom-7 -left-6 z-50 animate-bounce hidden md:block" style={{ animationDuration: '2s' }}>
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl p-2.5 md:p-3 pl-3 md:pl-4 pr-4 md:pr-6 flex items-center gap-2 md:gap-3 shadow-xl transition-colors duration-300">
                    <div className="flex -space-x-2 overflow-hidden">
                        <img
                            alt="User 1"
                            className="inline-block h-7 w-7 md:h-8 md:w-8 rounded-full ring-2 ring-white dark:ring-slate-800 object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHV7g7eEGUgVPIWJ6XuLofGnclbIqrwE3DezrMa0wj331fQ3y2iMsAhw8QW00VtGxvRzzv_b0-P4Pw_N5htDmkvPzEF1jAAbHX_RGLH3oXZKTDn862A-YaiUWQSLevk8WbX0528BcZkCeJWXaR-Wx-vkW-BjGBsdtBoBMxeG3_RlDoUTG3SF3i5GOyHB0HfG6aaaxVJA9b4DloL-HK2KTwzziOc9oPHz5HN8Ep911RzRCz9bMM7UWV95t5kwyVs-rk_WxKFF2zGeE"
                        />
                        <img
                            alt="User 2"
                            className="inline-block h-7 w-7 md:h-8 md:w-8 rounded-full ring-2 ring-white dark:ring-slate-800 object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmfOUSalnNw2kuIQS0HVaB80KTOR0eoRlckS4oQw38ZYKzLqOMN-0E_MptW0Z1-_42qR8L3xqJvjczo76dqi_t6-RfghLiW2-f1hHKbqEahdEh1tMTm9g1LYDIkwlOTExo-fkwjNpes6_aJ7-t5O36eARzVmkxMYrYA3GUYTVhRhe25sSkOaS1DsKahUbywaqzRqElcFDxwIktu_OXxgDqn9Kn7YUDJYvyJE4-riGF_HFvCkzNiQLz_38gDWIJV4L67PELGNYg820"
                        />
                    </div>
                    <div>
                        <p className="text-[10px] md:text-xs font-bold text-slate-800 dark:text-white transition-colors duration-300">Live Team Syncing...</p>
                    </div>
                </div>
            </div>

            {/* Main Full-Size Card */}
            <div className="w-full h-full relative group/card flex flex-col transition-all duration-500">
                <div className="w-full h-full relative bg-white dark:bg-[#161B28] flex flex-col rounded-3xl overflow-hidden z-10 purple-shadow-card">
                    {/* Header */}
                    <div className="px-6 md:px-8 py-4 md:py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 transition-colors duration-300">
                        <div>
                            <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">Global Team Context</h2>
                            <p className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-[0.2em] font-bold transition-colors duration-300">Shared Workspace Configuration</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="inline-flex items-center cursor-pointer">
                                <span className="mr-3 text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 hidden sm:block transition-colors duration-300">Apply to all chats</span>
                                <div className="relative">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div
                                        className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white transition-colors duration-300 gradient-toggle"
                                    ></div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 md:p-8 space-y-4 md:space-y-6 overflow-hidden flex flex-col">
                        <div className="space-y-3 md:space-y-4 flex-1 flex flex-col">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors duration-300">
                                Brand Voice & Core Persona
                            </label>

                            {/* Text Area Container */}
                            <div className="relative group flex-1 rounded-2xl transition-all duration-300 purple-shadow-focus">
                                <div
                                    className="relative w-full h-full rounded-2xl border border-slate-200 dark:border-slate-800 transition-all duration-200 overflow-hidden bg-slate-50 dark:bg-[#0F131E]"
                                >
                                    <textarea
                                        className="custom-scrollbar w-full h-full bg-transparent border-none focus:ring-0 p-4 md:p-6 pr-2 text-slate-700 dark:text-slate-200 transition-all resize-none leading-relaxed overflow-y-auto block placeholder-slate-400 dark:placeholder-slate-500 text-sm md:text-base focus:outline-none relative z-10"
                                        placeholder="Select a template or start typing your team's global instructions here..."
                                        value={textValue}
                                        onChange={(e) => setTextValue(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tone Pills */}
                        <div className="space-y-2 md:space-y-3 shrink-0">
                            <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest transition-colors duration-300">Quick-Action Tone Templates</p>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                <button
                                    onClick={() => selectTone('professional')}
                                    className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all text-xs md:text-sm font-semibold border ${selectedTone === 'professional'
                                        ? 'text-white border-transparent shadow-lg shadow-[#436DDD]/20'
                                        : 'bg-slate-100 dark:bg-slate-800/30 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 border-transparent'
                                        }`}
                                    style={selectedTone === 'professional' ? { background: 'linear-gradient(135deg, #436DDD 0%, #7B4EE8 100%)' } : {}}
                                >
                                    <Briefcase size={16} />
                                    Professional
                                </button>
                                <button
                                    onClick={() => selectTone('creative')}
                                    className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all text-xs md:text-sm font-semibold border ${selectedTone === 'creative'
                                        ? 'text-white border-transparent shadow-lg shadow-[#436DDD]/20'
                                        : 'bg-slate-100 dark:bg-slate-800/30 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 border-transparent'
                                        }`}
                                    style={selectedTone === 'creative' ? { background: 'linear-gradient(135deg, #436DDD 0%, #7B4EE8 100%)' } : {}}
                                >
                                    <Palette size={16} />
                                    Creative
                                </button>
                                <button
                                    onClick={() => selectTone('technical')}
                                    className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all text-xs md:text-sm font-semibold border ${selectedTone === 'technical'
                                        ? 'text-white border-transparent shadow-lg shadow-[#436DDD]/20'
                                        : 'bg-slate-100 dark:bg-slate-800/30 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 border-transparent'
                                        }`}
                                    style={selectedTone === 'technical' ? { background: 'linear-gradient(135deg, #436DDD 0%, #7B4EE8 100%)' } : {}}
                                >
                                    <Terminal size={16} />
                                    Technical
                                </button>
                            </div>
                        </div>

                        {/* Info text & Footer */}
                        <div className="shrink-0 space-y-4 pt-2">
                            <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2 italic transition-colors duration-300">
                                <Info
                                    size={16}
                                    className="shrink-0 text-brand-purple"
                                    color="#436DDD"
                                />
                                Changes apply instantly to all active workspace conversations.
                            </p>

                            <div className="pt-4 md:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
                                <button
                                    onClick={resetDefaults}
                                    className="text-xs md:text-sm font-bold text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1.5"
                                >
                                    <Trash2 size={16} />
                                    Reset Defaults
                                </button>
                                <button
                                    className="w-full sm:w-auto text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#436DDD]/20 flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-[#436DDD]/40 text-sm md:text-base relative overflow-hidden group"
                                    style={{ background: 'linear-gradient(135deg, #436DDD 0%, #7B4EE8 100%)' }}
                                >
                                    <Sparkles size={18} className="group-hover:animate-pulse" />
                                    Update Shared Context
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
