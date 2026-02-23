'use client';

import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Sliders, Play, Plus, Trash2, Info } from 'lucide-react';

interface Rule {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive';
    type: 'exclusion' | 'inclusion' | 'formatting';
}

const initialRules: Rule[] = [
    {
        id: '1',
        name: 'Strict Brand Safety',
        description: 'Block all competitor mentions and ensure non-offensive language across all platforms.',
        status: 'active',
        type: 'exclusion'
    },
    {
        id: '2',
        name: 'Technical Precision',
        description: 'Enforce specific terminology for API documentation and code snippet formatting.',
        status: 'active',
        type: 'formatting'
    },
    {
        id: '3',
        name: 'Edge Case Logic',
        description: 'Define specific handling for unusual user queries to prevent hallucination.',
        status: 'inactive',
        type: 'inclusion'
    }
];

export function ExceptionRules() {
    const [rules, setRules] = useState<Rule[]>(initialRules);

    const toggleRule = (id: string) => {
        setRules(rules.map(rule =>
            rule.id === id ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' } : rule
        ));
    };

    return (
        <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-transparent">
            {/* Main Interactive Container - glass-card-high-contrast */}
            <div className="relative w-full max-w-[480px] bg-white dark:bg-zinc-900 rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-white dark:border-white/10 backdrop-blur-xl overflow-hidden transform transition-all duration-500 hover:shadow-[0_50px_120px_-30px_rgba(0,0,0,0.4)]">
                {/* Header Section */}
                <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-black/10">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                            <div className="size-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <ShieldCheck className="text-white size-6" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Exception Rules</h3>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">Control Layer v2.4</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-600/20 transition-all border border-indigo-600/10">
                            <Plus className="size-3.5" strokeWidth={3} />
                            New Rule
                        </button>
                    </div>
                </div>

                {/* Rules List Section */}
                <div className="p-4 sm:p-6 space-y-3">
                    {rules.map((rule) => (
                        <div
                            key={rule.id}
                            className={`group p-4 rounded-2xl border transition-all duration-300 ${rule.status === 'active'
                                    ? 'bg-indigo-50/50 dark:bg-indigo-500/5 border-indigo-200/50 dark:border-indigo-500/20'
                                    : 'bg-slate-50/30 dark:bg-white/5 border-transparent'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <h4 className={`text-sm font-bold ${rule.status === 'active' ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {rule.name}
                                        </h4>
                                        <div className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter ${rule.type === 'exclusion' ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' :
                                                rule.type === 'formatting' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' :
                                                    'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                                            }`}>
                                            {rule.type}
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                        {rule.description}
                                    </p>
                                </div>
                                <button
                                    onClick={() => toggleRule(rule.id)}
                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${rule.status === 'active' ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-zinc-700'
                                        }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${rule.status === 'active' ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Insight Section */}
                <div className="p-6 pt-2 pb-8">
                    <div className="bg-slate-900 dark:bg-black rounded-2xl p-4 border border-white/5 shadow-inner">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Real-time Simulation</span>
                            </div>
                            <Play className="text-slate-400 size-4 hover:text-white cursor-pointer transition-colors" />
                        </div>

                        <div className="space-y-2">
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full w-[85%] bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-[9px] text-slate-400 font-medium">Model Precision Alignment</p>
                                <p className="text-[9px] text-emerald-400 font-bold">85.4% Optimized</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="px-8 py-4 bg-indigo-600 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="text-white size-4" />
                        <span className="text-white text-xs font-bold">Rules Syncing Live</span>
                    </div>
                    <span className="text-indigo-200 text-[10px] font-black uppercase">Edge-V3</span>
                </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-10 right-[5%] opacity-20 pointer-events-none">
                <Sliders className="size-32 text-indigo-400 -rotate-12" />
            </div>
            <div className="absolute bottom-10 left-[5%] opacity-20 pointer-events-none">
                <AlertCircle className="size-24 text-purple-400 rotate-12" />
            </div>
        </div>
    );
}
