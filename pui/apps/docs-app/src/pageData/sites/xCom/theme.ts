import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * X.com (Twitter) — black/white, sharp corners, minimal.
 * High-contrast monochrome canvas with a single blue accent.
 */
export const X_COM_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#1d9bf0',
  '--phi-color-primary-hover': '#0a7fcc',
  '--phi-color-primary-light': 'rgba(29, 155, 240, 0.1)',
  '--phi-color-secondary': '#0f1419',
  '--phi-color-secondary-hover': '#000000',
  '--phi-color-error': '#f4212e',
  '--phi-color-error-hover': '#d10d1a',
  '--phi-color-error-light': 'rgba(244, 33, 46, 0.1)',
  '--phi-color-success': '#00ba7c',
  '--phi-color-success-light': 'rgba(0, 186, 124, 0.1)',
  '--phi-color-warning': '#f9af00',
  '--phi-color-warning-light': 'rgba(249, 175, 0, 0.1)',
  '--phi-color-info': '#1d9bf0',
  '--phi-color-info-light': 'rgba(29, 155, 240, 0.1)',
  '--phi-color-background': '#ffffff',
  '--phi-color-background-rgb': '255, 255, 255',
  '--phi-color-background-card': '#ffffff',
  '--phi-color-background-secondary': '#f7f9f9',
  '--phi-color-text-primary': '#0f1419',
  '--phi-color-text-secondary': '#536471',
  '--phi-color-text-inverse': '#ffffff',
  '--phi-color-border': '#eff3f4',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #0f1419 0%, #1d9bf0 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #1d9bf0 0%, #0f1419 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #ffffff 0%, #f7f9f9 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #f7f9f9 0%, #ffffff 100%)',

  /* ---------- Radius (sharp, minimal) ---------- */
  '--phi-radius-sm': '2px',
  '--phi-radius-md': '4px',
  '--phi-radius-lg': '8px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'TwitterChirp', 'Helvetica Neue', sans-serif",
  '--phi-font-heading': "'TwitterChirp', 'Helvetica Neue', sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.25rem',
  '--phi-font-size-xxl': '1.5rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '700',
  '--phi-font-weight-bold': '800',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.06)',
  '--phi-shadow-md': '0 2px 6px rgba(0, 0, 0, 0.1)',
  '--phi-shadow-lg': '0 6px 18px rgba(0, 0, 0, 0.14)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '0.75rem',
  '--phi-space-3': '1rem',
  '--phi-space-4': '1.25rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '0.2s',
  '--phi-transition-fast': '0.15s',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '1rem',
  '--phi-layout-header-height': '52px',
  '--phi-layout-sidebar-margin': '0',
  '--phi-sidebar-collapsed-width': '64px',
  '--phi-sidebar-expanded-width': '220px',
  '--phi-sidebar-collapsed-spacer': '64px',
  '--phi-sidebar-expanded-spacer': '220px',
  '--phi-sidebar-header-height': '52px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #eff3f4',
  '--phi-elevation-shadow': '0 2px 6px rgba(0, 0, 0, 0.1)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(255, 255, 255, 0.8)',
  '--phi-glass-blur': '6px',
  '--phi-tooltip-offset': '6px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#f4212e',
  '--phi-alert-success-text': '#00ba7c',
  '--phi-alert-warning-text': '#cc8a00',
  '--phi-alert-info-text': '#1d9bf0',
};
