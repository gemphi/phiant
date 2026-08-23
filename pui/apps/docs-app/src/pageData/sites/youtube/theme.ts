import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * YouTube — red primary, medium radius, clean and legible.
 * Familiar video-platform aesthetic with a bright white canvas.
 */
export const YOUTUBE_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#ff0000',
  '--phi-color-primary-hover': '#cc0000',
  '--phi-color-primary-light': 'rgba(255, 0, 0, 0.1)',
  '--phi-color-secondary': '#3ea6ff',
  '--phi-color-secondary-hover': '#1d8bf0',
  '--phi-color-error': '#d93025',
  '--phi-color-error-hover': '#b3261e',
  '--phi-color-error-light': 'rgba(217, 48, 37, 0.12)',
  '--phi-color-success': '#1e8e3e',
  '--phi-color-success-light': 'rgba(30, 142, 62, 0.12)',
  '--phi-color-warning': '#f9ab00',
  '--phi-color-warning-light': 'rgba(249, 171, 0, 0.12)',
  '--phi-color-info': '#3ea6ff',
  '--phi-color-info-light': 'rgba(62, 166, 255, 0.12)',
  '--phi-color-background': '#ffffff',
  '--phi-color-background-rgb': '255, 255, 255',
  '--phi-color-background-card': '#ffffff',
  '--phi-color-background-secondary': '#f2f2f2',
  '--phi-color-text-primary': '#0f0f0f',
  '--phi-color-text-secondary': '#606060',
  '--phi-color-text-inverse': '#ffffff',
  '--phi-color-border': '#e5e5e5',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #ff0000 0%, #3ea6ff 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #ffffff 0%, #f2f2f2 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #f2f2f2 0%, #ffffff 100%)',

  /* ---------- Radius (medium, clean) ---------- */
  '--phi-radius-sm': '4px',
  '--phi-radius-md': '8px',
  '--phi-radius-lg': '12px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'Roboto', 'Arial', sans-serif",
  '--phi-font-heading': "'Roboto', 'Arial', sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.25rem',
  '--phi-font-size-xxl': '1.75rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '600',
  '--phi-font-weight-bold': '700',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.08)',
  '--phi-shadow-md': '0 2px 8px rgba(0, 0, 0, 0.12)',
  '--phi-shadow-lg': '0 8px 24px rgba(0, 0, 0, 0.16)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '0.75rem',
  '--phi-space-3': '1rem',
  '--phi-space-4': '1.5rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '0.2s',
  '--phi-transition-fast': '0.15s',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '1.5rem',
  '--phi-layout-header-height': '56px',
  '--phi-layout-sidebar-margin': '0',
  '--phi-sidebar-collapsed-width': '72px',
  '--phi-sidebar-expanded-width': '240px',
  '--phi-sidebar-collapsed-spacer': '72px',
  '--phi-sidebar-expanded-spacer': '240px',
  '--phi-sidebar-header-height': '56px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #e5e5e5',
  '--phi-elevation-shadow': '0 2px 8px rgba(0, 0, 0, 0.12)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(255, 255, 255, 0.85)',
  '--phi-glass-blur': '8px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#b3261e',
  '--phi-alert-success-text': '#1e8e3e',
  '--phi-alert-warning-text': '#b06000',
  '--phi-alert-info-text': '#1d8bf0',
};
