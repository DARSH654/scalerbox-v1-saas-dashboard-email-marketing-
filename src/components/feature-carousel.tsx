'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CarouselItem {
    image: string;
    title: string;
    subtitle: string;
}

const defaultItems: CarouselItem[] = [
    {
        image: "https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/content_dashboard_imag.png", // Original image
        title: "Welcome to Scalerbox",
        subtitle: "The all-in-one AI platform."
    },
    {
        image: "https://picsum.photos/seed/slide2/1200/550",
        title: "Automate Everything",
        subtitle: "Focus on building, we handle the rest."
    },
    {
        image: "https://picsum.photos/seed/slide3/1200/550",
        title: "Team Collaboration",
        subtitle: "Work together seamlessly."
    }
];

export function FeatureCarousel({ className }: { className?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % defaultItems.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={cn("relative w-full overflow-hidden rounded-xl bg-background", className)}>
            {/* Slides Container */}
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {defaultItems.map((item, index) => (
                    <div key={index} className="min-w-full relative aspect-[2.2/1]">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Gradient Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 md:left-12 md:bottom-12 md:max-w-md">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-[1px] rounded-2xl shadow-lg backdrop-blur-sm">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-bold text-lg md:text-xl mb-1">{defaultItems[currentIndex].title}</h3>
                                <p className="text-sm md:text-base text-white/90">{defaultItems[currentIndex].subtitle}</p>
                            </div>
                            <div className="p-2 bg-white/20 rounded-full">
                                <ArrowRight className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {defaultItems.map((_, idx) => (
                    <button
                        key={idx}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            idx === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                        )}
                        onClick={() => setCurrentIndex(idx)}
                        suppressHydrationWarning
                    />
                ))}
            </div>
        </div>
    );
}
