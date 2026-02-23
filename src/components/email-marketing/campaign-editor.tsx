'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { Skeleton } from '@/components/ui/skeleton';
import { GlobalLoader } from '@/components/ui/global-loader';
import theme from '@/components/email-builder/theme';
import { useDocument } from '@/components/email-builder/documents/editor/EditorContext';

// Dynamically import the App component to disable SSR for the whole editor
// We import the index file which exports the main App component
const EmailBuilderApp = dynamic(() => import('@/components/email-builder/App'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-full w-full bg-[#f2f5f7]">
            <GlobalLoader fullScreen={false} size={50} />
        </div>
    ),
});

// A component to listen to document changes and report back to parent
function EditorStateListener({ onChange }: { onChange?: (doc: any) => void }) {
    const document = useDocument();

    useEffect(() => {
        if (onChange) {
            onChange(document);
        }
    }, [document, onChange]);

    return null;
}

interface CampaignEditorProps {
    onChange: (doc: any) => void;
    initialValue?: any;
}

export function CampaignEditor({ onChange }: CampaignEditorProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* 
        The EmailBuilder App uses fixed positioning for drawers, 
        so we render it within this container. 
        MUI Drawers with 'variant="persistent"' usually stay within flow or fixed.
        We'll verify behavior visually.
      */}
            <div className="h-full w-full relative isolate bg-[#f2f5f7]">
                <EmailBuilderApp />
                <EditorStateListener onChange={onChange} />
            </div>
        </ThemeProvider>
    );
}
