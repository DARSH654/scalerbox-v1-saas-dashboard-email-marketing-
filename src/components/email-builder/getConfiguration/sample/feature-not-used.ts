import { TEditorConfiguration } from '../../documents/editor/core';

const FEATURE_NOT_USED: TEditorConfiguration = {
    root: {
        type: 'EmailLayout',
        data: {
            backdropColor: '#FFFBEB',
            canvasColor: '#FFFFFF',
            borderRadius: 36,
            textColor: '#242424',
            fontFamily: 'MODERN_SANS',
            childrenIds: [
                'block_logo',
                'block_badge',
                'block_hero_heading',
                'block_hero_subtext',
                'block_feature_label',
                'block_feature_card',
                'block_howto_label',
                'block_step1',
                'block_step2',
                'block_step3',
                'block_social_proof',
                'block_cta_primary',
                'block_secondary_links',
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
                backgroundColor: '#312E81',
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

    block_badge: {
        type: 'Text',
        data: {
            style: {
                color: '#A5B4FC',
                backgroundColor: '#312E81',
                fontSize: 11,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 24, bottom: 0, left: 28, right: 28 },
            },
            props: { text: '💤 SLEEPING FEATURE ALERT' },
        },
    },

    block_hero_heading: {
        type: 'Heading',
        data: {
            style: {
                color: '#FFFFFF',
                backgroundColor: '#312E81',
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 12, bottom: 0, left: 28, right: 28 },
            },
            props: {
                level: 'h3',
                text: 'Priya, this feature is just sitting there collecting dust.',
            },
        },
    },

    block_hero_subtext: {
        type: 'Text',
        data: {
            style: {
                color: '#C7D2FE',
                backgroundColor: '#312E81',
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 14, bottom: 32, left: 28, right: 28 },
            },
            props: {
                text: "You've been on Scalerbox for 9 days but haven't touched AI Campaign Automation yet. Users who turn it on in week one see 2.4x more revenue by month two.",
            },
        },
    },

    block_feature_label: {
        type: 'Text',
        data: {
            style: {
                color: '#9CA3AF',
                backgroundColor: null,
                fontSize: 12,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 28, bottom: 14, left: 28, right: 28 },
            },
            props: { text: "THE FEATURE YOU'RE MISSING OUT ON" },
        },
    },

    block_feature_card: {
        type: 'Text',
        data: {
            style: {
                color: '#C7D2FE',
                backgroundColor: '#312E81',
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 26, bottom: 26, left: 28, right: 28 },
            },
            props: {
                text: "🤖 AI Campaign Automation\nSet it once. Let it run forever.\n\nAI Automation watches your contacts' behaviour and sends the perfect email at the perfect time — without you lifting a finger.\n\n2.4x More Revenue   |   68% Higher Open Rate   |   5 Min To Set Up",
            },
        },
    },

    block_howto_label: {
        type: 'Text',
        data: {
            style: {
                color: '#9CA3AF',
                backgroundColor: null,
                fontSize: 12,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 24, bottom: 14, left: 28, right: 28 },
            },
            props: { text: 'HOW IT WORKS IN 3 STEPS' },
        },
    },

    block_step1: {
        type: 'Text',
        data: {
            style: {
                color: '#374151',
                backgroundColor: null,
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 0, bottom: 12, left: 28, right: 28 },
            },
            props: {
                text: '1.  Pick a trigger\ne.g. "User signed up" or "User hasn\'t logged in for 5 days"',
            },
        },
    },

    block_step2: {
        type: 'Text',
        data: {
            style: {
                color: '#374151',
                backgroundColor: null,
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 0, bottom: 12, left: 28, right: 28 },
            },
            props: {
                text: '2.  Choose a template or let AI write it\nAI drafts the email copy for your audience in seconds',
            },
        },
    },

    block_step3: {
        type: 'Text',
        data: {
            style: {
                color: '#374151',
                backgroundColor: null,
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 0, bottom: 24, left: 28, right: 28 },
            },
            props: {
                text: "3.  Hit activate — you're done\nScalerbox handles sending, timing, and follow-ups automatically",
            },
        },
    },

    block_social_proof: {
        type: 'Text',
        data: {
            style: {
                color: '#92400E',
                backgroundColor: '#FFFBEB',
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 18, bottom: 18, left: 28, right: 28 },
            },
            props: {
                text: '"I turned on AI Automation on a Tuesday afternoon. By Friday I had 3 new paying customers I didn\'t have to manually email once."\n\n— Tom R., SaaS founder, $340 MRR → $2,100 MRR in 6 weeks',
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
                padding: { top: 20, bottom: 12, right: 28, left: 28 },
            },
            props: {
                buttonBackgroundColor: '#4338CA',
                buttonStyle: 'pill',
                buttonTextColor: '#FFFFFF',
                fullWidth: false,
                size: 'medium',
                text: 'Turn on AI Automation →',
                url: 'https://scalerbox.com',
            },
        },
    },

    block_secondary_links: {
        type: 'Text',
        data: {
            style: {
                color: '#4338CA',
                backgroundColor: null,
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 0, bottom: 28, left: 28, right: 28 },
            },
            props: {
                text: '<a href="https://scalerbox.com" style="color: #4338CA; text-decoration: underline; margin-right: 16px;">Watch a 2-min demo</a> | <a href="https://scalerbox.com" style="color: #9CA3AF; text-decoration: underline;">See all features</a>',
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
                text: 'Want me to walk you through it live? <a href="https://scalerbox.com" style="color: #4338CA; text-decoration: underline;">Book a 15-min call</a> — I\'ll set it up with you.\n— The Scalerbox team',
            },
        },
    },
};

export default FEATURE_NOT_USED;
