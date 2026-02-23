'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignEditor } from '@/components/email-marketing/campaign-editor';

export default function EmailEditorPage() {
    const router = useRouter();

    const handleSave = (document: any) => {
        console.log('Document to save:', document);
        // TODO: Implement save logic here
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <header className="h-16 border-b px-4 flex items-center justify-between bg-background z-10 relative">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h1 className="text-lg font-semibold">Email Editor</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => { /* trigger save in editor? */ }}
                        className="bg-gradient-to-r from-[#4F7CF3] to-[#8E3AF7] hover:opacity-90 text-white border-0 transition-all shadow-md hover:shadow-lg"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save & Use
                    </Button>
                </div>
            </header>
            <div className="flex-1 overflow-hidden relative">
                <CampaignEditor onChange={handleSave} />
            </div>
        </div>
    );
}
