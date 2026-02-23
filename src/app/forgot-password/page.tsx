'use client';

import Link from 'next/link';
import React, { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();
    const supabase = createClient();

    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
            });

            if (error) throw error;

            setIsSuccess(true);
            toast({
                title: 'Reset email sent',
                description: 'Check your email for a link to reset your password.',
            });
        } catch (error: any) {
            console.error('Password reset error:', error.message);

            // Suppress "User not found" for security, or show generic message
            // Supabase typically doesn't throw if user not found (security best practice),
            // but if it does or if there is another error:

            toast({
                title: 'Error',
                description: error.message || 'An unexpected error occurred. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background relative">
            <div className="absolute top-[-25px] left-[-30px] p-6 z-50">
                <Link href="/" className="flex items-center gap-0 hover:opacity-80 transition-opacity">
                    <Image
                        src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png"
                        alt="Scalerbox Logo"
                        width={40}
                        height={40}
                    />
                    <span className="font-extrabold">Scalerbox</span>
                </Link>
            </div>

            <Card className="mx-auto max-w-sm w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                    <CardDescription>
                        Enter your email to receive a password reset link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSuccess ? (
                        <div className="grid gap-4">
                            <div className="text-sm text-muted-foreground text-center">
                                Check your email (<b>{email}</b>) for a link to reset your password.
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/login">Return to Login</Link>
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleResetPassword} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                            <div className="text-center text-sm">
                                <Link href="/login" className="underline">
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
