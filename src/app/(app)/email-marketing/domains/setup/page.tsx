'use client';

import React from 'react';
import Link from 'next/link';
import {
    ChevronRight,
    RefreshCw,
    Info,
    Copy,
    CheckCircle,
    AlertCircle,
    Circle,
    Globe,
    Cloud,
    ExternalLink,
    HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DNSSetupContent() {
    const searchParams = useSearchParams();
    const domainName = searchParams.get('domain') || 'marketing.acme.com';

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Link href="/settings" className="hover:text-primary transition-colors">Settings</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/email-marketing/domains" className="hover:text-primary transition-colors">Domains</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-foreground font-medium">Configuration</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Connect your domain</h1>
                        <p className="mt-2 text-muted-foreground max-w-2xl">
                            Verify ownership of <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground text-sm border border-border">{domainName}</span> to improve email deliverability.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" asChild>
                            <Link href="/dns-setup-guide" target="_blank">Read Guide</Link>
                        </Button>
                        <Button className="gap-2 shadow-lg shadow-primary/25">
                            <RefreshCw className="w-4 h-4" />
                            Verify Records
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mb-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-4 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">DNS Propagation</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">
                        DNS changes can take up to 24 hours to propagate globally, though it usually happens much faster. If verification fails immediately, please wait a few minutes and try again.
                    </p>
                </div>
            </div>

            <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                <div className="px-6 py-5 border-b border-border flex justify-between items-center bg-muted/30">
                    <div>
                        <h2 className="text-lg font-semibold">DNS Records</h2>
                        <p className="text-sm text-muted-foreground mt-1">Add these records to your domain provider (e.g., GoDaddy, Namecheap).</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                        </span>
                        <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Verification Pending</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-1/4">Host Name</th>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            <tr className="group hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-5 align-top">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-muted text-foreground border border-border">
                                        TXT
                                    </span>
                                </td>
                                <td className="px-6 py-5 align-top">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-muted-foreground uppercase font-semibold sm:hidden">Host</label>
                                        <div className="relative flex items-center group/input">
                                            <div className="w-full font-mono text-sm break-all bg-muted/50 border border-border rounded-lg px-3 py-2 pr-10">
                                                @
                                            </div>
                                            <button className="absolute right-2 p-1 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10" title="Copy Host">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-1">Root domain</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-muted-foreground uppercase font-semibold sm:hidden">Value</label>
                                        <div className="relative flex items-center group/input">
                                            <div className="w-full font-mono text-sm break-all bg-muted/50 border border-border rounded-lg px-3 py-2 pr-10">
                                                v=spf1 include:mailgun.org ~all
                                            </div>
                                            <button className="absolute right-2 p-1 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10" title="Copy Value">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-1">Sender Policy Framework (SPF)</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top text-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                                </td>
                            </tr>
                            <tr className="group hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-5 align-top">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-muted text-foreground border border-border">
                                        TXT
                                    </span>
                                </td>
                                <td className="px-6 py-5 align-top">
                                    <div className="flex flex-col gap-1">
                                        <div className="relative flex items-center group/input">
                                            <div className="w-full font-mono text-sm break-all bg-muted/50 border border-border rounded-lg px-3 py-2 pr-10">
                                                mx._domainkey
                                            </div>
                                            <button className="absolute right-2 p-1 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10" title="Copy Host">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top">
                                    <div className="flex flex-col gap-1">
                                        <div className="relative flex items-center group/input">
                                            <div className="w-full font-mono text-sm break-all bg-muted/50 border border-border rounded-lg px-3 py-2 pr-10">
                                                k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3...
                                            </div>
                                            <button className="absolute right-2 p-1 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10" title="Copy Value">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-1">DomainKeys Identified Mail (DKIM)</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top text-center">
                                    <AlertCircle className="w-5 h-5 text-yellow-500 mx-auto animate-pulse" />
                                </td>
                            </tr>
                            <tr className="group hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-5 align-top">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                        CNAME
                                    </span>
                                </td>
                                <td className="px-6 py-5 align-top">
                                    <div className="flex flex-col gap-1">
                                        <div className="relative flex items-center group/input">
                                            <div className="w-full font-mono text-sm break-all bg-muted/50 border border-border rounded-lg px-3 py-2 pr-10">
                                                email
                                            </div>
                                            <button className="absolute right-2 p-1 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10" title="Copy Host">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top">
                                    <div className="flex flex-col gap-1">
                                        <div className="relative flex items-center group/input">
                                            <div className="w-full font-mono text-sm break-all bg-muted/50 border border-border rounded-lg px-3 py-2 pr-10">
                                                mailgun.org
                                            </div>
                                            <button className="absolute right-2 p-1 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10" title="Copy Value">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-1">Tracking subdomain</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top text-center">
                                    <Circle className="w-5 h-5 text-muted-foreground mx-auto" />
                                </td>
                            </tr>
                            <tr className="group hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-5 align-top">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                                        MX
                                    </span>
                                </td>
                                <td className="px-6 py-5 align-top">
                                    <div className="flex flex-col gap-1">
                                        <div className="relative flex items-center group/input">
                                            <div className="w-full font-mono text-sm break-all bg-muted/50 border border-border rounded-lg px-3 py-2 pr-10">
                                                @
                                            </div>
                                            <button className="absolute right-2 p-1 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10" title="Copy Host">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top">
                                    <div className="flex flex-col gap-1">
                                        <div className="relative flex items-center group/input">
                                            <div className="w-full font-mono text-sm break-all bg-muted/50 border border-border rounded-lg px-3 py-2 pr-10">
                                                10 mxa.mailgun.org
                                            </div>
                                            <button className="absolute right-2 p-1 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10" title="Copy Value">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-1">Inbound routing</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 align-top text-center">
                                    <Circle className="w-5 h-5 text-muted-foreground mx-auto" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-muted/10 border-t border-border px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <HelpCircle className="w-4 h-4" />
                        Need help? <Link className="text-primary hover:underline" href="/dns-setup-guide" target="_blank">View troubleshooting guide</Link>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button variant="ghost" className="flex-1 sm:flex-none" asChild>
                            <Link href="/email-marketing/domains">Verify Later</Link>
                        </Button>
                        <Button className="flex-1 sm:flex-none shadow-lg shadow-primary/25">
                            Check DNS Records
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-3 mb-2">
                    <h3 className="text-lg font-semibold">Provider Guides</h3>
                </div>
                <a className="group block p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-md cursor-pointer" href="https://www.godaddy.com/help/add-a-cname-record-19236" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium group-hover:text-primary transition-colors">GoDaddy</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Step-by-step guide to adding TXT records.</p>
                </a>
                <a className="group block p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-md cursor-pointer" href="https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <Cloud className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium group-hover:text-primary transition-colors">Cloudflare</span>
                    </div>
                    <p className="text-xs text-muted-foreground">How to manage DNS & CNAME flattening.</p>
                </a>
                <a className="group block p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-md cursor-pointer" href="https://www.namecheap.com/support/knowledgebase/article.aspx/1015/2237/how-to-create-a-cname-record-for-your-domain/" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium group-hover:text-primary transition-colors">Namecheap</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Advanced DNS setup for email marketing.</p>
                </a>
            </div>
        </main>
    );
}

export default function DNSSetupPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading domain configuration...</div>}>
            <DNSSetupContent />
        </Suspense>
    );
}
