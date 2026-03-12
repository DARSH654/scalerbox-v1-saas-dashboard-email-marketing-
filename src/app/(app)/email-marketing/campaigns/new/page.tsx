'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Smile,
    Plus,
    Users as UsersIcon,
    PenTool,
    Code,
    Edit,
    Send,
    CheckCircle2,
    Calendar,
    ChevronDown,
    Image as ImageIcon,
    AlertCircle,
    Copy,
    RefreshCw,
    Mail,
    X,
    MessageSquare,
    Megaphone,
    Tags,
    Sparkles,
    CalendarDays,
    RefreshCcw,
    GraduationCap,
    SendHorizonal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

export default function CreateCampaignPage() {
    const router = useRouter();
    const [sendMethod, setSendMethod] = useState<'now' | 'later'>('now');
    const [campaignType, setCampaignType] = useState('newsletter');
    const [senderEmail, setSenderEmail] = useState('marketing@company.com');
    const [domainStatus, setDomainStatus] = useState<'verified' | 'pending' | 'unverified'>('verified'); // Demo state
    const [showTestEmailInput, setShowTestEmailInput] = useState(false);

    // Form Inputs State (for dirty check)
    const [campaignName, setCampaignName] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [previewText, setPreviewText] = useState('');
    const [senderName, setSenderName] = useState('Marketing Team');
    const [replyTo, setReplyTo] = useState('');

    // Cancel Dialog State
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

    // Campaign Types State - EXACT ORDER as requested
    const [campaignTypes, setCampaignTypes] = useState([
        { id: 'newsletter', label: 'Newsletter', icon: MessageSquare },
        { id: 'announcement', label: 'Announcement', icon: Megaphone },
        { id: 'promotional', label: 'Promotional', icon: Tags },
        { id: 'welcome', label: 'Welcome Series', icon: Sparkles },
        { id: 'event', label: 'Event Invitation', icon: CalendarDays },
        { id: 'update', label: 'Product Update', icon: RefreshCcw },
        { id: 'education', label: 'Education/Tips', icon: GraduationCap },
        { id: 'reengagement', label: 'Re-engagement', icon: UsersIcon },
        { id: 'regular', label: 'Regular', icon: SendHorizonal },
    ]);
    const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
    const [customTypeInput, setCustomTypeInput] = useState('');

    const handleAddCustomType = () => {
        if (!customTypeInput.trim()) return;

        const newId = customTypeInput.toLowerCase().replace(/\s+/g, '-');
        const newLabel = customTypeInput;

        // Check if already exists
        const exists = campaignTypes.find(t => t.id === newId);

        if (!exists) {
            setCampaignTypes([...campaignTypes, { id: newId, label: newLabel, icon: PenTool }]);
        }

        setCampaignType(newId);
        setCustomTypeInput('');
        setIsCustomDialogOpen(false);
    };

    const handleCancelClick = () => {
        const isDefaultState =
            !campaignName &&
            !emailSubject &&
            !previewText &&
            senderName === 'Marketing Team' &&
            !replyTo &&
            campaignType === 'newsletter';

        if (isDefaultState) {
            router.push('/email-marketing/campaigns');
        } else {
            setIsCancelDialogOpen(true);
        }
    };

    const confirmCancel = () => {
        setIsCancelDialogOpen(false);
        router.push('/email-marketing/campaigns');
    };

    return (
        <div className="bg-background min-h-screen flex flex-col font-sans text-foreground antialiased selection:bg-primary/20">
            {/* Header - No sticky, simplified */}
            <header className="bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
                    <div className="flex items-center gap-3">
                        <Megaphone className="w-6 h-6 text-foreground" />
                        <h1 className="text-xl font-semibold text-foreground">Create Campaign</h1>
                    </div>
                </div>
            </header>

            {/* Main Content Form */}
            <main className="flex-grow py-8 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto space-y-6 pb-12">

                    {/* Section 1: Campaign Info */}
                    <section className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-blue-500/20">1</div>
                            <h2 className="text-lg font-semibold text-foreground">Campaign Information</h2>
                        </div>
                        <div className="space-y-6">

                            {/* Campaign Type Pills */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-3">Campaign Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {campaignTypes.map((type) => {
                                        const Icon = type.icon;
                                        return (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => setCampaignType(type.id)}
                                                className={cn(
                                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2",
                                                    campaignType === type.id
                                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20 ring-offset-1 ring-offset-background transform scale-[1.02]"
                                                        : "bg-background text-muted-foreground border-border hover:border-blue-500/50 hover:bg-muted/50 hover:text-foreground"
                                                )}
                                            >
                                                {Icon && <Icon className="w-4 h-4" />}
                                                {type.label}
                                            </button>
                                        );
                                    })}

                                    {/* Custom Pill Trigger */}
                                    <Dialog open={isCustomDialogOpen} onOpenChange={setIsCustomDialogOpen}>
                                        <DialogTrigger asChild>
                                            <button
                                                type="button"
                                                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-dashed border-border text-muted-foreground hover:text-blue-600 hover:border-blue-600 bg-background hover:bg-blue-50/50 group flex items-center gap-1"
                                            >
                                                <Plus className="w-3 h-3 group-hover:scale-110 transition-transform" />
                                                Custom
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Add Custom Campaign Type</DialogTitle>
                                                <DialogDescription>
                                                    Create a new category for your campaigns. This will be added to your list.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="custom-type" className="text-left">
                                                        Type Name
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="custom-type"
                                                            placeholder="e.g., Flash Sale"
                                                            value={customTypeInput}
                                                            onChange={(e) => setCustomTypeInput(e.target.value)}
                                                            maxLength={30}
                                                            className="col-span-3 focus-visible:ring-blue-600"
                                                            autoFocus
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    handleAddCustomType();
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsCustomDialogOpen(false)} className="rounded-full">Cancel</Button>
                                                <Button
                                                    onClick={handleAddCustomType}
                                                    disabled={!customTypeInput.trim()}
                                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:opacity-90 rounded-full"
                                                >
                                                    Add Type
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2" htmlFor="campaign-name">
                                    Campaign Name <span className="text-red-500 ml-0.5" title="Required">*</span>
                                </label>
                                <input
                                    className="block w-full rounded-full border-input bg-background shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3"
                                    id="campaign-name"
                                    name="campaign-name"
                                    value={campaignName}
                                    onChange={(e) => setCampaignName(e.target.value)}
                                    placeholder="e.g. Q3 Product Update Newsletter"
                                    type="text"
                                />
                                <p className="mt-1 text-xs text-muted-foreground">This name is for internal use only.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2" htmlFor="email-subject">
                                    Email Subject Line <span className="text-red-500 ml-0.5" title="Required">*</span>
                                </label>
                                <div className="relative rounded-full shadow-sm">
                                    <input
                                        className="block w-full rounded-full border-input bg-background focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 pr-10"
                                        id="email-subject"
                                        name="email-subject"
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}
                                        placeholder="Enter a catchy subject line"
                                        type="text"
                                    />
                                </div>
                                <div className="flex justify-end mt-1 pr-4">
                                    <div className="flex flex-col items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                            <path d="M80-240v-480h80v480H80Zm560 0-57-56 144-144H240v-80h487L584-664l56-56 240 240-240 240Z" />
                                        </svg>
                                        <span className="text-[10px] text-muted-foreground font-medium">
                                            {[...emailSubject].length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2" htmlFor="preview-text">Preview Text <span className="font-normal text-muted-foreground">(Optional)</span></label>
                                <input
                                    className="block w-full rounded-full border-input bg-background shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3"
                                    id="preview-text"
                                    name="preview-text"
                                    value={previewText}
                                    onChange={(e) => setPreviewText(e.target.value)}
                                    placeholder="Snippet displayed in inbox"
                                    type="text"
                                />
                                <div className="flex justify-end mt-1 pr-4">
                                    <div className="flex flex-col items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                            <path d="M80-240v-480h80v480H80Zm560 0-57-56 144-144H240v-80h487L584-664l56-56 240 240-240 240Z" />
                                        </svg>
                                        <span className="text-[10px] text-muted-foreground font-medium">
                                            {[...previewText].length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Sender Details */}
                    <section className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-blue-500/20">2</div>
                            <h2 className="text-lg font-semibold text-foreground">Sender Details</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2" htmlFor="sender-name">Sender Name</label>
                                <input
                                    className="block w-full rounded-full border-input bg-background shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3"
                                    id="sender-name"
                                    name="sender-name"
                                    value={senderName}
                                    onChange={(e) => setSenderName(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2" htmlFor="sending-domain">From Address</label>
                                <div className="relative">
                                    <select
                                        className="block w-full rounded-full border-input bg-background text-foreground shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm pl-4 pr-10 py-3 appearance-none"
                                        id="sending-domain"
                                        name="sending-domain"
                                        value={senderEmail}
                                        onChange={(e) => setSenderEmail(e.target.value)}
                                    >
                                        <option value="marketing@company.com">marketing@company.com</option>
                                        <option value="newsletter@company.com">newsletter@company.com</option>
                                        <option value="unverified@company.com">unverified@company.com</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Domain Status UI */}
                                {senderEmail === 'unverified@company.com' ? (
                                    <div className="mt-2 flex items-center justify-between text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 p-2 rounded border border-amber-200 dark:border-amber-800">
                                        <div className="flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1.5" />
                                            <span>Verification pending</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button type="button" className="underline hover:text-amber-700 dark:hover:text-amber-300">View DNS</button>
                                            <button type="button" className="flex items-center underline hover:text-amber-700 dark:hover:text-amber-300">
                                                <RefreshCw className="w-3 h-3 mr-1" /> Re-check
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-400">
                                        <CheckCircle2 className="w-4 h-4 mr-1" />
                                        Domain verified
                                    </div>
                                )}
                            </div>

                            {/* Reply-To Email */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-foreground mb-2" htmlFor="reply-to">Reply-to address <span className="font-normal text-muted-foreground">(Optional)</span></label>
                                <input
                                    className="block w-full rounded-full border-input bg-background shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 placeholder:text-muted-foreground/50"
                                    id="reply-to"
                                    name="reply-to"
                                    type="email"
                                    value={replyTo}
                                    onChange={(e) => setReplyTo(e.target.value)}
                                    placeholder={senderEmail}
                                />
                                <p className="mt-1 text-xs text-muted-foreground">Replies will be sent to this address. Defaults to From Address if left blank.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Audience */}
                    <section className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-blue-500/20">3</div>
                            <h2 className="text-lg font-semibold text-foreground">Audience</h2>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-foreground" htmlFor="recipient-list">Recipient List</label>
                                <a className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center cursor-pointer">
                                    <Plus className="w-4 h-4 mr-1" /> Create new list
                                </a>
                            </div>
                            <div className="relative">
                                <select
                                    className="block w-full rounded-full border-input bg-background text-foreground shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm pl-4 pr-10 py-3 appearance-none"
                                    id="recipient-list"
                                    name="recipient-list"
                                    defaultValue=""
                                >
                                    <option disabled value="">Select a list...</option>
                                    <option value="all-users">All Users (12,450)</option>
                                    <option value="newsletter-subscribers">Newsletter Subscribers (8,200)</option>
                                    <option value="trial-users">Trial Users (450)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </div>
                            {/* Selected List Summary */}
                            <div className="mt-4 bg-muted/50 rounded-lg p-4 border border-border flex items-start gap-3">
                                <UsersIcon className="text-blue-600 w-5 h-5 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-foreground">Estimated Reach</p>
                                    <p className="text-sm text-muted-foreground">Approx. <span className="font-bold text-foreground">0 recipients</span> based on current selection.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Email Content */}
                    <section className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8 overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-blue-500/20">4</div>
                                <h2 className="text-lg font-semibold text-foreground">Content Design</h2>
                            </div>
                        </div>
                        {/* Tabs */}
                        <div className="border-b border-border mb-6">
                            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                                <button className="border-blue-600 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2">
                                    <PenTool className="w-5 h-5" /> Visual Builder
                                </button>
                                <button className="border-transparent text-muted-foreground hover:text-foreground hover:border-border whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2">
                                    <Code className="w-5 h-5" /> Custom HTML
                                </button>
                            </nav>
                        </div>
                        {/* Content Area */}
                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                            {/* Template Preview (Left) */}
                            <div className="w-full md:w-1/3 aspect-[3/4] bg-muted rounded-lg overflow-hidden border border-border relative group cursor-pointer hover:shadow-md transition-all">
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                    <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors opacity-0 group-hover:opacity-100">
                                    <span className="bg-background/90 backdrop-blur text-sm font-medium py-2 px-4 rounded-full shadow-lg text-foreground">Preview</span>
                                </div>
                            </div>
                            {/* Actions (Right) */}
                            <div className="flex-1 flex flex-col justify-center items-start space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium text-foreground">Start Designing</h3>
                                    <p className="text-muted-foreground text-sm">Choose a template or start from scratch using our drag-and-drop editor. Create responsive emails in minutes.</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button className="inline-flex items-center px-5 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                        <Edit className="w-5 h-5 mr-2" /> Open Visual Editor
                                    </button>
                                    <button className="inline-flex items-center px-5 py-2.5 border border-border shadow-sm text-sm font-medium rounded-full text-foreground bg-card hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                        Select Template
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 border-t border-border pt-6">
                            {/* Plain Text Version */}
                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                                    Plain text version <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded">Auto-generated</span>
                                </h3>
                                <div className="bg-muted/30 border border-border rounded-md p-3">
                                    <p className="text-xs text-muted-foreground font-mono">
                                        This is a placeholder for the auto-generated plain text version of your email. In the real application, this would be editable content stripped of HTML tags to ensure deliverability and accessibility.
                                    </p>
                                    <button className="text-xs text-primary hover:underline mt-2 flex items-center">
                                        <Edit className="w-3 h-3 mr-1" /> Edit plain text
                                    </button>
                                </div>
                            </div>

                            {/* Test Email */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-medium text-foreground">Send Test Email</h3>
                                </div>
                                {!showTestEmailInput ? (
                                    <button
                                        onClick={() => setShowTestEmailInput(true)}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                                    >
                                        <Mail className="w-4 h-4 mr-1.5" /> Send a test email
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2 max-w-sm animate-in fade-in slide-in-from-left-2 duration-300">
                                        <input
                                            type="email"
                                            placeholder="Enter email address"
                                            className="block w-full rounded-full border-input bg-background shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                                            autoFocus
                                        />
                                        <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap">
                                            Send
                                        </button>
                                        <button
                                            onClick={() => setShowTestEmailInput(false)}
                                            className="p-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <span className="sr-only">Cancel</span>
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Delivery Options */}
                    <section className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-blue-500/20">5</div>
                            <h2 className="text-lg font-semibold text-foreground">Delivery Options</h2>
                        </div>
                        <div className="space-y-4">

                            {/* Send Now Option */}
                            <div
                                className={cn(
                                    "relative flex items-start p-4 border rounded-lg cursor-pointer transition-colors",
                                    sendMethod === 'now'
                                        ? "border-blue-500/40 bg-blue-500/5"
                                        : "border-border hover:bg-muted/50"
                                )}
                                onClick={() => setSendMethod('now')}
                            >
                                <div className="flex items-center h-5">
                                    <input
                                        checked={sendMethod === 'now'}
                                        onChange={() => setSendMethod('now')}
                                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-input bg-background"
                                        id="send_now"
                                        name="send_method"
                                        type="radio"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="font-medium text-foreground cursor-pointer" htmlFor="send_now">Send Immediately</label>
                                    <p className="text-muted-foreground">Campaign will be queued for delivery as soon as you hit send.</p>
                                </div>
                            </div>

                            {/* Schedule Later Option */}
                            <div
                                className={cn(
                                    "relative flex items-start p-4 border rounded-lg cursor-pointer transition-colors",
                                    sendMethod === 'later'
                                        ? "border-blue-500/40 bg-blue-500/5"
                                        : "border-border hover:bg-muted/50"
                                )}
                                onClick={() => setSendMethod('later')}
                            >
                                <div className="flex items-center h-5">
                                    <input
                                        checked={sendMethod === 'later'}
                                        onChange={() => setSendMethod('later')}
                                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-input bg-background"
                                        id="schedule_later"
                                        name="send_method"
                                        type="radio"
                                    />
                                </div>
                                <div className="ml-3 text-sm w-full">
                                    <label className="font-medium text-foreground cursor-pointer" htmlFor="schedule_later">Schedule for Later</label>
                                    <p className="text-muted-foreground mb-3">Pick a specific date and time for delivery.</p>

                                    {/* Date Picker Area */}
                                    <div className={cn(
                                        "mt-2 transition-opacity duration-200",
                                        sendMethod === 'later' ? "opacity-100" : "opacity-50 pointer-events-none"
                                    )}>
                                        <div className="grid grid-cols-2 gap-4 max-w-md">
                                            <div>
                                                <label className="sr-only">Date</label>
                                                <div className="relative">
                                                    <input className="block w-full rounded-full border-input bg-background shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" type="date" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="sr-only">Time</label>
                                                <div className="relative">
                                                    <input className="block w-full rounded-full border-input bg-background shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" type="time" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Timezone Indicator */}
                                        <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Scheduled in UTC+5:30 (Asia/Kolkata)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Send Once Checkbox */}
                            <div className="flex items-start pt-2 pl-1">
                                <div className="flex items-center h-5">
                                    <input
                                        id="send_once"
                                        name="send_once"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-input text-blue-600 focus:ring-blue-500 bg-background"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="send_once" className="font-medium text-foreground cursor-pointer">Send only once per recipient</label>
                                    <p className="text-muted-foreground text-xs">Prevents recipients from receiving this email multiple times if they are in multiple lists.</p>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Footer Actions (Moved from Sticky/Fixed) */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border mt-8">
                        <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                            <div className="w-full sm:w-auto">
                                <button
                                    onClick={handleCancelClick}
                                    className="w-full sm:w-auto text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                                    type="button"
                                >
                                    Cancel
                                </button>
                            </div>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Warning</DialogTitle>
                                    <DialogDescription>
                                        Your changes will be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex gap-2 sm:gap-0">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsCancelDialogOpen(false)}
                                        className="w-full sm:w-auto rounded-full"
                                    >
                                        Complete Now
                                    </Button>
                                    <Button
                                        onClick={confirmCancel}
                                        variant="destructive"
                                        className="w-full sm:w-auto rounded-full hover:bg-destructive/90"
                                    >
                                        Cancel
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                            <p className="text-xs text-muted-foreground mr-2 hidden sm:block animate-pulse">Draft saved</p>
                            <button className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-2.5 border border-border shadow-sm text-sm font-medium rounded-full text-foreground bg-card hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors" type="button">
                                Save Draft
                            </button>
                            <button className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors" type="button">
                                <Send className="w-5 h-5 mr-2" /> Send Campaign
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
