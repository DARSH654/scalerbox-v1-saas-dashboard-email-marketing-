'use client';
import { FirebaseClientProvider } from "@/firebase";
import { SupabaseAuthProvider } from "@/components/supabase-auth-provider";


export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SupabaseAuthProvider>
            <FirebaseClientProvider>

                {children}
            </FirebaseClientProvider>
        </SupabaseAuthProvider>
    )
}
