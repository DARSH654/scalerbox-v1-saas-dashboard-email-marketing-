'use client';

import React from 'react';
import { Mail } from 'lucide-react';

interface CampaignEditorProps {
    onChange: (doc: any) => void;
    initialValue?: any;
}

export function CampaignEditor({ onChange }: CampaignEditorProps) {
    return (
        <div className="h-full w-full flex items-center justify-center bg-muted/30">
            <div className="text-center space-y-4 p-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Email Editor</h2>
                <p className="text-muted-foreground max-w-md">
                    The email builder will be integrated here. This is a placeholder while the editor is being set up.
                </p>
            </div>
        </div>
    );
}
