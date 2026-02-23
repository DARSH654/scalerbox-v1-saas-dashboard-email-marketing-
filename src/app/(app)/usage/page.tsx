
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  BrainCircuit,
  Zap,
  Users
} from 'lucide-react';
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, Timestamp, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useMemo, useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAppLayout } from '../layout';

interface UsageData {
    id: string;
    model: string;
    type: 'Chat' | 'Image';
    tokens: number;
    cost: number;
    createdAt: Timestamp;
    userId: string;
}

interface Team {
    id: string;
    name: string;
    memberIds: string[];
    ownerId: string;
}

interface UserProfile {
    id: string;
    usageLimit?: number;
}

const topUpOptions = [
    {
        words: 10000,
        price: 5,
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        textColor: "text-green-600 dark:text-green-400"
    },
    {
        words: 30000,
        price: 10,
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-600 dark:text-blue-400",
        popular: true,
    },
    {
        words: 70000,
        price: 15,
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30",
        textColor: "text-purple-600 dark:text-purple-400"
    }
];

export default function UsagePage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { activeTeam } = useAppLayout();
  const TEAM_LIMIT = 200000;
  
  const [totalWordsUsed, setTotalWordsUsed] = useState(0);
  const [usageLimit, setUsageLimit] = useState(TEAM_LIMIT);
  const [isLoading, setIsLoading] = useState(true);

  const userProfileRef = useMemoFirebase(() => 
    user ? doc(firestore, 'users', user.uid) : null,
    [user, firestore]
  );
  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

  const teamsQuery = useMemoFirebase(() => 
    user ? query(collection(firestore, 'teams'), where('memberIds', 'array-contains', user.uid)) : null,
    [firestore, user]
  );
  const { data: userTeams, isLoading: isLoadingTeams } = useCollection<Team>(teamsQuery);
  
  useEffect(() => {
    if (!user || isLoadingTeams || !userProfile) return;
    
    setIsLoading(true);

    const fetchUsage = async () => {
        let totalUsage = 0;
        let limit = 0;

        if (activeTeam) {
            // Team-specific view
            const usageQuery = query(
                collection(firestore, `teams/${activeTeam.id}/usage`), 
                where('userId', '==', user.uid)
            );
            const usageSnap = await getDocs(usageQuery);
            totalUsage = usageSnap.docs.reduce((sum, doc) => sum + (doc.data().tokens || 0), 0);
            
            // Check if user is owner or member
            const teamDoc = await getDoc(doc(firestore, 'teams', activeTeam.id));
            
            if (teamDoc.exists()) {
                const teamData = teamDoc.data() as Team;
                
                // CRITICAL CHECK: Is user the owner?
                if (teamData.ownerId === user.uid) {
                    // User is OWNER → show full team limit
                    limit = TEAM_LIMIT;
                } else {
                    // User is MEMBER → show their personal limit
                    limit = userProfile?.usageLimit || TEAM_LIMIT;
                }
            } else {
                // Team document doesn't exist - fallback
                limit = userProfile?.usageLimit || TEAM_LIMIT;
            }
        } else {
            // Personal workspace view (aggregate)
            if (userTeams && userTeams.length > 0) {
                // Calculate limit for EACH team individually
                for (const team of userTeams) {
                    if (team.ownerId === user.uid) {
                        // User is OWNER in this team → add full team limit
                        limit += TEAM_LIMIT;
                    } else {
                        // User is MEMBER in this team → add their personal limit
                        limit += userProfile?.usageLimit || TEAM_LIMIT;
                    }
                }
                
                // Fetch usage from all teams
                const usagePromises = userTeams.map(team => {
                    const teamUsageQuery = query(
                        collection(firestore, `teams/${team.id}/usage`), 
                        where('userId', '==', user.uid)
                    );
                    return getDocs(teamUsageQuery);
                });
                const allUsageSnaps = await Promise.all(usagePromises);
                allUsageSnaps.forEach(snap => {
                    totalUsage += snap.docs.reduce((sum, doc) => sum + (doc.data().tokens || 0), 0);
                });
            } else {
                // No teams - default limit
                limit = TEAM_LIMIT;
            }
        }
        
        setTotalWordsUsed(totalUsage);
        setUsageLimit(limit);
        setIsLoading(false);
    }
    
    fetchUsage();

  }, [user, firestore, activeTeam, userTeams, isLoadingTeams, userProfile]);


  const usagePercentage = useMemo(() => (totalWordsUsed / usageLimit) * 100, [totalWordsUsed, usageLimit]);

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Usage</h2>
          {activeTeam ? (
            <p className="text-muted-foreground">Team: {activeTeam.name}</p>
          ) : (
            <p className="text-muted-foreground">Personal Workspace (All Teams Combined)</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Words Used
            </CardTitle>
            {activeTeam ? (
              <Users className="h-4 w-4 text-muted-foreground" />
            ) : (
              <BrainCircuit className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 w-3/4 animate-pulse rounded-md bg-muted"></div>
            ) : (
              <div className="text-2xl font-bold">{totalWordsUsed.toLocaleString()}</div>
            )}
            <p className="text-xs text-muted-foreground">
              of {usageLimit.toLocaleString()} word limit
            </p>
            <Progress value={usagePercentage} className="mt-2 h-2" />
            
            {!activeTeam && userTeams && userTeams.length > 1 && (
              <p className="text-xs text-muted-foreground mt-2">
                ℹ️ Usage is deducted in order: {userTeams.map(t => t.name).join(' → ')}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-4">Top Up</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topUpOptions.map((option, index) => (
                <Card key={index} className={`relative overflow-hidden border-2 ${option.borderColor} ${option.bgColor}`}>
                    {option.popular && (
                         <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                            POPULAR
                        </div>
                    )}
                    <CardHeader className="text-center">
                        <CardTitle className={`text-4xl font-extrabold ${option.textColor}`}>
                            {option.words.toLocaleString()}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium">Words</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-5xl font-bold">${option.price}</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full text-lg py-6" size="lg">
                            <Link href="/payment">
                                <Zap className="mr-2 h-5 w-5" />
                                Purchase
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

    