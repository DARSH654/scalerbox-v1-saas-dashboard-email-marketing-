'use client';

import Link from 'next/link';
import { useState, type FormEvent, Suspense, useEffect } from 'react';
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
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { GlobalLoader } from '@/components/ui/global-loader';
import { createClient } from '@/utils/supabase/client';

function ResetPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSessionChecking, setIsSessionChecking] = useState(true);
    const [hasSession, setHasSession] = useState(false);

    const { toast } = useToast();
    const supabase = createClient();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setHasSession(true);
            }
            setIsSessionChecking(false);
        };
        checkSession();
    }, [supabase]);

    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match.',
                variant: 'destructive',
            });
            return;
        }

        if (password.length < 6) {
            toast({
                title: 'Error',
                description: 'Password must be at least 6 characters.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setIsSuccess(true);
            toast({
                title: 'Password Reset Successful',
                description: 'Your password has been updated. You can now login.',
            });
        } catch (error: any) {
            console.error('Password reset error:', error.message);
            toast({
                title: 'Error',
                description: error.message || 'An unexpected error occurred.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSessionChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Card className="mx-auto max-w-sm w-full">
                    <CardContent className="pt-6">
                        <div className="flex justify-center text-muted-foreground">
                            <Loader2 className="animate-spin h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!hasSession) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Card className="mx-auto max-w-sm w-full">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <AlertCircle className="h-12 w-12 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl text-center">Invalid or Expired Link</CardTitle>
                        <CardDescription className="text-center">
                            This password reset link is invalid or has expired. Please request a new one.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/forgot-password">Request New Link</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="mx-auto max-w-sm w-full">
                <CardHeader>
                    {isSuccess ? (
                        <>
                            <div className="flex justify-center mb-4">
                                <CheckCircle className="h-12 w-12 text-green-500" />
                            </div>
                            <CardTitle className="text-2xl text-center">Password Reset!</CardTitle>
                            <CardDescription className="text-center">
                                Your password has been successfully updated.
                            </CardDescription>
                        </>
                    ) : (
                        <>
                            <CardTitle className="text-2xl">Set New Password</CardTitle>
                            <CardDescription>
                                Enter a new password for your account.
                            </CardDescription>
                        </>
                    )}
                </CardHeader>
                <CardContent>
                    {isSuccess ? (
                        <Button asChild className="w-full">
                            <Link href="/login">Go to Login</Link>
                        </Button>
                    ) : (
                        <form onSubmit={handleResetPassword} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter new password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    minLength={6}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={isLoading}
                                    minLength={6}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<GlobalLoader size={64} />}>
            <ResetPasswordForm />
        </Suspense>
    );
}
