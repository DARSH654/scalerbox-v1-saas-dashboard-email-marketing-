"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    once?: boolean;
    threshold?: number;
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    duration = 600,
    direction = "up",
    distance = 30,
    once = true,
    threshold = 0.1,
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) {
                        observer.unobserve(element);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [once, threshold]);

    const getInitialTransform = () => {
        switch (direction) {
            case "up":
                return `translateY(${distance}px)`;
            case "down":
                return `translateY(-${distance}px)`;
            case "left":
                return `translateX(${distance}px)`;
            case "right":
                return `translateX(-${distance}px)`;
            case "none":
                return "none";
            default:
                return `translateY(${distance}px)`;
        }
    };

    return (
        <div
            ref={ref}
            className={cn(className)}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : getInitialTransform(),
                transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
                willChange: "opacity, transform",
            }}
        >
            {children}
        </div>
    );
}

// Staggered container for multiple children
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    baseDelay?: number;
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 100,
    baseDelay = 0,
}: StaggerContainerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            className={cn(className)}
            style={{
                "--stagger-delay": `${staggerDelay}ms`,
                "--base-delay": `${baseDelay}ms`,
                "--is-visible": isVisible ? "1" : "0",
            } as React.CSSProperties}
        >
            {children}
        </div>
    );
}
