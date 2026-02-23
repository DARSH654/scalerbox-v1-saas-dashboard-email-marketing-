import { TEditorConfiguration } from '../../documents/editor/core';

const TRIAL_ENDING_SOON: TEditorConfiguration = {
    root: {
        type: 'EmailLayout',
        data: {
            backdropColor: '#F2F5F7',
            canvasColor: '#FFFFFF',
            borderRadius: 36,
            textColor: '#242424',
            fontFamily: 'MODERN_SANS',
            childrenIds: [
                'block_urgency_banner',
                'block_logo',
                'block_countdown_box',
                'block_heading',
                'block_body_text',
                'block_loss_box',
                'block_pricing_box',
                'block_cta_button',
                'block_secondary_link',
                'block_divider',
                'block_footer_text',
            ],
        },
    },

    block_urgency_banner: {
        type: 'Text',
        data: {
            style: {
                color: '#E65100',
                backgroundColor: '#FFF3E0',
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: { top: 12, bottom: 12, left: 24, right: 24 },
            },
            props: {
                text: "⏰ Your trial ends in 3 days — don't lose your progress",
            },
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

    block_countdown_box: {
        type: 'Text',
        data: {
            style: {
                color: '#E65100',
                backgroundColor: '#FFF8F0',
                fontSize: 64,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 20, bottom: 20, left: 24, right: 24 },
            },
            props: {
                text: '3 Days Remaining\nTrial ends {{trial_end_date}}',
            },
        },
    },

    block_heading: {
        type: 'Heading',
        data: {
            style: {
                color: '#242424',
                backgroundColor: null,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 24, bottom: 0, left: 24, right: 24 },
            },
            props: {
                level: 'h3',
                text: 'Hey {{first_name}}, your free ride is almost up.',
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
                padding: { top: 8, bottom: 20, left: 24, right: 24 },
            },
            props: {
                text: "Your 14-day Pro trial wraps up on {{trial_end_date}}. After that, your account drops to the free plan — you'll lose access to your analytics history, automations, and all integrations.",
            },
        },
    },

    block_loss_box: {
        type: 'Text',
        data: {
            style: {
                color: '#474849',
                backgroundColor: '#FFF8F0',
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 20, bottom: 20, left: 24, right: 24 },
            },
            props: {
                text: "WHAT YOU'LL LOSE ON THE FREE PLAN\n\n❌ Analytics history & conversion reports\n❌ AI automation & drip sequences\n❌ All integrations (Stripe, HubSpot, Slack)",
            },
        },
    },

    block_pricing_box: {
        type: 'Text',
        data: {
            style: {
                color: '#242424',
                backgroundColor: '#F2F5F7',
                fontSize: 32,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 20, bottom: 20, left: 24, right: 24 },
            },
            props: {
                text: 'Keep Pro for just {{pro_price}}/month\nCancel anytime. No contracts. Instant access.',
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
                padding: { top: 4, bottom: 16, right: 24, left: 24 },
            },
            props: {
                buttonBackgroundColor: '#FF6D00',
                buttonStyle: 'pill',
                buttonTextColor: '#FFFFFF',
                fullWidth: false,
                size: 'medium',
                text: 'Upgrade to Pro →',
                url: 'https://scalerbox.com',
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
                text: '<a href="https://scalerbox.com" style="color: #4F7CF3; text-decoration: underline;">See all plans & pricing</a>',
            },
        },
    },

    block_divider: {
        type: 'Divider',
        data: {
            style: {
                backgroundColor: null,
                padding: { top: 16, bottom: 16, left: 24, right: 24 },
            },
            props: {
                lineHeight: 1,
                lineColor: '#EEEEEE',
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
                text: 'Not ready to upgrade? <a href="https://scalerbox.com" style="color: #4F7CF3; text-decoration: underline;">Stay on the free plan</a> or reply to this email — we\'re happy to answer any questions.',
            },
        },
    },
};

export default TRIAL_ENDING_SOON;
