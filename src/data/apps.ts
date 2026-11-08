export type App = {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  description: string;
  /** Heading for the "What it does" section on the app page. */
  boundaryHeading: string;
  boundary: string;
  privacy: string;
  privacyDetails: string[];
  supportEmail: string;
  supportGuidance: string;
  appStoreUrl?: string;
  relatedLinks?: { href: string; label: string; description: string }[];
  /** Site-relative path to a square icon; when set, the app page shows it beside the name. */
  icon?: string;
  /** Short bullets for the app page. */
  features?: string[];
  /** Support page FAQ. Answers are trusted static HTML (they may contain links). */
  faq?: { question: string; answer: string }[];
  /** Link to the licence terms (for example Apple's Standard EULA), shown on the support page. */
  termsUrl?: string;
  /** Headed privacy sections. When set they replace the generic privacyDetails layout. Paragraphs are trusted static HTML. */
  privacySections?: { heading: string; paragraphs: string[] }[];
  /** Shown as "Last updated …" at the foot of the privacy page. */
  privacyUpdated?: string;
};

export const apps: App[] = [
  {
    slug: 'voicecrisp',
    name: 'VoiceCrisp',
    tagline: 'Speak. Get clean text.',
    status: 'Coming soon to the App Store',
    description: 'VoiceCrisp turns rough dictation into clean, usable text on your iPhone, fixing punctuation, casing and spacing on-device without changing what you said.',
    boundaryHeading: 'Clean dictation, without changing your point.',
    boundary: 'It corrects recognition mistakes, punctuation, casing and word spacing while keeping what you said intact. It does not summarise your dictation or turn it into something else.',
    privacy: 'VoiceCrisp is designed to work on-device. Its product privacy details will be published here before public App Store release.',
    privacyDetails: [
      'VoiceCrisp does not require an account. The app is designed to process dictation on-device, without an analytics or advertising SDK.',
      'If this changes in a shipping build, this policy and the App Store privacy declaration will be updated before release.'
    ],
    supportEmail: 'marcos@placona.co.uk',
    supportGuidance: 'Include your iPhone model, iOS version and a short description of what happened. Please do not send personal dictation content unless it is essential to reproducing the problem.'
  },
  {
    slug: 'green-room',
    name: 'Green Room: Talk Day Prep',
    tagline: 'Walk on prepared.',
    status: 'For conference speakers',
    appStoreUrl: 'https://apps.apple.com/gb/app/green-room-talk-day-prep/id6802224870',
    relatedLinks: [
      {
        href: '/apps/green-room/speaker-prep-checklist/',
        label: 'The speaker-prep checklist',
        description:
          'A checklist for conference organisers, covering the room, AV, running order and contact details speakers need before they go on stage. Free to copy, no app required.'
      }
    ],
    description: 'Green Room turns a conference speaking engagement into a dated flight plan, so the right preparation happens at the right time.',
    boundaryHeading: 'A timeline for the things that derail a talk.',
    boundary: 'Build a flight plan around an event date, surface blockers before they become stage-day surprises, then turn debrief lessons into checks for the next event. The first event is free; a one-time lifetime unlock adds unlimited events, specialist protocols, your personal runbook and export.',
    privacy: 'Green Room is local-first. Events, notes, checklists and runbooks stay on your iPhone.',
    privacyDetails: [
      'Green Room has no account, developer backend, analytics SDK, advertising SDK, crash reporter or cloud sync. Events, checklists, protocols, debriefs and your personal runbook are stored on your device and are never transmitted anywhere.',
      'If you choose to import conference details from a URL you paste into the app, your iPhone requests that public page directly from its publisher over HTTPS. No event data is sent to Marcos Placona and no request is routed through a Green Room server.',
      'Purchases are processed by Apple through the App Store. Green Room does not receive your payment details.',
      'From version 1.0.3, the lifetime unlock is managed through RevenueCat, a purchase-management service. RevenueCat is told purchase history: which product was bought, when, and the App Store receipt needed to verify it. It identifies this installation with an anonymous ID it generates itself, and is never given your name, email address or Apple Account.',
      'No event name, checklist, protocol, debrief, runbook entry or imported text ever reaches RevenueCat. That data is used only to decide whether to unlock the app; it is not used for advertising or tracking, and it is not linked to your identity. RevenueCat is the only third party Green Room uses.'
    ],
    supportEmail: 'marcos@placona.co.uk',
    supportGuidance: 'Include your iPhone model, iOS version, the app version and a short description of what happened. Please do not send event notes or organiser contact details unless they are essential to reproducing the problem.'
  },
  {
    slug: 'farm-mart',
    name: 'Farm Mart: As Advertised',
    tagline: 'Harvest, stock, sell. For real',
    status: 'Coming soon to the App Store',
    icon: '/images/apps/farm-mart-icon.png',
    description: 'Farm Mart is a cosy idle-arcade farm shop game for iPhone. Harvest crops, stock your shelves, serve customers and grow across towns. No ads, no gems, no energy timers.',
    boundaryHeading: 'The game you always hoped the ads were showing you.',
    boundary: 'Harvest crops, carry them to your mart, stock the shelves and serve customers, then hire staff and grow across towns: Sunny Acres, Millbrook bakery, Clover Dairy and Orchard Hill. The first town is free; a one-time Full Game unlock opens the rest. iPhone only, iOS 26 or later.',
    features: [
      'Harvest, carry, stock and serve: a hands-on farm shop you run yourself.',
      'Hire staff and grow across four towns, from Sunny Acres to Orchard Hill.',
      'No ads, no gems and no energy timers.',
      'The first town is free. Full Game opens the others as a one-time lifetime purchase or a subscription.'
    ],
    privacy: 'Farm Mart has no account, no ads and no tracking. Your save game stays on your iPhone, and purchases are handled by Apple and RevenueCat.',
    privacyDetails: [],
    privacyUpdated: '8 November 2026',
    privacySections: [
      {
        heading: 'What Farm Mart does not do',
        paragraphs: [
          'Farm Mart has no account or sign-in. It has no ads and no analytics, and it does not track you. No data is sold or shared for advertising.'
        ]
      },
      {
        heading: 'What stays on your device',
        paragraphs: [
          'Your save game and settings stay on your device.'
        ]
      },
      {
        heading: 'Purchases and RevenueCat',
        paragraphs: [
          'Purchases are processed by Apple. To check whether you have an active subscription or the lifetime unlock, Farm Mart uses <a href="https://www.revenuecat.com/privacy">RevenueCat</a>, a third-party purchase service.',
          'RevenueCat receives an anonymous, randomly generated app user ID, purchase and receipt information (the product, dates, price, and your country or storefront), and basic device and app details (device model, OS version and app version). It is used only to provide and restore purchases. Read <a href="https://www.revenuecat.com/privacy">RevenueCat\'s privacy policy</a>.'
        ]
      },
      {
        heading: 'Game Center',
        paragraphs: [
          'Game Center is optional and run by Apple. If you use it, your scores and achievements go to Apple. The developer does not receive or store your player ID.'
        ]
      },
      {
        heading: 'Children',
        paragraphs: [
          'Farm Mart is suitable for everyone. It does not collect personal information from anyone, including children.'
        ]
      }
    ],
    faq: [
      {
        question: 'What is free, and what does Full Game include?',
        answer: 'The first town is free to play. Full Game opens the other towns. You can unlock it with a one-time lifetime purchase, or with a weekly or monthly auto-renewing subscription. The price for each option is shown on the purchase screen before you buy.'
      },
      {
        question: 'How do I restore my purchases?',
        answer: 'In the game, open Settings and tap Restore Purchases. Use the same Apple Account you bought with.'
      },
      {
        question: 'How do I manage or cancel a subscription?',
        answer: 'On your iPhone, open Settings, tap your name, then tap Subscriptions and choose Farm Mart. Cancel at least 24 hours before the renewal date, or Apple may renew it. A lifetime purchase is not a subscription, so there is nothing to cancel.'
      },
      {
        question: 'Where is my progress saved?',
        answer: 'Your save game and settings stay on your device. There is no account, so if you delete the app, your progress is deleted with it.'
      },
      {
        question: 'Do I need Game Center?',
        answer: 'No. Game Center is optional and run by Apple. Scores and achievements go to Apple, and the developer does not receive or store your player ID.'
      },
      {
        question: 'Which devices does it run on?',
        answer: 'Farm Mart is for iPhone only and needs iOS 26 or later.'
      },
      {
        question: 'Are there ads, gems or energy timers?',
        answer: 'No. Farm Mart has no ads, no gems and no energy timers.'
      }
    ],
    termsUrl: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
    supportEmail: 'marcos@placona.co.uk',
    supportGuidance: 'Include your iPhone model, iOS version, the app version and a short description of what happened.'
  }
];

export function getApp(slug: string) {
  return apps.find((app) => app.slug === slug);
}
