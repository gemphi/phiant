import type { SiteTheme } from '../../../store/services/themeTypes';

/**
 * Netflix theme — cinematic red on black, sharp corners, bold typography.
 */
export const NETFLIX_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#e50914',
  '--phi-color-primary-hover': '#f6121d',
  '--phi-color-primary-light': 'rgba(229, 9, 20, 0.15)',
  '--phi-color-secondary': '#221f1f',
  '--phi-color-secondary-hover': '#333030',
  '--phi-color-error': '#e50914',
  '--phi-color-error-hover': '#f6121d',
  '--phi-color-error-light': 'rgba(229, 9, 20, 0.1)',
  '--phi-color-success': '#46d369',
  '--phi-color-success-light': 'rgba(70, 211, 105, 0.15)',
  '--phi-color-warning': '#ffb700',
  '--phi-color-warning-light': 'rgba(255, 183, 0, 0.15)',
  '--phi-color-info': '#0080ff',
  '--phi-color-info-light': 'rgba(0, 128, 255, 0.15)',
  '--phi-color-background': '#141414',
  '--phi-color-background-rgb': '20, 20, 20',
  '--phi-color-background-card': '#1f1f1f',
  '--phi-color-background-secondary': '#221f1f',
  '--phi-color-text-primary': '#ffffff',
  '--phi-color-text-secondary': '#b3b3b3',
  '--phi-color-text-inverse': '#141414',
  '--phi-color-border': '#2f2f2f',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #e50914 0%, #b00710 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #e50914 0%, #831010 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.9) 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(0deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.9) 100%)',

  /* ---------- Radius (sharp corners) ---------- */
  '--phi-radius-sm': '0px',
  '--phi-radius-md': '0px',
  '--phi-radius-lg': '2px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'Helvetica Neue', Helvetica, Arial, sans-serif",
  '--phi-font-heading': "'Bebas Neue', 'Helvetica Neue', Arial, sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.5rem',
  '--phi-font-size-xxl': '3rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '600',
  '--phi-font-weight-bold': '700',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 1px 3px rgba(0,0,0,0.5)',
  '--phi-shadow-md': '0 4px 12px rgba(0,0,0,0.6)',
  '--phi-shadow-lg': '0 10px 30px rgba(0,0,0,0.7)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '1rem',
  '--phi-space-3': '1.5rem',
  '--phi-space-4': '2rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '0.2s',
  '--phi-transition-fast': '0.15s ease-in-out',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '2rem',
  '--phi-layout-header-height': '64px',
  '--phi-layout-sidebar-margin': '0px',
  '--phi-sidebar-collapsed-width': '0px',
  '--phi-sidebar-expanded-width': '240px',
  '--phi-sidebar-collapsed-spacer': '0px',
  '--phi-sidebar-expanded-spacer': '240px',
  '--phi-sidebar-header-height': '64px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #2f2f2f',
  '--phi-elevation-shadow': '0 4px 12px rgba(0,0,0,0.6)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(20, 20, 20, 0.85)',
  '--phi-glass-blur': '8px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#ff6b6b',
  '--phi-alert-success-text': '#46d369',
  '--phi-alert-warning-text': '#ffb700',
  '--phi-alert-info-text': '#0080ff',
};
