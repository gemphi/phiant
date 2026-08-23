import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * Spotify theme — green primary (#1db954), black canvas (#121212),
 * very rounded corners, music-focused dark aesthetic.
 */
export const SPOTIFY_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#1db954',
  '--phi-color-primary-hover': '#169c46',
  '--phi-color-primary-light': 'rgba(29, 185, 84, 0.15)',
  '--phi-color-secondary': '#535353',
  '--phi-color-secondary-hover': '#3e3e3e',
  '--phi-color-error': '#e22134',
  '--phi-color-error-hover': '#c01a2b',
  '--phi-color-error-light': 'rgba(226, 33, 52, 0.12)',
  '--phi-color-success': '#1db954',
  '--phi-color-success-light': 'rgba(29, 185, 84, 0.12)',
  '--phi-color-warning': '#ffa500',
  '--phi-color-warning-light': 'rgba(255, 165, 0, 0.12)',
  '--phi-color-info': '#509bf5',
  '--phi-color-info-light': 'rgba(80, 155, 245, 0.12)',
  '--phi-color-background': '#121212',
  '--phi-color-background-rgb': '18, 18, 18',
  '--phi-color-background-card': '#181818',
  '--phi-color-background-secondary': '#242424',
  '--phi-color-text-primary': '#ffffff',
  '--phi-color-text-secondary': '#b3b3b3',
  '--phi-color-text-inverse': '#121212',
  '--phi-color-border': '#2a2a2a',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #1db954 0%, #121212 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #1db954 0%, #509bf5 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #181818 0%, #121212 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #121212 0%, #181818 100%)',

  /* ---------- Radius (very rounded) ---------- */
  '--phi-radius-sm': '8px',
  '--phi-radius-md': '12px',
  '--phi-radius-lg': '20px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'Circular', 'Montserrat', 'Helvetica Neue', Arial, sans-serif",
  '--phi-font-heading': "'Circular', 'Montserrat', 'Helvetica Neue', Arial, sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.5rem',
  '--phi-font-size-xxl': '2.5rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '600',
  '--phi-font-weight-bold': '700',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 2px 4px rgba(0, 0, 0, 0.4)',
  '--phi-shadow-md': '0 8px 24px rgba(0, 0, 0, 0.5)',
  '--phi-shadow-lg': '0 16px 48px rgba(0, 0, 0, 0.6)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '1rem',
  '--phi-space-3': '1.5rem',
  '--phi-space-4': '2rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '250ms',
  '--phi-transition-fast': '180ms ease',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '1.5rem',
  '--phi-layout-header-height': '64px',
  '--phi-layout-sidebar-margin': '0px',
  '--phi-sidebar-collapsed-width': '72px',
  '--phi-sidebar-expanded-width': '280px',
  '--phi-sidebar-collapsed-spacer': '72px',
  '--phi-sidebar-expanded-spacer': '280px',
  '--phi-sidebar-header-height': '64px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #2a2a2a',
  '--phi-elevation-shadow': '0 8px 24px rgba(0, 0, 0, 0.5)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(18, 18, 18, 0.9)',
  '--phi-glass-blur': '12px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#ff6b6b',
  '--phi-alert-success-text': '#1db954',
  '--phi-alert-warning-text': '#ffa500',
  '--phi-alert-info-text': '#509bf5',
};

export default SPOTIFY_THEME;
