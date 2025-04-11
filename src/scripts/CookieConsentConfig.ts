import type { CookieConsentConfig } from "vanilla-cookieconsent";

// Extend the Window interface to include the dataLayer object
declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    ttq: { load: (...args: any[]) => void; page: (...args: any[]) => void, revokeConsent: (...args: any[]) => void };
  }
}

export const config: CookieConsentConfig = {
  revision: 1,
  autoClearCookies: true,
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom right",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^_ga/,
          },
          {
            name: "_gid",
          },
        ]
      },
      enabled: true,
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
          onAccept: () => {
            window.gtag("consent", "update", {
              analytics_storage: "granted",
            });
            // TODO: load ga4
          },
          onReject: () => {
            window.gtag("consent", "update", {
              analytics_storage: "denied",
            });
          },
          cookies: [
            {
              name: /^_ga/,
            },
            {
              name: "_gid",
            },
          ],
        },
      },
    },
    marketing: {
      autoClear: {
        cookies: [
          {
            name: /^_ga/,
          },
          {
            name: "_gid",
          },
          {
            name: "_ttp",
          },
          {
            name: "_tt_enable_cookie",
          },
          {
            name: "_fbp",
          },
          {
            name: "_gcl_au"
          }
        ],
        reloadPage: true,
      }, 
      
      enabled: true,
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Ad Sense</a>',
          onAccept: () => {
            window.gtag("consent", "update", {
              ad_storage: "granted",
              ad_user_data: "granted",
              ad_personalization: "granted",
            });
          },

          onReject: () => {
            window.gtag("consent", "update", {
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
            });
          },
          cookies: [
            {
              name: /^_ga/,
            },
            {
              name: "_gid",
            },
            {
              name: "_gcl_au"
            }
            
          ],
        },

        fbp: {
          label:
            '<a href="https://developers.facebook.com/docs/meta-pixel/guides/terms-and-policies/" target="_blank">Meta Pixel</a>',
          onAccept: () => {
            window.fbq("consent", "grant");
          },
          onReject: () => {
            window.fbq("consent", "revoke");
          },
          cookies: [
            {
              name: "_fbp",
            },
          ],
        },
        ttp: {
          label:
            '<a href="https://ads.tiktok.com/help/article/tiktok-advertiser-tools-and-related-terms" target="_blank">TikTok Pixel</a>',
          onAccept: () => {
            window.ttq.load("CVSEJP3C77UD3500KQS0");
            window.ttq.page();
          },
          onReject: () => {
            console.log("revoking ttp")
            window.ttq.revokeConsent();
          },
          cookies: [
            {
              name: "_ttp",
            },
            {
              name: "_tt_enable_cookie",
            },
            
          ],
        },
      },
    },
  },

  language: {
    default: "en",
    autoDetect: "browser",
    translations: {
      en: {
        consentModal: {
          title: "We value your privacy",
          description:
            "To enhance your experience on our site, we use cookies and similar technologies. Some are essential for the website to function properly, while others help us understand how you interact with our content. You can choose to accept all cookies or manage your preferences.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          footer: '<a href="/privacy" target="_blank">Privacy Policy</a>',
        },
        preferencesModal: {
          title: "Consent Preferences Center",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close modal",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Cookie Usage",
              description:
                "Cookies help us provide, protect, and improve our services. They allow the website to remember your preferences, measure performance, and deliver relevant content. You’re in control and can update your settings at any time.",
            },
            {
              title:
                'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description:
                "These cookies are essential for the basic functionality of our website. They enable core features like security, network management, and accessibility. While you can't turn these off, they don’t collect information that personally identifies you.",
              linkedCategory: "necessary",
            },
            {
              title: "Analytics Cookies",
              description:
                'We use Google Analytics to understand how visitors engage with our site. These cookies collect anonymous information such as page views, time spent on site, and user paths, which helps us improve performance and user experience.\n<a href="https://marketingplatform.google.com/about/analytics/terms/us/">Terms & Conditions</a>',
              linkedCategory: "analytics",
            },
            {
              title: "Marketing Cookies",
              description:
                "Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers. These cookies may be set through our site by advertising partners, such as Meta (Facebook) and Google, and help us measure the effectiveness of our marketing campaigns",
              linkedCategory: "marketing",
            },
            {
              title: "More information",
              description:
                'For any query in relation to our policy on cookies and your choices, please <a class="cc__link" href="mailto:privacy@supermassive.uk">contact us</a>.',
            },
          ],
        },
      },
    },
  },
};
