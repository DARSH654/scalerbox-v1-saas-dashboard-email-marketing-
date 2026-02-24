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

const CustomHeading = Heading.extend({
    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level);
        const level = hasLevel ? node.attrs.level : this.options.levels[0];
        let inlineStyle = '';
        switch (level) {
            case 1: inlineStyle = 'font-size: 32px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            case 2: inlineStyle = 'font-size: 24px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            case 3: inlineStyle = 'font-size: 20px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            case 4: inlineStyle = 'font-size: 18px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            case 5: inlineStyle = 'font-size: 16px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            case 6: inlineStyle = 'font-size: 14px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
            default: inlineStyle = 'font-size: 32px; font-weight: bold; margin: 0; line-height: 1.2;'; break;
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
        content: '<p>Type your text and work on its text styles, add merge tags and lists</p>',
        onFocus: ({ editor }) => onEditorFocus(editor),
        onBlur: ({ editor }) => onEditorBlur(editor),
        onTransaction: ({ editor }) => onTransaction(editor),
    });

    useEffect(() => {
        if (isSelected && editor) {
            onEditorFocus(editor);
        }
    }, [isSelected, editor, onEditorFocus]);

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

export default function EmailEditorPage() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [title, setTitle] = useState("new message");
    const [subjectText, setSubjectText] = useState("😌");
    const [preheaderText, setPreheaderText] = useState("");
    const [isGmailAnnotationEnabled, setIsGmailAnnotationEnabled] = useState(false);
    const [isSenderLogoEnabled, setIsSenderLogoEnabled] = useState(false);
    const [isCodeEditorOpen, setIsCodeEditorOpen] = useState(false);
    const [editorHeight, setEditorHeight] = useState(320);
    const [isDefaultCssOpen, setIsDefaultCssOpen] = useState(false);
    const [isCustomCssOpen, setIsCustomCssOpen] = useState(false);
    const [isStructuresPanelOpen, setIsStructuresPanelOpen] = useState(false);
    const [isStructuresPanelClosing, setIsStructuresPanelClosing] = useState(false);
    const [structuresTab, setStructuresTab] = useState<'general' | 'current-layout' | 'my-modules'>('general');
    const structuresPanelRef = useRef<HTMLDivElement>(null);
    const [structuresPanelPosition, setStructuresPanelPosition] = useState<'left' | 'right'>('left');
    const [isDraggingStructures, setIsDraggingStructures] = useState(false);
    const [isDragOverRight, setIsDragOverRight] = useState(false);
    const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
    const [draggingTool, setDraggingTool] = useState<{ icon: string; type?: string; component?: string; columns?: number[] } | null>(null);
    const [dynamicRows, setDynamicRows] = useState<{ id: string; columns: number[] }[]>([]);
    const wasDraggingRef = useRef(false);

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

    // Add state for Canvas elements (simplified for these specific boxes)
    const [boxStatesInternal, setBoxStatesInternal] = useState<Record<string, string>>({
        box1: 'empty',
        box2: 'empty',
        box3: 'empty',
        box4: 'empty',
        box5: 'empty',
    });
    const [draggedOverBox, setDraggedOverBox] = useState<string | null>(null);
    const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
    const [selectedLayer, setSelectedLayer] = useState<'block' | 'container' | 'structure' | 'stripe' | null>(null);

    // Text Block Properties State
    const [textPropertiesTab, setTextPropertiesTab] = useState<'settings' | 'styles'>('settings');
    const [boxProperties, setBoxProperties] = useState<Record<string, Record<string, any>>>({});
    const [activeEditor, setActiveEditor] = useState<any>(null);
    const [editorUpdateTicker, setEditorUpdateTicker] = useState(0);

    const [history, setHistory] = useState<Record<string, string>[]>([
        { box1: 'empty', box2: 'empty', box3: 'empty', box4: 'empty', box5: 'empty' }
    ]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const boxStates = boxStatesInternal;

    const setBoxStates = (action: any) => {
        setBoxStatesInternal((prevBoxStates) => {
            const nextBoxStates = typeof action === 'function' ? action(prevBoxStates) : action;
            if (JSON.stringify(nextBoxStates) !== JSON.stringify(prevBoxStates)) {
                setHistory((prev) => {
                    const next = prev.slice(0, historyIndex + 1);
                    next.push(nextBoxStates);
                    return next;
                });
                setHistoryIndex(prev => prev + 1);
            }
            return nextBoxStates;
        });
    };

    const handleUndo = () => {
        if (historyIndex > 0) {
            const nextIndex = historyIndex - 1;
            setHistoryIndex(nextIndex);
            setBoxStatesInternal(history[nextIndex]);
            setSelectedBoxId(null);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const nextIndex = historyIndex + 1;
            setHistoryIndex(nextIndex);
            setBoxStatesInternal(history[nextIndex]);
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
        setBoxStates((prev: Record<string, string>) => ({ ...prev, [boxId]: type }));
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

    const ContainerOverlay = ({ boxId, isSelected, selectedLayer }: { boxId: string, isSelected: boolean, selectedLayer: string | null }) => {
        const isTopRow = boxId === 'box1' || boxId === 'box2';

        // Colors from user requirements
        const colors = {
            block: '#4b5b75',     // Requested Gray-Blue
            container: '#60a5fa', // Sky Blue (blue-400)
            structure: '#800000', // Maroon
            stripe: '#22c55e'    // Green
        };

        const activeColor = selectedLayer ? colors[selectedLayer as keyof typeof colors] : colors.container;

        return (
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isSelected ? 'opacity-100 z-40' : 'opacity-0 z-30 group-hover:opacity-100 group-hover/active:opacity-100'}`}>
                {/* Layer Labels (Breadcrumb-like) */}
                <div className={`absolute ${isTopRow ? '-bottom-[36px]' : '-top-[36px]'} left-0 flex gap-1 pointer-events-auto`}>
                    {[
                        { id: 'stripe', label: 'Stripe', color: colors.stripe },
                        { id: 'structure', label: 'Structure', color: colors.structure },
                        { id: 'container', label: 'Container', color: colors.container },
                        { id: 'block', label: 'Block', color: colors.block }
                    ].map((layer) => (
                        layer.id === 'block' || layer.id === 'container' ? (
                            <div
                                key={layer.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedBoxId(boxId);
                                    setSelectedLayer(layer.id as any);
                                }}
                                style={{
                                    backgroundColor: selectedLayer === layer.id ? layer.color : 'transparent',
                                    color: selectedLayer === layer.id ? 'white' : layer.color,
                                    borderColor: layer.color
                                }}
                                className={`px-3 py-0.5 rounded-full border-[1.5px] text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${selectedLayer === layer.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                            >
                                {layer.label}
                            </div>
                        ) : null // Hide structure and stripe for now as requested
                    ))}
                </div>

                {/* Delete Menu - The three dot / delete icon box - now shrunk as requested */}
                <div
                    style={{ backgroundColor: colors.container }}
                    className="absolute top-1/2 -translate-y-1/2 -left-[44px] text-white rounded-[12px] w-[36px] h-[36px] flex items-center justify-center pointer-events-auto cursor-pointer shadow-md hover:scale-105 transition-transform group/btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setBoxStates((prev: Record<string, string>) => ({ ...prev, [boxId]: 'empty' }));
                    }}
                >
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center justify-center w-full h-full relative">
                                    <div className="flex items-center justify-center gap-[4px] absolute transition-opacity duration-200 group-hover/btn:opacity-0 opacity-100">
                                        <div className="w-[4.5px] h-[4.5px] rounded-full bg-white"></div>
                                        <div className="w-[4.5px] h-[4.5px] rounded-full bg-white"></div>
                                        <div className="w-[4.5px] h-[4.5px] rounded-full bg-white"></div>
                                    </div>
                                    <span className="material-symbols-outlined text-[20px] absolute transition-opacity duration-200 group-hover/btn:opacity-100 opacity-0">delete_outline</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" sideOffset={12}>Clear container</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        );
    };

    const renderBoxContent = (state: string, boxId: string) => {
        const isSelected = selectedBoxId === boxId;

        if (state === 'image') {
            return (
                <div
                    className={`w-full h-full relative border-[2px] rounded-[8px] bg-[#f9fafb] flex items-center justify-center transition-all group/container cursor-pointer ${isSelected && selectedLayer === 'container' ? 'border-blue-400 z-40' : 'border-blue-400/20 hover:border-blue-400/40'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBoxId(boxId);
                        setSelectedLayer('container');
                    }}
                >
                    <ContainerOverlay boxId={boxId} isSelected={isSelected} selectedLayer={selectedLayer} />
                    <div
                        className={`flex-1 h-full flex items-center justify-center transition-all ${isSelected && selectedLayer === 'block' ? 'border-[2px] border-[#4b5b75] rounded-[4px] m-[2px]' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBoxId(boxId);
                            setSelectedLayer('block');
                        }}
                    >
                        <span className="material-symbols-outlined text-[24px] text-gray-400">image</span>
                    </div>
                </div>
            );
        }

        if (state === 'text') {
            return (
                <div
                    className={`w-full h-full relative border-[2px] rounded-[8px] bg-white transition-all group/container cursor-text flex flex-col ${isSelected && selectedLayer === 'container' ? 'border-blue-400 z-40' : 'border-blue-400/10 hover:border-blue-400/30'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBoxId(boxId);
                        setSelectedLayer('container');
                    }}
                >
                    <ContainerOverlay boxId={boxId} isSelected={isSelected} selectedLayer={selectedLayer} />
                    <div
                        className={`flex-1 m-[2px] p-3 transition-all ${isSelected && selectedLayer === 'block' ? 'border-[2px] border-[#4b5b75] rounded-[4px]' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBoxId(boxId);
                            setSelectedLayer('block');
                        }}
                    >
                        <RichTextEditor
                            boxId={boxId}
                            isSelected={isSelected && selectedLayer === 'block'}
                            boxProperties={boxProperties[boxId]}
                            onEditorFocus={(editor: any) => setActiveEditor(editor)}
                            onEditorBlur={() => { }}
                            onTransaction={(editor: any) => {
                                if (activeEditor === editor) setEditorUpdateTicker(t => t + 1);
                            }}
                        />
                    </div>
                </div>
            );
        }

        if (state === 'button') {
            return (
                <div
                    className={`w-full py-5 relative border-[2px] rounded-[8px] bg-white flex items-center justify-center transition-all group/container cursor-pointer ${isSelected && selectedLayer === 'container' ? 'border-blue-400 z-40' : 'border-blue-400/10 hover:border-blue-400/30'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBoxId(boxId);
                        setSelectedLayer('container');
                    }}
                >
                    <ContainerOverlay boxId={boxId} isSelected={isSelected} selectedLayer={selectedLayer} />
                    <div
                        className={`px-8 py-2 transition-all ${isSelected && selectedLayer === 'block' ? 'border-[2px] border-[#4b5b75] rounded-[4px]' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBoxId(boxId);
                            setSelectedLayer('block');
                        }}
                    >
                        <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-2.5 rounded-[12px] font-medium text-[15px] transition-colors border shadow-sm pointer-events-none">
                            Button
                        </button>
                    </div>
                </div>
            );
        }

        const isDragOver = draggedOverBox === boxId;

        // Default empty state
        return (
            <div
                className={`w-full h-full group border-[2px] rounded-[8px] flex flex-col items-center justify-center cursor-pointer relative transition-all duration-300 ${isSelected ? 'border-solid border-blue-400 bg-blue-50/50 text-blue-500/90' : (isDragOver ? 'border-solid border-blue-400 bg-blue-50 dark:bg-blue-900/40 text-blue-500' : 'border-dashed border-blue-400/20 hover:border-solid hover:border-blue-400/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-[#f0f7ff] dark:bg-blue-900/10 text-blue-400')}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBoxId(boxId);
                    setSelectedLayer('container');
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.types.includes('application/tool-type')) {
                        e.dataTransfer.dropEffect = 'copy';
                        if (draggedOverBox !== boxId) setDraggedOverBox(boxId);
                    }
                }}
                onDragLeave={(e) => {
                    setDraggedOverBox(null);
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    setDraggedOverBox(null);
                    const toolType = e.dataTransfer.getData('application/tool-type');
                    if (toolType === 'image' || toolType === 'text' || toolType === 'button') {
                        setBoxStates((prev: Record<string, string>) => ({ ...prev, [boxId]: toolType }));
                        setSelectedBoxId(boxId);
                        setSelectedLayer('block');
                    }
                }}
            >
                <ContainerOverlay boxId={boxId} isSelected={isSelected} selectedLayer={selectedLayer} />
                {isDragOver ? (
                    <div className="bg-blue-500 text-white px-5 py-2 rounded-full shadow-md transition-all scale-105 flex items-center gap-2 pointer-events-none">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        <span className="text-[13px] font-medium">Drop here</span>
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
        <div className="fixed inset-0 z-[40] h-full w-full flex flex-col overflow-hidden bg-[#f3f4f6] dark:bg-background">
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

            <div className="flex-1 overflow-hidden relative w-full h-full flex bg-[#f3f4f6] dark:bg-background">

                {/* Sidebar Toolbar Area */}
                <div className={`${structuresPanelPosition === 'right' ? 'absolute right-[9px] top-0 h-full z-30' : 'relative'} w-[72px] h-full flex-shrink-0 flex flex-col items-center pt-[20px] pb-4 z-30`}>

                    {/* Combined Toolbar Area (for ghost and drag boundary) */}
                    <div id="left-toolbar-container" className="w-[60px] h-full flex flex-col items-center gap-4 relative">
                        {isDraggingStructures && (
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
                        className={`absolute ${structuresPanelPosition === 'right' ? 'right-[6px]' : 'left-[6px]'} top-[6px] w-[480px] z-50 ${isStructuresPanelClosing ? 'structures-panel-close' : 'structures-panel-open'} transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]`}
                        style={{ height: 'calc(100% - 12px)' }}
                    >
                        <div className="h-full w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[24px] shadow-xl flex flex-col overflow-hidden">

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

                                            {/* Tab 4: Extensions */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        className="h-[40px] flex-1 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 text-gray-400 dark:text-muted-foreground hover:text-gray-600 dark:hover:text-gray-300"
                                                    >
                                                        <span className="material-symbols-outlined text-[22px]">apps</span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>Extensions</TooltipContent>
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
                    className={`flex-1 relative flex flex-col py-6 ${structuresPanelPosition === 'right' ? 'pr-[90px] pl-[384px]' : 'pl-6 pr-[384px]'} overflow-y-auto h-full items-center [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full`}
                    onClick={() => setSelectedBoxId(null)}
                >

                    {/* The Canvas Page Layout Block */}
                    <div
                        className={`w-full max-w-[750px] bg-white dark:bg-accent shadow-sm flex flex-col p-8 gap-6 relative transition-all duration-300`}
                        onClick={(e) => e.stopPropagation()}
                        onDragOver={(e) => {
                            if (draggingTool?.type === 'layout') {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = 'copy';
                            }
                        }}
                        onDrop={(e) => {
                            if (draggingTool?.type === 'layout' && draggingTool.columns) {
                                e.preventDefault();
                                const newRowId = `row-${Date.now()}`;
                                setDynamicRows(prev => [...prev, { id: newRowId, columns: draggingTool.columns! }]);
                            }
                        }}
                    >
                        {/* Row 1 */}
                        <div className="flex gap-4 h-[120px]">
                            <div className="w-[30%]">
                                {renderBoxContent(boxStates.box1, 'box1')}
                            </div>
                            <div className="w-[70%]">
                                {renderBoxContent(boxStates.box2, 'box2')}
                            </div>
                        </div>

                        {/* Row 2 (Full Width) */}
                        <div className="flex gap-4 h-[120px]">
                            <div className="w-full">
                                {renderBoxContent(boxStates.box3, 'box3')}
                            </div>
                        </div>

                        {/* Row 3 (50/50) */}
                        <div className="flex gap-4 h-[140px]">
                            <div className="w-1/2">
                                {renderBoxContent(boxStates.box4, 'box4')}
                            </div>
                            <div className="w-1/2">
                                {renderBoxContent(boxStates.box5, 'box5')}
                            </div>
                        </div>

                        {/* Dynamic Rendered Rows from Drop */}
                        {dynamicRows.map(row => (
                            <div key={row.id} className="flex gap-4 h-[120px] w-full">
                                {row.columns.map((colFrac, i) => (
                                    <div key={i} style={{ flex: colFrac }} className="h-full">
                                        {renderBoxContent(boxStatesInternal[`${row.id}-col${i}`] || 'empty', `${row.id}-col${i}`)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>


                </div>

                {/* Right Sidebar Property Panel */}
                <div
                    className={`absolute ${structuresPanelPosition === 'right' ? 'left-0' : 'right-0'} top-0 w-[360px] h-full flex flex-col z-10 p-4 ${structuresPanelPosition === 'right' ? 'pr-0' : 'pl-0'} pointer-events-none transition-all ${isDraggingStructures ? 'z-[60]' : ''}`}
                    onDragOver={(e) => {
                        if (!isDraggingStructures) return;
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
                    {isDraggingStructures && (
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
                        {selectedBoxId && selectedLayer === 'block' && boxStates[selectedBoxId] === 'text' ? (
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
                                                                className={`flex-1 h-[38px] flex items-center justify-center text-[13px] font-medium cursor-pointer transition-colors ${i < arr.length - 1 ? 'border-r-[1.5px] border-gray-200 dark:border-border' : ''} ${isActive ? 'border-[2px] border-[#10b981] text-[#10b981] bg-[#10b981]/10 rounded-[8px] m-[-1.5px] z-10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}
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
                                                                className={`flex-1 h-[38px] flex items-center justify-center text-[16px] cursor-pointer transition-colors ${i < arr.length - 1 ? 'border-r-[1.5px] border-gray-200 dark:border-border' : ''} ${isActive ? 'bg-gray-100 dark:bg-white/10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}
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
                                                            const isActive = activeEditor ? activeEditor.isActive({ textAlign: item.id }) : (!boxProperties[selectedBoxId]?.textAlign && item.id === 'left');
                                                            return (
                                                                <div
                                                                    key={item.id}
                                                                    className={`flex-1 h-[38px] flex items-center justify-center cursor-pointer transition-colors ${i < arr.length - 1 ? 'border-r-[1.5px] border-gray-200 dark:border-border' : ''} ${isActive ? 'border-[2px] border-[#10b981] text-[#10b981] bg-[#10b981]/10 rounded-[8px] m-[-1.5px] z-10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}
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
                                                <div className="h-[38px] px-4 w-[90px] border-[1.5px] border-gray-200 dark:border-border rounded-full flex items-center justify-between bg-white dark:bg-background cursor-pointer hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
                                                    <span className="text-[14px] text-gray-700 dark:text-gray-200 font-medium">{boxProperties[selectedBoxId]?.fontSize || '14'}</span>
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
                                                            onClick={() => setBoxProperties(prev => ({ ...prev, [selectedBoxId]: { ...(prev[selectedBoxId] || {}), lineHeight: Math.max(1, (prev[selectedBoxId]?.lineHeight || 1.5) - 0.1) } }))}
                                                        >remove</span>
                                                        <span className="text-[14px] text-gray-700 dark:text-gray-200 font-medium">{(boxProperties[selectedBoxId]?.lineHeight || 1.5).toFixed(1)}</span>
                                                        <span
                                                            className="material-symbols-outlined text-[18px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-colors"
                                                            onClick={() => setBoxProperties(prev => ({ ...prev, [selectedBoxId]: { ...(prev[selectedBoxId] || {}), lineHeight: (prev[selectedBoxId]?.lineHeight || 1.5) + 0.1 } }))}
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
                                                <div className="flex-1 h-full flex justify-center items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">chrome_reader_mode</span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>General Styles</TooltipContent>
                                        </Tooltip>

                                        {/* Tab 2: Message Settings (Active) */}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex-[1.1] h-[44px] flex justify-center items-center bg-white dark:bg-background rounded-[22px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-gray-700 dark:text-foreground cursor-pointer transition-all">
                                                    <span className="material-symbols-outlined text-[20px]">chat_bubble_outline</span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>Message Settings</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                                {/* Separate Content Area Card */}
                                <div className="flex-1 bg-white dark:bg-background rounded-[24px] shadow-sm flex flex-col overflow-hidden">
                                    <div className="flex-1 overflow-y-auto p-5 space-y-7 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:rounded-full">

                                        {/* Subject / Title */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-[13px] text-gray-500 dark:text-foreground/80 pl-1 tracking-wide">Subject / Title</label>
                                            <div className="relative bg-[#f1f5f9] dark:bg-accent/30 rounded-[16px] p-4 pb-10 min-h-[140px] transition-colors focus-within:ring-2 focus-within:ring-primary shadow-inner overflow-hidden group">
                                                <textarea
                                                    value={subjectText}
                                                    onChange={(e) => setSubjectText(e.target.value)}
                                                    placeholder="65 characters recommended"
                                                    className="w-[calc(100%-30px)] bg-transparent border-none outline-none text-[15px] resize-none text-gray-800 dark:text-foreground font-medium placeholder:text-gray-400"
                                                    rows={3}
                                                />
                                                <div className="absolute top-3 right-3 text-[#10b981] dark:text-[#10b981] hover:opacity-80 transition-opacity cursor-pointer flex flex-col gap-3 items-center">
                                                    <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
                                                    <div className="bg-white dark:bg-background rounded-full p-[2px] shadow-sm flex items-center justify-center mt-6">
                                                        <span className="material-symbols-outlined text-[22px] text-gray-600 dark:text-gray-300 hover:text-gray-800 transition-colors">sentiment_satisfied</span>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-3 right-[18px] flex flex-col items-center">
                                                    <span className="text-[13px] text-gray-400 dark:text-gray-500 font-medium tracking-wide">{subjectText.length}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hidden Preheader */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-[13px] text-gray-500 dark:text-foreground/80 pl-1 tracking-wide">Hidden Preheader</label>
                                            <div className="relative bg-[#f1f5f9] dark:bg-accent/30 rounded-[16px] p-4 pb-10 min-h-[140px] transition-colors focus-within:ring-2 focus-within:ring-primary shadow-inner overflow-hidden group">
                                                <textarea
                                                    value={preheaderText}
                                                    onChange={(e) => setPreheaderText(e.target.value)}
                                                    placeholder="50 - 100 characters"
                                                    className="w-[calc(100%-30px)] bg-transparent border-none outline-none text-[14px] resize-none text-gray-800 dark:text-foreground placeholder:text-gray-400"
                                                    rows={3}
                                                />
                                                <div className="absolute top-3 right-3 text-[#10b981] dark:text-[#10b981] hover:opacity-80 transition-opacity cursor-pointer flex flex-col gap-3 items-center">
                                                    <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
                                                    <div className="bg-white dark:bg-background rounded-full p-[2px] shadow-sm flex items-center justify-center mt-1">
                                                        <span className="material-symbols-outlined text-[22px] text-gray-600 dark:text-gray-300 hover:text-gray-800 transition-colors">sentiment_satisfied</span>
                                                    </div>
                                                    <div className="bg-white dark:bg-background rounded-full p-[2px] shadow-sm flex items-center justify-center mt-1">
                                                        <span className="material-symbols-outlined text-[22px] text-gray-500 dark:text-gray-400 hover:text-gray-700 transition-colors rotate-90 scale-x-[-1]">open_in_new</span>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-3 right-[18px] flex flex-col items-center">
                                                    <span className="text-[13px] text-gray-400 dark:text-gray-500 font-medium tracking-wide">{preheaderText.length}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email annotations for Gmail */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between pl-1 pr-1">
                                                <label className="text-[14px] font-medium text-gray-600 dark:text-foreground/80 tracking-wide">Email annotations for Gmail</label>
                                                <div
                                                    onClick={() => setIsGmailAnnotationEnabled(!isGmailAnnotationEnabled)}
                                                    className={`w-[42px] h-[24px] rounded-full relative cursor-pointer shadow-inner transition-colors duration-200 ${isGmailAnnotationEnabled ? 'bg-[#10b981]' : 'bg-gray-200 dark:bg-accent/60 hover:bg-gray-300'}`}
                                                >
                                                    <div className={`w-[20px] h-[20px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform duration-200 ${isGmailAnnotationEnabled ? 'translate-x-[20px]' : 'translate-x-[2px]'}`}></div>
                                                </div>
                                            </div>

                                            {isGmailAnnotationEnabled && (
                                                <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <p className="text-[13.5px] text-gray-400 leading-relaxed px-1">
                                                        This feature lets you showcase your deals, discounts, or offer directly in recipient's inbox before they open the email. Effective on mobile device in Gmail promotion folder.
                                                    </p>

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-[13px] text-gray-500 dark:text-foreground/80 pl-1 tracking-wide">Annotation</label>
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
                                                        <label className="text-sm font-medium text-[13px] text-gray-500 dark:text-foreground/80 pl-1 tracking-wide">Preview</label>
                                                        <div className="w-full h-[100px] bg-[#f8fafc] dark:bg-accent/30 border border-gray-100 dark:border-border rounded-[14px] flex items-center justify-center border-dashed text-gray-400">
                                                            <span className="text-sm font-medium opacity-60">Mobile Preview Wrapper</span>
                                                        </div>
                                                    </div>

                                                    {/* Sender's Logo Toggle */}
                                                    <div className="flex items-center justify-between pl-1 pr-1 pt-2">
                                                        <label className="text-[14px] font-medium text-gray-600 dark:text-foreground/80 tracking-wide">Sender's logo</label>
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
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>                {/* Code Editor Slide-Up Slider (Full Screen Width Overlay) */}
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
