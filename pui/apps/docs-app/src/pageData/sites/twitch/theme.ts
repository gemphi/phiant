import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * Twitch theme — purple/dark, rounded, gaming-focused.
 */
export const TWITCH_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#9146ff',
  '--phi-color-primary-hover': '#772ce8',
  '--phi-color-primary-light': 'rgba(145, 70, 255, 0.15)',
  '--phi-color-secondary': '#eb0400',
  '--phi-color-secondary-hover': '#bf0300',
  '--phi-color-error': '#eb0400',
  '--phi-color-error-hover': '#bf0300',
  '--phi-color-error-light': 'rgba(235, 4, 0, 0.15)',
  '--phi-color-success': '#2ba640',
  '--phi-color-success-light': 'rgba(43, 166, 64, 0.15)',
  '--phi-color-warning': '#ffb31a',
  '--phi-color-warning-light': 'rgba(255, 179, 26, 0.15)',
  '--phi-color-info': '#39bfec',
  '--phi-color-info-light': 'rgba(57, 191, 236, 0.15)',
  '--phi-color-background': '#0e0e10',
  '--phi-color-background-rgb': '14, 14, 16',
  '--phi-color-background-card': '#18181b',
  '--phi-color-background-secondary': '#1f1f23',
  '--phi-color-text-primary': '#efeff1',
  '--phi-color-text-secondary': '#adadb8',
  '--phi-color-text-inverse': '#0e0e10',
  '--phi-color-border': '#2f2f35',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #9146ff 0%, #772ce8 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #9146ff 0%, #efeff1 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #18181b 0%, #0e0e10 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #0e0e10 0%, #18181b 100%)',

  /* ---------- Radius (rounded) ---------- */
  '--phi-radius-sm': '6px',
  '--phi-radius-md': '10px',
  '--phi-radius-lg': '16px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'Inter', 'Roobert', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  '--phi-font-heading': "'Inter', 'Roobert', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.25rem',
  '--phi-font-size-xxl': '2.25rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '600',
  '--phi-font-weight-bold': '700',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.4)',
  '--phi-shadow-md': '0 4px 12px rgba(0, 0, 0, 0.5)',
  '--phi-shadow-lg': '0 12px 32px rgba(0, 0, 0, 0.7)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '1rem',
  '--phi-space-3': '1.5rem',
  '--phi-space-4': '2rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '200ms',
  '--phi-transition-fast': '150ms ease',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '2rem',
  '--phi-layout-header-height': '50px',
  '--phi-layout-sidebar-margin': '0px',
  '--phi-sidebar-collapsed-width': '50px',
  '--phi-sidebar-expanded-width': '240px',
  '--phi-sidebar-collapsed-spacer': '50px',
  '--phi-sidebar-expanded-spacer': '240px',
  '--phi-sidebar-header-height': '50px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #2f2f35',
  '--phi-elevation-shadow': '0 4px 12px rgba(0, 0, 0, 0.5)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(0, 0, 0, 0.7)',
  '--phi-glass-blur': '8px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#ff6b6b',
  '--phi-alert-success-text': '#4ade80',
  '--phi-alert-warning-text': '#fbbf24',
  '--phi-alert-info-text': '#60a5fa',
};

export default TWITCH_THEME;
