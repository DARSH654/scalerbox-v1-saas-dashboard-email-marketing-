'use client';

import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface GlobalLoaderProps {
    className?: string;
    size?: number;
    fullScreen?: boolean;
}

export function GlobalLoader({
    className,
    size = 80,
    fullScreen = true
}: GlobalLoaderProps) {
    useEffect(() => {
        if (fullScreen) {
            // Prevent scrolling on the body when the loader is full screen
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [fullScreen]);

    const loader = (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className={cn("animate-spin", className)}
            style={{ animationDuration: '1.2s' }}
        >
            {/* Background track - dark in light mode, white in dark mode */}
            <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-300 dark:text-white/90"
            />
            {/* Primary gradient spinner segment */}
            <defs>
                <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(221, 83%, 53%)" />
                    <stop offset="100%" stopColor="hsl(270, 70%, 55%)" />
                </linearGradient>
            </defs>
            <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#loader-gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="66 198"
                strokeDashoffset="0"
            />
        </svg>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                {loader}
            </div>
        );
    }

    return loader;
}
