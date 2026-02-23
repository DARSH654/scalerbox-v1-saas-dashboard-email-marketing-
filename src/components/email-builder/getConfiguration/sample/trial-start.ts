import { TEditorConfiguration } from '../../documents/editor/core';

const TRIAL_START: TEditorConfiguration = {
    root: {
        type: 'EmailLayout',
        data: {
            backdropColor: '#F2F5F7',
            canvasColor: '#FFFFFF',
            borderRadius: 36,
            textColor: '#242424',
            fontFamily: 'MODERN_SANS',
            childrenIds: [
                'block_logo',
                'block_trial_badge',
                'block_heading',
                'block_body_text',
                'block_stats_row',
                'block_features_label',
                'block_feature_1',
                'block_feature_2',
                'block_feature_3',
                'block_cta_button',
                'block_secondary_link',
                'block_divider',
                'block_founder_note',
                'block_footer_text',
            ],
        },
    },

    block_logo: {
        type: 'Image',
        data: {
            style: {
                padding: { top: 24, bottom: 8, right: 24, left: 24 },
                backgroundColor: null,
                textAlign: 'left',
            },
            props: {
                height: 90,
                url: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png',
                alt: 'Scalerbox',
                linkHref: 'https://scalerbox.com',
                contentAlignment: 'middle',
            },
        },
    },

    block_trial_badge: {
        type: 'Text',
        data: {
            style: {
                color: '#4F7CF3',
                backgroundColor: '#EEF3FE',
                fontSize: 12,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 24, bottom: 0, left: 24, right: 24 },
            },
            props: {
                text: '✦ 14-DAY FREE TRIAL STARTED',
            },
        },
    },

    block_heading: {
        type: 'Heading',
        data: {
            style: {
                color: null,
                backgroundColor: null,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 16, bottom: 0, left: 24, right: 24 },
            },
            props: {
                level: 'h3',
                text: "You're in. Let's get you growing.",
            },
        },
    },

    block_body_text: {
        type: 'Text',
        data: {
            style: {
                color: '#474849',
                backgroundColor: null,
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 8, bottom: 24, left: 24, right: 24 },
            },
            props: {
                text: 'Hey {{first_name}}, your 14-day Pro trial is now active. You have full access to every feature — no credit card charged until your trial ends on {{trial_end_date}}.',
            },
        },
    },

    block_stats_row: {
        type: 'ColumnsContainer',
        data: {
            style: {
                backgroundColor: '#F2F5F7',
                borderRadius: 16,
                padding: { top: 0, bottom: 24, left: 24, right: 24 },
            },
            props: {
                columnsCount: 3,
                columns: [
                    {
                        childrenIds: ['block_stat_days'],
                    },
                    {
                        childrenIds: ['block_stat_plan'],
                    },
                    {
                        childrenIds: ['block_stat_cost'],
                    },
                ],
            },
        },
    },

    block_stat_days: {
        type: 'Text',
        data: {
            style: {
                color: '#242424',
                backgroundColor: null,
                fontSize: 28,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: { top: 20, bottom: 20, left: 0, right: 0 },
            },
            props: {
                text: '14\nDAYS LEFT',
            },
        },
    },

    block_stat_plan: {
        type: 'Text',
        data: {
            style: {
                color: '#242424',
                backgroundColor: null,
                fontSize: 28,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: { top: 20, bottom: 20, left: 0, right: 0 },
            },
            props: {
                text: 'Pro\nFULL ACCESS',
            },
        },
    },

    block_stat_cost: {
        type: 'Text',
        data: {
            style: {
                color: '#242424',
                backgroundColor: null,
                fontSize: 28,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: { top: 20, bottom: 20, left: 0, right: 0 },
            },
            props: {
                text: '$0\nCHARGED NOW',
            },
        },
    },

    block_features_label: {
        type: 'Text',
        data: {
            style: {
                color: '#474849',
                backgroundColor: null,
                fontSize: 12,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 0, bottom: 12, left: 24, right: 24 },
            },
            props: {
                text: "WHAT'S INCLUDED IN YOUR TRIAL",
            },
        },
    },

    block_feature_1: {
        type: 'Text',
        data: {
            style: {
                color: '#474849',
                backgroundColor: null,
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 0, bottom: 12, left: 24, right: 24 },
            },
            props: {
                text: '⚡ Full Analytics Dashboard\nReal-time metrics, conversion tracking, and revenue attribution.',
            },
        },
    },

    block_feature_2: {
        type: 'Text',
        data: {
            style: {
                color: '#474849',
                backgroundColor: null,
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 0, bottom: 12, left: 24, right: 24 },
            },
            props: {
                text: '🔗 Unlimited Integrations\nConnect Stripe, HubSpot, Slack and 40+ tools — zero limits.',
            },
        },
    },

    block_feature_3: {
        type: 'Text',
        data: {
            style: {
                color: '#474849',
                backgroundColor: null,
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 0, bottom: 24, left: 24, right: 24 },
            },
            props: {
                text: '🤖 AI Campaign Automation\nAutomated drip sequences, smart segmentation, and AI send-time optimization.',
            },
        },
    },

    block_cta_button: {
        type: 'Button',
        data: {
            style: {
                backgroundColor: null,
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 12, bottom: 12, right: 24, left: 24 },
            },
            props: {
                buttonBackgroundColor: '#4F7CF3',
                buttonStyle: 'pill',
                buttonTextColor: '#FFFFFF',
                fullWidth: false,
                size: 'medium',
                text: 'Go to your Dashboard →',
                url: '{{dashboard_url}}',
            },
        },
    },

    block_secondary_link: {
        type: 'Text',
        data: {
            style: {
                color: '#4F7CF3',
                backgroundColor: null,
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 0, bottom: 24, left: 24, right: 24 },
            },
            props: {
                text: '<a href="{{onboarding_url}}" style="color:#4F7CF3;text-decoration:underline" target="_blank">Follow the 5-minute setup guide</a>',
            },
        },
    },

    block_divider: {
        type: 'Divider',
        data: {
            style: {
                backgroundColor: null,
                padding: { top: 16, bottom: 16, left: 24, "right": 24 },
            },
            props: {
                lineHeight: 1,
                lineColor: '#EEEEEE',
            },
        },
    },

    block_founder_note: {
        type: 'Text',
        data: {
            style: {
                color: '#474849',
                backgroundColor: null,
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 4, bottom: 8, left: 24, right: 24 },
            },
            props: {
                text: "👋 A personal note: I'm {{founder_name}}, founder of Scalerbox. Reply directly to this email — I read every message and would love to hear what you're building.",
            },
        },
    },

    block_footer_text: {
        type: 'Text',
        data: {
            style: {
                color: '#474849',
                backgroundColor: null,
                fontSize: 12,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 4, bottom: 24, left: 24, right: 24 },
            },
            props: {
                text: 'Need help? Reply to this email or <a href="{{cal_url}}" style="color:#4F7CF3;text-decoration:underline">book a 15-min onboarding call</a>.',
            },
        },
    },
};

export default TRIAL_START;
