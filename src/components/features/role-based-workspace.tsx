'use client';

import React, { useState } from 'react';
import { Lock, Users, Zap, Check, Upload, Pencil, X, ArrowRight, Settings } from 'lucide-react';

type Role = 'restricted' | 'standard' | 'elevated';

interface RoleOption {
    id: Role;
    icon: typeof Lock;
    title: string;
    description: string;
}

const roles: RoleOption[] = [
    {
        id: 'restricted',
        icon: Lock,
        title: 'Restricted',
        description: 'View only. Cannot invite others or modify AI context files.',
    },
    {
        id: 'standard',
        icon: Users,
        title: 'Standard Access',
        description: 'Full chat capability and file viewing. Can suggest context edits.',
    },
    {
        id: 'elevated',
        icon: Zap,
        title: 'Elevated',
        description: 'Admin controls. Manage members, context, and export all history.',
    },
];

export function RoleBasedWorkspace() {
    const [selectedRole, setSelectedRole] = useState<Role>('restricted');

    return (
        <div className="w-full h-full bg-white dark:bg-zinc-950 flex flex-col">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-white dark:bg-zinc-900 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                        style={{ background: 'linear-gradient(135deg, #436DDD 0%, #7B4EE8 100%)' }}
                    >
                        <Settings className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Workspace Settings</h2>
                </div>
                <button className="text-slate-400 dark:text-slate-500 hover:text-purple-600 transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white dark:bg-zinc-900">
                {/* Avatar Section */}
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                            style={{
                                background: 'linear-gradient(135deg, #436DDD 0%, #7B4EE8 100%)',
                                boxShadow: '0 8px 24px -4px rgba(67, 109, 221, 0.4)',
                            }}
                        >
                            D
                        </div>
                        <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-600 text-slate-500 dark:text-slate-400 flex items-center justify-center shadow-sm hover:text-purple-600 hover:border-purple-400 transition-all">
                            <Pencil className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <button className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-600 text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Add Logo
                        </button>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Recommended: 400×400px</p>
                    </div>
                </div>

                {/* Workspace Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        Workspace Name
                    </label>
                    <input
                        type="text"
                        defaultValue="Design Team Alpha"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder-slate-400"
                    />
                </div>

                {/* Role Selection */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        Default Member Access
                    </label>
                    <div className="flex flex-col gap-2">
                        {roles.map((role) => {
                            const isSelected = selectedRole === role.id;
                            const Icon = role.icon;

                            return (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRole(role.id)}
                                    className={`relative w-full text-left transition-all ${isSelected ? 'p-[2px] rounded-xl' : ''}`}
                                    style={isSelected ? { background: 'linear-gradient(135deg, #436DDD 0%, #7B4EE8 100%)' } : {}}
                                >
                                    <div
                                        className={`flex items-center px-4 py-3 rounded-xl transition-all ${isSelected
                                                ? 'bg-purple-50 dark:bg-indigo-950'
                                                : 'border border-slate-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-500/50'
                                            }`}
                                    >
                                        <Icon
                                            className={`w-5 h-5 ${isSelected
                                                    ? 'text-indigo-600 dark:text-indigo-400'
                                                    : 'text-slate-400 dark:text-slate-500'
                                                }`}
                                            fill={isSelected ? 'currentColor' : 'none'}
                                        />
                                        <div className="ml-3 flex-grow pr-8">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                                {role.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                                                {role.description}
                                            </p>
                                        </div>
                                        {isSelected && (
                                            <div
                                                className="absolute right-4 w-5 h-5 rounded-full flex items-center justify-center"
                                                style={{ background: 'linear-gradient(135deg, #436DDD 0%, #7B4EE8 100%)' }}
                                            >
                                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Save Button */}
                <div className="pt-2 pb-4">
                    <button
                        className="w-full py-3 px-4 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 hover:opacity-90"
                        style={{
                            background: 'linear-gradient(135deg, #436DDD 0%, #7B4EE8 100%)',
                            boxShadow: '0 8px 24px -4px rgba(67, 109, 221, 0.35)',
                        }}
                    >
                        <span>Save Changes</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
