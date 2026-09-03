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
};

export const apps: App[] = [
  {
    slug: 'voicecrisp',
    name: 'VoiceCrisp',
    tagline: 'Speak. Get clean text.',
    status: 'Coming soon to the App Store',
    description: 'VoiceCrisp turns rough dictation into clean, usable text on your iPhone.',
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
    status: 'Available now on the App Store',
    appStoreUrl: 'https://apps.apple.com/gb/app/green-room-talk-day-prep/id6802224870',
    description: 'Green Room turns a conference speaking engagement into a dated flight plan, so the right preparation happens at the right time.',
    boundaryHeading: 'A timeline for the things that derail a talk.',
    boundary: 'Build a flight plan around an event date, surface blockers before they become stage-day surprises, then turn debrief lessons into checks for the next event. The first event is free; a one-time lifetime unlock adds unlimited events, specialist protocols, your personal runbook and export.',
    privacy: 'Green Room is local-first. Events, notes, checklists and runbooks stay on your iPhone.',
    privacyDetails: [
      'Green Room has no account, developer backend, analytics SDK, advertising SDK or cloud sync. Events, checklists, protocols, debriefs and your personal runbook are stored on your device.',
      'If you choose to import conference details from a URL you paste into the app, your iPhone requests that public page directly from its publisher over HTTPS. No event data is sent to Marcos Placona and no request is routed through a Green Room server.',
      'Purchases are processed by Apple through the App Store. Green Room does not receive your payment details.'
    ],
    supportEmail: 'marcos@placona.co.uk',
    supportGuidance: 'Include your iPhone model, iOS version, the app version and a short description of what happened. Please do not send event notes or organiser contact details unless they are essential to reproducing the problem.'
  }
];

export function getApp(slug: string) {
  return apps.find((app) => app.slug === slug);
}
