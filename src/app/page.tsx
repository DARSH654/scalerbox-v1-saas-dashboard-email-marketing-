'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Bot, CheckCircle, HelpCircle, Menu, Star, StarHalf, Zap, FileText, Bell, Quote, Bone, ToyBrick, Cat, PawPrint, Cog, Feather, TrendingUp, Bed, Smile, Banknote, Check, HeartHandshake, Lock, KeyRound, ShieldCheck, Edit, Wand2, BookText, FileDown, Rocket, Clock, Infinity, Users, Eye, Folder, Link as LinkIcon, MessageSquare, Atom, ChevronDown, Globe, Share2, Calendar, CalendarClock, Sparkles, Link2, Aperture, Activity, LayoutDashboard, DollarSign, Package, Play, ArrowUpRight, Twitter, Linkedin, Github, Sun, Moon, Database, Monitor, BookLock, Earth, Code, Layers, Upload, Video, X, Lightbulb, RefreshCw, Puzzle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { GptIcon, ClaudeIcon, GeminiIcon, DeepseekIcon, GrokIcon, MetaIcon } from '@/components/ai-models';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedMail } from '@/components/ui/animated-mail';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContactFormDialog } from '@/components/contact-form-dialog';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';


import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';
import GlareHover from '@/components/GlareHover';
import ClickSpark from "@/components/ClickSpark";
import { useTheme } from 'next-themes';
import LightRays from "@/components/ui/light-rays";
import StarBorder from "@/components/ui/star-border";
import { useIsMobile } from '@/hooks/use-mobile';

import { LogoLoop } from '@/components/ui/logo-loop';
import { ImageLogoLoop } from '@/components/ui/image-logo-loop';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { FeatureSelectionDialog } from "@/components/feature-selection-dialog";
import { InfinityLoop } from '@/components/ui/infinity-loop';
import { FeatureCarousel } from '@/components/feature-carousel';
import { KineticIntegrationGrid } from '@/components/landing/kinetic-integration-grid';
import { FeaturesMegaMenu } from '@/components/landing/features-mega-menu';
import { Footer } from '@/components/footer';
import { supabase } from '@/lib/supabase';
import { UnfairAdvantage } from '@/components/landing/unfair-advantage';
import { SectionBackgroundEffect } from '@/components/landing/section-background-effect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faGear, faFeatherPointed, faChartLine, faLayerGroup, faUsers, faFileLines, faWaveSquare, faShareNodes } from '@fortawesome/free-solid-svg-icons';

const scrollingLogos = [
  { name: 'Meta', Icon: MetaIcon, url: 'https://ai.meta.com/' },
  { name: 'Grok', Icon: GrokIcon, url: 'https://grok.x.ai/' },
  { name: 'ChatGPT', Icon: GptIcon, url: 'https://openai.com/chatgpt' },
  { name: 'Claude', Icon: ClaudeIcon, url: 'https://www.anthropic.com/claude' },
  { name: 'Gemini', Icon: GeminiIcon, url: 'https://gemini.google.com/' },
  { name: 'DeepSeek', Icon: DeepseekIcon, url: 'https://www.deepseek.com/' },
  { name: 'Google', Icon: GeminiIcon, url: 'https://gemini.google.com/' }, // Added more to ensure loop length
  { name: 'OpenAI', Icon: GptIcon, url: 'https://openai.com/' },
];

import { InstantInvite } from '@/components/features/instant-invite';
import { SharedTeamContext } from '@/components/features/shared-team-context';
import { RoleBasedWorkspace } from '@/components/features/role-based-workspace';
import { ExceptionRules } from '@/components/features/exception-rules';



const faqs = [
  {
    question: "Why should I choose Scalerbox?",
    answer:
      "Scalerbox offers the ultimate convenience by consolidating your tools. Stop paying for multiple subscriptions and switch to an all-in-one marketing and management operating system, designed specifically for modern entrepreneurs ready to scale efficiently.",
  },
  {
    question: "When is the official launch?",
    answer:
      "We are scheduled to launch in the first week of March. Join the waitlist today to secure your priority access spot!",
  },
  {
    question: "What are the benefits of joining the waitlist?",
    answer:
      "Waitlist members receive priority access to the platform, along with exclusive eligibility for early-bird pricing and lifetime deals that won't be available after the public launch.",
  },
  {
    question: "Will there be a free trial?",
    answer:
      "Yes! We believe you should experience the full power of Scalerbox risk-free. We will offer a generous free trial period, allowing you to explore all premium features before committing.",
  },
  {
    question: "Is my business data secure?",
    answer:
      "Absolutely. We are obsessed with privacy. Your data is fully encrypted, enterprise-secure, and—most importantly—never used to train public AI models.",
  },
];

const logos = [
  { name: 'Amazon', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/amazon-logo.png', width: 100, height: 40 },
  { name: 'Arizona State University', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/asu-logo-300x70.png', width: 100, height: 35 },
  { name: 'Tithe.ly', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/Tithely-logo.png', width: 100, height: 40 },
  { name: 'University of Notre Dame', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/notre-dame-logo.png', width: 150, height: 40 },
  { name: 'Orange', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/orange-logo.png', width: 80, height: 40 },
  { name: 'Syracuse University', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/Syracuse-University-Logo-300x103.png', width: 150, height: 50 },
  { name: 'Planify', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/planify-logo.png', width: 100, height: 40 },
];

const features = [
  {
    icon: GptIcon,
    name: 'GPT-4o',
    description: 'is ideal for outlining and idea generation'
  },
  {
    icon: ClaudeIcon,
    name: 'Claude Sonnet 4',
    description: 'is great for simplifying complex topics.'
  },
  {
    icon: GeminiIcon,
    name: 'Gemini 2.5 Pro',
    description: 'is perfect for debugging code.'
  },
  {
    icon: DeepseekIcon,
    name: 'DeepSeek',
    description: 'works well for storytelling.'
  },
  {
    icon: GrokIcon,
    name: 'Grok',
    description: 'provides witty and satirical responses.'
  }
]

const integrationLogos = [
  { name: 'Stripe', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/Stripe_Logo_revised_2016.svg.png', width: 100, height: 40, url: 'https://stripe.com/' },
  { name: 'PayPal', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/paypl_payment.png', width: 100, height: 40, url: 'https://www.paypal.com/' },
  { name: 'Braintree', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/Braintree-logo-.png', width: 100, height: 40, url: 'https://www.braintreepayments.com/' },
  { name: 'Chargebee', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/charge_bee.webp', width: 100, height: 40, url: 'https://www.chargebee.com/' },
  { name: 'Recurly', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/images-removebg-preview_2.png', width: 100, height: 40, url: 'https://recurly.com/' },
  { name: 'Adyen', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/200-2005814_paypal-clipart-ebay-logo-adyen-logo-removebg-preview.png', width: 100, height: 40, url: 'https://www.adyen.com/' },
  { name: '2Checkout', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/2checkout-logo-blue-green.png', width: 160, height: 60, url: 'https://www.2checkout.com/' },
  { name: 'Square', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/Square_Inc._logo.svg.png', width: 100, height: 40, url: 'https://squareup.com/' },
  { name: 'Worldpay', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/worldpay.svg', width: 160, height: 60, url: 'https://www.worldpay.com/' },
  { name: 'Razorpay', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/razorpay-icon.webp', width: 100, height: 40, url: 'https://razorpay.com/' },
  { name: 'PayU', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/PayU.svg.png', width: 100, height: 40, url: 'https://www.payu.in/' },
  { name: 'CCAvenue', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ccavenue.png', width: 100, height: 40, url: 'https://www.ccavenue.com/' },
  { name: 'Amazon Pay', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/amazon-pay.png', width: 100, height: 40, url: 'https://pay.amazon.com/' },
  { name: 'Lemon Squeezy', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/lemonsquezy.png', width: 200, height: 75, url: 'https://www.lemonsqueezy.com/' },
  { name: 'Paddle', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/paddle300by250logo.png', width: 100, height: 40, url: 'https://www.paddle.com/' },
  { name: 'Wise', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/wise_payment.svg', width: 100, height: 40, url: 'https://wise.com/' },
  { name: 'Payoneer', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/Payoneer_logo.svg.png', width: 100, height: 40, url: 'https://www.payoneer.com/' },
  { name: 'GoCardless', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/GoCardless-Logo.svg.png', width: 100, height: 40, url: 'https://gocardless.com/' },
  { name: 'Notion', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/notion_removebg-preview.png', width: 40, height: 40, url: 'https://notion.so/' },
  { name: 'Substack', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/substack-removebg-preview.png', width: 40, height: 40, url: 'https://substack.com/' },
  { name: 'Wix', src: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/Wix-Logo.png', width: 80, height: 40, url: 'https://wix.com/' },
];



const reviews = [
  {
    name: 'Olivia Bennett',
    role: 'Head of Growth, Novacast',
    avatar: 'https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg',
    quote: "This is exactly what I've been waiting for! Finally, a tool that brings everything together.",
  },
  {
    name: 'Lucas Müller',
    role: 'Founder, Magai',
    avatar: 'https://images.pexels.com/photos/6958651/pexels-photo-6958651.jpeg',
    quote: "Can't wait to ditch my 5 other tools. The demo looks incredible, signed up immediately.",
  },
  {
    name: 'Sophia Rossi',
    role: 'CEO, Vloex Design',
    avatar: 'https://images.pexels.com/photos/7709275/pexels-photo-7709275.jpeg',
    quote: "I've been looking for a solution like this for months. Securing my spot on the waitlist was a no-brainer.",
  },
  {
    name: 'Ethan Carter',
    role: 'Co-Founder, DataMesh',
    avatar: 'https://images.pexels.com/photos/8250630/pexels-photo-8250630.jpeg',
    quote: "The promise of replacing my entire tech stack with one OS is huge. I'm ready for the revolution.",
  },
  {
    name: 'Isabella Dubois',
    role: 'Product Lead, OptiQueue',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    quote: "Ideally this solves my workflow issues. The collaboration features look perfect for my team.",
  },
  {
    name: 'Alexander Jensen',
    role: 'Founder, StackFlow',
    avatar: 'https://images.pexels.com/photos/30535637/pexels-photo-30535637.jpeg',
    quote: "Joined the waitlist instantly. Having all models in one place will save me so much time.",
  },
];

const primaryFeatures = [
  {
    icon: faBolt,
    title: "Efficient Workflow",
    description: "Stop juggling tabs. Manage your product development, marketing, and analytics without ever leaving the platform.",
    color: "bg-blue-500/10",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: faGear,
    title: "Seamless Integration",
    description: "Switch between models like GPT-4o and Claude mid-conversation without losing context or your chat history.",
    color: "bg-primary/5",
    textColor: "text-primary"
  },
  {
    icon: faFeatherPointed,
    title: "Custom Personas",
    description: "Create and reuse custom instructions across all AI models, ensuring consistent tone and style for any task.",
    color: "bg-pink-500/10",
    textColor: "text-pink-600 dark:text-pink-400"
  },
  {
    icon: faChartLine,
    title: "Cost-Effective",
    description: "Get the power of multiple premium AI services for the price of a single subscription, saving you hundreds of dollars.",
    color: "bg-green-500/10",
    textColor: "text-green-600 dark:text-green-400"
  },
  {
    icon: faLayerGroup,
    title: "Multi-Model Comparison",
    description: "Generate responses from multiple AI models simultaneously to see the difference and pick the best one.",
    color: "bg-indigo-500/10",
    textColor: "text-indigo-600 dark:text-indigo-400"
  },
  {
    icon: faUsers,
    title: "Team Collaboration",
    description: "Share chats, create team workspaces, and manage users to streamline your collaborative AI-powered projects.",
    color: "bg-yellow-500/10",
    textColor: "text-yellow-600 dark:text-yellow-400"
  },
  {
    icon: faFileLines,
    title: "Blog Automation",
    description: "Auto-generate, schedule, and publish SEO-optimized blogs to WordPress, Webflow, and more.",
    color: "bg-teal-500/10",
    textColor: "text-teal-600 dark:text-teal-400"
  },
  {
    icon: faWaveSquare,
    title: "Unified Analytics",
    description: "Track revenue, growth, and customer insights across all your projects in one central dashboard.",
    color: "bg-cyan-500/10",
    textColor: "text-cyan-600 dark:text-cyan-400"
  },
  {
    icon: faShareNodes,
    title: "Social Media Posting",
    description: "Generate and auto-publish viral posts to X, LinkedIn, and other platforms instantly.",
    color: "bg-primary/10",
    textColor: "text-primary"
  },
];

const privacyFeatures = [
  {
    icon: Lock,
    title: "Privacy Obsessed",
    description: "Your conversations never train public or private AI models.",
  },
  {
    icon: KeyRound,
    title: "Strict Invite-Only Access",
    description: "Conversations are private and accessible only to invited team members.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description: "Ideal for schools, healthcare, legal, finance, and enterprise teams handling sensitive data.",
  },
  {
    icon: Database,
    title: "SOC 2 Type II Compliant",
    description: "Regular third-party audits ensure our security controls meet the highest industry standards.",
  },
  {
    icon: BookLock,
    title: "GDPR & CCPA Ready",
    description: "Fully compliant with global data protection regulations to give you peace of mind.",
  },
];

const tiers = [
  {
    name: 'Pro',
    priceMonthly: '$20',
    priceAnnually: '$15',
    description: 'For individuals and small teams who need access to all models.',
    features: [
      'Access to all AI models',
      'Up to 5 team members',
      'Unlimited chat history',
      '200,000 words per month',
      'Standard support'
    ],
    buttonText: 'Start Your Free Trial',
    popular: false,
  },
  {
    name: 'Business',
    priceMonthly: '$50',
    priceAnnually: '$40',
    description: 'For growing businesses that need advanced collaboration.',
    features: [
      'Everything in Pro, plus:',
      'Up to 20 team members',
      '1,000,000 words per month',
      'Shared workspaces',
      'Priority support'
    ],
    buttonText: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    priceMonthly: 'Custom',
    priceAnnually: 'Custom',
    description: 'For large organizations requiring enterprise-grade features.',
    features: [
      'Everything in Business, plus:',
      'Unlimited team members',
      'Unlimited words',
      'Single Sign-On (SSO)',
      'Dedicated support & training'
    ],
    buttonText: 'Contact Sales',
    popular: false,
  },
];

const userAvatars = [
  'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/usr_profile_pic/0RjpHqAWXQWx8PUNVNshJMVB.webp',
  'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/usr_profile_pic/73x73.png',
  'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/usr_profile_pic/8d424029-abc9-4065-844a-b683fc0ca181_Doug_Head_Orange_1.webp',
  'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/usr_profile_pic/XpIHpU4bolYHaDLHK1aynfRO.webp',
  'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/usr_profile_pic/aea0d5fe-1c02-4ce2-bcef-0e5a06317cd6_Headshot-Maggie.webp'
];



const contentCreationFeatures = [
  {
    icon: FileDown,
    title: "Document Editor",
    description: "Write and export full articles directly from the chat (PDF or DOCX).",
    imageUrl: "https://picsum.photos/seed/doc-editor/600/800"
  },
  {
    icon: Wand2,
    title: "Prompt Enhance",
    description: "Automatically improves vague prompts into structured, high-quality inputs.",
    imageUrl: "https://picsum.photos/seed/prompt-enhance/600/800"
  },
  {
    icon: Edit,
    title: "Real-Time Edits",
    description: "Edit both your input and the AI's output mid-chat without restarting.",
    imageUrl: "https://picsum.photos/seed/real-time-edit/600/800"
  },
  {
    icon: BookText,
    title: "Prompt Library",
    description: "Save your best prompts and reuse them instantly—organized and searchable.",
    imageUrl: "https://picsum.photos/seed/prompt-library/600/800"
  }
];

const personaFeatures = [
  {
    title: "Marketing Persona",
    description: "GPT-4o writes landing pages, Claude writes detailed email sequences.",
    imageUrl: "https://picsum.photos/seed/marketing-persona/600/800"
  },
  {
    title: "YouTube Persona",
    description: "DeepSeek is great at optimizing titles, Gemini can suggest video thumbnails.",
    imageUrl: "https://picsum.photos/seed/youtube-persona/600/800"
  },
  {
    title: "Copywriter Persona",
    description: "Helps craft compelling copy for various marketing materials.",
    imageUrl: "https://picsum.photos/seed/copywriter-persona/600/800"
  }
];

const teamCollaborationFeatures = [
  { icon: Users, title: 'Instant Team Invitation', description: 'Add teammates directly into live chats—no forwarding, no syncing issues.', posterUrl: 'https://picsum.photos/seed/team-invite/600/400' },
  { icon: Globe, title: 'Shared Team Context', description: "Define global instructions to ensure consistent brand voice across all team chats.", posterUrl: 'https://picsum.photos/seed/team-context/600/400' },
  { icon: Folder, title: 'Role-Based Workspaces', description: 'Set custom access, context, and permissions per team or project.', posterUrl: 'https://picsum.photos/seed/role-workspace/600/400' },
  { icon: LinkIcon, title: 'Exception Rules', description: 'Define granular exception rules to ensure precise AI outputs, carefully handling edge cases and maintaining strict control over generated responses for maximum accuracy.', posterUrl: 'https://picsum.photos/seed/exception-rules/600/400' },
];

export default function LandingPage() {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWaitlistHighlighted, setIsWaitlistHighlighted] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [activeContentTab, setActiveContentTab] = useState(0);
  const [activePersonaTab, setActivePersonaTab] = useState(0);
  const [activeTeamTab, setActiveTeamTab] = useState(0);
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  const [isWhyAutomateRevealed, setIsWhyAutomateRevealed] = useState(false);

  const orbitLogos = integrationLogos.filter(l => l.name !== 'Wix').slice(0, 20);

  // Dashboard Tabs State
  const [activeDashboardTab, setActiveDashboardTab] = useState("sas-overview");

  const dashboardContent: Record<string, { title: React.ReactNode; subtitle: string }> = {
    "sas-overview": {
      title: <>All Your Metrics in <span className="animated-gradient-text">One View</span></>,
      subtitle: "Track revenue, user growth, and product performance without leaving the platform."
    },
    "revenue": {
      title: <><span className="animated-gradient-text">Revenue</span> at a Glance</>,
      subtitle: "Monitor MRR, churn, and LTV to make data-driven financial decisions."
    },
    "growth": {
      title: <>Accelerate Your <span className="animated-gradient-text">Growth</span></>,
      subtitle: "Analyze user acquisition channels and optimize conversion rates in real-time."
    },
    "product": {
      title: <>Product Usage <span className="animated-gradient-text">Insights</span></>,
      subtitle: "Understand feature adoption and user behavior to build what they love."
    },
    "customer": {
      title: <>Deep <span className="animated-gradient-text">Customer Understanding</span></>,
      subtitle: "Get a 360-degree view of your customer segments and engagement levels."
    }
  };

  // Suggest Feature State
  const [isSuggestDialogOpen, setIsSuggestDialogOpen] = useState(false);
  const [suggestFormData, setSuggestFormData] = useState({
    name: '',
    email: '',
    suggestion: ''
  });
  const [isSuggestSubmitting, setIsSuggestSubmitting] = useState(false);
  const [isSuggestSubmitted, setIsSuggestSubmitted] = useState(false);

  // Excitement Dialog State
  const [isExcitementDialogOpen, setIsExcitementDialogOpen] = useState(false);
  const [excitementFormData, setExcitementFormData] = useState({
    whyExcited: '',
    video: null as File | null,
    rating: 5.0,
    favoriteFeatures: [] as string[],
    socialHandle: '',
    betaInterest: false,
    email: ''
  });
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [socialError, setSocialError] = useState("");
  const [betaEmailError, setBetaEmailError] = useState("");

  const isMobile = useIsMobile();

  const router = useRouter();

  const handlePlanSelection = (planName: string) => {
    if (planName === 'Enterprise') {
      setIsContactDialogOpen(true);
    } else {
      router.push('/payment');
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSuggestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuggestSubmitting(true);

    try {
      const response = await fetch('/api/suggest-feature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(suggestFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit suggestion');
      }

      console.log("Feature suggestion submitted:", suggestFormData);

      setSuggestFormData({ name: '', email: '', suggestion: '' });
      setIsSuggestDialogOpen(false); // Close the input form
      setIsSuggestSubmitted(true); // Open the success dialog
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSuggestSubmitting(false);
    }
  };

  const handleExcitementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle excitement submission (e.g., upload video to storage, save data to DB)
    console.log("Excitement Form Data:", excitementFormData);

    // Reset form
    setExcitementFormData({
      whyExcited: '',
      video: null,
      rating: 5.0,
      favoriteFeatures: [],
      socialHandle: '',
      betaInterest: false,
      email: ''
    });
    setVideoPreviewUrl(null);
    setIsExcitementDialogOpen(false);
    setIsSuggestSubmitted(true); // Reusing the success dialog for now
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (20MB)
      if (file.size > 20 * 1024 * 1024) {
        alert("File size exceeds 20MB limit.");
        return;
      }

      // Check file type (MP4, WebM, MOV)
      const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file format. Please upload MP4, WebM, or MOV.");
        e.target.value = ''; // Reset input
        return;
      }

      setExcitementFormData(prev => ({ ...prev, video: file }));
      setVideoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    setExcitementFormData(prev => ({ ...prev, video: null }));
    setVideoPreviewUrl(null);
  };

  // Fetch Waitlist Count on Mount
  useEffect(() => {
    const fetchCount = async () => {
      // Use the secure RPC function we created
      const { data, error } = await supabase.rpc('get_waitlist_count');

      if (!error && typeof data === 'number') {
        // Base count (1323) + Real database count
        setWaitlistCount(1323 + data);
      }
    };

    fetchCount();
  }, []);

  const handleJoinWaitlistClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const emailInput = document.getElementById('waitlist-email');
    if (emailInput) {
      emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emailInput.focus();
      setIsWaitlistHighlighted(true);
      // Optional: Remove highlight on blur or after timeout.
      // setTimeout(() => setIsWaitlistHighlighted(false), 3000);
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Strict Email Validation Regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, created_at: new Date().toISOString() }]);

      if (error) {
        // Code 23505 is unique violation (duplicate email)
        if (error.code === '23505') {
          // User requested to show success UI even if duplicate, without saving.
          console.log('Email already in waitlist, showing success.');
          setIsSubmitted(true);
          setEmail('');
          localStorage.setItem('scalerbox_waitlist_joined', 'true');
        } else {
          console.error('Error submitting to waitlist:', error);
          // Ideally handle other errors visually, but for now console log.
        }
      } else {
        // Success (Real insert)
        // Increment count locally so user sees immediate feedback
        setWaitlistCount(prev => (prev !== null ? prev + 1 : 1324));
        setIsSubmitted(true);
        setEmail('');
        localStorage.setItem('scalerbox_waitlist_joined', 'true');
      }

    } catch (err) {
      console.error('Unexpected error:', err);
      // Fallback success for demo
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showThemeToggle, setShowThemeToggle] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force scroll to top on page load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 100);

      // Hide on scroll down (if moved more than 10px to avoid jitter)
      if (currentScrollY > lastScrollY.current + 10) {
        setIsVisible(false);
      }
      // Show on scroll up
      else if (currentScrollY < lastScrollY.current - 10) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for footer detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearFooter(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1, // Trigger when 10% of footer is visible
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background relative selection:bg-primary/20">
      {/* SVG Gradient Definitions for icons */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
          <linearGradient id="halfYellow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      <div className={`fixed top-6 left-0 right-0 z-50 w-full flex justify-center px-4 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-32'}`}>
        <header className="w-full max-w-5xl h-16 flex items-center justify-between shadow-lg bg-background/80 backdrop-blur-xl rounded-full px-6 border border-white/20 transition-all hover:shadow-2xl hover:border-primary/20">
          <Link href="#" className="flex items-center justify-center font-bold text-lg" prefetch={false}>
            <Image src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png" alt="Scalerbox Logo" width={40} height={40} className="" />
            Scalerbox
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            <div className="relative group">
              <div className="text-sm font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all flex items-center gap-1 cursor-pointer">
                Features
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </div>
              <div className="absolute top-full -left-20 mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-left z-50 translate-y-2 group-hover:translate-y-0">
                <FeaturesMegaMenu />
              </div>
            </div>
            <Link href="#privacy" className="text-sm font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all" prefetch={false} onClick={(e) => handleLinkClick(e, '#privacy')}>
              Data Privacy
            </Link>
            <Link href="#faq" className="text-sm font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all" prefetch={false} onClick={(e) => handleLinkClick(e, '#faq')}>
              FAQs
            </Link>
            <Link href="/scalerboxreviews" className="text-sm font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all" prefetch={false}>
              Reviews
            </Link>
            <Link href="#benefits" className="text-sm font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 transition-all" prefetch={false} onClick={(e) => handleLinkClick(e, '#benefits')}>
              Primary Benefits
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <StarBorder className="rounded-full" color="#8b5cf6" speed="6s">
              <GlareHover width="auto" height="auto" background="transparent" borderRadius="9999px" borderColor="transparent" glareColor="rgba(255, 255, 255, 0.3)">
                <Button variant="default" className="hidden lg:flex rounded-full" onClick={handleJoinWaitlistClick}>
                  Join Waitlist
                </Button>
              </GlareHover>
            </StarBorder>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-6 p-6 text-center">
                  <Link href="#features" className="font-medium" prefetch={false} onClick={(e) => handleLinkClick(e, '#features')}>Features</Link>
                  <Link href="#privacy" className="font-medium" prefetch={false} onClick={(e) => handleLinkClick(e, '#privacy')}>Data Privacy</Link>
                  <Link href="#faq" className="font-medium" prefetch={false} onClick={(e) => handleLinkClick(e, '#faq')}>FAQs</Link>
                  <Link href="/scalerboxreviews" className="font-medium" prefetch={false}>Reviews</Link>
                  <Link href="#benefits" className="font-medium" prefetch={false} onClick={(e) => handleLinkClick(e, '#benefits')}>Primary Benefits</Link>
                  <Button
                    className="w-full mt-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white"
                    onClick={(e) => {
                      handleJoinWaitlistClick(e);
                      setIsMenuOpen(false);
                    }}
                  >
                    Join Waitlist
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      </div>



      {/* Suggest Feature Button & Dialog */}
      <div className="hidden sm:block">
        <Dialog open={isSuggestDialogOpen && !isMobile} onOpenChange={(open) => {
          setIsSuggestDialogOpen(open);
          if (!open) {
            setTimeout(() => setIsSuggestSubmitted(false), 500);
          }
        }}>
          <div className={`fixed bottom-6 left-6 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-24'}`}>
            <DialogTrigger asChild>
              <Button
                className="flex shadow-2xl rounded-full border border-white/10 backdrop-blur-md bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white pl-4 pr-6"
              >
                <Layers className="mr-2 h-4 w-4" />
                Suggest Feature
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="sm:max-w-[450px] gap-1 p-5">
            <DialogTitle className="text-2xl font-bold text-center mb-0.5">Send us your feature suggestion</DialogTitle>
            <p className="text-center text-muted-foreground mt-0.5">Let us know what you would like to see next.</p>
            <form onSubmit={handleSuggestSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="suggest-name-desktop">Name <span className="text-red-500">*</span></Label>
                <Input
                  id="suggest-name-desktop"
                  placeholder="Your Name"
                  required
                  value={suggestFormData.name}
                  onChange={(e) => setSuggestFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggest-email-desktop">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="suggest-email-desktop"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={suggestFormData.email}
                  onChange={(e) => setSuggestFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggest-feature-desktop">Suggest Feature <span className="text-red-500">*</span></Label>
                <Textarea
                  id="suggest-feature-desktop"
                  placeholder="Elaborate your feature..."
                  required
                  maxLength={500}
                  className="min-h-[80px] max-h-[80px] h-[80px] resize-none overflow-y-auto"
                  value={suggestFormData.suggestion}
                  onChange={(e) => setSuggestFormData(prev => ({ ...prev, suggestion: e.target.value }))}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {suggestFormData.suggestion.length}/500
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isSuggestSubmitting}>
                  {isSuggestSubmitting ? 'Submitting...' : 'Submit Suggestion'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="sm:hidden">
        <Dialog open={isSuggestDialogOpen && !!isMobile} onOpenChange={(open) => {
          setIsSuggestDialogOpen(open);
          if (!open) {
            setTimeout(() => setIsSuggestSubmitted(false), 500);
          }
        }}>
          <div className={`fixed bottom-6 left-6 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-24'}`}>
            <DialogTrigger asChild>
              <Button
                className="flex shadow-2xl rounded-full border border-white/10 backdrop-blur-md bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white pl-4 pr-6"
              >
                <Layers className="mr-2 h-4 w-4" />
                Suggest Feature
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="w-[95%] max-w-[450px] gap-1 p-5 rounded-lg border-none">
            <DialogTitle className="text-2xl font-bold text-center mb-0.5">Send us your feature suggestion</DialogTitle>
            <p className="text-center text-muted-foreground mt-0.5">Let us know what you would like to see next.</p>
            <form onSubmit={handleSuggestSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="suggest-name-mobile-dialog">Name <span className="text-red-500">*</span></Label>
                <Input
                  id="suggest-name-mobile-dialog"
                  placeholder="Your Name"
                  required
                  value={suggestFormData.name}
                  onChange={(e) => setSuggestFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggest-email-mobile-dialog">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="suggest-email-mobile-dialog"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={suggestFormData.email}
                  onChange={(e) => setSuggestFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggest-feature-mobile-dialog">Suggest Feature <span className="text-red-500">*</span></Label>
                <Textarea
                  id="suggest-feature-mobile-dialog"
                  placeholder="Elaborate your feature..."
                  required
                  maxLength={500}
                  className="min-h-[80px] max-h-[80px] h-[80px] resize-none overflow-y-auto"
                  value={suggestFormData.suggestion}
                  onChange={(e) => setSuggestFormData(prev => ({ ...prev, suggestion: e.target.value }))}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {suggestFormData.suggestion.length}/500
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isSuggestSubmitting}>
                  {isSuggestSubmitting ? 'Submitting...' : 'Submit Suggestion'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="sm:hidden hidden">
        {/* Disabled Sheet as requested */}
        <Sheet open={false && isSuggestDialogOpen && !!isMobile} onOpenChange={(open) => {
          setIsSuggestDialogOpen(open);
          if (!open) {
            setTimeout(() => setIsSuggestSubmitted(false), 500);
          }
        }}>
          <div className={`fixed bottom-6 left-6 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-24'}`}>
            <SheetTrigger asChild>
              <Button
                className="flex shadow-2xl rounded-full border border-white/10 backdrop-blur-md bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white pl-4 pr-6"
              >
                <Layers className="mr-2 h-4 w-4" />
                Suggest Feature
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent side="bottom" enableDrag className="gap-1 p-5 rounded-t-[10px] overflow-y-auto scrollbar-hide">
            <div className="text-center mb-0.5">
              <SheetTitle className="text-2xl font-bold">Send us your feature suggestion</SheetTitle>
              <p className="text-muted-foreground mt-0.5">Let us know what you would like to see next.</p>
            </div>
            <form onSubmit={handleSuggestSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="suggest-name-mobile">Name <span className="text-red-500">*</span></Label>
                <Input
                  id="suggest-name-mobile"
                  placeholder="Your Name"
                  required
                  value={suggestFormData.name}
                  onChange={(e) => setSuggestFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggest-email-mobile">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="suggest-email-mobile"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={suggestFormData.email}
                  onChange={(e) => setSuggestFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggest-feature-mobile">Suggest Feature <span className="text-red-500">*</span></Label>
                <Textarea
                  id="suggest-feature-mobile"
                  placeholder="Elaborate your feature..."
                  required
                  maxLength={500}
                  className="min-h-[80px] max-h-[80px] h-[80px] resize-none overflow-y-auto"
                  value={suggestFormData.suggestion}
                  onChange={(e) => setSuggestFormData(prev => ({ ...prev, suggestion: e.target.value }))}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {suggestFormData.suggestion.length}/500
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isSuggestSubmitting}>
                  {isSuggestSubmitting ? 'Submitting...' : 'Submit Suggestion'}
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {/* Success Dialog (Always) */}
      <Dialog open={isSuggestSubmitted} onOpenChange={setIsSuggestSubmitted}>
        <DialogContent className="sm:max-w-[450px] gap-1 p-5">
          <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center space-y-2">
              <DialogTitle className="text-xl font-semibold">Thank you!</DialogTitle>
              <p className="text-muted-foreground">Your suggestion has been submitted successfully.</p>
            </div>
            <Button onClick={() => setIsSuggestSubmitted(false)} variant="outline" className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <main className="flex-1 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none z-0">
            <LightRays
              raysColor={mounted && resolvedTheme === 'dark' ? '#3b82f6' : '#4b5563'} // Blue vs Gray
              raysColor2={mounted && resolvedTheme === 'dark' ? '#9333ea' : '#6b7280'} // Purple vs Gray
              raysSpeed={0.4}
              lightSpread={0.6}
              rayLength={0.8}
              intensity={mounted && resolvedTheme === 'dark' ? 1.5 : 0.5}
            />
          </div>

          <section className="w-full pt-32 pb-12 relative overflow-hidden bg-white dark:bg-background-dark text-foreground dark:text-white">
            {/* Background from provided HTML */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#436DDD] blur-[140px] opacity-15"></div>
              <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#7B4EE8] blur-[140px] opacity-15"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 relative z-10">
              <div className="flex flex-col items-center space-y-6 text-center">

                <ScrollReveal direction="up" duration={700} distance={40}>
                  <div className="flex flex-col items-center mb-8 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-gradient-to-r from-[#436DDD]/10 to-[#7B4EE8]/10 backdrop-blur-md shadow-[0_0_20px_rgba(67,109,221,0.15)]">
                      <span className="material-symbols-outlined text-[18px] text-primary">terminal</span>
                      <span className="font-mono text-sm text-blue-700 dark:text-blue-100 tracking-tight uppercase">The missing half of your tech stack</span>
                    </div>
                  </div>

                  <div className="space-y-6 mb-8">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] font-serif">
                      <span className="text-foreground dark:text-white">Build The Product.</span><br />
                      <span className="whitespace-nowrap"><span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/40 dark:from-white dark:to-white/40 pb-4">We’ll Build The </span><span className="text-transparent bg-clip-text bg-gradient-to-br from-[#436DDD] to-[#7B4EE8] pb-4">Audience.</span></span>
                    </h1>
                    <p className="max-w-xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-light">
                      The Ultimate Growth & Management OS for Modern Entrepreneurs.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" duration={700} delay={200} distance={40}>
                  <div className="w-full max-w-sm space-y-2 overflow-visible">
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 animate-in fade-in zoom-in duration-300">
                        <p className="text-lg font-semibold">Thank you for joining the waitlist!</p>
                        <p className="text-sm">Hope to get in touch soon.</p>
                      </div>
                    ) : (
                      <form className="flex flex-row gap-2 overflow-visible pb-2" onSubmit={handleWaitlistSubmit}>
                        <div className="relative flex-1">
                          <Input
                            id="waitlist-email"
                            className={cn(
                              "max-w-lg flex-1 focus:outline-none focus:ring-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0 transition-shadow duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-slate-400",
                              isWaitlistHighlighted && "ring-2 ring-red-500 ring-offset-2 border-red-500"
                            )}
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setIsWaitlistHighlighted(false)}
                            required
                          />
                        </div>
                        <GlareHover width="auto" height="auto" background="transparent" borderRadius="9999px" borderColor="transparent" glareColor="rgba(255, 255, 255, 0.3)">
                          <Button type="submit" disabled={isLoading} className="shadow-lg shadow-blue-500/20 transition-all rounded-full">
                            {isLoading ? 'Joining...' : 'Submit'}
                          </Button>
                        </GlareHover>
                      </form>
                    )}

                    <div className="pt-4 w-full">
                      {/* Mobile Layout */}
                      <div className="flex sm:hidden flex-row items-center justify-between w-full gap-4">
                        <div className="flex -space-x-2">
                          {userAvatars.slice(0, 4).map((url, i) => (
                            <Avatar key={i} className="border-2 border-background">
                              <AvatarImage src={url} />
                              <AvatarFallback>{`U${i + 1}`}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <Star className="w-4 h-4 text-yellow-400" style={{ fill: 'url(#halfYellow)' }} />
                            <span className="ml-1.5 font-semibold text-sm">4.8</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>Joined by</span>
                            {waitlistCount !== null ? (
                              <span className="font-medium text-foreground">{waitlistCount}</span>
                            ) : (
                              <div className="h-3 w-8 bg-muted/80 rounded-md animate-pulse" />
                            )}
                            <span>people</span>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:flex flex-row items-center justify-center gap-4">
                        <div className="flex -space-x-2">
                          {userAvatars.map((url, i) => (
                            <Avatar key={i} className="border-2 border-background">
                              <AvatarImage src={url} />
                              <AvatarFallback>{`U${i + 1}`}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <Star className="w-5 h-5 text-yellow-400" style={{ fill: 'url(#halfYellow)' }} />
                            <span className="ml-2 font-semibold">4.8</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <span>Joined by</span>
                            {waitlistCount !== null ? (
                              <span className="font-medium text-foreground animate-in fade-in duration-300">{waitlistCount}</span>
                            ) : (
                              <div className="h-4 w-10 bg-muted/80 rounded-md animate-pulse" />
                            )}
                            <span>people</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal direction="up" duration={800} delay={400} distance={50} className="w-full">
                <div className="flex items-center justify-center pt-8 w-full">
                  <FeatureCarousel className="shadow-2xl" />
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section id="social-proof" className="w-full py-2 md:py-4">
            <ScrollReveal>
              <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <p className="max-w-[900px] text-muted-foreground md:text-xl">
                      Secure Your Spot Alongside Thousands of Founders and Creators on the Waitlist!
                    </p>
                  </div>
                </div>
              </div>
              <ImageLogoLoop items={logos} direction="left" speed="normal" />
            </ScrollReveal>
          </section>

          <section id="automate-blog" className="w-full py-4 md:py-8 lg:py-10 relative overflow-hidden">
            <SectionBackgroundEffect />
            <ScrollReveal>
              <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 grid items-center gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-12 relative z-10">
                <div className="space-y-6 text-center lg:text-left">
                  <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20">
                    <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                      <Aperture className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                      Automate Your Blog Site
                    </p>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl drop-shadow-2xl font-serif">
                    <span className="animated-gradient-text">Publish Everywhere</span><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pr-1 pb-4">, Manage Nowhere</span>
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
                    Connect your blog once and let Scalerbox handle the rest. Cross-post to multiple platforms automatically.
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                        <Earth className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-foreground">
                          <span className="font-bold">Connect to Multiple Sites</span> — WordPress, Medium, Ghost, Hashnode, and more.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                        <Share2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-foreground">
                          <span className="font-bold">Multiple Integrations</span> — Social media cross-posting, SEO optimization, and analytics.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                        <CalendarClock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-foreground">
                          <span className="font-bold">Schedule & Queue</span> — Plan your content calendar and publish at optimal times.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-foreground">
                          <span className="font-bold">AI-Powered Writing</span> — Generate blog posts with any AI model you prefer.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* Right side - Image Card */}
                <div className="mx-auto">
                  <Card className="overflow-hidden border-2 border-border/50 shadow-xl">
                    <Image
                      src="https://picsum.photos/seed/blog-automation/600/500"
                      width="600"
                      height="500"
                      alt="Blog Automation Dashboard"
                      className="object-cover"
                      data-ai-hint="blog automation dashboard interface"
                    />
                  </Card>
                </div>
              </div>
            </ScrollReveal>
          </section>

          <UnfairAdvantage />

          {/* Universal Connectivity Section */}
          <section id="connect-blog" className="w-full relative overflow-hidden bg-white dark:bg-[#020617] py-20">
            <SectionBackgroundEffect />

            <ScrollReveal>
              <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 relative z-10 flex flex-col items-center">
                <div className="text-center mb-16 max-w-3xl relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-xs font-mono text-primary mb-6 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Scalerbox SDK v3.2
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/50 dark:from-white dark:via-white dark:to-white/50 drop-shadow-2xl font-serif">
                    Universal Connectivity
                  </h1>
                  <p className="text-lg text-muted-foreground dark:text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
                    Sync your blog ecosystem instantly. Connect any platform to your custom frontend with the Scalerbox Kinetic Grid.
                  </p>
                </div>

                <KineticIntegrationGrid />

              </div>
            </ScrollReveal>
          </section>




          {/* Unified Dashboard Section */}
          <section id="unified-dashboard" className="w-full py-4 md:py-8 lg:py-12 bg-background relative overflow-hidden">
            <SectionBackgroundEffect />
            <ScrollReveal>
              <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 relative z-10">
                <div className="flex flex-col items-center text-center mb-12">
                  <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20 mb-6">
                    <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                      <Activity className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                      Unified Analytics Command Center
                    </p>
                  </div>
                  <h2 key={activeDashboardTab} className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-4 pr-2 drop-shadow-2xl font-serif">
                    {dashboardContent[activeDashboardTab]?.title || dashboardContent["sas-overview"].title}
                  </h2>
                  <p key={`${activeDashboardTab}-subtitle`} className="max-w-[700px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100">
                    {dashboardContent[activeDashboardTab]?.subtitle || dashboardContent["sas-overview"].subtitle}
                  </p>
                </div>

                <div className="w-full max-w-5xl mx-auto">
                  <Tabs defaultValue="sas-overview" className="w-full" onValueChange={setActiveDashboardTab}>
                    <div className="flex justify-center mb-8">
                      {/* Mobile Layout: 2 rows - Row 1: Revenue, Product, Growth | Row 2: Overview, Customer */}
                      <TabsList className="sm:hidden inline-flex flex-col h-auto gap-2 rounded-2xl bg-muted/50 p-1.5 backdrop-blur-sm">
                        <div className="flex gap-2 justify-center">
                          <TabsTrigger value="revenue" className="rounded-full px-3 py-1.5 text-xs font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg relative overflow-hidden group">
                            <span className="relative z-10">Revenue</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm rounded-full"></div>
                          </TabsTrigger>
                          <TabsTrigger value="product" className="rounded-full px-3 py-1.5 text-xs font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg relative overflow-hidden group">
                            <span className="relative z-10">Product</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm rounded-full"></div>
                          </TabsTrigger>
                          <TabsTrigger value="growth" className="rounded-full px-3 py-1.5 text-xs font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg relative overflow-hidden group">
                            <span className="relative z-10">Growth</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm rounded-full"></div>
                          </TabsTrigger>
                        </div>
                        <div className="flex gap-2 justify-center">
                          <TabsTrigger value="sas-overview" className="rounded-full px-3 py-1.5 text-xs font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg relative overflow-hidden group">
                            <span className="relative z-10">Overview</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm rounded-full"></div>
                          </TabsTrigger>
                          <TabsTrigger value="customer" className="rounded-full px-3 py-1.5 text-xs font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg relative overflow-hidden group">
                            <span className="relative z-10">Customer</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm rounded-full"></div>
                          </TabsTrigger>
                        </div>
                      </TabsList>
                      {/* Desktop Layout: All in one row */}
                      <TabsList className="hidden sm:inline-flex h-auto gap-2 rounded-full bg-muted/50 p-1.5 backdrop-blur-sm">
                        <TabsTrigger value="sas-overview" className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg relative overflow-hidden group">
                          <span className="relative z-10">Overview Dashboard</span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm rounded-full"></div>
                        </TabsTrigger>
                        <TabsTrigger value="revenue" className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg relative overflow-hidden group">
                          <span className="relative z-10">Revenue Dashboard</span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm rounded-full"></div>
                        </TabsTrigger>
                        <TabsTrigger value="growth" className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg relative overflow-hidden group">
                          <span className="relative z-10">Growth Dashboard</span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm rounded-full"></div>
                        </TabsTrigger>
                        <TabsTrigger value="product" className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg relative overflow-hidden group">
                          <span className="relative z-10">Product Dashboard</span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm rounded-full"></div>
                        </TabsTrigger>
                        <TabsTrigger value="customer" className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg relative overflow-hidden group">
                          <span className="relative z-10">Customer Dashboard</span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm rounded-full"></div>
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    {/* Dashboard Content Placeholders */}
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card group cursor-pointer">
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
                        <Button
                          size="lg"
                          className="gap-2 text-base font-semibold shadow-xl hover:scale-105 transition-transform"
                          onClick={() => window.open('#', '_blank')}
                        >
                          Live Review
                          <ArrowUpRight className="h-5 w-5" />
                        </Button>
                      </div>

                      <TabsContent value="sas-overview" className="mt-0 h-full w-full relative z-0">
                        <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                          <div className="text-center">
                            <LayoutDashboard className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <p className="text-muted-foreground font-medium">SAS Overview Placeholder</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="revenue" className="mt-0 h-full w-full relative z-0">
                        <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                          <div className="text-center">
                            <DollarSign className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <p className="text-muted-foreground font-medium">Revenue Dashboard Placeholder</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="growth" className="mt-0 h-full w-full relative z-0">
                        <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                          <div className="text-center">
                            <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <p className="text-muted-foreground font-medium">Growth Dashboard Placeholder</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="product" className="mt-0 h-full w-full relative z-0">
                        <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                          <div className="text-center">
                            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <p className="text-muted-foreground font-medium">Product Dashboard Placeholder</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="customer" className="mt-0 h-full w-full relative z-0">
                        <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                          <div className="text-center">
                            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <p className="text-muted-foreground font-medium">Customer Dashboard Placeholder</p>
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Integrations Section */}
          <section id="integrations" className="w-full py-4 md:py-8 lg:py-12 bg-background relative overflow-hidden">
            <SectionBackgroundEffect />
            <ScrollReveal>
              <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 relative z-10 flex flex-col items-center">
                <div className="text-center mb-16 max-w-3xl relative">
                  <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20 mb-6">
                    <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                      <Share2 className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                      Limitless Integration Ecosystem
                    </p>
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl mb-4 drop-shadow-2xl font-serif">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Connect Your </span><span className="animated-gradient-text">Favorite Tools</span>
                  </h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto">
                    Seamlessly connect your stack. Our orbiting ecosystem ensures real-time synchronization across all your favorite tools, creating a unified workspace gravity.
                  </p>
                </div>

                <div className="relative w-full max-w-[1000px] aspect-square md:aspect-[16/10] mx-auto flex items-center justify-center mb-20 perspective-[1000px]">
                  {/* Center Planet */}
                  <div className="relative z-30 group cursor-pointer">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-background border border-primary/50 flex items-center justify-center shadow-[0_0_60px_rgba(147,51,234,0.4)] animate-pulse-glow transition-all duration-300 group-hover:scale-105 z-20 relative">
                      <div className="absolute inset-0 rounded-full border border-white/10"></div>
                      <div className="absolute inset-2 rounded-full border border-primary/20 border-dashed animate-spin-slow"></div>
                      <div className="flex flex-col items-center justify-center gap-1">
                        <Image src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png" alt="Scalerbox Logo" width={60} height={60} className="" />
                      </div>
                    </div>
                    {/* Background Blur Behind Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                  </div>

                  {/* Inner Orbit (Fast) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/5 dark:border-white/5 w-[280px] h-[280px] md:w-[320px] md:h-[320px] animate-orbit-cw-fast z-20">
                    {orbitLogos.slice(0, 5).map((logo, i) => (
                      <div key={i} className="absolute top-1/2 left-1/2" style={{ transform: `rotate(${i * (360 / 5)}deg) translate(140px) rotate(-${i * (360 / 5)}deg)` }}>
                        <div className="animate-orbit-ccw-fast">
                          <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-black/10 dark:border-white/10 flex items-center justify-center p-2.5 cursor-pointer group/icon hover:bg-primary/15 hover:border-primary/50 hover:scale-125 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] z-50">
                            <img alt={logo.name} className="w-full h-full object-contain opacity-90 group-hover/icon:opacity-100" src={logo.src} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Middle Orbit (Reverse Medium) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 w-[460px] h-[460px] md:w-[540px] md:h-[540px] animate-orbit-reverse-medium z-10">
                    {orbitLogos.slice(5, 11).map((logo, i) => (
                      <div key={i} className="absolute top-1/2 left-1/2" style={{ transform: `rotate(${i * (360 / 6)}deg) translate(230px) rotate(-${i * (360 / 6)}deg)` }}>
                        <div className="animate-orbit-counter-reverse-medium">
                          <div className="w-14 h-14 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-black/10 dark:border-white/10 flex items-center justify-center p-3 cursor-pointer group/icon hover:bg-primary/15 hover:border-primary/50 hover:scale-125 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] z-50">
                            <img alt={logo.name} className="w-full h-full object-contain opacity-90 group-hover/icon:opacity-100" src={logo.src} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Outer Orbit (Slow) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/5 dark:border-white/5 w-[680px] h-[680px] md:w-[780px] md:h-[780px] animate-orbit-cw-slow z-0">
                    {orbitLogos.slice(11, 20).map((logo, i) => (
                      <div key={i} className="absolute top-1/2 left-1/2" style={{ transform: `rotate(${i * (360 / 9)}deg) translate(340px) rotate(-${i * (360 / 9)}deg)` }}>
                        <div className="animate-orbit-ccw-slow">
                          <div className="w-16 h-16 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-black/10 dark:border-white/10 flex items-center justify-center p-4 cursor-pointer group/icon hover:bg-primary/15 hover:border-primary/50 hover:scale-125 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] z-50">
                            <img alt={logo.name} className="w-full h-full object-contain opacity-70 group-hover/icon:opacity-100 grayscale group-hover/icon:grayscale-0 transition-all" src={logo.src} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full max-w-7xl px-6 pb-20 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="group relative bg-card rounded-[2rem] border border-border overflow-hidden shadow-sm hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)] transition-all duration-300">
                      <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at top left, rgba(79, 70, 229, 0.25), transparent 60%)' }}></div>
                      <div className="absolute -bottom-5 -right-5 opacity-[0.03] group-hover:opacity-[0.08] transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 ease-out pointer-events-none z-0">
                        <RefreshCw className="w-[180px] h-[180px] text-foreground" strokeWidth={1} />
                      </div>
                      <div className="relative p-8 z-10 h-full flex flex-col">
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 shrink-0">
                          <RefreshCw className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold mb-2 text-xl text-gray-900 dark:text-white">Real-time Sync</h3>
                        <p className="text-sm text-muted-foreground">Updates propagate instantly across all connected nodes in your ecosystem.</p>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group relative bg-card rounded-[2rem] border border-border overflow-hidden shadow-sm hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)] transition-all duration-300">
                      <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at top left, rgba(79, 70, 229, 0.25), transparent 60%)' }}></div>
                      <div className="absolute -bottom-5 -right-5 opacity-[0.03] group-hover:opacity-[0.08] transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 ease-out pointer-events-none z-0">
                        <ShieldCheck className="w-[180px] h-[180px] text-foreground" strokeWidth={1} />
                      </div>
                      <div className="relative p-8 z-10 h-full flex flex-col">
                        <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-4 shrink-0">
                          <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold mb-2 text-xl text-gray-900 dark:text-white">Encrypted Tunneling</h3>
                        <p className="text-sm text-muted-foreground">Enterprise-grade encryption for all data flowing through the core hub.</p>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group relative bg-card rounded-[2rem] border border-border overflow-hidden shadow-sm hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)] transition-all duration-300">
                      <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at top left, rgba(79, 70, 229, 0.25), transparent 60%)' }}></div>
                      <div className="absolute -bottom-5 -right-5 opacity-[0.03] group-hover:opacity-[0.08] transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 ease-out pointer-events-none z-0">
                        <Puzzle className="w-[180px] h-[180px] text-foreground" strokeWidth={1} />
                      </div>
                      <div className="relative p-8 z-10 h-full flex flex-col">
                        <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-accent mb-4 shrink-0">
                          <Puzzle className="h-6 w-6" />
                        </div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-2 text-xl">Plug & Play</h3>
                        <p className="text-sm text-muted-foreground">Zero-code configuration. Just authorize and let gravity do the rest.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </section>
        </div>

        <section id="features" className="w-full py-4 md:py-8 lg:py-12 relative overflow-hidden">
          <SectionBackgroundEffect />
          <ScrollReveal>
            <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 grid gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-12 relative z-10">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative w-full aspect-video lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-2xl cursor-pointer group">
                    <Image
                      src="https://picsum.photos/seed/multi-chat/800/500"
                      alt="Feature Thumbnail"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                      <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/60 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                        <Play className="h-8 w-8 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0 border-none bg-transparent shadow-none sm:rounded-xl overflow-hidden">
                  <DialogTitle className="sr-only">Video Demo</DialogTitle>
                  <div className="relative w-full rounded-xl overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl">
                    <video
                      src="https://picsum.photos/seed/demo-video/800/500"
                      className="w-full h-auto object-cover"
                      controls
                      autoPlay
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <div className="space-y-4 text-center lg:text-left">
                <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20">
                  <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                    <MessageSquare className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                    Multiple AI Models in a Single Chat
                  </p>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl drop-shadow-2xl font-serif">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Start With </span><span className="animated-gradient-text">GPT-4o, Clarify With Claude, Optimize With DeepSeek</span>
                </h2>
                <p className="text-xl font-bold text-muted-foreground">(without losing any context!)</p>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
                  Other tools force you to restart when switching models, but Scalerbox keeps your full conversation history, even across different AI engines.
                </p>
                <ul className="space-y-4 mt-6">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-muted">
                        <feature.icon />
                      </div>
                      <div>
                        <p className="text-foreground">
                          <span className="font-bold">{feature.name}</span> {feature.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full mt-6">
              <LogoLoop items={scrollingLogos} direction="left" speed="normal" />
            </div>
          </ScrollReveal>
        </section>



        <section className="w-full py-4 md:py-8 lg:py-10 relative overflow-hidden">
          <SectionBackgroundEffect />
          <ScrollReveal>
            <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 grid gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-12 relative z-10">
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20">
                  <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                    <Users className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                    Create Multiple Personas
                  </p>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl drop-shadow-2xl font-serif">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Write Your </span><span className="animated-gradient-text">AI Instructions Once.</span><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pr-2 pb-4 leading-relaxed"> Reuse Across Every AI Model</span>
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
                  Stop recreating custom instructions. Create detailed AI guidelines once, then instantly reuse them across all AI models you use.
                </p>
                <p className="font-semibold">Choose from 50+ pre-built personas like:</p>
                <div className="space-y-4">
                  {personaFeatures.map((persona, index) => (
                    <Card
                      key={index}
                      className={cn(
                        "cursor-pointer transition-all duration-300",
                        activePersonaTab === index
                          ? "bg-primary/10 border-primary/50 shadow-lg"
                          : "bg-card hover:border-primary/30"
                      )}
                      onClick={() => setActivePersonaTab(index)}
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{persona.title}</h3>
                          <p className="text-sm text-muted-foreground">{persona.description}</p>
                        </div>
                        <ArrowRight className={cn("h-6 w-6 transition-colors", activePersonaTab === index ? "text-primary" : "text-muted-foreground")} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-xl cursor-pointer group">
                    <Image
                      src={personaFeatures[activePersonaTab].imageUrl}
                      alt={personaFeatures[activePersonaTab].title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint="persona selection interface"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                      <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/60 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0 border-none bg-transparent shadow-none sm:rounded-xl overflow-hidden">
                  <DialogTitle className="sr-only">{personaFeatures[activePersonaTab].title}</DialogTitle>
                  <div className="relative w-full rounded-xl overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl">
                    <Image
                      src={personaFeatures[activePersonaTab].imageUrl}
                      alt={personaFeatures[activePersonaTab].title}
                      width={1200}
                      height={1600}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </ScrollReveal>
        </section>

        <section className="w-full py-4 md:py-8 lg:py-10 relative overflow-hidden">
          <SectionBackgroundEffect />
          <ScrollReveal>
            <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 grid gap-8 text-center lg:grid-cols-2 lg:text-left lg:gap-16 relative z-10">
              {/* Enhanced Display with Video Support */
                (contentCreationFeatures[activeContentTab] as any).videoUrl ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-xl cursor-pointer group order-2 lg:order-1">
                        <Image
                          src={contentCreationFeatures[activeContentTab].imageUrl}
                          alt={contentCreationFeatures[activeContentTab].title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          data-ai-hint="content creation demo"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                          <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/60 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                            <Play className="h-8 w-8 text-white fill-white ml-1" />
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full p-0 border-none bg-transparent shadow-none sm:rounded-xl overflow-hidden">
                      <DialogTitle className="sr-only">{contentCreationFeatures[activeContentTab].title} Demo</DialogTitle>
                      <div className="relative w-full rounded-xl overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl">
                        <video
                          src={(contentCreationFeatures[activeContentTab] as any).videoUrl}
                          className="w-full h-auto object-cover"
                          controls
                          autoPlay
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-xl order-2 lg:order-1">
                    <Image
                      src={contentCreationFeatures[activeContentTab].imageUrl}
                      alt={contentCreationFeatures[activeContentTab].title}
                      fill
                      className="object-cover transition-opacity duration-500"
                      data-ai-hint="chat application writing content"
                    />
                  </div>
                )}
              <div className="space-y-4 order-1 lg:order-2">
                <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20">
                  <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                    <Zap className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                    Content Creation Made Easy
                  </p>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl drop-shadow-2xl font-serif"><span className="animated-gradient-text">Draft, Edit, and Export in One Chat</span><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-4">, No Tool Switching</span></h2>
                <div className="space-y-4 mt-6">
                  {contentCreationFeatures.map((feature, index) => (
                    <Card
                      key={index}
                      className={cn(
                        "text-left cursor-pointer transition-all duration-300",
                        activeContentTab === index
                          ? "bg-primary/10 border-primary/50 shadow-lg"
                          : "bg-card hover:border-primary/30"
                      )}
                      onClick={() => setActiveContentTab(index)}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                          <feature.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="enterprise" className="w-full py-4 md:py-8 lg:py-10 bg-background relative overflow-hidden">
          <SectionBackgroundEffect />
          <ScrollReveal>
            <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 grid gap-8 text-center lg:grid-cols-2 lg:text-left lg:gap-16 relative z-10">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20">
                  <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                    <Users className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                    Teams Collaboration
                  </p>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl drop-shadow-2xl font-serif"><span className="animated-gradient-text">Invite Teammates Into AI Chats</span><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pr-1 pb-5">, Keep Full History and Files</span></h2>
                <div className="space-y-4 mt-6">
                  {teamCollaborationFeatures.map((feature, index) => (
                    <Card
                      key={index}
                      className={cn(
                        "text-left cursor-pointer transition-all duration-300",
                        activeTeamTab === index
                          ? "bg-primary/10 border-primary/50 shadow-lg"
                          : "bg-card hover:border-primary/30"
                      )}
                      onClick={() => setActiveTeamTab(index)}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                          <feature.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              {activeTeamTab === 0 ? (
                <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full">
                  <InstantInvite />
                </div>
              ) : activeTeamTab === 1 ? (
                <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full">
                  <SharedTeamContext />
                </div>
              ) : activeTeamTab === 2 ? (
                <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-xl">
                  <RoleBasedWorkspace />
                </div>
              ) : activeTeamTab === 3 ? (
                <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full">
                  <ExceptionRules />
                </div>
              ) : teamCollaborationFeatures[activeTeamTab].videoUrl ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-xl cursor-pointer group">
                      <Image
                        src={teamCollaborationFeatures[activeTeamTab].posterUrl || ''}
                        alt="Team Collaboration Demo"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                        <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/60 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                          <Play className="h-8 w-8 text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full p-0 border-none bg-transparent shadow-none sm:rounded-xl overflow-hidden">
                    <DialogTitle className="sr-only">Team Collaboration Demo</DialogTitle>
                    <div className="relative w-full rounded-xl overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl">
                      <video
                        src={teamCollaborationFeatures[activeTeamTab].videoUrl}
                        className="w-full h-auto object-cover"
                        controls
                        autoPlay
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src={teamCollaborationFeatures[activeTeamTab].posterUrl || ''}
                    alt={teamCollaborationFeatures[activeTeamTab].title}
                    fill
                    className="object-cover transition-opacity duration-500"
                    data-ai-hint="team collaboration interface"
                  />
                </div>
              )}
            </div>
          </ScrollReveal>
        </section>

        <section className="w-full py-4 md:py-8 lg:py-12 bg-background text-foreground relative overflow-hidden">
          <SectionBackgroundEffect />
          <ScrollReveal>
            <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 relative z-10">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4 text-center lg:text-left">
                  <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20">
                    <div className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                      <Rocket className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                      Good-Bye Rate Limits
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl drop-shadow-2xl font-serif">
                    <span className="animated-gradient-text">Scalerbox Keeps Generating</span><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"> When Other LLMs Shut You Down!</span>
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed">
                    So you never lose momentum on high-output days.
                  </p>
                </div>
                {/* Mobile: Features with circular icons */}
                <div className="lg:hidden space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">No Cooldowns</h3>
                      <p className="text-sm text-muted-foreground">Just keep generating content—no 4-hour locks or pauses.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">Instant Top-Ups</h3>
                      <p className="text-sm text-muted-foreground">Add more words anytime, no plan changes or delays.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                      <Infinity className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">Unlimited Access</h3>
                      <p className="text-sm text-muted-foreground">Continue your workflow seamlessly across all models without interruption.</p>
                    </div>
                  </div>
                </div>
                {/* Desktop: Original layout */}
                <div className="hidden lg:block space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">No Cooldowns</h3>
                      <p className="text-muted-foreground">Just keep generating content—no 4-hour locks or pauses.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Instant Top-Ups</h3>
                      <p className="text-muted-foreground">Add more words anytime, no plan changes or delays.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                      <Infinity className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Unlimited Access</h3>
                      <p className="text-muted-foreground">Continue your workflow seamlessly across all models without interruption.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-8">
              <LogoLoop items={scrollingLogos} direction="left" speed="normal" />
            </div>
          </ScrollReveal>
        </section>

        <section id="privacy" className="w-full py-4 md:py-8 bg-background text-foreground relative overflow-hidden">
          <SectionBackgroundEffect />
          <ScrollReveal>
            <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 relative z-10">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-full py-1.5 px-4 border border-purple-500/20 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
                  <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                    <ShieldCheck className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                    Complete Data Privacy
                  </p>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl drop-shadow-2xl font-serif">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Your </span><span className="animated-gradient-text">Data Stays Private</span><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"> and Never Trains AI Models</span>
                </h2>
                <p className="max-w-prose text-muted-foreground md:text-lg">
                  Requests are securely sent to model providers, processed, then deleted (never used for training).
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Large Featured Card */}
                <div className="group relative md:col-span-2 lg:col-span-1 lg:row-span-2 bg-card rounded-[2rem] border border-border overflow-hidden shadow-sm hover:shadow-[0_0_30px_-5px_rgba(162,89,255,0.5)] transition-all duration-300">
                  <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at top left, rgba(79, 70, 229, 0.25), transparent 60%)' }}></div>

                  {/* Background Icon */}
                  <div className="absolute -bottom-5 -right-5 opacity-[0.03] group-hover:opacity-[0.08] transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 ease-out pointer-events-none z-0">
                    <Lock className="w-[300px] h-[300px] text-foreground" strokeWidth={1} />
                  </div>

                  <div className="relative h-full p-8 flex flex-col justify-between z-10">
                    <div className="mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4f46e5]/10 to-[#a259ff]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative">
                        {/* Solid Icon (Default) */}
                        <Lock className="h-8 w-8 text-[#4f46e5] absolute transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
                        {/* Gradient Icon (Hover) */}
                        <Lock className="h-8 w-8 absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100 drop-shadow-[0_0_8px_rgba(79,70,229,0.4)]" style={{ stroke: 'url(#primaryGradient)' }} />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Privacy Obsessed</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Your conversations never train public or private AI models. We implement strict data isolation protocols ensuring your intellectual property remains exclusively yours.
                      </p>
                    </div>
                    <div className="mt-auto pt-6 border-t border-border/50">
                      <Link href="/privacy-policy" className="flex items-center space-x-2 text-sm font-medium cursor-pointer group/link">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] to-[#a259ff]">Learn about our privacy architecture</span>
                        <ArrowRight className="h-4 w-4 text-[#a259ff] group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Grid Cards */}
                {[
                  { icon: KeyRound, title: "Strict Invite-Only Access", desc: "Conversations are private and accessible only to invited team members via secure links." },
                  { icon: ShieldCheck, title: "Enterprise-Grade Security", desc: "Ideal for schools, healthcare, legal, finance, and enterprise teams handling sensitive data." },
                  { icon: Database, title: "SOC 2 Type II Compliant", desc: "Regular third-party audits ensure our security controls meet the highest industry standards." },
                  { icon: BookLock, title: "GDPR & CCPA Ready", desc: "Fully compliant with global data protection regulations to give you absolute peace of mind." }
                ].map((feature, index) => (
                  <div key={index} className="group relative bg-card rounded-[2rem] border border-border overflow-hidden shadow-sm hover:shadow-[0_0_30px_-5px_rgba(162,89,255,0.5)] transition-all duration-300">
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at top left, rgba(79, 70, 229, 0.25), transparent 60%)' }}></div>

                    {/* Background Icon */}
                    <div className="absolute -bottom-5 -right-5 opacity-[0.03] group-hover:opacity-[0.08] transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 ease-out pointer-events-none z-0">
                      <feature.icon className="w-[180px] h-[180px] text-foreground" strokeWidth={1} />
                    </div>

                    <div className="relative p-8 z-10 h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4f46e5]/10 to-[#a259ff]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
                          <feature.icon className="h-6 w-6 text-[#4f46e5] absolute transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
                          <feature.icon className="h-6 w-6 absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100 drop-shadow-[0_0_8px_rgba(79,70,229,0.4)]" style={{ stroke: 'url(#primaryGradient)' }} />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="migration" className="w-full py-4 md:py-8 bg-background relative overflow-hidden">
          <SectionBackgroundEffect />
          <ScrollReveal>
            <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 relative z-10">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20">
                  <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                    <Atom className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                    3-Step Migration
                  </p>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl drop-shadow-2xl font-serif">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Migrate All Your </span><span className="animated-gradient-text">Chats and GPT Instructions</span><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pr-4 pb-4"> in Under 5 Minutes</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 xl:gap-12 items-center">
                <div className="space-y-8 text-center md:text-left">
                  <p className="text-muted-foreground">Move quickly to Scalerbox without losing your previous AI setups:</p>
                  <ol className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex-shrink-0">1</div>
                      <p className="pt-1">Export JSON files from ChatGPT or Claude</p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex-shrink-0">2</div>
                      <p className="pt-1">Import to Scalerbox and keep every message, prompt, and thread.</p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex-shrink-0">3</div>
                      <p className="pt-1">Instantly resume your projects without downtime or reset.</p>
                    </li>
                  </ol>
                  <div className="flex items-start gap-4 pt-4 border-t border-border">
                    <Wand2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Already have custom GPTs?</span> Paste your instructions into a Scalerbox Persona and start using them instantly.
                    </p>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl cursor-pointer group">
                      <Image
                        src="https://picsum.photos/seed/migration-chat/800/500"
                        alt="Import chats dialog"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="import chat dialog"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                        <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/60 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                          <Play className="h-8 w-8 text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full p-0 border-none bg-transparent shadow-none sm:rounded-xl overflow-hidden">
                    <DialogTitle className="sr-only">Migration Demo</DialogTitle>
                    <div className="relative w-full rounded-xl overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl">
                      <video
                        src="https://picsum.photos/seed/migrate-video/800/500"
                        className="w-full h-auto object-cover"
                        controls
                        autoPlay
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Hidden Pricing Section */}
        {/* <section id="pricing" className="w-full py-12 md:py-20" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.05), transparent 40%)'
          }}>
            <ScrollReveal>
              <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                  <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20">
                    <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                      <Banknote className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                      Pricing
                    </p>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Flexible Plans for <span className="animated-gradient-text">Every Team</span></h2>
                </div>
                <div className="flex justify-center items-center gap-4 mb-12">
                  <Label htmlFor="billing-cycle" className={cn(billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground')}>Monthly</Label>
                  <Switch
                    id="billing-cycle"
                    checked={billingCycle === 'annually'}
                    onCheckedChange={(checked) => setBillingCycle(checked ? 'annually' : 'monthly')}
                  />
                  <Label htmlFor="billing-cycle" className={cn(billingCycle === 'annually' ? 'text-foreground' : 'text-muted-foreground')}>Annually</Label>
                  <Badge variant="secondary" className="text-primary bg-green-100 border-green-200 hover:bg-green-100">Save 40%</Badge>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {tiers.map((tier) => {
                    const isPopular = tier.popular;
                    const cardContent = (
                      <Card className="flex flex-col flex-grow bg-transparent border-none shadow-none">
                        <CardHeader className="pb-4 text-center">
                          <CardTitle className="text-2xl">
                            {tier.name === 'Business' ? <span className="animated-gradient-text">{tier.name}</span> : tier.name}
                          </CardTitle>
                          <p className="pt-2">
                            <span className="text-4xl font-bold">{billingCycle === 'monthly' ? tier.priceMonthly : tier.priceAnnually}</span>
                            <span className="text-muted-foreground"> /month</span>
                          </p>
                          <CardDescription className="pt-2 min-h-[40px]">{tier.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                          <ul className="space-y-3">
                            {tier.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            variant={isPopular ? 'default' : 'outline'}
                            onClick={() => handlePlanSelection(tier.name)}
                          >
                            {tier.buttonText}
                          </Button>
                        </CardFooter>
                      </Card>
                    );

                    return (
                      <div key={tier.name} className="relative">
                        {isPopular && (
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">Most Popular</Badge>
                          </div>
                        )}
                        <GlareHover
                          width="100%"
                          height="100%"
                          borderRadius="var(--radius)"
                          borderColor={isPopular ? "hsl(var(--primary))" : "hsl(var(--border))"}
                          background="hsl(var(--card))"
                          glareColor={isPopular ? "hsl(var(--primary))" : "rgba(255, 255, 255, 0.3)"}
                          className={cn(
                            "flex flex-col transition-all duration-300",
                            isPopular && "shadow-2xl shadow-primary/20 scale-105"
                          )}
                        >
                          {cardContent}
                        </GlareHover>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 grid place-items-center">
                  <div className="mt-4 flex items-center gap-4 rounded-lg border bg-card p-3 font-semibold text-foreground border-primary/50 shadow-sm">
                    <HeartHandshake className="h-6 w-6 text-primary" />
                    <p className="text-sm">We donate 10% of our profits to AI ethics research.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section> */}

        <div id="benefits" className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 py-12 md:py-20">
          <div
            className="mx-auto max-w-none bg-background dark:bg-slate-900/40 dark:border dark:border-white/10 dark:shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)] p-8 rounded-2xl shadow-lg relative overflow-hidden"
          >
            <SectionBackgroundEffect />
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 relative z-10">
              <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20">
                <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                  <Star className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                  Our Primary Benefits</p>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl mb-4 drop-shadow-2xl font-serif"><span className="animated-gradient-text">Everything You Need</span><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pr-1 pb-4">, Nothing You Don't</span></h2>
              <p className="max-w-prose text-muted-foreground md:text-lg">
                Scalerbox simplifies your workflow by combining essential AI tools into one easy-to-use platform.
              </p>
            </div>
            <div className="relative space-y-24 pb-24">
              {primaryFeatures.map((feature, index) => {
                // Calculate top offset for stacking effect: start at 5rem (20) and increment by 1rem (4) per card
                const topOffset = 20 + (index * 4);
                // Alternating rotation for organic feel
                const rotation = index % 2 === 0 ? '-rotate-1' : 'rotate-1';

                return (
                  <div
                    key={index}
                    className="sticky group perspective-1000"
                    style={{ top: `${topOffset / 4}rem` }}
                  >
                    <div className={`benefit-card bg-card border border-border p-8 rounded-[2rem] shadow-xl dark:shadow-none transform ${rotation} relative overflow-hidden`}>
                      {/* Background Splashes based on index */}
                      {index === 0 && <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>}
                      {index === 1 && <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50"></div>}

                      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                        <div className="flex-shrink-0">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${feature.color} ${feature.textColor}`}>
                            <FontAwesomeIcon icon={feature.icon as any} className="h-8 w-8" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                          <p className="text-muted-foreground leading-relaxed text-lg">
                            {feature.description}
                          </p>
                        </div>

                        <div className="hidden md:block text-muted-foreground/30 group-hover:text-primary transition-colors duration-300">
                          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <section id="reviews" className="w-full py-12 md:py-20 bg-background relative overflow-hidden">
          <SectionBackgroundEffect />
          <ScrollReveal>
            <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 relative z-10">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-full py-1.5 px-4 border border-purple-500/20 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
                  <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                    <Star className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                    Reviews
                  </p>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl mb-4 drop-shadow-2xl font-serif"><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Secure Your Spot At The Forefront Of </span><span className="animated-gradient-text">The AI Revolution</span></h2>
                <p className="max-w-prose text-muted-foreground md:text-lg">
                  Thousands of professionals are waiting to unlock the ultimate growth engine. Don't let your competitors get there first.
                </p>
              </div>
              <div className="w-full relative">
                <InfinityLoop
                  items={reviews}
                  speed="slow"
                  pauseOnHover={true}
                  renderItem={(review) => (
                    <div className="w-[350px] transform transition-transform duration-300 hover:scale-105">
                      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-2xl hover:shadow-primary/20 bg-gradient-to-bl from-blue-500/10 via-purple-600/10 to-card border-primary/10">
                        <CardContent className="p-6 flex-grow relative">
                          <Quote className="w-10 h-10 text-primary absolute top-6 left-6 opacity-50" />
                          <p className="text-muted-foreground mt-12 relative z-10 font-medium leading-relaxed">"{review.quote}"</p>
                        </CardContent>
                        <CardFooter className="p-6 pt-0 mt-auto">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 border-2 border-primary/20">
                              <AvatarImage src={review.avatar} alt={review.name} />
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-foreground">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.role}</p>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link href="/scalerboxreviews">
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    View All Reviews
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full hover:bg-muted/50 transition-all duration-300"
                  onClick={() => setIsExcitementDialogOpen(true)}
                >
                  Tell us why you are excited?
                </Button>
              </div>

              {/* Excitement Dialog */}
              <Dialog open={isExcitementDialogOpen} onOpenChange={setIsExcitementDialogOpen}>
                <DialogContent className="sm:max-w-4xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                      Tell us why you are excited? <span className="text-xl">🎉</span>
                    </DialogTitle>
                    <DialogDescription>
                      We'd love to hear your thoughts! Share your excitement with us.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleExcitementSubmit} className="mt-2">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Left Column: Inputs */}
                      <div className="space-y-5">
                        {/* Why are you excited? */}
                        <div className="space-y-2">
                          <Label htmlFor="why-excited" className="text-base font-semibold">why are you excited?</Label>
                          <Textarea
                            id="why-excited"
                            placeholder="Elaborate on why are you excited..."
                            className="min-h-[80px] max-h-[120px] resize-none"
                            value={excitementFormData.whyExcited}
                            onChange={(e) => setExcitementFormData({ ...excitementFormData, whyExcited: e.target.value })}
                            required
                          />
                        </div>

                        {/* Features Dropdown */}
                        <div className="space-y-2">
                          <Label htmlFor="feature-select" className="text-base font-semibold">Which feature excites you most? <span className="text-xs font-normal text-muted-foreground">(Optional)</span></Label>
                          <div
                            onClick={() => setIsFeatureDialogOpen(true)}
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                          >
                            <span className={excitementFormData.favoriteFeatures.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                              {excitementFormData.favoriteFeatures.length === 0
                                ? "Select features"
                                : excitementFormData.favoriteFeatures.length === 1
                                  ? excitementFormData.favoriteFeatures[0]
                                  : (
                                    <div className="flex items-center gap-2">
                                      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                        {excitementFormData.favoriteFeatures.length}
                                      </div>
                                      <span>features</span>
                                    </div>
                                  )
                              }
                            </span>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </div>
                        </div>

                        {/* Social Handle */}
                        <div className="space-y-2">
                          <Label htmlFor="social-handle" className="text-base font-semibold">Twitter/LinkedIn Handle <span className="text-xs font-normal text-muted-foreground">(Optional)</span></Label>
                          <Input
                            id="social-handle"
                            placeholder="@username or link"
                            value={excitementFormData.socialHandle}
                            onChange={(e) => {
                              const val = e.target.value;
                              setExcitementFormData({ ...excitementFormData, socialHandle: val });
                              if (val && !/^(https?:\/\/(www\.)?(twitter\.com|x\.com|linkedin\.com)\/.+|@[\w_]+)$/i.test(val)) {
                                setSocialError("Please put a valid username or URL");
                              } else {
                                setSocialError("");
                              }
                            }}
                            className={socialError ? "border-red-500 focus-visible:ring-red-500" : ""}
                          />
                          {socialError && <p className="text-xs text-red-500 font-medium">{socialError}</p>}
                        </div>

                        {/* Beta Priority Checkbox */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 border p-3 rounded-lg bg-muted/20">
                            <Checkbox
                              id="beta-access"
                              checked={excitementFormData.betaInterest}
                              onCheckedChange={(checked) => setExcitementFormData({ ...excitementFormData, betaInterest: checked as boolean })}
                            />
                            <label
                              htmlFor="beta-access"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              I'm interested in early beta access
                            </label>
                          </div>

                          {/* Conditional Email Input */}
                          {excitementFormData.betaInterest && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-1.5">
                              <Label htmlFor="beta-email" className="text-base font-semibold">Email for Beta Access</Label>
                              <Input
                                id="beta-email"
                                type="email"
                                placeholder="your@email.com"
                                className={cn("mt-1.5 transition-all duration-200", betaEmailError ? "border-red-500 focus-visible:ring-red-500" : "")}
                                required
                                value={excitementFormData.email || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setExcitementFormData({ ...excitementFormData, email: val });
                                  // Basic email regex for real-time validation
                                  if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                                    setBetaEmailError("Please enter a valid email address");
                                  } else {
                                    setBetaEmailError("");
                                  }
                                }}
                              />
                              {betaEmailError && <p className="text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{betaEmailError}</p>}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Video + Rating + Conditional Submit */}
                      <div className="space-y-5 flex flex-col">
                        {/* Video Upload - Takes available height */}
                        <div className="space-y-2 flex-grow flex flex-col">
                          <Label className="text-base font-semibold">Share your excitement via video <span className="text-xs font-normal text-muted-foreground">(Optional - Max 20MB)</span></Label>
                          {!videoPreviewUrl ? (
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer relative group flex-grow min-h-[200px]">
                              <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="h-8 w-8 text-primary" />
                              </div>
                              <p className="font-medium text-lg">Click to upload video</p>
                              <p className="text-sm text-muted-foreground mt-1">MP4, WebM, MOV</p>
                            </div>
                          ) : (
                            <div className="relative rounded-xl overflow-hidden border border-border bg-black/5 dark:bg-white/5 flex-grow flex items-center justify-center min-h-[200px]">
                              <video src={videoPreviewUrl} controls className="w-full max-h-[300px] object-contain" />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                onClick={removeVideo}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                <Video className="h-3 w-3 mr-1" />
                                {(excitementFormData.video?.size ? (excitementFormData.video.size / (1024 * 1024)).toFixed(1) : 0) + ' MB'}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Rating Slider */}
                        <div className="space-y-4 pt-2">
                          <Label className="text-base font-semibold">Rate your excitement?</Label>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star} className="relative">
                                  <Star className="h-8 w-8 text-muted-foreground/20 fill-muted-foreground/20" />
                                  <div
                                    className="absolute top-0 left-0 overflow-hidden"
                                    style={{
                                      width: `${Math.max(0, Math.min(100, (excitementFormData.rating - (star - 1)) * 100))}%`
                                    }}
                                  >
                                    <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                                  </div>
                                </div>
                              ))}
                            </div>
                            <span className="text-2xl font-bold text-black dark:text-white">{excitementFormData.rating.toFixed(1)}/5.0</span>
                          </div>
                          <Slider
                            defaultValue={[5]}
                            max={5}
                            step={0.1}
                            value={[excitementFormData.rating]}
                            onValueChange={(vals) => setExcitementFormData({ ...excitementFormData, rating: vals[0] })}
                            className="py-4"
                          />
                        </div>

                        {/* Conditional Submit Button (Right Column) */}
                        {excitementFormData.betaInterest && (
                          <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold h-12 rounded-full shadow-lg hover:shadow-xl transition-all">
                              Submit Feedback
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Default Submit Button (Full Width) - Only if Beta unchecked */}
                    {!excitementFormData.betaInterest && (
                      <div className="mt-8">
                        <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold h-12 rounded-full shadow-lg hover:shadow-xl transition-all">
                          Submit Feedback
                        </Button>
                      </div>
                    )}
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            {/* Hidden "Home to world's happiest users" section */}
            {/* <div className="container relative z-10 max-w-full px-4 md:px-6 lg:px-12 xl:px-20 mt-12 md:mt-20">
                <div className="relative grid items-center justify-center text-center">
                  <div className="relative z-10 space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Home to the <span className="animated-gradient-text">world's happiest users</span></h2>
                    <p className="mx-auto max-w-prose text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Join a global community of professionals who trust Scalerbox to enhance their creativity and productivity.
                    </p>
                  </div>

                  <Card className="absolute z-0 -left-10 top-0 p-3 shadow-lg flex items-center gap-3 animate-fade-in-up">
                    <div className="p-2 bg-pink-100 rounded-full"><Bone className="h-5 w-5 text-pink-500" /></div>
                    <div>
                      <p className="font-semibold text-sm">Delicious Treats</p>
                      <p className="text-xs text-muted-foreground">For a good boy</p>
                    </div>
                  </Card>
                  <Card className="absolute z-0 top-20 -right-10 p-3 shadow-lg flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="p-2 bg-blue-100 rounded-full"><ToyBrick className="h-5 w-5 text-blue-500" /></div>
                    <div>
                      <p className="font-semibold text-sm">New Squeaky Toy</p>
                      <p className="text-xs text-muted-foreground">A perfect surprise</p>
                    </div>
                  </Card>
                  <Card className="absolute z-0 -bottom-10 -left-16 p-3 shadow-lg flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="p-2 bg-purple-100 rounded-full"><Cat className="h-5 w-5 text-purple-500" /></div>
                    <div>
                      <p className="font-semibold text-sm">Catnip Fiesta</p>
                      <p className="text-xs text-muted-foreground">Weekend vibes</p>
                    </div>
                  </Card>

                  <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 justify-center gap-y-8 sm:grid-cols-3 sm:gap-x-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <PawPrint className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold tracking-tighter">80K+</h3>
                        <p className="text-sm uppercase tracking-wider text-muted-foreground">Happy Users</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <FileText className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold tracking-tighter">1M+</h3>
                        <p className="text-sm uppercase tracking-wider text-muted-foreground">Projects Started</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <Bell className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold tracking-tighter">99.9%</h3>
                        <p className="text-sm uppercase tracking-wider text-muted-foreground">Uptime</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
          </ScrollReveal>
        </section>

        <section id="faq" className="w-full py-12 md:py-20 relative overflow-hidden">
          <SectionBackgroundEffect />
          <ScrollReveal>
            <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20 relative z-10">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-1.5 px-4 border border-purple-500/20">
                  <p className="text-sm font-semibold tracking-wide flex items-center gap-2 animated-gradient-text">
                    <HelpCircle className="h-4 w-4" style={{ stroke: 'url(#primaryGradient)' }} />
                    FAQs
                  </p>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl mb-4 drop-shadow-2xl font-serif"><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Frequently Asked </span><span className="animated-gradient-text">Questions</span></h2>
              </div>
              <div className="grid gap-10 lg:grid-cols-2 items-start">
                {/* Mobile Layout */}
                <div className="order-last lg:hidden text-center">
                  <h3 className="text-3xl font-bold mb-2"><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Have more </span><span className="animated-gradient-text">questions?</span></h3>
                  <p className="text-muted-foreground mb-6">Find answers to common questions about Scalerbox.</p>
                  <div className="relative h-40 flex justify-center">
                    <div className="-ml-2.5">
                      <AnimatedMail onClick={() => setIsFormOpen(true)} />
                    </div>
                  </div>
                </div>
                {/* Desktop Layout */}
                <div className="hidden lg:block lg:order-first text-center">
                  <h3 className="text-3xl font-bold mb-2"><span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Have more </span><span className="animated-gradient-text">questions?</span></h3>
                  <p className="text-muted-foreground mb-6">Find answers to common questions about Scalerbox.</p>
                  <div className="relative h-40">
                    <AnimatedMail onClick={() => setIsFormOpen(true)} />
                  </div>
                </div>
                <div className="mx-auto w-full max-w-3xl lg:order-last">
                  <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </main >
      <div className="w-full bg-gradient-to-t from-purple-600 via-blue-500/30 to-white dark:to-background">
        <section className="w-full py-12 md:py-24">
          <div className="container max-w-full px-4 md:px-6 lg:px-12 xl:px-20">
            <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl drop-shadow-2xl font-serif">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Stop Dreaming, Start Scaling with </span><span className="animated-gradient-text pr-1">Scalerbox?</span>
                </h2>
                <p className="lg:hidden max-w-xl text-muted-foreground mx-auto">
                  The all-in-one platform to automate, manage, and scale your business.
                </p>
                <p className="hidden lg:block max-w-lg text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of founders transforming chaos into clarity. The all-in-one platform to automate, manage, and grow your business.
                </p>
                <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start">
                  <StarBorder className="rounded-full" color="#8b5cf6" speed="6s">
                    <GlareHover width="auto" height="auto" background="transparent" borderRadius="9999px" borderColor="transparent" glareColor="rgba(255, 255, 255, 0.3)">
                      <Button size="lg" className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700" onClick={handleJoinWaitlistClick}>
                        Join Waitlist to Get Started <Rocket className="ml-2 h-4 w-4" />
                      </Button>
                    </GlareHover>
                  </StarBorder>
                </div>
              </div>
              {/* Mobile: Centered image with all 3 cards in same positions, scaled down */}
              <div className="lg:hidden relative h-[280px] w-full max-w-[320px] mx-auto">
                {/* Background image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/db847820-64aa-437e-ae84-1a1fb63a12b0_1.png"
                    alt="Decorative background"
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </div>
                {/* Card 1: Top Left - Blog Published */}
                <Card className="absolute top-0 left-0 shadow-lg z-10 py-0.5 scale-[0.6] origin-top-left">
                  <CardHeader className="py-1 px-2">
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/webflow_logo_icon_169218.png"
                        alt="Webflow"
                        width={24}
                        height={24}
                        className="rounded"
                      />
                      <span className="text-sm font-semibold">Blog Published</span>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 text-[10px] px-1">Live</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Blog site Synced to Webflow</p>
                  </CardHeader>
                </Card>
                {/* Card 2: Middle Right - Analytics Update */}
                <Card className="absolute top-[100px] right-0 shadow-lg z-10 py-0.5 scale-[0.6] origin-top-right">
                  <CardHeader className="py-1 px-2">
                    <div className="flex items-center gap-1.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <Activity className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-semibold">Analytics Update</span>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 text-[10px] px-1">View</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">+24% traffic increased this week</p>
                  </CardHeader>
                </Card>
                {/* Card 3: Bottom Left - Post Generated */}
                <Card className="absolute bottom-0 left-4 shadow-lg z-10 py-0.5 scale-[0.6] origin-bottom-left">
                  <CardHeader className="py-1 px-2">
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/LLM_ICON_LOGO/twitter_200x200.png"
                        alt="X"
                        width={24}
                        height={24}
                        className="rounded"
                      />
                      <span className="text-sm font-semibold">Post Generated</span>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 text-[10px] px-1">New</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Ready to publish on X platform</p>
                  </CardHeader>
                </Card>
              </div>
              {/* Desktop: Original layout with positioned cards */}
              <div className="hidden lg:flex relative h-[400px] items-center justify-center translate-x-[10px]">
                {/* Background decorative image - positioned behind cards */}
                <div className="absolute inset-0 z-0 flex items-center justify-end" style={{ transform: 'translate(-60px, -30px)' }}>
                  <Image
                    src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/db847820-64aa-437e-ae84-1a1fb63a12b0_1.png"
                    alt="Decorative background"
                    width={700}
                    height={700}
                    className="object-contain"
                  />
                </div>
                <Card className="absolute top-[10px] left-[-60px] shadow-lg animate-fade-in-up z-10 py-1" style={{ animationDelay: '0.2s' }}>
                  <CardHeader className="py-1.5 px-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/webflow_logo_icon_169218.png"
                        alt="Webflow"
                        width={28}
                        height={28}
                        className="rounded"
                      />
                      <span className="text-base font-semibold">Blog Published</span>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 text-xs">Live</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Blog site Synced to Webflow</p>
                  </CardHeader>
                </Card>
                <Card className="absolute top-[150px] right-0 w-64 shadow-lg animate-fade-in-up z-10 py-1" style={{ animationDelay: '0.4s' }}>
                  <CardHeader className="py-1.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <Activity className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-base font-semibold">Analytics Update</span>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 text-xs">View</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">+24% traffic increased this week</p>
                  </CardHeader>
                </Card>
                <Card className="absolute bottom-0 left-10 shadow-lg animate-fade-in-up z-10 py-1" style={{ animationDelay: '0.6s' }}>
                  <CardHeader className="py-1.5 px-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/LLM_ICON_LOGO/twitter_200x200.png"
                        alt="X"
                        width={28}
                        height={28}
                        className="rounded"
                      />
                      <span className="text-base font-semibold">Post Generated</span>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 text-xs">New</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Ready to publish on X platform</p>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <div ref={footerRef}>
          <Footer />
        </div>
        <ContactFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} />

        {/* Floating Theme Toggle - Slide on Hover */}
        {
          mounted && (
            <div
              className="fixed bottom-0 right-0 w-32 h-32 z-50 flex items-end justify-end p-6"
              onMouseEnter={() => setShowThemeToggle(true)}
              onMouseLeave={() => setShowThemeToggle(false)}
            >
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full h-12 w-12 bg-background/80 backdrop-blur-sm shadow-xl border-border hover:scale-110 transition-all duration-500 transform ${showThemeToggle || isAtTop || isVisible ? (isNearFooter ? 'translate-x-24 opacity-0' : 'translate-x-0 opacity-100') : 'translate-x-24 opacity-0'}`}
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="h-6 w-6 text-white" />
                ) : (
                  <Moon className="h-6 w-6 text-slate-900" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          )
        }
        <FeatureSelectionDialog
          open={isFeatureDialogOpen}
          onOpenChange={setIsFeatureDialogOpen}
          currentSelection={excitementFormData.favoriteFeatures}
          onSelect={(features) => setExcitementFormData(prev => ({ ...prev, favoriteFeatures: features }))}
        />
      </div>
    </div >
  );
}
