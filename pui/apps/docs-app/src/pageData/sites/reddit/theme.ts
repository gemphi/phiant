import type { SiteTheme } from '../../../store/services/themeTypes';

/**
 * Reddit theme — orange on white, clean, community-focused, medium radius.
 */
export const REDDIT_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#ff4500',
  '--phi-color-primary-hover': '#cc3700',
  '--phi-color-primary-light': 'rgba(255, 69, 0, 0.1)',
  '--phi-color-secondary': '#0079d3',
  '--phi-color-secondary-hover': '#0060a8',
  '--phi-color-error': '#ff4500',
  '--phi-color-error-hover': '#cc3700',
  '--phi-color-error-light': 'rgba(255, 69, 0, 0.1)',
  '--phi-color-success': '#46a35f',
  '--phi-color-success-light': 'rgba(70, 163, 95, 0.15)',
  '--phi-color-warning': '#ffb000',
  '--phi-color-warning-light': 'rgba(255, 176, 0, 0.15)',
  '--phi-color-info': '#0079d3',
  '--phi-color-info-light': 'rgba(0, 121, 211, 0.15)',
  '--phi-color-background': '#dae0e6',
  '--phi-color-background-rgb': '218, 224, 230',
  '--phi-color-background-card': '#ffffff',
  '--phi-color-background-secondary': '#f6f7f8',
  '--phi-color-text-primary': '#1a1a1b',
  '--phi-color-text-secondary': '#7c7c7c',
  '--phi-color-text-inverse': '#ffffff',
  '--phi-color-border': '#edeff1',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #ff4500 0%, #ff6b3a 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #ff4500 0%, #cc3700 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%)',

  /* ---------- Radius (medium) ---------- */
  '--phi-radius-sm': '4px',
  '--phi-radius-md': '8px',
  '--phi-radius-lg': '12px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  '--phi-font-heading': "'IBM Plex Sans', -apple-system, sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.25rem',
  '--phi-font-size-xxl': '2rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '600',
  '--phi-font-weight-bold': '700',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 1px 2px rgba(0,0,0,0.1)',
  '--phi-shadow-md': '0 2px 8px rgba(0,0,0,0.12)',
  '--phi-shadow-lg': '0 4px 16px rgba(0,0,0,0.15)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '1rem',
  '--phi-space-3': '1.5rem',
  '--phi-space-4': '2rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '0.2s',
  '--phi-transition-fast': '0.15s ease-in-out',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '1.5rem',
  '--phi-layout-header-height': '56px',
  '--phi-layout-sidebar-margin': '1rem',
  '--phi-sidebar-collapsed-width': '0px',
  '--phi-sidebar-expanded-width': '256px',
  '--phi-sidebar-collapsed-spacer': '0px',
  '--phi-sidebar-expanded-spacer': '256px',
  '--phi-sidebar-header-height': '56px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #edeff1',
  '--phi-elevation-shadow': '0 2px 8px rgba(0,0,0,0.12)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(26, 26, 27, 0.5)',
  '--phi-glass-blur': '6px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#ff4500',
  '--phi-alert-success-text': '#46a35f',
  '--phi-alert-warning-text': '#ffb000',
  '--phi-alert-info-text': '#0079d3',
};
