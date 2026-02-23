"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { categories, contentMap, colorClasses } from "@/components/landing/features-mega-menu";
import { X, Check } from "lucide-react";

interface FeatureSelectionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentSelection: string[];
    onSelect: (features: string[]) => void;
}

export function FeatureSelectionDialog({
    open,
    onOpenChange,
    currentSelection,
    onSelect
}: FeatureSelectionDialogProps) {
    const [activeCategory, setActiveCategory] = useState<keyof typeof contentMap>("blog");
    const [tempSelection, setTempSelection] = useState<string[]>(currentSelection);

    // Sync temp selection when dialog opens
    useEffect(() => {
        if (open) {
            setTempSelection(currentSelection || []);
        }
    }, [open, currentSelection]);

    const handleClear = () => {
        setTempSelection([]);
    };

    const handleConfirm = () => {
        onSelect(tempSelection);
        onOpenChange(false);
    };

    const toggleFeature = (featureTitle: string) => {
        setTempSelection(prev => {
            if (prev.includes(featureTitle)) {
                return prev.filter(f => f !== featureTitle);
            } else {
                return [...prev, featureTitle];
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden border-none shadow-2xl bg-transparent sm:rounded-2xl">
                <div className="flex w-full min-h-[500px] max-h-[85vh] bg-background/95 backdrop-blur-3xl border border-white/20 rounded-2xl flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-muted/20">
                        <DialogTitle className="text-xl font-bold">Select the features you love the most</DialogTitle>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="rounded-full">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="flex flex-1 overflow-hidden">
                        {/* Sidebar - Categories */}
                        <div className="w-[280px] bg-muted/30 border-r border-white/10 flex flex-col p-4 space-y-2 overflow-y-auto custom-scrollbar">
                            {categories.map((cat) => {
                                // Calculate count of selected items in this category
                                const categoryItems = contentMap[cat.id].items;
                                const selectedCount = categoryItems.filter(item => tempSelection.includes(item.title)).length;

                                return (
                                    <div
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id as keyof typeof contentMap)}
                                        className={cn(
                                            "group flex items-start gap-4 p-3 rounded-xl transition-all duration-200 cursor-pointer relative",
                                            activeCategory === cat.id
                                                ? "bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/10"
                                                : "hover:bg-white/5 border border-transparent"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "p-2 rounded-lg transition-colors",
                                                activeCategory === cat.id
                                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                                    : "bg-muted text-muted-foreground group-hover:bg-white/10 group-hover:text-foreground"
                                            )}
                                        >
                                            <cat.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 pr-6">
                                            <h4
                                                className={cn(
                                                    "text-sm font-semibold mb-1 transition-colors",
                                                    activeCategory === cat.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                                )}
                                            >
                                                {cat.label}
                                            </h4>
                                            <p className="text-[10px] text-muted-foreground line-clamp-2 leading-snug">
                                                {cat.description}
                                            </p>
                                        </div>
                                        {selectedCount > 0 && (
                                            <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                                                {selectedCount}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Content Area - Right Side */}
                        <div className="flex-1 bg-background/50 flex flex-col overflow-hidden">
                            <div className="p-6 grid grid-cols-2 gap-4 overflow-y-auto custom-scrollbar flex-1 pb-20">
                                {contentMap[activeCategory].items.map((item, index) => {
                                    // Use 'as string[]' cast safely or rely on type inference which should now be string[]
                                    const featureList = tempSelection as unknown as string[];
                                    const isSelected = featureList.includes(item.title);
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => toggleFeature(item.title)}
                                            className={cn(
                                                "relative flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer group/item",
                                                isSelected
                                                    ? "bg-primary/5 border-primary/50 shadow-md ring-1 ring-primary/20"
                                                    : "bg-card border-transparent hover:border-white/10 hover:bg-white/5"
                                            )}
                                        >
                                            <div className="absolute top-3 right-3">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onCheckedChange={() => toggleFeature(item.title)}
                                                    className={cn("data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600 data-[state=checked]:border-transparent", isSelected ? "opacity-100" : "opacity-40 group-hover/item:opacity-100")}
                                                />
                                            </div>

                                            <div className={cn(
                                                "flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200",
                                                colorClasses[item.color]
                                            )}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div className="pr-6">
                                                <h5 className="text-sm font-semibold text-foreground mb-1 transition-colors">
                                                    {item.title}
                                                </h5>
                                                <p className="text-xs text-muted-foreground leading-tight">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Footer - Actions */}
                    <div className="p-4 border-t border-white/10 bg-muted/20 flex items-center justify-end gap-3">
                        <Button variant="ghost" onClick={handleClear} disabled={tempSelection.length === 0} className="text-muted-foreground hover:text-foreground">
                            Clear
                        </Button>
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={tempSelection.length === 0}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-6"
                        >
                            Select Features
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
