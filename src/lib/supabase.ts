import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    // Check if we are on the client side to avoid build errors if envs are missing during build (sometimes)
    if (typeof window !== 'undefined') {
        console.error('Missing Supabase environment variables');
    }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side usage with service role key (for admin operations)
export const createServerClient = () => {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Use service role key if available, otherwise fall back to anon key
    const keyToUse = serviceRoleKey || supabaseAnonKey;

    if (!serviceRoleKey) {
        console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY not found, using anon key. Some operations may fail.');
    }

    return createClient(supabaseUrl, keyToUse, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
};

// Database types (will be generated later with Supabase CLI)
export type Database = {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    email: string;
                    name: string | null;
                    avatar_url: string | null;
                    created_at: string;
                    updated_at: string;
                };
            };
            chats: {
                Row: {
                    id: string;
                    title: string;
                    user_id: string;
                    created_at: string;
                };
            };
            messages: {
                Row: {
                    id: string;
                    chat_id: string;
                    role: string;
                    content: string;
                    created_at: string;
                };
            };
            // Add more table types as needed
        };
    };
};
