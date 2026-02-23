'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/utils/supabase/client';
import { useSupabaseAuth } from '@/components/supabase-auth-provider';
import { Loader2 } from 'lucide-react';

interface CreateSaasDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function CreateSaasDialog({ open, onOpenChange, onSuccess }: CreateSaasDialogProps) {
    const [projectName, setProjectName] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSupabaseAuth();
    const { toast } = useToast();
    const supabase = createClient();

    const handleCreate = async () => {
        if (!projectName.trim()) return;
        if (!user) {
            toast({
                title: "Error",
                description: "You must be logged in to create a project.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase
                .from('saas_projects')
                .insert({
                    name: projectName,
                    user_id: user.id
                });

            if (error) throw error;

            toast({
                title: "Success",
                description: "SaaS Project created successfully!",
            });

            setProjectName('');
            onSuccess();
            onOpenChange(false);
        } catch (error: any) {
            console.error('Error creating project:', error);
            toast({
                title: "Error",
                description: error.message || "Failed to create project.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New SaaS Project</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                            id="name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="My New SaaS"
                            maxLength={80}
                        />
                        <div className="text-xs text-muted-foreground text-right">
                            {projectName.length}/80
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreate}
                        disabled={loading || !projectName.trim()}
                        className="bg-gradient-to-r from-cyan-glow to-violet-glow text-white hover:opacity-90 transition-opacity border-0"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
