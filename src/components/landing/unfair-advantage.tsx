'use client';

import { Button } from '@/components/ui/button';
import {
  Lightbulb,
  Globe,
  BadgeCheck,
  MousePointerClick,
  Bot,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { SectionBackgroundEffect } from '@/components/landing/section-background-effect';

export function UnfairAdvantage() {
  return (
    <section className="w-full py-16 px-6 lg:px-20 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
      <SectionBackgroundEffect />

      <ScrollReveal>
        <div className="container max-w-full relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-8">

          {/* Left Content */}
          <div className="flex flex-col gap-8 lg:w-5/12 lg:pr-24 pt-10 lg:pt-32">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="h-[2px] w-12 bg-purple-600"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Strategy v2.0</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter drop-shadow-2xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/50 dark:from-white dark:via-white dark:to-white/50">THE</span> <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 pb-4">UNFAIR</span><br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/50 dark:from-white dark:via-white dark:to-white/50">ADVANTAGE.</span>
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-[#606e8a] dark:text-gray-400 font-normal leading-relaxed max-w-md border-l-4 border-purple-600 pl-6">
              Why smart founders write. It's not about views. It's about building a compound asset that scales trust without you in the room.
            </p>
            <div className="flex flex-wrap gap-4 pt-6">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-base font-bold px-8 py-6 rounded-full border border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(147,51,234,0.5)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(147,51,234,0.5)] transition-all active:translate-y-[4px] active:shadow-none">
                Start Writing Now
              </Button>
            </div>
          </div>

          {/* Right Content - Cards */}
          <div className="relative lg:w-7/12 min-h-[800px] flex flex-col gap-6 lg:block mt-12 lg:mt-0">

            {/* Card 1: Thought Leadership */}
            <div className="group transition-transform duration-300 ease-card-hover hover:-translate-y-2 hover:scale-105 hover:z-50 hover:shadow-xl relative lg:absolute lg:top-0 lg:left-0 lg:w-[320px] bg-white dark:bg-[#151515] p-6 border border-[#111318] dark:border-gray-700 shadow-sm z-10 lg:-rotate-3 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold leading-none dark:text-white uppercase tracking-tight">Thought <br/>Leadership</h3>
                <div className="size-10 bg-purple-600 flex items-center justify-center text-white border border-black shadow-[2px_2px_0px_0px_#000000] rounded-full">
                  <Lightbulb className="w-5 h-5" />
                </div>
              </div>
              <div className="h-px w-full bg-[#f0f1f5] dark:bg-gray-800 mb-4"></div>
              <p className="text-sm text-[#111318] dark:text-gray-300 font-medium leading-snug">
                Stop selling. Start teaching. Trust scales faster than ads ever will.
              </p>
              <div className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">02 / Authority</div>
            </div>

            {/* Card 2: Global Reach */}
            <div className="group transition-transform duration-300 ease-card-hover hover:-translate-y-2 hover:scale-105 hover:z-50 hover:shadow-xl relative lg:absolute lg:top-6 lg:right-0 lg:w-[320px] bg-white dark:bg-[#151515] p-6 border border-[#111318] dark:border-gray-700 shadow-sm z-10 lg:rotate-3 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold leading-none dark:text-white uppercase tracking-tight">Global <br/>Reach</h3>
                <div className="size-10 bg-white dark:bg-gray-800 flex items-center justify-center text-blue-600 border border-black dark:border-gray-600 shadow-[2px_2px_0px_0px_#000000] rounded-full">
                  <Globe className="w-5 h-5 text-transparent stroke-[url(#primaryGradient)]" style={{ stroke: 'url(#primaryGradient)' }} />
                </div>
              </div>
              <div className="h-px w-full bg-[#f0f1f5] dark:bg-gray-800 mb-4"></div>
              <p className="text-sm text-[#111318] dark:text-gray-300 font-medium leading-snug">
                Your code scales to 190 countries. Your marketing should too. Reach markets you can't fly to.
              </p>
              <div className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">04 / Scale</div>
            </div>

            {/* Card 3: User Retention */}
            <div className="group transition-transform duration-300 ease-card-hover hover:-translate-y-2 hover:scale-105 hover:z-50 hover:shadow-xl relative lg:absolute lg:top-[180px] lg:left-8 lg:w-[340px] bg-white dark:bg-[#151515] p-6 border border-[#111318] dark:border-gray-700 shadow-lg z-20 lg:rotate-2 rounded-2xl">
              <div className="absolute -top-3 -right-2 bg-white text-black text-[10px] font-black uppercase px-2 py-1 rotate-3 border border-black shadow-[2px_2px_0px_0px_#000000] rounded-sm">
                 Zero Churn
              </div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold leading-none dark:text-white uppercase tracking-tight">User <br/>Retention</h3>
                <div className="size-10 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white border border-black shadow-[2px_2px_0px_0px_#000000] rounded-full">
                  <BadgeCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="h-px w-full bg-[#f0f1f5] dark:bg-gray-800 mb-4"></div>
              <p className="text-sm text-[#111318] dark:text-gray-300 font-medium leading-snug">
                Educated users churn less. Your blog is your best customer success agent.
              </p>
              <div className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">03 / Longevity</div>
            </div>

            {/* Card 4: High-Intent Users */}
            <div className="group transition-transform duration-300 ease-card-hover hover:-translate-y-2 hover:scale-105 hover:z-50 hover:shadow-xl relative lg:absolute lg:top-[150px] lg:right-8 lg:w-[350px] bg-white dark:bg-[#151515] p-6 border border-[#111318] dark:border-gray-700 shadow-lg z-20 lg:-rotate-2 rounded-2xl">
              <div className="absolute -top-3 -left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[10px] font-black uppercase px-2 py-1 -rotate-6 border border-black shadow-[2px_2px_0px_0px_#000000] rounded-sm">
                High ROI
              </div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold leading-none dark:text-white uppercase tracking-tight">High-Intent <br/>Users</h3>
                <div className="size-10 bg-purple-600 flex items-center justify-center text-white border border-black rounded-full">
                  <MousePointerClick className="w-5 h-5" />
                </div>
              </div>
              <div className="h-px w-full bg-[#f0f1f5] dark:bg-gray-800 mb-4"></div>
              <p className="text-sm text-[#111318] dark:text-gray-300 font-medium leading-snug">
                Readers convert 3x better than clickers. Capture demand, don't just interrupt it.
              </p>
              <div className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">05 / Conversion</div>
            </div>

            {/* Card 5: AI Search Moat (Main Card) */}
            <div className="group transition-transform duration-300 ease-card-hover hover:-translate-y-2 hover:scale-105 hover:z-50 main-card relative lg:absolute lg:top-[340px] lg:left-1/2 lg:-translate-x-1/2 lg:w-[460px] bg-white dark:bg-[#1a1a1a] p-8 border-2 border-[#111318] dark:border-white shadow-[8px_8px_0px_0px_#111318] dark:shadow-[8px_8px_0px_0px_#ffffff] z-30 rounded-2xl">
              <div className="absolute -top-4 -left-4 bg-purple-600 text-white text-xs font-black uppercase px-3 py-1.5 rotate-3 border border-black shadow-[3px_3px_0px_0px_#000000] rounded-sm">
                New Search Era
              </div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-black leading-none dark:text-white tracking-tight">AI Search <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Moat</span></h3>
                <div className="size-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white border border-black shadow-[4px_4px_0px_0px_#000000]">
                  <Bot className="w-8 h-8" />
                </div>
              </div>
              <div className="h-[2px] w-full bg-black/5 dark:bg-white/10 mb-6 flex rounded-full overflow-hidden">
                <div className="w-1/3 bg-gradient-to-r from-blue-500 to-purple-600 h-full"></div>
              </div>
              <p className="text-lg text-[#111318] dark:text-gray-200 font-medium leading-relaxed">
                LLMs are the new search engines. They don't read ads—they ingest high-quality, structured thought. <br/>
                <span className="bg-purple-600/30 px-1 -mx-1 rounded-sm">Content is how you get recommended.</span>
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-dashed border-gray-300 dark:border-gray-700 pt-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">01 / Future Proof</div>
                <ArrowRight className="text-purple-600 w-5 h-5" />
              </div>
            </div>

          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
