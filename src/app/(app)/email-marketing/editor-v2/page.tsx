'use client';

import React, { useState, useRef } from 'react';
import Image from "next/image";
import { 
  ChevronDown, ArrowLeft, Trash2, CloudUpload, 
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

export default function EditorV2Page() {
  const [title, setTitle] = useState("new project");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasScrollRef = useRef<HTMLDivElement>(null);

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

        {/* # CONTENT BODY AREA */}
        <div className="flex-1 overflow-hidden relative w-full h-full flex">
          
          {/* # CANVAS AREA */}
          <div
            ref={canvasScrollRef}
            className={`flex-1 relative flex flex-col pt-0 pb-6 pl-6 pr-[384px] overflow-y-auto h-full items-center [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full`}
            style={{ backgroundColor: '#f3f4f6' }}
          >
            {/* The Canvas Page Layout Block */}
            <div
              ref={canvasRef}
              className={`w-full max-w-[620px] bg-white dark:bg-accent shadow-sm flex flex-col pt-[34px] pb-8 gap-6 relative min-h-screen`}
            >
              {/* # CANVAS OVERLAY ROOT */}
              <div
                id="canvas-overlay-root"
                className="absolute inset-0 pointer-events-none z-[200]"
              />

              {/* [Row Content will go here] */}
            </div>
          </div>

        </div>

      </TooltipProvider>
    </div>
  );
}
