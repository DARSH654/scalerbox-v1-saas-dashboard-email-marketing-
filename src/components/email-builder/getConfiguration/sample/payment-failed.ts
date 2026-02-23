import { TEditorConfiguration } from '../../documents/editor/core';

const PAYMENT_FAILED: TEditorConfiguration = {
    root: {
        type: 'EmailLayout',
        data: {
            backdropColor: '#F2F5F7',
            canvasColor: '#FFFFFF',
            borderRadius: 36,
            textColor: '#242424',
            fontFamily: 'MODERN_SANS',
            childrenIds: [
                'block_red_banner',
                'block_logo',
                'block_heading',
                'block_body_text',
                'block_fix_guide',
                'block_cta_button',
                'block_divider',
                'block_footer_text',
            ],
        },
    },

    block_red_banner: {
        type: 'Text',
        data: {
            style: {
                color: '#FFFFFF',
                backgroundColor: '#DC2626',
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: { top: 13, bottom: 13, left: 24, right: 24 },
            },
            props: {
                text: '⚠️ Payment failed — action required',
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

    block_heading: {
        type: 'Heading',
        data: {
            style: {
                color: null,
                backgroundColor: null,
                fontFamily: null,
                fontWeight: 'bold',
                textAlign: 'left',
                padding: { top: 32, bottom: 0, left: 24, right: 24 },
            },
            props: {
                level: 'h3',
                text: "We couldn't process your payment.",
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
                text: "Hey {{first_name}}, your payment of {{amount}} for Scalerbox Pro failed on {{payment_date}}. Your card ending in {{card_last4}} was declined. We'll retry automatically in 3 days — or fix it now to avoid any interruption.",
            },
        },
    },

    block_fix_guide: {
        type: 'Text',
        data: {
            style: {
                color: '#242424',
                backgroundColor: '#FEF2F2',
                fontSize: 13,
                fontFamily: null,
                fontWeight: 'normal',
                textAlign: 'left',
                padding: { top: 20, bottom: 20, left: 24, right: 24 },
            },
            props: {
                text: `<div style="font-size:12px;font-weight:bold;color:#991B1B;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:14px">
                        🔧 Quick fix guide
                      </div>

                      <!-- Fix 1 -->
                      <table width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:12px">
                        <tr>
                          <td style="width:26px;vertical-align:top;padding-top:1px">
                            <div style="width:20px;height:20px;background-color:#DC2626;border-radius:50%;text-align:center;line-height:20px;font-size:10px;font-weight:bold;color:#FFFFFF">1</div>
                          </td>
                          <td style="vertical-align:top;padding-left:10px">
                            <div style="font-size:13px;font-weight:bold;color:#242424">Check your card expiry date</div>
                            <div style="font-size:12px;color:#6B7280;margin-top:1px">If expired, add a new card in your billing settings.</div>
                          </td>
                        </tr>
                      </table>

                      <!-- Fix 2 -->
                      <table width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:12px">
                        <tr>
                          <td style="width:26px;vertical-align:top;padding-top:1px">
                            <div style="width:20px;height:20px;background-color:#DC2626;border-radius:50%;text-align:center;line-height:20px;font-size:10px;font-weight:bold;color:#FFFFFF">2</div>
                          </td>
                          <td style="vertical-align:top;padding-left:10px">
                            <div style="font-size:13px;font-weight:bold;color:#242424">Contact your bank</div>
                            <div style="font-size:12px;color:#6B7280;margin-top:1px">Some banks block international or online payments. Ask them to allow it.</div>
                          </td>
                        </tr>
                      </table>

                      <!-- Fix 3 -->
                      <table width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="width:26px;vertical-align:top;padding-top:1px">
                            <div style="width:20px;height:20px;background-color:#DC2626;border-radius:50%;text-align:center;line-height:20px;font-size:10px;font-weight:bold;color:#FFFFFF">3</div>
                          </td>
                          <td style="vertical-align:top;padding-left:10px">
                            <div style="font-size:13px;font-weight:bold;color:#242424">Try a different card</div>
                            <div style="font-size:12px;color:#6B7280;margin-top:1px">You can add a new payment method anytime from your dashboard.</div>
                          </td>
                        </tr>
                      </table>`,
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
                padding: { top: 20, bottom: 32, right: 24, left: 24 },
            },
            props: {
                buttonBackgroundColor: '#DC2626',
                buttonStyle: 'pill',
                buttonTextColor: '#FFFFFF',
                fullWidth: false,
                size: 'medium',
                text: 'Update payment method',
                url: 'https://scalerbox.com',
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
                text: 'Need help? Just reply to this email to contact support.',
            },
        },
    },
};

export default PAYMENT_FAILED;
