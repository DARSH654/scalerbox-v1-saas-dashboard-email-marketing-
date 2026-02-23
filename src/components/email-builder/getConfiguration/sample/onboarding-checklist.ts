import { TEditorConfiguration } from '../../documents/editor/core';

const ONBOARDING_CHECKLIST: TEditorConfiguration = {
    root: {
        type: 'EmailLayout',
        data: {
            backdropColor: '#F0FDF8',
            canvasColor: '#FFFFFF',
            borderRadius: 36,
            textColor: '#242424',
            fontFamily: 'MODERN_SANS',
            childrenIds: [
                'block_logo',
                'block_hero_badge',
                'block_hero_heading',
                'block_hero_subtext',
                'block_progress_bar',
                'block_checklist_label',
                'block_step1_done',
                'block_step2_done',
                'block_step3_active',
                'block_step4_pending',
                'block_step5_pending',
                'block_tip_box',
                'block_cta_primary',
                'block_cta_secondary',
                'block_divider',
                'block_footer',
            ],
        },
    },

    block_logo: {
        type: 'Image',
        data: {
            style: {
                padding: { top: 28, bottom: 0, right: 28, left: 28 },
                backgroundColor: '#064E3B',
                textAlign: 'left',
            },
            props: {
                height: 68,
                url: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png',
                alt: 'Scalerbox',
                linkHref: 'https://scalerbox.com',
                contentAlignment: 'middle',
            },
        },
    },

    block_hero_badge: {
        type: 'Text',
        data: {
            style: {
                color: '#6EE7B7',
                backgroundColor: '#064E3B',
                fontSize: 11,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 28, bottom: 0, left: 28, right: 28 },
            },
            props: { text: '📋 ONBOARDING CHECKLIST' },
        },
    },

    block_hero_heading: {
        type: 'Heading',
        data: {
            style: {
                color: '#FFFFFF',
                backgroundColor: '#064E3B',
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 14, bottom: 0, left: 28, right: 28 },
            },
            props: {
                level: 'h3',
                text: "Let's get you set up properly, Marcus. 🚀",
            },
        },
    },

    block_hero_subtext: {
        type: 'Text',
        data: {
            style: {
                color: '#6EE7B7',
                backgroundColor: '#064E3B',
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 12, bottom: 32, left: 28, right: 28 },
            },
            props: {
                text: "Most users who complete setup in the first 7 days see 3x better results. You're on Day 3 — here's what's left.",
            },
        },
    },

    block_progress_bar: {
        type: 'Text',
        data: {
            style: {
                color: '#065F46',
                backgroundColor: '#F0FDF4',
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 20, bottom: 20, left: 28, right: 28 },
            },
            props: {
                text: 'Your setup progress: 2/5 steps done (40%)\n▓▓░░░░░░░░ 40% complete',
            },
        },
    },

    block_checklist_label: {
        type: 'Text',
        data: {
            style: {
                color: '#9CA3AF',
                backgroundColor: null,
                fontSize: 12,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 24, bottom: 16, left: 28, right: 28 },
            },
            props: { text: 'COMPLETE THESE STEPS' },
        },
    },

    block_step1_done: {
        type: 'Text',
        data: {
            style: {
                color: '#065F46',
                backgroundColor: '#F0FDF4',
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 16, bottom: 16, left: 28, right: 28 },
            },
            props: {
                text: '✅ Step 1 — Create your account\nCompleted on Feb 14, 2026',
            },
        },
    },

    block_step2_done: {
        type: 'Text',
        data: {
            style: {
                color: '#065F46',
                backgroundColor: '#F0FDF4',
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 16, bottom: 16, left: 28, right: 28 },
            },
            props: {
                text: '✅ Step 2 — Import your contacts\n1,240 contacts imported',
            },
        },
    },

    block_step3_active: {
        type: 'Text',
        data: {
            style: {
                color: '#111827',
                backgroundColor: '#FFFFFF',
                fontSize: 15,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 18, bottom: 18, left: 28, right: 28 },
            },
            props: {
                text: '▶ DO THIS NEXT\n\nStep 3 — Connect your first integration\n\nLink Stripe to track revenue per campaign. Takes 2 minutes.\n\n<a href="https://scalerbox.com" style="color: #FFFFFF; background-color: #10B981; border-radius: 64px; display: inline-block; padding: 9px 18px; text-decoration: none; font-size: 13px; font-weight: bold;">Connect Stripe →</a>',
            },
        },
    },

    block_step4_pending: {
        type: 'Text',
        data: {
            style: {
                color: '#6B7280',
                backgroundColor: '#F9FAFB',
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 16, bottom: 16, left: 28, right: 28 },
            },
            props: {
                text: '○ Step 4 — Create your first campaign (~5 min)\nUse a template or start from scratch',
            },
        },
    },

    block_step5_pending: {
        type: 'Text',
        data: {
            style: {
                color: '#6B7280',
                backgroundColor: '#F9FAFB',
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 16, bottom: 16, left: 28, right: 28 },
            },
            props: {
                text: '○ Step 5 — Turn on your first automation (~3 min)\nSet a drip sequence or welcome flow',
            },
        },
    },

    block_tip_box: {
        type: 'Text',
        data: {
            style: {
                color: '#374151',
                backgroundColor: '#ECFDF5',
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 18, bottom: 18, left: 28, right: 28 },
            },
            props: {
                text: '💡 Quick tip from the team\n\nConnect Stripe first before building any campaign — it unlocks revenue attribution so you can see exactly which emails are making you money.',
            },
        },
    },

    block_cta_primary: {
        type: 'Button',
        data: {
            style: {
                backgroundColor: null,
                fontSize: 15,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 20, bottom: 8, right: 28, left: 28 },
            },
            props: {
                buttonBackgroundColor: '#10B981',
                buttonStyle: 'pill',
                buttonTextColor: '#FFFFFF',
                fullWidth: false,
                size: 'medium',
                text: 'Continue setup →',
                url: 'https://scalerbox.com',
            },
        },
    },

    block_cta_secondary: {
        type: 'Text',
        data: {
            style: {
                color: '#10B981',
                backgroundColor: null,
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 0, bottom: 28, left: 28, right: 28 },
            },
            props: {
                text: '<a href="https://scalerbox.com" style="color: #10B981; text-decoration: underline;">Watch the 3-min setup video instead</a>',
            },
        },
    },

    block_divider: {
        type: 'Divider',
        data: {
            style: {
                backgroundColor: null,
                padding: { top: 0, bottom: 0, left: 28, right: 28 },
            },
            props: {
                lineHeight: 1,
                lineColor: '#EEEEEE',
            },
        },
    },

    block_footer: {
        type: 'Text',
        data: {
            style: {
                color: '#9CA3AF',
                backgroundColor: null,
                fontSize: 12,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 16, bottom: 28, left: 28, right: 28 },
            },
            props: {
                text: 'Need help with any step? <a href="https://scalerbox.com" style="color: #10B981; text-decoration: underline;">Book a free onboarding call</a> or just reply to this email — we\'re real humans and we reply fast.\n— Marcus from Scalerbox',
            },
        },
    },
};

export default ONBOARDING_CHECKLIST;
