import { Sparkles, Play } from 'lucide-react';

export type ExploreCard = {
  icon: any;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
};

export const EXPLORE_CARDS: ExploreCard[] = [
  {
    icon: Sparkles,
    title: "Discover what's new in the platform",
    description: 'Latest components, patterns, and design tokens added to PUI-UI.',
    link: '/overview',
    linkLabel: 'Learn more',
  },
  {
    icon: Play,
    title: 'Build & prototype with the Play',
    description: 'Interact with props in real time. Toggle variants, sizes, and states to see exactly how each component behaves.',
    link: '/play',
    linkLabel: 'Learn more',
  },
];
