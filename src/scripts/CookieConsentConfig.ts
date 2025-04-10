import type { CookieConsentConfig } from 'vanilla-cookieconsent';

// Extend the Window interface to include the dataLayer object
declare global {
    interface Window {
      dataLayer: Record<string, any>[];
      gtag: (...args: any[]) => void;
      fbq: (...args: any[]) => void;
    }
  }
  

export const config: CookieConsentConfig = {
    onConsent: function(cookie) {
        console.log(cookie)
        if (cookie.cookie.categories.includes("analytics")) {
            console.log("updating consents")
            window.gtag("consent", "update", {
                ad_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted",
                analytics_storage: "granted",
              });
              window.fbq("consent", "grant")
          }
      },
    guiOptions: {
        consentModal: {
            layout: "box",
            position: "bottom right",
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            readOnly: true
        },
        analytics: {
            enabled: true,
            autoClear: {
                cookies: [
                  {
                    name: /^_ga/,   // regex: match all cookies starting with '_ga'
                  },
                  {
                    name: '_gid',   // string: exact cookie name
                  },
                  {
                    name: '_fbp',   // string: exact cookie name
                  }
                ]
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
                    description: "To enhance your experience on our site, we use cookies and similar technologies. Some are essential for the website to function properly, while others help us understand how you interact with our content. You can choose to accept all cookies or manage your preferences.",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    showPreferencesBtn: "Manage preferences",
                    footer: "<a href=\"/privacy\" target=\"_blank\">Privacy Policy</a>"
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
                            description: "Cookies help us provide, protect, and improve our services. They allow the website to remember your preferences, measure performance, and deliver relevant content. You’re in control and can update your settings at any time."
                        },
                        {
                            title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                            description: "These cookies are essential for the basic functionality of our website. They enable core features like security, network management, and accessibility. While you can't turn these off, they don’t collect information that personally identifies you.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Analytics Cookies",
                            description: "We use Google Analytics to understand how visitors engage with our site. These cookies collect anonymous information such as page views, time spent on site, and user paths, which helps us improve performance and user experience.\n<a href=\"https://marketingplatform.google.com/about/analytics/terms/us/\">Terms & Conditions</a>",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "More information",
                            description: "For any query in relation to our policy on cookies and your choices, please <a class=\"cc__link\" href=\"mailto:privacy@supermassive.uk\">contact us</a>."
                        }
                    ]
                }
            }
        }
    }
}