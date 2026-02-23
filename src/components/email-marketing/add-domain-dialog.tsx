'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, Info, Lock, Server } from 'lucide-react';

const GooglePublicIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
);

import { useRouter } from 'next/navigation';
import { useDomains } from '@/lib/domain-context';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function AddDomainDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [domainName, setDomainName] = useState('');
    const router = useRouter();
    const { addDomain } = useDomains();

    const handleAddDomain = () => {
        if (!domainName) return;
        addDomain(domainName);
        setOpen(false);
        router.push(`/email-marketing/domains/setup?domain=${encodeURIComponent(domainName)}`);
        setDomainName('');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0">
                <DialogHeader className="px-6 py-5 border-b">
                    <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                        <GooglePublicIcon className="w-5 h-5 text-primary" />
                        Add New Domain
                    </DialogTitle>
                    <DialogDescription className="mt-1 text-sm text-muted-foreground">
                        Configure a new sending domain for your campaigns.
                    </DialogDescription>
                </DialogHeader>

                <div className="p-6 space-y-6">
                    {/* Input Group */}
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="domain-name" className="text-sm font-medium">Domain name</Label>
                            <div className="group relative flex items-center justify-center">
                                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-64 p-3 bg-popover text-popover-foreground text-sm rounded-md border shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none text-center">
                                    <p className="font-semibold mb-1">Why add a domain?</p>
                                    <p className="font-normal text-xs text-muted-foreground">Adding a custom domain improves your email deliverability and sender reputation.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <GooglePublicIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <Input
                                id="domain-name"
                                name="domain-name"
                                placeholder="example.com"
                                className="pl-10"
                                value={domainName}
                                onChange={(e) => setDomainName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 bg-muted/50 border-t flex-col-reverse sm:flex-row sm:justify-end gap-3">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        type="submit"
                        onClick={handleAddDomain}
                        className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white shadow-md border-0"
                    >
                        Generate DNS Records
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
