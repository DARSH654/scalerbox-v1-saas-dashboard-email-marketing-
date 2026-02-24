'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { User, Session, SupabaseClient } from '@supabase/supabase-js';

interface SupabaseAuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    supabase: SupabaseClient;
    signOut: () => Promise<void>;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [supabase] = useState(() => createClient());

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            try {
                const { data: { session: initialSession } } = await supabase.auth.getSession();
                setSession(initialSession);
                setUser(initialSession?.user ?? null);
            } catch (error) {
                console.error('Error getting initial session:', error);
            } finally {
                setLoading(false);
            }
        };

        getInitialSession();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, currentSession) => {
                setSession(currentSession);
                setUser(currentSession?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);

    const signOut = useCallback(async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
    }, [supabase]);

    return (
        <SupabaseAuthContext.Provider value={{ user, session, loading, supabase, signOut }}>
            {children}
        </SupabaseAuthContext.Provider>
    );
}

export function useSupabaseAuth() {
    const context = useContext(SupabaseAuthContext);
    if (context === undefined) {
        throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
    }
    return context;
}

// Hook to get just the supabase client (for components that don't need auth state)
export function useSupabase() {
    const context = useContext(SupabaseAuthContext);
    if (context === undefined) {
        throw new Error('useSupabase must be used within a SupabaseAuthProvider');
    }
    return context.supabase;
}
