'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check, Plus, X } from 'lucide-react';

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    className?: string;
}

// Convert HEX to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

// Convert RGB to HEX
function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// Convert RGB to HSV
function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const v = max;
    const d = max - min;
    const s = max === 0 ? 0 : d / max;
    let h = 0;
    if (max !== min) {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, v: v * 100 };
}

// Convert HSV to RGB
function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
    h /= 360; s /= 100; v /= 100;
    let r = 0, g = 0, b = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
    const [hue, setHue] = useState(0);
    const [saturation, setSaturation] = useState(100);
    const [brightness, setBrightness] = useState(100);
    const [hexInputs, setHexInputs] = useState<string[]>([value]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const satBrightRef = useRef<HTMLDivElement>(null);
    const hueRef = useRef<HTMLDivElement>(null);
    const [isDraggingSB, setIsDraggingSB] = useState(false);
    const [isDraggingHue, setIsDraggingHue] = useState(false);

    // Initialize from value
    useEffect(() => {
        const rgb = hexToRgb(value);
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        setHue(hsv.h);
        setSaturation(hsv.s);
        setBrightness(hsv.v);
        if (hexInputs.length === 1 && hexInputs[0] !== value) {
            setHexInputs([value]);
        }
    }, [value]);

    const updateColor = useCallback((h: number, s: number, v: number) => {
        const rgb = hsvToRgb(h, s, v);
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        setHexInputs(prev => {
            const newInputs = [...prev];
            newInputs[activeIndex] = hex;
            return newInputs;
        });
        onChange(hex);
    }, [onChange, activeIndex]);

    const handleSatBrightMove = useCallback((e: MouseEvent | React.MouseEvent) => {
        if (!satBrightRef.current) return;
        const rect = satBrightRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        const newSat = x * 100;
        const newBright = (1 - y) * 100;
        setSaturation(newSat);
        setBrightness(newBright);
        updateColor(hue, newSat, newBright);
    }, [hue, updateColor]);

    const handleHueMove = useCallback((e: MouseEvent | React.MouseEvent) => {
        if (!hueRef.current) return;
        const rect = hueRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newHue = x * 360;
        setHue(newHue);
        updateColor(newHue, saturation, brightness);
    }, [saturation, brightness, updateColor]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDraggingSB) handleSatBrightMove(e);
            if (isDraggingHue) handleHueMove(e);
        };
        const handleMouseUp = () => {
            setIsDraggingSB(false);
            setIsDraggingHue(false);
        };
        if (isDraggingSB || isDraggingHue) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggingSB, isDraggingHue, handleSatBrightMove, handleHueMove]);

    const handleHexChange = (val: string, index: number) => {
        const newInputs = [...hexInputs];
        newInputs[index] = val;
        setHexInputs(newInputs);

        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
            if (index === activeIndex) {
                onChange(val);
                const rgb = hexToRgb(val);
                const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
                setHue(hsv.h);
                setSaturation(hsv.s);
                setBrightness(hsv.v);
            }
        }
    };

    const copyHex = (index: number) => {
        navigator.clipboard.writeText(hexInputs[index]);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    const addColor = () => {
        if (hexInputs.length < 3) {
            setHexInputs(prev => [...prev, '#8B5CF6']);
            setActiveIndex(hexInputs.length);
        }
    };

    const removeColor = (index: number) => {
        if (hexInputs.length > 1) {
            setHexInputs(prev => prev.filter((_, i) => i !== index));
            if (activeIndex >= index && activeIndex > 0) {
                setActiveIndex(activeIndex - 1);
            }
        }
    };

    const selectColor = (index: number) => {
        setActiveIndex(index);
        const rgb = hexToRgb(hexInputs[index]);
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        setHue(hsv.h);
        setSaturation(hsv.s);
        setBrightness(hsv.v);
        onChange(hexInputs[index]);
    };

    // Hue color for the gradient
    const hueColor = `hsl(${hue}, 100%, 50%)`;

    // Generate gradient preview
    const gradientPreview = hexInputs.length > 1
        ? `linear-gradient(to right, ${hexInputs.join(', ')})`
        : hexInputs[0];

    return (
        <div className={cn("w-full rounded-xl border border-border bg-card overflow-hidden", className)}>
            {/* Color preview + Saturation/Brightness picker */}
            <div className="flex h-40">
                {/* Color Preview Block - shows gradient if multiple colors */}
                <div
                    className="w-1/3 h-full"
                    style={{ background: gradientPreview }}
                />

                {/* Saturation/Brightness Picker */}
                <div
                    ref={satBrightRef}
                    className="flex-1 relative cursor-crosshair"
                    style={{
                        background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`
                    }}
                    onMouseDown={(e) => {
                        setIsDraggingSB(true);
                        handleSatBrightMove(e);
                    }}
                >
                    {/* Picker circle */}
                    <div
                        className="absolute w-5 h-5 border-2 border-white rounded-full shadow-lg pointer-events-none"
                        style={{
                            left: `calc(${saturation}% - 10px)`,
                            top: `calc(${100 - brightness}% - 10px)`,
                            boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)'
                        }}
                    />
                </div>
            </div>

            {/* Hue Slider */}
            <div className="px-4 py-3">
                <div
                    ref={hueRef}
                    className="relative h-3 rounded-full cursor-pointer"
                    style={{
                        background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'
                    }}
                    onMouseDown={(e) => {
                        setIsDraggingHue(true);
                        handleHueMove(e);
                    }}
                >
                    {/* Hue picker */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-lg pointer-events-none"
                        style={{
                            left: `calc(${(hue / 360) * 100}% - 10px)`,
                            backgroundColor: hueColor,
                            boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)'
                        }}
                    />
                </div>
            </div>

            {/* HEX Inputs */}
            <div className="px-4 pb-4 space-y-2">
                {hexInputs.map((hex, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-center gap-2 bg-muted rounded-lg px-3 py-2 transition-all",
                            activeIndex === index && "ring-2 ring-primary"
                        )}
                        onClick={() => selectColor(index)}
                    >
                        <div
                            className="w-6 h-6 rounded-md border border-border"
                            style={{ backgroundColor: hex }}
                        />
                        <span className="text-xs text-muted-foreground font-medium">HEX</span>
                        <input
                            type="text"
                            value={hex}
                            onChange={(e) => handleHexChange(e.target.value, index)}
                            className="flex-1 bg-transparent text-center text-sm font-mono outline-none"
                            maxLength={7}
                        />
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); copyHex(index); }}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {copiedIndex === index ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                        {/* Show plus on last item if less than 3 colors */}
                        {index === hexInputs.length - 1 && hexInputs.length < 3 && (
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); addColor(); }}
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        )}
                        {/* Show remove button if more than 1 color */}
                        {hexInputs.length > 1 && (
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeColor(index); }}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
