'use client';
import { CollapsibleSidebar, modelIcons } from "@/components/sidebar";
// import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { useSupabaseAuth } from "@/components/supabase-auth-provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, createContext, useContext, useRef, useMemo, useCallback, Suspense } from "react";
import React from 'react';
import { MobileHeader } from "@/components/mobile-header";
// import { ChatHeader } from "@/components/chat/chat-header";
// import { doc, getDoc, collection, query, where, getDocs, orderBy, limit, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { GlobalLoader } from "@/components/ui/global-loader";
import { updateUserPreferences } from "@/app/actions";
import {
    SidebarProvider,
    Sidebar,
    SidebarInset,
} from "@/components/ui/sidebar"

import { useToast } from "@/hooks/use-toast";
// import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ClientErrorBoundary } from "@/components/client-error-boundary";
import { SupabaseAuthProvider } from '@/components/supabase-auth-provider';
import { DomainProvider } from '@/lib/domain-context';

import { cn } from "@/lib/utils";

const getValidStorageValue = (key: string, userId: string | undefined): string | null => {
    if (typeof window === 'undefined' || !userId) return null;

    try {
        const stored = localStorage.getItem(key);
        if (!stored) return null;

        const data = JSON.parse(stored);

        if (data.userId === userId) {
            return data.value;
        }

        localStorage.removeItem(key);
        return null;
    } catch {
        localStorage.removeItem(key);
        return null;
    }
};

const setStorageValue = (key: string, value: string, userId: string) => {
    if (typeof window === 'undefined') return;

    const data = {
        userId,
        value,
        timestamp: Date.now()
    };

    localStorage.setItem(key, JSON.stringify(data));
};


interface UserProfile {
    lastSelectedModel?: string;
    lastSelectedPersona?: string;
    profilePicture?: string;
    displayName?: string;
    username?: string;
}

interface Team {
    id: string;
    name: string;
    ownerId: string;
    memberIds?: string[];
    memberLimit?: number;
}

interface Workspace {
    id: string;
    name: string;
    avatarUrl?: string;
    customContext?: string;
    teamId: string;
    memberIds?: string[];
    pinnedPersonaIds?: string[];
}

interface AppLayoutContextType {
    activeWorkspace: Workspace | null;
    setActiveWorkspace: (workspace: Workspace | null) => void;
    activeTeam: Team | null;
    setActiveTeam: (team: Team | null, isLoggingOut?: boolean) => void;
    workspaceContext: string | undefined;
    can: (permission: 'view' | 'add' | 'edit' | 'delete', contentType: 'Prompts' | 'Images' | 'Chats' | 'Personas') => boolean;
    isPermissionsReady: boolean;
    selectedModel: string;
    onModelSelect: (model: string) => void;
    selectedPersona: string;
    onPersonaSelect: (persona: string) => void;
    toast: ({ }: any) => void;
    totalRemainingUsage: number;
    selectedModels: string[];
    setSelectedModels: (models: string[]) => void;
    // Chat header actions
    showSidePanel: boolean;
    toggleSidePanel: () => void;
    isWideScreen: boolean;
    toggleWideScreen: () => void;
}

export const AppLayoutContext = createContext<AppLayoutContextType | null>(null);

export const useAppLayout = () => {
    const context = useContext(AppLayoutContext);
    if (!context) {
        throw new Error('useAppLayout must be used within an AppLayoutProvider');
    }
    return context;
}

function AppLayoutProvider({ children }: { children: React.ReactNode }) {
    const { user, loading: isUserLoading } = useSupabaseAuth();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastUserId = useRef<string | null>(null);
    // const firestore = useFirestore();

    const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);
    const [activeTeamId, setActiveTeamId] = useState<string | null>(null);

    const isProfileLoading = false;
    // const userProfile = null;
    const userProfile: UserProfile | null = null;
    // const userProfileRef = useMemoFirebase(() =>
    //     user ? doc(firestore, `users/${user.uid}`) : null,
    //     [user, firestore]
    // );
    // const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

    // const activeTeam = null;
    const activeTeam: Team | null = null;
    // const teamRef = useMemoFirebase(() =>
    //     activeTeamId ? doc(firestore, 'teams', activeTeamId) : null,
    //     [activeTeamId, firestore]
    // );
    // const { data: activeTeam } = useDoc<Team>(teamRef);

    // const activeWorkspace = null;
    const activeWorkspace: Workspace | null = null;
    const isLoadingWorkspace = false;
    // const workspaceRef = useMemoFirebase(() =>
    //     activeWorkspaceId ? doc(firestore, 'workspaces', activeWorkspaceId) : null,
    //     [activeWorkspaceId, firestore]
    // );
    // const { data: activeWorkspace, isLoading: isLoadingWorkspace } = useDoc<Workspace>(workspaceRef);

    // const { can, isReady: isPermissionsReady } = useWorkspacePermissions(activeWorkspaceId, activeTeam);

    // const { can, isReady: isPermissionsReady } = useWorkspacePermissions(activeWorkspaceId, activeTeam);
    const can = () => false;
    const isPermissionsReady = true;

    const workspaceContext = activeWorkspace?.customContext;

    const [selectedModel, setSelectedModel] = useState("Gemini 2.5 Flash");
    const [selectedPersona, setSelectedPersona] = useState("Assistant");
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const { toast } = useToast();

    const [totalRemainingUsage, setTotalRemainingUsage] = useState(0);

    // Chat header actions state
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const toggleSidePanel = useCallback(() => setShowSidePanel(prev => !prev), []);
    const toggleWideScreen = useCallback(() => setIsWideScreen(prev => !prev), []);



    useEffect(() => {
        if (!isProfileLoading && userProfile) {
            setSelectedModel(userProfile.lastSelectedModel || "Gemini 2.5 Flash");
            setSelectedPersona(userProfile.lastSelectedPersona || "Assistant");
        }
    }, [userProfile, isProfileLoading]);

    const handleModelSelect = useCallback((model: string) => {
        setSelectedModel(model);
    }, []);

    const handlePersonaSelect = useCallback((persona: string) => {
        setSelectedPersona(persona);
    }, []);

    const handleSetActiveWorkspace = useCallback((workspace: Workspace | null) => {
        const newId = workspace?.id || null;
        if (activeWorkspaceId !== newId) {
            setActiveWorkspaceId(newId);
            if (typeof window !== 'undefined' && user?.id) {
                if (newId) {
                    setStorageValue('activeWorkspaceId', newId, user.id);
                } else {
                    localStorage.removeItem('activeWorkspaceId');
                }
            }
            if (pathname.startsWith('/chat')) {
                router.push('/home');
            }
        }
    }, [activeWorkspaceId, user, pathname, router]);

    const handleSetActiveTeam = useCallback(async (team: Team | null, isLoggingOut = false) => {
        const newId = team?.id || null;

        if (activeTeamId === newId) return;

        setActiveTeamId(newId);
        if (typeof window !== 'undefined' && user?.id) {
            if (newId) {
                setStorageValue('activeTeamId', newId, user.id);
            } else {
                localStorage.removeItem('activeTeamId');
            }
        }

        if (isLoggingOut && typeof window !== 'undefined') {
            localStorage.removeItem('activeTeamId');
            localStorage.removeItem('activeWorkspaceId');
        }

        if (team && user) {
            /*
            try {
                // Logic commented out to prevent crash - needs refactoring to Supabase
                const q = query(
                    collection(firestore, 'workspaces'),
                    where('teamId', '==', team.id),
                    orderBy('name', 'asc')
                );

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    handleSetActiveWorkspace(null);
                    toast({
                        title: "No Workspaces",
                        description: "This team has no workspaces yet.",
                        variant: "destructive"
                    });
                    return;
                }

                let userWorkspace: Workspace | null = null;

                for (const docSnap of querySnapshot.docs) {
                    const workspaceData = docSnap.data();
                    if (workspaceData.memberIds?.includes(user.uid)) {
                        userWorkspace = { id: docSnap.id, ...workspaceData } as Workspace;
                        break;
                    }
                }

                if (userWorkspace) {
                    let retries = 0;
                    const maxRetries = 5;

                    while (retries < maxRetries) {
                        const freshSnap = await getDoc(doc(firestore, 'workspaces', userWorkspace.id));
                        const freshData = freshSnap.data();

                        if (freshData?.memberIds?.includes(user.uid)) {
                            handleSetActiveWorkspace(userWorkspace);
                            toast({
                                title: "Team switched!",
                                description: `Now viewing ${team.name}`
                            });
                            return;
                        }

                        retries++;
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }

                    toast({
                        title: "Access Pending",
                        description: "Your workspace access is being set up. Please refresh the page in a moment.",
                        variant: "destructive"
                    });
                    handleSetActiveWorkspace(null);

                } else {
                    handleSetActiveWorkspace(null);
                    toast({
                        title: "No Access",
                        description: "You don't have access to any workspaces in this team yet.",
                        variant: "destructive"
                    });
                }

            } catch (error) {
                console.error('Error setting active team:', error);
                toast({
                    title: "Error",
                    description: "Failed to switch team. Please try again.",
                    variant: "destructive"
                });
            }
            */
            handleSetActiveWorkspace(null); // Fallback
        } else {
            handleSetActiveWorkspace(null);
        }

        if (pathname.startsWith('/chat')) {
            router.push('/home');
        }
    }, [activeTeamId, user, /*firestore,*/ handleSetActiveWorkspace, pathname, router, toast]);

    const prevWorkspaceRef = useRef<string | null>(null);
    const isInitialMount = useRef(true);
    const hasShownDeleteToast = useRef(false);

    useEffect(() => {
        if (isUserLoading) return;

        const currentUserId = user?.id || null;

        if (lastUserId.current && currentUserId !== lastUserId.current) {
            handleSetActiveWorkspace(null);
            handleSetActiveTeam(null, true);
            window.location.reload();
            return;
        }

        lastUserId.current = currentUserId;

        if (!currentUserId && pathname !== '/login' && pathname !== '/signup' && !pathname.startsWith('/join-team') && pathname !== '/test-sidebar') {
            const currentPath = window.location.pathname + window.location.search;
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        } else if (currentUserId) {
            if (typeof window !== 'undefined') {
                const urlParams = new URLSearchParams(window.location.search);
                const inviteId = urlParams.get('inviteId');

                if (inviteId) {
                    localStorage.removeItem('activeTeamId');
                    localStorage.removeItem('activeWorkspaceId');
                    setActiveTeamId(null);
                    setActiveWorkspaceId(null);
                    return;
                }

                const storedTeamId = getValidStorageValue('activeTeamId', currentUserId);
                const storedWorkspaceId = getValidStorageValue('activeWorkspaceId', currentUserId);

                if (storedTeamId) setActiveTeamId(storedTeamId);
                if (storedWorkspaceId) setActiveWorkspaceId(storedWorkspaceId);
            }
        }
    }, [user, isUserLoading, router, pathname, handleSetActiveTeam, handleSetActiveWorkspace]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            prevWorkspaceRef.current = activeWorkspaceId;
            return;
        }

        const wasActive = prevWorkspaceRef.current;

        if (wasActive && activeWorkspaceId === wasActive && !isLoadingWorkspace && activeWorkspace === null && !hasShownDeleteToast.current) {
            hasShownDeleteToast.current = true;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('activeWorkspaceId');
            }

            setActiveWorkspaceId(null);

            toast({
                title: "This workspace has been deleted",
                description: "Redirecting to your personal space...",
                variant: "destructive",
            });

            setTimeout(() => {
                router.push('/home');
                hasShownDeleteToast.current = false;
            }, 1000);
        }

        prevWorkspaceRef.current = activeWorkspaceId;
    }, [activeWorkspaceId, activeWorkspace, isLoadingWorkspace, router, toast]);

    useEffect(() => {
        const workspaceIdFromPath = pathname.match(/\/workspace\/([^\/]+)/)?.[1];
        if (workspaceIdFromPath && activeWorkspace === null && !isLoadingWorkspace && !isInitialMount.current) {
            toast({
                title: 'Workspace not found',
                description: 'This workspace may have been deleted.',
                variant: 'destructive'
            });
            router.push('/home');
        }
    }, [pathname, activeWorkspace, isLoadingWorkspace, router, toast]);


    const layoutContextValue = useMemo(() => ({
        activeWorkspace: activeWorkspace || null,
        setActiveWorkspace: handleSetActiveWorkspace,
        activeTeam: activeTeam || null,
        setActiveTeam: handleSetActiveTeam,
        workspaceContext,
        can,
        isPermissionsReady,
        selectedModel,
        onModelSelect: handleModelSelect,
        selectedPersona,
        onPersonaSelect: handlePersonaSelect,
        toast,
        totalRemainingUsage,
        selectedModels,
        setSelectedModels,
        // Chat header actions
        showSidePanel,
        toggleSidePanel,
        isWideScreen,
        toggleWideScreen,
    }), [activeWorkspace, activeTeam, workspaceContext, can, isPermissionsReady, selectedModel, selectedPersona, handleSetActiveWorkspace, handleSetActiveTeam, handleModelSelect, handlePersonaSelect, toast, totalRemainingUsage, selectedModels, showSidePanel, toggleSidePanel, isWideScreen, toggleWideScreen]);


    return (
        <AppLayoutContext.Provider value={layoutContextValue}>
            {children}
        </AppLayoutContext.Provider>
    );
}

function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, loading: isUserLoading } = useSupabaseAuth();
    const {
        activeWorkspace, setActiveWorkspace,
        activeTeam, setActiveTeam,
        selectedModel, onModelSelect,
        selectedPersona, onPersonaSelect,
        selectedModels,
        setSelectedModels
    } = useAppLayout();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isNavigating, setIsNavigating] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setIsNavigating(false);
        if (mainRef.current) {
            mainRef.current.scrollTop = 0;
        }
    }, [pathname, searchParams]);

    if (isUserLoading || !user) {
        return <GlobalLoader size={100} />;
    }

    if (pathname === '/edit-image') {
        return <>{children}</>;
    }

    /*
    const isChatPage = pathname === '/chat';
    const isTempChat = searchParams.get('temp') === 'true';
    const openModelSelector = searchParams.get('openModelSelector') === 'true';
    const modelType = searchParams.get('modelType');
    */

    return (
        <SidebarProvider>
            {/* Outer Sidebar with neutral background */}
            <Sidebar
                className="border-r-0 bg-[#f8f8f8] dark:bg-[#000000]"
                style={{ "--sidebar-background": "transparent" } as React.CSSProperties}
            >
                <CollapsibleSidebar
                    TopIcon={modelIcons.bot}
                    onLinkClick={() => setIsNavigating(true)}
                    activeWorkspace={activeWorkspace}
                    onWorkspaceSelect={setActiveWorkspace}
                    activeTeam={activeTeam}
                    onTeamSelect={setActiveTeam}
                />
            </Sidebar>

            {/* SidebarInset with neutral background and padding for the card effect */}
            <SidebarInset className="bg-[#f8f8f8] dark:bg-[#000000] border-l-0 md:pr-3 md:pt-3 md:pb-3 overflow-hidden w-full flex flex-col">
                <div className="flex h-14 items-center gap-4 px-4 flex-shrink-0 md:hidden">
                    <MobileHeader
                        onLinkClick={() => setIsNavigating(true)}
                        activeWorkspace={activeWorkspace}
                        onWorkspaceSelect={setActiveWorkspace}
                        activeTeam={activeTeam}
                        onTeamSelect={setActiveTeam}
                    />
                </div>

                {/* The Main Content Card */}
                <div className="flex-1 min-h-0 w-full bg-background md:rounded-2xl border shadow-sm overflow-hidden flex flex-col relative md:ml-2">
                    {isNavigating && <GlobalLoader size={100} />}
                    <main ref={mainRef} className={cn("flex-1 flex flex-col", isNavigating ? "overflow-hidden" : "overflow-y-auto")}>
                        <DomainProvider>
                            {children}
                        </DomainProvider>
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<GlobalLoader size={100} />}>
            {/* <AppLayoutProvider> uses useSupabaseAuth, so SupabaseAuthProvider must be outside OR assumed from root */}
            <SupabaseAuthProvider>
                <AppLayoutProvider>
                    <ClientErrorBoundary>
                        <MainLayout>{children}</MainLayout>
                    </ClientErrorBoundary>
                </AppLayoutProvider>
            </SupabaseAuthProvider>
        </Suspense>
    )
}
