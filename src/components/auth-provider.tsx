'use client';
import { SupabaseAuthProvider } from "@/components/supabase-auth-provider";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SupabaseAuthProvider>
            {children}
        </SupabaseAuthProvider>
    )
}
