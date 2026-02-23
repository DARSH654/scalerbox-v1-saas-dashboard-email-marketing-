'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StarBorderProps {
    as?: React.ElementType;
    className?: string;
    color?: string;
    color2?: string; // Second color for gradient effect
    speed?: string;
    children: React.ReactNode;
}

const StarBorder = ({
    as: Component = 'div',
    className = '',
    color = '#3b82f6', // Blue (start of primary gradient)
    color2 = '#9333ea', // Purple (end of primary gradient)
    speed = '4s',
    children,
    ...rest
}: StarBorderProps) => {
    return (
        <Component
            className={cn(
                "group relative inline-block overflow-hidden rounded-full",
                className
            )}
            {...rest}
        >
            {/* Bottom star - only visible on hover */}
            <div
                className="absolute w-[300%] h-[60%] opacity-0 group-hover:opacity-80 -bottom-[15px] -right-[250%] rounded-[50%] z-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle, ${color}, ${color2}, transparent 15%)`,
                    animation: `star-movement-bottom ${speed} linear infinite alternate`
                }}
            ></div>
            {/* Top star - only visible on hover */}
            <div
                className="absolute w-[300%] h-[60%] opacity-0 group-hover:opacity-80 -top-[15px] -left-[250%] rounded-[50%] z-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle, ${color2}, ${color}, transparent 15%)`,
                    animation: `star-movement-top ${speed} linear infinite alternate`
                }}
            ></div>
            {/* Children rendered directly - no extra wrapper that would add borders */}
            <div className="relative z-10">
                {children}
            </div>
        </Component>
    );
};

export default StarBorder;
