'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Bot,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Settings,
  LogOut,
  Moon,
  Sun,
  ArrowDownUp,
  User as UserIcon,
  CheckCircle,
  Search,
  Building,
  Home,
  Library,
  ScrollText,
  Users,
  AreaChart,
  TrendingUp,
  Activity,
  Package,
  LayoutDashboard,
  Sparkles,
  FileText,
  Map,
  List,
  PlusCircle,
  MessageSquarePlus,
  History,
  FlaskConical,
  Mail,
  Megaphone,
  LayoutTemplate,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { useTheme } from "next-themes";
import Image from 'next/image';

import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { useSidebar, SidebarMenuButton, SidebarTrigger } from './ui/sidebar';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ClaudeIcon, DeepseekIcon, GeminiIcon, GptIcon, GrokIcon, MetaIcon, MidjourneyIcon, StableDiffusionIcon, PerplexityIcon, FluxIcon, IdeogramIcon, LeonardoIcon } from './model-icons';
import { Label } from './ui/label';
import { getAvatarBgColor, getAvatarInitial } from '@/lib/avatar-utils';
import { ProfileDialog } from '@/components/profile-dialog';
import { useAppLayout } from '@/app/(app)/layout';
import { useToast } from '@/hooks/use-toast';
import { CreateSaasDialog } from '@/components/create-saas-dialog';
import { createClient } from '@/utils/supabase/client';
import { useSupabaseAuth } from '@/components/supabase-auth-provider';


const LogoIcon = () => (
  <Image
    src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png"
    alt="Scalerbox Logo"
    width={40}
    height={40}
  />
);

const BotIcon = () => (
  <Bot size={28} />
);

const BlogsIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 -960 960 960"
    width={size}
    fill="currentColor"
    className="lucide lucide-rss"
  >
    <path d="M400-280h160v-80H400v80Zm0-160h280v-80H400v80ZM280-600h400v-80H280v80Zm200 120ZM265-80q-79 0-134.5-55.5T75-270q0-57 29.5-102t77.5-68H80v-80h240v240h-80v-97q-37 8-61 38t-24 69q0 46 32.5 78t77.5 32v80Zm135-40v-80h360v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H400Z" />
  </svg>
);

const ConnectionsIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 -960 960 960"
    width={size}
    fill="currentColor"
    className="lucide"
  >
    <path d="M760-600q-57 0-99-34t-56-86H354q-11 42-41.5 72.5T240-606v251q52 14 86 56t34 99q0 66-47 113T200-40q-66 0-113-47T40-200q0-57 34-99t86-56v-251q-52-14-86-56t-34-98q0-66 47-113t113-47q56 0 98 34t56 86h251q14-52 56-86t99-34q66 0 113 47t47 113q0 66-47 113t-113 47ZM200-120q33 0 56.5-24t23.5-56q0-33-23.5-56.5T200-280q-32 0-56 23.5T120-200q0 32 24 56t56 24Zm0-560q33 0 56.5-23.5T280-760q0-33-23.5-56.5T200-840q-32 0-56 23.5T120-760q0 33 24 56.5t56 23.5ZM760-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113T760-40Zm0-80q33 0 56.5-24t23.5-56q0-33-23.5-56.5T760-280q-33 0-56.5 23.5T680-200q0 32 23.5 56t56.5 24Zm0-560q33 0 56.5-23.5T840-760q0-33-23.5-56.5T760-840q-33 0-56.5 23.5T680-760q0 33 23.5 56.5T760-680ZM200-200Zm0-560Zm560 560Zm0-560Z" />
  </svg>
);

const AppearanceIcon = ({ size = 20, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 -960 960 960"
    width={size}
    fill="currentColor"
    className={className}
  >
    <path d="M396-396q-32-32-58.5-67T289-537q-5 14-6.5 28.5T281-480q0 83 58 141t141 58q14 0 28.5-2t28.5-6q-39-22-74-48.5T396-396Zm57-56q51 51 114 87.5T702-308q-40 51-98 79.5T481-200q-117 0-198.5-81.5T201-480q0-65 28.5-123t79.5-98q20 72 56.5 135T453-452Zm290 72q-20-5-39.5-11T665-405q8-18 11.5-36.5T680-480q0-83-58.5-141.5T480-680q-20 0-38.5 3.5T405-665q-8-19-13.5-38T381-742q24-9 49-13.5t51-4.5q117 0 198.5 81.5T761-480q0 26-4.5 51T743-380ZM440-840v-120h80v120h-80Zm0 840v-120h80V0h-80Zm323-706-57-57 85-84 57 56-85 85ZM169-113l-57-56 85-85 57 57-85 84Zm671-327v-80h120v80H840ZM0-440v-80h120v80H0Zm791 328-85-85 57-57 84 85-56 57ZM197-706l-84-85 56-57 85 85-57 57Zm199 310Z" />
  </svg>
);

const SchedulerIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 -960 960 960"
    width={size}
    fill="currentColor"
    className="lucide"
  >
    <path d="M200-640h560v-80H200v80Zm0 0v-80 80Zm0 560q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v227q-19-9-39-15t-41-9v-43H200v400h252q7 22 16.5 42T491-80H200Zm520 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm67-105 28-28-75-75v-112h-40v128l87 87Z" />
  </svg>
);

const UsageIcon = ({ size = 20, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 -960 960 960"
    width={size}
    fill="currentColor"
    className={className || "lucide"}
  >
    <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
  </svg>
);

const RevenueIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 -960 960 960"
    width={size}
    fill="currentColor"
    className="lucide"
  >
    <path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z" />
  </svg>
);

const DomainIcon = ({ size = 20, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);


export const modelIcons: Record<string, React.FC> = {
  claude: ClaudeIcon,
  deepseek: DeepseekIcon,
  gemini: GeminiIcon,
  gpt: GptIcon,
  openai: GptIcon,
  grok: GrokIcon,
  meta: MetaIcon,
  midjourney: MidjourneyIcon,
  stablediffusion: StableDiffusionIcon,
  perplexity: PerplexityIcon,
  flux: FluxIcon,
  ideogram: IdeogramIcon,
  leonardo: LeonardoIcon,
};

interface Team {
  id: string;
  name: string;
  ownerId: string;
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

interface UserProfile {
  id: string;
  username?: string;
  displayName?: string;
  email?: string;
  avatarColorIndex?: number;

  profilePicture?: string;
}

interface SaasProject {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

interface SidebarProps {
  TopIcon?: React.FC;
  isMobile?: boolean;
  onLinkClick?: () => void;
  activeWorkspace: Workspace | null;
  onWorkspaceSelect: (workspace: Workspace | null) => void;
  activeTeam: Team | null;
  onTeamSelect: (team: Team | null, isLoggingOut?: boolean) => void;
}

interface MenuItem {
  href: string;
  icon: any;
  label: string;
  target?: string;
  activeMatches?: string[];
}

interface Group {
  id: string;
  label: string;
  icon: any;
  items: MenuItem[];
  href?: string;
}

const aiLabMenuItems: MenuItem[] = [
  { href: '/image-library', icon: Library, label: 'Image Library' },
  { href: '/prompts', icon: ScrollText, label: 'Prompts' },
  { href: '/social-accounts', icon: Users, label: 'Social Accounts' },
];

const saasOverviewMenuItems: MenuItem[] = [
  { href: '/saas-dashboard', icon: AreaChart, label: 'SaaS Dashboard' },
  { href: '/revenue-dashboard', icon: RevenueIcon, label: 'Revenue Dashboard' },
  { href: '/user-dashboard', icon: TrendingUp, label: 'User Dashboard' },
  { href: '/product-dashboard', icon: Activity, label: 'Product Dashboard' },
  { href: '/customer-dashboard', icon: Users, label: 'Customer Dashboard' },
  { href: '/integrations', icon: Package, label: 'Integrations' },
];

const blogsMenuItems: MenuItem[] = [
  { href: '/blogs/connections', icon: ConnectionsIcon, label: 'Connections' },
  { href: '/blogs/automations', icon: Sparkles, label: 'Automations' },
  { href: '/blogs/content', icon: FileText, label: 'Content' },
  { href: '/blogs/scheduler', icon: SchedulerIcon, label: 'Scheduler' },
];

const emailMarketingMenuItems: MenuItem[] = [
  { href: '/email-marketing/dashboard', icon: LayoutDashboard, label: 'Email Dashboard' },
  { href: '/email-marketing/campaigns', icon: Megaphone, label: 'Campaigns' },
  { href: '/email-marketing/templates', icon: LayoutTemplate, label: 'Templates', activeMatches: ['/email-marketing/email-editor'] },
  { href: '/email-marketing/lists', icon: List, label: 'Lists' },
  { href: '/email-marketing/domains', icon: DomainIcon, label: 'Domains' },
];

const feedbackMenuItems: MenuItem[] = [
  { href: '/feedback/board', icon: LayoutDashboard, label: 'Board' },


  { href: '/feedback/settings', icon: Settings, label: 'Settings' },
  { href: '/feedback/general-settings', icon: Settings, label: 'General Settings' },
];

const roadmapMenuItems: MenuItem[] = [
  { href: '/roadmap/board', icon: Map, label: 'Roadmap' },
  { href: '/roadmap/settings', icon: Settings, label: 'Settings' },
  { href: '/roadmap/general-settings', icon: Settings, label: 'General Settings' },
];

const changelogMenuItems: MenuItem[] = [
  { href: '/changelog/entries', icon: List, label: 'All Entries' },
  { href: '/changelog/create', icon: PlusCircle, label: 'Create Entry' },
  { href: '/changelog/settings', icon: Settings, label: 'Settings' },
  { href: '/changelog/general-settings', icon: Settings, label: 'General Settings' },
];

const groups: Group[] = [
  { id: 'home', label: 'Home', icon: Home, href: '/home', items: [] },
  { id: 'feedback', label: 'Feedback', icon: MessageSquarePlus, items: feedbackMenuItems },
  { id: 'roadmap', label: 'Roadmap', icon: Map, items: roadmapMenuItems },
  { id: 'changelog', label: 'Changelog', icon: History, items: changelogMenuItems },
  { id: 'ai-lab', label: 'AI Lab', icon: FlaskConical, items: aiLabMenuItems },
  { id: 'saas-overview', label: 'SaaS Overview', icon: AreaChart, items: saasOverviewMenuItems },
  { id: 'blogs', label: 'Blogs', icon: BlogsIcon, items: blogsMenuItems },
  { id: 'email-marketing', label: 'Email Marketing', icon: Mail, items: emailMarketingMenuItems },
  { id: 'team', label: 'Team', icon: Users, href: '/team', items: [] },

];

const isItemActive = (item: MenuItem, pathname: string) => {
  return pathname === item.href ||
    pathname.startsWith(item.href + '/') ||
    (item.activeMatches || []).some(match => pathname === match || pathname.startsWith(match + '/'));
}

const findActiveGroup = (pathname: string): Group | null => {
  if (!pathname) return null;
  for (const group of groups) {
    if (group.href && (pathname === group.href || pathname.startsWith(group.href + '/'))) {
      return group;
    }
    if (group.items.some(item => isItemActive(item, pathname))) {
      return group;
    }
  }
  return null;
};

export function CollapsibleSidebar({ TopIcon = LogoIcon, isMobile = false, onLinkClick, activeWorkspace, onWorkspaceSelect, activeTeam, onTeamSelect }: SidebarProps) {
  const { open: isSidebarOpen, state, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, signOut: supabaseSignOut } = useSupabaseAuth();
  // const firestore = useFirestore();
  const { can } = useAppLayout();
  const { toast } = useToast();
  const { setTheme } = useTheme();
  // const { signOut: supabaseSignOut } = useSupabaseAuth();

  const showFullSidebar = isMobile || isSidebarOpen;

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  //   const userProfileRef = useMemoFirebase(() =>
  //     user ? doc(firestore, 'users', user.uid) : null,
  //     [user, firestore]
  //   );
  //   const { data: userProfile } = useDoc<UserProfile>(userProfileRef);
  const userProfile = null as UserProfile | null; // Placeholder until Supabase profile is implemented

  const [isWorkspaceDialogOpen, setIsWorkspaceDialogOpen] = useState(false);
  const [teamSearch, setTeamSearch] = useState("");

  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isCreateSaasDialogOpen, setIsCreateSaasDialogOpen] = useState(false);
  const [saasProjects, setSaasProjects] = useState<SaasProject[]>([]);
  const supabase = createClient();

  const fetchSaasProjects = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('saas_projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setSaasProjects(data);
    if (error) console.error('Error fetching projects:', error);
  };

  useEffect(() => {
    if (isWorkspaceDialogOpen) {
      fetchSaasProjects();
    }
  }, [isWorkspaceDialogOpen, user]);

  // State for drill-down navigation
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);

  useEffect(() => {
    // Determine active group on mount and path change
    const group = findActiveGroup(pathname);
    setActiveGroup(group);
  }, [pathname]);

  // Custom scroll logic for collapsed sidebar
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!scrollAreaRef.current) return;
    const viewport = scrollAreaRef.current.querySelector('[data-scroll-viewport]');
    if (!viewport) return;

    const checkScroll = () => {
      setCanScrollUp(viewport.scrollTop > 0);
      setCanScrollDown(viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 1);
    };

    checkScroll();
    viewport.addEventListener('scroll', checkScroll);

    // Use ResizeObserver to detect content/size changes
    const observer = new ResizeObserver(() => {
      checkScroll();
    });
    observer.observe(viewport);
    // Observe the content wrapper (the first child of viewport usually)
    if (viewport.children.length > 0) {
      observer.observe(viewport.children[0]);
    }

    return () => {
      viewport.removeEventListener('scroll', checkScroll);
      observer.disconnect();
    };
  }, [activeGroup, showFullSidebar]); // Re-run when content structure might change

  useEffect(() => {
    stopScrolling();
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [showFullSidebar]);

  const startScrolling = (direction: 'up' | 'down') => {
    if (!scrollAreaRef.current) return;
    const viewport = scrollAreaRef.current.querySelector('[data-scroll-viewport]');
    if (!viewport) return;

    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);

    scrollIntervalRef.current = setInterval(() => {
      const amount = direction === 'up' ? -5 : 5;
      viewport.scrollTop += amount;
    }, 10);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  //   const teamsQuery = useMemoFirebase(() =>
  //     user ? query(collection(firestore, 'teams'), where('memberIds', 'array-contains', user.uid)) : null,
  //     [user, firestore]
  //   );
  //   const { data: teams } = useCollection<Team>(teamsQuery);
  const teams: Team[] = []; // Placeholder

  const filteredTeams = useMemo(() => {
    return teams?.filter(t => t.name.toLowerCase().includes(teamSearch.toLowerCase())) || [];
  }, [teams, teamSearch]);

  const handleLogout = async () => {
    onWorkspaceSelect(null);
    onTeamSelect(null, true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('activeWorkspaceId');
      localStorage.removeItem('activeTeamId');
    }
    await supabaseSignOut();
    router.push('/');
  };

  const handleLinkClick = (path?: string, target?: string) => {
    if (path) {
      if (target === '_blank') {
        window.open(path, '_blank');
        return;
      }
      if (path === pathname) return;
      router.push(path);
    }
    if (onLinkClick) {
      onLinkClick();
    }
  }

  const handleGroupSelect = (group: Group) => {
    setActiveGroup(group);
    if (group.items && group.items.length > 0) {
      handleLinkClick(group.items[0].href);
    }
  }

  const handleChatNavigation = (path: string) => {
    if (!can('add', 'Chats')) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to create chats in this workspace.",
        variant: "destructive"
      });
      return;
    }
    handleLinkClick(path);
  }

  const handleTeamSelect = (team: Team | null) => {
    onTeamSelect(team);
    setIsWorkspaceDialogOpen(false);
  }

  const userDisplayName = userProfile?.displayName || user?.email?.split('@')[0] || 'User';

  const isTemporaryChat = searchParams.get('temp') === 'true';

  const content = (
    <>
      <div className={cn("flex flex-col flex-shrink-0 p-2 gap-4", !showFullSidebar && "items-center")}>
        <div className={cn("flex w-full items-center", showFullSidebar ? "justify-between" : "justify-center")}>
          {showFullSidebar ? (
            <>
              <div className="flex items-center gap-2">
                <TopIcon />
                <span className="font-extrabold">Scalerbox</span>
              </div>
              <SidebarTrigger />
            </>
          ) : (
            <SidebarTrigger />
          )}
        </div>
      </div>

      <div className="flex-grow min-h-0 relative group/sidebar-scroll">
        {!showFullSidebar && canScrollUp && (
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 z-10 p-1 opacity-0 group-hover/sidebar-scroll:opacity-100 transition-opacity bg-background rounded-full cursor-pointer shadow-md border"
            onMouseEnter={() => startScrolling('up')}
            onMouseLeave={stopScrolling}
          >
            <ChevronUp size={14} />
          </div>
        )}
        <ScrollArea ref={scrollAreaRef} className={cn("h-full", !showFullSidebar && "[&_[data-orientation=vertical]]:hidden")}>
          <div className={cn("flex flex-col gap-2 mt-2", showFullSidebar ? "p-2" : "p-2 items-center")}>
            {(() => {
              // Check if we're inside a tab group
              const currentActiveGroup = findActiveGroup(pathname);
              const isInsideTabGroup = currentActiveGroup && currentActiveGroup.items && currentActiveGroup.items.length > 0;

              if (isInsideTabGroup) {
                // DRILL-DOWN VIEW: Inside a tab group
                // Show: Home breadcrumb (Home > Tab Name) + Sub-items of that tab only
                const activeItem = currentActiveGroup.items.find(item => isItemActive(item, pathname));
                const currentItemLabel = activeItem?.label || currentActiveGroup.label;

                return (
                  <div className="flex flex-col gap-1 w-full animate-in fade-in slide-in-from-right-4 duration-300">
                    {/* Home Breadcrumb: Home icon > Tab Name */}
                    <div className={cn(
                      "flex items-center gap-1",
                      showFullSidebar ? "w-full px-2 h-10" : "justify-center h-10 w-10"
                    )}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 flex-shrink-0"
                            onClick={() => handleLinkClick('/home')}
                          >
                            <Home size={20} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" hidden={showFullSidebar || isMobile}>
                          <p>Home</p>
                        </TooltipContent>
                      </Tooltip>
                      {showFullSidebar && (
                        <div className="flex items-center text-muted-foreground">
                          <ChevronRight size={14} />
                          <span className="font-medium ml-1 text-foreground truncate">{currentActiveGroup.label}</span>
                        </div>
                      )}
                    </div>

                    {/* Sub-items of the current tab group */}
                    {currentActiveGroup.items.map((item, index) => {
                      const isActive = isItemActive(item, pathname);
                      return (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={isActive ? "secondary" : "ghost"}
                              size={showFullSidebar ? "lg" : "icon"}
                              className={cn(
                                "relative",
                                showFullSidebar && "w-full justify-start px-2"
                              )}
                              onClick={() => handleLinkClick(item.href, item.target)}
                            >
                              <item.icon size={20} />
                              {showFullSidebar && <span className="ml-2">{item.label}</span>}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" hidden={showFullSidebar || isMobile}>
                            <p>{item.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                );
              } else {
                // MAIN VIEW: On Home page or individual button pages (like Team)
                // Show: All groups normally
                return (
                  <div className="flex flex-col gap-1 w-full animate-in fade-in slide-in-from-left-4 duration-300">
                    {groups.map((group, index) => {
                      // Check if this group is currently active
                      const isGroupActive = group.href
                        ? (pathname === group.href || pathname.startsWith(group.href + '/'))
                        : group.items.some(item => isItemActive(item, pathname));

                      // Check if this is a tab group (has sub-items)
                      const isTabGroup = group.items && group.items.length > 0;

                      return (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={isGroupActive ? "secondary" : "ghost"}
                              size={showFullSidebar ? "lg" : "icon"}
                              className={cn(
                                "relative group",
                                showFullSidebar && "w-full justify-between px-2"
                              )}
                              onClick={() => {
                                if (group.href) {
                                  // Individual button - navigate directly
                                  handleLinkClick(group.href);
                                } else if (isTabGroup) {
                                  // Tab group - navigate to first item
                                  handleLinkClick(group.items[0].href);
                                }
                              }}
                            >
                              <div className="flex items-center">
                                <group.icon size={20} />
                                {showFullSidebar && <span className="ml-2 font-medium">{group.label}</span>}
                              </div>
                              {showFullSidebar && isTabGroup && (
                                <ChevronRight size={16} className="text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" hidden={showFullSidebar || isMobile}>
                            <p>{group.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                );
              }
            })()}

          </div>
        </ScrollArea>
        {!showFullSidebar && canScrollDown && (
          <div
            className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 p-1 opacity-0 group-hover/sidebar-scroll:opacity-100 transition-opacity bg-background rounded-full cursor-pointer shadow-md border"
            onMouseEnter={() => startScrolling('down')}
            onMouseLeave={stopScrolling}
          >
            <ChevronDown size={14} />
          </div>
        )}
      </div>

      <div className={cn("flex flex-col flex-shrink-0 mt-auto p-2", showFullSidebar && "w-full")}>
        <div className={cn(
          "flex flex-col gap-1",
          showFullSidebar ? "border rounded-xl bg-sidebar-accent/10 shadow-sm p-1" : "items-center gap-2"
        )}>
          <Dialog open={isWorkspaceDialogOpen} onOpenChange={setIsWorkspaceDialogOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant="ghost" size={showFullSidebar ? "default" : "icon"} className={cn("relative flex items-center h-auto py-2", showFullSidebar && "w-full justify-between")}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={`${getAvatarBgColor(activeTeam?.id)} text-white font-bold`}>
                        {getAvatarInitial(activeTeam?.name || 'Personal')}
                      </AvatarFallback>
                    </Avatar>
                    {showFullSidebar && (
                      <div className="flex items-center gap-2 overflow-hidden ml-2 flex-1 text-left">
                        <div className="grid flex-1 leading-tight">
                          <p className="text-xs text-muted-foreground truncate">SaaS Overview</p>
                          <p className="font-medium truncate">{activeTeam ? activeTeam.name : "Personal"}</p>
                        </div>
                        <ArrowDownUp className="h-4 w-4 text-muted-foreground ml-auto flex-shrink-0" />
                      </div>
                    )}
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="right" hidden={showFullSidebar || isMobile}>
                <p>SaaS Overview / {activeTeam ? activeTeam.name : "Personal"}</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent className="space-y-4">
              <DialogHeader className="flex flex-row items-center justify-between space-y-0">
                <DialogTitle className="text-xl">Active SaaS Overview</DialogTitle>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-glow to-violet-glow text-white border-0 h-8"
                  onClick={() => setIsCreateSaasDialogOpen(true)}
                >
                  Create New SaaS
                </Button>
              </DialogHeader>
              <div className="space-y-1">
                <Label className="pl-1">Select SaaS</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Default SaaS</span>
                      <ArrowDownUp className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    <DropdownMenuItem>Default SaaS</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-1">
                <Label className="pl-1">Select Team</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search Teams..."
                    className="pl-10"
                    value={teamSearch}
                    onChange={(e) => setTeamSearch(e.target.value)}
                  />
                </div>
              </div>
              <Card>
                <ScrollArea className="h-full max-h-64">
                  <ScrollBar alwaysVisible />
                  <div
                    className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent border-b"
                    onClick={() => handleTeamSelect(null)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile?.profilePicture || undefined} alt={userDisplayName} />
                      <AvatarFallback className={`${getAvatarBgColor(userProfile?.avatarColorIndex)} text-white font-bold`}>
                        {getAvatarInitial(userDisplayName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Personal Team</span>
                    {!activeTeam && <CheckCircle className="ml-auto h-5 w-5 text-primary" />}
                  </div>

                  {/* Supabase Projects */}
                  {saasProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent border-b"
                      onClick={() => {
                        // For now, just logging or setting active if we had a state for it
                        console.log("Selected Supabase Project:", project);
                        // toast({ title: "Selected", description: project.name });
                        setIsWorkspaceDialogOpen(false);
                      }}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={`${getAvatarBgColor(index)} text-white font-bold`}>
                          {getAvatarInitial(project.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{project.name}</span>
                    </div>
                  ))}

                  {/* Existing Firebase Teams */}
                  {filteredTeams.map((team, index) => (
                    <div
                      key={team.id}
                      className={cn(
                        "flex items-center gap-3 p-3 cursor-pointer hover:bg-accent",
                        index < filteredTeams.length - 1 && "border-b"
                      )}
                      onClick={() => handleTeamSelect(team)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={`${getAvatarBgColor(team.id)} text-white font-bold`}>
                          {getAvatarInitial(team.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{team.name}</span>
                      {activeTeam?.id === team.id && <CheckCircle className="ml-auto h-5 w-5 text-primary" />}
                    </div>
                  ))}
                  {filteredTeams.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <Users className="h-12 w-12 text-muted-foreground mb-3" />
                      <p className="font-medium text-muted-foreground">No teams found</p>
                    </div>
                  )}
                </ScrollArea>
              </Card>
            </DialogContent>
          </Dialog>

          {/* User Profile Section */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className="w-full h-auto py-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userProfile?.profilePicture || undefined} alt={user?.user_metadata?.display_name || user?.email || ''} />
                  <AvatarFallback className={`rounded-lg ${getAvatarBgColor(userProfile?.avatarColorIndex)} text-white`}>
                    {getAvatarInitial(user?.user_metadata?.display_name || user?.email || '')}
                  </AvatarFallback>
                </Avatar>
                {showFullSidebar && (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userProfile?.displayName || user?.email?.split('@')[0] || 'User'}</span>
                    <span className="truncate text-xs">{(user?.email === 'darshjain654@gmail.com') ? 'ScalerboxUser@email.com' : user?.email}</span>
                  </div>
                )}
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" sideOffset={4} className="w-[--radix-dropdown-menu-trigger-width] min-w-56">
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userProfile?.profilePicture || undefined} alt={user?.user_metadata?.display_name || user?.email || ''} />
                    <AvatarFallback className={`rounded-lg ${getAvatarBgColor(userProfile?.avatarColorIndex)} text-white`}>
                      {getAvatarInitial(user?.user_metadata?.display_name || user?.email || '')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userProfile?.displayName || user?.email?.split('@')[0] || 'User'}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setTimeout(() => {
                    setIsProfileDialogOpen(true);
                  }, 0);
                }}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLinkClick('/usage')}>
                <UsageIcon size={16} className="mr-2" />
                Usage
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <AppearanceIcon className="mr-2 h-4 w-4" />
                  <span>Appearance</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ProfileDialog
        open={isProfileDialogOpen}
        onOpenChange={(newOpen) => {
          if (!newOpen) {
            setTimeout(() => {
              setIsProfileDialogOpen(false);
            }, 0);
          } else {
            setIsProfileDialogOpen(newOpen);
          }
        }}
      />
      <CreateSaasDialog
        open={isCreateSaasDialogOpen}
        onOpenChange={setIsCreateSaasDialogOpen}
        onSuccess={fetchSaasProjects}
      />
    </>
  );

  return (
    <TooltipProvider>
      <div className={cn(
        "flex h-full flex-col transition-all duration-300",
        showFullSidebar ? "w-64" : "w-16 items-center"
      )}>
        {content}
      </div>
    </TooltipProvider>
  );
}
