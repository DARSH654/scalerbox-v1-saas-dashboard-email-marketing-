import React from "react";
import { cn } from "@/lib/utils";

interface LogoLoopProps {
    items: { name: string; Icon: React.ElementType; url?: string }[];
    direction?: "left" | "right";
    speed?: "slow" | "normal" | "fast";
    pauseOnHover?: boolean;
    className?: string;
}

export const LogoLoop = ({
    items,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
}: LogoLoopProps) => {
    const getSpeedClass = () => {
        switch (speed) {
            case "slow":
                return "[animation-duration:40s]";
            case "fast":
                return "[animation-duration:20s]";
            case "normal":
            default:
                return "[animation-duration:50s]";
        }
    };

    const repeatedItems = [...items, ...items, ...items, ...items]; // Repeat 4 times for safety on large screens

    return (
        <div
            className={cn(
                "group relative flex overflow-hidden p-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
                className
            )}
        >
            <div
                className={cn(
                    "flex min-w-full shrink-0 items-center justify-around gap-4 py-4",
                    "animate-scroll",
                    direction === "right" ? "direction-reverse" : "",
                    pauseOnHover && "group-hover:[animation-play-state:paused]",
                    getSpeedClass()
                )}
            >
                {repeatedItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2 text-muted-foreground font-semibold px-4 transition-transform hover:scale-110 cursor-pointer"
                        onClick={() => item.url && window.open(item.url, "_blank")}
                    >
                        <item.Icon className="w-8 h-8" />
                        <span className="text-lg whitespace-nowrap">{item.name}</span>
                    </div>
                ))}
            </div>
            <div
                aria-hidden="true"
                className={cn(
                    "flex min-w-full shrink-0 items-center justify-around gap-4 py-4",
                    "animate-scroll",
                    direction === "right" ? "direction-reverse" : "",
                    pauseOnHover && "group-hover:[animation-play-state:paused]",
                    getSpeedClass()
                )}
            >
                {/* exact copy for seamless loop if using CSS animation on parent */}
                {/* Wait, standard infinite scroll usually creates TWO identical children in a flex container 
             and animates the transform of the container or both children.
             Actually, a common pattern (like in Acertinity UI) is strictly animating the container.
             But Tailwind 'animate-scroll' usually slides the element itself.
             Let's blindly trust 'animate-scroll' exists or define it.
             Since I can't guarantee 'animate-scroll' behavior, I will verify tailwind config or globals.css again.
             Earlier I checked globals.css and didn't see @keyframes scroll.
             I WILL ADD IT NOW to be safe.
         */}
                {repeatedItems.map((item, idx) => (
                    <div
                        key={`dup-${idx}`}
                        className="flex items-center gap-2 text-muted-foreground font-semibold px-4 transition-transform hover:scale-110 cursor-pointer"
                        onClick={() => item.url && window.open(item.url, "_blank")}
                    >
                        <item.Icon className="w-8 h-8" />
                        <span className="text-lg whitespace-nowrap">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
