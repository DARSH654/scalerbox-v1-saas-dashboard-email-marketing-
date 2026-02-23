'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, Terminal, Mail, StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';

export function KineticIntegrationGrid() {
  return (
    <div className="perspective-container w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-[160px]">

        {/* WordPress */}
        <Link href="https://wordpress.com/" target="_blank" rel="noopener noreferrer" className="kinetic-card group rounded-2xl p-6 flex flex-col justify-between cursor-pointer">
          <div className="glow-point"></div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
              <Image
                src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/174881.png"
                alt="WordPress"
                fill
                className="object-contain p-2"
              />
            </div>
            <ArrowUpRight className="text-muted-foreground/20 dark:text-white/20 group-hover:text-foreground/80 dark:group-hover:text-white/80 transition-colors" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">WordPress</h3>
            <p className="text-xs text-muted-foreground dark:text-white/40 group-hover:text-primary transition-colors font-mono">sync_status: active</p>
          </div>
        </Link>

        {/* Ghost */}
        <Link href="https://ghost.org/" target="_blank" rel="noopener noreferrer" className="kinetic-card group rounded-2xl p-6 flex flex-col justify-between cursor-pointer">
          <div className="glow-point"></div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
              <Image
                src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ghost-logo-orb.png"
                alt="Ghost"
                fill
                className="object-contain p-2 invert dark:invert-0"
              />
            </div>
            <ArrowUpRight className="text-muted-foreground/20 dark:text-white/20 group-hover:text-foreground/80 dark:group-hover:text-white/80 transition-colors" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">Ghost</h3>
            <p className="text-xs text-muted-foreground dark:text-white/40 group-hover:text-primary transition-colors font-mono">headless_cms: true</p>
          </div>
        </Link>

        {/* Custom Integration (Large Card) */}
        <div className="md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden border border-border/50 dark:border-white/10 bg-card dark:bg-[#0f111a] shadow-2xl shadow-primary/10 hover:shadow-primary/30 transition-shadow duration-500 z-10">
          <div className="absolute top-0 left-0 right-0 h-10 bg-muted/50 dark:bg-[#1e293b]/50 backdrop-blur-md border-b border-border/50 dark:border-white/5 flex items-center px-4 justify-between z-20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="px-2 py-0.5 rounded bg-primary/20 border border-primary/30 text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1">
              <Terminal className="w-3 h-3" />
              Custom Integration
            </div>
            <div className="text-xs text-muted-foreground dark:text-white/30 font-mono flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              zsh — 80x24
            </div>
          </div>
          <div className="pt-14 pb-8 px-6 md:px-8 h-full flex flex-col justify-between relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="font-mono text-sm md:text-base leading-relaxed relative z-10">
              <div className="mb-4">
                <span className="text-primary">➜</span> <span className="text-blue-500 dark:text-blue-400">~/site</span> <span className="text-muted-foreground dark:text-white/60">npm i</span> <span className="text-foreground dark:text-white">@scalerbox/core</span>
              </div>
              <div className="space-y-1 text-foreground/90 dark:text-white/90">
                <div><span className="token keyword text-purple-600 dark:text-purple-400">import</span> {'{'} <span className="token string text-green-600 dark:text-green-400">ScalerboxGrid</span> {'}'} <span className="token keyword text-purple-600 dark:text-purple-400">from</span> <span className="token string text-green-600 dark:text-green-400">&apos;@scalerbox/sdk&apos;</span>;</div>
                <div className="h-2"></div>
                <div><span className="token keyword text-purple-600 dark:text-purple-400">const</span> <span className="token function text-blue-600 dark:text-blue-400">scaler</span> = <span className="token keyword text-purple-600 dark:text-purple-400">new</span> <span className="token function text-blue-600 dark:text-blue-400">ScalerboxGrid</span>({'{'}</div>
                <div className="pl-6"><span className="token string text-green-600 dark:text-green-400">id</span>: <span className="token string text-green-600 dark:text-green-400">&apos;sb_live_0492_z4&apos;</span>,</div>
                <div className="pl-6"><span className="token string text-green-600 dark:text-green-400">strategy</span>: <span className="token string text-green-600 dark:text-green-400">&apos;real-time&apos;</span>,</div>
                <div className="pl-6"><span className="token string text-green-600 dark:text-green-400">bridge</span>: <span className="token keyword text-purple-600 dark:text-purple-400">true</span></div>
                <div>{'}'});</div>
                <div className="h-2"></div>
                <div className="flex items-center">
                  <span className="token keyword text-purple-600 dark:text-purple-400">await</span> <span className="token function text-blue-600 dark:text-blue-400">scaler</span>.<span className="token function text-blue-600 dark:text-blue-400">initialize</span>();
                  <span className="w-2.5 h-5 bg-primary ml-1 animate-cursor-blink"></span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-border/50 dark:border-white/5 pt-4">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-muted-foreground dark:text-white/40 font-bold mb-1">Grid Engine</span>
                <span className="text-sm font-mono text-primary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Connected to Core
                </span>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 px-4 rounded shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group-hover:translate-x-1 duration-300" suppressHydrationWarning>
                Documentation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Medium */}
        <Link href="https://medium.com/" target="_blank" rel="noopener noreferrer" className="kinetic-card group rounded-2xl p-6 flex flex-col justify-between cursor-pointer">
          <div className="glow-point"></div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
              <Image
                src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/medium-icon.svg"
                alt="Medium"
                fill
                className="object-contain p-2 invert dark:invert"
              />
            </div>
            <ArrowUpRight className="text-muted-foreground/20 dark:text-white/20 group-hover:text-foreground/80 dark:group-hover:text-white/80 transition-colors" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">Medium</h3>
            <p className="text-xs text-muted-foreground dark:text-white/40 group-hover:text-primary transition-colors font-mono">repost_delay: 0s</p>
          </div>
        </Link>

        {/* Substack (Icon Only) */}
        <div className="kinetic-card group rounded-2xl p-6 flex flex-col justify-between cursor-pointer">
          <div className="glow-point"></div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6" />
            </div>
            <ArrowUpRight className="text-muted-foreground/20 dark:text-white/20 group-hover:text-foreground/80 dark:group-hover:text-white/80 transition-colors" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">Substack</h3>
            <p className="text-xs text-muted-foreground dark:text-white/40 group-hover:text-primary transition-colors font-mono">newsletter: linked</p>
          </div>
        </div>

        {/* Webflow */}
        <Link href="https://webflow.com/" target="_blank" rel="noopener noreferrer" className="kinetic-card group rounded-2xl p-6 flex flex-col justify-between cursor-pointer">
          <div className="glow-point"></div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
              <Image
                src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/webflow_logo_icon_169218.png"
                alt="Webflow"
                fill
                className="object-contain p-2"
              />
            </div>
            <ArrowUpRight className="text-muted-foreground/20 dark:text-white/20 group-hover:text-foreground/80 dark:group-hover:text-white/80 transition-colors" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">Webflow</h3>
            <p className="text-xs text-muted-foreground dark:text-white/40 group-hover:text-primary transition-colors font-mono">cms_id: 84729</p>
          </div>
        </Link>

        {/* Shopify */}
        <Link href="https://www.shopify.com/blog-tools" target="_blank" rel="noopener noreferrer" className="kinetic-card group rounded-2xl p-6 flex flex-col justify-between cursor-pointer">
          <div className="glow-point"></div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
              <Image
                src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/shopify.png"
                alt="Shopify"
                fill
                className="object-contain p-2"
              />
            </div>
            <ArrowUpRight className="text-muted-foreground/20 dark:text-white/20 group-hover:text-foreground/80 dark:group-hover:text-white/80 transition-colors" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">Shopify</h3>
            <p className="text-xs text-muted-foreground dark:text-white/40 group-hover:text-primary transition-colors font-mono">commerce: enabled</p>
          </div>
        </Link>

        {/* Notion (Icon Only) */}
        <div className="kinetic-card group rounded-2xl p-6 flex flex-col justify-between cursor-pointer">
          <div className="glow-point"></div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <StickyNote className="w-6 h-6" />
            </div>
            <ArrowUpRight className="text-muted-foreground/20 dark:text-white/20 group-hover:text-foreground/80 dark:group-hover:text-white/80 transition-colors" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">Notion</h3>
            <p className="text-xs text-muted-foreground dark:text-white/40 group-hover:text-primary transition-colors font-mono">db_sync: 2-way</p>
          </div>
        </div>

        {/* HubSpot (Replacing Dev.to) */}
        <Link href="https://www.hubspot.com/" target="_blank" rel="noopener noreferrer" className="kinetic-card group rounded-2xl p-6 flex flex-col justify-between cursor-pointer">
          <div className="glow-point"></div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
              <Image
                src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/svg_331433.svg"
                alt="HubSpot"
                fill
                className="object-contain p-2"
              />
            </div>
            <ArrowUpRight className="text-muted-foreground/20 dark:text-white/20 group-hover:text-foreground/80 dark:group-hover:text-white/80 transition-colors" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">HubSpot</h3>
            <p className="text-xs text-muted-foreground dark:text-white/40 group-hover:text-primary transition-colors font-mono">crm: connected</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
