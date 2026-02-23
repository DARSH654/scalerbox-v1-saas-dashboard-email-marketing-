"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const viewportRef = React.useRef<HTMLDivElement>(null);

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport ref={viewportRef} className="h-full w-full rounded-[inherit]" data-scroll-viewport>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar viewportRef={viewportRef} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
})
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
    alwaysVisible?: boolean;
    viewportRef?: React.RefObject<HTMLDivElement>;
  }
>(({ className, orientation = "vertical", alwaysVisible, viewportRef, ...props }, ref) => {
  const scrollbarRef = React.useRef<HTMLDivElement | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleTrackClick = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle clicks on the track itself, not the thumb
    if (e.target !== e.currentTarget) return;

    e.preventDefault();
    e.stopPropagation();

    const scrollbar = scrollbarRef.current;
    const viewport = viewportRef?.current;

    if (!scrollbar || !viewport) {
      return;
    }

    const rect = scrollbar.getBoundingClientRect();
    const clickPosition = orientation === "vertical" ? e.clientY : e.clientX;

    // Find thumb element - try multiple selectors
    let thumb = scrollbar.querySelector('[data-radix-scroll-area-thumb]') as HTMLElement;
    if (!thumb) {
      // Fallback: find by class or any child div
      thumb = scrollbar.querySelector('div') as HTMLElement;
    }
    if (!thumb) {
      return;
    }

    const thumbRect = thumb.getBoundingClientRect();
    const thumbCenter = orientation === "vertical"
      ? thumbRect.top + thumbRect.height / 2
      : thumbRect.left + thumbRect.width / 2;

    // Determine direction: click above/before thumb = scroll up/left, below/after = scroll down/right
    const direction = clickPosition < thumbCenter ? -1 : 1;
    const scrollSpeed = 30; // Pixels to scroll per interval

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start continuous scrolling
    intervalRef.current = setInterval(() => {
      const currentScroll = orientation === "vertical" ? viewport.scrollTop : viewport.scrollLeft;
      const maxScroll = orientation === "vertical"
        ? viewport.scrollHeight - viewport.clientHeight
        : viewport.scrollWidth - viewport.clientWidth;

      const newScroll = currentScroll + (direction * scrollSpeed);

      // Stop if we've reached the target or boundaries
      if (direction === -1 && newScroll <= 0) {
        viewport.scrollTop = 0;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }
      if (direction === 1 && newScroll >= maxScroll) {
        if (orientation === "vertical") {
          viewport.scrollTop = maxScroll;
        } else {
          viewport.scrollLeft = maxScroll;
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      // Check if we've scrolled past the click position
      const newThumbRect = thumb.getBoundingClientRect();
      const newThumbCenter = orientation === "vertical"
        ? newThumbRect.top + newThumbRect.height / 2
        : newThumbRect.left + newThumbRect.width / 2;

      if ((direction === -1 && newThumbCenter <= clickPosition) ||
        (direction === 1 && newThumbCenter >= clickPosition)) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      // Continue scrolling
      if (orientation === "vertical") {
        viewport.scrollTop = newScroll;
      } else {
        viewport.scrollLeft = newScroll;
      }
    }, 16); // ~60fps

    // Stop scrolling on pointer up
    const stopScrolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      document.removeEventListener('pointerup', stopScrolling);
      document.removeEventListener('pointercancel', stopScrolling);
    };

    document.addEventListener('pointerup', stopScrolling);
    document.addEventListener('pointercancel', stopScrolling);
  }, [orientation, viewportRef]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={(node) => {
        if (node) {
          scrollbarRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }
      }}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors group",
        orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )}
      onPointerDown={handleTrackClick}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className={cn(
        "relative flex-1 rounded-full transition-colors duration-200",
        alwaysVisible
          ? "bg-muted-foreground/50"
          : "bg-transparent group-hover:bg-border"
      )} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
})
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
