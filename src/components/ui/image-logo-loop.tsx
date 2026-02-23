import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageLogoLoopProps {
    items: { name: string; src: string; width: number; height: number; url?: string }[];
    direction?: "left" | "right";
    speed?: "slow" | "normal" | "fast";
    pauseOnHover?: boolean;
    className?: string;
}

export const ImageLogoLoop = ({
    items,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
}: ImageLogoLoopProps) => {
    const getSpeedClass = () => {
        switch (speed) {
            case "slow":
                return "[animation-duration:40s]";
            case "fast":
                return "[animation-duration:20s]";
            case "normal":
            default:
                return "[animation-duration:30s]";
        }
    };

    const repeatedItems = [...items, ...items, ...items, ...items];

    return (
        <div
            className={cn(
                "group relative flex overflow-hidden p-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
                className
            )}
        >
            <div
                className={cn(
                    "flex min-w-full shrink-0 items-center justify-around gap-8 py-4",
                    "animate-scroll",
                    direction === "right" ? "direction-reverse" : "",
                    pauseOnHover && "group-hover:[animation-play-state:paused]",
                    getSpeedClass()
                )}
            >
                {repeatedItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-center px-4 transition-transform hover:scale-110 cursor-pointer"
                        style={{ height: item.height }}
                        onClick={() => item.url && window.open(item.url, "_blank")}
                    >
                        <Image
                            src={item.src}
                            alt={item.name}
                            width={item.width}
                            height={item.height}
                            className="object-contain dark:invert"
                        />
                    </div>
                ))}
            </div>
            <div
                aria-hidden="true"
                className={cn(
                    "flex min-w-full shrink-0 items-center justify-around gap-8 py-4",
                    "animate-scroll",
                    direction === "right" ? "direction-reverse" : "",
                    pauseOnHover && "group-hover:[animation-play-state:paused]",
                    getSpeedClass()
                )}
            >
                {repeatedItems.map((item, idx) => (
                    <div
                        key={`dup-${idx}`}
                        className="flex items-center justify-center px-4 transition-transform hover:scale-110 cursor-pointer"
                        style={{ height: item.height }}
                        onClick={() => item.url && window.open(item.url, "_blank")}
                    >
                        <Image
                            src={item.src}
                            alt={item.name}
                            width={item.width}
                            height={item.height}
                            className="object-contain dark:invert"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
