'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from "next/image";
import {
  ChevronDown, ArrowLeft, Trash2, CloudUpload, X as XIcon, ChevronUp,
  Undo, History, Redo, Code, Monitor, Smartphone,
  MonitorSmartphone, ClipboardCheck, Upload, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LayoutIcon = ({ size = 20, className }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill="currentColor" className={className}>
    <path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" />
  </svg>
);

export default function EditorV2Page() {
  const [title, setTitle] = useState("new project");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [structuresTab, setStructuresTab] = useState('general');
  const [isStructuresPanelOpen, setIsStructuresPanelOpen] = useState(true);

  // # RIGHT SIDEBAR STATE
  const [activeRightSidebarTab, setActiveRightSidebarTab] = useState<'message' | 'appearance'>('appearance');
  const [selectedGeneralStyle, setSelectedGeneralStyle] = useState<string | null>(null);
  const [isGeneralHovered, setIsGeneralHovered] = useState(false);
  const [isGmailAnnotationEnabled, setIsGmailAnnotationEnabled] = useState(false);
  const [subjectText, setSubjectText] = useState("");
  const [preheaderText, setPreheaderText] = useState("");
  const [isBgImageEnabled, setIsBgImageEnabled] = useState(false);

  // # TOOL SCROLLING LOGIC STATE & REFS
  const [canToolScrollUp, setCanToolScrollUp] = useState(false);
  const [canToolScrollDown, setCanToolScrollDown] = useState(false);
  const toolScrollRef = useRef<HTMLDivElement>(null);
  const toolScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // # TOOL SCROLLING HANDLERS
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

  // # TOOL SCROLLING OBSERVER
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
      if (toolScrollIntervalRef.current) clearInterval(toolScrollIntervalRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[40] h-full w-full flex flex-col overflow-hidden bg-[#f3f4f6] dark:bg-background font-sans">
      <TooltipProvider delayDuration={0}>

        {/* # NAVIGATION BAR BLOCK */}
        <header className="h-[56px] border-b px-3 flex items-center justify-between bg-white dark:bg-background z-10 relative shrink-0">

          {/* # LEFT SECTION: LOGO, BACK, TITLE, ACTIONS */}
          <div className="flex items-center gap-3">
            {/* # LOGO & NAVIGATION MENU */}
            <DropdownMenu onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-0 p-[2px] pr-0 hover:bg-accent/10 rounded-md h-auto focus-visible:ring-0">
                  <Image
                    src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-auto min-w-[190px] mt-1 z-[200]">
                <DropdownMenuItem className="cursor-pointer">Home</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* # BACK BUTTON */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-[36px] w-[36px] rounded-full text-muted-foreground hover:text-foreground pr-0.5">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Back</TooltipContent>
            </Tooltip>

            {/* # TITLE PILL */}
            <div className="flex items-center bg-gray-100 dark:bg-accent/50 hover:bg-gray-200 dark:hover:bg-accent/70 transition-colors rounded-full pl-4 pr-1 h-[36px] cursor-text w-[180px] border border-transparent dark:border-border">
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give title..."
                rows={1}
                className="bg-transparent border-none outline-none text-[14px] text-gray-700 dark:text-foreground font-medium w-full placeholder:text-muted-foreground/60 resize-none overflow-hidden h-5 pt-[1px]"
              />
              <div
                className="p-1 hover:bg-gray-300 dark:hover:bg-accent rounded-full cursor-pointer transition-colors ml-1"
                onClick={() => setTitle('')}
              >
                <Trash2 className="w-4 h-4 text-gray-500 dark:text-muted-foreground" />
              </div>
            </div>

            {/* # SAVE ACTIONS */}
            <div className="flex items-center bg-white dark:bg-background border rounded-full shadow-sm h-[36px] overflow-hidden ml-1">
              <Button variant="ghost" className="h-full px-3.5 rounded-none border-r hover:bg-gray-50 dark:hover:bg-accent text-gray-600 focus-visible:ring-0">
                <CloudUpload className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-full w-9 rounded-none hover:bg-gray-50 dark:hover:bg-accent text-gray-600 focus-visible:ring-0">
                    <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[240px] z-[200] mt-1">
                  <DropdownMenuItem className="cursor-pointer py-2.5 text-[14px]">Save email message and exit</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* # HISTORY GROUP */}
            <div className="flex items-center bg-white dark:bg-background border rounded-full shadow-sm h-[36px] overflow-hidden ml-1">
              <Button variant="ghost" size="icon" className="h-full w-10 flex-shrink-0 rounded-none border-r opacity-60 pointer-events-none">
                <Undo className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </Button>
              <Button variant="ghost" size="icon" className="h-full w-10 flex-shrink-0 rounded-none border-r opacity-60 pointer-events-none">
                <History className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </Button>
              <Button variant="ghost" size="icon" className="h-full w-10 flex-shrink-0 rounded-none opacity-60 pointer-events-none">
                <Redo className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </Button>
            </div>

            {/* # CODE EDITOR BUTTON */}
            <Button variant="outline" size="icon" className="h-[36px] w-[36px] rounded-full shadow-sm text-gray-600 bg-white ml-1">
              <Code className="w-[18px] h-[18px]" />
            </Button>

            {/* # DEVICE TOGGLE GROUP */}
            <div className="flex items-center bg-white dark:bg-background border rounded-full shadow-sm h-[36px] overflow-hidden ml-1">
              <Button variant="ghost" size="icon" className="h-full w-12 rounded-none border-r bg-green-50 dark:bg-green-900/20 relative">
                <Monitor className="w-[18px] h-[18px] text-[#22c55e]" />
                <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-[#22c55e] border-2 border-white dark:border-background rounded-full" />
              </Button>
              <Button variant="ghost" size="icon" className="h-full w-10 rounded-none border-r text-gray-500">
                <Smartphone className="w-[18px] h-[18px]" />
              </Button>
              <Button variant="ghost" size="icon" className="h-full w-8 rounded-none text-gray-500">
                <ChevronDown className="w-[14px] h-[14px]" />
              </Button>
            </div>
          </div>

          {/* # RIGHT SECTION: PREVIEW, EXPORT, PROFILE */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-[36px] w-[36px] rounded-full shadow-sm text-gray-600 bg-white">
                <MonitorSmartphone className="w-[18px] h-[18px]" />
              </Button>
              <Button variant="outline" size="icon" className="h-[36px] w-[36px] rounded-full shadow-sm text-gray-600 bg-white">
                <ClipboardCheck className="w-[18px] h-[18px]" />
              </Button>
            </div>

            <Button className="h-[36px] bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium border-0 shadow-sm rounded-full px-5">
              <Upload className="w-[18px] h-[18px] mr-2" />
              Export
            </Button>

            <Button variant="outline" size="icon" className="h-[36px] w-[36px] rounded-full shadow-sm text-gray-600 bg-white">
              <Share2 className="w-[18px] h-[18px]" />
            </Button>

            <div className="h-[36px] w-[36px] rounded-full overflow-hidden cursor-pointer border-[1.5px] border-transparent hover:border-gray-200 transition-all shadow-sm">
              <Image
                src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/a86f1e84-18fa-4e73-b230-cbcfda5b201f.jpg"
                alt="Profile"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden relative">

          {/* # VERTICAL ROW BLOCK */}
          <div className="w-[72px] h-full flex-shrink-0 flex flex-col items-center pt-[20px] pb-4 z-30 ml-2">
            <div className="w-[60px] h-full flex flex-col items-center gap-4 relative">
              {/* # STRUCTURES & MODULES BUTTON */}
              <div
                onClick={() => setIsStructuresPanelOpen(!isStructuresPanelOpen)}
                className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] aspect-square bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[16px] shadow-sm flex flex-col items-center justify-center cursor-pointer text-gray-600 dark:text-muted-foreground relative z-40 transition-colors hover:border-primary"
              >
                <div className="absolute top-[4px] w-full flex justify-center cursor-move">
                  <span className="material-symbols-outlined text-[10px] text-gray-400/60 rotate-90 scale-x-[-1]">drag_indicator</span>
                </div>
                <span className="material-symbols-outlined text-[56px] mt-2">view_quilt</span>
              </div>

              {/* # VERTICAL TOOLBAR BUTTONS */}
              <div className="flex-1 w-[60px] bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[20px] shadow-sm overflow-hidden flex flex-col relative group/tool-scroll">

                {/* # CHEVRON UP */}
                <div
                  className={`absolute top-1 left-1/2 -translate-x-1/2 z-10 w-8 h-8 flex items-center justify-center transition-opacity bg-white/90 rounded-full cursor-pointer shadow-md border-[2px] border-gray-200 ${canToolScrollUp ? 'opacity-0 group-hover/tool-scroll:opacity-100' : 'opacity-0 pointer-events-none'}`}
                  onMouseEnter={() => startToolScrolling('up')}
                  onMouseLeave={stopToolScrolling}
                >
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                </div>

                <div ref={toolScrollRef} className="w-full flex-1 flex flex-col items-center p-1.5 gap-2 pb-1.5 overflow-y-auto no-scrollbar">
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
                    <div
                      key={index}
                      className="w-12 h-12 aspect-square bg-white dark:bg-background border-[2px] border-gray-200 dark:border-white/10 hover:border-primary rounded-[16px] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all text-gray-500"
                    >
                      <span className="material-symbols-outlined text-[24px] leading-none select-none">{tool.icon}</span>
                    </div>
                  ))}
                </div>

                {/* # CHEVRON DOWN */}
                <div
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 z-10 w-8 h-8 flex items-center justify-center transition-opacity bg-white/90 rounded-full cursor-pointer shadow-md border-[2px] border-gray-200 ${canToolScrollDown ? 'opacity-0 group-hover/tool-scroll:opacity-100' : 'opacity-0 pointer-events-none'}`}
                  onMouseEnter={() => startToolScrolling('down')}
                  onMouseLeave={stopToolScrolling}
                >
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* # MAIN CONTENT AREA (BLANK) */}
          <main className="flex-1 bg-[#f3f4f6] relative flex flex-col overflow-hidden">
          </main>

          {/* # RIGHT SIDEBAR BLOCK */}
          <div className="w-[420px] h-full flex-shrink-0 bg-[#f3f4f6] dark:bg-background border-l border-gray-200 dark:border-border p-3 flex flex-col gap-3 z-30">
            
            {/* # RIGHT PANEL TABS BLOCK */}
            <div className="w-full h-[54px] bg-[#e5e7eb] dark:bg-accent/40 p-[5px] rounded-[27px] flex items-center shadow-inner relative flex-shrink-0">
              <div
                onClick={() => setActiveRightSidebarTab('appearance')}
                className={`flex-1 h-full flex justify-center items-center rounded-full cursor-pointer transition-all ${activeRightSidebarTab === 'appearance' ? 'bg-white dark:bg-background shadow-sm text-gray-700 dark:text-foreground' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <span className="material-symbols-outlined text-[20px]">palette</span>
              </div>
              <div
                onClick={() => setActiveRightSidebarTab('message')}
                className={`flex-1 h-full flex justify-center items-center rounded-full cursor-pointer transition-all ${activeRightSidebarTab === 'message' ? 'bg-white dark:bg-background shadow-sm text-gray-700 dark:text-foreground' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <span className="material-symbols-outlined text-[22px]">mode_comment</span>
              </div>
            </div>

            {/* # RIGHT SIDEBAR CONTENT AREA */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              
              {/* # MESSAGE SETTINGS PANEL BLOCK */}
              {activeRightSidebarTab === 'message' && (
                <div className="flex-1 bg-white dark:bg-background rounded-[24px] shadow-sm flex flex-col overflow-hidden overflow-y-auto p-5 space-y-4 animate-in fade-in duration-300">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-500 pl-1">Subject / Title</label>
                    <div className="relative bg-[#f1f5f9] dark:bg-accent/30 rounded-[16px] p-4 flex flex-col min-h-[110px] shadow-inner">
                      <textarea
                        value={subjectText}
                        onChange={(e) => setSubjectText(e.target.value)}
                        placeholder="65 characters recommended"
                        className="w-full flex-1 bg-transparent border-none outline-none text-[15px] resize-none text-gray-800 dark:text-foreground font-medium"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-center">
                        <span className="material-symbols-outlined text-[20px] text-[#10b981]">auto_fix_high</span>
                        <span className="material-symbols-outlined text-[22px] text-gray-400">sentiment_satisfied</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-500 pl-1">Hidden Preheader</label>
                    <div className="relative bg-[#f1f5f9] dark:bg-accent/30 rounded-[16px] p-4 flex flex-col min-h-[145px] shadow-inner">
                      <textarea
                        value={preheaderText}
                        onChange={(e) => setPreheaderText(e.target.value)}
                        placeholder="50 - 100 characters"
                        className="w-full flex-1 bg-transparent border-none outline-none text-[14px] resize-none text-gray-800 dark:text-foreground"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-center">
                        <span className="material-symbols-outlined text-[20px] text-[#10b981]">auto_fix_high</span>
                        <span className="material-symbols-outlined text-[22px] text-gray-400">sentiment_satisfied</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-sm font-semibold text-gray-500">Email annotations for Gmail</label>
                      <div
                        onClick={() => setIsGmailAnnotationEnabled(!isGmailAnnotationEnabled)}
                        className={`w-[50px] h-[28px] rounded-full relative cursor-pointer shadow-inner transition-colors ${isGmailAnnotationEnabled ? 'bg-[#10b981]' : 'bg-gray-200'}`}
                      >
                        <div className={`w-[24px] h-[24px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isGmailAnnotationEnabled ? 'translate-x-[24px]' : 'translate-x-[2px]'}`}></div>
                      </div>
                    </div>
                    <p className="text-[12px] text-gray-400 leading-relaxed px-1">
                      This feature lets you showcase your deals, discounts, or offer directly in recipient's inbox before they open the email.
                    </p>
                  </div>
                </div>
              )}

              {/* # APPEARANCE / GENERAL STYLES PANEL BLOCK */}
              {activeRightSidebarTab === 'appearance' && (
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative animate-in fade-in duration-300">
                  {selectedGeneralStyle ? (
                    <div className="flex flex-col h-full bg-white dark:bg-background rounded-[24px] shadow-sm overflow-hidden">
                      <div
                        className="h-[58px] border-b flex items-center justify-center relative px-4 flex-shrink-0 cursor-pointer group"
                        onClick={() => setSelectedGeneralStyle(null)}
                      >
                        <span className="text-[16px] font-bold text-gray-700 dark:text-foreground group-hover:text-primary transition-colors">
                          {selectedGeneralStyle}
                        </span>
                      </div>
                      <div className="flex-1 overflow-y-auto p-5">
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <span className="material-symbols-outlined text-[48px] text-gray-100 mb-4">design_services</span>
                          <h3 className="text-[18px] font-semibold text-gray-700 dark:text-foreground mb-2">{selectedGeneralStyle}</h3>
                          <p className="text-[14px] text-gray-400">Settings for this category will appear here.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="w-full relative py-2"
                      style={{ height: isGeneralHovered ? '220px' : '110px' }}
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
                          className="bg-white dark:bg-accent/40 rounded-[28px] border border-gray-200 dark:border-border flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all duration-300 group absolute h-[52px]"
                          style={{
                            top: idx === 0 ? '0px' : (isGeneralHovered ? `${idx * 42}px` : `${idx * 14}px`),
                            zIndex: 40 - idx,
                            width: 'calc(100% - 4px)',
                            left: '2px'
                          }}
                        >
                          <span className={`text-[15.5px] font-bold text-gray-700 dark:text-foreground group-hover:text-primary transition-all ${!isGeneralHovered && idx > 0 ? 'opacity-0' : 'opacity-100'}`}>
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* # STRUCTURE AND MODULE BLOCK */}
          {isStructuresPanelOpen && (
            <div
              className="absolute left-[80px] top-[6px] w-[480px] z-[110] transition-all duration-300 ease-in-out"
              style={{ height: 'calc(100% - 12px)' }}
            >
              {/* Panel Stacking Decorations */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[94%] h-4 bg-white/60 rounded-b-[24px] pointer-events-none -z-10 shadow-sm border border-gray-200/40 opacity-90" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[88%] h-4 bg-white/30 rounded-b-[24px] pointer-events-none -z-20 shadow-sm border border-gray-100/20 opacity-70" />

              <div className="h-full w-full bg-white dark:bg-background border-[2px] border-gray-200 dark:border-border rounded-[24px] shadow-xl flex flex-col overflow-hidden relative">
                {/* # PANEL HEADER */}
                <div className="flex items-center h-[60px] px-4 flex-shrink-0 gap-3">
                  <div
                    onClick={() => setIsStructuresPanelOpen(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 flex-shrink-0"
                  >
                    <XIcon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full flex items-center bg-[#f1f5f9] dark:bg-accent/40 rounded-full p-[4px] h-[48px] shadow-inner">
                      {[
                        { id: 'general', icon: <LayoutIcon size={20} />, label: 'Layouts' },
                        { id: 'current-layout', icon: <span className="material-symbols-outlined text-[22px]">view_array</span>, label: 'Structures' },
                        { id: 'my-modules', icon: <span className="material-symbols-outlined text-[22px]">person</span>, label: 'My Modules' }
                      ].map((tab) => (
                        <div
                          key={tab.id}
                          onClick={() => setStructuresTab(tab.id)}
                          className={`h-[40px] flex-1 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${structuresTab === tab.id ? 'bg-white shadow-sm text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          {tab.icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* # PANEL CONTENT AREA */}
                <div className="flex-1 overflow-y-auto p-4 pr-2">
                  <div className="space-y-4">
                    <p className="text-[12px] text-gray-400 font-medium uppercase tracking-wider px-1">Structures</p>
                    <div className="flex flex-col gap-2">
                      {/* 1 Column Structure */}
                      <div className="w-full bg-white border-[2px] border-gray-200 rounded-[14px] p-2.5 cursor-pointer hover:border-primary hover:shadow-md transition-colors h-[54px] flex gap-2">
                        <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 bg-[#f0f7ff] rounded-[6px]"></div>
                      </div>
                      {/* 2 Column Structure */}
                      <div className="w-full bg-white border-[2px] border-gray-200 rounded-[14px] p-2.5 cursor-pointer hover:border-primary hover:shadow-md transition-colors h-[54px] flex gap-2">
                        <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 bg-[#f0f7ff] rounded-[6px]"></div>
                        <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 bg-[#f0f7ff] rounded-[6px]"></div>
                      </div>
                      {/* 3 Column Structure */}
                      <div className="w-full bg-white border-[2px] border-gray-200 rounded-[14px] p-2.5 cursor-pointer hover:border-primary hover:shadow-md transition-colors h-[54px] flex gap-2">
                        <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 bg-[#f0f7ff] rounded-[6px]"></div>
                        <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 bg-[#f0f7ff] rounded-[6px]"></div>
                        <div className="flex-1 h-full border-[1.5px] border-dashed border-blue-300 bg-[#f0f7ff] rounded-[6px]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </TooltipProvider>
    </div>
  );
}
