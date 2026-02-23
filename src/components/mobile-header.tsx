
'use client';

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { CollapsibleSidebar, modelIcons } from "./sidebar";

interface Workspace {
  id: string;
  name: string;
  avatarUrl?: string;
  customContext?: string;
  teamId: string;
  memberIds?: string[];
  pinnedPersonaIds?: string[];
}

interface Team {
  id: string;
  name: string;
  ownerId: string;
}

interface MobileHeaderProps {
  onLinkClick?: () => void;
  activeWorkspace: Workspace | null;
  onWorkspaceSelect: (workspace: Workspace | null) => void;
  activeTeam: Team | null;
  onTeamSelect: (team: Team | null, isLoggingOut?: boolean) => void;
}

export function MobileHeader({ onLinkClick, activeWorkspace, onWorkspaceSelect, activeTeam, onTeamSelect }: MobileHeaderProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
    if (onLinkClick) {
      onLinkClick();
    }
  }

  return (
    <div className="md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 border-r-0 w-[260px]">
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          </SheetHeader>
          <CollapsibleSidebar
            TopIcon={modelIcons.bot}
            isMobile={true}
            onLinkClick={handleLinkClick}
            activeWorkspace={activeWorkspace}
            onWorkspaceSelect={onWorkspaceSelect}
            activeTeam={activeTeam}
            onTeamSelect={onTeamSelect}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
