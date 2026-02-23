import { TEditorConfiguration } from '../../documents/editor/core';

const TRIAL_EXPIRED: TEditorConfiguration = {
    root: {
        type: 'EmailLayout',
        data: {
            backdropColor: '#0F0A1E',
            canvasColor: '#FFFFFF',
            borderRadius: 36,
            textColor: '#242424',
            fontFamily: 'MODERN_SANS',
            childrenIds: [
                'block_top_accent',
                'block_logo',
                'block_hero_heading',
                'block_hero_subtext',
                'block_status_row',
                'block_data_safe',
                'block_trial_stats_label',
                'block_trial_stats',
                'block_plan_label',
                'block_plan_card',
                'block_cta_primary',
                'block_cta_annual',
                'block_secondary_links',
                'block_divider',
                'block_footer',
            ],
        },
    },

    block_top_accent: {
        type: 'Text',
        data: {
            style: {
                color: '#FF5C7A',
                backgroundColor: '#FF5C7A',
                fontSize: 1,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 2, bottom: 2, left: 0, right: 0 },
            },
            props: { text: ' ' },
        },
    },

    block_logo: {
        type: 'Image',
        data: {
            style: {
                padding: { top: 28, bottom: 0, right: 28, left: 28 },
                backgroundColor: '#1E1040',
                textAlign: 'left',
            },
            props: {
                height: 72,
                url: 'https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png',
                alt: 'Scalerbox',
                linkHref: 'https://scalerbox.com',
                contentAlignment: 'middle',
            },
        },
    },

    block_hero_heading: {
        type: 'Heading',
        data: {
            style: {
                color: '#FFFFFF',
                backgroundColor: '#1E1040',
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 32, bottom: 0, left: 28, right: 28 },
            },
            props: {
                level: 'h3',
                text: "■ TRIAL EXPIRED\n\nTime's up, Jordan. 😔",
            },
        },
    },

    block_hero_subtext: {
        type: 'Text',
        data: {
            style: {
                color: '#A78BCC',
                backgroundColor: '#1E1040',
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 12, bottom: 28, "left": 28, "right": 28 },
            },
            props: {
                text: "Your Pro trial ended on Feb 14, 2026. We've paused your campaigns and locked your dashboard — but everything's saved and waiting for you.",
            },
        },
    },

    block_status_row: {
        type: 'Text',
        data: {
            style: {
                color: '#EF4444',
                backgroundColor: '#F7F5FF',
                fontSize: 12,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: { top: 20, bottom: 20, left: 28, right: 28 },
            },
            props: {
                text: '📊 Analytics: LOCKED    ⚙️ Automations: PAUSED    🔗 Integrations: OFF    📧 Campaigns: STOPPED',
            },
        },
    },

    block_data_safe: {
        type: 'Text',
        data: {
            style: {
                color: '#5B21B6',
                backgroundColor: '#F5F3FF',
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 18, bottom: 18, left: 28, right: 28 },
            },
            props: {
                text: '🛡️ Your data is protected until Mar 16, 2026\n\n6 campaigns, 1,240 contacts, and all your settings are safely stored. Upgrade before March 16 to restore everything instantly.',
            },
        },
    },

    block_trial_stats_label: {
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
            props: { text: 'WHAT YOU BUILT DURING YOUR TRIAL' },
        },
    },

    block_trial_stats: {
        type: 'ColumnsContainer',
        data: {
            style: {
                backgroundColor: null,
                padding: { top: 0, bottom: 24, left: 28, right: 28 },
            },
            props: {
                columnsCount: 3,
                columns: [
                    { childrenIds: ['block_stat_campaigns'] },
                    { childrenIds: ['block_stat_contacts'] },
                    { childrenIds: ['block_stat_openrate'] },
                ],
            },
        },
    },

    block_stat_campaigns: {
        type: 'Text',
        data: {
            style: {
                color: '#7C3AED',
                backgroundColor: '#FDF4FF',
                fontSize: 28,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: { top: 16, bottom: 16, left: 8, right: 8 },
            },
            props: { text: '6\nCampaigns' },
        },
    },

    block_stat_contacts: {
        type: 'Text',
        data: {
            style: {
                color: '#7C3AED',
                backgroundColor: '#FDF4FF',
                fontSize: 28,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: { top: 16, bottom: 16, left: 8, right: 8 },
            },
            props: { text: '1.2k\nContacts' },
        },
    },

    block_stat_openrate: {
        type: 'Text',
        data: {
            style: {
                color: '#7C3AED',
                backgroundColor: '#FDF4FF',
                fontSize: 28,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: { top: 16, bottom: 16, left: 8, right: 8 },
            },
            props: { text: '34%\nOpen Rate' },
        },
    },

    block_plan_label: {
        type: 'Text',
        data: {
            style: {
                color: '#9CA3AF',
                backgroundColor: null,
                fontSize: 12,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 0, bottom: 14, left: 28, right: 28 },
            },
            props: { text: 'UNLOCK EVERYTHING AGAIN' },
        },
    },

    block_plan_card: {
        type: 'Text',
        data: {
            style: {
                color: '#C4B5FD',
                backgroundColor: '#1E1040',
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 26, bottom: 26, left: 28, right: 28 },
            },
            props: {
                text: 'Pro Plan\n$29/month · Cancel anytime\n\n✓ Full analytics      ✓ Unlimited integrations\n✓ AI automation      ✓ Smart segmentation\n✓ Revenue tracking   ✓ Priority support',
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
                padding: { top: 20, bottom: 8, right: 28, "left": 28 },
            },
            props: {
                buttonBackgroundColor: '#7C3AED',
                buttonStyle: 'pill',
                buttonTextColor: '#FFFFFF',
                fullWidth: false,
                size: 'medium',
                text: 'Reactivate my Pro account →',
                url: 'https://scalerbox.com',
            },
        },
    },

    block_cta_annual: {
        type: 'Button',
        data: {
            style: {
                backgroundColor: null,
                fontSize: 14,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 0, bottom: 8, right: 28, left: 28 },
            },
            props: {
                buttonBackgroundColor: '#F5F3FF',
                buttonStyle: 'pill',
                buttonTextColor: '#7C3AED',
                fullWidth: false,
                size: 'medium',
                text: '✨ Save 20% with annual billing',
                url: 'https://scalerbox.com',
            },
        },
    },

    block_secondary_links: {
        type: 'Text',
        data: {
            style: {
                color: '#9CA3AF',
                backgroundColor: null,
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 8, bottom: 28, left: 28, right: 28 },
            },
            props: {
                text: '<a href="https://scalerbox.com" style="color: #9CA3AF; text-decoration: underline; margin-right: 16px;">Compare plans</a> | <a href="https://scalerbox.com" style="color: #9CA3AF; text-decoration: underline;">Continue on free plan</a>',
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
                text: 'Need more time or have billing questions? <a href="https://scalerbox.com" style="color: #7C3AED; text-decoration: underline;">Talk to us</a> — we\'re real humans and we reply fast.\n— The Scalerbox team',
            },
        },
    },
};

export default TRIAL_EXPIRED;
