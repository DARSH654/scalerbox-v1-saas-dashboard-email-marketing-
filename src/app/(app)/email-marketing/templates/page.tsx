'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, LayoutTemplate, Mail, ShoppingCart, KeyRound, UserPlus, CalendarCheck, BarChart3, MessageSquareReply, Sparkles, Rocket, Timer, AlertTriangle, CheckSquare, Zap, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

const sampleTemplates = [
    {
        id: 'welcome',
        name: 'Welcome Email',
        description: 'Greet new subscribers with a warm welcome message.',
        icon: UserPlus,
        category: 'Onboarding',
        color: 'from-emerald-500 to-teal-600',
    },
    {
        id: 'one-time-password', // Matches #sample/one-time-password
        name: 'One-Time Passcode',
        description: 'Send secure OTP verification codes to users.',
        icon: KeyRound,
        category: 'Transactional',
        color: 'from-blue-500 to-indigo-600',
    },
    {
        id: 'reset-password', // Matches #sample/reset-password
        name: 'Reset Password',
        description: 'Help users securely reset their account password.',
        icon: KeyRound,
        category: 'Transactional',
        color: 'from-amber-500 to-orange-600',
    },

    {
        id: 'subscription-receipt', // Matches #sample/subscription-receipt
        name: 'Subscription Receipt',
        description: 'Share subscription details and payment confirmation.',
        icon: Mail,
        category: 'Billing',
        color: 'from-rose-500 to-pink-600',
    },

    {
        id: 'post-metrics-report', // Matches #sample/post-metrics-report
        name: 'Post Metrics Report',
        description: 'Share performance analytics and engagement stats.',
        icon: BarChart3,
        category: 'Analytics',
        color: 'from-fuchsia-500 to-pink-600',
    },
    {
        id: 'respond-to-message', // Matches #sample/respond-to-message
        name: 'Respond to Inquiry',
        description: 'Professional response template for customer inquiries.',
        icon: MessageSquareReply,
        category: 'Support',
        color: 'from-lime-500 to-green-600',
    },

    {
        id: 'trial-start', // Matches #sample/trial-start
        name: 'Trial Start',
        description: 'Welcome users to their free trial period.',
        icon: Rocket,
        category: 'Onboarding',
        color: 'from-emerald-500 to-teal-600',
    },
    {
        id: 'trial-ending-soon', // Matches #sample/trial-ending-soon
        name: 'Trial Ending Soon',
        description: 'Notify users that their trial is about to expire.',
        icon: Timer,
        category: 'Retention',
        color: 'from-yellow-500 to-amber-600',
    },
    {
        id: 'trial-expired', // Matches #sample/trial-expired
        name: 'Trial Expired',
        description: 'Inform users that their trial has ended.',
        icon: AlertTriangle,
        category: 'Retention',
        color: 'from-red-500 to-rose-600',
    },
    {
        id: 'onboarding-checklist', // Matches #sample/onboarding-checklist
        name: 'Onboarding Checklist',
        description: 'Guide users through setup steps.',
        icon: CheckSquare,
        category: 'Onboarding',
        color: 'from-emerald-600 to-green-700',
    },
    {
        id: 'feature-not-used', // Matches #sample/feature-not-used
        name: 'Feature Engagement',
        description: 'Encourage users to try unused features.',
        icon: Zap,
        category: 'Engagement',
        color: 'from-indigo-500 to-purple-600',
    },
    {
        id: 'payment-failed', // Matches #sample/payment-failed
        name: 'Payment Failed',
        description: 'Alert users about failed subscription payments.',
        icon: CreditCard,
        category: 'Billing',
        color: 'from-red-600 to-orange-600',
    },
];

export default function TemplatesPage() {
    const router = useRouter();

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                        <LayoutTemplate className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Templates</h2>
                        <p className="text-muted-foreground">Choose a template or create your own from scratch</p>
                    </div>
                </div>
                <Button
                    onClick={() => router.push('/email-marketing/email-editor')}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your Own
                </Button>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sampleTemplates.map((template) => (
                    <Card
                        key={template.id}
                        className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 border-border/50 hover:border-primary/30"
                        onClick={() => router.push(`/email-marketing/email-editor#sample/${template.id}`)}
                    >
                        {/* Gradient Header */}
                        <div className={cn(
                            "h-32 bg-gradient-to-br flex items-center justify-center relative overflow-hidden",
                            template.color
                        )}>
                            <template.icon className="h-12 w-12 text-white/90" />
                            {/* Decorative circles */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full" />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                                    Use Template
                                </span>
                            </div>
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold">{template.name}</CardTitle>
                            </div>
                            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full w-fit">
                                {template.category}
                            </span>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {template.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}

                {/* Create Your Own Card */}
                <Card
                    className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 border-dashed border-2 border-border/50 hover:border-primary/50"
                    onClick={() => router.push('/email-marketing/email-editor')}
                >
                    <div className="h-full min-h-[250px] flex flex-col items-center justify-center gap-4 p-6">
                        <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors duration-300">
                            <Plus className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-foreground">Start from Scratch</p>
                            <p className="text-sm text-muted-foreground mt-1">Build your own custom email template</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
