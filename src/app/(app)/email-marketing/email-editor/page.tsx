'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

import { useRouter } from 'next/navigation';
import {
    ChevronDown, ChevronUp, Home, Inbox, FileEdit, Repeat, SquareTerminal, Users,
    Files, Settings, ArrowLeft, X, Trash2, CloudUpload, Undo,
    History, Redo, Code, MonitorSmartphone, ClipboardCheck, Upload,
    Share2, Monitor, Smartphone, AreaChart, TrendingUp, Activity,
    Package, LayoutDashboard, Megaphone, LayoutTemplate, List, Mail,
    Crosshair, Maximize
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
    DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import { HexColorPicker } from "react-colorful";
import {
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from '@/components/ui/tooltip';
import Image from 'next/image';
import Editor from '@monaco-editor/react';
import { useEditor, EditorContent } from '@tiptap/react';
import { mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import FontFamily from '@tiptap/extension-font-family';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

const DomainIcon = ({ size = 20, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" width={size} fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
);

const RevenueIcon = ({ size = 20 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill="currentColor" className="lucide">
        <path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z" />
    </svg>
);

const LayoutIcon = ({ size = 20, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill="currentColor" className={className}>
        <path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" />
    </svg>
);

import { ColorPicker } from '@/components/ui/color-picker';

const CustomHeading = Heading.extend({
    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level);
        const level = hasLevel ? node.attrs.level : this.options.levels[0];
        let inlineStyle = '';
        switch (level) {
            case 1: inlineStyle = 'font-size: 36px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            case 2: inlineStyle = 'font-size: 32px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            case 3: inlineStyle = 'font-size: 28px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            case 4: inlineStyle = 'font-size: 24px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            case 5: inlineStyle = 'font-size: 20px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            case 6: inlineStyle = 'font-size: 18px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            default: inlineStyle = 'font-size: 36px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
        }
        return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { style: inlineStyle }), 0];
    }
});

const CustomParagraph = Paragraph.extend({
    renderHTML({ HTMLAttributes }) {
        return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { style: 'margin: 0;' }), 0];
    }
});

const RichTextEditor = ({ boxId, isSelected, boxProperties, onEditorFocus, onEditorBlur, onTransaction }: any) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                paragraph: false,
            }),
            CustomHeading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
            CustomParagraph,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Subscript,
            Superscript,
            TextStyle,
            FontFamily,
            Color,
        ],
        content: boxProperties?.content || '<p>Type your text and work on its text styles, add merge tags and lists</p>',
        onFocus: ({ editor }) => onEditorFocus(editor),
        onBlur: ({ editor }) => onEditorBlur(editor),
        onTransaction: ({ editor }) => onTransaction(editor),
    });

    // Standard focus sync
    useEffect(() => {
        if (isSelected && editor) {
            onEditorFocus(editor);
        }
    }, [isSelected, editor, onEditorFocus]);

    // Undo/Redo sync: when emailTree is rewound externally, force Tiptap
    // to update its internal HTML if it has drifted from the tree value.
    useEffect(() => {
        if (editor && boxProperties?.content !== undefined) {
            if (editor.getHTML() !== boxProperties.content) {
                editor.commands.setContent(boxProperties.content, false /* don't emit update */);
            }
        }
    }, [editor, boxProperties?.content]);

    if (!editor) return null;

    return (
        <div style={{
            textAlign: boxProperties?.textAlign || 'left',
            color: boxProperties?.fontColor || '#333333',
            fontSize: `${boxProperties?.fontSize || 14}px`,
            lineHeight: boxProperties?.lineHeight || 1.5,
            fontFamily: boxProperties?.fontFamily || 'Arial'
        }} className="w-full h-full [&>.tiptap]:outline-none [&>.tiptap]:h-full [&>.tiptap]:w-full relative">
            <EditorContent editor={editor} className="w-full h-full" onClick={(e) => { e.stopPropagation(); onEditorFocus(editor); }} />
        </div>
    );
};

const StructureWrapper = ({ id, isSelected, onSelect, onDelete, onDuplicate, onMoveDragStart, onMoveDragEnd, isDraggingLayout, topOffset = "-2px", isTopRow, children,
    setSelectedBackdropRowId,
    setSelectedBoxId,
    setSelectedLayer,
    setActiveRightSidebarTab
}: {
    id?: string, isSelected?: boolean, onSelect?: () => void, onDelete?: () => void, onDuplicate?: () => void, onMoveDragStart?: (e: React.DragEvent) => void, onMoveDragEnd?: () => void, isDraggingLayout?: boolean, topOffset?: string, isTopRow?: boolean, children: React.ReactNode,
    setSelectedBackdropRowId: (id: string | null) => void,
    setSelectedBoxId: (id: string | null) => void,
    setSelectedLayer: (layer: 'block' | 'container' | 'structure' | 'backdrop' | null) => void,
    setActiveRightSidebarTab: (tab: 'general' | 'message') => void
}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen && onSelect) {
            onSelect();
        }
    }, [isOpen, onSelect]);

    return (
        <div
            className={`relative group/structure w-full h-full px-8`}
            onClick={(e) => {
                if (onSelect) {
                    e.stopPropagation();
                    onSelect();
                }
            }}
        >
            {/* Invisible Hitbox Extension - ensures hover/click works in the extended border area */}
            <div
                style={{ top: topOffset, bottom: '0' }}
                className="absolute inset-x-0 z-0 pointer-events-auto"
            ></div>
            {/* The Border Layer - absolute inset so it covers the full width of the white canvas */}
            <div
                style={{ top: topOffset, bottom: '0' }}
                className={`absolute inset-x-0 rounded-[4px] border-[2px] transition-colors pointer-events-none z-[10] ${isDraggingLayout ? 'border-[#93c5fd]' : isSelected || isOpen ? 'border-[#6b3737]' : 'border-transparent group-hover/structure:border-[#9a5353] group-has-[.structure-container:hover]/structure:!border-transparent'}`}
            ></div>

            {/* Structure Overlay on Hover */}
            <div
                style={{ top: topOffset, bottom: '0' }}
                className={`absolute inset-x-0 pointer-events-none transition-opacity duration-300 z-[30] ${isSelected || isOpen ? 'opacity-100' : 'opacity-0 group-hover/structure:opacity-100 group-has-[.structure-container:hover]/structure:!opacity-0'}`}
            >
                {/* Structure Layer Stack (Top Left usually, Bottom Left for top row) */}
                <div className={`group/layerpill absolute ${isTopRow ? '-bottom-[28px] left-[44px]' : '-top-[27px] left-[0px]'} w-auto flex flex-col items-start pointer-events-auto transition-all duration-200 group-has-[.structure-container:hover]/structure:opacity-0 group-has-[.structure-container:hover]/structure:pointer-events-none`}>
                    {/* Structure Pill Hitbox Extension */}
                    <div className={`absolute inset-x-0 ${isTopRow ? 'top-[-8px] h-[30px]' : 'top-0 h-[27px]'} pointer-events-auto z-[60]`}></div>
                    {[
                        { id: 'structure', label: 'Structure', color: isSelected || isOpen ? '#6b3737' : '#9a5353' },
                        { id: 'backdrop', label: 'Backdrop', color: '#64748b' }
                    ].map((layer, index) => (
                        <div
                            key={layer.id}
                            onClick={(e) => {
                                if (onSelect && layer.id === 'structure') {
                                    e.stopPropagation();
                                    onSelect();
                                }
                                if (layer.id === 'backdrop') {
                                    e.stopPropagation();
                                    setSelectedBackdropRowId(id || null);
                                    setSelectedBoxId(null);
                                    setSelectedLayer('backdrop');
                                    setActiveRightSidebarTab('general');
                                }
                            }}
                            style={{
                                backgroundColor: layer.color,
                                borderColor: layer.color
                            }}
                            className={`px-3 py-[3px] rounded-full border-0 text-white text-[10.5px] font-medium shadow-sm flex items-center justify-start transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${index === 0
                                ? 'relative z-50 cursor-grab active:cursor-grabbing'
                                : 'absolute top-0 left-0 z-40 opacity-0 pointer-events-none group-hover/layerpill:top-[30px] group-hover/layerpill:opacity-100 group-hover/layerpill:pointer-events-auto cursor-pointer'
                                }`}
                        >
                            <span className="capitalize tracking-wide">{layer.label}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="currentColor" className="opacity-80 rotate-90 ml-1.5 -mr-1">
                                <path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" />
                            </svg>
                        </div>
                    ))}
                </div>

                {/* Add Icon Dropdown (Bottom Left) */}
                <div className={`absolute ${isTopRow ? '-bottom-[42px]' : '-bottom-[41px]'} left-[0px] pointer-events-auto transition-all duration-200 group-has-[.structure-container:hover]/structure:opacity-0 group-has-[.structure-container:hover]/structure:pointer-events-none`}>
                    {/* Plus Button Hitbox Extension */}
                    <div className="absolute inset-0 top-[-8px] h-[44px] pointer-events-auto z-[60]"></div>
                    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger asChild>
                            <div
                                style={{ backgroundColor: isSelected || isOpen ? '#6b3737' : '#9a5353' }}
                                className="w-[36px] h-[36px] rounded-[12px] text-white flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                            >
                                <span className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>{isOpen ? 'close' : 'add'}</span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="start" sideOffset={12} className="w-[200px] p-2 rounded-[16px] z-[100] shadow-xl">
                            <div className="grid grid-cols-3 gap-1.5">
                                {/* Left Heavy (1:2) */}
                                <div className="h-[34px] bg-white dark:bg-background border border-gray-200 dark:border-border rounded-[2px] p-1 cursor-pointer hover:border-primary hover:bg-gray-50 flex gap-0.5 shadow-sm transition-colors">
                                    <div className="w-[33%] h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                    <div className="flex-1 h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                </div>
                                {/* Right Heavy (2:1) */}
                                <div className="h-[34px] bg-white dark:bg-background border border-gray-200 dark:border-border rounded-[2px] p-1 cursor-pointer hover:border-primary hover:bg-gray-50 flex gap-0.5 shadow-sm transition-colors">
                                    <div className="flex-1 h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                    <div className="w-[33%] h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                </div>
                                {/* Center Heavy (1:2:1) */}
                                <div className="h-[34px] bg-white dark:bg-background border border-gray-200 dark:border-border rounded-[2px] p-1 cursor-pointer hover:border-primary hover:bg-gray-50 flex gap-0.5 shadow-sm transition-colors">
                                    <div className="w-[25%] h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                    <div className="flex-1 h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                    <div className="w-[25%] h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                </div>
                                {/* Left Heavy Double (2:1:1) */}
                                <div className="h-[34px] bg-white dark:bg-background border border-gray-200 dark:border-border rounded-[2px] p-1 cursor-pointer hover:border-primary hover:bg-gray-50 flex gap-0.5 shadow-sm transition-colors">
                                    <div className="flex-1 h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                    <div className="w-[25%] h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                    <div className="w-[25%] h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                </div>
                                {/* Right Heavy Double (1:1:2) */}
                                <div className="h-[34px] bg-white dark:bg-background border border-gray-200 dark:border-border rounded-[2px] p-1 cursor-pointer hover:border-primary hover:bg-gray-50 flex gap-0.5 shadow-sm transition-colors">
                                    <div className="w-[25%] h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                    <div className="w-[25%] h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                    <div className="flex-1 h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                </div>
                                {/* Splits (1:1:1:3) */}
                                <div className="h-[34px] bg-white dark:bg-background border border-gray-200 dark:border-border rounded-[2px] p-1 cursor-pointer hover:border-primary hover:bg-gray-50 flex gap-0.5 shadow-sm transition-colors">
                                    <div className="w-[16%] h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                    <div className="w-[16%] h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                    <div className="w-[16%] h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                    <div className="flex-1 h-full bg-[#f0f7ff] dark:bg-blue-900/10 border border-dashed border-blue-300 dark:border-blue-500/30 rounded-[2px]"></div>
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* 3 Dot Menu (Right Centered) with hover slide-in action panel */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-[44px] pointer-events-auto group/structurebtn flex items-center">
                    {/* Main button row: slide panel + 3-dot (reversed) */}
                    <div className="flex flex-row-reverse items-center">
                        {/* 3-dot / Save-as-module button — always visible, anchored at right */}
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        style={{ backgroundColor: isSelected || isOpen ? '#6b3737' : '#9a5353' }}
                                        className="w-[36px] h-[36px] rounded-[12px] text-white flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex-shrink-0 relative overflow-hidden"
                                    >
                                        {/* 3-dot Square Hitbox Extension */}
                                        <div className={`absolute inset-y-0 right-0 left-[-12px] top-0 h-[37px] pointer-events-auto z-[60]`}></div>
                                        {/* 3 dots — visible when NOT hovered */}
                                        <div className="absolute inset-0 flex items-center justify-center gap-[3px] transition-opacity duration-200 opacity-100 group-hover/structurebtn:opacity-0">
                                            <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
                                            <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
                                            <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
                                        </div>
                                        {/* Save as Module icon — visible on hover */}
                                        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover/structurebtn:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                                                <path d="M800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h400v80H160v480h640v-280h80v280q0 33-23.5 56.5T800-160ZM240-320h280v-120H240v120Zm0-200h280v-120H240v120Zm360 200h120v-200H600v200Zm-440 80v-480 480Zm560-360v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={8}>Save as Module</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        {/* Slide-in action panel — expands to the LEFT of the 3-dot on hover */}
                        <div
                            className="flex items-center gap-[6px] mr-[6px] overflow-hidden transition-all duration-200 ease-out max-w-0 opacity-0 group-hover/structurebtn:max-w-[124px] group-hover/structurebtn:opacity-100"
                        >
                            {/* Delete icon */}
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div
                                            style={{ backgroundColor: isSelected || isOpen ? '#6b3737' : '#9a5353' }}
                                            className="w-[32px] h-[32px] rounded-[10px] text-white flex items-center justify-center cursor-pointer shadow-md hover:brightness-110 active:scale-90 transition-all duration-150 flex-shrink-0"
                                            onClick={(e) => { e.stopPropagation(); if (onDelete) onDelete(); }}
                                        >
                                            <span className="material-symbols-outlined text-[16px]">delete_outline</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={8}>Delete Structure</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            {/* Duplicate icon */}
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div
                                            style={{ backgroundColor: isSelected || isOpen ? '#6b3737' : '#9a5353' }}
                                            className="w-[32px] h-[32px] rounded-[10px] text-white flex items-center justify-center cursor-pointer shadow-md hover:brightness-110 active:scale-90 transition-all duration-150 flex-shrink-0"
                                            onClick={(e) => { e.stopPropagation(); if (onDuplicate) onDuplicate(); }}
                                        >
                                            <span className="material-symbols-outlined text-[16px]">content_copy</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={8}>Duplicate Structure</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            {/* Move icon — between Duplicate and Save as Module */}
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div
                                            style={{ backgroundColor: isSelected || isOpen ? '#6b3737' : '#9a5353' }}
                                            className="w-[32px] h-[32px] rounded-[10px] text-white flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md hover:brightness-110 active:scale-90 transition-all duration-150 flex-shrink-0"
                                            onClick={(e) => { e.stopPropagation(); }}
                                            draggable
                                            onDragStart={(e) => { if (onMoveDragStart) onMoveDragStart(e); }}
                                            onDragEnd={() => { if (onMoveDragEnd) onMoveDragEnd(); }}
                                        >
                                            <span className="material-symbols-outlined text-[16px]">open_with</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={8}>Move</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content properly z-indexed so border doesn't block interactions */}
            <div className="relative w-full h-full">
                {children}
            </div>
        </div>
    );
};

// ─── Recursive Data Model ───────────────────────────────────────────────────
export interface BlockData {
    id: string;
    type: 'text' | 'image' | 'button';
    properties: Record<string, any>;
}

export interface ContainerData {
    id: string;
    block: BlockData | null; // null = empty drop zone
}

export interface StructureData {
    id: string;
    columns: number[];            // fractional widths, e.g. [0.3, 0.7]
    containers: ContainerData[];  // one ContainerData per column
}

export interface BackdropData {
    id: string;
    backgroundColor: string;    // full-width backdrop colour
    structures: StructureData[]; // for now, always exactly one structure per backdrop row
}
// ─────────────────────────────────────────────────────────────────────────────

// Helper: build initial BackdropData rows that mirror the old flat state
const buildInitialTree = (): BackdropData[] => [
    {
        id: 'row1',
        backgroundColor: '',
        structures: [{
            id: 'row1',
            columns: [0.3, 0.7],
            containers: [
                { id: `container-${crypto.randomUUID()}`, block: null },
                { id: `container-${crypto.randomUUID()}`, block: null },
            ],
        }],
    },
    {
        id: 'row2',
        backgroundColor: '',
        structures: [{
            id: 'row2',
            columns: [1],
            containers: [
                { id: `container-${crypto.randomUUID()}`, block: null },
            ],
        }],
    },
    {
        id: 'row3',
        backgroundColor: '',
        structures: [{
            id: 'row3',
            columns: [1, 1],
            containers: [
                { id: `container-${crypto.randomUUID()}`, block: null },
                { id: `container-${crypto.randomUUID()}`, block: null },
            ],
        }],
    },
];

export default function EmailEditorPage() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [title, setTitle] = useState("new message");
    const [subjectText, setSubjectText] = useState("");
    const [preheaderText, setPreheaderText] = useState("");
    const [isSubjectEmojiPickerOpen, setIsSubjectEmojiPickerOpen] = useState(false);
    const [isPreheaderEmojiPickerOpen, setIsPreheaderEmojiPickerOpen] = useState(false);
    const [isGmailAnnotationEnabled, setIsGmailAnnotationEnabled] = useState(false);
    const [isSenderLogoEnabled, setIsSenderLogoEnabled] = useState(false);
    const [isCodeEditorOpen, setIsCodeEditorOpen] = useState(false);
    const [editorHeight, setEditorHeight] = useState(320);
    const [isDefaultCssOpen, setIsDefaultCssOpen] = useState(false);
    const [isCustomCssOpen, setIsCustomCssOpen] = useState(false);
    const [isStructuresPanelOpen, setIsStructuresPanelOpen] = useState(false);
    const [isStructuresPanelClosing, setIsStructuresPanelClosing] = useState(false);
    const [structuresTab, setStructuresTab] = useState<'general' | 'current-layout' | 'my-modules'>('general');
    const [activeRightSidebarTab, setActiveRightSidebarTab] = useState<'general' | 'message'>('message');
    const [selectedGeneralStyle, setSelectedGeneralStyle] = useState<string | null>(null);
    const [isGeneralHovered, setIsGeneralHovered] = useState(false);
    // ── Single source of truth for the entire email canvas ──
    const [emailTree, setEmailTree] = useState<BackdropData[]>(buildInitialTree);
    const [isBackdropColorPickerOpen, setIsBackdropColorPickerOpen] = useState(false);
    const [selectedBackdropRowId, setSelectedBackdropRowId] = useState<string | null>(null);

    const structuresPanelRef = useRef<HTMLDivElement>(null);
    const [structuresPanelPosition, setStructuresPanelPosition] = useState<'left' | 'right'>('left');
    const [isDraggingStructures, setIsDraggingStructures] = useState(false);
    const [isDragOverRight, setIsDragOverRight] = useState(false);
    const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
    const [draggingTool, setDraggingTool] = useState<{ icon: string; type?: string; component?: string; columns?: number[]; id?: string } | null>(null);
    const wasDraggingRef = useRef(false);
    const canvasRef = useRef<HTMLDivElement>(null);
    const [dropInsertIndex, setDropInsertIndex] = useState<number | null>(null);
    const [globalStyles, setGlobalStyles] = useState({
        displayBackground: "#f6f6f6"
    });
    const [isGlobalColorPickerOpen, setIsGlobalColorPickerOpen] = useState(false);
    const [isBgImageEnabled, setIsBgImageEnabled] = useState(false);

    const canvasScrollRef = useRef<HTMLDivElement>(null);

    const [selectedLayer, setSelectedLayer] = useState<'block' | 'container' | 'structure' | 'backdrop' | null>(null);

    // Track cursor position during drag for the floating ghost
    useEffect(() => {
        if (!isDraggingStructures && !draggingTool) { setDragPos(null); return; }
        const onDrag = (e: DragEvent) => {
            if (e.clientX === 0 && e.clientY === 0) return; // ignore final 0,0
            setDragPos({ x: e.clientX, y: e.clientY });
        };
        const onDragOver = (e: DragEvent) => {
            setDragPos({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('drag', onDrag);
        document.addEventListener('dragover', onDragOver);
        return () => {
            document.removeEventListener('drag', onDrag);
            document.removeEventListener('dragover', onDragOver);
        };
    }, [isDraggingStructures, !!draggingTool]);

    const [draggedOverBox, setDraggedOverBox] = useState<string | null>(null);
    const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);

    // ── Memoized tree selectors (avoid inline loops in render) ──────────────
    const activeBlockNode = React.useMemo(() => {
        if (!selectedBoxId || selectedLayer !== 'block') return null;
        for (const bd of emailTree) {
            for (const st of bd.structures) {
                for (const c of st.containers) {
                    if (c.id === selectedBoxId && c.block) return c.block;
                }
            }
        }
        return null;
    }, [emailTree, selectedBoxId, selectedLayer]);

    const activeBackdropNode = React.useMemo(() => {
        if (!selectedBackdropRowId) return null;
        return emailTree.find(bd => bd.id === selectedBackdropRowId) || null;
    }, [emailTree, selectedBackdropRowId]);

    // Text Block Properties State
    const [textPropertiesTab, setTextPropertiesTab] = useState<'settings' | 'styles'>('settings');
    const [activeEditor, setActiveEditor] = useState<any>(null);
    const [editorUpdateTicker, setEditorUpdateTicker] = useState(0);

    // History tracks the entire emailTree for undo/redo
    const [history, setHistory] = useState<BackdropData[][]>([buildInitialTree()]);
    const [historyIndex, setHistoryIndex] = useState(0);
    // Ref to avoid stale closure in history tracking
    const historyIndexRef = useRef(0);
    const isHistoryAction = useRef(false);
    const lastSavedState = useRef(JSON.stringify(buildInitialTree()));

    // Watch for emailTree changes and automatically sync to history.
    // useEffect fires AFTER React has committed the state — meaning it always
    // sees the final, settled value even when multiple state updates are batched.
    useEffect(() => {
        // If this change was triggered by Undo/Redo, skip saving a new snapshot
        if (isHistoryAction.current) {
            isHistoryAction.current = false;
            lastSavedState.current = JSON.stringify(emailTree);
            return;
        }

        const currentStr = JSON.stringify(emailTree);
        // Only push to history if the state actually changed
        // (prevents React StrictMode double-invocation from creating duplicate entries)
        if (currentStr !== lastSavedState.current) {
            lastSavedState.current = currentStr;
            const snapshot = JSON.parse(currentStr) as BackdropData[];
            const currentIdx = historyIndexRef.current;
            setHistory(prev => {
                const next = prev.slice(0, currentIdx + 1);
                next.push(snapshot);
                return next;
            });
            historyIndexRef.current = currentIdx + 1;
            setHistoryIndex(currentIdx + 1);
        }
    }, [emailTree]);

    // Helper: read a block property directly from the tree
    const getBlockProperty = (containerId: string, key: string, fallback?: any) => {
        for (const bd of emailTree) {
            for (const st of bd.structures) {
                for (const c of st.containers) {
                    if (c.id === containerId) return c.block?.properties?.[key] ?? fallback;
                }
            }
        }
        return fallback;
    };

    // Helper: update a single block property directly in emailTree
    const updateBlockProperty = (containerId: string, key: string, value: any) => {
        setEmailTree(prev => prev.map(bd => ({
            ...bd,
            structures: bd.structures.map(st => ({
                ...st,
                containers: st.containers.map(c => {
                    if (c.id !== containerId || !c.block) return c;
                    return {
                        ...c,
                        block: {
                            ...c.block,
                            properties: { ...c.block.properties, [key]: value },
                        },
                    };
                }),
            })),
        })));
    };

    // Helper: set block type on a container directly in emailTree
    const setBlockType = (containerId: string, type: string) => {
        setEmailTree(prev => prev.map(bd => ({
            ...bd,
            structures: bd.structures.map(st => ({
                ...st,
                containers: st.containers.map(c => {
                    if (c.id !== containerId) return c;
                    if (type === 'empty') return { ...c, block: null };
                    return {
                        ...c,
                        block: {
                            id: `block-${crypto.randomUUID()}`,
                            type: type as BlockData['type'],
                            properties: c.block?.properties ?? {},
                        },
                    };
                }),
            })),
        })));
    };

    // Helper: Swap blocks between two containers
    const swapBlocks = (sourceContainerId: string, targetContainerId: string) => {
        setEmailTree(prev => {
            let sourceBlock: BlockData | null = null;
            let targetBlock: BlockData | null = null;

            prev.forEach(bd => bd.structures.forEach(st => st.containers.forEach(c => {
                if (c.id === sourceContainerId) sourceBlock = c.block ?? null;
                if (c.id === targetContainerId) targetBlock = c.block ?? null;
            })));

            return prev.map(bd => ({
                ...bd,
                structures: bd.structures.map(st => ({
                    ...st,
                    containers: st.containers.map(c => {
                        if (c.id === sourceContainerId) return { ...c, block: targetBlock };
                        if (c.id === targetContainerId) return { ...c, block: sourceBlock };
                        return c;
                    }),
                })),
            }));
        });
    };

    // Helper: set backdrop background color directly in emailTree
    const setBackdropColor = (backdropId: string, color: string) => {
        setEmailTree(prev => prev.map(bd => bd.id === backdropId ? { ...bd, backgroundColor: color } : bd));
    };

    const handleDeleteContainer = (boxId: string) => {
        setEmailTree(prev => prev.map(bd => ({
            ...bd,
            structures: bd.structures.map(st => {
                // Check if THIS structure actually contains the container, ignoring string prefixes
                const actualIndex = st.containers.findIndex(c => c.id === boxId);
                if (actualIndex === -1) return st;

                const nextContainers = st.containers.filter((_, i) => i !== actualIndex);
                const nextColumns = st.columns.filter((_, i) => i !== actualIndex);

                if (nextContainers.length === 0) return null as any;

                const sum = nextColumns.reduce((a, b) => a + b, 0);
                const normColumns = sum > 0 ? nextColumns.map(v => v / sum) : nextColumns;

                return { ...st, containers: nextContainers, columns: normColumns };
            }).filter(Boolean),
        })).filter(bd => bd.structures.length > 0));

        if (selectedBoxId === boxId) {
            setSelectedBoxId(null);
            setSelectedLayer(null);
        }
    };

    const handleUndo = () => {
        if (historyIndex > 0) {
            isHistoryAction.current = true;
            const nextIndex = historyIndex - 1;
            historyIndexRef.current = nextIndex;
            setHistoryIndex(nextIndex);
            setEmailTree(history[nextIndex]);
            setSelectedBoxId(null);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            isHistoryAction.current = true;
            const nextIndex = historyIndex + 1;
            historyIndexRef.current = nextIndex;
            setHistoryIndex(nextIndex);
            setEmailTree(history[nextIndex]);
            setSelectedBoxId(null);
        }
    };

    const handleCloseStructuresPanel = useCallback(() => {
        setIsStructuresPanelClosing(true);
        setTimeout(() => {
            setIsStructuresPanelOpen(false);
            setIsStructuresPanelClosing(false);
        }, 280);
    }, []);

    const toggleStructuresPanel = useCallback(() => {
        // Skip toggle if we just finished dragging
        if (wasDraggingRef.current) {
            wasDraggingRef.current = false;
            return;
        }
        if (isStructuresPanelOpen) {
            handleCloseStructuresPanel();
        } else {
            setIsStructuresPanelOpen(true);
        }
    }, [isStructuresPanelOpen, handleCloseStructuresPanel]);

    const handleBoxClick = (boxId: string, type: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setBlockType(boxId, type);
        setSelectedBoxId(boxId);
        setSelectedLayer('block');
    };

    const handleDeleteStructure = (structureId: string) => {
        // Find if the currently selected box belongs to the structure being deleted
        const structureToDelete = emailTree.flatMap(bd => bd.structures).find(st => st.id === structureId);
        const containsSelection = structureToDelete?.containers.some(c => c.id === selectedBoxId);

        setEmailTree(prev => prev
            .map(bd => ({ ...bd, structures: bd.structures.filter(st => st.id !== structureId) }))
            .filter(bd => bd.structures.length > 0)
        );

        if (selectedBoxId === structureId || containsSelection) {
            setSelectedBoxId(null);
            setSelectedLayer(null);
        }
    };

    const handleDuplicateStructure = (structureId: string) => {
        setEmailTree(prev => prev.map(bd => {
            const idx = bd.structures.findIndex(st => st.id === structureId);
            if (idx === -1) return bd;
            const original = bd.structures[idx];
            const newId = `row-${Date.now()}`;
            const cloned = JSON.parse(JSON.stringify(original)) as typeof original;
            cloned.id = newId;
            cloned.containers = cloned.containers.map((c) => ({
                ...c,
                id: `container-${crypto.randomUUID()}`,
                block: c.block ? { ...c.block, id: `block-${crypto.randomUUID()}`, properties: { ...c.block.properties } } : null,
            }));
            const newStructures = [...bd.structures];
            newStructures.splice(idx + 1, 0, cloned);
            return { ...bd, structures: newStructures };
        }));
    };

    const handleDeleteBackdropRow = (backdropId: string) => {
        // Check if the selection is inside the deleted backdrop
        const backdropToDelete = emailTree.find(bd => bd.id === backdropId);
        const containsSelection = backdropToDelete?.structures.some(st => 
            st.id === selectedBoxId || st.containers.some(c => c.id === selectedBoxId)
        );

        setEmailTree(prev => prev.filter(bd => bd.id !== backdropId));

        if (selectedBackdropRowId === backdropId || containsSelection) {
            setSelectedBackdropRowId(null);
            setSelectedBoxId(null);
            setSelectedLayer(null);
        }
    };

    const handleDuplicateBackdropRow = (backdropId: string) => {
        setEmailTree(prev => {
            const idx = prev.findIndex(bd => bd.id === backdropId);
            if (idx === -1) return prev;
            const original = prev[idx];
            const newId = `row-${Date.now()}`;
            const cloned = JSON.parse(JSON.stringify(original)) as BackdropData;
            cloned.id = newId;
            cloned.structures = cloned.structures.map(st => {
                const newStId = `row-${crypto.randomUUID()}`;
                return {
                    ...st,
                    id: newStId,
                    containers: st.containers.map((c) => ({
                        ...c,
                        id: `container-${crypto.randomUUID()}`,
                        block: c.block ? { ...c.block, id: `block-${crypto.randomUUID()}`, properties: { ...c.block.properties } } : null,
                    })),
                };
            });
            const next = [...prev];
            next.splice(idx + 1, 0, cloned);
            return next;
        });
    };

    const handleLayoutDragStart = (e: React.DragEvent, columns: number[]) => {
        setIsDraggingStructures(true);
        setDraggingTool({ type: 'layout', icon: 'layout', component: 'layout', columns });
        e.dataTransfer.setData('application/json', JSON.stringify({ type: 'layout', columns }));

        // Hide the native dragging ghost so our custom perfectly styled ghost takes over
        const img = new window.Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        e.dataTransfer.setDragImage(img, 0, 0);

        // Ensure we stop dragging if native drag end fires but we somehow miss it
        const onEnd = () => {
            setIsDraggingStructures(false);
            setDraggingTool(null);
            document.removeEventListener('dragend', onEnd);
        };
        document.addEventListener('dragend', onEnd);
    };


    const renderContainerOverlay = (boxId: string, structureId: string, backdropId: string) => {
        const isSelected = selectedBoxId === boxId;
        const isContainerSelected = isSelected && selectedLayer === 'container';
        const rowId = structureId;
        const isTopRow = (() => {
            let flat = 0;
            for (const bd of emailTree) {
                for (const st of bd.structures) {
                    if (st.id === rowId) return flat === 0;
                    flat++;
                }
            }
            return false;
        })();

        const colors = { container: '#3b82f6', structure: '#9a5353', backdrop: '#64748b' };

        return (
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-200 z-[40] ${isContainerSelected ? 'opacity-100' : 'opacity-0 group-hover/container:opacity-100 group-has-[.group\\/block:hover]/container:opacity-0'
                }`}>
                {/* Container border */}
                <div className={`absolute inset-0 border-[2px] rounded-[4px] pointer-events-none ${isContainerSelected ? 'border-blue-500' : 'border-blue-400'
                    }`} />

                {/* Invisible hitbox bridge (towards floating controls) */}
                <div className={`absolute left-[28px] w-[75px] pointer-events-auto ${isTopRow ? '-bottom-[28px] h-[28px]' : '-top-[28px] h-[28px]'
                    }`} />
                <div className="absolute top-1/2 -translate-y-1/2 -left-[44px] w-[44px] h-[36px] pointer-events-auto" />

                {/* Layer breadcrumb pill — Container > Structure > Backdrop */}
                <div className={`group/layerpill absolute ${isTopRow ? '-bottom-[19px]' : '-top-[28px]'
                    } left-[28px] w-auto flex flex-col items-start transition-opacity duration-300 z-50`}>
                    {/* Hitbox bridge for pill expansion */}
                    <div className="absolute inset-x-0 top-[28px] h-[28px] pointer-events-none group-hover/layerpill:pointer-events-auto z-[60]" />
                    {[
                        { id: 'container', label: 'Container', color: colors.container },
                        { id: 'structure', label: 'Structure', color: colors.structure },
                        { id: 'backdrop', label: 'Backdrop', color: colors.backdrop },
                    ].map((layer, idx) => (
                        <div
                            key={layer.id}
                            draggable={layer.id === 'structure'}
                            onDragStart={(e) => {
                                if (layer.id === 'structure') {
                                    e.dataTransfer.effectAllowed = 'move';
                                    const img = new window.Image();
                                    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                                    e.dataTransfer.setDragImage(img, 0, 0);
                                    setDraggingTool({ icon: 'layout', type: 'move_structure', id: structureId });
                                }
                            }}
                            onDragEnd={() => {
                                if (layer.id === 'structure') {
                                    setDraggingTool(null);
                                    setDropInsertIndex(null);
                                }
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (layer.id === 'backdrop') {
                                    setSelectedBackdropRowId(rowId);
                                    setSelectedBoxId(null);
                                    setSelectedLayer('backdrop');
                                    setActiveRightSidebarTab('general');
                                } else if (layer.id === 'structure') {
                                    setSelectedBoxId(rowId);
                                    setSelectedLayer('structure');
                                    setSelectedBackdropRowId(null);
                                } else {
                                    setSelectedBoxId(boxId);
                                    setSelectedLayer('container');
                                    setSelectedBackdropRowId(null);
                                }
                            }}
                            style={{ backgroundColor: layer.color, borderColor: layer.color, zIndex: 30 - idx }}
                            className={`px-3 py-[3px] rounded-full border-0 text-[10.5px] font-medium text-white
                                transition-all duration-300 ease-in-out shadow-sm flex items-center justify-start
                                hover:scale-105 active:scale-95 pointer-events-auto
                                ${idx === 0
                                    ? 'relative cursor-pointer'
                                    : '-mt-[26px] opacity-0 pointer-events-none group-hover/layerpill:mt-[4px] group-hover/layerpill:opacity-100 group-hover/layerpill:pointer-events-auto cursor-grab active:cursor-grabbing'
                                }`}
                        >
                            <span className="capitalize tracking-wide">{layer.label}</span>
                            {idx !== 0 && (
                                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="currentColor" className="opacity-80 rotate-90 ml-1.5 -mr-1 pointer-events-none">
                                    <path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" />
                                </svg>
                            )}
                        </div>
                    ))}
                </div>

                {/* Left delete button */}
                <div
                    style={{ backgroundColor: colors.container }}
                    className="absolute top-1/2 -translate-y-1/2 -left-[44px] text-white rounded-[12px] w-[36px] h-[36px] flex items-center justify-center pointer-events-auto cursor-pointer shadow-md hover:scale-105 transition-all duration-300 group/delbtn z-[50]"
                    onClick={(e) => { e.stopPropagation(); handleDeleteContainer(boxId); }}
                >
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center justify-center w-full h-full relative">
                                    <div className="flex items-center justify-center gap-[3px] absolute transition-opacity duration-200 group-hover/delbtn:opacity-0 opacity-100">
                                        <div className="w-[4px] h-[4px] rounded-full bg-white" />
                                        <div className="w-[4px] h-[4px] rounded-full bg-white" />
                                        <div className="w-[4px] h-[4px] rounded-full bg-white" />
                                    </div>
                                    <span className="material-symbols-outlined text-[18px] absolute transition-opacity duration-200 group-hover/delbtn:opacity-100 opacity-0">delete_outline</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" sideOffset={12}>Delete Container</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        );
    };

    const renderBlockOverlay = (boxId: string, structureId: string) => {
        const isSelected = selectedBoxId === boxId;
        const isBlockSelected = isSelected && selectedLayer === 'block';
        const rowId = structureId;
        const isTopRow = (() => {
            let flat = 0;
            for (const bd of emailTree) {
                for (const st of bd.structures) {
                    if (st.id === rowId) return flat === 0;
                    flat++;
                }
            }
            return false;
        })();

        return (
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-200 z-[50] ${isBlockSelected ? 'opacity-100' : 'opacity-0 group-hover/block:opacity-100'
                }`}>
                {/* Block border */}
                <div className={`absolute inset-0 border-[2px] rounded-[4px] pointer-events-none ${isBlockSelected ? 'border-[#4b5b75]' : 'border-[#4b5b75]/60'
                    }`} />

                {/* Right 3-dot button */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 -right-[44px] text-white rounded-[12px] w-[36px] h-[36px] flex items-center justify-center pointer-events-auto cursor-pointer shadow-md hover:scale-105 transition-transform bg-[#4b5b75] z-[50]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Hitbox bridge */}
                    <div className="absolute inset-y-0 right-0 left-[-12px] top-0 h-[37px] pointer-events-auto z-[60]" />
                    <div className="flex gap-[3px]">
                        <div className="w-[4px] h-[4px] rounded-full bg-white" />
                        <div className="w-[4px] h-[4px] rounded-full bg-white" />
                        <div className="w-[4px] h-[4px] rounded-full bg-white" />
                    </div>
                </div>

                {/* Drag pill */}
                <div
                    className={`absolute ${isTopRow ? '-bottom-[28px]' : '-top-[32px]'
                        } left-[16px] text-white rounded-[12px] w-[36px] h-[24px] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing shadow-md hover:scale-105 transition-all bg-[#4b5b75] z-[50]`}
                    onClick={(e) => e.stopPropagation()}
                    draggable
                    onDragStart={(e) => {
                        e.stopPropagation();
                        e.dataTransfer.effectAllowed = 'move';
                        const img = new window.Image();
                        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                        e.dataTransfer.setDragImage(img, 0, 0);
                        setDraggingTool({ icon: 'drag_indicator', type: 'move_block', id: boxId });
                    }}
                    onDragEnd={() => setDraggingTool(null)}
                >
                    <div className={`absolute inset-x-0 ${isTopRow ? 'top-[-8px] h-[30px]' : 'top-0 h-[32px]'
                        } pointer-events-auto z-[60]`} />
                    <span className="material-symbols-outlined text-[18px] rotate-90">drag_indicator</span>
                </div>
            </div>
        );
    };


    const renderBoxContent = (state: string, boxId: string, structureId: string, backdropId: string) => {
        const isSelected = selectedBoxId === boxId;
        const isContainerSelected = isSelected && selectedLayer === 'container';
        const isBlockSelected = isSelected && selectedLayer === 'block';

        const handleBlockSelection = (e: React.MouseEvent) => {
            e.stopPropagation();
            setSelectedBoxId(boxId);
            setSelectedLayer('block');
            setSelectedBackdropRowId(null);
        };

        if (state === 'image') {
            return (
                <div
                    className={`structure-container w-full relative border-[2px] rounded-[4px] bg-[#f9fafb] flex items-center justify-center group/container cursor-default min-h-[120px] ${isContainerSelected ? 'border-blue-500' : isSelected ? 'border-blue-300' : 'border-transparent'
                        } ${isSelected ? 'z-[20]' : 'z-[1]'}`}
                    onClick={(e) => { e.stopPropagation(); setSelectedBoxId(boxId); setSelectedLayer('container'); setSelectedBackdropRowId(null); }}
                >
                    <div className="w-full h-full flex items-center justify-center group/block relative" onClick={handleBlockSelection}>
                        <span className="material-symbols-outlined text-[24px] text-gray-400 pointer-events-none">image</span>
                        {renderBlockOverlay(boxId, structureId)}
                    </div>
                    {renderContainerOverlay(boxId, structureId, backdropId)}
                </div>
            );
        }

        if (state === 'text') {
            return (
                <div
                    className={`structure-container w-full relative border-[2px] rounded-[4px] bg-white group/container flex flex-col cursor-default ${isContainerSelected ? 'border-blue-500' : isSelected ? 'border-blue-300' : 'border-transparent'
                        } ${isSelected ? 'z-[20]' : 'z-[1]'}`}
                    onClick={(e) => { e.stopPropagation(); setSelectedBoxId(boxId); setSelectedLayer('container'); setSelectedBackdropRowId(null); }}
                >
                    <div className="flex-1 p-3 w-full cursor-default group/block relative">
                        <RichTextEditor
                            key={boxId}
                            boxId={boxId}
                            isSelected={isBlockSelected}
                            boxProperties={activeBlockNode?.properties || {}}
                            onEditorFocus={(editor: any) => {
                                setActiveEditor(editor);
                                setSelectedBoxId(boxId);
                                setSelectedLayer('block');
                                setSelectedBackdropRowId(null);
                            }}
                            onEditorBlur={(editor: any) => {
                                updateBlockProperty(boxId, 'content', editor.getHTML());
                            }}
                            onTransaction={(editor: any) => {
                                if (activeEditor === editor) setEditorUpdateTicker(t => t + 1);
                            }}
                        />
                        {renderBlockOverlay(boxId, structureId)}
                    </div>
                    {renderContainerOverlay(boxId, structureId, backdropId)}
                </div>
            );
        }

        if (state === 'button') {
            return (
                <div
                    className={`structure-container w-full py-5 relative border-[2px] rounded-[4px] bg-white flex items-center justify-center group/container cursor-default ${isContainerSelected ? 'border-blue-500' : isSelected ? 'border-blue-300' : 'border-transparent'
                        } ${isSelected ? 'z-[20]' : 'z-[1]'}`}
                    onClick={(e) => { e.stopPropagation(); setSelectedBoxId(boxId); setSelectedLayer('container'); setSelectedBackdropRowId(null); }}
                >
                    <div className="px-8 py-2 w-full flex justify-center cursor-default group/block relative" onClick={handleBlockSelection}>
                        <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-2.5 rounded-[12px] font-medium text-[15px] transition-colors border shadow-sm pointer-events-none">
                            Button
                        </button>
                        {renderBlockOverlay(boxId, structureId)}
                    </div>
                    {renderContainerOverlay(boxId, structureId, backdropId)}
                </div>
            );
        }

        const isDragOver = draggedOverBox === boxId;

        // Default empty state
        return (
            <div
                className={`structure-container w-full min-h-[120px] group border-[2px] rounded-[4px] flex flex-col items-center justify-center cursor-default relative transition-all duration-300 flex-1 ${isSelected ? 'border-solid border-blue-500 bg-blue-50/50 text-blue-500/90' : (isDragOver ? 'border-solid border-blue-400 bg-blue-50 dark:bg-blue-900/40 text-blue-500' : 'border-dashed border-blue-400/20 bg-[#f0f7ff] dark:bg-blue-900/10 text-blue-400')} ${isSelected ? 'z-[20]' : 'z-[1]'}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBoxId(boxId);
                    setSelectedLayer('container');
                    setSelectedBackdropRowId(null);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.types.includes('application/tool-type')) {
                        e.dataTransfer.dropEffect = 'copy';
                        if (draggedOverBox !== boxId) setDraggedOverBox(boxId);
                    }
                }}
                onDragLeave={() => {
                    setDraggedOverBox(null);
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Prevent bubbling to canvas layout drop
                    setDraggedOverBox(null);

                    // Handle block swap from drag pill
                    if (draggingTool?.type === 'move_block' && draggingTool.id) {
                        swapBlocks(draggingTool.id, boxId);
                        setSelectedBoxId(boxId);
                        setSelectedLayer('block');
                        return;
                    }

                    // Handle sidebar tool drop
                    const toolType = e.dataTransfer.getData('application/tool-type');
                    if (toolType === 'image' || toolType === 'text' || toolType === 'button') {
                        setBlockType(boxId, toolType);
                        setSelectedBoxId(boxId);
                        setSelectedLayer('block');
                    }
                }}
            >
                {isDragOver ? (
                    <div className="bg-[#333] text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md whitespace-nowrap pointer-events-none z-[65]">
                        Drop here
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center gap-[2px] transition-transform duration-300 group-hover:-translate-y-3">
                            <span className="material-symbols-outlined text-[20px] opacity-70">file_download</span>
                            <span className="text-[13px] font-medium opacity-80">Drop content here</span>
                        </div>
                        <div className="absolute bottom-[20px] pointer-events-none group-hover:pointer-events-auto left-0 right-0 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="material-symbols-outlined text-[18px] hover:text-blue-600 transition-all cursor-pointer" onClick={(e) => handleBoxClick(boxId, 'image', e)}>image</span>
                            <span className="material-symbols-outlined text-[18px] hover:text-blue-600 transition-all cursor-pointer" onClick={(e) => handleBoxClick(boxId, 'text', e)}>title</span>
                            <span className="material-symbols-outlined text-[18px] hover:text-blue-600 transition-all cursor-pointer" onClick={(e) => handleBoxClick(boxId, 'button', e)}>smart_button</span>
                        </div>
                    </>
                )}
            </div>
        );
    };



    // --- Tool strip chevron scroll logic (mirrors sidebar pattern) ---
    const toolScrollRef = useRef<HTMLDivElement>(null);
    const toolScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [canToolScrollUp, setCanToolScrollUp] = useState(false);
    const [canToolScrollDown, setCanToolScrollDown] = useState(false);

    useEffect(() => {
        const el = toolScrollRef.current;
        if (!el) return;
        const checkScroll = () => {
            setCanToolScrollUp(el.scrollTop > 0);
            setCanToolScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
        };
        checkScroll();
        el.addEventListener('scroll', checkScroll);
        const observer = new ResizeObserver(() => checkScroll());
        observer.observe(el);
        return () => {
            el.removeEventListener('scroll', checkScroll);
            observer.disconnect();
        };
    }, []);

    const startToolScrolling = useCallback((direction: 'up' | 'down') => {
        const el = toolScrollRef.current;
        if (!el) return;
        if (toolScrollIntervalRef.current) clearInterval(toolScrollIntervalRef.current);
        toolScrollIntervalRef.current = setInterval(() => {
            el.scrollTop += direction === 'up' ? -5 : 5;
        }, 10);
    }, []);

    const stopToolScrolling = useCallback(() => {
        if (toolScrollIntervalRef.current) {
            clearInterval(toolScrollIntervalRef.current);
            toolScrollIntervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => { if (toolScrollIntervalRef.current) clearInterval(toolScrollIntervalRef.current); };
    }, []);

    const handleDragStart = (e: React.MouseEvent) => {
        e.preventDefault();
        const startY = e.clientY;
        const startHeight = editorHeight;

        // We declare this first so handleDrag can call it
        const cleanupListeners = () => {
            // Because handleDragEnd might not be in scope, we isolate the removal
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
            document.body.style.cursor = 'default';
        };

        let currentHeight = startHeight;

        const handleDrag = (dragEvent: MouseEvent) => {
            const delta = startY - dragEvent.clientY;
            currentHeight = startHeight + delta;

            // Allow dragging down visually without closing instantly
            const newHeight = Math.min(500, Math.max(10, currentHeight));
            setEditorHeight(newHeight);
        };

        const handleDragEnd = () => {
            cleanupListeners();
            // Close ONLY on drop if dropped below ~20% threshold
            if (currentHeight < Math.max(150, window.innerHeight * 0.20)) {
                setIsCodeEditorOpen(false);
                setTimeout(() => setEditorHeight(320), 300); // Reset after closing animation finishes
            } else if (currentHeight < 200) {
                setEditorHeight(200); // Snap back if dropped just a bit too low
            }
        };

        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', handleDragEnd);
        document.body.style.cursor = 'row-resize';
    };

    return (
        <div
            className="fixed inset-0 z-[40] h-full w-full flex flex-col overflow-hidden bg-[#f3f4f6] dark:bg-background"
        >
            {/* Header Area */}
            <header className="h-[56px] border-b px-3 flex items-center justify-between bg-white dark:bg-background z-10 relative">
                <TooltipProvider delayDuration={0}>
                    {/* Left Section: Logo, Back, Title Pill */}
                    <div className="flex items-center gap-3">
                        {/* Brand Logo & Sidebar Dropdown Navigation */}
                        <DropdownMenu onOpenChange={setIsMenuOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-0 p-[2px] pr-0 hover:bg-accent/10 rounded-md h-auto focus-visible:ring-0 focus-visible:ring-offset-0">
                                    <Image
                                        src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png"
                                        alt="Scalerbox Logo"
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                    <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="start" className="w-auto min-w-[190px] mt-1 bg-white dark:bg-background border border-border shadow-xl rounded-xl z-[200]">
                                <DropdownMenuItem onClick={() => router.push('/home')} className="cursor-pointer">
                                    <Home className="w-4 h-4 mr-2" /> Home
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="cursor-pointer">
                                        <AreaChart className="w-4 h-4 mr-2" />
                                        <span>SaaS Overview</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem onClick={() => router.push('/saas-dashboard')} className="cursor-pointer"><AreaChart className="w-4 h-4 mr-2" /> SaaS Dashboard</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push('/revenue-dashboard')} className="cursor-pointer"><RevenueIcon size={16} /> <span className="ml-2">Revenue Dashboard</span></DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push('/user-dashboard')} className="cursor-pointer"><TrendingUp className="w-4 h-4 mr-2" /> User Dashboard</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push('/product-dashboard')} className="cursor-pointer"><Activity className="w-4 h-4 mr-2" /> Product Dashboard</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push('/customer-dashboard')} className="cursor-pointer"><Users className="w-4 h-4 mr-2" /> Customer Dashboard</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push('/integrations')} className="cursor-pointer"><Package className="w-4 h-4 mr-2" /> Integrations</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>

                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="cursor-pointer">
                                        <Mail className="w-4 h-4 mr-2" />
                                        <span>Email Marketing</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem onClick={() => router.push('/email-marketing/dashboard')} className="cursor-pointer"><LayoutDashboard className="w-4 h-4 mr-2" /> Email Dashboard</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push('/email-marketing/campaigns')} className="cursor-pointer"><Megaphone className="w-4 h-4 mr-2" /> Campaigns</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push('/email-marketing/templates')} className="cursor-pointer"><LayoutTemplate className="w-4 h-4 mr-2" /> Templates</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push('/email-marketing/lists')} className="cursor-pointer"><List className="w-4 h-4 mr-2" /> Lists</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push('/email-marketing/domains')} className="cursor-pointer"><DomainIcon size={16} /> <span className="ml-2">Domains</span></DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>

                                <DropdownMenuItem onClick={() => router.push('/team')} className="cursor-pointer">
                                    <Users className="w-4 h-4 mr-2" /> Team
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Back Icon */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-[36px] w-[36px] rounded-full text-muted-foreground hover:text-foreground pr-0.5"
                                    onClick={() => router.back()}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Back</TooltipContent>
                        </Tooltip>

                        {/* Title Pill Input */}
                        <div className={`flex items-center bg-gray-100 dark:bg-accent/50 hover:bg-gray-200 dark:hover:bg-accent/70 transition-colors rounded-full pl-4 pr-1 h-[36px] cursor-text w-[180px] ${!title.trim() ? "border-2 border-red-500 dark:border-red-500" : "border border-transparent dark:border-border"}`}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <textarea
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Give title..."
                                        rows={1}
                                        className="bg-transparent border-none outline-none text-[14px] text-gray-700 dark:text-foreground font-medium w-full placeholder:text-muted-foreground/60 placeholder:font-normal resize-none overflow-hidden h-5 pt-[1px]"
                                    />
                                </TooltipTrigger>
                                <TooltipContent>Give title</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className="p-1 hover:bg-gray-300 dark:hover:bg-accent rounded-full cursor-pointer transition-colors ml-1"
                                        onClick={() => setTitle('')}
                                    >
                                        <Trash2 className="w-4 h-4 text-gray-500 dark:text-muted-foreground" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>Delete title</TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Cloud Save Split Button */}
                        <div className="flex items-center bg-white dark:bg-background border rounded-full shadow-sm h-[36px] overflow-hidden ml-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" className="h-full px-3.5 rounded-none border-r hover:bg-gray-50 dark:hover:bg-accent text-gray-600 dark:text-muted-foreground focus-visible:ring-0">
                                        <CloudUpload className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Save changes</TooltipContent>
                            </Tooltip>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-full w-9 rounded-none hover:bg-gray-50 dark:hover:bg-accent text-gray-600 dark:text-muted-foreground focus-visible:ring-0">
                                        <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[240px] shadow-xl rounded-xl z-[200] mt-1">
                                    <DropdownMenuItem className="cursor-pointer py-2.5 text-[14px]">Save email message and exit</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer py-2.5 text-[14px]">Save as new email</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer py-2.5 text-[14px]">Save as new template</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer py-2.5 text-[14px]">Close the Editor</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* History Group */}
                        <div className="flex items-center bg-white dark:bg-background border rounded-full shadow-sm h-[36px] overflow-hidden ml-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`h-full w-10 flex-shrink-0 rounded-none border-r transition-colors ${historyIndex > 0 ? 'hover:bg-gray-50 dark:hover:bg-accent text-gray-700 dark:text-foreground cursor-pointer' : 'text-gray-400 dark:text-muted/50 pointer-events-none opacity-60'}`}
                                        onClick={handleUndo}
                                    >
                                        <Undo className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Undo</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-full w-10 flex-shrink-0 rounded-none border-r hover:bg-gray-50 dark:hover:bg-accent text-gray-400 dark:text-muted/50 pointer-events-none opacity-60">
                                        <History className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Timeline</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`h-full w-10 flex-shrink-0 rounded-none transition-colors ${historyIndex < history.length - 1 ? 'hover:bg-gray-50 dark:hover:bg-accent text-gray-700 dark:text-foreground cursor-pointer' : 'text-gray-400 dark:text-muted/50 pointer-events-none opacity-60'}`}
                                        onClick={handleRedo}
                                    >
                                        <Redo className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Redo</TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Code Icon (Moved) */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={() => setIsCodeEditorOpen(!isCodeEditorOpen)} variant="outline" size="icon" className="h-[36px] w-[36px] rounded-full shadow-sm text-gray-600 dark:text-muted-foreground bg-white dark:bg-background ml-1">
                                    <Code className="w-[18px] h-[18px]" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Code</TooltipContent>
                        </Tooltip>

                        {/* Device Toggle Group (Moved) */}
                        <div className="flex items-center bg-white dark:bg-background border rounded-full shadow-sm h-[36px] overflow-hidden ml-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-full w-12 rounded-none border-r hover:bg-gray-50 dark:hover:bg-accent relative bg-green-50 dark:bg-green-900/20">
                                        <Monitor className="w-[18px] h-[18px] text-[#22c55e]" />
                                        <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-[#22c55e] border-2 border-white dark:border-background rounded-full" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Desktop View</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-full w-10 rounded-none border-r hover:bg-gray-50 dark:hover:bg-accent text-gray-500 dark:text-muted-foreground">
                                        <Smartphone className="w-[18px] h-[18px]" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Mobile View</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-full w-8 rounded-none hover:bg-gray-50 dark:hover:bg-accent text-gray-500 dark:text-muted-foreground">
                                        <ChevronDown className="w-[14px] h-[14px]" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Device Options</TooltipContent>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Right Section: Actions, Export */}
                    <div className="flex items-center gap-3">
                        {/* Tools Area */}
                        <div className="flex items-center gap-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-[36px] w-[36px] rounded-full shadow-sm text-gray-600 dark:text-muted-foreground bg-white dark:bg-background">
                                        <MonitorSmartphone className="w-[18px] h-[18px]" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Preview Mode</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-[36px] w-[36px] rounded-full shadow-sm text-gray-600 dark:text-muted-foreground bg-white dark:bg-background">
                                        <ClipboardCheck className="w-[18px] h-[18px]" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Test / Verify</TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Export */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="h-[36px] bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium border-0 shadow-sm rounded-full px-5 transition-colors">
                                    <Upload className="w-[18px] h-[18px] mr-2" />
                                    Export
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Export Design</TooltipContent>
                        </Tooltip>

                        {/* Share */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" className="h-[36px] w-[36px] rounded-full shadow-sm text-gray-600 dark:text-muted-foreground bg-white dark:bg-background">
                                    <Share2 className="w-[18px] h-[18px]" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Share</TooltipContent>
                        </Tooltip>

                        {/* User Profile */}
                        <DropdownMenu>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                        <div className="h-[36px] w-[36px] rounded-full overflow-hidden cursor-pointer border-[1.5px] border-transparent hover:border-gray-200 transition-all shadow-sm">
                                            <Image
                                                src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/a86f1e84-18fa-4e73-b230-cbcfda5b201f.jpg"
                                                alt="User Profile"
                                                width={36}
                                                height={36}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent>Profile</TooltipContent>
                            </Tooltip>
                            <DropdownMenuContent align="end" className="w-56 mt-2 bg-white dark:bg-background border shadow-xl rounded-xl z-[200]">
                                <DropdownMenuItem onClick={() => router.push('/team')} className="cursor-pointer py-2">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-accent flex items-center justify-center mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor" className="text-gray-500">
                                                <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-593-87q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">Add Member</span>
                                            <span className="text-[11px] text-muted-foreground">Invite to workspace</span>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                                <div className="h-[1px] bg-gray-100 dark:bg-border my-1"></div>
                                <DropdownMenuItem onClick={() => router.push('/settings/profile')} className="cursor-pointer">
                                    <Settings className="w-4 h-4 mr-2" /> Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push('/logout')} className="cursor-pointer text-red-500 focus:text-red-500">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </TooltipProvider>
            </header>

            <div
                className="flex-1 overflow-hidden relative w-full h-full flex"
                style={{ backgroundColor: globalStyles.displayBackground }}
            >

                {/* Sidebar Toolbar Area */}
                <div className={`${structuresPanelPosition === 'right' ? 'absolute right-[9px] top-0 h-full z-30' : 'relative'} w-[72px] h-full flex-shrink-0 flex flex-col items-center pt-[20px] pb-4 z-30`}>

                    {/* Combined Toolbar Area (for ghost and drag boundary) */}
                    <div id="left-toolbar-container" className="w-[60px] h-full flex flex-col items-center gap-4 relative">
                        {isDraggingStructures && !draggingTool && (
                            <div className="absolute top-0 bottom-0 left-0 right-0 border-2 border-dashed border-primary rounded-t-[16px] rounded-b-[20px] pointer-events-none z-50"></div>
                        )}

                        {/* Top Group: Structures & Modules — z-30 so it sits ON TOP of the panel */}
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div onClick={toggleStructuresPanel} className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] aspect-square bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[16px] shadow-sm flex flex-col items-center justify-center cursor-pointer text-gray-600 dark:text-muted-foreground relative z-40">
                                        {/* 6-dot drag grip: pushed to top and bigger */}
                                        <div
                                            className="absolute top-[4px] w-full flex justify-center cursor-move"
                                            draggable
                                            onDragStart={(e) => {
                                                e.stopPropagation();
                                                wasDraggingRef.current = true;
                                                e.dataTransfer.setData('text/plain', 'structures-panel');
                                                e.dataTransfer.effectAllowed = 'move';

                                                const container = document.getElementById('left-toolbar-container');
                                                if (container) {
                                                    e.dataTransfer.setDragImage(container, 30, 30);
                                                }
                                                setTimeout(() => setIsDraggingStructures(true), 0);
                                            }}
                                            onDragEnd={() => {
                                                setIsDraggingStructures(false);
                                                setIsDragOverRight(false);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <span className="material-symbols-outlined text-[10px] text-gray-400/60 rotate-90 scale-x-[-1]">drag_indicator</span>
                                        </div>
                                        {/* Icon enlarged by 1.5x (32px -> 48px) and pushed slightly down to clear dots */}
                                        <span className="material-symbols-outlined text-[56px] mt-2">view_quilt</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side={structuresPanelPosition === 'right' ? 'left' : 'right'}>Structures & Modules</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        {/* Main Tools Container — no scrollbar, chevron hover indicators */}
                        <div className="flex-1 w-[60px] bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[20px] shadow-sm overflow-hidden flex flex-col relative group/tool-scroll">
                            {/* Chevron Up */}
                            <div
                                className={`absolute top-1 left-1/2 -translate-x-1/2 z-10 w-8 h-8 flex items-center justify-center transition-opacity bg-white dark:bg-background rounded-full cursor-pointer shadow-md border-[2px] border-gray-200 dark:border-border ${canToolScrollUp ? 'opacity-0 group-hover/tool-scroll:opacity-100' : 'opacity-0 pointer-events-none'}`}
                                onMouseEnter={() => startToolScrolling('up')}
                                onMouseLeave={stopToolScrolling}
                            >
                                <ChevronUp className="w-4 h-4 text-gray-500" />
                            </div>

                            <div ref={toolScrollRef} className="w-full flex-1 flex flex-col items-center p-1.5 gap-2 pb-1.5 overflow-y-auto no-scrollbar">
                                <TooltipProvider delayDuration={0}>
                                    {[
                                        { icon: "image", tooltip: "Image" },
                                        { icon: "title", tooltip: "Text" },
                                        { icon: "smart_button", tooltip: "Button" },
                                        { icon: "height", tooltip: "Spacer" },
                                        { icon: "share", tooltip: "Social Networks" },
                                        { icon: "view_headline", tooltip: "Menu" },
                                        { icon: "code", tooltip: "HTML" },
                                        { icon: "filter_none", tooltip: "Banner" },
                                        { icon: "theaters", tooltip: "Video" },
                                        { icon: "timer", tooltip: "Timer" },
                                        { icon: "view_carousel", tooltip: "Carousel" },
                                        { icon: "expand_all", tooltip: "AMP Accordion" },
                                        { icon: "dynamic_form", tooltip: "AMP Form" }
                                    ].map((tool, index) => (
                                        <Tooltip key={index}>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className="w-12 h-12 aspect-square bg-white dark:bg-background border-[2px] border-gray-200 dark:border-white/10 hover:border-primary rounded-[16px] flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-gray-50 dark:hover:bg-accent transition-all text-gray-500 dark:text-muted-foreground"
                                                    draggable
                                                    onDragStart={(e) => {
                                                        const keyMap: Record<string, string> = {
                                                            'image': 'image',
                                                            'title': 'text',
                                                            'smart_button': 'button'
                                                        };
                                                        e.dataTransfer.setData('application/tool-type', keyMap[tool.icon] || tool.icon);
                                                        e.dataTransfer.effectAllowed = 'copyMove';

                                                        // Replace native semi-transparent ghost with a 1x1 transparent image
                                                        const img = new window.Image();
                                                        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                                                        e.dataTransfer.setDragImage(img, 0, 0);

                                                        // Start manual coordinate tracking
                                                        setDraggingTool({ icon: tool.icon });
                                                    }}
                                                    onDragEnd={() => {
                                                        setDraggingTool(null);
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined text-[24px] leading-none select-none pointer-events-none">{tool.icon}</span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side={structuresPanelPosition === 'right' ? 'left' : 'right'} className="z-[200]">{tool.tooltip}</TooltipContent>
                                        </Tooltip>
                                    ))}
                                </TooltipProvider>
                            </div>

                            {/* Chevron Down */}
                            <div
                                className={`absolute bottom-1 left-1/2 -translate-x-1/2 z-10 w-8 h-8 flex items-center justify-center transition-opacity bg-white dark:bg-background rounded-full cursor-pointer shadow-md border-[2px] border-gray-200 dark:border-border ${canToolScrollDown ? 'opacity-0 group-hover/tool-scroll:opacity-100' : 'opacity-0 pointer-events-none'}`}
                                onMouseEnter={() => startToolScrolling('down')}
                                onMouseLeave={stopToolScrolling}
                            >
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Structures & Modules Floating Panel — Circular Reveal Animation */}
                {(isStructuresPanelOpen || isStructuresPanelClosing) && (
                    <div
                        ref={structuresPanelRef}
                        className={`absolute ${structuresPanelPosition === 'right' ? 'right-[6px]' : 'left-[6px]'} top-[6px] w-[480px] z-[110] ${isStructuresPanelClosing ? 'structures-panel-close' : 'structures-panel-open'} ease-[cubic-bezier(0.25,0.1,0.25,1)] pointer-events-none`}
                        style={{ height: 'calc(100% - 12px)' }}
                    >
                        {/* Stacking Effects Behind the Panel */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[94%] h-4 bg-white/60 dark:bg-white/10 rounded-b-[24px] pointer-events-none -z-10 shadow-sm border border-gray-200/40 dark:border-white/10 opacity-90" />
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[88%] h-4 bg-white/30 dark:bg-white/5 rounded-b-[24px] pointer-events-none -z-20 shadow-sm border border-gray-100/20 dark:border-white/5 opacity-70" />

                        <div className="h-full w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[24px] shadow-xl flex flex-col overflow-hidden pointer-events-auto relative">
                            {/* Gradient Animation Style */}
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                @keyframes gradient-move {
                                    0% { background-position: 0% 50%; }
                                    50% { background-position: 100% 50%; }
                                    100% { background-position: 0% 50%; }
                                }
                                .animated-gradient-text {
                                    background: linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6, #10b981);
                                    background-size: 200% auto;
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    animation: gradient-move 3s linear infinite;
                                    font-weight: 800;
                                }
                                
                                /* Emoji Picker Customization */
                                .epr-main {
                                    border: none !important;
                                    box-shadow: none !important;
                                    background: white !important;
                                    border-radius: 20px !important;
                                    display: flex !important;
                                    flex-direction: row-reverse !important;
                                    --epr-bg-color: #fff !important;
                                    --epr-category-label-bg-color: #fff !important;
                                    --epr-highlight-color: #10b981 !important;
                                    --epr-search-input-bg-color: #f1f5f9 !important;
                                    --epr-header-padding: 20px 20px 10px 20px !important;
                                }
                                .epr-category-nav {
                                    flex-direction: column !important;
                                    width: 52px !important;
                                    padding: 15px 0 !important;
                                    border-right: 1px solid #f1f5f9 !important;
                                    height: 100% !important;
                                    overflow-y: auto !important;
                                    gap: 12px !important;
                                }
                                .epr-header {
                                    flex: 1 !important;
                                }
                                .epr-body {
                                    flex: 1 !important;
                                }
                                .epr-search-container {
                                    padding: 0 10px 10px 0 !important;
                                }
                                .epr-search {
                                    border-radius: 12px !important;
                                    border: none !important;
                                    font-weight: 500 !important;
                                    padding: 12px 16px !important;
                                }
                                .epr-emoji-category-label {
                                    font-size: 13px !important;
                                    font-weight: 700 !important;
                                    color: #94a3b8 !important;
                                    text-transform: none !important;
                                    padding-top: 20px !important;
                                    height: auto !important;
                                }
                                .epr-body::-webkit-scrollbar {
                                    width: 6px !important;
                                }
                                .epr-body::-webkit-scrollbar-thumb {
                                    background: #e2e8f0 !important;
                                    border-radius: 10px !important;
                                }
                            `}} />

                            {/* Panel Header with Close + Tabs */}
                            <div className="flex items-center h-[60px] px-4 flex-shrink-0 gap-3">
                                {/* Close Button */}
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div
                                                onClick={handleCloseStructuresPanel}
                                                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-accent transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                                            >
                                                <X className="w-5 h-5" strokeWidth={2.5} />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>Close</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                {/* Tab Icons — 3 tabs in a pill */}
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="w-full flex items-center bg-[#f1f5f9] dark:bg-accent/40 rounded-full p-[4px] h-[48px] shadow-inner">
                                        <TooltipProvider delayDuration={0}>
                                            {/* Tab 1: Layouts */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        onClick={() => setStructuresTab('general')}
                                                        className={`h-[40px] flex-1 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${structuresTab === 'general' ? 'bg-white dark:bg-background shadow-sm text-gray-700 dark:text-foreground' : 'text-gray-400 dark:text-muted-foreground hover:text-gray-600 dark:hover:text-gray-300'}`}
                                                    >
                                                        <LayoutIcon size={20} />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>Layouts</TooltipContent>
                                            </Tooltip>

                                            {/* Tab 2: Structures */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        onClick={() => setStructuresTab('current-layout')}
                                                        className={`h-[40px] flex-1 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${structuresTab === 'current-layout' ? 'bg-white dark:bg-background shadow-sm text-gray-700 dark:text-foreground' : 'text-gray-400 dark:text-muted-foreground hover:text-gray-600 dark:hover:text-gray-300'}`}
                                                    >
                                                        <span className="material-symbols-outlined text-[22px]">view_array</span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>Structures</TooltipContent>
                                            </Tooltip>

                                            {/* Tab 3: My Modules */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        onClick={() => setStructuresTab('my-modules')}
                                                        className={`h-[40px] flex-1 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${structuresTab === 'my-modules' ? 'bg-white dark:bg-background shadow-sm text-gray-700 dark:text-foreground' : 'text-gray-400 dark:text-muted-foreground hover:text-gray-600 dark:hover:text-gray-300'}`}
                                                    >
                                                        <span className="material-symbols-outlined text-[22px]">person</span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>My Modules</TooltipContent>
                                            </Tooltip>

                                            {/* Tab 4: Template Modules */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        className="h-[40px] flex-1 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 text-gray-400 dark:text-muted-foreground hover:text-gray-600 dark:hover:text-gray-300"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="currentColor">
                                                            <path d="M240-320h280v-120H240v120Zm360 0h120v-320H600v320ZM240-520h280v-120H240v120Zm-80 360q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
                                                        </svg>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>Template Modules</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </div>

                            {/* Panel Content */}
                            <div className="flex-1 overflow-y-auto p-4 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-2 [&::-webkit-scrollbar-thumb]:rounded-full">

                                {/* General Tab — Layout Structures */}
                                {structuresTab === 'general' && (
                                    <div className="space-y-4 animate-in fade-in duration-200">
                                        <p className="text-[12px] text-gray-400 dark:text-muted-foreground font-medium uppercase tracking-wider px-1">Structures</p>
                                        <div className="flex flex-col gap-2">
                                            {/* 1. 1 Column */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 2. 2 Columns */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 3. 3 Columns */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 1, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 4. 4 Columns */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 1, 1, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 5. 5 Columns */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 1, 1, 1, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 6. 6 Columns */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 1, 1, 1, 1, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 7. 7 Columns */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 1, 1, 1, 1, 1, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                {[...Array(7)].map((_, i) => <div key={i} className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>)}
                                            </div>

                                            {/* 8. 8 Columns */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 1, 1, 1, 1, 1, 1, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                {[...Array(8)].map((_, i) => <div key={i} className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>)}
                                            </div>

                                            {/* 9. 9 Columns */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 1, 1, 1, 1, 1, 1, 1, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                {[...Array(9)].map((_, i) => <div key={i} className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>)}
                                            </div>

                                            {/* 10. 10 Columns */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                {[...Array(10)].map((_, i) => <div key={i} className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>)}
                                            </div>

                                            {/* 11. Left Heavy (1:2) */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 2])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="w-[33%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 12. Right Heavy (2:1) */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [2, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="w-[33%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 13. Center Heavy (1:2:1) */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 2, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="w-[20%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="w-[20%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 14. Left Heavy Double (2:1:1) */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [2, 1, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="w-[25%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="w-[25%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 11. Left/Right Sidebar (1:4:1) */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 4, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="w-[16%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="w-[16%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 12. Right Heavy Double (1:1:2) */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 1, 2])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="w-[25%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="w-[25%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 13. Heavy Middle (2:3:2) */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [2, 3, 2])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="w-[28%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="w-[28%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 14. 4-Column Asymmetric (1:2:2:1) */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 2, 2, 1])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="w-[16%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="w-[16%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>

                                            {/* 15. Splits (1:1:1:3) */}
                                            <div draggable onDragStart={(e) => handleLayoutDragStart(e, [1, 1, 1, 3])} onDragEnd={() => { setIsDraggingStructures(false); setDraggingTool(null); }} className="w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[14px] p-2.5 cursor-grab hover:border-primary hover:shadow-md transition-colors h-[54px] shadow-sm flex gap-2">
                                                <div className="w-[16%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="w-[16%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="w-[16%] h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                                <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 dark:border-blue-500/30 bg-[#f0f7ff] dark:bg-blue-900/10 rounded-[6px]"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Current Layout Tab */}
                                {structuresTab === 'current-layout' && (
                                    <div className="space-y-3 animate-in fade-in duration-200">
                                        <p className="text-[12px] text-gray-400 dark:text-muted-foreground font-medium uppercase tracking-wider px-1">Current Layout</p>
                                        {/* Structure tree representation */}
                                        <div className="space-y-2">
                                            {[
                                                { label: 'Row 1', cols: '30% / 70%', icon: 'table_rows' },
                                                { label: 'Row 2', cols: '30% / 70%', icon: 'table_rows' },
                                                { label: 'Row 3', cols: '100%', icon: 'table_rows' },
                                                { label: 'Row 4', cols: '8 × equal', icon: 'table_rows' },
                                                { label: 'Row 5', cols: '50% / 50%', icon: 'table_rows' },
                                            ].map((row, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 bg-[#f8fafc] dark:bg-accent/20 rounded-xl border border-gray-100 dark:border-border hover:border-primary/30 cursor-pointer transition-colors group">
                                                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary/40">
                                                        <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-primary">{row.icon}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[13px] font-medium text-gray-600 dark:text-foreground/80">{row.label}</p>
                                                        <p className="text-[11px] text-gray-400 dark:text-muted-foreground">{row.cols}</p>
                                                    </div>
                                                    <span className="material-symbols-outlined text-[16px] text-gray-300 dark:text-white/20 group-hover:text-gray-400">drag_indicator</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* My Modules Tab */}
                                {structuresTab === 'my-modules' && (
                                    <div className="space-y-4 animate-in fade-in duration-200">
                                        <p className="text-[12px] text-gray-400 dark:text-muted-foreground font-medium uppercase tracking-wider px-1">My Modules</p>
                                        {/* Empty state */}
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <div className="w-16 h-16 rounded-full bg-[#f1f5f9] dark:bg-accent/30 flex items-center justify-center mb-4">
                                                <span className="material-symbols-outlined text-[28px] text-gray-300 dark:text-white/20">inventory_2</span>
                                            </div>
                                            <p className="text-[14px] font-medium text-gray-500 dark:text-foreground/70 mb-1">No saved modules yet</p>
                                            <p className="text-[12px] text-gray-400 dark:text-muted-foreground max-w-[200px] leading-relaxed">Save a section from your email to reuse it across designs</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Editor Canvas Area */}
                <div
                    ref={canvasScrollRef}
                    className={`flex-1 relative flex flex-col pt-0 pb-6 ${structuresPanelPosition === 'right' ? 'pr-[90px] pl-[384px]' : 'pl-6 pr-[384px]'} overflow-y-auto h-full items-center [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full`}
                    style={{ backgroundColor: globalStyles.displayBackground }}
                    onClick={() => { setSelectedBoxId(null); setSelectedBackdropRowId(null); }}
                >

                    {/* The Canvas Page Layout Block */}
                    <div
                        ref={canvasRef}
                        className={`w-full max-w-[620px] bg-white dark:bg-accent shadow-sm flex flex-col pt-[34px] pb-8 gap-6 relative`}
                        onClick={(e) => e.stopPropagation()}
                        onDragOver={(e) => {
                            const t = draggingTool?.type;
                            if (t === 'layout' || t === 'move_structure' || t === 'move_backdrop') {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = t === 'layout' ? 'copy' : 'move';

                                // Calculate nearest gap between flat structure rows
                                const canvas = canvasRef.current;
                                if (!canvas) return;
                                // BUG 1 FIX: Remove ':scope >' — structures are nested inside
                                // backdrop wrappers, not direct children of the canvas div.
                                const children = Array.from(canvas.querySelectorAll('[data-structure-row]'));
                                const mouseY = e.clientY;

                                if (children.length === 0) { setDropInsertIndex(0); return; }

                                let closestIndex = 0;
                                let closestDist = Infinity;

                                const firstRect = children[0].getBoundingClientRect();
                                const distToTop = Math.abs(mouseY - firstRect.top);
                                if (distToTop < closestDist) { closestDist = distToTop; closestIndex = 0; }

                                for (let i = 0; i < children.length - 1; i++) {
                                    const bottomOfCurrent = children[i].getBoundingClientRect().bottom;
                                    const topOfNext = children[i + 1].getBoundingClientRect().top;
                                    const gapCenter = (bottomOfCurrent + topOfNext) / 2;
                                    const dist = Math.abs(mouseY - gapCenter);
                                    if (dist < closestDist) { closestDist = dist; closestIndex = i + 1; }
                                }

                                const lastRect = children[children.length - 1].getBoundingClientRect();
                                if (Math.abs(mouseY - lastRect.bottom) < closestDist) { closestIndex = children.length; }

                                setDropInsertIndex(closestIndex);
                            }
                        }}
                        onDragLeave={(e) => {
                            if (!canvasRef.current?.contains(e.relatedTarget as Node)) {
                                setDropInsertIndex(null);
                            }
                        }}
                        onDrop={(e) => {
                            const t = draggingTool?.type;
                            if ((t === 'layout' || t === 'move_structure' || t === 'move_backdrop') && dropInsertIndex !== null) {
                                e.preventDefault();

                                if (t === 'move_backdrop' && draggingTool!.id) {
                                    // ─── Move entire Backdrop ───
                                    const draggedId = draggingTool!.id;
                                    const capturedIdx = dropInsertIndex;
                                    setEmailTree(prev => {
                                        const currentIndex = prev.findIndex(bd => bd.id === draggedId);
                                        if (currentIndex === -1) return prev;
                                        const draggedBd = prev[currentIndex];

                                        // Convert flat-structure index → backdrop index
                                        let count = 0;
                                        let targetBdIdx = prev.length;
                                        for (let i = 0; i < prev.length; i++) {
                                            if (count >= capturedIdx) { targetBdIdx = i; break; }
                                            count += prev[i].structures.length;
                                        }
                                        if (currentIndex < targetBdIdx) targetBdIdx -= 1;

                                        const cleaned = prev.filter(bd => bd.id !== draggedId);
                                        const next = [...cleaned];
                                        next.splice(Math.min(targetBdIdx, next.length), 0, draggedBd);
                                        return next;
                                    });

                                } else if (t === 'move_structure' && draggingTool!.id) {
                                    // ─── Move Structure ───
                                    // Inject into the TARGET backdrop (not a forced new wrapper)
                                    // so structures sharing a backdrop keep their background colors.
                                    const draggedId = draggingTool!.id;
                                    const capturedIdx = dropInsertIndex;
                                    setEmailTree(prev => {
                                        let draggedSt: StructureData | null = null;
                                        let oldFlatIndex = -1;
                                        let currentFlat = 0;

                                        // Extract structure, record original flat position
                                        const cleaned = prev.map(bd => {
                                            const stIdx = bd.structures.findIndex(s => s.id === draggedId);
                                            if (stIdx !== -1) {
                                                draggedSt = bd.structures[stIdx];
                                                oldFlatIndex = currentFlat + stIdx;
                                            }
                                            currentFlat += bd.structures.length;
                                            return { ...bd, structures: bd.structures.filter(s => s.id !== draggedId) };
                                        }).filter(bd => bd.structures.length > 0);

                                        if (!draggedSt) return prev;

                                        // 🛡️ Safety net: canvas emptied
                                        if (cleaned.length === 0) {
                                            return [{ id: `row-${Date.now()}`, backgroundColor: '', structures: [draggedSt] }];
                                        }

                                        // Offset by -1 when moving downward (extraction shifted indices up)
                                        const effectiveIdx = (oldFlatIndex !== -1 && capturedIdx > oldFlatIndex)
                                            ? capturedIdx - 1
                                            : capturedIdx;

                                        // Walk cleaned backdrops, inject into the CORRECT one
                                        const next = [...cleaned];
                                        let count = 0;
                                        let inserted = false;
                                        for (let b = 0; b < next.length; b++) {
                                            const len = next[b].structures.length;
                                            if (effectiveIdx <= count + len) {
                                                next[b] = { ...next[b], structures: [...next[b].structures] };
                                                next[b].structures.splice(effectiveIdx - count, 0, draggedSt);
                                                inserted = true;
                                                break;
                                            }
                                            count += len;
                                        }
                                        if (!inserted) {
                                            next[next.length - 1] = {
                                                ...next[next.length - 1],
                                                structures: [...next[next.length - 1].structures, draggedSt],
                                            };
                                        }
                                        return next;
                                    });

                                } else if (t === 'layout' && draggingTool!.columns) {
                                    // ─── Insert new Layout from sidebar ───
                                    // Inject new structure directly into the targeted Backdrop
                                    // so it shares that backdrop's background color.
                                    const newRowId = `row-${Date.now()}`;
                                    const cols = draggingTool!.columns!;
                                    const capturedIdx = dropInsertIndex;
                                    setEmailTree(prev => {
                                        const containers: ContainerData[] = cols.map(() => ({
                                            id: `container-${crypto.randomUUID()}`,
                                            block: null,
                                        }));
                                        const newSt: StructureData = { id: newRowId, columns: cols, containers };

                                        if (prev.length === 0) {
                                            return [{ id: newRowId, backgroundColor: '', structures: [newSt] }];
                                        }

                                        const next = [...prev];
                                        let count = 0;
                                        let inserted = false;
                                        for (let b = 0; b < next.length; b++) {
                                            const len = next[b].structures.length;
                                            if (capturedIdx <= count + len) {
                                                next[b] = { ...next[b], structures: [...next[b].structures] };
                                                next[b].structures.splice(capturedIdx - count, 0, newSt);
                                                inserted = true;
                                                break;
                                            }
                                            count += len;
                                        }
                                        if (!inserted) {
                                            next[next.length - 1] = {
                                                ...next[next.length - 1],
                                                structures: [...next[next.length - 1].structures, newSt],
                                            };
                                        }
                                        return next;
                                    });
                                }

                                setDropInsertIndex(null);
                                setDraggingTool(null);
                            }
                        }}
                    >


                        {/* Recursive Canvas Renderer — Phase 4 */}
                        {(() => {
                            // Compute a flat global structure index for isTopRow / topOffset
                            let globalStructureIndex = 0;
                            return emailTree.map((backdrop) => {
                                return (
                                    <div key={backdrop.id} className="relative group/backdrop w-full">
                                        {/* 1. Backdrop Full-Width Color Strip */}
                                        {backdrop.backgroundColor && (
                                            <div
                                                className="absolute pointer-events-none z-[3]"
                                                style={{
                                                    top: backdrop.structures.length > 0 && globalStructureIndex === 0 ? '-34px' : '-26px',
                                                    bottom: 0,
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    width: '100vw',
                                                    backgroundColor: backdrop.backgroundColor
                                                }}
                                            />
                                        )}

                                        {/* 2. Backdrop Border Overlay */}
                                        <div
                                            className={`absolute -inset-x-[60px] rounded-[4px] border-[2px] transition-all duration-150 pointer-events-none z-[5] ${selectedBackdropRowId === backdrop.id ? 'border-[#475569]' : 'border-transparent'}`}
                                            style={{
                                                top: globalStructureIndex === 0 ? '-34px' : '-26px',
                                                bottom: 0
                                            }}
                                        />

                                        {/* 3. Backdrop Left Strip Hitbox */}
                                        <div
                                            className="absolute left-[-60px] w-[60px] z-[8] pointer-events-auto cursor-default"
                                            style={{ top: globalStructureIndex === 0 ? '-34px' : '-26px', bottom: 0 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedBackdropRowId(backdrop.id);
                                                setSelectedBoxId(null);
                                                setSelectedLayer('backdrop');
                                                setActiveRightSidebarTab('general');
                                            }}
                                        />

                                        {/* 4. Backdrop Right Strip Hitbox */}
                                        <div
                                            className="absolute right-[-60px] w-[60px] z-[8] pointer-events-auto cursor-default"
                                            style={{ top: globalStructureIndex === 0 ? '-34px' : '-26px', bottom: 0 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedBackdropRowId(backdrop.id);
                                                setSelectedBoxId(null);
                                                setSelectedLayer('backdrop');
                                                setActiveRightSidebarTab('general');
                                            }}
                                        />

                                        {/* 5. Backdrop Controls (Pill, Plus, 3-dot) — shows on select only */}
                                        {selectedBackdropRowId === backdrop.id && (
                                            <>
                                                {/* Backdrop Pill */}
                                                <div
                                                    className="absolute left-[-60px] z-[80] pointer-events-auto animate-in fade-in duration-200"
                                                    style={globalStructureIndex === 0
                                                        ? { bottom: '-28px', left: '-18px' }
                                                        : { top: '-53px' }
                                                    }
                                                >
                                                    <div className={`absolute inset-x-0 ${globalStructureIndex === 0 ? 'top-[-8px] h-[30px]' : 'top-0 h-[27px]'} pointer-events-auto z-[60]`} />
                                                    <div
                                                        className="px-3 py-[3px] rounded-full text-white text-[10.5px] font-medium shadow-sm flex items-center cursor-pointer hover:scale-105 active:scale-95 transition-all"
                                                        style={{ backgroundColor: selectedBackdropRowId === backdrop.id ? '#475569' : '#64748b' }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedBackdropRowId(backdrop.id);
                                                            setSelectedBoxId(null);
                                                            setSelectedLayer('backdrop');
                                                            setActiveRightSidebarTab('general');
                                                        }}
                                                    >
                                                        <span className="capitalize tracking-wide">Backdrop</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="currentColor" className="opacity-80 rotate-90 ml-1.5 -mr-1">
                                                            <path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Plus Button */}
                                                <div className="absolute -bottom-[42px] left-[-60px] z-[80] pointer-events-auto">
                                                    <div className="absolute inset-0 top-[-8px] h-[44px] pointer-events-auto z-[60]" />
                                                    <div
                                                        className="w-[36px] h-[36px] rounded-[12px] text-white flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                                                        style={{ backgroundColor: selectedBackdropRowId === backdrop.id ? '#475569' : '#64748b' }}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">add</span>
                                                    </div>
                                                </div>

                                                {/* 3-dot menu */}
                                                <div
                                                    className="absolute -translate-y-1/2 right-[-52px] z-[80] pointer-events-auto group/backdropbtn flex items-center"
                                                    style={{ top: globalStructureIndex === 0 ? 'calc(50% - 17px)' : 'calc(50% - 13px)' }}
                                                >
                                                    <div className="flex flex-row-reverse items-center">
                                                        <TooltipProvider delayDuration={0}>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div
                                                                        className="w-[36px] h-[36px] rounded-[12px] text-white flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex-shrink-0 relative overflow-hidden"
                                                                        style={{ backgroundColor: selectedBackdropRowId === backdrop.id ? '#475569' : '#64748b' }}
                                                                    >
                                                                        <div className="absolute inset-y-0 right-0 left-[-12px] top-0 h-[37px] pointer-events-auto z-[60]" />
                                                                        <div className="absolute inset-0 flex items-center justify-center gap-[3px] transition-opacity duration-200 opacity-100 group-hover/backdropbtn:opacity-0">
                                                                            <div className="w-[4px] h-[4px] rounded-full bg-white" />
                                                                            <div className="w-[4px] h-[4px] rounded-full bg-white" />
                                                                            <div className="w-[4px] h-[4px] rounded-full bg-white" />
                                                                        </div>
                                                                        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover/backdropbtn:opacity-100">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                                                                                <path d="M800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h400v80H160v480h640v-280h80v280q0 33-23.5 56.5T800-160ZM240-320h280v-120H240v120Zm0-200h280v-120H240v120Zm360 200h120v-200H600v200Zm-440 80v-480 480Zm560-360v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </TooltipTrigger>
                                                                <TooltipContent side="right" sideOffset={8}>Save as Module</TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                        <div className="flex items-center gap-[6px] mr-[6px] overflow-hidden transition-all duration-200 ease-out max-w-0 opacity-0 group-hover/backdropbtn:max-w-[124px] group-hover/backdropbtn:opacity-100">
                                                            {/* Delete */}
                                                            <TooltipProvider delayDuration={0}>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <div
                                                                            className="w-[32px] h-[32px] rounded-[10px] text-white flex items-center justify-center cursor-pointer shadow-md hover:brightness-110 active:scale-90 transition-all duration-150 flex-shrink-0"
                                                                            style={{ backgroundColor: selectedBackdropRowId === backdrop.id ? '#475569' : '#64748b' }}
                                                                            onClick={(e) => { e.stopPropagation(); handleDeleteBackdropRow(backdrop.id); }}
                                                                        >
                                                                            <span className="material-symbols-outlined text-[16px]">delete_outline</span>
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent side="top" sideOffset={8}>Delete Backdrop Row</TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                            {/* Duplicate */}
                                                            <TooltipProvider delayDuration={0}>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <div
                                                                            className="w-[32px] h-[32px] rounded-[10px] text-white flex items-center justify-center cursor-pointer shadow-md hover:brightness-110 active:scale-90 transition-all duration-150 flex-shrink-0"
                                                                            style={{ backgroundColor: selectedBackdropRowId === backdrop.id ? '#475569' : '#64748b' }}
                                                                            onClick={(e) => { e.stopPropagation(); handleDuplicateBackdropRow(backdrop.id); }}
                                                                        >
                                                                            <span className="material-symbols-outlined text-[16px]">content_copy</span>
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent side="top" sideOffset={8}>Duplicate Backdrop Row</TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                            {/* Move */}
                                                            <TooltipProvider delayDuration={0}>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <div
                                                                            className="w-[32px] h-[32px] rounded-[10px] text-white flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md hover:brightness-110 active:scale-90 transition-all duration-150 flex-shrink-0"
                                                                            style={{ backgroundColor: selectedBackdropRowId === backdrop.id ? '#475569' : '#64748b' }}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            draggable
                                                                            onDragStart={(e) => {
                                                                                e.dataTransfer.effectAllowed = 'move';
                                                                                const img = new window.Image();
                                                                                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                                                                                e.dataTransfer.setDragImage(img, 0, 0);
                                                                                setDraggingTool({ icon: 'layout', type: 'move_backdrop', id: backdrop.id });
                                                                            }}
                                                                            onDragEnd={() => { setDraggingTool(null); setDropInsertIndex(null); }}
                                                                        >
                                                                            <span className="material-symbols-outlined text-[16px]">open_with</span>
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent side="top" sideOffset={8}>Move Backdrop Row</TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* 6. Structures inside this backdrop */}
                                        {backdrop.structures.map((structure, structureIndex) => {
                                            const flatIdx = globalStructureIndex++;
                                            const isTopRow = flatIdx === 0;
                                            const topOffset = isTopRow ? '-34px' : '-26px';
                                            return (
                                                <div
                                                    key={structure.id}
                                                    data-structure-row
                                                    className={`relative ${(selectedBoxId === structure.id || (selectedBoxId && selectedBoxId.startsWith(structure.id + '-')) || selectedBackdropRowId === backdrop.id)
                                                            ? 'z-[60]'
                                                            : 'z-[10]'
                                                        }`}
                                                >
                                                    {/* Drop indicator TOP (first structure of first backdrop only) */}
                                                    {dropInsertIndex === 0 && flatIdx === 0 && (
                                                        <>
                                                            <div className="absolute top-[-34px] left-[2px] right-[2px] h-[2px] bg-[#333] rounded-full z-[65] pointer-events-none" />
                                                            <div className={`absolute top-[-34px] -translate-y-1/2 z-[65] pointer-events-none transition-all ${draggingTool?.type === 'layout' ? (structuresPanelPosition === 'left' ? 'left-[calc(50%+80px)]' : 'left-[calc(50%-80px)]') : 'left-1/2'} -translate-x-1/2`}>
                                                                <div className="bg-[#333] text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md whitespace-nowrap">Drop here</div>
                                                            </div>
                                                        </>
                                                    )}

                                                    <StructureWrapper
                                                        id={structure.id}
                                                        isSelected={selectedBoxId === structure.id && selectedLayer === 'structure'}
                                                        onSelect={() => { setSelectedBoxId(structure.id); setSelectedLayer('structure'); setSelectedBackdropRowId(null); }}
                                                        onDelete={() => handleDeleteStructure(structure.id)}
                                                        onDuplicate={() => handleDuplicateStructure(structure.id)}
                                                        onMoveDragStart={(e) => {
                                                            e.dataTransfer.effectAllowed = 'move';
                                                            const img = new window.Image();
                                                            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                                                            e.dataTransfer.setDragImage(img, 0, 0);
                                                            setDraggingTool({ icon: 'layout', type: 'move_structure', id: structure.id });
                                                        }}
                                                        onMoveDragEnd={() => {
                                                            setDraggingTool(null);
                                                            setDropInsertIndex(null);
                                                        }}
                                                        isDraggingLayout={dropInsertIndex !== null}
                                                        topOffset={topOffset}
                                                        isTopRow={isTopRow}
                                                        setSelectedBackdropRowId={setSelectedBackdropRowId}
                                                        setSelectedBoxId={setSelectedBoxId}
                                                        setSelectedLayer={setSelectedLayer}
                                                        setActiveRightSidebarTab={setActiveRightSidebarTab}
                                                    >
                                                        <div className="flex gap-4 w-full items-start isolation-auto" style={{ height: 'auto' }}>
                                                            {structure.containers.map((container, ci) => (
                                                                <div key={container.id} style={{ flex: structure.columns[ci] ?? 1 }} className="w-full">
                                                                    {renderBoxContent(container.block ? container.block.type : 'empty', container.id, structure.id, backdrop.id)}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </StructureWrapper>

                                                    {/* Drop indicator BOTTOM */}
                                                    {dropInsertIndex === flatIdx + 1 && (
                                                        <>
                                                            <div className="absolute bottom-0 left-[2px] right-[2px] h-[2px] bg-[#333] rounded-full z-[65] pointer-events-none" />
                                                            <div className={`absolute bottom-0 translate-y-1/2 z-[65] pointer-events-none transition-all ${draggingTool?.type === 'layout' ? (structuresPanelPosition === 'left' ? 'left-[calc(50%+80px)]' : 'left-[calc(50%-80px)]') : 'left-1/2'} -translate-x-1/2`}>
                                                                <div className="bg-[#333] text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md whitespace-nowrap">Drop here</div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            });
                        })()}
                    </div>


                </div>

                {/* Right Sidebar Property Panel */}
                <div
                    className={`absolute ${structuresPanelPosition === 'right' ? 'left-0' : 'right-0'} top-0 w-[360px] h-full flex flex-col z-10 p-4 ${structuresPanelPosition === 'right' ? 'pr-0' : 'pl-0'} pointer-events-none ${isDraggingStructures && !draggingTool ? 'z-[60]' : ''}`}
                    onDragOver={(e) => {
                        if (!isDraggingStructures || draggingTool) return;
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                        setIsDragOverRight(true);
                    }}
                    onDragLeave={() => setIsDragOverRight(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.getData('text/plain') === 'structures-panel') {
                            setStructuresPanelPosition(structuresPanelPosition === 'left' ? 'right' : 'left');
                        }
                        setIsDraggingStructures(false);
                        setIsDragOverRight(false);
                    }}
                >
                    {/* Drop zone highlight overlay */}
                    {isDraggingStructures && !draggingTool && (
                        <div className={`absolute inset-0 rounded-[24px] m-4 ${structuresPanelPosition === 'right' ? 'mr-0' : 'ml-0'} border-2 border-dashed transition-colors pointer-events-none z-[61] ${isDragOverRight ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-white/20'}`}>
                            <div className="flex items-center justify-center h-full">
                                <div className={`flex flex-col items-center gap-2 transition-colors ${isDragOverRight ? 'text-primary' : 'text-gray-400'}`}>
                                    <span className="material-symbols-outlined text-[32px]">swap_horiz</span>
                                    <span className="text-[12px] font-medium">Drop here</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="pointer-events-auto flex flex-col h-full w-full">
                        {selectedBackdropRowId ? (
                            <div className="flex-1 bg-white dark:bg-background rounded-[24px] shadow-sm flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                                {/* Backdrop Header */}
                                <div className="pt-[10px] pb-[10px] flex items-center justify-between px-5 border-b border-gray-100 dark:border-border flex-shrink-0">
                                    <span className="material-symbols-outlined text-[15px] font-medium text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => {
                                        setSelectedBackdropRowId(null);
                                        setSelectedLayer(null);
                                    }}>arrow_back</span>
                                    <span className="font-medium text-[15px] text-gray-700 dark:text-foreground">Backdrop</span>
                                    <span className="material-symbols-outlined text-[15px] font-medium text-gray-400 cursor-pointer">keyboard_double_arrow_up</span>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 pt-3 space-y-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:rounded-full">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 px-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#64748b]" />
                                            <label className="text-[11px] font-semibold text-gray-700 dark:text-foreground tracking-wide uppercase opacity-70">Properties — {selectedBackdropRowId}</label>
                                        </div>

                                        <div className="bg-[#f8fafc] dark:bg-accent/20 rounded-[20px] p-5 border border-gray-100 dark:border-border/50 space-y-5">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-[14px] font-medium text-gray-700 dark:text-foreground">Background Color</p>
                                                    <p className="text-[12px] text-gray-400">Row backdrop color</p>
                                                </div>
                                                <div className="relative">
                                                    <div
                                                        onClick={() => setIsBackdropColorPickerOpen(!isBackdropColorPickerOpen)}
                                                        className="w-10 h-10 rounded-full border-2 border-white dark:border-border shadow-sm cursor-pointer hover:scale-105 transition-transform"
                                                        style={{ backgroundColor: activeBackdropNode?.backgroundColor || '#f3f4f6' }}
                                                    />

                                                    {isBackdropColorPickerOpen && (
                                                        <>
                                                            <div className="fixed inset-0 z-[190]" onClick={() => setIsBackdropColorPickerOpen(false)} />
                                                            <div className="absolute right-0 top-12 z-[200] w-[280px] p-2 bg-white dark:bg-background border border-gray-100 dark:border-border rounded-[24px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                                                                <div className="p-2 border-b border-gray-50 dark:border-border/50 mb-2 flex items-center justify-between">
                                                                    <span className="text-[13px] font-medium px-2">Color Picker</span>
                                                                    <X size={16} className="cursor-pointer opacity-40 hover:opacity-100" onClick={() => setIsBackdropColorPickerOpen(false)} />
                                                                </div>
                                                                <ColorPicker
                                                                    value={activeBackdropNode?.backgroundColor || '#f3f4f6'}
                                                                    onChange={(color) => setBackdropColor(selectedBackdropRowId!, color)}
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {['#f3f4f6', '#f1f5f9', '#ffffff', '#e2e8f0', '#f8fafc', '#1e293b'].map((color) => (
                                                    <div
                                                        key={color}
                                                        onClick={() => setBackdropColor(selectedBackdropRowId!, color)}
                                                        className={`w-7 h-7 rounded-lg cursor-pointer border-2 transition-all ${(activeBackdropNode?.backgroundColor || '#f3f4f6') === color ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-white dark:border-border hover:scale-110'}`}
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : activeBlockNode?.type === 'text' ? (
                            <div className="flex-1 bg-white dark:bg-background rounded-[24px] shadow-sm flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                                {/* Text Block Header */}
                                <div className="pt-[10px] pb-[10px] flex items-center justify-between px-5 border-b border-gray-100 dark:border-border flex-shrink-0">
                                    <span className="material-symbols-outlined text-[15px] font-medium text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSelectedBoxId(null)}>close</span>
                                    <span className="font-medium text-[15px] text-gray-700 dark:text-foreground">Text Block</span>
                                    <span className="material-symbols-outlined text-[15px] font-medium text-gray-400 cursor-pointer">keyboard_double_arrow_up</span>
                                </div>

                                <div className="flex-1 overflow-y-auto p-5 pt-3 space-y-7 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:rounded-full">
                                    {/* Settings / Styles Tabs */}
                                    <div className="w-full bg-[#f1f5f9] dark:bg-accent/40 rounded-full p-1 flex mt-0 h-[38px]">
                                        <div
                                            className={`flex-1 flex items-center justify-center rounded-full text-[13px] font-medium cursor-pointer transition-colors ${textPropertiesTab === 'settings' ? 'bg-white shadow-sm text-gray-700 dark:bg-background dark:text-foreground' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                                            onClick={() => setTextPropertiesTab('settings')}
                                        >
                                            Settings
                                        </div>
                                        <div
                                            className={`flex-1 flex items-center justify-center rounded-full text-[13px] font-medium cursor-pointer transition-colors ${textPropertiesTab === 'styles' ? 'bg-white shadow-sm text-gray-700 dark:bg-background dark:text-foreground' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                                            onClick={() => setTextPropertiesTab('styles')}
                                        >
                                            Styles
                                        </div>
                                    </div>

                                    {textPropertiesTab === 'settings' && (
                                        <div className="space-y-7 animate-in fade-in duration-200">
                                            {/* Paragraph Style */}
                                            <div className="space-y-3">
                                                <label className="text-[14px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">Paragraph Style</label>
                                                <div className="flex bg-white dark:bg-accent border-[1.5px] border-gray-200 dark:border-border rounded-[10px] overflow-hidden">
                                                    {['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].map((t, i, arr) => {
                                                        const isActive = activeEditor ?
                                                            (t === 'P' ? activeEditor.isActive('paragraph') && !activeEditor.isActive('heading') : activeEditor.isActive('heading', { level: parseInt(t.replace('H', '')) }))
                                                            : false;
                                                        return (
                                                            <div
                                                                key={t}
                                                                className={`flex-1 h-[38px] flex items-center justify-center text-[13px] font-medium cursor-pointer transition-colors ${i < arr.length - 1 ? 'border-r-[1.5px] border-gray-200 dark:border-border' : ''} ${isActive ? 'shadow-[inset_0_0_0_2px_currentColor] text-primary bg-primary/10 rounded-[8px] z-10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                                                onClick={() => {
                                                                    if (!activeEditor) return;
                                                                    if (t === 'P') activeEditor.chain().focus().setParagraph().run();
                                                                    else activeEditor.chain().focus().toggleHeading({ level: parseInt(t.replace('H', '')) }).run();
                                                                }}
                                                            >
                                                                {t}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* Text Style */}
                                            <div className="space-y-3">
                                                <label className="text-[14px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">Text Style</label>
                                                <div className="flex bg-white dark:bg-accent border-[1.5px] border-gray-200 dark:border-border rounded-[10px] overflow-hidden">
                                                    {[
                                                        { id: 'bold', command: 'toggleBold', label: 'B', elem: <span className="font-bold font-serif">B</span> },
                                                        { id: 'italic', command: 'toggleItalic', label: 'I', elem: <span className="italic font-serif pl-1">I</span> },
                                                        { id: 'underline', command: 'toggleUnderline', label: 'U', elem: <span className="underline font-serif">U</span> },
                                                        { id: 'strike', command: 'toggleStrike', label: 'S', elem: <span className="line-through font-serif">S</span> },
                                                        { id: 'subscript', command: 'toggleSubscript', label: 'X2', elem: <span className="font-serif">X<sub className="text-[10px] font-sans">2</sub></span> },
                                                        { id: 'superscript', command: 'toggleSuperscript', label: 'X^2', elem: <span className="font-serif">X<sup className="text-[10px] font-sans">2</sup></span> },
                                                        { id: 'clear', command: 'clear', label: 'Tx', elem: <span className="font-serif text-gray-400">T<sub className="text-[10px] font-sans">x</sub></span> }
                                                    ].map((btn, i, arr) => {
                                                        const isActive = activeEditor && btn.id !== 'clear' ? activeEditor.isActive(btn.id) : false;
                                                        return (
                                                            <div
                                                                key={btn.id}
                                                                className={`flex-1 h-[38px] flex items-center justify-center text-[16px] cursor-pointer transition-colors ${i < arr.length - 1 ? 'border-r-[1.5px] border-gray-200 dark:border-border' : ''} ${isActive ? 'shadow-[inset_0_0_0_2px_currentColor] text-primary bg-primary/10 rounded-[8px] z-10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                                                onClick={() => {
                                                                    if (!activeEditor) return;
                                                                    if (btn.id === 'clear') {
                                                                        activeEditor.chain().focus().clearNodes().unsetAllMarks().run();
                                                                    } else {
                                                                        (activeEditor.chain().focus() as any)[btn.command]().run();
                                                                    }
                                                                }}
                                                            >
                                                                {btn.elem}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* Text Alignment on Desktop & Indent */}
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="space-y-3 flex-1 flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-[4.5px] h-[4.5px] bg-[#10b981] rounded-full"></div>
                                                        <label className="text-[14px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">Text Alignment on Desktop</label>
                                                    </div>
                                                    <div className="flex bg-white dark:bg-accent border-[1.5px] border-gray-200 dark:border-border rounded-[10px] overflow-hidden">
                                                        {[
                                                            { id: 'left', icon: 'format_align_left' },
                                                            { id: 'center', icon: 'format_align_center' },
                                                            { id: 'right', icon: 'format_align_right' },
                                                            { id: 'justify', icon: 'format_align_justify' }
                                                        ].map((item, i, arr) => {
                                                            const isActive = activeEditor ? activeEditor.isActive({ textAlign: item.id }) : (!getBlockProperty(selectedBoxId!, 'textAlign') && item.id === 'left');
                                                            return (
                                                                <div
                                                                    key={item.id}
                                                                    className={`flex-1 h-[38px] flex items-center justify-center cursor-pointer transition-colors ${i < arr.length - 1 ? 'border-r-[1.5px] border-gray-200 dark:border-border' : ''} ${isActive ? 'shadow-[inset_0_0_0_2px_currentColor] text-primary bg-primary/10 rounded-[8px] z-10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                                                    onClick={() => {
                                                                        if (activeEditor) activeEditor.chain().focus().setTextAlign(item.id).run();
                                                                    }}
                                                                >
                                                                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>

                                                <div className="space-y-3 w-[84px] flex flex-col items-start -mt-[5px]">
                                                    <label className="text-[14px] text-gray-500 dark:text-gray-400 font-medium tracking-wide mt-[4px]">Indent</label>
                                                    <div className="flex bg-white dark:bg-accent border-[1.5px] border-gray-200 dark:border-border rounded-[10px] overflow-hidden w-full">
                                                        {['format_indent_decrease', 'format_indent_increase'].map((icon, i) => (
                                                            <div key={icon} className={`flex-1 h-[38px] flex items-center justify-center cursor-pointer transition-colors ${i === 0 ? 'border-r-[1.5px] border-gray-200 dark:border-border' : ''} text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5`}>
                                                                <span className="material-symbols-outlined text-[18px]">{icon}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {textPropertiesTab === 'styles' && (
                                        <div className="space-y-7 animate-in fade-in duration-200">
                                            {/* Font Family */}
                                            <div className="flex items-center justify-between">
                                                <label className="text-[14px] text-gray-500 dark:text-gray-400 font-medium tracking-wide whitespace-nowrap">Font Family</label>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <div className="h-[38px] px-4 ml-4 flex-1 border-[1.5px] border-gray-200 dark:border-border rounded-full flex items-center justify-between bg-white dark:bg-background cursor-pointer hover:border-gray-300 dark:hover:border-gray-500 transition-colors shadow-sm">
                                                            <span className="text-[14px] text-gray-700 dark:text-gray-200 font-medium truncate mr-2">
                                                                {activeEditor?.getAttributes('textStyle').fontFamily || 'Arial'}
                                                            </span>
                                                            <span className="material-symbols-outlined text-[20px] text-gray-400 flex-shrink-0">keyboard_arrow_down</span>
                                                        </div>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="w-[160px] bg-white dark:bg-background z-[200] border shadow-md rounded-xl max-h-[300px] overflow-y-auto">
                                                        {['Arial', 'Times New Roman', 'Inter', 'Roboto', 'Outfit', 'Georgia', 'Courier New', 'Comic Sans MS'].map((font) => (
                                                            <DropdownMenuItem
                                                                key={font}
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    if (activeEditor) {
                                                                        activeEditor.chain().focus().setFontFamily(font).run();
                                                                    }
                                                                }}
                                                                style={{ fontFamily: font }}
                                                            >
                                                                {font}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            {/* Divider */}
                                            <div className="h-[1px] w-full bg-gray-200 dark:bg-border my-6"></div>

                                            {/* Font Size on Desktop */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-[5px] h-[5px] bg-[#10b981] rounded-full"></div>
                                                    <label className="text-[14px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">Font Size on Desktop</label>
                                                </div>
                                                <div className="h-[38px] px-4 w-[90px] border-[1.5px] border-gray-200 dark:border-border rounded-full flex items-center justify-between bg-white dark:bg-background cursor-pointer hover:border-gray-300 dark:hover:border-gray-500 transition-colors shadow-sm">
                                                    <span className="text-[14px] text-gray-700 dark:text-gray-200 font-medium">{getBlockProperty(selectedBoxId!, 'fontSize', '14')}</span>
                                                    <span className="material-symbols-outlined text-[20px] text-gray-400">keyboard_arrow_down</span>
                                                </div>
                                            </div>

                                            {/* Font Color */}
                                            <div className="flex items-center justify-between">
                                                <label className="text-[14px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">Font Color</label>
                                                <div className="h-[38px] px-5 w-[140px] rounded-full border border-gray-200 dark:border-border flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity relative overflow-hidden shadow-sm" style={{ backgroundColor: activeEditor?.getAttributes('textStyle').color || '#333333' }}>
                                                    <input
                                                        type="color"
                                                        className="absolute top-[-10px] left-[-10px] w-[200px] h-[200px] opacity-0 cursor-pointer"
                                                        value={activeEditor?.getAttributes('textStyle').color || '#333333'}
                                                        onChange={(e) => {
                                                            if (activeEditor) {
                                                                activeEditor.chain().focus().setColor(e.target.value).run();
                                                            }
                                                        }}
                                                    />
                                                    <span className="text-[14px] font-medium tracking-wider mix-blend-difference text-white">
                                                        {activeEditor?.getAttributes('textStyle').color || '#333333'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Line Height on Desktop */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-[5px] h-[5px] bg-[#10b981] rounded-full"></div>
                                                    <label className="text-[14px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">Line Height on Desktop</label>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-[38px] flex-1 bg-white dark:bg-accent border-[1.5px] border-gray-200 dark:border-border rounded-full flex items-center justify-between px-3.5">
                                                        <span
                                                            className="material-symbols-outlined text-[18px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-colors"
                                                            onClick={() => updateBlockProperty(selectedBoxId!, 'lineHeight', Math.max(1, (getBlockProperty(selectedBoxId!, 'lineHeight', 1.5) - 0.1)))}
                                                        >remove</span>
                                                        <span className="text-[14px] text-gray-700 dark:text-gray-200 font-medium">{(getBlockProperty(selectedBoxId!, 'lineHeight', 1.5)).toFixed(1)}</span>
                                                        <span
                                                            className="material-symbols-outlined text-[18px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-colors"
                                                            onClick={() => updateBlockProperty(selectedBoxId!, 'lineHeight', (getBlockProperty(selectedBoxId!, 'lineHeight', 1.5) + 0.1))}
                                                        >add</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Text Background Color */}
                                            <div className="flex items-center justify-between pt-3">
                                                <label className="text-[14px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">Text Background Color</label>
                                                <div className="h-[38px] w-[90px] rounded-full border-[1.5px] border-gray-200 dark:border-border flex items-center justify-center overflow-hidden relative cursor-pointer hover:border-gray-300 dark:hover:border-gray-500 transition-colors bg-white">
                                                    {/* Checkerboard pattern for transparent */}
                                                    <div className="absolute inset-0 bg-transparent opacity-30" style={{ backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)', backgroundSize: '10px 10px', backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Separate Tabs Pill Container */}
                                <div className="w-full h-[54px] bg-[#e5e7eb] dark:bg-accent/40 p-[5px] rounded-[27px] flex items-center shadow-inner relative flex-shrink-0 mb-3">
                                    <TooltipProvider delayDuration={0}>
                                        {/* Tab 1: General Styles */}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div
                                                    onClick={() => setActiveRightSidebarTab('general')}
                                                    className={`flex-1 h-full flex justify-center items-center rounded-full cursor-pointer transition-all ${activeRightSidebarTab === 'general' ? 'bg-white dark:bg-background shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-gray-700 dark:text-foreground' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">palette</span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>General Styles</TooltipContent>
                                        </Tooltip>

                                        {/* Tab 2: Message Settings */}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div
                                                    onClick={() => setActiveRightSidebarTab('message')}
                                                    className={`flex-1 h-full flex justify-center items-center rounded-full cursor-pointer transition-all ${activeRightSidebarTab === 'message' ? 'bg-white dark:bg-background shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-gray-700 dark:text-foreground' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                                >
                                                    <span className="material-symbols-outlined text-[22px]">mode_comment</span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>Message Settings</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                                {/* Separate Content Area Card Container */}
                                <div className="flex-1 flex flex-col min-h-[400px]">
                                    {activeRightSidebarTab === 'message' ? (
                                        <div className="flex-1 bg-white dark:bg-background rounded-[24px] shadow-sm flex flex-col overflow-hidden overflow-y-auto pt-3 px-5 pb-5 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:rounded-full animate-in fade-in duration-300">
                                            {/* Subject / Title */}
                                            <div className="space-y-1">
                                                <label className="text-sm font-semibold text-[14px] text-gray-500 dark:text-foreground/80 pl-1 tracking-tight">Subject / Title</label>
                                                <div className="relative bg-[#f1f5f9] dark:bg-accent/30 rounded-[16px] pt-0 pb-4 px-4 transition-colors focus-within:ring-2 focus-within:ring-primary shadow-inner overflow-hidden group flex flex-col min-h-[110px]">
                                                    <textarea
                                                        value={subjectText}
                                                        onChange={(e) => setSubjectText(e.target.value)}
                                                        placeholder="65 characters recommended"
                                                        maxLength={500}
                                                        className="w-[calc(100%-30px)] flex-1 h-full bg-transparent border-none outline-none text-[15px] leading-[24px] pt-4 resize-none text-gray-800 dark:text-foreground font-medium placeholder:text-gray-400 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:cursor-default cursor-text"
                                                    />
                                                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-center">
                                                        <span className="material-symbols-outlined text-[20px] text-[#10b981] hover:opacity-80 cursor-pointer transition-opacity">auto_fix_high</span>
                                                        <div className="bg-white dark:bg-background rounded-full p-[2px] shadow-sm flex items-center justify-center relative">
                                                            <span
                                                                className="material-symbols-outlined text-[22px] text-gray-600 dark:text-gray-300 hover:text-gray-800 transition-colors cursor-pointer"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setIsSubjectEmojiPickerOpen(!isSubjectEmojiPickerOpen);
                                                                    setIsPreheaderEmojiPickerOpen(false);
                                                                }}
                                                            >
                                                                sentiment_satisfied
                                                            </span>
                                                            {isSubjectEmojiPickerOpen && (
                                                                <div className="absolute right-[calc(100%+16px)] top-1/2 -translate-y-1/2 z-[200] animate-in fade-in zoom-in-95 duration-200">
                                                                    {/* Triangle Arrow */}
                                                                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-gray-100 rotate-45 z-[210]"></div>

                                                                    <div
                                                                        className="fixed inset-0 z-[190]"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setIsSubjectEmojiPickerOpen(false);
                                                                        }}
                                                                    />
                                                                    <div className="relative z-[200] bg-white rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden w-[350px]">
                                                                        <EmojiPicker
                                                                            theme={Theme.LIGHT}
                                                                            width="100%"
                                                                            height={400}
                                                                            onEmojiClick={(emojiData: EmojiClickData) => {
                                                                                setSubjectText(prev => prev + emojiData.emoji);
                                                                                setIsSubjectEmojiPickerOpen(false);
                                                                            }}
                                                                            autoFocusSearch={true}
                                                                            searchPlaceholder="Search"
                                                                            previewConfig={{ showPreview: false }}
                                                                            skinTonesDisabled={true}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center justify-center h-[26px]">
                                                            <span className="text-[13px] text-gray-400 dark:text-gray-500 font-medium tracking-wide">{subjectText.length}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hidden Preheader */}
                                            <div className="space-y-1">
                                                <label className="text-sm font-semibold text-[14px] text-gray-500 dark:text-foreground/80 pl-1 tracking-tight">Hidden Preheader</label>
                                                <div className="relative bg-[#f1f5f9] dark:bg-accent/30 rounded-[16px] pt-0 pb-4 px-4 transition-colors focus-within:ring-2 focus-within:ring-primary shadow-inner overflow-hidden group flex flex-col min-h-[145px]">
                                                    <textarea
                                                        value={preheaderText}
                                                        onChange={(e) => setPreheaderText(e.target.value)}
                                                        placeholder="50 - 100 characters"
                                                        maxLength={500}
                                                        className="w-[calc(100%-30px)] flex-1 h-full bg-transparent border-none outline-none text-[14px] leading-[24px] pt-4 resize-none text-gray-800 dark:text-foreground placeholder:text-gray-400 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:cursor-default cursor-text"
                                                    />
                                                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-center">
                                                        <span className="material-symbols-outlined text-[20px] text-[#10b981] hover:opacity-80 cursor-pointer transition-opacity">auto_fix_high</span>
                                                        <div className="bg-white dark:bg-background rounded-full p-[2px] shadow-sm flex items-center justify-center relative">
                                                            <span
                                                                className="material-symbols-outlined text-[22px] text-gray-600 dark:text-gray-300 hover:text-gray-800 transition-colors cursor-pointer"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setIsPreheaderEmojiPickerOpen(!isPreheaderEmojiPickerOpen);
                                                                    setIsSubjectEmojiPickerOpen(false);
                                                                }}
                                                            >
                                                                sentiment_satisfied
                                                            </span>
                                                            {isPreheaderEmojiPickerOpen && (
                                                                <div className="absolute right-[calc(100%+16px)] top-1/2 -translate-y-1/2 z-[200] animate-in fade-in zoom-in-95 duration-200">
                                                                    {/* Triangle Arrow */}
                                                                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-gray-100 rotate-45 z-[210]"></div>

                                                                    <div
                                                                        className="fixed inset-0 z-[190]"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setIsPreheaderEmojiPickerOpen(false);
                                                                        }}
                                                                    />
                                                                    <div className="relative z-[200] bg-white rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden w-[350px]">
                                                                        <EmojiPicker
                                                                            theme={Theme.LIGHT}
                                                                            width="100%"
                                                                            height={400}
                                                                            onEmojiClick={(emojiData: EmojiClickData) => {
                                                                                setPreheaderText(prev => prev + emojiData.emoji);
                                                                                setIsPreheaderEmojiPickerOpen(false);
                                                                            }}
                                                                            autoFocusSearch={true}
                                                                            searchPlaceholder="Search"
                                                                            previewConfig={{ showPreview: false }}
                                                                            skinTonesDisabled={true}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="bg-white dark:bg-background rounded-full p-[2px] shadow-sm flex items-center justify-center relative">
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="currentColor" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 transition-colors cursor-pointer"><path d="M80-240v-480h80v480H80Zm560 0-57-56 144-144H240v-80h487L584-664l56-56 240 240-240 240Z" /></svg>
                                                        </div>
                                                        <div className="flex items-center justify-center h-[26px]">
                                                            <span className="text-[13px] text-gray-400 dark:text-gray-500 font-medium tracking-wide">{preheaderText.length}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Email annotations for Gmail */}
                                            <div className="space-y-0">
                                                <div className="flex items-center justify-between pl-1 pr-1">
                                                    <label className="text-sm font-semibold text-[14px] text-gray-500 dark:text-foreground/80 pl-1 tracking-tight">Email annotations for Gmail</label>
                                                    <div
                                                        onClick={() => setIsGmailAnnotationEnabled(!isGmailAnnotationEnabled)}
                                                        className={`w-[50px] h-[28px] rounded-full relative cursor-pointer shadow-inner transition-colors duration-200 ${isGmailAnnotationEnabled ? 'bg-[#10b981]' : 'bg-gray-200 dark:bg-accent/60 hover:bg-gray-300'}`}
                                                    >
                                                        <div className={`w-[24px] h-[24px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform duration-200 ${isGmailAnnotationEnabled ? 'translate-x-[24px]' : 'translate-x-[2px]'}`}></div>
                                                    </div>
                                                </div>

                                                <p className="text-[12px] text-gray-400 leading-relaxed px-1">
                                                    This feature lets you showcase your deals, discounts, or offer directly in recipient's inbox before they open the email. Effective on mobile device in Gmail promotion folder.
                                                </p>

                                                {isGmailAnnotationEnabled && (
                                                    <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-semibold text-[14px] text-gray-500 dark:text-foreground/80 pl-1 tracking-tight">Annotation</label>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <div className="w-full bg-[#f8fafc] dark:bg-accent/30 border-[2px] border-gray-200 dark:border-border rounded-[14px] p-3.5 flex items-center justify-between cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                                                                        <span className="text-[14.5px] font-medium text-gray-700 dark:text-foreground">Product Carousel</span>
                                                                        <span className="material-symbols-outlined text-[20px] text-gray-400">keyboard_arrow_down</span>
                                                                    </div>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="w-[320px] rounded-xl shadow-lg mt-1 p-2">
                                                                    <DropdownMenuItem className="py-2.5 px-3 rounded-lg cursor-pointer bg-green-50/50 dark:bg-green-900/10 text-green-700 dark:text-green-500 font-medium">Product Carousel</DropdownMenuItem>
                                                                    <DropdownMenuItem className="py-2.5 px-3 rounded-lg cursor-pointer text-gray-600 dark:text-gray-300">Deal Annotation</DropdownMenuItem>
                                                                    <DropdownMenuItem className="py-2.5 px-3 rounded-lg cursor-pointer text-gray-600 dark:text-gray-300">Single image preview</DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>

                                                        {/* Preview Block Placeholder */}
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-semibold text-[14px] text-gray-500 dark:text-foreground/80 pl-1 tracking-tight">Preview</label>
                                                            <div className="w-full h-[100px] bg-[#f8fafc] dark:bg-accent/30 border border-gray-100 dark:border-border rounded-[14px] flex items-center justify-center border-dashed text-gray-400">
                                                                <span className="text-sm font-medium opacity-60">Mobile Preview Wrapper</span>
                                                            </div>
                                                        </div>

                                                        {/* Sender's Logo Toggle */}
                                                        <div className="flex items-center justify-between pl-1 pr-1 pt-2">
                                                            <label className="text-sm font-semibold text-[14px] text-gray-500 dark:text-foreground/80 pl-1 tracking-tight">Sender's logo</label>
                                                            <div
                                                                onClick={() => setIsSenderLogoEnabled(!isSenderLogoEnabled)}
                                                                className={`w-[42px] h-[24px] rounded-full relative cursor-pointer shadow-inner transition-colors duration-200 ${isSenderLogoEnabled ? 'bg-[#10b981]' : 'bg-gray-200 dark:bg-accent/60 hover:bg-gray-300'}`}
                                                            >
                                                                <div className={`w-[20px] h-[20px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform duration-200 ${isSenderLogoEnabled ? 'translate-x-[20px]' : 'translate-x-[2px]'}`}></div>
                                                            </div>
                                                        </div>

                                                        {/* Sender's Logo Uploader (When Enabled) */}
                                                        {isSenderLogoEnabled && (
                                                            <div className="w-full bg-[#f8fafc] dark:bg-accent/30 border-2 border-dashed border-gray-200 dark:border-border hover:border-green-400 dark:hover:border-green-500 rounded-[16px] p-6 flex flex-col items-center justify-center text-center gap-3 transition-colors cursor-pointer animate-in fade-in slide-in-from-top-2 duration-300">
                                                                <div className="w-12 h-12 bg-white dark:bg-background rounded-full shadow-sm flex items-center justify-center flex-shrink-0">
                                                                    <span className="material-symbols-outlined text-[24px] text-blue-500">add_photo_alternate</span>
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <p className="text-[14px] font-medium text-gray-700 dark:text-foreground">
                                                                        Drag and drop your image or <span className="text-blue-500 hover:underline">paste URL</span>
                                                                    </p>
                                                                    <p className="text-[12px] text-gray-400 px-2 leading-relaxed">
                                                                        You can also paste your image PNG, JPG or GIF from keyboard or browse your files.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex-1 overflow-hidden relative animate-in fade-in duration-300">
                                            {selectedGeneralStyle ? (
                                                <div className="flex flex-col h-full bg-white dark:bg-background rounded-[24px] shadow-sm animate-in slide-in-from-right-4 duration-300 overflow-hidden">
                                                    {/* Detail Panel Header */}
                                                    <div
                                                        className="h-[58px] border-b border-gray-100 dark:border-border/50 flex items-center justify-center relative px-4 flex-shrink-0 cursor-pointer group transition-colors"
                                                        onClick={() => {
                                                            setSelectedGeneralStyle(null);
                                                            setIsGeneralHovered(true);
                                                        }}
                                                    >
                                                        <span className="text-[16px] font-bold text-gray-700 dark:text-foreground/90 tracking-tight group-hover:text-primary transition-colors">
                                                            {selectedGeneralStyle}
                                                        </span>
                                                    </div>

                                                    {/* Detail Content */}
                                                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:rounded-full pb-10">
                                                        {selectedGeneralStyle === 'Global Styles & Layout' ? (
                                                            <>
                                                                {/* General Background Color */}
                                                                <div className="px-8 py-5 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">General Background Color</span>
                                                                        <TooltipProvider><Tooltip><TooltipTrigger className="flex items-center"><span className="material-symbols-outlined text-[20px] text-gray-300 hover:text-gray-400 transition-colors">help</span></TooltipTrigger><TooltipContent className="max-w-[280px]">Applied to the entire email area</TooltipContent></Tooltip></TooltipProvider>
                                                                    </div>
                                                                    <div className="relative">
                                                                        <div
                                                                            onClick={() => setIsGlobalColorPickerOpen(!isGlobalColorPickerOpen)}
                                                                            className="h-[40px] px-5 rounded-[20px] flex items-center justify-center text-[14px] font-bold text-white shadow-sm cursor-pointer hover:opacity-90 transition-all uppercase min-w-[100px]"
                                                                            style={{ backgroundColor: globalStyles.displayBackground }}
                                                                        >
                                                                            {globalStyles.displayBackground}
                                                                        </div>

                                                                        {isGlobalColorPickerOpen && (
                                                                            <>
                                                                                <div className="fixed inset-0 z-[190]" onClick={() => setIsGlobalColorPickerOpen(false)} />
                                                                                <div className="absolute top-[46px] right-0 z-[200] w-[260px] bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                                                                                    {/* Triangle Arrow */}
                                                                                    <div className="absolute -top-[6px] right-[24px] w-3 h-3 bg-white dark:bg-[#1a1a1a] border-t border-l border-gray-200 dark:border-white/10 rotate-45 z-[210]"></div>

                                                                                    <div className="flex flex-col p-4 gap-4">
                                                                                        {/* Picker Section */}
                                                                                        <div className="color-picker-custom w-full">
                                                                                            <HexColorPicker
                                                                                                color={globalStyles.displayBackground}
                                                                                                onChange={(c) => setGlobalStyles(prev => ({ ...prev, displayBackground: c }))}
                                                                                                style={{ width: '100%', height: '140px' }}
                                                                                            />
                                                                                        </div>

                                                                                        {/* HEX Input Section */}
                                                                                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 p-2 rounded-xl border border-gray-100 dark:border-white/5">
                                                                                            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase px-1">Hex</span>
                                                                                            <input
                                                                                                className="flex-1 bg-transparent border-none outline-none text-[13px] font-mono font-bold text-gray-700 dark:text-gray-200 uppercase"
                                                                                                value={globalStyles.displayBackground}
                                                                                                onChange={(e) => {
                                                                                                    const val = e.target.value;
                                                                                                    if (val.startsWith('#') && (val.length <= 7)) {
                                                                                                        setGlobalStyles(prev => ({ ...prev, displayBackground: val }));
                                                                                                    } else if (!val.startsWith('#') && (val.length <= 6)) {
                                                                                                        setGlobalStyles(prev => ({ ...prev, displayBackground: '#' + val }));
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                        </div>

                                                                                        {/* Default Palette */}
                                                                                        <div className="space-y-2">
                                                                                            <div className="flex items-center justify-between px-1">
                                                                                                <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Default Palette</span>
                                                                                            </div>
                                                                                            <div className="grid grid-cols-6 gap-2">
                                                                                                {['#f6f6f6', '#ffffff', '#000000', '#eb4132', '#3478f6', '#32d74b', '#ff9f0a', '#5856d6', '#af52de', '#ff3b30', '#ffcc00', '#8e8e93'].map(c => (
                                                                                                    <div
                                                                                                        key={c}
                                                                                                        className={`w-7 h-7 rounded-full border border-gray-100 dark:border-white/10 cursor-pointer transition-transform hover:scale-110 shadow-sm ${globalStyles.displayBackground.toLowerCase() === c.toLowerCase() ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-[#1a1a1a]' : ''}`}
                                                                                                        style={{ backgroundColor: c }}
                                                                                                        onClick={() => setGlobalStyles(prev => ({ ...prev, displayBackground: c }))}
                                                                                                    />
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* My Palette */}
                                                                                        <div className="space-y-2 pb-2">
                                                                                            <div className="flex items-center justify-between px-1">
                                                                                                <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">My Palette</span>
                                                                                            </div>
                                                                                            <div className="flex gap-2">
                                                                                                <div className="w-7 h-7 rounded-full border border-dashed border-gray-300 dark:border-white/20 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                                                                                                    <span className="material-symbols-outlined text-[16px] text-gray-400">add</span>
                                                                                                </div>
                                                                                                <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 opacity-40"></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Background Image */}
                                                                <div className="flex flex-col border-b border-gray-50 dark:border-white/5">
                                                                    <div className="px-8 py-5 flex items-center justify-between">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">Background Image</span>
                                                                            <TooltipProvider><Tooltip><TooltipTrigger className="flex items-center"><span className="material-symbols-outlined text-[20px] text-gray-300 hover:text-gray-400 transition-colors">help</span></TooltipTrigger><TooltipContent className="max-w-[280px]">Background image for the entire email. Some email clients (Windows 10 Mail, Android 4.4, the Gmail app for iOS, and Android for non-Gmail accounts) do not support background images. Thus, we recommend choosing a background color for the entire email similar to the selected image as a fallback.</TooltipContent></Tooltip></TooltipProvider>
                                                                        </div>
                                                                        <div
                                                                            onClick={() => setIsBgImageEnabled(!isBgImageEnabled)}
                                                                            className={`w-[54px] h-[30px] rounded-full relative cursor-pointer shadow-inner border transition-all duration-300 ${isBgImageEnabled ? 'bg-[#10b981] border-green-500' : 'bg-gray-100 dark:bg-accent/40 border-gray-200'}`}
                                                                        >
                                                                            <div className={`w-[24px] h-[24px] bg-white rounded-full absolute top-[2px] shadow-md transition-all duration-300 ${isBgImageEnabled ? 'right-[2px]' : 'left-[2px]'}`}></div>
                                                                        </div>
                                                                    </div>

                                                                    {isBgImageEnabled && (
                                                                        <div className="px-8 pb-6 animate-in slide-in-from-bottom-8 fade-in duration-500 ease-out">
                                                                            <div className="flex flex-col gap-1.5 p-1 bg-gray-50/50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                                                                                {[
                                                                                    { label: 'Email Projects', icon: 'auto_stories' },
                                                                                    { label: 'Season Decoration', icon: 'celebration' },
                                                                                    { label: 'AI Image', icon: 'auto_awesome' },
                                                                                    { label: 'Photo Stock', icon: 'image' },
                                                                                    { label: 'Icons', icon: 'category' },
                                                                                    { label: 'GIF', icon: 'gif' }
                                                                                ].map(cat => (
                                                                                    <div
                                                                                        key={cat.label}
                                                                                        className="group flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white dark:hover:bg-white/10 cursor-pointer transition-all hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                                                                                    >
                                                                                        <div className="flex items-center gap-3">
                                                                                            <span className={`material-symbols-outlined text-[20px] ${cat.label === 'AI Image' ? 'text-primary' : 'text-gray-400 group-hover:text-primary'} transition-colors`}>{cat.icon}</span>
                                                                                            <span className={`text-[13.5px] font-bold tracking-tight transition-colors ${cat.label === 'AI Image' ? 'animated-gradient-text' : 'text-gray-600 dark:text-foreground/80 group-hover:text-primary'}`}>
                                                                                                {cat.label}
                                                                                            </span>
                                                                                        </div>
                                                                                        <span className="material-symbols-outlined text-[18px] text-gray-300 group-hover:text-primary transition-all group-hover:translate-x-0.5">chevron_right</span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Message Content Width */}
                                                                <div className="px-8 py-5 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">Message Content Width</span>
                                                                        <TooltipProvider><Tooltip><TooltipTrigger className="flex items-center"><span className="material-symbols-outlined text-[20px] text-gray-300 hover:text-gray-400 transition-colors">help</span></TooltipTrigger><TooltipContent className="max-w-[280px]">The standard width of the email varies between 540-700 pixels.</TooltipContent></Tooltip></TooltipProvider>
                                                                    </div>
                                                                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-accent/20 border border-gray-200 dark:border-border rounded-[22px] p-[3px] shadow-sm">
                                                                        <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 hover:text-gray-600 cursor-pointer transition-all shadow-sm"><span className="material-symbols-outlined text-[18px]">remove</span></div>
                                                                        <span className="text-[15px] font-bold text-gray-600 dark:text-foreground min-w-[34px] text-center">760</span>
                                                                        <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 hover:text-gray-600 cursor-pointer transition-all shadow-sm"><span className="material-symbols-outlined text-[18px]">add</span></div>
                                                                    </div>
                                                                </div>

                                                                {/* Message Alignment */}
                                                                <div className="px-8 py-5 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">Message Alignment</span>
                                                                        <TooltipProvider><Tooltip><TooltipTrigger className="flex items-center"><span className="material-symbols-outlined text-[20px] text-gray-300 hover:text-gray-400 transition-colors">help</span></TooltipTrigger><TooltipContent className="max-w-[280px]">Horizontal alignment of the email content within the display area.</TooltipContent></Tooltip></TooltipProvider>
                                                                    </div>
                                                                    <div className="flex bg-gray-50/50 dark:bg-accent/20 border border-gray-200 dark:border-border rounded-[18px] p-1 shadow-sm gap-1">
                                                                        <div className="h-9 w-11 flex items-center justify-center bg-white dark:bg-background text-gray-500 rounded-xl shadow-sm cursor-pointer border border-transparent"><span className="material-symbols-outlined text-[20px]">format_align_left</span></div>
                                                                        <div className="h-9 w-11 flex items-center justify-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"><span className="material-symbols-outlined text-[20px]">format_align_center</span></div>
                                                                        <div className="h-9 w-11 flex items-center justify-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors border-2 border-[#10b981] bg-white dark:bg-background rounded-xl"><span className="material-symbols-outlined text-[20px]">format_align_right</span></div>
                                                                    </div>
                                                                </div>

                                                                {/* Underline Links */}
                                                                <div className="px-8 py-5 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">Underline Links</span>
                                                                    </div>
                                                                    <div className="w-[54px] h-[30px] bg-[#10b981] rounded-full relative cursor-pointer shadow-inner shadow-green-600/20">
                                                                        <div className="w-[24px] h-[24px] bg-white rounded-full absolute top-[3px] right-[3px] shadow-sm"></div>
                                                                    </div>
                                                                </div>

                                                                {/* Responsive Design */}
                                                                <div className="px-8 py-5 border-b border-gray-50 dark:border-white/5">
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">Responsive Design</span>
                                                                        <div className="w-[54px] h-[30px] bg-[#10b981] rounded-full relative cursor-pointer shadow-inner shadow-green-600/20">
                                                                            <div className="w-[24px] h-[24px] bg-white rounded-full absolute top-[3px] right-[3px] shadow-sm"></div>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-[12px] text-gray-400 leading-relaxed max-w-[400px]">
                                                                        Your email will automatically adjust for smaller screens by displaying content in a single column. Side-by-side blocks will be stacked vertically
                                                                    </p>
                                                                </div>

                                                                {/* RTL Text Direction */}
                                                                <div className="px-8 py-5 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">Right to Left Text Direction</span>
                                                                        <TooltipProvider><Tooltip><TooltipTrigger className="flex items-center"><span className="material-symbols-outlined text-[20px] text-gray-300 hover:text-gray-400 transition-colors">help</span></TooltipTrigger><TooltipContent className="max-w-[280px]">Enable right-to-left layout for languages like Arabic or Hebrew.</TooltipContent></Tooltip></TooltipProvider>
                                                                    </div>
                                                                    <div className="w-[54px] h-[30px] bg-[#10b981] rounded-full relative cursor-pointer shadow-inner shadow-green-600/20">
                                                                        <div className="w-[24px] h-[24px] bg-white rounded-full absolute top-[3px] right-[3px] shadow-sm"></div>
                                                                    </div>
                                                                </div>

                                                                {/* Custom List Styles */}
                                                                <div className="px-8 py-5 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">Custom List Styles</span>
                                                                    </div>
                                                                    <div className="w-[54px] h-[30px] bg-[#10b981] rounded-full relative cursor-pointer shadow-inner shadow-green-600/20">
                                                                        <div className="w-[24px] h-[24px] bg-white rounded-full absolute top-[3px] right-[3px] shadow-sm"></div>
                                                                    </div>
                                                                </div>

                                                                {/* Right Indent */}
                                                                <div className="px-8 py-5 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">Right Indent</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-accent/20 border border-gray-200 dark:border-border rounded-[22px] p-[3px] shadow-sm">
                                                                        <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 hover:text-gray-600 cursor-pointer transition-all shadow-sm"><span className="material-symbols-outlined text-[18px]">remove</span></div>
                                                                        <span className="text-[15px] font-bold text-gray-600 dark:text-foreground min-w-[34px] text-center">40</span>
                                                                        <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 hover:text-gray-600 cursor-pointer transition-all shadow-sm"><span className="material-symbols-outlined text-[18px]">add</span></div>
                                                                    </div>
                                                                </div>

                                                                {/* List Items Bottom Space */}
                                                                <div className="px-8 py-5 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">List Items Bottom Space</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-accent/20 border border-gray-200 dark:border-border rounded-[22px] p-[3px] shadow-sm">
                                                                        <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 hover:text-gray-600 cursor-pointer transition-all shadow-sm"><span className="material-symbols-outlined text-[18px]">remove</span></div>
                                                                        <span className="text-[15px] font-bold text-gray-600 dark:text-foreground min-w-[34px] text-center">15</span>
                                                                        <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 hover:text-gray-600 cursor-pointer transition-all shadow-sm"><span className="material-symbols-outlined text-[18px]">add</span></div>
                                                                    </div>
                                                                </div>

                                                                {/* Margins Above and Below Lists */}
                                                                <div className="px-8 py-5 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">Margins Above and Below Lists</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-accent/20 border border-gray-200 dark:border-border rounded-[22px] p-[3px] shadow-sm">
                                                                        <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 hover:text-gray-600 cursor-pointer transition-all shadow-sm"><span className="material-symbols-outlined text-[18px]">remove</span></div>
                                                                        <span className="text-[15px] font-bold text-gray-600 dark:text-foreground min-w-[34px] text-center">15</span>
                                                                        <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 hover:text-gray-600 cursor-pointer transition-all shadow-sm"><span className="material-symbols-outlined text-[18px]">add</span></div>
                                                                    </div>
                                                                </div>

                                                                {/* List Markers Color */}
                                                                <div className="px-8 py-5 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">List Markers Color</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="flex bg-gray-50 style-control dark:bg-accent/20 border border-gray-200 dark:border-border rounded-[18px] p-[3.5px] shadow-sm gap-1">
                                                                            <div className="h-9 w-11 flex items-center justify-center bg-white dark:bg-background text-gray-500 rounded-xl shadow-sm cursor-pointer border-2 border-[#10b981]"><span className="material-symbols-outlined text-[20px] text-green-600">format_list_bulleted</span></div>
                                                                            <div className="h-9 w-11 flex items-center justify-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"><span className="material-symbols-outlined text-[20px]">format_list_numbered</span></div>
                                                                        </div>
                                                                        <div className="h-[40px] px-5 rounded-[20px] bg-[#333333] flex items-center justify-center text-[13.5px] font-bold text-white shadow-sm cursor-pointer min-w-[100px] uppercase">#333333</div>
                                                                    </div>
                                                                </div>

                                                                {/* Default Structure Padding on Desktop */}
                                                                <div className="px-8 py-5">
                                                                    <div className="flex items-center gap-2 mb-8">
                                                                        <span className="text-[14px] font-medium text-gray-500 dark:text-foreground/70">Default Structure Padding on Desktop</span>
                                                                        <TooltipProvider><Tooltip><TooltipTrigger className="flex items-center"><span className="material-symbols-outlined text-[20px] text-gray-300 hover:text-gray-400 transition-colors">help</span></TooltipTrigger><TooltipContent className="max-w-[280px]">Default padding for all structure elements when viewed on desktop screens.</TooltipContent></Tooltip></TooltipProvider>
                                                                    </div>

                                                                    {/* Padding Grid Control */}
                                                                    <div className="relative w-full h-[220px] flex items-center justify-center bg-white dark:bg-background/20 rounded-3xl border border-gray-50 dark:border-white/5 py-4">
                                                                        {/* Top */}
                                                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                                                                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-accent/20 border border-gray-100 dark:border-border rounded-full p-[2px] shadow-sm">
                                                                                <div className="w-7 h-7 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 shadow-sm"><span className="material-symbols-outlined text-[16px]">remove</span></div>
                                                                                <span className="text-[13px] font-bold text-gray-600 dark:text-foreground min-w-[24px] text-center">20</span>
                                                                                <div className="w-7 h-7 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 shadow-sm"><span className="material-symbols-outlined text-[16px]">add</span></div>
                                                                            </div>
                                                                        </div>

                                                                        {/* Vertical Gray Connection Lines */}
                                                                        <div className="absolute top-[40px] bottom-[40px] left-1/2 -translate-x-1/2 w-[1.5px] bg-gray-100 dark:bg-white/5"></div>
                                                                        {/* Horizontal Gray Connection Lines */}
                                                                        <div className="absolute left-[30px] right-[30px] top-1/2 -translate-y-1/2 h-[1.5px] bg-gray-100 dark:bg-white/5"></div>

                                                                        {/* Center Lock Icon */}
                                                                        <div className="z-20 bg-white dark:bg-background border border-gray-200 dark:border-border p-3.5 rounded-[18px] shadow-sm text-gray-400 flex items-center justify-center">
                                                                            <span className="material-symbols-outlined text-[22px]">lock</span>
                                                                        </div>

                                                                        {/* Left */}
                                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                                                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-accent/20 border border-gray-100 dark:border-border rounded-full p-[2px] shadow-sm">
                                                                                <div className="w-7 h-7 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 shadow-sm"><span className="material-symbols-outlined text-[16px]">remove</span></div>
                                                                                <span className="text-[13px] font-bold text-gray-600 dark:text-foreground min-w-[24px] text-center">20</span>
                                                                                <div className="w-7 h-7 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 shadow-sm"><span className="material-symbols-outlined text-[16px]">add</span></div>
                                                                            </div>
                                                                        </div>

                                                                        {/* Right */}
                                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                                                                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-accent/20 border border-gray-100 dark:border-border rounded-full p-[2px] shadow-sm">
                                                                                <div className="w-7 h-7 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 shadow-sm"><span className="material-symbols-outlined text-[16px]">remove</span></div>
                                                                                <span className="text-[13px] font-bold text-gray-600 dark:text-foreground min-w-[24px] text-center">165</span>
                                                                                <div className="w-7 h-7 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 shadow-sm"><span className="material-symbols-outlined text-[16px]">add</span></div>
                                                                            </div>
                                                                        </div>

                                                                        {/* Bottom */}
                                                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                                                                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-accent/20 border border-gray-100 dark:border-border rounded-full p-[2px] shadow-sm">
                                                                                <div className="w-7 h-7 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 shadow-sm"><span className="material-symbols-outlined text-[16px]">remove</span></div>
                                                                                <span className="text-[13px] font-bold text-gray-600 dark:text-foreground min-w-[24px] text-center">0</span>
                                                                                <div className="w-7 h-7 flex items-center justify-center bg-white dark:bg-background rounded-full text-gray-400 shadow-sm"><span className="material-symbols-outlined text-[16px]">add</span></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center h-full pt-20 text-center px-10">
                                                                <span className="material-symbols-outlined text-[48px] text-gray-200 mb-4 tracking-tighter">design_services</span>
                                                                <h3 className="text-[18px] font-semibold text-gray-700 dark:text-foreground mb-2">{selectedGeneralStyle}</h3>
                                                                <p className="text-[14px] text-gray-400 leading-relaxed">Detailed settings for this category are currently under development.</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className="w-full relative transition-all duration-500 ease-in-out"
                                                    style={{
                                                        height: isGeneralHovered ? '220px' : '110px',
                                                        paddingTop: '8px'
                                                    }}
                                                    onMouseEnter={() => setIsGeneralHovered(true)}
                                                    onMouseLeave={() => setIsGeneralHovered(false)}
                                                >
                                                    {[
                                                        'Global Styles & Layout',
                                                        'Stripe Styles',
                                                        'Heading Styles',
                                                        'Button Styles'
                                                    ].map((text, idx) => (
                                                        <div
                                                            key={text}
                                                            onClick={() => setSelectedGeneralStyle(text)}
                                                            className={`bg-gradient-to-b from-white to-[#f9fafb] dark:from-accent/60 dark:to-accent/40 rounded-[28px] border border-gray-200/80 dark:border-border/40 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 ease-out group active:scale-[0.98] absolute h-[52px] overflow-hidden`}
                                                            style={{
                                                                top: idx === 0 ? '0px' : (isGeneralHovered ? `${idx * 42}px` : `${idx * 14}px`),
                                                                zIndex: 40 - idx,
                                                                width: 'calc(100% - 4px)',
                                                                left: '2px'
                                                            }}
                                                        >
                                                            <span className={`text-[15.5px] font-bold text-gray-700 dark:text-foreground/90 group-hover:text-primary transition-all duration-300 tracking-tight ${!isGeneralHovered && idx > 0 ? 'opacity-0' : 'opacity-100'}`}>
                                                                {text}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Code Editor Slide-Up Slider (Full Screen Width Overlay) */}
            <div className={`absolute bottom-0 left-0 w-full bg-[#1e1e1e] border-t border-[#333333] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-[100] ${isCodeEditorOpen ? 'translate-y-0' : 'translate-y-full'}`} style={{ height: `${editorHeight}px` }}>
                {/* Toolbar / Drag Handle */}
                <div
                    className="h-8 bg-[#333333] flex flex-shrink-0 items-center justify-between px-2 w-full text-gray-300 cursor-row-resize select-none border-b border-[#222]"
                    onMouseDown={handleDragStart}
                >
                    <div className="flex items-center h-full cursor-default" onMouseDown={(e) => e.stopPropagation()}>
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-[22px] w-[22px] rounded-full mx-1 hover:bg-white/10 text-gray-300" onClick={() => setIsCodeEditorOpen(false)}>
                                        <X className="w-[14px] h-[14px]" strokeWidth={2.5} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="z-[200]">Close</TooltipContent>
                            </Tooltip>
                            <div className="w-[1px] h-full bg-white/10" />
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-[22px] w-[22px] rounded-full mx-1 hover:bg-white/10 text-gray-300">
                                        <Crosshair className="w-[14px] h-[14px]" strokeWidth={2.5} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="z-[200] max-w-[220px] text-center p-3 border-border shadow-xl">
                                    <p className="font-semibold text-foreground mb-1 text-[13px]">Inspect Mode</p>
                                    <p className="text-xs text-muted-foreground whitespace-normal leading-relaxed">Click on any element in the visual editor to see its code</p>
                                </TooltipContent>
                            </Tooltip>
                            <div className="w-[1px] h-full bg-white/10" />
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-[22px] w-[22px] rounded-full mx-1 hover:bg-white/10 text-gray-300">
                                        <Maximize className="w-[14px] h-[14px]" strokeWidth={2.5} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="z-[200] max-w-[220px] text-center p-3 border-border shadow-xl">
                                    <p className="font-semibold text-foreground mb-1 text-[13px]">Focus Mode</p>
                                    <p className="text-xs text-muted-foreground whitespace-normal leading-relaxed">Place the cursor on any line of the code to see the element in the visual editor</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className="flex-1 flex justify-center text-[11px] font-medium tracking-wide text-gray-400 gap-1 items-center">
                        <span className="opacity-50 tracking-widest">:::</span> Code Editor <span className="opacity-50 tracking-widest">:::</span>
                    </div>

                    <div className="flex items-center h-full text-[13px] font-medium cursor-default" onMouseDown={(e) => e.stopPropagation()}>
                        <div onClick={() => setIsDefaultCssOpen(!isDefaultCssOpen)} className={`px-4 h-full flex items-center transition-colors cursor-pointer ${isDefaultCssOpen ? 'bg-[#444444] text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-[#333]'}`}>Default CSS</div>
                        <div onClick={() => setIsCustomCssOpen(!isCustomCssOpen)} className={`px-4 h-full flex items-center transition-colors cursor-pointer ${isCustomCssOpen ? 'bg-[#444444] text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-[#333]'}`}>Custom CSS</div>
                    </div>
                </div>

                {/* Resizable 3-Pane Body */}
                <div className="flex-1 flex overflow-hidden relative">
                    <PanelGroup orientation="horizontal">

                        {/* HTML Pane */}
                        <Panel defaultSize={isDefaultCssOpen || isCustomCssOpen ? 50 : 100} minSize={20} className="h-full relative flex flex-col">
                            <Editor
                                height="100%"
                                language="html"
                                theme="vs-dark"
                                options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
                                value={`<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>New message</title>
</head>
<body class="body">
    <!-- Email content wrapper -->
</body>
</html>`}
                            />
                        </Panel>

                        {isDefaultCssOpen && (
                            <>
                                <PanelResizeHandle className="w-[6px] bg-[#222] hover:bg-[#444] active:bg-[#007acc] transition-colors cursor-col-resize flex flex-col justify-center items-center group z-50">
                                    <div className="h-10 w-[2px] bg-white/20 rounded-full group-hover:bg-white/40" />
                                </PanelResizeHandle>

                                {/* Default CSS Pane */}
                                <Panel defaultSize={25} minSize={15} className="h-full relative group flex flex-col bg-[#1e1e1e]">
                                    <div className="absolute top-2 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="sm" onClick={() => { setIsCustomCssOpen(true); }} className="bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-full h-7 px-4 text-[12px] font-medium shadow-md transition-transform active:scale-95">
                                            Override
                                        </Button>
                                    </div>
                                    <Editor
                                        height="100%"
                                        language="css"
                                        theme="vs-dark"
                                        options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on', readOnly: true }}
                                        value={`/* CONFIG STYLES Please do not delete and edit CSS styles below */
/* IMPORTANT THIS STYLES MUST BE ON FINAL EMAIL */
.rollover:hover .rollover-first {
  max-height: 0px !important;
  display: none !important;
}
.rollover:hover .rollover-second {
  max-height: none !important;
  display: block !important;
}
.rollover span {
  font-size: 0px;
}
u + .body img ~ div div {
  display: none;
}
#outlook a {
  padding: 0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color: inherit;
  mso-style-priority: 99;
}
a.es-button {
  mso-style-priority: 100 !important;
  text-decoration: none !important;
}
a[x-apple-data-detectors],
#MessageViewBody a {
  color: inherit !important;
  text-decoration: none !important;
  font-size: inherit !important;
  font-family: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important;
}
.es-desk-hidden {
  display: none;
  float: left;
  overflow: hidden;
  width: 0;
  max-height: 0;
  line-height: 0;
  mso-hide: all;
}
/*
  END OF IMPORTANT
*/`}
                                    />
                                </Panel>
                            </>
                        )}

                        {isCustomCssOpen && (
                            <>
                                <PanelResizeHandle className="w-[6px] bg-[#222] hover:bg-[#444] active:bg-[#007acc] transition-colors cursor-col-resize flex flex-col justify-center items-center group z-50">
                                    <div className="h-10 w-[2px] bg-white/20 rounded-full group-hover:bg-white/40" />
                                </PanelResizeHandle>

                                {/* Custom CSS Pane */}
                                <Panel defaultSize={25} minSize={15} className="h-full relative flex flex-col bg-[#1e1e1e]">
                                    <Editor
                                        height="100%"
                                        language="css"
                                        theme="vs-dark"
                                        options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
                                        value={""}
                                    />

                                    {/* Floating Apply Action */}
                                    <div className="absolute bottom-6 right-6 z-10">
                                        <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-full px-6 shadow-xl font-medium tracking-wide">
                                            Apply the Code
                                        </Button>
                                    </div>
                                </Panel>
                            </>
                        )}

                    </PanelGroup>
                </div>
            </div>
            {/* Custom Drag Ghost for Tools (solves native transparency/edge bugs) */}
            {
                draggingTool && dragPos && (
                    <div
                        className="fixed pointer-events-none z-[99999] w-12 h-12 aspect-square bg-white dark:bg-background border-[2px] border-primary rounded-[16px] flex items-center justify-center text-primary shadow-2xl overflow-hidden"
                        style={{
                            left: dragPos.x - 24 + 'px',
                            top: dragPos.y - 24 + 'px',
                        }}
                    >
                        {draggingTool.icon === 'layout' ? (
                            <LayoutIcon size={22} />
                        ) : (
                            <span className="material-symbols-outlined text-[24px] leading-none select-none">{draggingTool.icon}</span>
                        )}
                    </div>
                )
            }
        </div >
    );
}
