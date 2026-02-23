import React from "react";
import { cn } from "@/lib/utils";

interface InfinityLoopProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    direction?: "left" | "right";
    speed?: "slow" | "normal" | "fast";
    pauseOnHover?: boolean;
    className?: string;
}

export const InfinityLoop = <T,>({
    items,
    renderItem,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
}: InfinityLoopProps<T>) => {
    const getSpeedClass = () => {
        switch (speed) {
            case "slow":
                return "[animation-duration:60s]";
            case "fast":
                return "[animation-duration:20s]";
            case "normal":
            default:
                return "[animation-duration:40s]";
        }
    };

    // Repeat items to ensure seamless loop
    // For larger items like cards, fewer repeats might be needed, but 4 is safe
    const repeatedItems = [...items, ...items, ...items, ...items];

    return (
        <div
            className={cn(
                "group relative flex overflow-hidden p-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
                className
            )}
        >
            <div
                className={cn(
                    "flex min-w-full shrink-0 items-center gap-4 py-4 px-4",
                    "animate-scroll",
                    direction === "right" ? "direction-reverse" : "",
                    pauseOnHover && "group-hover:[animation-play-state:paused]",
                    getSpeedClass()
                )}
            >
                {repeatedItems.map((item, idx) => (
                    <div key={idx} className="shrink-0">
                        {renderItem(item, idx)}
                    </div>
                ))}
            </div>
            <div
                aria-hidden="true"
                className={cn(
                    "flex min-w-full shrink-0 items-center gap-4 py-4 px-4",
                    "animate-scroll",
                    direction === "right" ? "direction-reverse" : "",
                    pauseOnHover && "group-hover:[animation-play-state:paused]",
                    getSpeedClass()
                )}
            >
                {repeatedItems.map((item, idx) => (
                    <div key={`dup-${idx}`} className="shrink-0">
                        {renderItem(item, idx)}
                    </div>
                ))}
            </div>
        </div>
    );
};
