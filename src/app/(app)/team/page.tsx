'use client';

import React, { useState } from "react";
import {
    MoreHorizontal,
    PlusCircle,
    Trash2,
    Mail,
    ChevronDown,
    AlertTriangle,
    Edit,
    Pencil,
    Shield,
    Copy,
    Loader2,
    ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getAvatarBgColor, getAvatarInitial } from "@/lib/avatar-utils";


type UserRole = 'Owner' | 'Admin' | 'Member';

interface UserProfile {
    id: string;
    username?: string;
    displayName?: string;
    email: string;
    profilePicture?: string;
    avatarColorIndex?: number;
    role: UserRole;
    usageLimit?: number;
    currentUsage?: number;
    allowWorkspaceCreation?: boolean;
    dateAdded?: string;
}

export interface Team {
    id: string;
    name: string;
    memberIds: string[];
    ownerId: string;
    memberLimit: number;
}

interface Invite {
    id: string;
    email: string;
    status: 'pending' | 'accepted' | 'declined';
    createdAt: string;
    workspaceIds?: string[];
    allowWorkspaceCreation?: boolean;
    usageLimit?: number;
}

// Demo data
const demoTeams: Team[] = [
    { id: 'team-1', name: 'My SaaS Team', memberIds: ['user-1', 'user-2', 'user-3'], ownerId: 'user-1', memberLimit: 5 },
];

const demoMembers: UserProfile[] = [
    { id: 'user-1', displayName: 'You (Owner)', email: 'owner@scalerbox.com', role: 'Owner', avatarColorIndex: 0, dateAdded: '2026-01-15' },
    { id: 'user-2', displayName: 'Alex Johnson', email: 'alex@scalerbox.com', role: 'Member', avatarColorIndex: 1, usageLimit: 50000, currentUsage: 12000, allowWorkspaceCreation: true, dateAdded: '2026-02-01' },
    { id: 'user-3', displayName: 'Sara Miller', email: 'sara@scalerbox.com', role: 'Member', avatarColorIndex: 2, usageLimit: 30000, currentUsage: 8500, allowWorkspaceCreation: false, dateAdded: '2026-02-10' },
];

const demoPendingInvites: Invite[] = [
    { id: 'inv-1', email: 'newuser@example.com', status: 'pending', createdAt: '2026-02-20', workspaceIds: [], allowWorkspaceCreation: false, usageLimit: 10000 },
];

const plans = [
    { name: '1 User', users: '1 Member', price: 'Free', limit: 1 },
    { name: 'Starter', users: '5 Members', price: '$20/mo', limit: 5 },
    { name: 'Pro', users: '30 Members', price: '$50/mo', limit: 30 },
];

function CreateTeamDialog({ showPricing, onTeamCreated }: { showPricing: boolean; onTeamCreated: () => void }) {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");
    const [newTeamMemberLimit, setNewTeamMemberLimit] = useState<number>(5);

    const handleCreateTeam = async () => {
        if (!newTeamName.trim()) {
            toast({ title: "Team name is required.", variant: "destructive" });
            return;
        }
        toast({ title: "Team Created!", description: `The team "${newTeamName}" has been created. (Demo)` });
        onTeamCreated();
        setIsOpen(false);
        setNewTeamName("");
        setNewTeamMemberLimit(5);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Team
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center">Create New Team</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="team-name" className="text-left">Team Name</Label>
                        <Input id="team-name" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} placeholder="e.g. My Awesome Team" maxLength={20} />
                        <p className="text-xs text-muted-foreground text-right">{newTeamName.length} / 20</p>
                    </div>
                    {showPricing && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                {plans.map((plan, index) => (
                                    <Card key={index} className="flex flex-col">
                                        <CardHeader className="text-center">
                                            <CardTitle className="text-xl">{plan.name}</CardTitle>
                                            <CardDescription>{plan.users}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow flex items-center justify-center">
                                            <p className="text-3xl font-bold">{plan.price}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full" onClick={() => setNewTeamMemberLimit(plan.limit)}>Choose Plan</Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                            <Card className="flex flex-col md:flex-row items-center justify-between p-6">
                                <div>
                                    <CardTitle>Enterprise</CardTitle>
                                    <CardDescription>Unlimited users and custom solutions.</CardDescription>
                                </div>
                                <Button variant="outline" className="mt-4 md:mt-0">Contact Us</Button>
                            </Card>
                        </>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleCreateTeam}>Create Team</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function TeamPage() {
    const { toast } = useToast();

    const teams = demoTeams;
    const membersOfCurrentTeam = demoMembers;
    const pendingInvites = demoPendingInvites;

    const [newMemberEmail, setNewMemberEmail] = useState("");
    const [isEditingTeamName, setIsEditingTeamName] = useState(false);
    const [editedTeamName, setEditedTeamName] = useState(teams[0]?.name || '');
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const [copiedInviteId, setCopiedInviteId] = useState<string | null>(null);
    const [showPendingInvites, setShowPendingInvites] = useState(true);

    const currentTeam = teams[0];

    const handleCopyLink = (inviteId: string) => {
        const signupUrl = `${window.location.origin}/signup?inviteId=${inviteId}`;
        navigator.clipboard.writeText(signupUrl);
        setCopiedInviteId(inviteId);
        toast({ title: "Copied!", description: "Invitation link copied to clipboard." });
        setTimeout(() => setCopiedInviteId(null), 2000);
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                    <h3 className="text-3xl font-bold">Current Team</h3>
                    <div className="group relative mt-2 flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="font-bold pr-2">
                                    <span>{currentTeam?.name}</span>
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {teams.map(team => (
                                    <DropdownMenuItem key={team.id}>
                                        {team.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="destructive" onClick={() => toast({ title: "Demo Mode", description: "Team deletion is disabled in demo." })}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Team
                    </Button>
                    <CreateTeamDialog showPricing={false} onTeamCreated={() => { }} />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between w-full group">
                        {isEditingTeamName ? (
                            <div className="flex items-center gap-2">
                                <Input
                                    value={editedTeamName}
                                    onChange={(e) => setEditedTeamName(e.target.value)}
                                    maxLength={20}
                                    autoFocus
                                    className="h-9 text-xl font-semibold md:w-auto w-[20ch]"
                                />
                                <Button size="sm" onClick={() => { toast({ title: 'Demo', description: 'Team name updated (demo).' }); setIsEditingTeamName(false); }}>Save</Button>
                                <Button size="sm" variant="ghost" onClick={() => setIsEditingTeamName(false)}>Cancel</Button>
                            </div>
                        ) : (
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                {currentTeam?.name || 'Team Info'}
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => setIsEditingTeamName(true)}>
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            </h2>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="invite-email" className="text-sm font-medium">Invite New Team Member</Label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-1">
                            <Input
                                id="invite-email"
                                type="email"
                                placeholder="user@scalerbox.com"
                                value={newMemberEmail}
                                onChange={(e) => setNewMemberEmail(e.target.value)}
                                className="flex-grow"
                            />
                            <Button onClick={() => toast({ title: "Demo Mode", description: "Invites are disabled in demo mode." })} className="w-full sm:w-auto">
                                <Mail className="mr-2 h-4 w-4" />
                                Send Invite
                            </Button>
                        </div>
                    </div>

                    {pendingInvites.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-medium">Pending Invites</h3>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-auto px-3 py-1 text-xs font-normal rounded-full"
                                    onClick={() => setShowPendingInvites(!showPendingInvites)}
                                >
                                    {showPendingInvites ? "Hide" : "Show"}
                                </Button>
                            </div>
                            {showPendingInvites && (
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Date Sent</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-center">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {pendingInvites.map(invite => (
                                                <TableRow key={invite.id}>
                                                    <TableCell>{invite.email}</TableCell>
                                                    <TableCell>{invite.createdAt}</TableCell>
                                                    <TableCell><Badge variant="secondary">{invite.status}</Badge></TableCell>
                                                    <TableCell className="text-center">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="ghost" size="icon" onClick={() => handleCopyLink(invite.id)}>
                                                                        <Copy className={cn("h-4 w-4", copiedInviteId === invite.id && "text-primary")} />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent><p>Copy Link</p></TooltipContent>
                                                            </Tooltip>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="ghost" size="icon" onClick={() => toast({ title: "Demo", description: "Delete disabled in demo." })}>
                                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent><p>Delete Invite</p></TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">Members: {membersOfCurrentTeam.length} / {currentTeam?.memberLimit}</h3>
                        <div className="hidden md:block rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead style={{ width: '30%' }}>Member</TableHead>
                                        <TableHead className="text-center" style={{ width: '15%' }}>Date Added</TableHead>
                                        <TableHead className="text-center" style={{ width: '15%' }}>Usage Limit</TableHead>
                                        <TableHead className="text-center" style={{ width: '15%' }}>Current Usage</TableHead>
                                        <TableHead className="text-center" style={{ width: '15%' }}>Allow Workspace Creation</TableHead>
                                        <TableHead className="text-right" style={{ width: '10%' }}>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {membersOfCurrentTeam.map(member => (
                                        <TableRow key={member.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={member.profilePicture} />
                                                        <AvatarFallback className={`${getAvatarBgColor(member.avatarColorIndex)} text-white font-bold`}>
                                                            {getAvatarInitial(member.displayName || member.email)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="grid gap-0.5">
                                                        <p className="font-medium leading-none flex items-center gap-2">
                                                            {member.displayName || member.username || member.email}
                                                            {member.role === 'Owner' && <Shield className="h-4 w-4 text-amber-500" />}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">{member.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">{member.dateAdded || 'N/A'}</TableCell>
                                            <TableCell className="text-center">{member.role === 'Owner' ? '\u2014' : (member.usageLimit ? member.usageLimit.toLocaleString() : 'Not Set')}</TableCell>
                                            <TableCell className="text-center">{member.role === 'Owner' ? '\u2014' : (member.currentUsage ? member.currentUsage.toLocaleString() : '0')}</TableCell>
                                            <TableCell className="text-center">
                                                {member.role === 'Owner' ? '\u2014' : <Checkbox checked={member.allowWorkspaceCreation} disabled />}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {member.role !== 'Owner' && (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => toast({ title: "Demo", description: "Edit disabled in demo." })}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-destructive" onClick={() => toast({ title: "Demo", description: "Remove disabled in demo." })}>
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Remove User
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Mobile view */}
                        <div className="md:hidden space-y-3">
                            <Accordion type="single" collapsible value={openAccordion || ""} onValueChange={setOpenAccordion}>
                                {membersOfCurrentTeam.map((member) => (
                                    <AccordionItem key={member.id} value={member.id} className="border-b-0">
                                        <Card className="rounded-lg">
                                            <AccordionTrigger noChevron className="p-0 flex w-full rounded-lg">
                                                <div className="flex items-center justify-between w-full p-4 overflow-hidden">
                                                    <div className="flex-1 flex items-center gap-3 min-w-0">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={member.profilePicture} />
                                                            <AvatarFallback className={`${getAvatarBgColor(member.avatarColorIndex)} text-white font-bold`}>
                                                                {getAvatarInitial(member.displayName || member.email)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="min-w-0 flex-1 text-left">
                                                            <p className="font-medium truncate leading-none flex items-center gap-2">
                                                                {member.displayName || member.email}
                                                                {member.role === 'Owner' && <Shield className="h-4 w-4 text-amber-500" />}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center flex-shrink-0 ml-2">
                                                        <ChevronRight className={cn("h-5 w-5 transition-transform", openAccordion === member.id && "rotate-90")} />
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="p-4 pt-0 space-y-4">
                                                    <div className="text-sm space-y-2">
                                                        <div><strong>Date Added:</strong> {member.dateAdded || 'N/A'}</div>
                                                        <div><strong>Usage Limit:</strong> {member.role === 'Owner' ? '\u2014' : (member.usageLimit ? member.usageLimit.toLocaleString() : 'Not Set')}</div>
                                                        <div><strong>Current Usage:</strong> {member.role === 'Owner' ? '\u2014' : (member.currentUsage ? member.currentUsage.toLocaleString() : '0')}</div>
                                                        <div className="flex items-center gap-2"><strong>Allow Workspace Creation:</strong> {member.role === 'Owner' ? '\u2014' : <Checkbox checked={member.allowWorkspaceCreation} disabled />}</div>
                                                    </div>
                                                    {member.role !== 'Owner' && (
                                                        <div className="flex gap-2 pt-4 border-t">
                                                            <Button variant="outline" size="sm" className="w-full" onClick={() => toast({ title: "Demo", description: "Edit disabled in demo." })}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                                            <Button variant="destructive" size="sm" className="w-full" onClick={() => toast({ title: "Demo", description: "Remove disabled in demo." })}><Trash2 className="mr-2 h-4 w-4" /> Remove</Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </Card>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
