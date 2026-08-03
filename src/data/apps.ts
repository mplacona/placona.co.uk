export type App = {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  description: string;
  boundary: string;
  privacy: string;
  supportEmail: string;
};

export const apps: App[] = [
  {
    slug: 'voicecrisp',
    name: 'VoiceCrisp',
    tagline: 'Speak. Get clean text.',
    status: 'Coming soon to the App Store',
    description: 'VoiceCrisp turns rough dictation into clean, usable text on your iPhone.',
    boundary: 'It corrects recognition mistakes, punctuation, casing and word spacing while keeping what you said intact. It does not summarise your dictation or turn it into something else.',
    privacy: 'VoiceCrisp is designed to work on-device. Its product privacy details will be published here before public App Store release.',
    supportEmail: 'marcos@placona.co.uk'
  }
];

export function getApp(slug: string) {
  return apps.find((app) => app.slug === slug);
}
