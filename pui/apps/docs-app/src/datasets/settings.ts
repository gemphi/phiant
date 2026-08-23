import { Sun, Moon, Monitor, Check, Layers, Palette, Sparkles, GlassWater, Zap, Gauge, Turtle, Minimize2, Square, Maximize2 } from 'lucide-react';

export type ThemeOption = {
  id: 'light' | 'dark' | 'system';
  label: string;
  icon: any;
};

export type ThemeStyleOption = {
  id: 'flat' | 'gradient' | 'elevated' | 'glass';
  label: string;
  icon: any;
};

export type RadiusOption = {
  id: string;
  label: string;
  sm: string;
  md: string;
  lg: string;
};

export type AnimationSpeedOption = {
  id: string;
  label: string;
  value: string;
  icon: any;
};

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
];

export const THEME_STYLE_OPTIONS: ThemeStyleOption[] = [
  { id: 'flat', label: 'Flat', icon: Layers },
  { id: 'gradient', label: 'Gradient', icon: Palette },
  { id: 'elevated', label: 'Elevated', icon: Sparkles },
  { id: 'glass', label: 'Glass', icon: GlassWater },
];

export const RADIUS_OPTIONS: RadiusOption[] = [
  { id: 'sharp', label: 'Sharp (0px)', sm: '0px', md: '0px', lg: '0px' },
  { id: 'sm', label: 'Compact (4px)', sm: '2px', md: '4px', lg: '6px' },
  { id: 'md', label: 'Default (8px)', sm: '4px', md: '8px', lg: '12px' },
  { id: 'lg', label: 'Rounded (16px)', sm: '8px', md: '16px', lg: '24px' },
  { id: 'pill', label: 'Pill (9999px)', sm: '9999px', md: '9999px', lg: '9999px' },
];

export const ANIMATION_SPEED_OPTIONS: AnimationSpeedOption[] = [
  { id: 'instant', label: 'Instant', value: '0s', icon: Zap },
  { id: 'fast', label: 'Fast', value: '0.15s', icon: Gauge },
  { id: 'default', label: 'Default', value: '0.3s', icon: Gauge },
  { id: 'slow', label: 'Slow', value: '0.5s', icon: Turtle },
];

export type LayoutDensityOption = {
  id: string;
  label: string;
  icon: any;
  vars: Record<string, string>;
};

export const LAYOUT_DENSITY_OPTIONS: LayoutDensityOption[] = [
  {
    id: 'compact',
    label: 'Compact',
    icon: Minimize2,
    vars: {
      '--phi-layout-sidebar-margin': '4px',
      '--phi-layout-header-height': '48px',
      '--phi-layout-content-padding': '8px',
      '--phi-layout-header-glow': '0 2px 8px rgba(0,0,0,0.06)',
    },
  },
  {
    id: 'default',
    label: 'Default',
    icon: Square,
    vars: {
      '--phi-layout-sidebar-margin': '12px',
      '--phi-layout-header-height': '64px',
      '--phi-layout-content-padding': '24px',
      '--phi-layout-header-glow': '0 4px 16px rgba(0,0,0,0.08)',
    },
  },
  {
    id: 'comfortable',
    label: 'Comfortable',
    icon: Maximize2,
    vars: {
      '--phi-layout-sidebar-margin': '24px',
      '--phi-layout-header-height': '80px',
      '--phi-layout-content-padding': '48px',
      '--phi-layout-header-glow': '0 8px 32px rgba(0,0,0,0.1)',
    },
  },
];

export const CHECK_ICON = Check;