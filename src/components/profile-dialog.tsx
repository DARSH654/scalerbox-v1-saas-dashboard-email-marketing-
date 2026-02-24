'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, Undo2, Save, Loader2 } from 'lucide-react';
import { useSupabaseAuth } from "@/components/supabase-auth-provider";
import { useToast } from "@/hooks/use-toast";

// Types
interface UserProfile {
    username?: string;
    display_name?: string;
    avatar_url?: string;
    avatar_color_index?: number;
}

// Avatar color helper
const getAvatarBgColor = (index?: number): string => {
    const colors = [
        'bg-blue-500', 'bg-green-500', 'bg-purple-500',
        'bg-pink-500', 'bg-yellow-500', 'bg-red-500',
        'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
    ];
    return colors[index ?? 0] || 'bg-gray-500';
};

// Avatar initial helper
const getAvatarInitial = (name: string): string => {
    return name?.charAt(0)?.toUpperCase() || '?';
};

interface ProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
    const { user, supabase } = useSupabaseAuth();
    const { toast } = useToast();

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [username, setUsername] = useState('');
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Track if we've initialized - prevents infinite loop
    const hasInitialized = useRef(false);

    // Fetch user profile from Supabase
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;

            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('username, display_name, avatar_url, avatar_color_index')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.error('Error fetching profile:', error);
                    return;
                }

                if (data) {
                    setUserProfile(data);
                }
            } catch (error) {
                console.error('Error in fetchProfile:', error);
            }
        };

        if (open) {
            fetchProfile();
        }
    }, [open, user, supabase]);


    // Initialize form when profile data is loaded
    useEffect(() => {
        if (open && userProfile && !hasInitialized.current) {
            hasInitialized.current = true;
            setUsername(userProfile.display_name || userProfile.username || user?.email?.split('@')[0] || '');
            setAvatarPreview(userProfile.avatar_url || null);
        }
    }, [open, userProfile, user]);

    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            hasInitialized.current = false;
            setAvatarFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }, [open]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setAvatarPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleResetAvatar = () => {
        setAvatarFile(null);
        setAvatarPreview(userProfile?.avatar_url || null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSaveProfile = async () => {
        if (!user) return;

        if (username.length > 30) {
            toast({
                title: "Name too long",
                description: "Name must be 30 characters or less.",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);

        try {
            let newAvatarUrl = userProfile?.avatar_url;

            // Upload new avatar if provided
            if (avatarFile) {
                const fileExt = avatarFile.name.split('.').pop();
                const filePath = `${user.id}/profile.${fileExt}`;

                // Upload to Supabase Storage
                // upsert: true will overwrite if exists
                const { error: uploadError } = await supabase.storage
                    .from('user-profiles')
                    .upload(filePath, avatarFile, { upsert: true });

                if (uploadError) throw uploadError;

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('user-profiles')
                    .getPublicUrl(filePath);

                // Add timestamp to avoid caching issues immediately after upload
                newAvatarUrl = `${publicUrl}?t=${Date.now()}`;
            }

            // Update user profile in database
            const updates: any = {
                id: user.id,
                display_name: username.trim() || user.email?.split('@')[0] || 'User',
                updated_at: new Date().toISOString(),
                email: user.email, // Ensure email is synced
            };

            if (newAvatarUrl !== undefined) {
                updates.avatar_url = newAvatarUrl;
            }

            const { error: updateError } = await supabase
                .from('users')
                .upsert(updates);

            if (updateError) throw updateError;

            // Update local state
            setUserProfile(prev => {
                return {
                    ...(prev || {}),
                    display_name: updates.display_name,
                    avatar_url: updates.avatar_url ?? prev?.avatar_url
                } as UserProfile;
            });

            toast({ title: "Profile saved successfully!" });
            setAvatarFile(null);
            onOpenChange(false);
        } catch (error) {
            console.error('Profile save error:', error);
            toast({
                title: "Error saving profile",
                description: error instanceof Error ? error.message : "Unknown error",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const userDisplayName = username || userProfile?.display_name || user?.email || 'User';
    const hasChanges = avatarFile !== null || username !== (userProfile?.display_name || userProfile?.username || user?.email?.split('@')[0] || '');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>My Profile</DialogTitle>
                    <DialogDescription>View and manage your personal information.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={avatarPreview || undefined} />
                            <AvatarFallback className={`${getAvatarBgColor(userProfile?.avatar_color_index)} text-white text-3xl`}>
                                {getAvatarInitial(userDisplayName)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-2">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <ImagePlus className="mr-2 h-4 w-4" /> Add Image
                            </Button>
                            {avatarFile && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleResetAvatar}
                                >
                                    <Undo2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Username Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your name"
                            maxLength={30}
                        />
                    </div>

                    {/* Email Field (Disabled) */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            defaultValue={user?.email || 'No email associated'}
                            disabled
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleSaveProfile}
                        disabled={isSubmitting || !hasChanges}
                    >
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
