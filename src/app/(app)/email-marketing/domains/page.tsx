'use client';

import React from 'react';
import Link from 'next/link';
import {
    Plus,
    MoreHorizontal,
    Search,
    Filter,
    Download,
    TrendingUp,
    Server,
    ShieldCheck,
    Hourglass,
    AlertCircle,
    CheckCircle,
    Settings,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Info,
    PlusCircle,
    Stamp,
    Lock,
    CircleHelp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AddDomainDialog } from '@/components/email-marketing/add-domain-dialog';
import { useDomains } from '@/lib/domain-context';

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

export default function DomainsPage() {
    const { domains, removeDomain } = useDomains();

    if (domains.length === 0) {
        return (
            <div className="flex-1 p-4 md:p-8 flex items-center justify-center min-h-[calc(100vh-4rem)] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(currentColor 0.5px, transparent 0.5px)',
                        backgroundSize: '24px 24px'
                    }}
                />

                <main className="w-full max-w-5xl bg-card border border-border rounded-2xl shadow-2xl relative overflow-hidden z-10 flex flex-col md:flex-row min-h-[450px]">
                    {/* Left Section - Empty State */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-start items-center text-center border-b md:border-b-0 md:border-r border-border relative gap-8">
                        {/* Background decoration */}
                        <div aria-hidden="true" className="absolute inset-0 p-8 z-0 overflow-hidden select-none opacity-20 pointer-events-none">
                            <div className="w-full h-full border border-border rounded-xl bg-muted/20 transform scale-95 origin-center">
                                <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-background/50">
                                    <div className="col-span-4 h-3 bg-muted rounded w-24"></div>
                                    <div className="col-span-3 h-3 bg-muted rounded w-16"></div>
                                </div>
                                <div className="p-4 space-y-6">
                                    <div className="grid grid-cols-12 gap-4 items-center opacity-40 blur-[1px]">
                                        <div className="col-span-4 flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-muted"></div>
                                            <div className="h-3 bg-muted rounded w-32"></div>
                                        </div>
                                        <div className="col-span-3 h-5 bg-green-500/10 rounded-full w-20"></div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-4 items-center opacity-40 blur-[1px]">
                                        <div className="col-span-4 flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-muted"></div>
                                            <div className="h-3 bg-muted rounded w-24"></div>
                                        </div>
                                        <div className="col-span-3 h-5 bg-yellow-500/10 rounded-full w-20"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 max-w-md w-full flex flex-col items-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-full flex items-center justify-center mb-6 relative group">
                                <div className="absolute inset-0 rounded-full border border-primary/30 scale-110 group-hover:scale-125 transition-transform duration-700"></div>
                                <GooglePublicIcon className="w-12 h-12 text-primary" />
                                <div className="absolute -right-1 -bottom-1 w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-sm border border-border">
                                    <Plus className="w-5 h-5 text-muted-foreground" />
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-4">
                                No domains connected yet
                            </h1>
                            <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                                Connecting a domain allows you to send emails from your own brand, increasing open rates and trust. It only takes a few minutes to set up.
                            </p>

                            <div className="w-full flex flex-col items-center gap-4">
                                <AddDomainDialog>
                                    <Button size="lg" className="w-full sm:w-auto px-8 py-6 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-lg">
                                        <PlusCircle className="w-5 h-5" />
                                        <span>Add your first domain</span>
                                    </Button>
                                </AddDomainDialog>

                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
                                    <CircleHelp className="w-4 h-4" />
                                    <span>Need help?</span>
                                    <Link href="/dns-setup-guide" target="_blank" className="text-primary hover:text-primary/80 font-medium hover:underline flex items-center gap-1">
                                        Read our DNS setup guide
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Info */}
                    <div className="w-full md:w-96 bg-muted/30 flex-shrink-0 flex flex-col p-8 md:p-10">
                        <div>
                            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                                <Info className="w-5 h-5 text-primary" />
                                Why connect a domain?
                            </h3>
                            <div className="space-y-8">
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex-shrink-0 flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow border-0">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base mb-1">Improved Deliverability</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            ISPs are more likely to deliver emails from verified domains to the inbox instead of spam.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex-shrink-0 flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow border-0">
                                        <Stamp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base mb-1">Brand Recognition</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Send emails from <span className="font-mono bg-muted px-1 rounded text-xs text-foreground">you@yourbrand.com</span> instead of generic addresses.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex-shrink-0 flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow border-0">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base mb-1">DMARC Protection</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Protect your domain reputation by authenticating your sending sources.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex bg-background min-h-screen font-sans text-foreground">
            <main className="flex-1 overflow-y-auto relative z-0 focus:outline-none">
                <div className="py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
                    <div className="md:flex md:items-center md:justify-between mb-8">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-foreground sm:text-3xl sm:truncate">
                                Domain Management
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                                Configure and monitor your sending domains to ensure maximum deliverability and reputation.
                            </p>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4">
                            <AddDomainDialog>
                                <Button className="shadow-lg shadow-primary/30">
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add Domain
                                </Button>
                            </AddDomainDialog>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        {/* Summary Cards */}
                        <div className="relative bg-card overflow-hidden shadow-sm rounded-2xl border border-border group hover:shadow-md transition-all duration-300">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 blur-2xl opacity-50"></div>
                            <div className="px-5 py-6 relative z-10 flex items-start justify-between">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground truncate mb-1">Total Domains</dt>
                                    <dd className="text-3xl font-bold text-foreground tracking-tight">{domains.length}</dd>
                                    <p className="mt-2 text-xs text-muted-foreground flex items-center">
                                        <span className="text-emerald-600 font-medium flex items-center mr-1">
                                            <TrendingUp className="w-3.5 h-3.5 mr-1" />
                                            +0
                                        </span>
                                        last month
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                                    <Server className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                        </div>
                        {/* Other summary cards kept static or simplified for now as they are metrics */}
                        {/* ... (Verified, Pending, Failed cards can be kept static or calculated from domains array if we add real status logic later) */}
                    </div>

                    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                        {/* ... Filter/Search Bar ... */}
                        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/30">
                            <div className="relative rounded-md shadow-sm max-w-md w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Search domains..."
                                    className="pl-10 bg-background"
                                />
                            </div>
                            {/* ... Buttons ... */}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            Domain Name
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            DKIM Status
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            Added On
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-card divide-y divide-border">
                                    {domains.map((domain) => (
                                        <tr key={domain.id} className="hover:bg-muted/30 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                                                        <GooglePublicIcon className="w-5 h-5" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-semibold text-foreground">{domain.name}</div>
                                                        <div className="text-xs text-muted-foreground">Default sender</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${domain.status === 'Verified' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' :
                                                        domain.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800' :
                                                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${domain.status === 'Verified' ? 'bg-emerald-500' :
                                                            domain.status === 'Pending' ? 'bg-amber-500 animate-pulse' :
                                                                'bg-red-500'
                                                        }`}></span>
                                                    {domain.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    {domain.dkimStatus === 'Active' ? <CheckCircle className="w-4.5 h-4.5 text-emerald-500 mr-1.5" /> :
                                                        domain.dkimStatus === 'Pending' ? <AlertCircle className="w-4.5 h-4.5 text-amber-500 mr-1.5" /> :
                                                            <AlertCircle className="w-4.5 h-4.5 text-red-500 mr-1.5" />}
                                                    {domain.dkimStatus}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                                {domain.addedOn}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                                    <Button variant="ghost" size="icon" className="text-primary hover:text-blue-700 bg-primary/10 hover:bg-primary/20 h-8 w-8 rounded-lg">
                                                        <Settings className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 h-8 w-8 rounded-lg"
                                                        onClick={() => removeDomain(domain.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* ... Pagination ... */}
                    </div>
                </div>
            </main>
        </div>
    );
}
