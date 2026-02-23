
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top rounded-b-2xl",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom rounded-t-2xl",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> {
  enableDrag?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, enableDrag = false, onOpenChange, ...props }, ref) => {
  const [dragState, setDragState] = React.useState<'default' | 'expanded' | 'dragging'>('default');
  const [dragOffset, setDragOffset] = React.useState(0);
  const startY = React.useRef(0);
  const startHeight = React.useRef(0);
  const velocityTracker = React.useRef<{ time: number, y: number }[]>([]);

  const isBottomSheet = side === 'bottom' && enableDrag;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setDragState('default');
    }
    onOpenChange?.(open);
  };

  const getHeight = () => {
    if (!isBottomSheet) return undefined;
    if (dragState === 'dragging') {
      const baseHeight = startHeight.current;
      const newHeight = baseHeight - dragOffset;
      return `${Math.max(30, Math.min(95, newHeight))}vh`;
    }
    return dragState === 'expanded' ? '90vh' : '70vh';
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isBottomSheet) return;
    startY.current = e.touches[0].clientY;
    startHeight.current = dragState === 'expanded' ? 90 : 70;
    velocityTracker.current = [{ time: Date.now(), y: e.touches[0].clientY }];
    setDragState('dragging');
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isBottomSheet || dragState !== 'dragging') return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;
    const deltaVh = (deltaY / window.innerHeight) * 100;

    setDragOffset(deltaVh);

    velocityTracker.current.push({ time: Date.now(), y: currentY });
    if (velocityTracker.current.length > 5) {
      velocityTracker.current.shift();
    }
  };

  const handleTouchEnd = () => {
    if (!isBottomSheet || dragState !== 'dragging') return;

    const velocity = calculateVelocity();
    const currentHeight = startHeight.current - dragOffset;

    // Fast swipe down = close
    if (velocity > 0.5 && dragOffset > 0) {
      handleOpenChange(false);
      setDragState('default');
      setDragOffset(0);
      return;
    }

    // Fast swipe up = expand
    if (velocity < -0.5 && dragOffset < 0) {
      setDragState('expanded');
      setDragOffset(0);
      return;
    }

    // Sensitive drag thresholds (position based)
    if (dragOffset > 5) { // Dragged down > 5vh
      handleOpenChange(false);
      setDragState('default');
    } else if (dragOffset < -2) { // Dragged up > 2vh
      setDragState('expanded');
    } else {
      // Snap back if movement was tiny
      setDragState(currentHeight > 80 ? 'expanded' : 'default');
    }

    setDragOffset(0);
  };

  const calculateVelocity = () => {
    if (velocityTracker.current.length < 2) return 0;

    const recent = velocityTracker.current.slice(-3);
    const timeDelta = recent[recent.length - 1].time - recent[0].time;
    const yDelta = recent[recent.length - 1].y - recent[0].y;

    return timeDelta > 0 ? yDelta / timeDelta : 0;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isBottomSheet || (e.target as HTMLElement).closest('button, a, input, textarea, select')) return;
    e.preventDefault();
    startY.current = e.clientY;
    startHeight.current = dragState === 'expanded' ? 90 : 70;
    velocityTracker.current = [{ time: Date.now(), y: e.clientY }];
    setDragState('dragging');

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const currentY = moveEvent.clientY;
      const deltaY = currentY - startY.current;
      const deltaVh = (deltaY / window.innerHeight) * 100;

      setDragOffset(deltaVh);

      velocityTracker.current.push({ time: Date.now(), y: currentY });
      if (velocityTracker.current.length > 5) {
        velocityTracker.current.shift();
      }
    };

    const handleMouseUp = () => {
      handleTouchEnd();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        style={isBottomSheet ? {
          height: getHeight(),
          transition: dragState === 'dragging' ? 'none' : 'height 0.3s ease-out'
        } : undefined}
        onPointerDown={isBottomSheet ? handleMouseDown : undefined}
        {...props}
      >
        {isBottomSheet && (
          <div className="sticky top-0 z-50 bg-background pt-8 pb-8 flex justify-center border-b-0">
            <div
              className="w-12 h-2.5 bg-muted-foreground/50 rounded-full cursor-grab active:cursor-grabbing touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
        )}
        {children}
        {!isBottomSheet && (
          <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
})
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-row justify-end space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
