

'use client';

import Image from "next/image";
import React, { useState, useMemo, useEffect } from "react";
import {
    MoreHorizontal,
    PlusCircle,
    Trash2,
    Search,
    Mail,
    Users2,
    UserCog,
    ChevronDown,
    ListFilter,
    AlertTriangle,
    Edit,
    Pencil,
    Check,
    User,
    Shield,
    Eye,
    Copy,
    BarChart,
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
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useUser, useFirestore, useCollection, useMemoFirebase, errorEmitter, FirestorePermissionError } from "@/firebase";
import { collection, query, where, addDoc, getDocs, doc, updateDoc, arrayRemove, writeBatch, deleteDoc, serverTimestamp, Timestamp, orderBy, setDoc, FieldValue } from 'firebase/firestore';
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppLayout } from "../layout";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getAvatarBgColor, getAvatarInitial } from "@/lib/avatar-utils";
import { updateTeamMemberAccess } from "@/app/actions";


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
    dateAdded?: Timestamp;
}

export interface Team {
    id: string;
    name: string;
    memberIds: string[];
    ownerId: string;
    memberLimit: number;
}

interface Workspace {
    id: string;
    name: string;
    avatarUrl?: string;
    teamId: string;
    memberIds?: string[];
}

interface Invite {
    id: string;
    email: string;
    status: 'pending' | 'accepted' | 'declined';
    createdAt: Timestamp;
    workspaceIds?: string[];
    allowWorkspaceCreation?: boolean;
    usageLimit?: number;
}

interface UsageData {
    id: string;
    tokens: number;
}


const plans = [
    { name: '1 User', users: '1 Member', price: 'Free', limit: 1 },
    { name: 'Starter', users: '5 Members', price: '$20/mo', limit: 5 },
    { name: 'Pro', users: '30 Members', price: '$50/mo', limit: 30 },
];

function CreateTeamDialog({ showPricing, onTeamCreated }: { showPricing: boolean; onTeamCreated: () => void }) {
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");
    const [newTeamMemberLimit, setNewTeamMemberLimit] = useState<number>(5);

    const handleCreateTeam = async () => {
        if (!newTeamName.trim() || !user) {
            toast({ title: "Team name is required.", variant: "destructive" });
            return;
        }

        try {
            await addDoc(collection(firestore, 'teams'), {
                name: newTeamName,
                ownerId: user.uid,
                memberIds: [user.uid],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                memberLimit: newTeamMemberLimit,
            });
            toast({ title: "Team Created!", description: `The team "${newTeamName}" has been created.` });
            onTeamCreated();
            setIsOpen(false);
            setNewTeamName("");
            setNewTeamMemberLimit(5);
        } catch (error) {
            toast({ title: "Error creating team", variant: "destructive" });
        }
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
    const { user } = useUser();
    const firestore = useFirestore();
    const { activeTeam, setActiveTeam, setActiveWorkspace } = useAppLayout();
    const [refreshKey, setRefreshKey] = useState(0);
    const router = useRouter();

    const [newMemberEmail, setNewMemberEmail] = useState("");
    const [newMemberLimit, setNewMemberLimit] = useState<string>("");
    const [inviteLimitError, setInviteLimitError] = useState("");

    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const [isEditingTeamName, setIsEditingTeamName] = useState(false);
    const [editedTeamName, setEditedTeamName] = useState('');

    const [allowWorkspaceCreation, setAllowWorkspaceCreation] = useState(false);
    const [selectedWorkspacesForInvite, setSelectedWorkspacesForInvite] = useState<string[]>([]);

    const [userToRemove, setUserToRemove] = useState<UserProfile | null>(null);
    const [userToEdit, setUserToEdit] = useState<UserProfile | null>(null);
    const [editUsageLimit, setEditUsageLimit] = useState<string>("");
    const [editLimitError, setEditLimitError] = useState("");
    const [isSavingMemberChanges, setIsSavingMemberChanges] = useState(false);
    const [selectedWorkspacesForEdit, setSelectedWorkspacesForEdit] = useState<string[]>([]);
    const [allowWorkspaceCreationForEdit, setAllowWorkspaceCreationForEdit] = useState(false);

    const [copiedInviteId, setCopiedInviteId] = useState<string | null>(null);
    const [inviteToView, setInviteToView] = useState<Invite | null>(null);
    const [inviteToDelete, setInviteToDelete] = useState<string | null>(null);
    const [showPendingInvites, setShowPendingInvites] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('showPendingInvites');
            return saved !== null ? saved === 'true' : true;
        }
        return true;
    });

    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const teamsQuery = useMemoFirebase(() =>
        user ? query(collection(firestore, 'teams'), where('memberIds', 'array-contains', user.uid)) : null,
        [firestore, user, refreshKey]
    );
    const { data: teams, isLoading: isLoadingTeams } = useCollection<Team>(teamsQuery);

    const invitesQuery = useMemoFirebase(() =>
        activeTeam?.id ? query(
            collection(firestore, 'invites'),
            where('teamId', '==', activeTeam.id),
            where('status', '==', 'pending'),
            orderBy('createdAt', 'desc')
        ) : null,
        [activeTeam?.id, firestore]
    );
    const { data: pendingInvites, isLoading: isLoadingInvites } = useCollection<Invite>(invitesQuery);

    const allUserIdsInMyTeams = useMemo(() => {
        if (!teams) return [];
        const ids = new Set(teams.flatMap(t => t.memberIds));
        return Array.from(ids);
    }, [teams]);

    const { data: allUsersData, isLoading: isLoadingUsers } = useCollection<UserProfile>(
        useMemoFirebase(() => {
            if (!firestore || allUserIdsInMyTeams.length === 0) return null;
            return query(collection(firestore, 'users'), where('__name__', 'in', allUserIdsInMyTeams.slice(0, 30)));
        }, [firestore, allUserIdsInMyTeams])
    );

    const workspacesQuery = useMemoFirebase(() =>
        activeTeam?.id ? query(collection(firestore, 'workspaces'), where('teamId', '==', activeTeam.id)) : null,
        [activeTeam?.id, firestore]
    );
    const { data: teamWorkspaces, isLoading: isLoadingWorkspaces } = useCollection<Workspace>(workspacesQuery);

    const ownerUsageQuery = useMemoFirebase(() =>
        user ? collection(firestore, `users/${user.uid}/usage`) : null,
        [firestore, user]
    );
    const { data: ownerUsageData } = useCollection<UsageData>(ownerUsageQuery);

    const ownerCurrentUsage = useMemo(() => ownerUsageData?.reduce((acc, item) => acc + (item.tokens || 0), 0) || 0, [ownerUsageData]);


    useEffect(() => {
        if (!isLoadingTeams && teams) {
            if (teams.length > 0) {
                const teamIdFromStorage = typeof window !== 'undefined' ? localStorage.getItem('activeTeamId') : null;
                const foundTeam = teamIdFromStorage ? teams.find(t => t.id === teamIdFromStorage) : null;
                if (foundTeam) {
                    setActiveTeam(foundTeam)
                } else if (!activeTeam || !teams.find(t => t.id === activeTeam.id)) {
                    setActiveTeam(teams[0]);
                }
            } else {
                setActiveTeam(null);
            }
        }
    }, [teams, isLoadingTeams, activeTeam, setActiveTeam]);


    useEffect(() => {
        if (activeTeam) {
            setEditedTeamName(activeTeam.name);
        }
    }, [activeTeam]);


    const membersOfCurrentTeam = useMemo(() => {
        if (!activeTeam || !allUsersData || !user) return [];

        let members = allUsersData
            .filter(u => activeTeam.memberIds?.includes(u.id))
            .map(member => ({
                ...member,
                role: activeTeam.ownerId === member.id ? 'Owner' : 'Member' as UserRole,
            }));

        members.sort((a, b) => {
            if (a.role === 'Owner' && b.role !== 'Owner') return -1;
            if (a.role !== 'Owner' && b.role === 'Owner') return 1;
            return (a.displayName || a.email!).localeCompare(b.displayName || b.email!);
        });

        return members;
    }, [activeTeam, allUsersData, user]);


    const openInviteDialog = () => {
        if (activeTeam?.ownerId !== user?.uid) {
            toast({ title: "Permission Denied", description: "Only the team owner can send invitations.", variant: "destructive" });
            return;
        }
        if (!newMemberEmail.trim()) {
            toast({ title: "Email required", description: "Please enter an email to invite a user.", variant: "destructive" });
            return;
        }
        setInviteLimitError("");
        setIsInviteDialogOpen(true);
    }

    const ownerRemainingUsage = 200000 - ownerCurrentUsage;

    const handleInviteLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewMemberLimit(value);
        const limitNumber = parseInt(value, 10);
        if (!isNaN(limitNumber) && limitNumber > ownerRemainingUsage) {
            setInviteLimitError(`Cannot exceed your remaining limit of ${ownerRemainingUsage.toLocaleString()} words.`);
        } else {
            setInviteLimitError("");
        }
    };

    const handleSendInvite = async () => {
        if (inviteLimitError) {
            toast({ title: "Invalid Usage Limit", description: inviteLimitError, variant: "destructive" });
            return;
        }
        if (!activeTeam || !user) {
            toast({ title: "No team selected", description: "Please select a team to invite a member.", variant: "destructive" });
            return;
        }

        setIsSending(true);

        try {
            const usageLimitNumber = newMemberLimit ? parseInt(newMemberLimit, 10) : null;
            const inviteRef = await addDoc(collection(firestore, 'invites'), {
                teamId: activeTeam.id,
                workspaceIds: selectedWorkspacesForInvite,
                email: newMemberEmail,
                status: 'pending',
                createdAt: serverTimestamp(),
                inviter: user.email,
                teamName: activeTeam.name,
                allowWorkspaceCreation: allowWorkspaceCreation,
                usageLimit: usageLimitNumber,
            });

            const signupUrl = `${window.location.origin}/signup?inviteId=${inviteRef.id}`;

            const mailData = {
                to: [newMemberEmail],
                message: {
                    subject: `You're invited to join ${activeTeam.name} on scalerbox!`,
                    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're Invited!</title>
    <style>
        body { margin: 0; padding: 0; background-color: #f8f9fa; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e9ecef; }
        .header { background: #6d28d9; padding: 30px; text-align: center; }
        .header img { width: 50px; height: 50px; }
        .header h1 { color: #ffffff; margin: 10px 0 0; font-size: 24px; }
        .content { padding: 40px; color: #495057; text-align: center; line-height: 1.6; }
        .content h2 { color: #212529; font-size: 20px; margin-top: 0; }
        .button-container { margin: 30px 0; }
        .button { background-color: #6d28d9; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; }
        .footer { background-color: #f1f3f5; padding: 20px; text-align: center; font-size: 12px; color: #adb5bd; }
        .footer a { color: #6d28d9; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png" alt="scalerbox Logo">
            <h1>Welcome to scalerbox</h1>
        </div>
        <div class="content">
            <h2>You've Been Invited!</h2>
            <p><strong>${user.email}</strong> has invited you to join the team <strong>"${activeTeam.name}"</strong>.</p>
            <p>Join the team to start collaborating on AI-powered projects.</p>
            <div class="button-container">
                <a href="${signupUrl}" class="button">Accept Invitation</a>
            </div>
        </div>
        <div class="footer">
            <p>&copy; 2024 scalerbox. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
                },
            };

            await addDoc(collection(firestore, 'mail'), mailData);

            toast({
                title: "Invite Sent!",
                description: `An invitation has been sent to ${newMemberEmail}.`
            });
            setNewMemberEmail('');
            setIsInviteDialogOpen(false);
            setAllowWorkspaceCreation(false);
            setSelectedWorkspacesForInvite([]);
            setNewMemberLimit("");
        } catch (serverError) {
            const permissionError = new FirestorePermissionError({
                path: 'mail',
                operation: 'create',
                requestResourceData: { to: newMemberEmail }
            });
            errorEmitter.emit('permission-error', permissionError);
        } finally {
            setIsSending(false);
        }
    }


    const handleSelectAllWorkspaces = () => {
        if (teamWorkspaces) {
            if (selectedWorkspacesForInvite.length === teamWorkspaces.length) {
                setSelectedWorkspacesForInvite([]);
            } else {
                setSelectedWorkspacesForInvite(teamWorkspaces.map(ws => ws.id));
            }
        }
    }

    const handleDeleteTeam = async () => {
        if (!activeTeam || !user || !firestore) {
            toast({ title: "Error", description: "No team selected or user not logged in.", variant: "destructive" });
            return;
        }

        setIsDeleting(true);
        toast({
            title: "Deleting Team...",
            description: "This may take a moment. Please wait.",
            duration: Infinity
        });

        try {
            // ========================================
            // STEP 1: Get all workspaces in this team
            // ========================================
            const workspacesSnapshot = await getDocs(
                query(collection(firestore, 'workspaces'), where('teamId', '==', activeTeam.id))
            );

            console.log(`Found ${workspacesSnapshot.docs.length} workspaces to delete`);

            // ========================================
            // STEP 2: Delete all workspaces and their content
            // ========================================
            for (const workspaceDoc of workspacesSnapshot.docs) {
                const workspaceId = workspaceDoc.id;
                const workspaceData = workspaceDoc.data();

                console.log(`Deleting workspace: ${workspaceData.name} (${workspaceId})`);

                // 2a. Delete all CHATS and their MESSAGES
                const chatsSnapshot = await getDocs(
                    collection(firestore, `workspaces/${workspaceId}/chats`)
                );

                console.log(`  Found ${chatsSnapshot.docs.length} chats in workspace ${workspaceId}`);

                for (const chatDoc of chatsSnapshot.docs) {
                    const chatId = chatDoc.id;

                    // Delete all MESSAGES in this chat
                    const messagesSnapshot = await getDocs(
                        collection(firestore, `workspaces/${workspaceId}/chats/${chatId}/messages`)
                    );

                    console.log(`    Deleting ${messagesSnapshot.docs.length} messages in chat ${chatId}`);

                    // Collect image URLs to delete from storage
                    const imageUrlsToDelete: string[] = [];

                    messagesSnapshot.forEach((messageDoc) => {
                        const messageData = messageDoc.data();

                        // Check if message has an image
                        if (messageData.image && typeof messageData.image === 'string') {
                            if (messageData.image.includes('storage.googleapis.com')) {
                                imageUrlsToDelete.push(messageData.image);
                            }
                        }
                    });

                    // Delete all messages using batch (Firestore limit: 500 per batch)
                    const messageDeleteBatches: any[] = [];
                    let currentBatch = writeBatch(firestore);
                    let operationCount = 0;

                    messagesSnapshot.docs.forEach((messageDoc) => {
                        currentBatch.delete(messageDoc.ref);
                        operationCount++;

                        if (operationCount === 500) {
                            messageDeleteBatches.push(currentBatch);
                            currentBatch = writeBatch(firestore);
                            operationCount = 0;
                        }
                    });

                    if (operationCount > 0) {
                        messageDeleteBatches.push(currentBatch);
                    }

                    // Commit all message delete batches
                    await Promise.all(messageDeleteBatches.map(batch => batch.commit()));

                    // Delete images from Firebase Storage
                    if (imageUrlsToDelete.length > 0) {
                        const { getStorage, ref, deleteObject } = await import('firebase/storage');
                        const storage = getStorage();

                        await Promise.allSettled(
                            imageUrlsToDelete.map(async (url) => {
                                try {
                                    // Extract storage path from URL
                                    const urlParts = url.split('/');
                                    const bucketIndex = urlParts.findIndex(part => part === 'storage.googleapis.com') + 1;
                                    const storagePath = decodeURIComponent(
                                        urlParts.slice(bucketIndex + 1).join('/')
                                    ).split('?')[0]; // Remove query params

                                    const imageRef = ref(storage, storagePath);
                                    await deleteObject(imageRef);
                                    console.log(`      Deleted image: ${storagePath}`);
                                } catch (error) {
                                    console.error('      Error deleting image:', url, error);
                                }
                            })
                        );
                    }

                    // Delete the chat document
                    await deleteDoc(doc(firestore, `workspaces/${workspaceId}/chats/${chatId}`));
                }

                // 2b. Delete workspace EXCEPTIONS (permission overrides)
                const exceptionsSnapshot = await getDocs(
                    collection(firestore, `workspaces/${workspaceId}/exceptions`)
                );

                console.log(`  Deleting ${exceptionsSnapshot.docs.length} exceptions`);

                const exceptionBatch = writeBatch(firestore);
                exceptionsSnapshot.docs.forEach(doc => exceptionBatch.delete(doc.ref));
                if (exceptionsSnapshot.docs.length > 0) await exceptionBatch.commit();

                // 2c. Delete workspace ACCESS RULES
                const accessRulesSnapshot = await getDocs(
                    collection(firestore, `workspaces/${workspaceId}/accessRules`)
                );

                console.log(`  Deleting ${accessRulesSnapshot.docs.length} access rules`);

                const accessBatch = writeBatch(firestore);
                accessRulesSnapshot.docs.forEach(doc => accessBatch.delete(doc.ref));
                if (accessRulesSnapshot.docs.length > 0) await accessBatch.commit();

                // 2d. Delete ALL workspace files from Firebase Storage
                try {
                    const { getStorage, ref, listAll, deleteObject } = await import('firebase/storage');
                    const storage = getStorage();

                    // Delete workspace images folder
                    const workspaceImagesRef = ref(storage, `workspaces/${workspaceId}/images`);
                    const imagesList = await listAll(workspaceImagesRef);

                    console.log(`  Deleting ${imagesList.items.length} files from workspace images`);

                    await Promise.allSettled(
                        imagesList.items.map(item => deleteObject(item))
                    );

                    // Delete workspace root folder (avatars, etc.)
                    const workspaceRootRef = ref(storage, `workspaces/${workspaceId}`);
                    const rootList = await listAll(workspaceRootRef);

                    console.log(`  Deleting ${rootList.items.length} files from workspace root`);

                    await Promise.allSettled(
                        rootList.items.map(item => deleteObject(item))
                    );

                    // Delete any subfolders
                    await Promise.allSettled(
                        rootList.prefixes.map(async (folderRef) => {
                            const folderList = await listAll(folderRef);
                            await Promise.allSettled(
                                folderList.items.map(item => deleteObject(item))
                            );
                        })
                    );
                } catch (storageError) {
                    console.error(`  Error deleting workspace storage:`, storageError);
                }

                // 2e. Finally, delete the workspace document itself
                await deleteDoc(doc(firestore, 'workspaces', workspaceId));
                console.log(`  ✅ Workspace ${workspaceId} deleted`);
            }

            // ========================================
            // STEP 3: Delete all team USAGE records
            // ========================================
            const usageSnapshot = await getDocs(
                collection(firestore, `teams/${activeTeam.id}/usage`)
            );

            console.log(`Deleting ${usageSnapshot.docs.length} usage records`);

            const usageBatch = writeBatch(firestore);
            usageSnapshot.docs.forEach(doc => usageBatch.delete(doc.ref));
            if (usageSnapshot.docs.length > 0) await usageBatch.commit();

            // ========================================
            // STEP 4: Delete all pending INVITES for this team
            // ========================================
            const invitesSnapshot = await getDocs(
                query(collection(firestore, 'invites'), where('teamId', '==', activeTeam.id))
            );

            console.log(`Deleting ${invitesSnapshot.docs.length} invites`);

            const inviteBatch = writeBatch(firestore);
            invitesSnapshot.docs.forEach(doc => inviteBatch.delete(doc.ref));
            if (invitesSnapshot.docs.length > 0) await inviteBatch.commit();

            // ========================================
            // STEP 5: Finally, delete the TEAM document itself
            // ========================================
            await deleteDoc(doc(firestore, 'teams', activeTeam.id));

            console.log('✅ Team deleted successfully!');

            // Success notification
            toast({
                title: "Team Deleted Successfully",
                description: `The team "${activeTeam.name}" and all its data have been permanently deleted.`,
                duration: 5000
            });

            // Reset UI state
            setActiveTeam(null);
            setActiveWorkspace(null);
            router.push('/chat');

        } catch (error) {
            console.error('Error deleting team:', error);
            toast({
                title: "Error Deleting Team",
                description: error instanceof Error ? error.message : "An unexpected error occurred.",
                variant: "destructive",
                duration: 5000
            });
        } finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
            setDeleteConfirmation("");
        }
    };

    const handleOpenEditDialog = (member: UserProfile) => {
        setUserToEdit(member);
        setEditUsageLimit(String(member.usageLimit || ""));
        setEditLimitError("");
        setAllowWorkspaceCreationForEdit(member.allowWorkspaceCreation || false);
        const memberWorkspaces = teamWorkspaces?.filter(ws => ws.memberIds?.includes(member.id)).map(ws => ws.id) || [];
        setSelectedWorkspacesForEdit(memberWorkspaces);
    };

    const handleEditLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEditUsageLimit(value);
        const limitNumber = parseInt(value, 10);
        if (!isNaN(limitNumber) && limitNumber > ownerRemainingUsage) {
            setEditLimitError(`Cannot exceed your remaining limit of ${ownerRemainingUsage.toLocaleString()} words.`);
        } else {
            setEditLimitError("");
        }
    };

    const handleSaveMemberChanges = async () => {
        if (editLimitError) {
            toast({ title: "Invalid Usage Limit", description: editLimitError, variant: "destructive" });
            return;
        }
        if (!userToEdit || !firestore || !activeTeam) return;

        setIsSavingMemberChanges(true);

        try {
            const formData = new FormData();
            formData.append('userId', userToEdit.id);
            formData.append('teamId', activeTeam.id);
            if (editUsageLimit) formData.append('usageLimit', editUsageLimit);
            formData.append('allowWorkspaceCreation', String(allowWorkspaceCreationForEdit));
            formData.append('workspaceIds', JSON.stringify(selectedWorkspacesForEdit));

            const result = await updateTeamMemberAccess(formData);

            if (result.error) {
                toast({ title: "Error", description: result.error, variant: "destructive" });
            } else {
                toast({ title: "Success", description: "Member access updated successfully." });
                setUserToEdit(null);
                setSelectedWorkspacesForEdit([]);
            }
        } catch (error) {
            toast({ title: "Error", description: "Could not update member access.", variant: "destructive" });
        } finally {
            setIsSavingMemberChanges(false);
        }
    };

    const handleRemoveUser = async () => {
        if (!userToRemove || !activeTeam || !firestore) return;

        const teamRef = doc(firestore, 'teams', activeTeam.id);
        try {
            await updateDoc(teamRef, {
                memberIds: arrayRemove(userToRemove.id)
            });
            toast({ title: "User Removed", description: `${userToRemove.displayName || userToRemove.email} has been removed from the team.` });
            setUserToRemove(null);
        } catch (error) {
            toast({ title: "Error", description: "Could not remove user from team.", variant: "destructive" });
        }
    }

    const handleSaveTeamName = async () => {
        if (!activeTeam || !firestore || editedTeamName.trim() === '' || editedTeamName === activeTeam.name) return;
        const teamRef = doc(firestore, 'teams', activeTeam.id);
        try {
            await updateDoc(teamRef, { name: editedTeamName });
            toast({ title: 'Success', description: 'Team name updated.' });
            setIsEditingTeamName(false);
        } catch (error) {
            toast({ title: 'Error', description: 'Could not update team name.', variant: 'destructive' });
        }
    };

    const handleCancelEditTeamName = () => {
        if (activeTeam) {
            setEditedTeamName(activeTeam.name);
        }
        setIsEditingTeamName(false);
    };

    const handleDeleteInvite = async () => {
        if (!firestore || !inviteToDelete) return;
        const inviteRef = doc(firestore, 'invites', inviteToDelete);
        try {
            await deleteDoc(inviteRef);
            toast({ title: 'Invite Revoked' });
        } catch (error) {
            toast({ title: 'Error', description: 'Could not revoke invitation.', variant: 'destructive' });
        }
        setInviteToDelete(null);
    };

    const handleCopyLink = (inviteId: string) => {
        const signupUrl = `${window.location.origin}/signup?inviteId=${inviteId}`;
        navigator.clipboard.writeText(signupUrl);
        setCopiedInviteId(inviteId);
        toast({ title: "Copied!", description: "Invitation link copied to clipboard." });
        setTimeout(() => setCopiedInviteId(null), 2000);
    }


    if (isLoadingTeams && !teams) {
        return (
            <div className="flex flex-1 items-center justify-center min-h-screen">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!teams || teams.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 pt-6 text-center">
                <h2 className="text-2xl font-bold">No team found</h2>
                <p className="text-muted-foreground mt-2">Create a team to start collaborating with others.</p>
                <div className="mt-4">
                    <CreateTeamDialog showPricing={(teams?.length || 0) >= 2} onTeamCreated={() => setRefreshKey(k => k + 1)} />
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                    <h3 className="text-3xl font-bold">Current Team</h3>
                    {isLoadingTeams ? (
                        <div className="h-10 w-[180px] mt-2 rounded-full bg-muted animate-pulse" />
                    ) : (
                        <div className="group relative mt-2 flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="font-bold pr-2">
                                        <span>{activeTeam?.name}</span>
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {teams?.map(team => (
                                        <DropdownMenuItem key={team.id} onSelect={() => setActiveTeam(team)}>
                                            {team.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>
                {activeTeam?.ownerId === user?.uid && (
                    <div className="flex items-center space-x-2">
                        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" disabled={!activeTeam}>
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete Team
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                                        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <AlertDialogTitle className="text-center">Delete Team</AlertDialogTitle>
                                    <AlertDialogDescription className="text-center">
                                        This action cannot be undone. This will permanently delete the
                                        <span className="font-bold"> {activeTeam?.name} </span> team and all associated workspaces, chats, images, and prompts. Please type <strong>DELETE</strong> to confirm.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="py-2">
                                    <Input
                                        id="delete-confirm"
                                        placeholder='Type "DELETE" to confirm'
                                        value={deleteConfirmation}
                                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <AlertDialogFooter className="sm:justify-center flex-row gap-2 pt-2">
                                    <AlertDialogCancel onClick={() => setDeleteConfirmation('')}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDeleteTeam}
                                        disabled={deleteConfirmation !== 'DELETE' || isDeleting}
                                        className={cn(buttonVariants({ variant: 'destructive' }))}
                                    >
                                        {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Delete Team
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <CreateTeamDialog showPricing={(teams?.length || 0) >= 2} onTeamCreated={() => setRefreshKey(k => k + 1)} />
                    </div>
                )}
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
                                <Button size="sm" onClick={handleSaveTeamName} disabled={editedTeamName.trim() === '' || editedTeamName === activeTeam?.name}>Save</Button>
                                <Button size="sm" variant="ghost" onClick={handleCancelEditTeamName}>Cancel</Button>
                            </div>
                        ) : (
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                {activeTeam?.name || 'Team Info'}
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
                            <Button onClick={openInviteDialog} disabled={(membersOfCurrentTeam.length >= (activeTeam?.memberLimit || Infinity))} className="w-full sm:w-auto">
                                <Mail className="mr-2 h-4 w-4" />
                                Send Invite
                            </Button>
                        </div>
                    </div>

                    {pendingInvites && pendingInvites.length > 0 && activeTeam?.ownerId === user?.uid && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-medium">Pending Invites</h3>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-auto px-3 py-1 text-xs font-normal rounded-full"
                                    onClick={() => {
                                        const newValue = !showPendingInvites;
                                        setShowPendingInvites(newValue);
                                        localStorage.setItem('showPendingInvites', String(newValue));
                                    }}
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
                                                    <TableCell>{invite.createdAt ? format(invite.createdAt.toDate(), 'PP') : 'N/A'}</TableCell>
                                                    <TableCell><Badge variant="secondary">{invite.status}</Badge></TableCell>
                                                    <TableCell className="text-center">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="ghost" size="icon" onClick={() => setInviteToView(invite)}>
                                                                        <Eye className="h-4 w-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent><p>View Details</p></TooltipContent>
                                                            </Tooltip>
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
                                                                    <Button variant="ghost" size="icon" onClick={() => setInviteToDelete(invite.id)}>
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
                        <h3 className="text-sm font-medium">Members: {membersOfCurrentTeam.length} / {activeTeam?.memberLimit}</h3>
                        <div className="hidden md:block rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead style={{ width: '30%' }}>Member</TableHead>
                                        <TableHead className="text-center" style={{ width: '15%' }}>Date Added</TableHead>
                                        <TableHead className="text-center" style={{ width: '15%' }}>Usage Limit</TableHead>
                                        <TableHead className="text-center" style={{ width: '15%' }}>Current Usage</TableHead>
                                        <TableHead className="text-center" style={{ width: '15%' }}>Allow Workspace Creation</TableHead>
                                        {activeTeam?.ownerId === user?.uid && (
                                            <TableHead className="text-right" style={{ width: '10%' }}>Actions</TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {(isLoadingUsers || isLoadingTeams) && <TableRow><TableCell colSpan={6} className="h-24 text-center">Loading members...</TableCell></TableRow>}
                                    {!(isLoadingUsers || isLoadingTeams) && membersOfCurrentTeam.map(member => {
                                        return (
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
                                                <TableCell className="text-center">{member.dateAdded ? format(member.dateAdded.toDate(), 'PP') : 'N/A'}</TableCell>
                                                <TableCell className="text-center">{member.role === 'Owner' ? '—' : (member.usageLimit ? member.usageLimit.toLocaleString() : 'Not Set')}</TableCell>
                                                <TableCell className="text-center">{member.role === 'Owner' ? '—' : (member.currentUsage ? member.currentUsage.toLocaleString() : '0')}</TableCell>
                                                <TableCell className="text-center">
                                                    {member.role === 'Owner' ? '—' : <Checkbox checked={member.allowWorkspaceCreation} disabled />}
                                                </TableCell>
                                                {activeTeam?.ownerId === user?.uid && (
                                                    <TableCell className="text-right">
                                                        {member.role !== 'Owner' && (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem onClick={() => handleOpenEditDialog(member)}>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem className="text-destructive" onClick={() => setUserToRemove(member)}>
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Remove User
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        )}
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        )
                                    })}
                                    {!(isLoadingUsers || isLoadingTeams) && membersOfCurrentTeam.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-muted-foreground py-4">
                                                No members have been added to this team yet.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
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
                                                                {member.displayName || member.username || member.email}
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
                                                        <div><strong>Date Added:</strong> {member.dateAdded ? format(member.dateAdded.toDate(), 'PP') : 'N/A'}</div>
                                                        <div><strong>Usage Limit:</strong> {member.role === 'Owner' ? '—' : (member.usageLimit ? member.usageLimit.toLocaleString() : 'Not Set')}</div>
                                                        <div><strong>Current Usage:</strong> {member.role === 'Owner' ? '—' : (member.currentUsage ? member.currentUsage.toLocaleString() : '0')}</div>
                                                        <div className="flex items-center gap-2"><strong>Allow Workspace Creation:</strong> {member.role === 'Owner' ? '—' : <Checkbox checked={member.allowWorkspaceCreation} disabled />}</div>
                                                    </div>
                                                    {activeTeam?.ownerId === user?.uid && member.role !== 'Owner' && (
                                                        <div className="flex gap-2 pt-4 border-t">
                                                            <Button variant="outline" size="sm" className="w-full" onClick={() => handleOpenEditDialog(member)}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                                            <Button variant="destructive" size="sm" className="w-full" onClick={() => setUserToRemove(member)}><Trash2 className="mr-2 h-4 w-4" /> Remove</Button>
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

            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invite New Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="email-confirm">Email Address</Label>
                            <Input id="email-confirm" value={newMemberEmail} readOnly />
                        </div>
                        <Label
                            htmlFor="allow-creation"
                            className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-accent"
                        >
                            <span className="font-normal">Allow Workspace Creation</span>
                            <Checkbox
                                id="allow-creation"
                                checked={allowWorkspaceCreation}
                                onCheckedChange={(checked) => setAllowWorkspaceCreation(!!checked)}
                            />
                        </Label>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label>Which Workspaces should member have access?</Label>
                                <Button variant="link" size="sm" className="p-0 h-auto text-black dark:text-white" onClick={handleSelectAllWorkspaces}>
                                    <ListFilter className="mr-2 h-4 w-4" />
                                    Select All
                                </Button>
                            </div>
                            <ScrollArea className="h-32 rounded-md border">
                                <div className="p-2 space-y-1">
                                    {isLoadingWorkspaces && <p className="p-2 text-sm text-muted-foreground">Loading...</p>}
                                    {teamWorkspaces && teamWorkspaces.length > 0 ? teamWorkspaces.map(ws => {
                                        return (
                                            <Label key={ws.id} htmlFor={`ws-select-${ws.id}`} className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={ws.avatarUrl} />
                                                        <AvatarFallback className={`${getAvatarBgColor(ws.id)} text-white`}>
                                                            {getAvatarInitial(ws.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-normal">{ws.name}</span>
                                                </div>
                                                <Checkbox id={`ws-select-${ws.id}`} onCheckedChange={() => setSelectedWorkspacesForInvite(prev => prev.includes(ws.id) ? prev.filter(id => id !== ws.id) : [...prev, ws.id])} checked={selectedWorkspacesForInvite.includes(ws.id)} />
                                            </Label>
                                        )
                                    }) : (
                                        !isLoadingWorkspaces && <p className="text-center text-sm text-muted-foreground p-4">No workspaces found in this team.</p>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="usage-limit">Set Usage Limit (Optional)</Label>
                            <Input
                                id="usage-limit"
                                placeholder={`Your remaining: ${ownerRemainingUsage.toLocaleString()} words`}
                                value={newMemberLimit}
                                onChange={handleInviteLimitChange}
                                type="number"
                                max="200000"
                                className={cn(inviteLimitError && 'border-destructive')}
                            />
                            {inviteLimitError && <p className="text-xs text-destructive">{inviteLimitError}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button onClick={handleSendInvite} disabled={isSending || !!inviteLimitError}>
                            {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                            {isSending ? "Sending..." : "Send Invite"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={!!userToEdit} onOpenChange={(open) => { if (!isSavingMemberChanges && !open) { setUserToEdit(null); setSelectedWorkspacesForEdit([]); } }}>
                <DialogContent className="max-w-md flex flex-col max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Edit Member</DialogTitle>
                        <DialogDescription>
                            Manage permissions and access for {userToEdit?.displayName || userToEdit?.email}.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="flex-1 px-1 max-h-[60vh]">
                        <div className="grid gap-6 py-4 pr-4">
                            {/* Usage Limit */}
                            <div className="grid gap-2">
                                <Label htmlFor="edit-usage-limit">Usage Limit (words)</Label>
                                <Input
                                    id="edit-usage-limit"
                                    type="number"
                                    placeholder={`Your remaining: ${ownerRemainingUsage.toLocaleString()} words`}
                                    value={editUsageLimit}
                                    onChange={handleEditLimitChange}
                                    max="200000"
                                    disabled={isSavingMemberChanges}
                                    className={cn(editLimitError && 'border-destructive')}
                                />
                                {editLimitError && <p className="text-xs text-destructive">{editLimitError}</p>}
                            </div>

                            {/* Allow Workspace Creation */}
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label htmlFor="edit-allow-creation" className="font-normal cursor-pointer">
                                        Allow Workspace Creation
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        Member can create new workspaces in this team
                                    </p>
                                </div>
                                <Checkbox
                                    id="edit-allow-creation"
                                    checked={allowWorkspaceCreationForEdit}
                                    onCheckedChange={(checked) => setAllowWorkspaceCreationForEdit(!!checked)}
                                    disabled={isSavingMemberChanges}
                                />
                            </div>

                            {/* Workspace Access */}
                            <div className="space-y-2">
                                <Label>Workspace Access</Label>
                                <p className="text-xs text-muted-foreground mb-2">
                                    Select which workspaces this member can access
                                </p>
                                <ScrollArea className="h-48 rounded-md border">
                                    <div className="p-2 space-y-1">
                                        {isLoadingWorkspaces && (
                                            <p className="p-2 text-sm text-muted-foreground">Loading workspaces...</p>
                                        )}
                                        {teamWorkspaces && teamWorkspaces.length > 0 ? (
                                            teamWorkspaces.map(ws => (
                                                <Label
                                                    key={ws.id}
                                                    htmlFor={`ws-edit-${ws.id}`}
                                                    className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarImage src={ws.avatarUrl} />
                                                            <AvatarFallback className={`${getAvatarBgColor(ws.id)} text-white`}>
                                                                {getAvatarInitial(ws.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-normal">{ws.name}</span>
                                                    </div>
                                                    <Checkbox
                                                        id={`ws-edit-${ws.id}`}
                                                        checked={selectedWorkspacesForEdit.includes(ws.id)}
                                                        onCheckedChange={() => {
                                                            setSelectedWorkspacesForEdit(prev =>
                                                                prev.includes(ws.id)
                                                                    ? prev.filter(id => id !== ws.id)
                                                                    : [...prev, ws.id]
                                                            );
                                                        }}
                                                        disabled={isSavingMemberChanges}
                                                    />
                                                </Label>
                                            ))
                                        ) : (
                                            !isLoadingWorkspaces && (
                                                <p className="text-center text-sm text-muted-foreground p-4">
                                                    No workspaces found in this team.
                                                </p>
                                            )
                                        )}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </ScrollArea>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => {
                            setUserToEdit(null);
                            setSelectedWorkspacesForEdit([]);
                        }} disabled={isSavingMemberChanges}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveMemberChanges} disabled={isSavingMemberChanges || !!editLimitError}>
                            {isSavingMemberChanges && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSavingMemberChanges ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Remove User Confirmation */}
            <AlertDialog open={!!userToRemove} onOpenChange={() => setUserToRemove(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <AlertDialogTitle className="text-center">Remove User?</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            Are you sure you want to remove <span className="font-bold">{userToRemove?.displayName || userToRemove?.email}</span> from this team?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center flex-row gap-2">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRemoveUser} className={buttonVariants({ variant: "destructive" })}>
                            Remove User
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={!!inviteToView} onOpenChange={() => setInviteToView(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Invitation Details</DialogTitle>
                        <DialogDescription className="break-words">For {inviteToView?.email}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {/* Single Card with all info */}
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                {/* Row 1: Workspace Creation */}
                                <div className="space-y-2">
                                    <p className="text-sm font-normal flex items-center gap-2">
                                        <PlusCircle className="h-4 w-4" />
                                        Workspace Creation
                                    </p>
                                    <div className="pl-6">
                                        <Badge variant="secondary" className="font-normal">
                                            {inviteToView?.allowWorkspaceCreation ? (
                                                <span className="flex items-center gap-1">
                                                    <Check className="h-3 w-3" />
                                                    Allowed
                                                </span>
                                            ) : (
                                                "Not Allowed"
                                            )}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Row 2: Usage Limit */}
                                <div className="space-y-2">
                                    <p className="text-sm font-normal flex items-center gap-2">
                                        <BarChart className="h-4 w-4" />
                                        Usage Limit
                                    </p>
                                    <div className="pl-6">
                                        <Badge variant="secondary" className="font-normal">
                                            {inviteToView?.usageLimit
                                                ? `${inviteToView.usageLimit.toLocaleString()} words`
                                                : 'No limit set'}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Row 3: Workspaces Access */}
                                <div className="space-y-2">
                                    <p className="text-sm font-normal flex items-center gap-2">
                                        <Users2 className="h-4 w-4" />
                                        Workspaces Access
                                    </p>
                                    <div className="pl-6">
                                        {inviteToView?.workspaceIds && inviteToView.workspaceIds.length > 0 ? (
                                            <ScrollArea className={cn(
                                                "w-full",
                                                inviteToView.workspaceIds.length > 3 && "h-[120px]"
                                            )}>
                                                <div className="space-y-2 pr-4">
                                                    {inviteToView.workspaceIds.map(id => {
                                                        const workspace = teamWorkspaces?.find(ws => ws.id === id);
                                                        return workspace ? (
                                                            <Badge
                                                                key={id}
                                                                variant="secondary"
                                                                className="font-normal inline-flex items-center gap-1.5 h-auto px-3 py-1 w-fit max-w-full"
                                                            >
                                                                <div className={`flex-shrink-0 h-4 w-4 rounded-full flex items-center justify-center overflow-hidden ${getAvatarBgColor(workspace.id)}`}>
                                                                    {workspace.avatarUrl ? (
                                                                        <img
                                                                            src={workspace.avatarUrl}
                                                                            alt={workspace.name}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <span className="text-[10px] font-bold text-white">
                                                                            {getAvatarInitial(workspace.name)}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <span className="truncate">{workspace.name}</span>
                                                            </Badge>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </ScrollArea>
                                        ) : (
                                            <Badge variant="secondary" className="font-normal">
                                                No workspaces assigned
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setInviteToView(null)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Delete Invite Confirmation */}
            <AlertDialog open={!!inviteToDelete} onOpenChange={() => setInviteToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <AlertDialogTitle className="text-center">Delete this invite?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center flex-row gap-2">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteInvite} className={buttonVariants({ variant: "destructive" })}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}


