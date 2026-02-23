'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Copy, Globe, Info, Server, ShieldCheck, FileText, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function DNSSetupGuidePage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="bg-muted/30 border-b border-border">
                <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                Connect Your Domain
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Unlock professional email delivery, build trust with your audience, and protect your brand identity by configuring your DNS records.
                            </p>
                        </div>
                        <div className="hidden md:flex gap-3">
                            <div className="p-4 bg-background rounded-2xl shadow-sm border border-border flex flex-col items-center gap-2 w-32">
                                <ShieldCheck className="w-8 h-8 text-green-500" />
                                <span className="text-xs font-medium text-center">Verified Sender</span>
                            </div>
                            <div className="p-4 bg-background rounded-2xl shadow-sm border border-border flex flex-col items-center gap-2 w-32">
                                <Server className="w-8 h-8 text-blue-500" />
                                <span className="text-xs font-medium text-center">High Deliverability</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 -mt-8">

                {/* Step 1: Get Records */}
                <section className="mb-16 relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border -z-10 hidden md:block" />

                    <div className="flex gap-6 md:gap-10">
                        <div className="hidden md:flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg z-10 ring-4 ring-background">1</div>
                        </div>
                        <div className="flex-1">
                            <Card className="border-border/60 shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-2xl flex items-center gap-3">
                                        <span className="md:hidden w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</span>
                                        Generate Your DNS Records
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        The first step is to tell Scalerbox which domain you want to send emails from.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p>
                                        Go to the <strong>Domains</strong> page in your dashboard and click <strong>"Add Domain"</strong>. Enter your domain name (e.g., <code>example.com</code>).
                                        Scalerbox will generate a set of <strong>CNAME records</strong> specifically for your domain.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg border border-border/50 text-sm font-mono mt-2">
                                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-border/10">
                                            <span className="text-muted-foreground">Type</span>
                                            <span className="text-muted-foreground">Name (Host)</span>
                                            <span className="text-muted-foreground">Value (Points to)</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                <span className="font-bold text-blue-500">CNAME</span>
                                                <span className="truncate">x24._domainkey.example.com</span>
                                                <span className="truncate opacity-70">x24.dkim.amazonses.com</span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 opacity-50">
                                                <span className="font-bold">CNAME</span>
                                                <span>...</span>
                                                <span>...</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md mt-2">
                                        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <p>Keep this tab open! You'll need to copy these values into your domain provider's website.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Step 2: Login to Provider */}
                <section className="mb-16 relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border -z-10 hidden md:block" />

                    <div className="flex gap-6 md:gap-10">
                        <div className="hidden md:flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg z-10 ring-4 ring-background">2</div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="md:hidden w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</span>
                                Sign in to Your Domain Provider
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                This is where you bought your domain (e.g., GoDaddy, Namecheap, Cloudflare). Find your provider below for specific instructions, or look for <strong>DNS Management</strong>, <strong>Name Server Management</strong>, or <strong>Advanced Settings</strong> in your provider's dashboard.
                            </p>

                            <Tabs defaultValue="godaddy" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-4">
                                    <TabsTrigger value="godaddy">GoDaddy</TabsTrigger>
                                    <TabsTrigger value="namecheap">Namecheap</TabsTrigger>
                                    <TabsTrigger value="cloudflare">Cloudflare</TabsTrigger>
                                    <TabsTrigger value="other">Other</TabsTrigger>
                                </TabsList>

                                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                    <TabsContent value="godaddy" className="mt-0">
                                        <ol className="list-decimal list-inside space-y-3 text-sm md:text-base">
                                            <li>Log in to your GoDaddy Domain Portfolio.</li>
                                            <li>Select your domain to access the <strong>Domain Settings</strong> page.</li>
                                            <li>Select <strong>DNS</strong> to view your DNA records.</li>
                                            <li>Select <strong>Add New Record</strong> and choose <strong>CNAME</strong> from the Type menu.</li>
                                        </ol>
                                        <Button variant="outline" className="mt-4 gap-2 h-8" asChild>
                                            <a href="https://www.godaddy.com/help/add-a-cname-record-19236" target="_blank" rel="noopener noreferrer">
                                                GoDaddy Help Article <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </Button>
                                    </TabsContent>
                                    <TabsContent value="namecheap" className="mt-0">
                                        <ol className="list-decimal list-inside space-y-3 text-sm md:text-base">
                                            <li>Sign into your Namecheap account and select <strong>Domain List</strong>.</li>
                                            <li>Click the <strong>Manage</strong> button next to your domain.</li>
                                            <li>Navigate to the <strong>Advanced DNS</strong> tab.</li>
                                            <li>Click <strong>Add New Record</strong> button and select <strong>CNAME Record</strong>.</li>
                                        </ol>
                                        <Button variant="outline" className="mt-4 gap-2 h-8" asChild>
                                            <a href="https://www.namecheap.com/support/knowledgebase/article.aspx/1015/2237/how-to-create-a-cname-record-for-your-domain/" target="_blank" rel="noopener noreferrer">
                                                Namecheap Help Article <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </Button>
                                    </TabsContent>
                                    <TabsContent value="cloudflare" className="mt-0">
                                        <ol className="list-decimal list-inside space-y-3 text-sm md:text-base">
                                            <li>Log in to the Cloudflare dashboard and select your account and domain.</li>
                                            <li>Go to <strong>DNS</strong> {'>'} <strong>Records</strong>.</li>
                                            <li>Click <strong>Add record</strong>.</li>
                                            <li>Select <strong>CNAME</strong> type. Ensure <strong>Proxy status</strong> is set to <strong>DNS Only</strong> (Grey cloud), not Proxied (Orange cloud).</li>
                                        </ol>
                                        <Button variant="outline" className="mt-4 gap-2 h-8" asChild>
                                            <a href="https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/" target="_blank" rel="noopener noreferrer">
                                                Cloudflare Help Article <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </Button>
                                    </TabsContent>
                                    <TabsContent value="other" className="mt-0">
                                        <p className="mb-4">Most providers follow a similar pattern:</p>
                                        <ol className="list-decimal list-inside space-y-3 text-sm md:text-base">
                                            <li>Log in to your domain registrar's control panel.</li>
                                            <li>Look for <strong>DNS Settings</strong>, <strong>Zone Editor</strong>, or <strong>Name Server Management</strong>.</li>
                                            <li>Find the option to add a new record.</li>
                                            <li>Select <strong>CNAME</strong> as the record type.</li>
                                        </ol>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </section>

                {/* Step 3: Add Records */}
                <section className="mb-16 relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border -z-10 hidden md:block" />

                    <div className="flex gap-6 md:gap-10">
                        <div className="hidden md:flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg z-10 ring-4 ring-background">3</div>
                        </div>
                        <div className="flex-1">
                            <Card className="border-border/60 shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-2xl flex items-center gap-3">
                                        <span className="md:hidden w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</span>
                                        Add the CNAME Records
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <p>
                                        Copy the <strong>Name</strong> and <strong>Value</strong> from Scalerbox and paste them into your DNS provider's fields. You will need to create <strong>3 separate CNAME records</strong>.
                                    </p>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">Host / Name</label>
                                            <div className="p-3 bg-muted rounded border border-border text-sm break-all font-mono">
                                                x24._domainkey.example.com
                                            </div>
                                            <p className="text-xs text-muted-foreground flex items-start gap-1">
                                                <AlertCircle className="w-3 h-3 mt-0.5 text-amber-500" />
                                                <span>Some providers (like GoDaddy) automatically add your domain name. If so, enter just <strong>x24._domainkey</strong>.</span>
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">Value / Points to</label>
                                            <div className="p-3 bg-muted rounded border border-border text-sm break-all font-mono">
                                                x24.dkim.amazonses.com
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/20 p-4">
                                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            Wait, where are the MX records?
                                        </h4>
                                        <p className="text-sm text-blue-700 dark:text-blue-400">
                                            You only need CNAME records to <strong>send</strong> emails via Scalerbox. You don't need to change your MX records (which control receiving email) unless you want to receive email on this subdomain specifically, which is rare for this setup.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Step 4: Verification */}
                <section className="mb-20">
                    <div className="flex gap-6 md:gap-10">
                        <div className="hidden md:flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg z-10 ring-4 ring-background">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="md:hidden w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm"><CheckCircle2 className="w-4 h-4" /></span>
                                Verify and Finish
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Once you've added all 3 records, return to Scalerbox. Our system automatically checks your DNS records.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="p-4 bg-muted/40 rounded-xl border border-border">
                                    <h4 className="font-semibold mb-2">Propagation Time</h4>
                                    <p className="text-sm text-muted-foreground">Changes usually take <strong>5-10 minutes</strong>, but can take up to 48 hours depending on your provider.</p>
                                </div>
                                <div className="p-4 bg-muted/40 rounded-xl border border-border">
                                    <h4 className="font-semibold mb-2">Status Update</h4>
                                    <p className="text-sm text-muted-foreground">The status in your dashboard will change from <strong>Pending</strong> to <strong>Verified</strong> automatically.</p>
                                </div>
                                <div className="p-4 bg-muted/40 rounded-xl border border-border">
                                    <h4 className="font-semibold mb-2">Troubleshooting</h4>
                                    <p className="text-sm text-muted-foreground">If it's been over 24 hours, double-check that you haven't duplicated the domain name (e.g., <code>key.domain.com.domain.com</code>).</p>
                                </div>
                            </div>

                            <div className="mt-10 flex justify-center">
                                <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20" asChild>
                                    <Link href="/email-marketing/domains">
                                        I've Added the Records
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="max-w-3xl mx-auto border-t border-border pt-12">
                    <h3 className="text-2xl font-bold text-center mb-8">Common Questions</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Why do I need to verify my domain?</AccordionTrigger>
                            <AccordionContent>
                                Verifying your domain is crucial for email deliverability. It proves to email service providers (like Gmail and Outlook) that you actually own the domain you're sending from, effectively preventing spammers from impersonating you. This results in fewer of your emails landing in the Spam folder.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What is DKIM?</AccordionTrigger>
                            <AccordionContent>
                                DKIM (DomainKeys Identified Mail) is an email authentication method. By adding CNAME records, you allow us to add a cryptographic signature to your emails. This signature verifies that the email was indeed sent from your domain and hasn't been altered in transit.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>My domain won't verify. What should I do?</AccordionTrigger>
                            <AccordionContent>
                                <p className="mb-2">First, be patient—DNS changes can take up to 48 hours to propagate worldwide.</p>
                                <p>Second, check for the "duplicate domain" error. If your provider automatically appends your domain name to the Host field, entering <code>selector._domainkey.example.com</code> might result in <code>selector._domainkey.example.com.example.com</code>. Try entering just <code>selector._domainkey</code> instead.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </div>
        </div>
    );
}
